'use client'
import React, { useState, useEffect } from 'react';
import { User } from '@/types/backend';
import { getUser } from '@/lib/apiUser';

const UserBanner: React.FC<{ username: string }> = ({ username }) => {
    return (
        <div className="user-banner">
            <div className="user-profile-pic"></div>
            <div className="user-name">{username && username}</div>
        </div>
    );
};

const UserComponnts: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="user-box">
            <div className="">
                <h1>Wallet [{}]</h1>
                <div>abc</div>
                <div>abc</div>
            </div>
            <div className="">
                <h1>Organistaions [{}] Employee [{}]</h1>
                <div>abc</div>
                <div>abc</div>
            </div>
        </div>
    )
}



const UserProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                if (data) {
                    setUser(data);
                } else {
                    console.error('No user data returned');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
        /* 
        Failed to load resource: the server responded with a status of 500 (Internal Server Error)
        but still loading...
         */
    }, []);


    if (!user) {
        return <div className="p-2">REDIR: Sorry, you need to log in</div>;
    }

    return (<div className="p-2">
        <UserBanner username={user.username} />
        <UserComponnts user={user} />
    </div>);
}

export default UserProfilePage;



/* notes to do 
-check if the user is logged in
    -else say, sorry need to log in
- display user
  - name
  - wallet/cards
  - if subscriber or not subscriber -> organisations list
  - if employee to any organisation
   




*/