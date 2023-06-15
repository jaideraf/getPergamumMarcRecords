import { Router } from 'express';
import home from './src/controllers/homeController.js';
import { acervoHome, acervoId } from './src/controllers/acervoController.js';

const route = Router();

// Rotas da home
route.get('/', home);

// Rotas de dados de acervo
route.get('/acervo', acervoHome);
route.get('/acervo/:id', acervoId);

export default route;
