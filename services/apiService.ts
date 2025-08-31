import type { Progress, UserData } from '../types';

type UserProfile = Omit<UserData, 'currentStandard' | 'currentExam' | 'currentSubject' | 'currentChapter'>;

interface LoadUserResponse {
    userData: UserProfile;
    progress: Progress;
}

interface UpdateResult {
    success: boolean;
    message?: string;
}

// Replaces the old mock implementation with fetch calls to the new Vercel serverless API.

export const createUser = async (userData: UserProfile): Promise<boolean> => {
    try {
        const response = await fetch('/api/user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return response.ok;
    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
};

export const loadUser = async (userId: string): Promise<LoadUserResponse | null> => {
    try {
        const response = await fetch(`/api/user/${userId}`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Error loading user:', error);
        return null;
    }
};

export const updateUser = async (userData: UserProfile): Promise<UpdateResult> => {
    try {
        const response = await fetch(`/api/user/${userData.userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (response.ok) {
            return { success: true };
        }
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Failed to update." };
    } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, message: "An unexpected error occurred." };
    }
};

export const isUserIdTaken = async (userId: string): Promise<boolean> => {
    try {
        const response = await fetch(`/api/user/exists/${userId}`);
        if (response.ok) {
            const { exists } = await response.json();
            return exists;
        }
        return true; // Fail safe
    } catch (error) {
        console.error('Error checking user ID:', error);
        return true; // Fail safe
    }
};

export const updateProgress = async (userId: string, taskId: string, completed: boolean): Promise<boolean> => {
    try {
        const response = await fetch('/api/progress/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, taskId, completed }),
        });
        return response.ok;
    } catch (error) {
        console.error('Error updating progress:', error);
        return false;
    }
};
