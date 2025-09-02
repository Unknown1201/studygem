import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '@/api/lib/mysql';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).setHeader('Allow', 'GET').json({ message: 'Method Not Allowed' });
    }

    try {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const sql = `SELECT user_id FROM users WHERE user_id = ? LIMIT 1`;
        const [rows] = await pool.query(sql, [id]);
            
        const exists = Array.isArray(rows) && rows.length > 0;

        return res.status(200).json({ exists });

    } catch (error: any) {
        console.error('Error checking user ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}