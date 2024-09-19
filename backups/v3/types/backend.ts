export interface Organisation {
    id: number;
    name: string;
    about: string;
    www: string;
    location: string;
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
}

export interface Wallet {
    id: number;
    cards: Card[];
}

