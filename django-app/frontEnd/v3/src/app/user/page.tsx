'use client'
import React, { useState, useEffect } from 'react';
import { Organisation, User } from '@/types/backend';
import { getUser, getUserV2 } from '@/lib/apiUser';
import { Card, Wallet } from '@/types/backend';
import { CardOrganisation, CardOrganisationEmployee, CardWallet } from '@/components/cards'

const UserBanner: React.FC<{ username: string }> = ({ username }) => {
    return (
        <div className="user-banner">
            <div className="user-profile-pic"></div>
            <div className="user-name">{username && username}</div>
        </div>
    );
};

const UserComponnts: React.FC<{ user: User }> = ({ user }) => {
    console.log("🚀 ~ user:", user)
    window.o = user;

    const wallet: Wallet | null = user.wallet ?? null;
    const organisations: Organisation[] = user.organisations ?? [];
    const employee_organisations: Organisation[] = user.employee_organisations ?? [];

    return (
        <div className="user-box">
            <div className="">
                <h1>Wallet [{wallet ? wallet.cards.length : 0}]</h1>
                {wallet ? (
                    <div>
                        <div>
                            {wallet.cards.map((card: Card) => (
                                <div key={card.id}>
                                    {card.employee} | {card.organisation.name}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="organisations-container">
                <div className="organisations-section">
                    {organisations.length > 0 ? (
                        <div>
                            <h1>Organisations [{organisations.length}]</h1>
                            <div>
                                {organisations.map((organisation: Organisation) => (
                                    <div key={organisation.id}>
                                        <CardOrganisation organisation={organisation} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No organisations available.</p>
                    )}
                </div>
                <div className="employee-organisations-section">
                    {employee_organisations.length > 0 ? (
                        <div>
                            <h1>Employee Organisations [{employee_organisations.length}]</h1>
                            <div>
                                {employee_organisations.map((organisation: Organisation) => (
                                    <div key={organisation.id}>
                                        <CardOrganisation organisation={organisation} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p>No employee organisations available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

    const UserProfilePage = () => {
        const [user, setUser] = useState<User | null>(null);

        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const data = await getUserV2();
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