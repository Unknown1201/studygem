import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).setHeader('Allow', 'POST').json({ message: 'Method Not Allowed' });
    }

    try {
        const { userId, taskId, completed } = req.body;

        if (!userId || !taskId || typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Missing required fields: userId, taskId, completed' });
        }

        if (completed) {
            // Use ON CONFLICT to prevent duplicates, which is the PostgreSQL equivalent of ON DUPLICATE KEY UPDATE.
            await sql`
                INSERT INTO progress (user_id, task_id) 
                VALUES (${userId}, ${taskId}) 
                ON CONFLICT (user_id, task_id) DO NOTHING
            `;
        } else {
            await sql`
                DELETE FROM progress 
                WHERE user_id = ${userId} AND task_id = ${taskId}
            `;
        }
        
        return res.status(200).json({ message: 'Progress updated.' });

    } catch (error: any) {
        console.error('Error updating progress:', error);
        return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
}
