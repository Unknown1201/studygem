import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../lib/supabaseAdmin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).setHeader('Allow', 'POST').json({ message: 'Method Not Allowed' });
    }

    try {
        const { userId, name, class: userClass, rollNumber } = req.body;

        if (!userId || !name || !userClass || !rollNumber) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const { error } = await supabaseAdmin.from('users').insert({
            user_id: userId,
            name: name,
            class: userClass,
            roll_number: rollNumber,
        });

        if (error) {
            console.error('Supabase error creating user:', error);
            // Handle potential duplicate user_id error (code 23505 for unique violation in Postgres)
            if (error.code === '23505') {
                 return res.status(409).json({ message: 'User ID already exists.' });
            }
            throw error;
        }

        return res.status(201).json({ message: 'User created successfully.' });

    } catch (error: any) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
}
