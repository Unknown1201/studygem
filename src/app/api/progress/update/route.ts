import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        const { userId, taskId, completed } = await request.json();

        if (!userId || !taskId || typeof completed !== 'boolean') {
            return NextResponse.json({ message: 'Missing required fields: userId, taskId, completed' }, { status: 400 });
        }

        if (completed) {
            await sql`
                INSERT INTO progress (user_id, task_id) 
                VALUES (${userId}, ${taskId}) 
                ON CONFLICT (user_id, task_id) DO NOTHING
            `;
        } else {
            await sql`
                DELETE FROM progress 
                WHERE user_id = ${userId} AND task_id = ${taskId}
            `;
        }
        
        return NextResponse.json({ message: 'Progress updated.' }, { status: 200 });

    } catch (error: any) {
        console.error('Error updating progress:', error);
        return NextResponse.json({ message: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
