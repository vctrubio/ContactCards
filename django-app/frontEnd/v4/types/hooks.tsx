"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from "@/types/backend";
import { getUser } from "@/lib/apiUser";

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
    error: string | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (err) {
                console.error('Error fetching user:', err);
                setError(err instanceof Error ? err.message : 'Failed to load user data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [setUser]);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, error }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
