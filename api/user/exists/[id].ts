import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).setHeader('Allow', 'GET').json({ message: 'Method Not Allowed' });
    }

    try {
        const { id } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const { data, error } = await supabaseAdmin
            .from('users')
            .select('user_id')
            .eq('user_id', id)
            .limit(1);
            
        if (error) {
            throw error;
        }

        return res.status(200).json({ exists: data !== null && data.length > 0 });

    } catch (error: any) {
        console.error('Error checking user ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
