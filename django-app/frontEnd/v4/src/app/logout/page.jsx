'use client'
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { handleLogOut } from "@/lib/apiUser";

export default function LogMeOut(){
    const router = useRouter();

    useEffect(() => {
        const logOut = async() => {
            await handleLogOut({ setUsername: () => { }, setIsLoggedIn: () => { } });
            router.refresh();
        }
        logOut();
    }, []);
    return null;
        
}