import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!id || typeof id !== 'string') {
            return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
        }

        const { rowCount } = await sql`SELECT 1 FROM users WHERE user_id = ${id} LIMIT 1`;
            
        const exists = rowCount > 0;

        return NextResponse.json({ exists });

    } catch (error: any) {
        console.error('Error checking user ID:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
