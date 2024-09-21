export interface Organisation {
    id: number;
    name: string;
    about: string;
    www: string;
    location: string;
    cards: Card[];
}

export interface User {
    username: string;
    organisations: Organisation[];
    wallet: Wallet;
    employee_organisations: Organisation[];
    is_admin: boolean;
}

export interface Card {
    id: number;
    organisation: Organisation;
    employee: string,
    status: string;
}

export interface Wallet {
    id: number;
    cards: Card[];
}

