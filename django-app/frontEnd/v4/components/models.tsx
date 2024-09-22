import React, { useState, useEffect } from 'react';

// Importing types
import { User, Organisation, Card, Wallet } from "@/types/backend";
import { CardOrganisation, ContactCard } from './cards';
import { getCardById } from '@/lib/apiCard';
import { mapUserIdOrgIdToCard } from '@/lib/getters';

// ModelView component to display individual models (like Organisations)
interface ModelViewProps {
    model: Organisation[] | Card[];
    title: string,
    username: string,
}

const RenderCardFromId = ({ userId, orgId }: { userId: string; orgId: string }) => {
    const [card, setCard] = useState<Card | null>(null);
    useEffect(() => {
        mapUserIdOrgIdToCard(userId, orgId).then((card) => {
            setCard(card);
        });
    }, [userId, orgId]);
    if (!card) return null
    return <ContactCard card={card} />;
};

export const ModelView: React.FC<ModelViewProps> = ({ model, title, username }) => {
    return (
        <div className="model-container">
            <h1>{title} - {model?.length}</h1>
            {title === 'Organisations' &&
                <div className="flex flex-col gap-8">
                    {model?.map((org) => (
                        <CardOrganisation key={org.id} organisation={org} showEdit={false} />
                    ))}
                </div>
            }
            {title === 'My Wallet' &&
                <div className="flex flex-col gap-8">
                    {model?.map((card) => (
                        <ContactCard key={card.id} card={card} />
                    ))}
                </div>
            }
            {title === 'My Employee Cards' &&
                <div className="flex flex-col gap-8">
                    {model?.map((card) => (
                        <div key={card.id} className='border rounded'>
                            <>
                                <RenderCardFromId orgId={card.id} userId={username} />
                            </>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export const UserModels = ({ user } : {user: User}) => {
    const { organisations, wallet } = user;
    const cards: Card[] = wallet?.cards;
    const employeeOrganisations: Organisation[] = user.employee_organisations;

    return (
        <div className='all-models'>
            {cards ? ModelView({ model: cards, title: 'My Wallet', username: user.username }) : ModelView({ model: cards, title: 'My Empty Wallet', username: user.username })}
            {employeeOrganisations && ModelView({ model: employeeOrganisations, title: 'My Employee Cards', username: user.username })}
            {organisations && ModelView({ model: organisations, title: 'Organisations', username: user.username })}
        </div>
    );
};
