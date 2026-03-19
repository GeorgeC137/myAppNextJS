export type NavItem = {
    id: number;
    path: string;
    name: string;
}

export type Post = {
    _id: string;
    userId?: string;
    img?: string;
    createdAt?: Date;
    title: string;
    desc: string;
    slug: string;
}

export type ClientSideProviderTestProps = {
    children: React.ReactNode
}

export type Params = {
    slug: string
}

export type SearchParams = {
    [key: string]: string | string[] | undefined
}

export interface Connection {
    isConnected?: number;
}

export type NewPost = {
    title: string;
    desc: string;
    slug: string;
    userId: string;
}

export type Session = {
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        isAdmin?: boolean;
    };
    expires: string;
} | null

export type FormState = {
    error?: string;
    success?: boolean;
    timestamp?: number;
}