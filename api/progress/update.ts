import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '@/api/lib/mysql';

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
            // Assumes a UNIQUE or PRIMARY KEY constraint on (user_id, task_id) in the 'progress' table.
            const sql = `INSERT INTO progress (user_id, task_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE task_id = VALUES(task_id)`;
            await pool.execute(sql, [userId, taskId]);
        } else {
            const sql = `DELETE FROM progress WHERE user_id = ? AND task_id = ?`;
            await pool.execute(sql, [userId, taskId]);
        }
        
        return res.status(200).json({ message: 'Progress updated.' });

    } catch (error: any) {
        console.error('Error updating progress:', error);
        return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
}