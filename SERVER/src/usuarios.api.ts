import { FastifyPluginCallback } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { UsuarioType } from './types'; 
import bcrypt from 'bcrypt';

const apiUsuariosRoutes: FastifyPluginCallback = (fastify, options, done) => {
  const prisma = new PrismaClient();

  // POST em usuarios
  fastify.post('/usuarios', async (request, reply) => {
    try {
      const { nome, email, senha } = request.body as UsuarioType;

      const senhaHashed = await bcrypt.hash(senha, 10);

      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaHashed,
          rh: false,
        },
      });

      reply.status(201).send(usuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      reply.status(500).send({ error: 'Erro ao criar usuário' });
    }
  });


  // POST para realizar o login
  fastify.post('/login', async (request, reply) => {
  try {
    const { email, senha } = request.body as UsuarioType;

    const usuario = await prisma.usuario.findUnique({
      where: { email },
      select: {
        id_func: true,
        id_empresa: true,
        senha: true,
        rh: true
      },
    });

    if (!usuario) {
      reply.status(401).send({ error: 'Usuário não encontrado' });
      return;
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (senhaCorreta) {
      const rh = usuario.rh === true;

      reply.send({ autenticado: true, rh, id_func: usuario.id_func, id_empresa: usuario.id_empresa });
    } else {
      reply.send({ autenticado: false, rh: false });
    }
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    reply.status(500).send({ error: 'Erro ao autenticar usuário' });
  }
});



  done();
};

export default apiUsuariosRoutes;
