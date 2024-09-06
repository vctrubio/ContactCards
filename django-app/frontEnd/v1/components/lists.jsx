'use client'
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { getCSRFToken } from '@/lib/apiUser';

export const CreateList = ({ setOpenList, openList, selectedOrganisations, setSelectedOrganisations }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOpenList(false);
        const nameValue = e.target.name.value;
        const isPublicValue = e.target.isPublic.checked;
        console.log('ispublic value:', isPublicValue);
        const organisationsId = selectedOrganisations.map(org => org.id);

        setSelectedOrganisations([])
        try {
            const response = await fetch('http://localhost:8000/organisations/list/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken(),
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: nameValue,
                    is_public: isPublicValue,
                    organisations: organisationsId
                }),
            })

        }
        catch (error) {
            console.error('Error creating list:', error);
            toast.error('Error creating list');
        }

        toast.success('List created successfully');
    };


    const ListForm = () => {
        return (
            <form className='flex justify-between gap-1' onSubmit={handleSubmit}>
                <div className=''>
                    <input
                        type="text"
                        id="name"
                        placeholder='Name'
                        className="mt-1 block w-full py-2 pl-2 border border-gray-300 rounded-md text-black"
                        required
                    />
                </div>
                <div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isPublic"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            defaultChecked
                        />
                        <label>Public?</label>
                    </div>
                    <button type="submit" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={() => setOpenList(!openList)}
            >
                Create List
            </button>

            {openList && (
                <ListForm submitBtn={handleSubmit} />
            )}

        </div>
    );
}
