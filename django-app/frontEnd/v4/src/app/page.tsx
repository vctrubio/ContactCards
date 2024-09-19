'use client'
import React, {useState, useEffect} from "react";
import WelcomePage from "@/src/pages/login";
import { checkLoginStatus, getUserV2, validateAuth } from "@/lib/apiUser";
import {PageLanding, PageWhatWeDo} from "@/src/pages/landing";

const UserNotLoggedInPage = ({isLoggedIn, setUsername, setIsLoggedIn}) => {
  return (
    <div className="home-container">
      <PageLanding />
      <div className="min-h-screen">
        <PageWhatWeDo />
        <WelcomePage setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  console.log("🚀 ~ Home ~ user:", user)

  useEffect(() => {
    const fetchLoginStatus = async () => {
      await checkLoginStatus({ setIsLoggedIn, setUsername });
      const userData = await getUserV2();
      setUser(userData);
     
    };
    fetchLoginStatus();
  }, [username]);

  if (!isLoggedIn) {
    return <UserNotLoggedInPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setUsername={setUsername}/>;
  }

  return <UserLoggedInPage username={username}/>;
}
