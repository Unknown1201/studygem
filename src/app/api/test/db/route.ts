import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic'; // prevent caching

export async function GET(request: Request) {
    if (!process.env.POSTGRES_URL) {
        return NextResponse.json({
            success: false,
            message: 'Database connection failed: Missing environment variable.',
            error: 'The POSTGRES_URL environment variable is not set for this deployment.',
            hint: 'Go to your Vercel project settings, navigate to "Environment Variables", and ensure your Vercel Postgres database variables are applied to all environments (Production, Preview, and Development). You may need to redeploy after making changes.'
        }, { status: 500 });
    }

    try {
        const timestamp = new Date().toISOString();
        const message = `Test row created at ${timestamp}`;
        
        await sql`
            INSERT INTO test_table (message) 
            VALUES (${message})
        `;

        const { rows } = await sql`
            SELECT * FROM test_table ORDER BY created_at DESC LIMIT 1
        `;

        if (rows.length === 0) {
            throw new Error('Failed to retrieve the inserted test row.');
        }

        return NextResponse.json({ success: true, data: rows[0] });

    } catch (error: any) {
        console.error('Database test error:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'Database test failed.', 
            error: error.message,
            hint: error.code === '42P01' ? 'Did you run the SQL command to create the `test_table`?' : 'The database connection details seem to be present, but the connection failed. Check your database status and network settings.'
        }, { status: 500 });
    }
}
