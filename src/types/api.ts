import { ROLE } from '@/types/enums';

type BaseEntity = {
	id: string;
	createdAt: string;
	updatedAt: string;
};


export type User = BaseEntity & {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	isOnline: boolean;
	isActive: boolean;
	lastSeen: string;
	isEmailVerified: boolean;
	role: ROLE;
	emailVerificationCode?: string | null;
	passwordResetCode?: string | null;
};

export interface LoginResponse {
	message: string;
	statusCode: number;
	data: {
		accessToken: string;
		user: User;
	};
}
