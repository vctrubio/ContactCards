'use client'
import { useEffect, useState } from 'react';
import { getUser } from "@/lib/apiUser";

const Page = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser().then((data) => {
            setUser(data);
            console.log('data front:', data);
        }).catch((error) => {
            console.error('Error fetching user:', error);
        });
    }, []);


    return (
        <>
            {user &&
                <>hello {user.username}</>
            }
        </>
    );
}

export default Page;