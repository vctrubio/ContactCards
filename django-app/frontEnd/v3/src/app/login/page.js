'use client'
import React, { useEffect, useState, Suspense } from 'react';
import { toast, Toaster } from 'sonner';
import { checkLoginStatus, handleLogOut } from '@/lib/apiUser';
import { useRouter } from 'next/navigation';

const UserLogForm = ({ setIsLoggedIn, setUsername }) => {
    const router = useRouter();
    const routerRedirect = () => router.push('/');

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
            routerRedirect();
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


    const SignInSignUpForm = () => {
        return (
            <form className="flex flex-col gap-2 mt-10 text-black w-64 mx-auto" onKeyDown={handleKeyDown}>
                <input type="text" placeholder="Username" name='username' className='rounded p-2' />
                <input type="password" placeholder="Password" name='password' className='rounded p-2' />
                <div className="flex justify-center gap-8">
                    <button
                        type="button"
                        className="bg-black-500 hover:bg-black-700 text-white font-bold py-2 px-5 border border-transparent rounded"
                        onClick={(event) => handleBtn(event, 'login/')}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(event) => handleBtn(event, 'register/')}
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        )
    }

    return (
        <SignInSignUpForm />
    )
}

const UserHelloForm = ({ username, setUsername, setIsLoggedIn }) => {
    const router = useRouter();

    const buttonsLoggedInLinks = [
        {
            header: "Continue",
            className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
            onClick: () => router.push('/')
        },
        {
            header: "Sign Out",
            className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
            onClick: () => handleLogOut({ setUsername, setIsLoggedIn })
        }
    ];

    return (
        <div className='text-white text-center'>
            <div>
                Hello {username}
            </div>
            <div className='flex flex-col gap-2 py-2'>
                {buttonsLoggedInLinks.map((button, index) => (
                    <button
                        key={index}
                        className={button.className}
                        onClick={button.onClick}
                    >
                        {button.header}
                    </button>
                ))}
            </div>
        </div>
    )
}


const LoginStatus = ({ setUsername, setIsLoggedIn, isLoggedIn, username }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            await checkLoginStatus({ setUsername, setIsLoggedIn });
            setIsLoading(false);
        };

        checkStatus();
    }, []);

    if (isLoading) {
        return;
    }

    if (isLoggedIn) {
        return <UserHelloForm username={username} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />;
    } else {
        return <UserLogForm setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} />;
    }
};


const WelcomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const WelcomeMsg = () => (
        <div className="text-center text-xl font-bold text-blue-200">
            Login Page!
        </div>
    );

    return (
        <div className='py-10 flex flex-col justify-center items-center gap-5'>
            <WelcomeMsg />
            <Suspense fallback={<div className="text-center text-lg text-gray-500">Checking login status...</div>}>
                <LoginStatus setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} username={username} />
            </Suspense>
            <Toaster position="bottom-left" />
        </div>
    );
}


export default WelcomePage;