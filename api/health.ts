import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const dbPassExists = !!process.env.DB_PASS;

    res.status(200).json({
        message: "Health check successful",
        environment: process.env.NODE_ENV,
        databasePasswordConfigured: dbPassExists,
    });
}
