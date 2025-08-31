import type { VercelRequest, VercelResponse } from '@vercel/node';
import db from '../db';

async function handleGet(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    const connection = await db.getConnection();
    try {
        // Fetch user data
        const [userRows]: any = await connection.execute('SELECT user_id, name, class, roll_number FROM users WHERE user_id = ?', [id]);
        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const userData = {
            userId: userRows[0].user_id,
            name: userRows[0].name,
            class: userRows[0].class,
            rollNumber: userRows[0].roll_number
        };

        // Fetch progress data
        const [progressRows]: any = await connection.execute('SELECT task_id FROM progress WHERE user_id = ?', [id]);
        const progress = progressRows.reduce((acc: any, row: any) => {
            acc[row.task_id] = true;
            return acc;
        }, {});

        res.status(200).json({ userData, progress });
    } finally {
        connection.release();
    }
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

    const connection = await db.getConnection();
    try {
        const [result]: any = await connection.execute(
            'UPDATE users SET name = ?, class = ?, roll_number = ? WHERE user_id = ?',
            [name, userClass, rollNumber, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found to update.' });
        }
        
        res.status(200).json({ message: 'User updated successfully.' });
    } finally {
        connection.release();
    }
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
    } catch (error) {
        console.error('API Error for /user/[id]:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
