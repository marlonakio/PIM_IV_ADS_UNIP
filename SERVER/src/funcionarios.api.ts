import { FastifyPluginCallback } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { FuncionarioType } from './types'; // Importe a interface apropriada

const apiFuncionariosRoutes: FastifyPluginCallback = (fastify, options, done) => {
  const prisma = new PrismaClient();

  // POST em funcionário
  fastify.post('/funcionarios', async (request, reply) => {
    try {
      const { nome, cpf, email, telefone, empresa_id, cargo, hora_prevista, salario} = request.body as FuncionarioType;
      const valor_hora = (salario/hora_prevista).toFixed(2);
      
      const funcionario = await prisma.funcionario.create({
        data: {
          nome,
          cpf,
          email,
          telefone,
          empresa_id,
          cargo,
          hora_prevista,
          salario,
          valor_hora: parseFloat(valor_hora)
        },
      });

      reply.status(201).send(funcionario);
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      reply.status(500).send({ error: 'Erro ao criar funcionário' });
    }
  });

  // GET de * funcionários
fastify.get('/funcionarios', async (request, reply) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      include: {
        empresa: {
          select: {
            nome: true
          }
        }
      }
    });

    const dataReturn = funcionarios.map((funcionario) => {
      return {
        id: funcionario.id,
        nome: funcionario.nome,
        cpf: funcionario.cpf,
        email: funcionario.email,
        telefone: funcionario.telefone,
        empresa: funcionario.empresa.nome,
        cargo: funcionario.cargo,
        hora_prevista: funcionario.hora_prevista,
        salario: funcionario.salario,
        valor_hora: funcionario.valor_hora
      };
    });

    reply.send(dataReturn);
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    reply.status(500).send({ error: 'Erro ao buscar funcionários' });
  }
});


  // GET de 1 funcionários
  fastify.get('/funcionarios/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const funcionario = await prisma.funcionario.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!funcionario) {
        reply.status(404).send({ error: 'Funcionário não encontrado' });
        return;
      }

      reply.send(funcionario);
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      reply.status(500).send({ error: 'Erro ao buscar funcionário' });
    }
  });

  // DELETE em funcionarios
  fastify.delete('/funcionarios/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const funcionario = await prisma.funcionario.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!funcionario) {
        reply.status(404).send({ error: 'Funcionário não encontrado' });
        return;
      }

      await prisma.funcionario.delete({
        where: {
          id: parseInt(id),
        },
      });

      reply.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
      reply.status(500).send({ error: 'Erro ao excluir funcionário' });
    }
  });

  // PATCH em funcionarios
  fastify.patch('/funcionarios/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { nome, cpf, email, telefone, cargo, hora_prevista, salario} = request.body as FuncionarioType;
      const valor_hora = (salario/hora_prevista).toFixed(2);

      const funcionario = await prisma.funcionario.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!funcionario) {
        reply.status(404).send({ error: 'Funcionário não encontrado' });
        return;
      }

      const updatedFuncionario = await prisma.funcionario.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nome,
          cpf,
          email,
          telefone,
          cargo,
          hora_prevista,
          salario,
          valor_hora: parseFloat(valor_hora)
        },
      });

      reply.send(updatedFuncionario);
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      reply.status(500).send({ error: 'Erro ao atualizar funcionário' });
    }
  });


  //GET empresas para mostrar funcionarios
  fastify.get('/empresas/:id/funcionarios', async (request, reply) => {
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

      const funcionarios = await prisma.funcionario.findMany({
        where: {
          empresa_id: parseInt(id),
        },
      });

      const funcionariosMap = funcionarios.map((funcionario) => ({
      ...funcionario,
      nome_empresa: empresa.nome,
    }));

      reply.send(funcionariosMap);
    } catch (error) {
      console.error('Erro ao buscar funcionários da empresa:', error);
      reply.status(500).send({ error: 'Erro ao buscar funcionários da empresa' });
    }
  });


  //GET para mostrar os funcionarios de uma empresa para pagamento
  fastify.get('/empresas/:id/pagamento', async (request, reply) => {
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

      const funcionarios = await prisma.funcionario.findMany({
        where: {
          empresa_id: parseInt(id),
        },
      });

      const funcionariosMap = funcionarios.map((funcionario) => ({
      funcionario_id: funcionario.id,
      funcionario_nome: funcionario.nome,
      funcionario_cpf: funcionario.cpf,
      nome_empresa: empresa.nome,
      funcionario_hora_prevista: funcionario.hora_prevista
    }));

      reply.send(funcionariosMap);
    } catch (error) {
      console.error('Erro ao buscar funcionários da empresa:', error);
      reply.status(500).send({ error: 'Erro ao buscar funcionários da empresa' });
    }
  });


  done();
};

export default apiFuncionariosRoutes;
