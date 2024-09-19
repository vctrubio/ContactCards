'use client'
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '@/lib/apiUser';
import { Card, Organisation } from '@/types/backend';
import { FaShareAlt, FaTrash, FaSave } from 'react-icons/fa';
import Image from "next/image";
import Link from 'next/link';
import { checkCardShare } from '@/lib/conditions';

function camelCaseToSpaces(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [users, setUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersData = await getAllUsers();
            setUsers(usersData);
            setSuggestions(usersData); // Show all users initially
        };

        fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value) {
            const filteredSuggestions = users.filter(user =>
                user.username.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions(users); // Show all users when input is empty
        }
    };

    const handleSuggestionClick = (user) => {
        if (selectedUsers.includes(user)) {
            setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleSendClick = () => {
        // Trigger an event with the selected users
        console.log('Selected Users:', selectedUsers);
        // Add your event handling logic here
    };

    const handleClose = () => {
        setSelectedUsers([]); // Clear the selected users list
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl mb-4 text-black">Input Field</h2>
                <input
                    type="text"
                    className="border p-2 w-full mb-4 text-black"
                    placeholder="Enter something..."
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <ul className="border p-2 w-full mb-4 text-black">
                    {suggestions.map(user => (
                        <li
                            key={user.id}
                            className={`p-2 hover:bg-gray-200 ${selectedUsers.includes(user) ? 'bg-green-200' : ''}`}
                            onClick={() => handleSuggestionClick(user)}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
                {selectedUsers.length > 0 && (
                    <div className="mb-4">
                        <button
                            onClick={handleSendClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Send
                        </button>
                    </div>
                )}
                <button
                    onClick={handleClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export const ItermWallet = ({ organisation = 'Organisation', name = 'NoName', descOne = 'email@gmail.com', descTwo = '652 432 112' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShareClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="iterm ">
            <div className="container-twoes">
                <div className="tv-on">
                    <Image
                        src="/icon.webp"  // Correctly reference the image in the public directory
                        alt="Icon"        // Provide a meaningful alt text
                        width={190}
                        height={190}
                    />
                    <div className='orgy'>
                        {organisation}
                    </div>
                </div>
                <div className="tv-controller">
                    <Link href={`/user/${name}`}>
                        <div className="title">
                            {camelCaseToSpaces(name)}
                        </div>
                    </Link>
                    <div className="content">
                        <div className="content-one">
                            {descOne}
                        </div>
                        <div className="content-two">
                            {descTwo}
                        </div>
                    </div>
                </div>
                <div className="last">
                    <div className='text-white hover:text-blue-500' onClick={handleShareClick}>
                        {
                            // checkCardShare() && 
                            < FaShareAlt size={24} className="text-inherit" />
                        }
                    </div>
                     {/* <div>
                        <FaTrash size={24} color="white" />
                    </div> */}
                    {/* <div>
                        <FaSave size={24} color="white" />
                    </div>  */}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export const CardOrganisation = ({ organisation }: { organisation: Organisation }) => {
    return (
        <div className="card organisation">
            {organisation.id} | {organisation.name}
        </div>
    );
}


export const CardOrganisationEmployee = ({ organisation }: { organisation: Organisation }) => {
    return (
        <div className="card employee">
            {organisation.id} | {organisation.name}
        </div>
    );
}