import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).setHeader('Allow', 'GET').json({ message: 'Method Not Allowed' });
    }

    try {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const { rowCount } = await sql`SELECT 1 FROM users WHERE user_id = ${id} LIMIT 1`;
            
        const exists = rowCount > 0;

        return res.status(200).json({ exists });

    } catch (error: any) {
        console.error('Error checking user ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
