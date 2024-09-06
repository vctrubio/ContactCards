'use client'

import React, { useState, useEffect, Suspense, lazy } from 'react';
import Link from 'next/link';

import { toast, Toaster } from 'sonner';
import { checkLoginStatus, getCSRFToken } from '@/lib/apiUser';
import { OrganisationCard } from '@/components/cards';
import { OrganisationForm } from '@/components/forms';
import { CreateList } from '@/components/lists';

const UserStatus = ({ setIsLoggedIn, setUsername, setIsLoading }) => {
    useEffect(() => {
        const checkStatus = async () => {
            await checkLoginStatus({ setUsername, setIsLoggedIn });
            setIsLoading(false);
        };
        checkStatus();
    }, [setIsLoggedIn, setUsername, setIsLoading]);

    return null;
};


export const HomeComponent = () => {
    const [organisations, setOrganisations] = useState([]);
    const [selectedOrganisations, setSelectedOrganisations] = useState([]);
    const [openList, setOpenList] = useState(false);

    useEffect(() => {
        const fetchOrganisations = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL_ORGS}`);
            const data = await response.json();
            setOrganisations(data);
        }
        fetchOrganisations();
    }, []);

    const handleSelectOrganisation = (organisation) => {
        setSelectedOrganisations(prevSelected =>
            prevSelected.includes(organisation)
                ? prevSelected.filter(item => item !== organisation)
                : [...prevSelected, organisation]
        );
    };

    return (
        <div className='flex space-x-10 justify-center b-child rounded'>
            <div className='organisations-container'>
                <h1>
                    All Organisations [{organisations.length}]
                </h1>
                <div className='layout'>
                        {organisations.map((organisation, index) => (
                        <OrganisationCard
                            key={index}
                            organisation={organisation}
                            flag={openList}
                            isSelected={selectedOrganisations.includes(organisation)}
                            onSelect={handleSelectOrganisation}
                        />
                    ))}
                </div>
            </div>
            <div className='min-w-[300px]'>
                <div>
                    <h1>
                        Create Organisations
                    </h1>
                    <OrganisationForm />
                </div>
                <div className='mt-5 pt-5 border-t-4'>
                    <CreateList setOpenList={setOpenList} openList={openList} selectedOrganisations={selectedOrganisations} setSelectedOrganisations={setSelectedOrganisations} />
                </div>
            </div>
        </div>
    )
}


const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Suspense fallback={<div>Loading2222...</div>}>
            <UserStatus setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setIsLoading={setIsLoading} />

            <h1 className='mb-2'>Token | Tokenize | CardSwap | MegaSwap | Busines Size  </h1>
            {username && <p>Welcome,
                <Link href={"/user"} className='underline text-blue-100 '>
                    {username}
                </Link>
            </p>}

            {isLoading ? (
                null
            ) : (
                isLoggedIn ? <HomeComponent /> :
                    <Link href="/">
                        Please: log in
                    </Link>
            )}
            <Toaster />
        </Suspense>
    );
}

export default Home;