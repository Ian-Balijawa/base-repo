export type Stats = {
	admins: number;
	caregivers: number;
	patients: number;
	appointments: number;
};

export type BaseDTO = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

export type DTO<T> = {
	[k in keyof T]: T[k];
} & BaseDTO;

export type Rating = DTO<{
	patient: Patient;
	caregiver: Caregiver;
	review: string;
	value: number;
}>;

export type Location = {
	type: string;
	coordinates: [number, number];
};

export type BaseEntity = {
	firstName: string;
	lastName: string;
	isBanned: boolean;
	isEmailVerified: boolean;
	isActive: boolean;
	designation: string;
} & BaseDTO;

export type ENTITY<T> = { [k in keyof T]: T[k] } & BaseEntity;

export type Admin = ENTITY<{ email: string }>;

export type Caregiver = ENTITY<{
	phone: string;
	location: Location;
	isPhoneVerified: boolean;
	qualifications?: string[];
	isVerified: boolean;
	dateOfBirth: string;
	nin: string;
	description: string;
	rating: number;
	address: string;
	experience: number;
	imgUrl: string;
}>;

export type Patient = ENTITY<{
	phone: string;
	isActive: boolean;
	isVerified: boolean;
	isPhoneVerified: boolean;
	location: Location;
}>;

export type Appointment = DTO<{
	patient: Patient;
	caregiver: Caregiver;
	symptoms: string[];
	date: string;
	status: string;
	cancellationReason: string;
	description: string;
}>;
