import { Card, Organisation } from '@/types/backend';
import { fetchOrganisationById } from '@/lib/apiOrganisation';

export const mapUserIdOrgIdToCard = async (usernameId: string, orgId: string): Promise<Card | null> => {
    if (!usernameId)
        throw new Error('UsernameId not found');
    if (!orgId)
        throw new Error('OrganisationId not found');

    const org = await fetchOrganisationById(orgId);
    if (!org)
        throw new Error(`OrganisationId ${orgId} not found`);

    const card = org.cards.find((card: Card) => card.employee === usernameId) as Card | undefined;
    if (!card)
        throw new Error(`No card found for employee ID ${usernameId} in organisation ${orgId}`);

    return card
}