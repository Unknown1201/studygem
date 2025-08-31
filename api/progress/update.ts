import type { VercelRequest, VercelResponse } from '@vercel/node';
import db from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).setHeader('Allow', 'POST').json({ message: 'Method Not Allowed' });
    }

    try {
        const { userId, taskId, completed } = req.body;

        if (!userId || !taskId || typeof completed !== 'boolean') {
            return res.status(400).json({ message: 'Missing required fields: userId, taskId, completed' });
        }

        const connection = await db.getConnection();
        
        if (completed) {
            // Add progress record, ignoring if it already exists to prevent errors
            await connection.execute(
                'INSERT INTO progress (user_id, task_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE task_id=task_id',
                [userId, taskId]
            );
        } else {
            // Remove progress record
            await connection.execute(
                'DELETE FROM progress WHERE user_id = ? AND task_id = ?',
                [userId, taskId]
            );
        }
        
        connection.release();
        return res.status(200).json({ message: 'Progress updated.' });

    } catch (error) {
        console.error('Error updating progress:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
