export type Paginated<T> = { count: number, next: string, previous: string, results: T }


export type User = {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    bio: string;
    avatar: string;
    preferences: string[];
}
export type Channel = {
    id: number;
    name: string;
    description: string;
    members: User[]
}