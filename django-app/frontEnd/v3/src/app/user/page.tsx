'use client'
import React, { useState, useEffect } from 'react';
import { User } from '@/types/backend';
import { getUser } from '@/lib/apiUser';

const UserBanner: React.FC<{ username: string }> = ({ username }) => {
    return (
        <div className="user-banner border">
            <div className="user-profile-pic">
                <div className="user-name">{username && username}</div>
            </div>
        </div>
    );
};


const UserProfilePage = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUser();
                if (data)
                    setUser(data);
            } catch (error) {
                console.error('Errorito fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    window.user = user

    if (!user) {
        return <div className="p-2">REDIR: Sorry, you need to log in</div>;
    }

    return (<div className="p-2">
        hello dear {user.username}
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