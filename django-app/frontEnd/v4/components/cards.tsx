'use client'
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '@/lib/apiUser';
import { Card, Organisation } from '@/types/backend';
import { FaShareAlt, FaTrash, FaSave } from 'react-icons/fa';
import Image from "next/image";
import Link from 'next/link';
import { checkCardShare } from '@/lib/conditions';
import { TextField, Button } from '@mui/material';

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
    const [isEditing, setIsEditing] = useState(false);
    const [editedOrg, setEditedOrg] = useState<Organisation>(organisation);
    const [cards, setCards] = useState(organisation.cards || []);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleOrgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedOrg((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCardInputChange = (id: number, field: string, value: string) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card.id === id
                    ? {
                          ...card,
                          [field]: value,
                      }
                    : card
            )
        );
    };

    const handleSaveChanges = () => {
        // Handle saving organisation and card changes
        console.log('Saving Organisation:', editedOrg);
        console.log('Saving Cards:', cards);
        setIsEditing(false);
    };

    const handleDeleteCard = (id: number) => {
        // Handle deleting a card
        console.log(`Delete card with ID: ${id}`);
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    };

    const handleDeleteOrganisation = () => {
        // Handle deleting the organisation
        console.log(`Delete organisation with ID: ${organisation.id}`);
        // Make an API call here to delete the organisation and handle the result
    };

    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4 hover:shadow-lg transition-shadow">
            {isEditing ? (
                <>
                    <TextField
                        label="Name"
                        name="name"
                        value={editedOrg.name}
                        onChange={handleOrgInputChange}
                        fullWidth
                    />
                    <TextField
                        label="About"
                        name="about"
                        value={editedOrg.about}
                        onChange={handleOrgInputChange}
                        fullWidth
                        multiline
                    />
                    <TextField
                        label="Website"
                        name="www"
                        value={editedOrg.www}
                        onChange={handleOrgInputChange}
                        fullWidth
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={editedOrg.location}
                        onChange={handleOrgInputChange}
                        fullWidth
                    />
                </>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-gray-900">{organisation.name}</h2>
                    <p className="text-gray-700">{organisation.about}</p>
                    <p className='text-gray-700'>{organisation.www}</p>
                    <p className="text-gray-600">📍{organisation.location}</p>
                </>
            )}

            {/* Display Employee Cards */}
            <div className="mt-4">
                <h3 className="text-xl font-bold text-black">Employees</h3>
                {cards.map((card) => (
                    <div key={card.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                        {isEditing ? (
                            <>
                                <TextField
                                    label="Employee"
                                    name="employee"
                                    value={card.employee}
                                    onChange={(e) => handleCardInputChange(card.id, 'employee', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="Status"
                                    name="status"
                                    value={card.status || ''}
                                    onChange={(e) => handleCardInputChange(card.id, 'status', e.target.value)}
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteCard(card.id)}
                                    className="mt-2"
                                >
                                    Delete Card
                                </Button>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-700">Employee: {card.employee}</p>
                                <p className="text-gray-700">Status: {card.status || 'No status'}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="">
                {isEditing ? (
                    <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                ) : (
                    <Button variant="outlined" color="primary" onClick={toggleEdit}>
                        Edit
                    </Button>
                )}

                <Button variant="contained" color="error" onClick={handleDeleteOrganisation}>
                    Delete Organisation
                </Button>
            </div>
        </div>
    );
};

export const CardOrganisationEmployee = ({ organisation }: { organisation: Organisation }) => {
    return (
        <div className="card employee">
            {organisation.id} | {organisation.name}
        </div>
    );
}