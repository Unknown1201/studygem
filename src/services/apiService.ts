import { supabase } from './supabaseClient';
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

export const createUser = async (userData: UserProfile): Promise<boolean> => {
    try {
        const { error } = await supabase.from('users').insert({
            user_id: userData.userId,
            name: userData.name,
            class: userData.class,
            roll_number: userData.rollNumber,
        });
        if (error) {
            console.error('Error creating user:', error);
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
};

export const loadUser = async (userId: string): Promise<LoadUserResponse | null> => {
    try {
        const { data: userRow, error: userError } = await supabase
            .from('users')
            .select('user_id, name, class, roll_number')
            .eq('user_id', userId)
            .single();

        if (userError || !userRow) {
            console.error('Error loading user data:', userError);
            return null;
        }

        const { data: progressRows, error: progressError } = await supabase
            .from('progress')
            .select('task_id')
            .eq('user_id', userId);

        if (progressError) {
            console.error('Error loading progress data:', progressError);
        }

        const userData: UserProfile = {
            userId: userRow.user_id,
            name: userRow.name,
            class: userRow.class,
            rollNumber: userRow.roll_number,
        };
        
        const progress: Progress = (progressRows || []).reduce((acc: Progress, row: { task_id: string }) => {
            acc[row.task_id] = true;
            return acc;
        }, {});

        return { userData, progress };
    } catch (error) {
        console.error('Error loading user:', error);
        return null;
    }
};

export const updateUser = async (userData: UserProfile): Promise<UpdateResult> => {
    try {
        const { error } = await supabase
            .from('users')
            .update({
                name: userData.name,
                class: userData.class,
                roll_number: userData.rollNumber,
            })
            .eq('user_id', userData.userId);

        if (error) {
            console.error('Error updating user:', error);
            return { success: false, message: error.message || "Failed to update." };
        }
        return { success: true };
    } catch (error: any) {
        console.error('Error updating user:', error);
        return { success: false, message: error.message || "An unexpected error occurred." };
    }
};

export const isUserIdTaken = async (userId: string): Promise<boolean> => {
    try {
        const { error, count } = await supabase
            .from('users')
            .select('user_id', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (error) {
            console.error('Error checking user ID:', error);
            return true; // Fail safe
        }
        return count !== null && count > 0;
    } catch (error) {
        console.error('Error checking user ID:', error);
        return true; // Fail safe
    }
};

export const updateProgress = async (userId: string, taskId: string, completed: boolean): Promise<boolean> => {
    try {
        if (completed) {
            const { error } = await supabase
                .from('progress')
                .upsert({ user_id: userId, task_id: taskId });
            if (error) {
                console.error('Error adding progress:', error);
                return false;
            }
        } else {
            const { error } = await supabase
                .from('progress')
                .delete()
                .match({ user_id: userId, task_id: taskId });
            if (error) {
                console.error('Error deleting progress:', error);
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error('Error updating progress:', error);
        return false;
    }
};