'use client'
import React, {useState, useEffect} from "react";
import WelcomePage from "@/components/login";
import { checkLoginStatus } from "@/lib/apiUser";
import {PageLanding, PageWhatWeDo} from "@/src/pages/loggin";

const UserNotLoggedInPage = () => {
  return (
    <div className="home-container">
      <PageLanding />
      <div className="min-h-screen">
        <PageWhatWeDo />
        <WelcomePage />
      </div>
    </div>
  )
}

const UserLoggedInPage = () => {
  return (
    <>
      Hello nobody
    </>
  )
}


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');


  // Fetch login status client-side
  useEffect(() => {
    const fetchLoginStatus = async () => {
      await checkLoginStatus({ setIsLoggedIn, setUsername });
    };
    fetchLoginStatus();
  }, []);

  if (!isLoggedIn) {
    return <UserNotLoggedInPage />;
  }

  return <UserLoggedInPage />;
}
