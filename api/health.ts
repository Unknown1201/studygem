import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const supabaseUrlExists = !!process.env.SUPABASE_URL;
    const supabaseKeyExists = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    res.status(200).json({
        message: "Health check successful",
        environment: process.env.NODE_ENV,
        supabaseUrlConfigured: supabaseUrlExists,
        supabaseServiceRoleKeyConfigured: supabaseKeyExists,
    });
}
