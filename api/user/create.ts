import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).setHeader('Allow', 'POST').json({ message: 'Method Not Allowed' });
    }

    try {
        const { userId, name, class: userClass, rollNumber } = req.body;

        if (!userId || !name || !userClass || !rollNumber) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        await sql`
            INSERT INTO users (user_id, name, class, roll_number) 
            VALUES (${userId}, ${name}, ${userClass}, ${rollNumber})
        `;

        return res.status(201).json({ message: 'User created successfully.' });

    } catch (error: any) {
        console.error('Error creating user:', error);
        // PostgreSQL error code for unique violation
        if (error.code === '23505') {
             return res.status(409).json({ message: 'User ID already exists.' });
        }
        return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
}
