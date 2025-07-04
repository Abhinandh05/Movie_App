
import { Account, Client, ID } from 'appwrite';

// ✅ Initialize Appwrite Client
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const ENDPOINT = 'https://cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

const account = new Account(client);

// ✅ Register User
export const registerUser = async (email: string, password: string, name: string) => {
    try {
        const response = await account.create(ID.unique(), email, password, name);
        return response;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

// ✅ Login User
export const loginUser = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// ✅ Get Current User
export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
};

// ✅ Logout User
export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
