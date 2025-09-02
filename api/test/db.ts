import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
    try {
        const timestamp = new Date().toISOString();
        const message = `Test row created at ${timestamp}`;
        
        // Insert a test row
        await sql`
            INSERT INTO test_table (message) 
            VALUES (${message})
        `;

        // Retrieve the latest test row to confirm it was inserted
        const { rows } = await sql`
            SELECT * FROM test_table ORDER BY created_at DESC LIMIT 1
        `;

        if (rows.length === 0) {
            throw new Error('Failed to retrieve the inserted test row.');
        }

        return res.status(200).json({ success: true, data: rows[0] });

    } catch (error: any) {
        console.error('Database test error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Database test failed.', 
            error: error.message,
            // Provide a hint if the table doesn't exist (common first-time error)
            hint: error.code === '42P01' ? 'Did you run the SQL command to create the `test_table`?' : null
        });
    }
}
