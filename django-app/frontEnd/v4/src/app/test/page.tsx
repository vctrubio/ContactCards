'use client'

import { cookies } from 'next/headers';

import { getUser } from '@/lib/apiUser';
import { NavBar } from '@/components/navbar';

import React, { useState, useEffect } from 'react';

const Test = () => {
    const [username, setUsername] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser();
                if (user) {
                    setUsername(user.username);
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setLoggedIn(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            {loggedIn ? (
                <div>
                    <p>Welcome {username}</p>
                </div>
            ) : (
                <div>
                    <p>Welcome Guest</p>
                </div>
            )}
            <NavBar />
        </>
    );
}

export default Test;