'use client'

import { useEffect, useState } from 'react';
import { getUser } from "@/lib/apiUser";
import { Toaster } from "sonner";
import NavBar from '@/components/navbar';

const TmpUserStories = () => {
    return (
        <div className='gap-4 ml-8'>
            <h2>Actions</h2>
            <div className='border p-2'>
                <h3>List</h3>
                <p>-- Share list with Users</p>
                <p>-- Toggle list, public / private</p>
            </div>
            <div className='border p-2'>
                <h3>Organisation</h3>
                <p>-- Create Organisation (if subscribed)</p>
                <p>-- Add Employees to Organisation</p>
                <p>-- Create Business cards</p>
            </div>
            <div className='border p-2'>
                <h3>Business Cards</h3>
                <p>-- Automate Business Cards</p>
                <p>-- Add Employees to Organisation</p>
                <p>-- Unique Business cards</p>
            </div>

            <div className='border p-2'>
                <h3>User stories</h3>
                <p>-- Subscription based model per organisation/employee</p>
                <p>-- Search Organisation in the Area</p>
                <p>-- Recommend Organisations</p>
                <p>-- Request to work in organisation ... </p>
                <p>-- Recomendations?</p>
            </div>

            <div className='border p-2'>
                <h3>Web3 - To Improve</h3>
                <p>-- Smart Contract for employees</p>
                <p>-- Share ... link/nfc/chat</p>
            </div>

        </div>
    )
}


const UserComponentView = ({ user }) => {

    window.org = user.lists;
    return (
        <div className="user-details">
            <NavBar />
            <h1>User Details</h1>
            <p><strong>Username:</strong> {user.username}</p>
            {/* <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Last Name:</strong> {user.last_name}</p> */}
            <p><strong>Is Staff:</strong> {user.is_staff ? 'Yes' : 'No'}</p>

            <div className='flex flex-row mt-5 gap-10'>
                <div>
                    <h2>Organizations [{user.organisations.length}]</h2>
                    <ul>
                        {user.organisations && user.organisations.map((org) => (
                            <li key={org.id} className='pl-2'>
                                <a href={`http://localhost:3000/organisations/${org.id}`} target="_blank" rel="noopener noreferrer">
                                    {org.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2>Fav List Of Organisation</h2>
                    <ul>
                        {user.lists && user.lists.map((fav) => (
                            <li key={fav.name} className='pl-2 hover:bg-gray-600'>
                                <div className='flex'>
                                <p>{fav.name}</p>
                                {fav.is_public ? <p>(Public)</p> : <p>(Private)</p>} 
                                </div>
                                {fav.organisations && fav.organisations.map((org) => (
                                    <p key={org} className='pl-2'>
                                        - {org}
                                    </p>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>

                <TmpUserStories />
            </div>
        </div>
    )
}


const UserPage = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser().then((data) => {
            setUser(data);
        }).catch((error) => {
            console.error('Error fetching user:', error);
        });
    }, []);

    if (!user) {
        return;
    }

    return (
        <>
            <UserComponentView user={user} />
            <Toaster />
        </>
    );
}

export default UserPage;