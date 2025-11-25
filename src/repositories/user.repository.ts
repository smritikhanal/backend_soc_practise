import { User } from '../types/user.types'; 

let users: User[] = [
    { id: "user1", username: "john_doe", email: "john@example.com", name:"John Doe", age: 30 },
    { id: "user2", username: "jane_doe", email: "jane@example.com", name:"Jane Doe", age: 25 },
];

export const userRepository = {
    getAll: (): User[] => users,
    getById: (id: string): User | undefined => users.find (u => u.id === id),
    create : (user: User): User =>{
        users.push(user);
        return user;
    },
    update: (id: string, updated: Partial<User>): User | undefined => {
        const index = users.findIndex (u => u.id === id);
        if (index === -1) return undefined;
        users[index] = { ...users[index], ...updated};
        return users[index];
    },
    delete: (id: string): boolean => {
        const index = users.findIndex (u => u.id === id);
        if (index === -1) return false;
        users.splice(index, 1);
        return true;
    },

    findByEmail: (email: string): User| undefined => users.find (u => u.email === email),
    findByUsername: (username: string): User | undefined => users.find (u => u.username === username),
    findById: (id: string): User | undefined => users.find (u => u.id === id),
    findByEmailExcludingId: (email: string, id: string): User | undefined =>
    users.find(u => u.email === email && u.id !== id),
    findByUsernameExcludingId: (username: string, id: string): User | undefined =>
    users.find(u => u.username === username && u.id !== id),
};