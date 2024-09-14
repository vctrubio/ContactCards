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
}

export interface Card {
    id: number;
    organisation: Organisation;
    employee: User;
}

export interface Wallet {
    id: number;
    cards: Card[];
}

