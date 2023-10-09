import { FastifyPluginCallback } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { PagamentoType } from './types'; 

const apiPagamentosRoutes: FastifyPluginCallback = (fastify, options, done) => {
  const prisma = new PrismaClient();

  fastify.post('/pagamentos', async (request, reply) => {
    try {
      const body = request.body as PagamentoType;

      const funcionario_id = body.funcionario_id;
      const hora_trabalhada = body.hora_trabalhada;

      const funcionario = await prisma.funcionario.findUnique({
        where: {
          id: funcionario_id,
        },
      });

      if (!funcionario) {
        reply.status(404).send({ error: 'Funcionário não encontrado' });
        return;
      }

      const empresa_id = funcionario.empresa_id;
      const empresaId = funcionario.empresa_id;

      let salario_bruto = hora_trabalhada * funcionario.valor_hora;
      salario_bruto = Number(salario_bruto.toFixed(2));

      let desc_inss = salario_bruto * 0.09;
      desc_inss = Number(desc_inss.toFixed(2)); 

      let desc_ir = salario_bruto * 0.075;
      desc_ir = Number(desc_ir.toFixed(2));

      let salario_liqui = salario_bruto - (desc_inss + desc_ir);
      salario_liqui = Number(salario_liqui.toFixed(2));

  
      const pagamento = await prisma.pagamento.create({
        data: {
          funcionario_id,
          empresa_id,
          empresaId,
          hora_trabalhada,
          salario_bruto,
          valor_hora: funcionario.valor_hora,
          desc_inss,
          desc_ir,
          salario_liqui,
        },
      });
      await prisma.historico.create({
        data: {
          pagamento_id: pagamento.id,
          funcionario_id: funcionario_id,
        },
      });

      reply.status(201).send(pagamento);
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      reply.status(500).send({ error: 'Erro ao criar pagamento' });
    }
  });

  // PATCH em pagamentos/:id
  fastify.patch('/pagamentos/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { hora_trabalhada } = request.body as { hora_trabalhada: number };

      const pagamento = await prisma.pagamento.findUnique({
        where: {
          id,
        },
      });

      if (!pagamento) {
        reply.status(404).send({ error: 'Pagamento não encontrado' });
        return;
      }

      let salario_bruto = hora_trabalhada * pagamento.valor_hora;
      salario_bruto = Number(salario_bruto.toFixed(2));

      let desc_inss = salario_bruto * 0.09;
      desc_inss = Number(desc_inss.toFixed(2));

      let desc_ir = salario_bruto * 0.075;
      desc_ir = Number(desc_ir.toFixed(2)); 

      let salario_liqui = salario_bruto - (desc_inss + desc_ir);
      salario_liqui = Number(salario_liqui.toFixed(2));

      const updatedPagamento = await prisma.pagamento.update({
        where: {
          id,
        },
        data: {
          hora_trabalhada,
          salario_bruto,
          desc_inss,
          desc_ir,
          salario_liqui,
        },
      });

      reply.send(updatedPagamento);
    } catch (error) {
      console.error('Erro ao atualizar pagamento:', error);
      reply.status(500).send({ error: 'Erro ao atualizar pagamento' });
    }
  });

  // DELETE em pagamentos/:id
  fastify.delete('/pagamentos/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
    
      const pagamento = await prisma.pagamento.findUnique({
        where: {
          id,
        },
      });
    
      if (!pagamento) {
        reply.status(404).send({ error: 'Pagamento não encontrado' });
        return;
      }
    
      await prisma.pagamento.delete({
        where: {
          id,
        },
      });
    
      reply.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir pagamento:', error);
      reply.status(500).send({ error: 'Erro ao excluir pagamento' });
    }
  });
  

  done();
};

export default apiPagamentosRoutes;
