import type { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../lib/mysql';

async function handleGet(req: VercelRequest, res: VercelResponse) {
    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    // Fetch user data
    const userSql = `SELECT user_id, name, class, roll_number FROM users WHERE user_id = ?`;
    const [userRows]: any[] = await pool.query(userSql, [id]);

    if (userRows.length === 0) {
        return res.status(404).json({ message: 'User not found.' });
    }
    const userRow = userRows[0];
    const userData = {
        userId: userRow.user_id,
        name: userRow.name,
        class: userRow.class,
        rollNumber: userRow.roll_number
    };

    // Fetch progress data
    const progressSql = `SELECT task_id FROM progress WHERE user_id = ?`;
    const [progressRows]: any[] = await pool.query(progressSql, [id]);

    const progress = progressRows.reduce((acc: any, row: any) => {
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
    
    const sql = `UPDATE users SET name = ?, class = ?, roll_number = ? WHERE user_id = ?`;
    const [result]: [any, any] = await pool.execute(sql, [name, userClass, rollNumber, id]);

    if (result.affectedRows === 0) {
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
