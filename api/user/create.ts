import type { VercelRequest, VercelResponse } from '@vercel/node';
import db from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).setHeader('Allow', 'POST').json({ message: 'Method Not Allowed' });
    }

    try {
        const { userId, name, userClass, rollNumber } = req.body;

        if (!userId || !name || !userClass || !rollNumber) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const connection = await db.getConnection();
        await connection.execute(
            'INSERT INTO users (user_id, name, class, roll_number) VALUES (?, ?, ?, ?)',
            [userId, name, userClass, rollNumber]
        );
        connection.release();

        return res.status(201).json({ message: 'User created successfully.' });

    } catch (error: any) {
        console.error('Error creating user:', error);
        // Handle potential duplicate user_id error
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'User ID already exists.' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
