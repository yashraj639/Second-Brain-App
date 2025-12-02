import type { Response, Request, NextFunction } from 'express';

export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req);

    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }

    next();
};
