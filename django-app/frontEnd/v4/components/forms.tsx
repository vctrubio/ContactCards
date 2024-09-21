'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useUser } from "@/types/hooks";

export const CreateOrganisationForm = () => {
    const { user } = useUser();
    const [organisation, setOrganisation] = useState({
        name: '',
        about: '',
        location: '',
        www: '',
    });
    const [employees, setEmployees] = useState([{ employee: '', status: '' }]);

    useEffect(() => {
        if (user && user.username) {
            setEmployees([{ employee: user.username, status: 'Admin' }]);
        }
    }, [user]);

    const handleOrgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrganisation((prevOrg) => ({
            ...prevOrg,
            [name]: value,
        }));
    };

    const handleEmployeeInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedEmployees = [...employees];
        updatedEmployees[index][name] = value;
        setEmployees(updatedEmployees);
    };

    const addEmployeeField = () => {
        setEmployees([...employees, { employee: '', status: '' }]);
    };

    const removeEmployeeField = (index: number) => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Handle form submission logic here
        console.log('Organisation:', organisation);
        console.log('Employees:', employees);

        // Perform API request to create organisation and employees
    };

    return (
        <div className="container mx-auto py-10">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">Create an Organisation</h1>
                <form onSubmit={handleSubmit}>
                    {/* Organisation Details */}
                    <div className="mb-4">
                        <TextField
                            label="Organisation Name"
                            name="name"
                            value={organisation.name}
                            onChange={handleOrgInputChange}
                            fullWidth
                            required
                            InputLabelProps={{ style: { color: 'gray' } }}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            label="About Organisation"
                            name="about"
                            value={organisation.about}
                            onChange={handleOrgInputChange}
                            fullWidth
                            multiline
                            required
                            InputLabelProps={{ style: { color: 'gray' } }}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            label="Location"
                            name="location"
                            value={organisation.location}
                            onChange={handleOrgInputChange}
                            fullWidth
                            required
                            InputLabelProps={{ style: { color: 'gray' } }}
                        />
                    </div>
                    <div className="mb-4">
                        <TextField
                            label="Website (www)"
                            name="www"
                            value={organisation.www}
                            onChange={handleOrgInputChange}
                            fullWidth
                            required
                            InputLabelProps={{ style: { color: 'gray' } }}
                        />
                    </div>

                    {/* Employees Section */}
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Employees Cards</h2>
                        {employees.map((employee, index) => (
                            <div key={index} className="mb-4 space-y-2">
                                <TextField
                                    label="Employee Name"
                                    name="employee"
                                    value={employee.employee}
                                    onChange={(e) => handleEmployeeInputChange(index, e)}
                                    fullWidth
                                    required
                                    InputLabelProps={{ style: { color: 'gray' } }}
                                />
                                <TextField
                                    label="Employee Status"
                                    name="status"
                                    value={employee.status}
                                    onChange={(e) => handleEmployeeInputChange(index, e)}
                                    fullWidth
                                    InputLabelProps={{ style: { color: 'gray' } }}
                                />
                                <IconButton color="secondary" onClick={() => removeEmployeeField(index)}>
                                    <Delete />
                                </IconButton>
                            </div>
                        ))}
                        <Button variant="outlined" color="primary" onClick={addEmployeeField} startIcon={<Add />}>
                            Add Employee
                        </Button>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="primary">
                        Create Organisation
                    </Button>
                </form>
            </div>
        </div>
    );
};
