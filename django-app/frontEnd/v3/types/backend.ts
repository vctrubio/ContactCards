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
}