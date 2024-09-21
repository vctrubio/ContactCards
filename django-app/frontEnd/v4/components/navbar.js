'use client'
import { useEffect, useState, useRef } from 'react';
import { getUser } from "@/lib/apiUser";
import { handleLogOut } from '@/lib/apiUser';
import { usePathname, useRouter } from 'next/navigation'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import Link from 'next/link';
import { useUser } from '@/types/hooks';

const NavBarRight = ({ user, router }) => {

    const [dropdownVisible, setDropdownVisible] = useState({
        organisations: false,
        myList: false,
        user: false,
    });

    const dropdownRefs = {
        organisations: useRef(null),
        myList: useRef(null),
        user: useRef(null),
    };

    const handleClick = async (label, href) => {
        // console.log(`Label: ${label}, Href: ${href}`);

        switch (label) {
            case 'Option 1':
                console.log('Option 1 clicked');
                break;
            case 'Option 2':
                console.log('Option 2 clicked');
                break;
            case 'Profile':
                console.log('Profile clicked');
                break;
            case 'Log out':
                await handleLogOut({ setUsername: () => { }, setIsLoggedIn: () => { } });
                router.push(href);
                break;
            default:
                console.log(`${label} clicked`);
        }
    };

    const base_url = '/home';
    const dropdownOptions = {
        organisations: [
            { label: 'View All', href: '/organisations' },
            { label: 'Create', href: '' },
        ],
        myList: [
            { label: 'View All', href: '/lists' },
            { label: 'Create', href: '' },
        ],
        user: [
            { label: 'Profile', href: '/user' },
            { label: 'Log out', href: '/' },
        ],
    };

    const toggleDropdown = (dropdown) => {
        setDropdownVisible((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown],
        }));
    };

    const handleClickOutside = (event) => {
        Object.keys(dropdownRefs).forEach((key) => {
            if (dropdownRefs[key].current && !dropdownRefs[key].current.contains(event.target)) {
                setDropdownVisible((prevState) => ({
                    ...prevState,
                    [key]: false,
                }));
            }
        });
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-row items-center gap-8 justify-center p-8 bg-gray-100 dark:bg-neutral-800">
            {Object.keys(dropdownOptions).map((key) => (
                <div className="relative" key={key} ref={dropdownRefs[key]}>
                    <button
                        className="px-5 py-3 text-black bg-blue-400 rounded-lg hover:bg-blue-600"
                        onClick={() => toggleDropdown(key)}
                    >
                        {key === 'user' ? user : key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                    {dropdownVisible[key] && (
                        <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {dropdownOptions[key].map((option, index) => (
                                    <a
                                        key={index}
                                        href={option.href}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        onClick={() => handleClick(option.label, option.href)}
                                    >
                                        {option.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

const NavBarUserFace = ({ user }) => {

    return (
        <Link href='/'>
            <div className='border p-4 '>
                {user ? user.username : 'Anonymous'}
            </div>
        </Link>
    )
}


export const NavBar = () => {
    const {user} = useUser();

    const router = useRouter();
    const i = usePathname().split('/')[1]

    return (
        <>
            <div className="flex flex-row items-center justify-between p-4 bg-gray-100 dark:bg-neutral-800 min-h-[10    0px]">
                <h2 className="opacity-50 border p-2 rounded-2xl hover:bg-blue-200 cursor-pointer"
                    onClick={() => router.push('/home')}
                >
                    Token
                </h2>
                <Link href={`/${i}`}>
                    <div className='text-2xl opacity-80 hover:opacity-100 tracking-wide align-center cursor-pointer'>
                        {i}
                    </div>
                </Link>
                <NavBarUserFace user={user} />
            </div>
        </>
    );
}


/*
ISSUES FOUND:
- navbar is making request on everypage load -> it is in the main layout...
- if user is not logged in, making irrelevant requests


*/