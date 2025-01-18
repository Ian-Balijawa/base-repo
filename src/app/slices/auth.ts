import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '@/types/api';

export interface Auth {
	user: User | null;
	accessToken: string;
}

const initialState: Auth = {
	user: null,
	accessToken: '',
};

const slice = createSlice( {
	name: 'auth',
	initialState,
	reducers: {
		signin: ( state, action: PayloadAction<{ user: User | null; accessToken: string }> ) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
		},
		signout: ( state ) => {
			state.user = null;
			state.accessToken = '';
		},
	},
} );

export const { signin, signout } = slice.actions;
export const user = ( state: RootState ) => state.auth.user;
export default slice.reducer;
