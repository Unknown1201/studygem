import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id || typeof id !== 'string') {
            return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
        }

        const { rows: userRows } = await sql`
            SELECT user_id, name, class, roll_number FROM users WHERE user_id = ${id}
        `;

        if (userRows.length === 0) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }
        const userRow = userRows[0];
        const userData = {
            userId: userRow.user_id,
            name: userRow.name,
            class: userRow.class,
            rollNumber: userRow.roll_number
        };

        const { rows: progressRows } = await sql`
            SELECT task_id FROM progress WHERE user_id = ${id}
        `;

        const progress = progressRows.reduce((acc: any, row: any) => {
            acc[row.task_id] = true;
            return acc;
        }, {});

        return NextResponse.json({ userData, progress });

    } catch (error: any) {
        console.error('API GET Error for /user/[id]:', error);
        return NextResponse.json({ message: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id || typeof id !== 'string') {
            return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
        }

        const { name, userClass, rollNumber } = await request.json();
        if (!name || !userClass || !rollNumber) {
            return NextResponse.json({ message: 'Missing required fields for update.' }, { status: 400 });
        }
        
        const { rowCount } = await sql`
            UPDATE users 
            SET name = ${name}, class = ${userClass}, roll_number = ${rollNumber} 
            WHERE user_id = ${id}
        `;

        if (rowCount === 0) {
            return NextResponse.json({ message: 'User not found to update.' }, { status: 404 });
        }
        
        return NextResponse.json({ message: 'User updated successfully.' });

    } catch (error: any) {
        console.error('API PUT Error for /user/[id]:', error);
        return NextResponse.json({ message: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
