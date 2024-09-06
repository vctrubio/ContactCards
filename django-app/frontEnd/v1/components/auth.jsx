'use client'
import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { checkLoginStatus, handleLogOut } from '@/lib/apiUser';
import { useRouter } from 'next/navigation';

export const UserCredForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const router = useRouter();

    useEffect(() => {
        const checkStatus = async () => {
            await checkLoginStatus({ setUsername, setIsLoggedIn });
        };
        
        checkStatus();
    }, []);
    
    const UserWelcomeForm = () => {
        return (
            <div className="flex flex-col gap-2 mt-10 text-white text-center">
                <p className='border p-2 rounded '>Hi, {username}</p>
                <button
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleLogOut({ setUsername, setIsLoggedIn })}
                    >
                    Sign Out
                </button>
                <button
                    type="button"
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => router.push('/home')}
                >
                    Enter
                </button>
            </div>
        )
    }
    
    const UserLogForm = () => {
        const handleBtn = async (event, action) => {
            const username = event.target.form.username.value;
            const password = event.target.form.password.value;
            if (username === '' || password === '') {
                toast.error('Username and password cannot be empty');
                return;
            }

            const destination = `${process.env.NEXT_PUBLIC_BACK_END_URL_AUTH}${action}`;
            try {
                const response = await fetch(destination, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                    credentials: 'include',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Network response was not ok');
                }

                const data = await response.json();
                toast.success(`Success: ${data.message}`);
                event.target.form.reset();

                setIsLoggedIn(true);
                setUsername(username);
                router.push('/home');
            } catch (error) {
                console.log('error:', error);
                toast.error(`Error: ${error.message}`);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                if (event.shiftKey) {
                    handleBtn(event, 'register/');
                } else {
                    handleBtn(event, 'login/');
                }
            }
        };

        return (
            <form className="flex flex-col gap-2 mt-10 text-black" onKeyDown={handleKeyDown}>
                <input type="text" placeholder="Username" name='username' className='rounded' />
                <input type="password" placeholder="Password" name='password' className='rounded' />
                <div className="flex gap-4">
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(event) => handleBtn(event, 'login/')}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="bg-black-500 hover:bg-black-700 text-white font-bold py-2 px-5 border border-white rounded"
                        onClick={(event) => handleBtn(event, 'register/')}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        )
    }

    return (
        <>
            {isLoggedIn ? <UserWelcomeForm username={username} /> : <UserLogForm />}
            <Toaster position="bottom-left"
                toastOptions={{
                    className: 'toast-style',
                }}

            />
        </>
    );
};
