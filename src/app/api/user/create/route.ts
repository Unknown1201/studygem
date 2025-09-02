import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        const { userId, name, class: userClass, rollNumber } = await request.json();

        if (!userId || !name || !userClass || !rollNumber) {
            return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
        }

        await sql`
            INSERT INTO users (user_id, name, class, roll_number) 
            VALUES (${userId}, ${name}, ${userClass}, ${rollNumber})
        `;

        return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });

    } catch (error: any) {
        console.error('Error creating user:', error);
        if (error.code === '23505') {
             return NextResponse.json({ message: 'User ID already exists.' }, { status: 409 });
        }
        return NextResponse.json({ message: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
