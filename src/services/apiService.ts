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

// --- Offline Mode Logic ---

const OFFLINE_DB_KEY = 'studygem_offline_data';

interface OfflineDB {
    users: { [userId: string]: UserProfile };
    progress: { [userId: string]: Progress };
}

const getOfflineData = (): OfflineDB => {
    try {
        const data = localStorage.getItem(OFFLINE_DB_KEY);
        return data ? JSON.parse(data) : { users: {}, progress: {} };
    } catch {
        return { users: {}, progress: {} };
    }
};

const setOfflineData = (data: OfflineDB) => {
    try {
        localStorage.setItem(OFFLINE_DB_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to save offline data:", error);
    }
};

// --- API Service Functions ---

export const createUser = async (userData: UserProfile, isOffline: boolean): Promise<boolean> => {
    if (isOffline) {
        const db = getOfflineData();
        if (db.users[userData.userId]) {
            console.error('Offline user creation failed: ID already exists');
            return false;
        }
        db.users[userData.userId] = userData;
        db.progress[userData.userId] = {}; // Initialize progress
        setOfflineData(db);
        return true;
    }

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

export const loadUser = async (userId: string, isOffline: boolean): Promise<LoadUserResponse | null> => {
     if (isOffline) {
        const db = getOfflineData();
        const userData = db.users[userId];
        const progress = db.progress[userId];
        if (userData) {
            return { userData, progress: progress || {} };
        }
        return null;
    }

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

export const updateUser = async (userData: UserProfile, isOffline: boolean): Promise<UpdateResult> => {
    if (isOffline) {
        const db = getOfflineData();
        if (!db.users[userData.userId]) {
            return { success: false, message: "User not found locally." };
        }
        db.users[userData.userId] = userData;
        setOfflineData(db);
        return { success: true };
    }

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

export const isUserIdTaken = async (userId: string, isOffline: boolean): Promise<boolean> => {
    if (isOffline) {
        const db = getOfflineData();
        return !!db.users[userId];
    }
    
    try {
        const response = await fetch(`/api/user/exists/${userId}`);
        if (response.ok) {
            const { exists } = await response.json();
            return exists;
        }
        // Fail safe for server errors
        throw new Error(`Server responded with ${response.status}`);
    } catch (error) {
        console.error('Error checking user ID:', error);
        throw error; // Re-throw to be caught by the caller
    }
};

export const updateProgress = async (userId: string, taskId: string, completed: boolean, isOffline: boolean): Promise<boolean> => {
    if (isOffline) {
        const db = getOfflineData();
        if (!db.progress[userId]) {
            db.progress[userId] = {};
        }
        if (completed) {
            db.progress[userId][taskId] = true;
        } else {
            delete db.progress[userId][taskId];
        }
        setOfflineData(db);
        return true;
    }

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