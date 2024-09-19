import { Card, User } from '@/types/backend';

export function checkCardShare({ card = null, user = null }: { card: Card | null, user: User | null }): boolean {
    /*
    return true if 
        -user is employee of card
        -user is admin of organisation
        -user has card in wallet
    */
    return (true)
}