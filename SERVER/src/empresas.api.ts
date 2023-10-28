import { FastifyPluginCallback } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { EmpresaType } from './types'; 

const apiEmpresasRoutes: FastifyPluginCallback = (fastify, options, done) => {
  const prisma = new PrismaClient();

  // POST em empresas
  fastify.post('/empresas', async (request, reply) => {
    try {
      const { nome, cnpj, email, telefone } = request.body as EmpresaType;

      const empresa = await prisma.empresa.create({
        data: {
          nome,
          cnpj,
          email,
          telefone,
        },
      });

      reply.status(201).send(empresa);
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      reply.status(500).send({ error: 'Erro ao criar empresa' });
    }
  });

   // GET de * empresas
  fastify.get('/empresas', async (request, reply) => {
    try {
      const empresas = await prisma.empresa.findMany();
      reply.send(empresas);
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      reply.status(500).send({ error: 'Erro ao buscar empresas' });
    }
  });

  //GET de 1 empresa
  fastify.get('/empresas/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const empresa = await prisma.empresa.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!empresa) {
        reply.status(404).send({ error: 'Empresa não encontrada' });
        return;
      }

      reply.send(empresa);
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      reply.status(500).send({ error: 'Erro ao buscar empresa' });
    }
  });

  //DELETE em empresas
  fastify.delete('/empresas/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string }; 

      const empresa = await prisma.empresa.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!empresa) {
        reply.status(404).send({ error: 'Empresa não encontrada' });
        return;
      }

      await prisma.empresa.delete({
        where: {
          id: parseInt(id),
        },
      });

      reply.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
      reply.status(500).send({ error: 'Erro ao excluir empresa' });
    }
  });

  //POST em empresas
  fastify.patch('/empresas/:id', async (request, reply) => {
  try {
    const { id } = request.params as { id: string };
    const { nome, cnpj, email, telefone } = request.body as EmpresaType;

    const empresa = await prisma.empresa.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!empresa) {
      reply.status(404).send({ error: 'Empresa não encontrada' });
      return;
    }

    const updatedEmpresa = await prisma.empresa.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome,
        cnpj,
        email,
        telefone
      },
    });

    reply.send(updatedEmpresa);
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error);
    reply.status(500).send({ error: 'Erro ao atualizar empresa' });
  }
});



  done();
};

export default apiEmpresasRoutes;
