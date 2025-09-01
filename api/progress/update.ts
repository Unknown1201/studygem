import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../lib/supabaseAdmin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).setHeader('Allow', 'POST').json({ message: 'Method Not Allowed' });
    }

    try {
        const { userId, taskId, completed } = req.body;

        if (!userId || !taskId || typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Missing required fields: userId, taskId, completed' });
        }

        let error;
        if (completed) {
            // Add progress record
            const result = await supabaseAdmin.from('progress').upsert({ user_id: userId, task_id: taskId });
            error = result.error;
        } else {
            // Remove progress record
            const result = await supabaseAdmin.from('progress').delete().match({ user_id: userId, task_id: taskId });
            error = result.error;
        }
        
        if (error) {
            throw error;
        }

        return res.status(200).json({ message: 'Progress updated.' });

    } catch (error: any) {
        console.error('Error updating progress:', error);
        return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
}
