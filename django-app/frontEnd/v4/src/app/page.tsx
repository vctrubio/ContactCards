'use client'
import React, {useState, useEffect} from "react";
import WelcomePage from "@/src/pages/login";
import { getUserV2 } from "@/lib/apiUser";
import {PageLanding, PageWhatWeDo} from "@/src/pages/landing";
import {SponsorPage} from "@/src/pages/sponsor";

import { User } from "@/types/backend";
const UserNotLoggedInPage = ({setUser, user}) => {
  return (
    <div className="home-container">
      <PageLanding />
      <div className="min-h-screen">
        <PageWhatWeDo />
        <WelcomePage setUser={setUser} user={user} />
        <SponsorPage/>
      </div>
    </div>
  )
}

const UserLoggedInPage = ({username}) => {
  return (
    <>
      Hello {username}
    </>
  )
}


export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  // console.log("🚀 ~ Home ~ user:", user)

  useEffect(() => {
    const fetchLoginStatus = async () => {
      const userData = await getUserV2();
      setUser(userData);
     
    };
    fetchLoginStatus();
  }, [user]);

  if (!user) {
    return <UserNotLoggedInPage setUser={setUser} user={user} />;
  }

  return <UserLoggedInPage username={user.username}/>;
}
