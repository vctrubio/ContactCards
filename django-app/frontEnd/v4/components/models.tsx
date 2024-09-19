import React from 'react';

// Importing types
import { User, Organisation, Card, Wallet } from "@/types/backend";

// ModelView component to display individual models (like Organisations)
interface ModelViewProps {
    model: Organisation[] | Card[];
    title: string,
}


export const ModelView: React.FC<ModelViewProps> = ({ model, title }) => {
    return (
        <div className="model-container">
            <h1>{title} - {model?.length}</h1>
            <p>hi</p>
        </div>
    );
};


interface UserModelsProps {
    user: User;  // Expecting a User object as a prop
}

export const UserModels: React.FC<UserModelsProps> = ({ user }) => {

    const { organisations, wallet } = user;
    const cards: Card[] = wallet?.cards;
    const employeeOrganisations: Organisation[] = user.employee_organisations;

    console.log("🚀 ~ employeeOrganisations:", employeeOrganisations)
    console.log("🚀 ~ cards:", cards)
    console.log("🚀 ~ organisations:", organisations)

    return (
        <div className='flex w-full gap-5'>
            {cards ? ModelView({ model: cards, title: 'My Wallet' }) : ModelView({ model: cards, title: 'My Empty Wallet' })}
            {employeeOrganisations && ModelView({ model: employeeOrganisations, title: 'My Employee Cards' })}
            {organisations && ModelView({ model: organisations, title: 'My Organisations' })}
        </div>
    );
};
