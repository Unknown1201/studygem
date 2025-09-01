import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabaseAdmin } from '../lib/supabaseAdmin';

async function handleGet(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    // Fetch user data
    const { data: userRow, error: userError } = await supabaseAdmin
        .from('users')
        .select('user_id, name, class, roll_number')
        .eq('user_id', id)
        .single();
    
    if (userError || !userRow) {
        console.error('Supabase user fetch error:', userError);
        return res.status(404).json({ message: 'User not found.' });
    }
    const userData = {
        userId: userRow.user_id,
        name: userRow.name,
        class: userRow.class,
        rollNumber: userRow.roll_number
    };

    // Fetch progress data
    const { data: progressRows, error: progressError } = await supabaseAdmin
        .from('progress')
        .select('task_id')
        .eq('user_id', id);

    if (progressError) {
        // Log the error but don't fail the request, just return empty progress
        console.error('Supabase progress fetch error:', progressError);
    }
    const progress = (progressRows || []).reduce((acc: any, row: any) => {
        acc[row.task_id] = true;
        return acc;
    }, {});

    res.status(200).json({ userData, progress });
}

async function handlePut(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    const { name, userClass, rollNumber } = req.body;
    if (!name || !userClass || !rollNumber) {
        return res.status(400).json({ message: 'Missing required fields for update.' });
    }
    
    const { data, error } = await supabaseAdmin
        .from('users')
        .update({ name: name, class: userClass, roll_number: rollNumber })
        .eq('user_id', id)
        .select(); // .select() is needed to check if a row was actually updated

    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ message: 'User not found to update.' });
    }
    
    res.status(200).json({ message: 'User updated successfully.' });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        if (req.method === 'GET') {
            await handleGet(req, res);
        } else if (req.method === 'PUT') {
            await handlePut(req, res);
        } else {
            res.status(405).setHeader('Allow', ['GET', 'PUT']).json({ message: 'Method Not Allowed' });
        }
    } catch (error: any) {
        console.error('API Error for /user/[id]:', error);
        res.status(500).json({ message: 'Internal Server Error', details: error.message });
    }
}
