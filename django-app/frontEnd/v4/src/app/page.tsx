'use client'
import React, { useState, useEffect } from "react";
import WelcomePage from "@/src/pages/login";
import { getUserV2 } from "@/lib/apiUser";
import { PageLanding, PageWhatWeDo } from "@/src/pages/landing";
import { SponsorPage } from "@/src/pages/sponsor";
import { SubscribeButton } from "@/components/buttons";
import { UserHelloForm } from '@/src/pages/login'

import { User } from "@/types/backend";
import { UserModels } from "@/components/models";
import Link from "next/link";

const UserNotLoggedInPage = ({ setUser, user }) => {
  return (
    <div className="home-container">
      <PageLanding />
      <div className="min-h-screen">
        <PageWhatWeDo />
        <WelcomePage setUser={setUser} user={user} />
        <SponsorPage />
      </div>
    </div>
  )
}

const UserLoggedInPage = ({ user, setUser }) => {
  return (
    <div className="flex flex-col gap-5 p-6">

      <div style={{ width: '450px' }}>
        {!user.is_staff ?
          <SubscribeButton setUser={setUser} /> :
          <Link href="/dashboard" className="bg-green-500 ">
            Go TO DASHBoard
          </Link>
        }
        <UserHelloForm user={user} setUser={setUser} />
      </div>
      <UserModels user={user} />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}




export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchLoginStatus = async () => {
      const userData = await getUserV2();
      setUser(userData);

    };
    fetchLoginStatus();
  }, [setUser]);

  if (!user) {
    return <UserNotLoggedInPage setUser={setUser} user={user} />;
  }

  return <UserLoggedInPage user={user} setUser={setUser} />;
}
