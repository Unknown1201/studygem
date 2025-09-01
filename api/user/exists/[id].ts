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

        const { error, count } = await supabaseAdmin
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', id);
            
        if (error) {
            throw error;
        }

        return res.status(200).json({ exists: count !== null && count > 0 });

    } catch (error: any) {
        console.error('Error checking user ID:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
