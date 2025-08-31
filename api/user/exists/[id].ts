import type { VercelRequest, VercelResponse } from '@vercel/node';
import db from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).setHeader('Allow', 'GET').json({ message: 'Method Not Allowed' });
    }

    try {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const connection = await db.getConnection();
        const [rows]: any = await connection.execute(
            'SELECT user_id FROM users WHERE user_id = ?',
            [id]
        );
        connection.release();

        return res.status(200).json({ exists: rows.length > 0 });

    } catch (error) {
        console.error('Error checking user ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
