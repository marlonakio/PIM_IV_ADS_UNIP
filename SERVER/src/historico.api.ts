import { FastifyPluginCallback } from 'fastify';
import { PrismaClient } from '@prisma/client';

const apiHistoricoRoutes: FastifyPluginCallback = (fastify, options, done) => {
  const prisma = new PrismaClient();

  //GET por empresa e por mês
  fastify.get('/historico/empresa/:empresaId/:mes', async (request, reply) => {
    try {
      const { empresaId, mes } = request.params as { empresaId: string; mes: string };
    
      const mesNum = parseInt(mes);
      if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
        reply.status(400).send({ error: 'Mês inválido' });
        return;
      }
    
      const ano = new Date().getFullYear(); 
      const startDate = new Date(ano, mesNum - 1, 1);
      const endDate = new Date(ano, mesNum, 0);
    
      const pagamentos = await prisma.pagamento.findMany({
        where: {
          data: {
            gte: startDate,
            lte: endDate,
          },
          funcionario: {
            empresa_id: parseInt(empresaId),
          },
        },
        include: {
          funcionario: true,
          empresa: true,
        },
      });
    
      reply.send(pagamentos);
    } catch (error) {
      console.error('Erro ao consultar pagamentos por empresa e mês:', error);
      reply.status(500).send({ error: 'Erro ao consultar pagamentos por empresa e mês' });
    }
  });


  //GET por empresa para historico de funcionario
  fastify.get('/historico/empresa/:empresaId', async (request, reply) => {
    try {
      const { empresaId } = request.params as { empresaId: string };

      const historicos = await prisma.pagamento.findMany({
        where: {
          funcionario: {
            empresa_id: parseInt(empresaId),
          },
        },
      });

      reply.send(historicos);
    } catch (error) {
      console.error('Erro ao buscar histórico por empresa:', error);
      reply.status(500).send({ error: 'Erro ao buscar histórico por empresa' });
    }
  });

  //GET por funcionario para historico
  fastify.get('/historico/funcionario/:funcionarioId', async (request, reply) => {
    try {
      const { funcionarioId } = request.params as { funcionarioId: string };

      const historicos = await prisma.pagamento.findMany({
        where: {
          funcionario_id: parseInt(funcionarioId),
        },
        include: {
          funcionario: true,
          empresa: true,
        },
      });

      reply.send(historicos);
    } catch (error) {
      console.error('Erro ao buscar histórico por funcionário:', error);
      reply.status(500).send({ error: 'Erro ao buscar histórico por funcionário' });
    }
  });

    //GET por funcionario para chart
  fastify.get('/historico/funcionario/:funcionarioId/chart', async (request, reply) => {
    try {
      const { funcionarioId } = request.params as { funcionarioId: string };

      const historico = await prisma.pagamento.findMany({
        where: {
          funcionario_id: parseInt(funcionarioId),
        },
        orderBy: {
        data: 'asc',
      },
      });

      const data = historico.map(item => ({
        salario_liqui: item.salario_liqui,
        data: item.data,
        desc_inss: item.desc_inss,
        desc_ir: item.desc_ir
      }));

      reply.send(data);
    } catch (error) {
      console.error('Erro ao buscar histórico por funcionário:', error);
      reply.status(500).send({ error: 'Erro ao buscar histórico por funcionário' });
    }
  });

  //GET proximo pagamento
  fastify.get('/historico/funcionario/:funcionarioId/ultimo', async (request, reply) => {
  try {
    const { funcionarioId } = request.params as { funcionarioId: string };

    const historicoMaisRecente = await prisma.pagamento.findFirst({
      where: {
        funcionario_id: parseInt(funcionarioId),
      },
      orderBy: {
        data: 'desc', 
      },
      include: {
        funcionario: true,
        empresa: true,
      },
    });

    reply.send(historicoMaisRecente ? [historicoMaisRecente] : []);
  } catch (error) {
    console.error('Erro ao buscar histórico por funcionário:', error);
    reply.status(500).send({ error: 'Erro ao buscar histórico por funcionário' });
  }
});



  //GET por mes
  fastify.get('/historico/pagamentos/:mes', async (request, reply) => {
    try {
      const { mes } = request.params as { mes: string };

      const mesNum = parseInt(mes);
      if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
        reply.status(400).send({ error: 'Mês inválido' });
        return;
      }

      const startDate = new Date(new Date().getFullYear(), mesNum - 1, 1);
      const endDate = new Date(new Date().getFullYear(), mesNum, 0);

      const pagamentos = await prisma.pagamento.findMany({
        where: {
          data: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          funcionario: true,
          empresa: true,
        },
      });

      reply.send(pagamentos);
    } catch (error) {
      console.error('Erro ao consultar pagamentos por mês:', error);
      reply.status(500).send({ error: 'Erro ao consultar pagamentos por mês' });
    }
  });

  //GET de 1 pagamento
  fastify.get('/historico/pagamento/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };

      const pagamento = await prisma.pagamento.findUnique({
        where: {
          id: id,
        },
        include: {
          funcionario: true,
          empresa: true,
        },
      });

      if (!pagamento) {
        reply.status(404).send({ error: 'Pagamento não encontrado' });
        return;
      }

      reply.send(pagamento);
    } catch (error) {
      console.error('Erro ao consultar informações do pagamento:', error);
      reply.status(500).send({ error: 'Erro ao consultar informações do pagamento' });
    }
  });

  done();
};

export default apiHistoricoRoutes;
