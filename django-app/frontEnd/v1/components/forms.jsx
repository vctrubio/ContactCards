'use client';

import React, { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from 'sonner';
import {getCSRFToken} from '@/lib/apiUser';

export const OrganisationForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        about: formData.get('about'),
        www: formData.get('www'),
        location: formData.get('location')
    };
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL_ORGS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken()
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        toast.success('Organisation created successfully');
        e.target.reset();
        //needs to update useeffect....
    } catch (error) {
        console.log('error:', error);
        toast.error(`Error: ${error.message}`);
    }
};
  return (
    <div>
      <form className='flex flex-col space-y-2 text-black mt-4' onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" className='border border-black p-2' />
        <input type="text" name="about" placeholder="About" className='border border-black p-2' />
        <input type="text" name="www" placeholder="Website" className='border border-black p-2' />
        <input type="text" name="location" placeholder="Location" className='border border-black p-2' />
        <button type="submit" className='text-white border border-white rounded p-2'>Create</button>
      </form>
    </div>
  );
};
