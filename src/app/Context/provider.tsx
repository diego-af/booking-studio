'use client';

import {useState} from 'react';
import {createContext} from 'react';

export interface IUser {
	id?: string;
	username: string;
	email: string;
	password?: string;
}

interface IContext {
	user: IUser | undefined;
	setUsers: (user: IUser | undefined) => void;
	logged: boolean | undefined;
}
export const BookingContext = createContext<IContext>({} as IContext);

const BookingProvider = ({children}: {children: React.ReactNode}) => {
	const [user, setUsers] = useState<IUser | undefined>({} as IUser);
	const logged = !!user;
	return (
		<BookingContext.Provider value={{user, setUsers, logged}}>
			{children}
		</BookingContext.Provider>
	);
};

export default BookingProvider;
