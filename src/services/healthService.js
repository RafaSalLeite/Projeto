

// Exemplo de como ficaria o service real:
/*
class HealthService {
  static async buscarUnidadesSaude(filtros = {}) {
    const response = await fetch('/api/unidades-saude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filtros)
    });
    return await response.json();
  }

  static async buscarTiposConsulta() {
    const response = await fetch('/api/tipos-consulta');
    return await response.json();
  }

  static async agendarConsulta(dados) {
    // TODO: Ajustar estrutura conforme DTO do backend
    const agendamentoDTO = {
      unidadeSaudeId: dados.unidadeSaude?.id,
      tipoConsultaId: dados.tipoConsulta?.id,
      queixa: dados.queixa,
      sintomas: dados.sintomas,
      nivelDor: dados.nivelDor,
      dataHora: dados.dataHora,
      pacienteId: dados.paciente?.id // ou buscar do contexto de auth
    };

    const response = await fetch('/api/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agendamentoDTO)
    });

    if (!response.ok) throw new Error('Erro ao agendar');
    return await response.json();
  }
}

export default HealthService;
*/