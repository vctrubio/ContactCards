import React from 'react';
import { Card, Organisation } from '@/types/backend';

// export const CardWallet: React.FC<{ card: Card }> = ({ card }) => {
export const CardWallet = ({ card }: { card: Card }) => {
    return (
        <div className="card wallet">
            {card.id}. {card.organisation.name} [ {card.employee} ]
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