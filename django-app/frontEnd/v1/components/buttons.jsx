'use client'

import { deleteAllOrganisation } from '@/lib/apiOrganisation';
import { toast, Toaster } from 'sonner';

export const DeleteAllOrganisations = () => {
    const handleClick = async () => {
        try {
            const res = await deleteAllOrganisation();
            console.log(res.message);
            toast.success(res.message);
            // this is not getting the same and the django 
        } catch (error) {
            toast.error('Error deleting organisations!');
        }
    }

    return (
        <div className="border rounded px-4">
            <button onClick={handleClick}>DAO</button>
            <Toaster position='bottom-left'/>
        </div>
    );
}