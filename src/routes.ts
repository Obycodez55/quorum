import { Router } from 'express';
import { Request, Response } from 'express';
import OrganizationRoutes from './modules/organization/organization.routes';
import { NotFoundException } from './utils/exceptions';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

router.use('/organizations', OrganizationRoutes);

router.use((req, res, next) => {
    throw new NotFoundException('Not Found');
});

export default router;