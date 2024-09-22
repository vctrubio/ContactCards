'use client'
import { useEffect, useState, useRef } from 'react';
import { handleLogOut } from '@/lib/apiUser';
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link';
import { useUser } from '@/types/hooks';
import Button from '@mui/material/Button';


const LoggedInComponents = ({ user, setUser }) => {
    return (
        <>
      
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleLogOut({setUser})}
            >
                Log Out
            </Button>
        </>
    );
}

const LoggedOutComponents = () => {

    const scrollToLoginForm = () => {
        const loginFormElement = document.getElementById('login-form');
        if (loginFormElement) {
            loginFormElement.scrollIntoView({ behavior: 'auto' });
        }
    };

    return (
        <Button
            variant='outline' // You can change this to "text" or "outlined"
            color='secondary'
            onClick={scrollToLoginForm}
        >
            Please log in
        </Button>
    )
}


const NavBarUserFace = ({ user, setUser }) => {

    return (
        <Link href='/'>
            <div className=''>
                {user ? <LoggedInComponents user={user} setUser={setUser} /> : <LoggedOutComponents />}
            </div>
        </Link>
    )
}


export const NavBar = () => {
    const { user, setUser } = useUser();

    const router = useRouter();
    const i = usePathname().split('/')[1]

    return (
        <>
            <div className="flex flex-row items-center justify-between p-4 bg-gray-100 dark:bg-neutral-800 min-h-[10    0px]">
                <h2 className="opacity-50 border p-2 rounded-2xl hover:bg-blue-200 cursor-pointer"
                    onClick={() => router.push('/home')}
                >
                    Home
                </h2>
                <Link href={`/${i}`}>
                    <div className='text-2xl opacity-80 hover:opacity-100 tracking-wide align-center cursor-pointer'>
                        {i}
                    </div>
                </Link>
                <NavBarUserFace user={user} setUser={setUser} />
            </div>
        </>
    );
}
