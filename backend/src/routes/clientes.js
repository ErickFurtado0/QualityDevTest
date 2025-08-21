import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { listClientes, getCliente, createCliente, updateCliente, deleteCliente } from '../controllers/clientesController.js';

const router = Router();

router.use(authMiddleware);

router.get('/', listClientes);
router.get('/:id', getCliente);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;
