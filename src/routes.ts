import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

router.use((req, res, next) => {
    next(new Error('Not Found'));
});

export default router;