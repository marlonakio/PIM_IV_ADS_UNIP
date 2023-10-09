import fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import apiEmpresasRoutes from './empresas.api';
import apiFuncionariosRoutes from './funcionarios.api';
import apiPagamentosRoutes from './pagamentos.api';
import apiHistoricoRoutes from './historico.api';

const app = fastify();
const prisma = new PrismaClient();

app.register(cors);

//rotas das APIS
app.register(apiEmpresasRoutes);
app.register(apiFuncionariosRoutes);
app.register(apiPagamentosRoutes);
app.register(apiHistoricoRoutes);

app.listen({
  port: 3333,
}).then(() => {
  console.log('Server rodando na porta:3333.');
  console.log('Rota: http://localhost:3333');
});
