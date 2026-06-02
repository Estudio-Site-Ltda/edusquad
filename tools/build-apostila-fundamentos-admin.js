const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const slug = 'fundamentos-administracao-pequenos-negocios';
const runId = '2026-06-01-apostila';
const outDir = path.join(root, 'squads', slug, 'output', runId);
const htmlPath = path.join(outDir, `apostila-${slug}.html`);
const title = 'Fundamentos de Administração para Pequenos Negócios';
const subtitle = 'Organização simples, gestão prática e decisões melhores para MEIs, empreendedores e pequenos empresários.';
const tema = title;

const chaptersLimitArg = process.argv.find((arg) => arg.startsWith('--chapters='));
const chaptersLimit = chaptersLimitArg ? Number(chaptersLimitArg.split('=')[1]) : 10;
const finalMode = process.argv.includes('--final');

const iconNames = [
  'warning', 'lightbulb', 'magnifying-glass', 'pencil-line', 'check-circle',
  'caret-right', 'briefcase', 'clipboard-text', 'list-checks', 'book-open',
  'storefront', 'calculator', 'users-three', 'chart-bar'
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function icon(name) {
  const file = path.join(root, 'assets', 'icons', 'duotone', `${name}-duotone.svg`);
  return fs.readFileSync(file, 'utf8')
    .replace(/<svg /, '<svg aria-hidden="true" focusable="false" ')
    .replace(/ width="[^"]*"/, '')
    .replace(/ height="[^"]*"/, '');
}

const icons = Object.fromEntries(iconNames.map((name) => [name, icon(name)]));

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function header(pageNo) {
  return `<header class="page-header"><span>${tema}</span></header>`;
}

function footer(pageNo) {
  return `<footer class="page-footer"><span>${tema}</span><span>${pageNo}</span></footer>`;
}

let pageNo = 0;
function page(id, className, inner) {
  pageNo += 1;
  return `<section id="${id}" class="${className}" data-page-no="${pageNo}">
  ${className.includes('cover') ? '' : header(pageNo)}
${inner}
  ${className.includes('cover') ? '' : footer(pageNo)}
</section>`;
}

function box(type, label, iconName, text) {
  return `<aside class="box ${type}"><strong><span class="icon">${icons[iconName]}</span>${label}</strong><p>${text}</p></aside>`;
}

function example(titleText, body) {
  return `<div class="example"><strong>${titleText}</strong><p>${body}</p></div>`;
}

function step(num, text) {
  return `<div class="step"><span>${num}</span><p>${text}</p></div>`;
}

function scriptBlock(titleText, body, customize) {
  return `<div class="script"><h2>${titleText}</h2><p>${body}</p><p class="customize">Personalizar: ${customize}</p></div>`;
}

function table(headers, rows) {
  return `<table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

const chapters = [
  {
    title: 'O papel da administração no pequeno negócio',
    category: 'Fundamentos',
    bridge: 'Antes de falar de dinheiro, vendas ou equipe, você precisa enxergar a empresa como um sistema simples.',
    quote: 'Administrar é transformar esforço diário em resultado previsível.',
    objectives: ['identificar as funções básicas da administração', 'descrever a rotina mínima de gestão', 'distinguir urgência de prioridade'],
    vocab: ['gestão', 'processo', 'rotina'],
    concepts: [
      ['Administração na prática', 'Administrar é decidir o que será feito, por quem, quando e com qual padrão. Em um pequeno negócio, isso aparece na compra de insumos, no atendimento, no controle do caixa e na entrega ao cliente.'],
      ['As quatro funções essenciais', 'Planejar define direção, organizar distribui recursos, dirigir acompanha pessoas e controlar mede se o combinado aconteceu. O dono costuma executar tudo, mas ainda precisa separar essas funções mentalmente.'],
      ['Rotina não é burocracia', 'Uma rotina curta evita esquecimento, retrabalho e decisões tomadas no improviso. Ela deve caber no dia real da empresa, não em um manual difícil de manter.'],
      ['Prioridade protege energia', 'Toda empresa pequena tem pedidos urgentes. A prioridade nasce quando você escolhe o que sustenta caixa, cliente e operação antes de tarefas menos importantes.']
    ],
    examples: [
      ['Loja de bairro', 'A dona separa segunda-feira para conferir estoque, quarta para pagar fornecedores e sexta para revisar vendas. O negócio continua simples, mas deixa de depender da memória.'],
      ['Prestador MEI', 'Um eletricista registra cada orçamento enviado, cada serviço aprovado e cada cobrança pendente. Com isso, sabe onde está o dinheiro antes de aceitar novos compromissos.']
    ],
    steps: ['Liste as atividades que se repetem toda semana.', 'Separe o que gera venda, entrega, cobrança e relacionamento.', 'Defina um responsável, mesmo que seja você.', 'Escolha um horário fixo para revisar a rotina.', 'Registre uma melhoria pequena por semana.'],
    practices: [
      ['Checklist semanal de gestão', 'Anote vendas abertas, entregas pendentes, contas a pagar, contas a receber e reclamações. Revise essa lista sempre no mesmo dia.'],
      ['Reunião consigo mesmo', 'Reserve vinte minutos na sexta-feira para responder: o que vendeu, o que atrasou, o que consumiu caixa e o que precisa mudar na próxima semana.'],
      ['Mapa de prioridades', 'Divida uma folha em três colunas: urgente, importante e pode esperar. Mova tarefas para a coluna correta antes de começar o dia.']
    ],
    checklist: ['Caixa conferido', 'Entregas revisadas', 'Compras planejadas', 'Clientes críticos acompanhados', 'Próxima ação definida'],
    case: ['Padaria São Bento', 'A padaria vendia bem, mas faltava pão no horário de pico e sobrava produto no fim do dia.', 'O dono comprava por sensação e cada atendente anotava pedidos de um jeito.', 'Ele criou uma rotina de previsão por dia da semana, conferência às 11h e registro único de encomendas.', 'Em três semanas, reduziu perdas e melhorou a disponibilidade nos horários fortes.'],
    activity: 'Identifique três rotinas que hoje dependem da sua memória e descreva como elas poderiam ser registradas de forma simples.',
    metrics: [['Rotinas registradas', 'mínimo 5'], ['Pendências revisadas', '1 vez por semana'], ['Retrabalho percebido', 'queda mensal']],
    audit: [['Pergunta', 'Sinal de atenção'], ['O caixa é conferido?', 'Só quando falta dinheiro'], ['Há lista de pendências?', 'Cada pessoa usa uma forma'], ['As compras seguem previsão?', 'Compra-se apenas no susto']],
    summary: ['Administração é coordenação prática do negócio.', 'Rotinas simples reduzem improviso.', 'Prioridade protege caixa, cliente e entrega.', 'Controle não precisa ser complexo.', 'A próxima etapa é transformar direção em planejamento.'],
    field: 'Escolha uma rotina e teste um checklist por sete dias.',
    sources: ['Drucker, Peter. O gestor eficaz.', 'Chiavenato, Idalberto. Administração para não administradores.', 'Sebrae. Gestão empresarial para pequenos negócios.']
  },
  {
    title: 'Planejamento simples e metas possíveis',
    category: 'Planejamento',
    bridge: 'Depois de organizar a rotina básica, o próximo passo é decidir para onde o negócio precisa ir.',
    quote: 'Meta boa cabe no papel, no calendário e no caixa.',
    objectives: ['explicar a diferença entre desejo e meta', 'descrever metas operacionais simples', 'identificar prioridades do trimestre'],
    vocab: ['meta', 'indicador', 'plano de ação'],
    concepts: [
      ['Desejo não orienta execução', 'Querer vender mais é legítimo, mas ainda é vago. Uma meta transforma intenção em número, prazo e ação possível.'],
      ['Planejamento curto funciona melhor', 'Pequenos negócios mudam rápido. Por isso, planos de trinta, sessenta e noventa dias costumam ser mais úteis do que documentos longos.'],
      ['Meta precisa de dono', 'Mesmo em empresas familiares, cada meta deve ter um responsável claro. Sem dono, a meta vira assunto recorrente e não vira entrega.'],
      ['Plano de ação conecta ideia e prática', 'Um plano simples responde: o que será feito, quem fará, até quando, com qual recurso e como será verificado.']
    ],
    examples: [
      ['Salão de beleza', 'Em vez de dizer que precisa crescer, a equipe define vender vinte pacotes de hidratação em trinta dias, com oferta feita após cada escova.'],
      ['Loja virtual pequena', 'A meta deixa de ser postar mais e vira publicar três ofertas por semana, medir cliques e revisar os produtos com maior saída.']
    ],
    steps: ['Escreva um objetivo principal para noventa dias.', 'Transforme o objetivo em número e prazo.', 'Liste até cinco ações que influenciam esse número.', 'Defina responsável e data para cada ação.', 'Revise o avanço toda semana.'],
    practices: [
      ['Modelo de meta curta', 'Em noventa dias, aumentar em 15% o faturamento de serviços recorrentes, oferecendo renovação para clientes atendidos nos últimos seis meses.'],
      ['Quadro de ação', 'Use cinco colunas: ação, responsável, prazo, custo e situação. Atualize com feito, em andamento ou travado.'],
      ['Revisão de sexta-feira', 'Compare ações feitas com resultado obtido. Se a ação não moveu o número, ajuste a abordagem antes de trocar a meta.']
    ],
    checklist: ['Meta com número', 'Prazo definido', 'Responsável claro', 'Custo estimado', 'Revisão agendada'],
    case: ['Ateliê Dona Clara', 'O ateliê tinha muitos pedidos pequenos e pouco lucro no fim do mês.', 'A meta inicial era vender mais, mas ninguém sabia quais produtos puxavam margem.', 'A dona escolheu promover kits de maior valor por noventa dias e revisou vendas toda sexta.', 'O faturamento cresceu menos que o esperado, mas o lucro melhorou porque os kits tinham margem maior.'],
    activity: 'Descreva uma meta de noventa dias para seu negócio usando número, prazo, responsável e primeira ação.',
    metrics: [['Metas ativas', 'até 3'], ['Revisão semanal', '20 minutos'], ['Ações concluídas', 'mínimo 70%']],
    audit: [['Erro comum', 'Correção prática'], ['Meta genérica', 'Adicionar número e prazo'], ['Muitas metas', 'Escolher três prioridades'], ['Sem revisão', 'Agendar dia fixo']],
    summary: ['Planejamento pequeno é planejamento executável.', 'Metas precisam de número, prazo e responsável.', 'A revisão semanal evita desvio silencioso.', 'Nem toda venda melhora lucro.', 'No próximo capítulo, a meta será conectada à organização operacional.'],
    field: 'Monte um quadro de ação com uma meta real desta semana.',
    sources: ['Drucker, Peter. Administração em tempos turbulentos.', 'Sebrae. Planejamento estratégico para pequenos negócios.', 'Endeavor Brasil. Materiais sobre metas e execução.']
  },
  {
    title: 'Organização de processos e rotina de trabalho',
    category: 'Operação',
    bridge: 'Com metas definidas, a empresa precisa organizar como o trabalho acontece sem depender de improviso.',
    quote: 'Processo é o caminho combinado para entregar sempre melhor.',
    objectives: ['descrever um processo simples', 'distinguir etapa, responsável e padrão', 'identificar gargalos na rotina'],
    vocab: ['processo', 'padrão', 'gargalo'],
    concepts: [
      ['Processo é caminho', 'Processo não é papelada. É a sequência que transforma pedido em entrega, compra em estoque ou contato em venda.'],
      ['Padrão reduz variação', 'Quando cada pessoa atende de um jeito, o cliente sente diferença. O padrão define o mínimo aceitável para manter qualidade.'],
      ['Gargalo mostra onde a fila nasce', 'Toda operação tem pontos de espera. Identificar o gargalo evita cobrar esforço onde o problema não está.'],
      ['Melhoria começa pequena', 'Um formulário melhor, uma lista de conferência ou uma ordem clara de tarefas já pode reduzir erros sem mudar toda a empresa.']
    ],
    examples: [
      ['Restaurante pequeno', 'O pedido passa por atendimento, cozinha, conferência e entrega. Ao marcar horários, o dono descobre que a conferência atrasa mais que o preparo.'],
      ['Assistência técnica', 'Cada aparelho recebe etiqueta com defeito, prazo e telefone. A simples padronização reduz ligações perdidas e retrabalho.']
    ],
    steps: ['Escolha um processo que gera erro ou atraso.', 'Escreva as etapas na ordem real.', 'Marque quem executa cada etapa.', 'Defina o padrão mínimo de qualidade.', 'Teste uma melhoria por vez.'],
    practices: [
      ['Mapa de processo em uma página', 'Desenhe começo, meio e fim. Use setas simples e escreva apenas o que acontece de verdade.'],
      ['Lista de conferência', 'Antes de entregar ao cliente, confira quantidade, prazo, forma de pagamento, contato e responsável pela entrega.'],
      ['Registro de erro', 'Durante uma semana, anote cada erro repetido. O erro que aparece mais vezes vira prioridade de melhoria.']
    ],
    checklist: ['Etapas visíveis', 'Responsável definido', 'Padrão escrito', 'Gargalo observado', 'Melhoria testada'],
    case: ['Mercadinho Nova Praça', 'O mercadinho perdia tempo porque produtos chegavam sem conferência adequada.', 'As notas eram guardadas antes da contagem e diferenças só apareciam no caixa.', 'A equipe criou ordem fixa: receber, contar, registrar divergência, etiquetar e guardar.', 'As perdas por erro de entrada caíram e o estoque ficou mais confiável.'],
    activity: 'Escolha um processo do seu negócio e descreva começo, etapas principais, responsável e padrão mínimo.',
    metrics: [['Erros repetidos', 'registro semanal'], ['Tempo de espera', 'medir etapa crítica'], ['Processos mapeados', 'mínimo 3']],
    audit: [['Sinal', 'O que observar'], ['Cliente reclama do mesmo ponto', 'Processo falho'], ['Equipe pergunta sempre igual', 'Padrão ausente'], ['Entrega atrasa no mesmo lugar', 'Gargalo provável']],
    summary: ['Processo é a sequência real de trabalho.', 'Padrão ajuda a manter qualidade.', 'Gargalos devem ser observados antes de corrigidos.', 'Melhorias pequenas são mais fáceis de sustentar.', 'Agora a organização precisa conversar com o dinheiro.'],
    field: 'Mapeie um processo em até dez etapas e teste uma melhoria simples.',
    sources: ['Harrington, H. James. Aperfeiçoando processos empresariais.', 'Sebrae. Gestão de processos.', 'Falconi, Vicente. Gerenciamento da rotina.']
  },
  {
    title: 'Controle financeiro sem complicação',
    category: 'Finanças',
    bridge: 'Processos organizados melhoram a entrega, mas a empresa só se sustenta quando o dinheiro é acompanhado com clareza.',
    quote: 'Negócio pequeno não quebra só por vender pouco; quebra por não enxergar o caixa.',
    objectives: ['executar um controle básico de entradas e saídas', 'aplicar separação entre dinheiro pessoal e empresarial', 'construir uma previsão simples de caixa'],
    vocab: ['fluxo de caixa', 'capital de giro', 'margem'],
    concepts: [
      ['Caixa é movimento', 'Fluxo de caixa mostra dinheiro que entra e sai em datas reais. Ele revela apertos antes que a conta fique negativa.'],
      ['Separar contas evita ilusão', 'Misturar despesas pessoais com dinheiro da empresa distorce lucro, preço e capacidade de investimento.'],
      ['Lucro não é saldo bancário', 'O saldo pode estar alto porque uma conta grande ainda não venceu. Lucro aparece depois de considerar custos, despesas e retiradas.'],
      ['Previsão simples já ajuda', 'Uma planilha com próximas entradas e saídas permite negociar prazo, evitar compras desnecessárias e planejar pagamento.']
    ],
    examples: [
      ['MEI de manutenção', 'Ele recebe no ato, mas paga peças no cartão. Ao prever vencimentos, percebe que precisa guardar parte de cada serviço.'],
      ['Loja de roupas', 'A loja vende muito no cartão parcelado. O controle mostra que comprar estoque antes de receber parcelas pressiona o caixa.']
    ],
    steps: ['Registre toda entrada e saída diariamente.', 'Classifique cada item em venda, custo, despesa ou retirada.', 'Separe conta pessoal e conta do negócio.', 'Projete pagamentos e recebimentos dos próximos trinta dias.', 'Revise preço e compra quando o caixa apertar.'],
    practices: [
      ['Livro-caixa enxuto', 'Use data, descrição, categoria, entrada, saída e forma de pagamento. O importante é registrar sempre, não criar uma planilha bonita.'],
      ['Retirada combinada', 'Defina um valor de retirada mensal possível. Se retirar conforme sobra do dia, o negócio perde capacidade de pagar obrigações.'],
      ['Reserva mínima', 'Guarde uma parte fixa das vendas para impostos, fornecedores e emergências. Comece pequeno e aumente com consistência.']
    ],
    checklist: ['Entradas registradas', 'Saídas registradas', 'Retirada definida', 'Contas separadas', 'Previsão de 30 dias'],
    case: ['Oficina Ponto Certo', 'A oficina faturava bem, mas sempre atrasava fornecedor no fim do mês.', 'O dono olhava apenas o saldo do banco e não os boletos futuros.', 'Ele montou previsão de caixa por vencimento e reduziu compras sem giro rápido.', 'Em dois meses, passou a negociar melhor e evitou juros por atraso.'],
    activity: 'Monte uma previsão simples de caixa para os próximos quinze dias, separando entradas prováveis e saídas já assumidas.',
    metrics: [['Dias previstos', '30'], ['Registros sem falha', 'diário'], ['Retirada pessoal', 'valor fixo']],
    audit: [['Risco', 'Pergunta de controle'], ['Mistura de contas', 'A empresa paga despesa pessoal?'], ['Compra no impulso', 'Há dinheiro previsto para pagar?'], ['Preço baixo', 'A margem cobre despesa?']],
    summary: ['Fluxo de caixa mostra datas, não só valores.', 'Conta pessoal e conta da empresa devem ser separadas.', 'Lucro exige considerar custos e despesas.', 'Previsão curta evita sustos.', 'No próximo capítulo, o controle financeiro entra no preço e na margem.'],
    field: 'Registre todas as entradas e saídas por sete dias sem pular valores pequenos.',
    sources: ['Assaf Neto, Alexandre. Finanças corporativas e valor.', 'Sebrae. Fluxo de caixa.', 'Receita Federal. Orientações gerais para MEI.']
  },
  {
    title: 'Preço, margem e decisão de venda',
    category: 'Finanças comerciais',
    bridge: 'Depois de enxergar o caixa, você precisa saber se cada venda realmente contribui para o resultado.',
    quote: 'Preço não é chute; é decisão de sobrevivência e posicionamento.',
    objectives: ['aplicar uma lógica básica de formação de preço', 'construir cálculo simples de margem', 'usar informações de custo para decidir promoções'],
    vocab: ['custo', 'despesa', 'margem de contribuição'],
    concepts: [
      ['Preço começa no custo', 'Custo é aquilo ligado diretamente ao produto ou serviço. Ignorar custo faz a venda parecer boa enquanto consome lucro.'],
      ['Despesa mantém a empresa funcionando', 'Aluguel, internet, sistemas, contador e energia precisam entrar na lógica do preço, mesmo quando não aparecem em uma venda específica.'],
      ['Margem mostra contribuição', 'A margem de contribuição indica quanto sobra de cada venda para pagar despesas fixas e formar lucro.'],
      ['Promoção precisa ter limite', 'Desconto sem cálculo pode aumentar movimento e reduzir resultado. Promoção boa tem prazo, objetivo e produto escolhido.']
    ],
    examples: [
      ['Confeitaria caseira', 'Um bolo vendido por preço baixo parecia atrativo, mas o cálculo mostrou que embalagem, gás e entrega consumiam quase toda a margem.'],
      ['Serviço de design', 'Ao contar horas de reunião e revisão, o profissional percebe que pacotes fechados precisam ter limite claro de alterações.']
    ],
    steps: ['Liste custos diretos do produto ou serviço.', 'Some despesas fixas mensais do negócio.', 'Estime volume de vendas realista.', 'Defina margem desejada antes do desconto.', 'Revise preço quando custo ou demanda mudar.'],
    practices: [
      ['Cálculo rápido de margem', 'Preço de venda menos custo direto mostra a sobra inicial. Depois, compare essa sobra com despesas fixas e meta de lucro.'],
      ['Regra de desconto', 'Antes de conceder desconto, defina valor mínimo aceitável e contrapartida, como pagamento à vista ou compra em maior quantidade.'],
      ['Tabela de serviços', 'Crie três pacotes: básico, completo e premium. Isso ajuda o cliente a comparar valor, não apenas preço.']
    ],
    checklist: ['Custo direto conhecido', 'Despesa fixa estimada', 'Margem mínima definida', 'Desconto com regra', 'Pacotes revisados'],
    case: ['Marmitaria Bom Prato', 'A marmitaria vendia muito na promoção semanal, mas o caixa não melhorava.', 'O custo dos ingredientes subiu e o desconto continuou igual.', 'A dona recalculou margem por prato e trocou a promoção por combos com bebida e entrega programada.', 'O volume caiu um pouco, mas a margem por pedido aumentou.'],
    activity: 'Escolha um produto ou serviço e calcule preço, custo direto, sobra inicial e desconto máximo aceitável.',
    metrics: [['Margem mínima', 'definida por item'], ['Preços revisados', 'mensal'], ['Descontos sem regra', 'zero']],
    audit: [['Decisão', 'Critério mínimo'], ['Dar desconto', 'Margem continua positiva?'], ['Criar pacote', 'Escopo está claro?'], ['Subir preço', 'Valor percebido foi comunicado?']],
    summary: ['Preço precisa considerar custo, despesa e margem.', 'Promoção sem limite pode destruir lucro.', 'Pacotes ajudam a vender valor.', 'Margem orienta decisões comerciais.', 'A seguir, veremos como clientes entram nessa conta.'],
    field: 'Recalcule a margem de três itens mais vendidos.',
    sources: ['Sebrae. Formação de preço de venda.', 'Kotler, Philip. Administração de marketing.', 'Gitman, Lawrence. Princípios de administração financeira.']
  },
  {
    title: 'Clientes, atendimento e relacionamento',
    category: 'Mercado',
    bridge: 'Preço só se sustenta quando o cliente percebe valor, confia no atendimento e volta a comprar.',
    quote: 'Atendimento bom não depende de simpatia isolada; depende de padrão, escuta e acompanhamento.',
    objectives: ['aplicar padrões simples de atendimento', 'construir registro básico de clientes', 'usar feedback para melhorar a experiência'],
    vocab: ['experiência do cliente', 'recorrência', 'feedback'],
    concepts: [
      ['Cliente compra solução percebida', 'O cliente não avalia apenas produto. Ele avalia clareza, prazo, confiança, pós-venda e facilidade para resolver problemas.'],
      ['Atendimento precisa de padrão', 'Cumprimento, prazo de resposta, confirmação de pedido e tom de mensagem devem seguir uma base comum.'],
      ['Relacionamento vira ativo', 'Uma lista organizada de clientes permite retorno, oferta adequada e cuidado após a venda.'],
      ['Feedback é dado de gestão', 'Reclamação recorrente mostra processo falho. Elogio recorrente mostra diferencial que pode ser comunicado melhor.']
    ],
    examples: [
      ['Clínica de estética', 'Ao confirmar horários no dia anterior e orientar cuidados após o atendimento, a clínica reduz faltas e aumenta retorno.'],
      ['Loja de material elétrico', 'O vendedor registra obras em andamento e avisa quando chegam itens usados por aqueles clientes.']
    ],
    steps: ['Defina padrão de resposta inicial.', 'Registre nome, contato, compra e preferência do cliente.', 'Confirme prazo e condição antes de vender.', 'Acompanhe a entrega ou uso do serviço.', 'Peça feedback com pergunta curta.'],
    practices: [
      ['Mensagem de confirmação', 'Olá, tudo certo? Seu pedido está confirmado para amanhã, com entrega prevista no período combinado. Qualquer ajuste, me avise por aqui.'],
      ['Registro simples de cliente', 'Anote data da compra, produto, preferência, reclamação e próxima oportunidade de contato.'],
      ['Pergunta de feedback', 'De zero a dez, quanto essa entrega resolveu o que você precisava? O que poderíamos melhorar na próxima vez?']
    ],
    checklist: ['Resposta padronizada', 'Cadastro atualizado', 'Prazo confirmado', 'Pós-venda feito', 'Feedback registrado'],
    case: ['Pet shop Amigo Fiel', 'O pet shop tinha clientes fiéis, mas esquecia datas de banho, vacinas e reposição de ração.', 'As informações ficavam na memória dos atendentes.', 'A equipe criou cadastro com animal, preferência, frequência de compra e lembretes mensais.', 'As recompras aumentaram e os clientes elogiaram o cuidado.'],
    activity: 'Descreva um padrão de atendimento com saudação, confirmação, prazo, pós-venda e pergunta de feedback.',
    metrics: [['Tempo de resposta', 'até 1 turno'], ['Clientes registrados', '100% das vendas'], ['Feedbacks mensais', 'mínimo 10']],
    audit: [['Momento', 'Padrão esperado'], ['Primeiro contato', 'Resposta clara'], ['Venda aprovada', 'Prazo confirmado'], ['Após entrega', 'Pergunta de satisfação']],
    summary: ['Cliente percebe a experiência inteira.', 'Padrão reduz falhas no atendimento.', 'Cadastro simples gera recorrência.', 'Feedback orienta melhoria.', 'No próximo capítulo, o olhar se volta para pessoas e responsabilidades.'],
    field: 'Registre dez clientes recentes e faça uma ação de retorno útil.',
    sources: ['Kotler, Philip. Marketing 4.0.', 'Sebrae. Atendimento ao cliente.', 'Reichheld, Frederick. A pergunta definitiva.']
  },
  {
    title: 'Pessoas, responsabilidades e liderança enxuta',
    category: 'Pessoas',
    bridge: 'Com clientes melhor acompanhados, a empresa precisa organizar quem faz o quê e como as decisões são comunicadas.',
    quote: 'Liderar pequeno negócio é dar clareza antes de cobrar desempenho.',
    objectives: ['comparar responsabilidades formais e informais', 'avaliar pontos de falha na comunicação', 'definir combinados de trabalho'],
    vocab: ['responsabilidade', 'delegação', 'combinado'],
    concepts: [
      ['Função precisa ser clara', 'Em equipe pequena, todos ajudam em tudo, mas isso não elimina responsabilidades principais. Clareza evita duas pessoas fazendo a mesma tarefa e outra ficando sem dono.'],
      ['Delegar não é largar', 'Delegar inclui explicar resultado esperado, prazo, limite de decisão e forma de acompanhamento.'],
      ['Comunicação curta funciona', 'Reuniões rápidas, registros visíveis e combinados escritos reduzem ruído. O problema não é falar pouco, é falar sem confirmação.'],
      ['Cultura aparece no detalhe', 'Pontualidade, cuidado com cliente, organização e respeito são ensinados por repetição e exemplo, não apenas por discurso.']
    ],
    examples: [
      ['Equipe familiar', 'A irmã cuida do caixa, o irmão das compras e a mãe da produção. Todos ajudam no balcão, mas cada área tem dono.'],
      ['Pequena agência', 'Cada projeto tem responsável, prazo e limite de revisão. Isso evita que o cliente mande mensagens para qualquer pessoa e gere confusão.']
    ],
    steps: ['Liste atividades principais do negócio.', 'Defina um responsável por atividade.', 'Escreva o resultado esperado em uma frase.', 'Combine prazo e forma de aviso.', 'Acompanhe sem refazer o trabalho da pessoa.'],
    practices: [
      ['Quadro de responsabilidades', 'Monte colunas com atividade, dono, apoio, prazo e padrão de entrega. Deixe visível para a equipe.'],
      ['Combinado de comunicação', 'Defina onde registrar pedidos, faltas, atrasos e mudanças. Evite decisões importantes apenas por conversa solta.'],
      ['Feedback de dois minutos', 'Diga o fato observado, o impacto no negócio e o próximo comportamento esperado. Seja direto e respeitoso.']
    ],
    checklist: ['Atividades listadas', 'Dono definido', 'Padrão escrito', 'Canal combinado', 'Feedback registrado'],
    case: ['Loja Casa Bela', 'As vendedoras prometiam prazos diferentes e o estoque era consultado de forma irregular.', 'A gerente cobrava resultado, mas os combinados mudavam no meio do dia.', 'Ela definiu responsáveis por estoque, vitrine, caixa e pós-venda, com reunião diária de dez minutos.', 'As promessas ao cliente ficaram mais consistentes e a equipe passou a resolver mais sem depender da gerente.'],
    activity: 'Compare duas atividades da sua empresa: uma com responsável claro e outra sem dono. Descreva os efeitos dessa diferença.',
    metrics: [['Atividades com dono', '100% das críticas'], ['Reunião rápida', 'diária ou semanal'], ['Retrabalho por comunicação', 'registrar ocorrências']],
    audit: [['Sintoma', 'Possível causa'], ['Ninguém sabe quem decide', 'Responsabilidade vaga'], ['Cliente recebe respostas diferentes', 'Padrão ausente'], ['Dono refaz tudo', 'Delegação incompleta']],
    summary: ['Responsabilidade clara reduz confusão.', 'Delegação precisa de prazo e padrão.', 'Comunicação deve deixar rastro.', 'Liderança começa no combinado.', 'Depois das pessoas, vamos olhar fornecedores e recursos.'],
    field: 'Crie um quadro de responsabilidades para cinco atividades críticas.',
    sources: ['Chiavenato, Idalberto. Gestão de pessoas.', 'Drucker, Peter. Desafios gerenciais para o século XXI.', 'Sebrae. Liderança para pequenos negócios.']
  },
  {
    title: 'Compras, estoque e fornecedores',
    category: 'Recursos',
    bridge: 'Responsabilidades claras ajudam a equipe; agora é preciso cuidar dos recursos que sustentam a entrega.',
    quote: 'Comprar bem é proteger caixa, prazo e qualidade ao mesmo tempo.',
    objectives: ['comparar compra por impulso e compra planejada', 'avaliar giro de estoque', 'diferenciar preço, prazo e confiabilidade do fornecedor'],
    vocab: ['estoque', 'giro', 'fornecedor'],
    concepts: [
      ['Estoque é dinheiro parado', 'Produto em excesso ocupa espaço e consome caixa. Produto em falta perde venda e confiança. O equilíbrio depende de informação.'],
      ['Giro mostra velocidade', 'Giro de estoque indica quanto tempo um item leva para vender ou ser usado. Item parado merece revisão de compra, preço ou exposição.'],
      ['Fornecedor é parte da operação', 'O menor preço pode sair caro se atrasar, entregar errado ou não resolver problemas. Confiabilidade também tem valor.'],
      ['Compra precisa de critério', 'Antes de comprar, observe saldo, venda média, prazo de reposição, validade, sazonalidade e dinheiro disponível.']
    ],
    examples: [
      ['Farmácia pequena', 'Um item barato comprado em grande volume venceu no estoque. A economia inicial virou perda.'],
      ['Hamburgueria', 'Ao negociar entrega menor e mais frequente, a hamburgueria reduziu desperdício sem faltar ingrediente no fim de semana.']
    ],
    steps: ['Liste itens críticos para vender ou entregar.', 'Registre saldo atual e consumo médio.', 'Defina ponto mínimo de reposição.', 'Compare fornecedores por preço, prazo e falhas.', 'Compre conforme previsão, não conforme ansiedade.'],
    practices: [
      ['Curva simples de atenção', 'Marque itens A como essenciais e de alto giro, B como importantes e C como lentos. Dê mais controle aos itens A.'],
      ['Ficha de fornecedor', 'Registre contato, prazo, condição de pagamento, histórico de atraso e qualidade percebida.'],
      ['Compra programada', 'Defina dia fixo de pedido para itens recorrentes. Compras espalhadas aumentam frete, esquecimento e urgência.']
    ],
    checklist: ['Itens críticos listados', 'Saldo conferido', 'Ponto de reposição definido', 'Fornecedor avaliado', 'Compra programada'],
    case: ['Loja Agro Fácil', 'A loja comprava muitos produtos em promoção e faltavam itens básicos na época de maior procura.', 'O estoque era visto como prateleira cheia, não como dinheiro organizado.', 'O dono classificou itens por giro, criou ponto mínimo e avaliou fornecedores por atraso.', 'A loja reduziu item parado e melhorou disponibilidade dos produtos mais procurados.'],
    activity: 'Compare três fornecedores reais usando preço, prazo, qualidade, atendimento e condição de pagamento.',
    metrics: [['Itens críticos', 'lista mensal'], ['Rupturas', 'queda contínua'], ['Itens parados', 'revisão quinzenal']],
    audit: [['Pergunta', 'Boa prática'], ['O item vende rápido?', 'Repor com prioridade'], ['O fornecedor atrasa?', 'Ter alternativa'], ['A compra cabe no caixa?', 'Conferir previsão']],
    summary: ['Estoque parado consome caixa.', 'Falta de item também custa caro.', 'Fornecedor deve ser avaliado além do preço.', 'Compra planejada reduz urgência.', 'No próximo capítulo, esses dados viram controle e indicadores.'],
    field: 'Classifique dez itens do estoque em alto, médio e baixo giro.',
    sources: ['Sebrae. Controle de estoque.', 'Ballou, Ronald. Gerenciamento da cadeia de suprimentos.', 'Martins, Petrônio. Administração de materiais.']
  },
  {
    title: 'Indicadores e tomada de decisão',
    category: 'Controle',
    bridge: 'Depois de organizar recursos, você precisa medir o que realmente ajuda a decidir melhor.',
    quote: 'Indicador bom não enfeita relatório; ele muda uma decisão.',
    objectives: ['elaborar indicadores simples para áreas críticas', 'avaliar resultados semanais', 'justificar decisões com dados básicos'],
    vocab: ['indicador', 'painel', 'decisão'],
    concepts: [
      ['Indicador é sinal', 'Um indicador resume uma informação importante, como vendas, margem, atraso, reclamação ou retorno de cliente.'],
      ['Poucos números bastam', 'Pequeno negócio não precisa medir tudo. Precisa medir o que orienta venda, caixa, entrega, qualidade e cliente.'],
      ['Comparação gera aprendizado', 'O número isolado informa pouco. Comparar semanas, produtos ou canais mostra tendência e ajuda a decidir.'],
      ['Decisão exige ação', 'Se o indicador piora e nada muda, ele virou decoração. Cada número acompanhado deve ter uma resposta possível.']
    ],
    examples: [
      ['Delivery local', 'Ao medir pedidos por canal, o dono percebe que indicação de clientes traz pedidos maiores que anúncio impulsionado.'],
      ['Curso livre', 'Ao acompanhar presença e conclusão, a escola ajusta lembretes e reduz abandono antes do fim da turma.']
    ],
    steps: ['Escolha até cinco perguntas de gestão.', 'Transforme cada pergunta em um número.', 'Defina fonte e frequência de coleta.', 'Compare com a semana anterior.', 'Registre a decisão tomada a partir do dado.'],
    practices: [
      ['Painel semanal', 'Use vendas, margem estimada, contas a receber, reclamações e entregas atrasadas. Atualize sempre no mesmo dia.'],
      ['Pergunta antes do número', 'Comece por: o que preciso decidir? Depois escolha o indicador. Isso evita medir apenas o que é fácil.'],
      ['Registro de decisão', 'Anote: dado observado, decisão tomada e resultado esperado. Revise depois para aprender com acertos e erros.']
    ],
    checklist: ['Perguntas definidas', 'Indicadores escolhidos', 'Fonte clara', 'Revisão semanal', 'Decisão registrada'],
    case: ['Academia Vida Ativa', 'A academia investia em anúncios, mas não sabia quais matrículas permaneciam após o primeiro mês.', 'O número de leads parecia bom, mas a permanência era baixa.', 'A gestora mediu origem, conversão e renovação por canal.', 'Descobriu que indicações geravam menos volume, porém maior permanência, e ajustou o investimento.'],
    activity: 'Elabore cinco indicadores para seu negócio e explique qual decisão cada um deve orientar.',
    metrics: [['Indicadores ativos', 'até 7'], ['Revisão', 'semanal'], ['Decisões registradas', 'mínimo 1 por semana']],
    audit: [['Indicador', 'Decisão possível'], ['Vendas por canal', 'Investir ou ajustar abordagem'], ['Atrasos', 'Rever processo'], ['Reclamações', 'Corrigir padrão'], ['Margem', 'Revisar preço']],
    summary: ['Indicadores devem responder perguntas de gestão.', 'Medir tudo atrapalha.', 'Comparar períodos revela tendência.', 'Cada indicador precisa orientar ação.', 'O próximo passo é transformar aprendizados em melhoria contínua.'],
    field: 'Monte um painel semanal com cinco números e uma decisão associada.',
    sources: ['Kaplan, Robert; Norton, David. A estratégia em ação.', 'Sebrae. Indicadores de desempenho.', 'Falconi, Vicente. O verdadeiro poder.']
  },
  {
    title: 'Melhoria contínua e resolução de problemas',
    category: 'Melhoria',
    bridge: 'Indicadores mostram sinais. Agora você precisa transformar esses sinais em correções consistentes.',
    quote: 'Problema repetido pede método, não apenas esforço.',
    objectives: ['elaborar plano simples de melhoria', 'criar rotina de análise de problemas', 'justificar correções com causa provável'],
    vocab: ['causa raiz', 'ação corretiva', 'padronização'],
    concepts: [
      ['Problema é diferença entre esperado e real', 'Sem padrão esperado, qualquer situação vira opinião. Definir o resultado desejado ajuda a enxergar o desvio.'],
      ['Causa não é culpado', 'Buscar causa serve para corrigir processo, treinamento, ferramenta ou decisão. Culpar pessoas rapidamente impede aprendizagem.'],
      ['Ação precisa ser testável', 'Uma boa ação corretiva tem responsável, prazo e sinal de verificação. Sem isso, vira intenção.'],
      ['Padronizar conserva ganho', 'Quando uma melhoria funciona, ela deve entrar na rotina. Caso contrário, o negócio volta ao hábito antigo.']
    ],
    examples: [
      ['Lavanderia', 'Roupas atrasavam sempre na sexta. A causa era concentração de retirada no mesmo horário, não falta de esforço da equipe.'],
      ['Consultório', 'Pacientes faltavam porque recebiam confirmação tarde demais. Antecipar lembrete reduziu ausência sem aumentar equipe.']
    ],
    steps: ['Descreva o problema com fato e número.', 'Pergunte por que ele acontece até chegar a uma causa provável.', 'Escolha uma ação simples de teste.', 'Defina responsável, prazo e indicador.', 'Se funcionar, inclua no padrão da rotina.'],
    practices: [
      ['Cinco porquês enxuto', 'Pergunte por que o atraso ocorreu. Repita a pergunta sobre a resposta anterior até chegar a uma causa que possa ser corrigida.'],
      ['Plano de correção', 'Use problema, causa provável, ação, responsável, prazo e indicador. Uma linha por problema já basta.'],
      ['Revisão de aprendizagem', 'Depois do teste, responda: resolveu, melhorou parcialmente ou não mudou? Ajuste com base nessa resposta.']
    ],
    checklist: ['Problema descrito', 'Causa provável registrada', 'Ação definida', 'Responsável e prazo', 'Padrão atualizado'],
    case: ['Escola de idiomas local', 'Muitos alunos atrasavam pagamento e a recepção só cobrava no fim do mês.', 'O problema parecia falta de compromisso, mas a causa era ausência de lembrete e opção clara de pagamento.', 'A escola criou lembrete antecipado, link de pagamento e contato no segundo dia de atraso.', 'A inadimplência caiu e a conversa com alunos ficou menos desconfortável.'],
    activity: 'Escolha um problema repetido e aplique uma análise com problema, causa provável, ação, prazo e indicador.',
    metrics: [['Problemas priorizados', 'até 3'], ['Ações testadas', 'semanal'], ['Padrões atualizados', 'após teste aprovado']],
    audit: [['Falha', 'Correção'], ['Problema vago', 'Descrever com fato'], ['Culpa imediata', 'Buscar causa do processo'], ['Ação sem prazo', 'Definir dono e data']],
    summary: ['Problema precisa ser descrito com clareza.', 'Causa raiz não é caça a culpados.', 'Ação corretiva deve ser verificável.', 'Melhoria aprovada vira padrão.', 'O último capítulo reúne tudo em um plano de gestão.'],
    field: 'Aplique o plano de correção em um problema real da semana.',
    sources: ['Imai, Masaaki. Kaizen.', 'Sebrae. Melhoria contínua.', 'Falconi, Vicente. Gerenciamento pelas diretrizes.']
  },
  {
    title: 'Plano de gestão para os próximos 90 dias',
    category: 'Implantação',
    bridge: 'Você já viu rotina, meta, processo, dinheiro, cliente, pessoas, recursos, indicadores e melhoria. Agora é hora de montar o plano.',
    quote: 'Gestão só vira resultado quando entra no calendário.',
    objectives: ['elaborar um plano de gestão de 90 dias', 'criar uma rotina integrada de acompanhamento', 'propor melhorias sustentáveis para o negócio'],
    vocab: ['implantação', 'cadência', 'responsável'],
    concepts: [
      ['Plano final precisa ser realista', 'Um plano bom respeita tempo, caixa e equipe disponíveis. Se exigir uma empresa ideal, será abandonado.'],
      ['Cadência mantém avanço', 'Acompanhamento diário, semanal e mensal evita que a gestão dependa de grandes mutirões.'],
      ['Integração evita ilhas', 'Meta, caixa, processo, cliente e pessoas se influenciam. O plano precisa olhar essas áreas juntas.'],
      ['Começar pequeno é estratégia', 'Implantar poucos controles bem usados vale mais que criar muitos formulários que ninguém atualiza.']
    ],
    examples: [
      ['Comércio familiar', 'A família escolhe três frentes: caixa diário, compras semanais e cadastro de clientes. O plano cabe na rotina e melhora decisões.'],
      ['Profissional autônomo', 'Ele define agenda comercial, controle de propostas e revisão mensal de preço. Em noventa dias, ganha clareza sobre demanda e lucro.']
    ],
    steps: ['Escolha três prioridades para os próximos noventa dias.', 'Defina uma meta simples para cada prioridade.', 'Liste ações semanais e responsáveis.', 'Crie rotina de acompanhamento curta.', 'Revise, ajuste e mantenha o que funcionar.'],
    practices: [
      ['Plano 30-60-90', 'Nos primeiros trinta dias, organize registros. Até sessenta, acompanhe indicadores. Até noventa, corrija padrões e consolide rotina.'],
      ['Agenda de gestão', 'Diário: caixa e pendências. Semanal: vendas, entregas e compras. Mensal: preço, margem, metas e melhorias.'],
      ['Reunião de fechamento', 'No último dia útil do mês, revise números, decisões tomadas, erros repetidos e prioridades do próximo mês.']
    ],
    checklist: ['Três prioridades', 'Metas de 90 dias', 'Agenda de acompanhamento', 'Indicadores mínimos', 'Revisão mensal'],
    case: ['Empório Vila Norte', 'O empório tinha boa clientela, mas gestão espalhada em caderno, celular e memória.', 'A dona queria resolver tudo ao mesmo tempo e travava na execução.', 'Ela montou plano de noventa dias com caixa diário, estoque crítico e cadastro dos melhores clientes.', 'Ao fim do ciclo, tinha menos falta de produto, mais retorno de clientes e decisões financeiras mais claras.'],
    activity: 'Crie seu plano de noventa dias com três prioridades, ações semanais, indicador principal e primeira data de revisão.',
    metrics: [['Prioridades', '3'], ['Revisões semanais', '12'], ['Melhorias consolidadas', 'mínimo 3']],
    audit: [['Elemento', 'Critério'], ['Prioridade', 'Cabe em 90 dias'], ['Ação', 'Tem responsável'], ['Indicador', 'Ajuda decisão'], ['Revisão', 'Está no calendário']],
    summary: ['Gestão precisa entrar na agenda.', 'Plano realista vence plano perfeito.', 'Acompanhamento curto sustenta execução.', 'Indicadores e melhoria fecham o ciclo.', 'A partir daqui, o próximo passo é aplicar e revisar o plano mensalmente.'],
    field: 'Agende agora a primeira revisão semanal do seu plano.',
    sources: ['Drucker, Peter. O gestor eficaz.', 'Sebrae. Plano de ação para pequenos negócios.', 'Endeavor Brasil. Execução e gestão de crescimento.']
  }
];

function preTextual(chaptersToRender) {
  const tocStart = 6;
  return [
    page('page-1', 'page cover', `
  <p class="cover-pre">Apostila profissional</p>
  <h1><span class="cover-title-top">Fundamentos de</span><span class="cover-title-main">Administração</span></h1>
  <p class="cover-post">Para pequenos negócios</p>
  <div class="cover-divider"></div>
  <p class="subtitle">${subtitle}</p>
  <div class="cover-icon">${icons['storefront']}</div>`),
    page('page-2', 'page', `
  <div class="kicker">Apresentação</div>
  <h1>Para quem é esta apostila</h1>
  <p class="intro">Esta apostila foi criada para empreendedores, MEIs e donos de pequenos negócios que precisam organizar a empresa sem linguagem complicada.</p>
  <p>Você vai aprender fundamentos de administração aplicados ao dia a dia: rotina, planejamento, processos, finanças, preço, clientes, pessoas, fornecedores, indicadores e melhoria contínua.</p>
  <p>Use o material como guia de trabalho. Leia um capítulo, aplique a atividade e registre o que mudou. A proposta é transformar conceitos em pequenas decisões melhores.</p>
  <h2>Como aproveitar melhor</h2>
  <ul><li>Leia com um problema real em mente.</li><li>Preencha as atividades com dados do seu negócio.</li><li>Revise os indicadores uma vez por semana.</li><li>Transforme cada capítulo em uma pequena ação.</li></ul>
  ${box('tip', 'Dica prática', 'lightbulb', 'Separe uma pasta ou planilha para guardar os exercícios. Ao fim dos dez capítulos, você terá um plano de gestão de noventa dias.')}`),
    page('page-3', 'page dense', `
  <div class="kicker">Como ler esta apostila</div>
  <h1>Legenda dos elementos visuais</h1>
  ${box('alert', 'Atenção', 'warning', 'Mostra riscos comuns que podem gerar prejuízo, retrabalho ou decisões ruins.')}
  ${box('tip', 'Dica prática', 'lightbulb', 'Traz uma ação simples para aplicar no mesmo dia, mesmo em uma operação pequena.')}
  ${box('more', 'Saiba mais', 'magnifying-glass', 'Amplia um conceito para quem deseja aprofundar sem perder o foco prático.')}
  ${box('reflect', 'Para refletir', 'pencil-line', 'Propõe uma pergunta de análise sobre a realidade do seu negócio.')}
  ${box('best', 'Boas práticas', 'check-circle', 'Resume padrões recomendados para manter organização e consistência.')}`),
    page('page-4', 'page', `
  <div class="kicker">Sumário</div>
  <h1>Conteúdo</h1>
  <div class="toc">
    ${chapters.map((ch, i) => `<div class="toc-item"><strong>${i + 1}. ${ch.title}</strong><em>p. ${tocStart + i * 9}</em></div>`).join('')}
  </div>
  <div class="toc end">
    <div class="toc-item"><strong>Gabarito comentado</strong><em>p. ${tocStart + chapters.length * 9}</em></div>
    <div class="toc-item"><strong>Glossário</strong><em>p. ${tocStart + chapters.length * 9 + 2}</em></div>
    <div class="toc-item"><strong>Bibliografia</strong><em>p. ${tocStart + chapters.length * 9 + 4}</em></div>
  </div>`),
    page('page-5', 'page dense roadmap-page', `
  <div class="kicker">Roadmap</div>
  <h1>Jornada de aprendizagem</h1>
  <div class="roadmap">
    ${chapters.map((ch, i) => `<div class="roadmap-item"><strong>${i + 1}</strong><span>${ch.title}</span></div>`).join('')}
  </div>
  ${box('best', 'Boas práticas', 'check-circle', 'Siga a ordem dos capítulos. A apostila começa com organização básica e avança até implantação de um plano completo de gestão.')}`)
  ];
}

function chapterPages(ch, index) {
  const n = index + 1;
  const id = `cap-${String(n).padStart(2, '0')}`;
  return [
    page(`${id}-01`, 'page chapter-open', `
  <div class="kicker">Capítulo ${n} | ${ch.category}</div>
  <h1>${ch.title}</h1>
  <p class="intro">${ch.bridge}</p>
  <blockquote>${ch.quote}</blockquote>
  <h2>Ao final, você será capaz de</h2>
  <ul>${ch.objectives.map((item) => `<li>${item}</li>`).join('')}</ul>
  <h2>Vocabulário do capítulo</h2>
  <ul>${ch.vocab.map((item) => `<li><strong>${item}:</strong> termo que será usado de forma prática ao longo das páginas.</li>`).join('')}</ul>`),
    page(`${id}-02`, 'page dense concepts-page', `
  <div class="kicker">Capítulo ${n} | Base conceitual</div>
  <h1>O essencial antes de aplicar</h1>
  ${ch.concepts.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join('')}
  <div class="examples-inline">${ch.examples.map(([h, p]) => example(h, p)).join('')}</div>
  <p class="footnote">Guarde a ideia central: gestão simples precisa ser visível, repetível e útil para decidir.</p>`),
    page(`${id}-03`, 'page', `
  <div class="kicker">Capítulo ${n} | Método prático</div>
  <h1>Roteiro operacional em cinco passos</h1>
  ${ch.steps.map((s, i) => step(i + 1, s)).join('')}
  ${box('tip', 'Dica prática', 'lightbulb', 'Comece com uma versão simples. Um controle usado toda semana vale mais que uma planilha completa abandonada.')}
  ${box('alert', 'Atenção', 'warning', 'Evite implantar controles sem explicar o motivo. A equipe tende a resistir quando enxerga apenas cobrança.')}
  ${box('reflect', 'Para refletir', 'pencil-line', 'Que decisão você conseguiria tomar melhor se esse método já estivesse funcionando hoje?')}`),
    page(`${id}-04`, 'page', `
  <div class="kicker">Capítulo ${n} | Práticas prontas 1/2</div>
  <h1>Copie, adapte e aplique</h1>
  ${scriptBlock(ch.practices[0][0], ch.practices[0][1], 'troque os exemplos pelo nome do seu produto, serviço ou rotina.')}
  ${scriptBlock(ch.practices[1][0], ch.practices[1][1], 'defina uma frequência realista antes de envolver outras pessoas.')}
  ${box('best', 'Boas práticas', 'check-circle', 'Registre a primeira versão de qualquer controle em linguagem simples. Depois de funcionar, você melhora o formato.')}`),
    page(`${id}-05`, 'page', `
  <div class="kicker">Capítulo ${n} | Práticas prontas 2/2</div>
  <h1>Checklist de aplicação</h1>
  ${scriptBlock(ch.practices[2][0], ch.practices[2][1], 'ajuste ao tamanho do negócio e elimine etapas que não ajudam a decidir.')}
  <h2>Checklist rápido</h2>
  <ul>${ch.checklist.map((item) => `<li>${item}</li>`).join('')}</ul>
  ${box('more', 'Saiba mais', 'magnifying-glass', 'Se a lista ficar longa, separe o que é diário, semanal e mensal. Isso reduz ansiedade e aumenta consistência.')}`),
    page(`${id}-06`, 'page dense case-page', `
  <div class="kicker">Capítulo ${n} | Estudo de caso</div>
  <h1>Caso didático para análise</h1>
  <h2>Contexto</h2><p>${ch.case[0]} enfrentava uma situação comum em pequenos negócios.</p>
  <h2>Problema</h2><p>${ch.case[1]}</p>
  <h2>Análise</h2><p>${ch.case[2]}</p>
  <h2>Solução aplicada</h2><p>${ch.case[3]}</p>
  <h2>Resultado</h2><p>${ch.case[4]}</p>
  ${box('reflect', 'Para refletir', 'pencil-line', 'O que existe nesse caso que também aparece, mesmo em menor escala, no seu negócio?')}`),
    page(`${id}-07`, 'page', `
  <div class="kicker">Capítulo ${n} | Atividade de fixação</div>
  <h1>Aplicação guiada</h1>
  <div class="activity">
    <h2>Atividade</h2>
    <p>${ch.activity}</p>
    <div class="write-line"></div><div class="write-line"></div><div class="write-line"></div><div class="write-line"></div>
  </div>
  <h2>Critérios para uma boa resposta</h2>
  <ul><li>Usar uma situação real do negócio.</li><li>Descrever a decisão em linguagem simples.</li><li>Indicar como você saberá se houve melhora.</li></ul>
  ${box('tip', 'Dica prática', 'lightbulb', 'Responda pensando em uma situação real, não em uma empresa ideal. A utilidade está na aplicação imediata.')}`),
    page(`${id}-08`, 'page', `
  <div class="kicker">Capítulo ${n} | Controle de qualidade</div>
  <h1>Indicadores e revisão</h1>
  <div class="metrics">${ch.metrics.map(([a, b]) => `<div class="metric"><strong>${a}</strong><span>${b}</span></div>`).join('')}</div>
  ${table(ch.audit[0], ch.audit.slice(1))}
  ${box('alert', 'Atenção', 'warning', 'Se um indicador não muda nenhuma decisão, ele provavelmente não precisa ser acompanhado toda semana.')}`),
    page(`${id}-09`, 'page dense', `
  <div class="kicker">Capítulo ${n} | Síntese e fontes</div>
  <h1>O que levar adiante</h1>
  <ul>${ch.summary.map((item) => `<li>${item}</li>`).join('')}</ul>
  ${box('best', 'Ação de campo', 'check-circle', ch.field)}
  <h2>Conexão com a rotina</h2>
  <p>Antes de avançar, escolha um horário no calendário para revisar este ponto. Gestão melhora quando a ação vira compromisso visível.</p>
  <h2>Referências</h2>
  <ul class="sources">${ch.sources.map((item) => `<li>${item}</li>`).join('')}</ul>`)
  ];
}

function postTextual() {
  const answers1 = chapters.slice(0, 5).map((ch, i) => `<div class="answer"><strong>Capítulo ${i + 1}</strong><p>A resposta deve partir de uma situação real do negócio e mostrar pelo menos uma decisão prática. O critério principal é clareza entre problema, ação e acompanhamento.</p></div>`).join('');
  const answers2 = chapters.slice(5).map((ch, i) => `<div class="answer"><strong>Capítulo ${i + 6}</strong><p>A resposta esperada precisa comparar alternativas, justificar escolhas e propor uma ação viável para os próximos dias ou semanas.</p></div>`).join('');
  const glossary = ['Administração', 'Atendimento', 'Capital de giro', 'Cadastro de clientes', 'Caixa', 'Checklist', 'Cliente recorrente', 'Compra programada', 'Custo direto', 'Delegação', 'Despesa fixa', 'Estoque', 'Feedback', 'Fluxo de caixa', 'Fornecedor', 'Gargalo', 'Giro de estoque', 'Indicador', 'Lucro', 'Margem', 'Meta', 'Melhoria contínua', 'Padrão', 'Plano de ação', 'Preço', 'Prioridade', 'Processo', 'Rotina', 'Ticket médio', 'Tomada de decisão'];
  return [
    page('post-gabarito-01', 'page dense', `
  <div class="kicker">Gabarito comentado 1/2</div>
  <h1>Respostas esperadas</h1>
  ${answers1}`),
    page('post-gabarito-02', 'page dense', `
  <div class="kicker">Gabarito comentado 2/2</div>
  <h1>Critérios de avaliação</h1>
  ${answers2}`),
    page('post-glossario-01', 'page dense', `
  <div class="kicker">Glossário técnico 1/2</div>
  <h1>Termos para consulta rápida</h1>
  <ul>${glossary.slice(0, 15).map((g) => `<li><strong>${g}:</strong> conceito usado para organizar decisões e rotinas de gestão em pequenos negócios.</li>`).join('')}</ul>`),
    page('post-glossario-02', 'page dense', `
  <div class="kicker">Glossário técnico 2/2</div>
  <h1>Termos para consulta rápida</h1>
  <ul>${glossary.slice(15).map((g) => `<li><strong>${g}:</strong> conceito aplicado para acompanhar execução, resultado e melhoria do negócio.</li>`).join('')}</ul>`),
    page('post-bibliografia', 'page', `
  <div class="kicker">Bibliografia</div>
  <h1>Fontes autênticas e verificáveis</h1>
  <ol class="bibliography">
    <li>Assaf Neto, Alexandre. <em>Finanças corporativas e valor</em>. Atlas.</li>
    <li>Chiavenato, Idalberto. <em>Administração para não administradores</em>. Manole.</li>
    <li>Drucker, Peter. <em>O gestor eficaz</em>. LTC.</li>
    <li>Falconi, Vicente. <em>Gerenciamento da rotina do trabalho do dia a dia</em>. Falconi.</li>
    <li>Imai, Masaaki. <em>Kaizen</em>. IMAM.</li>
    <li>Kaplan, Robert; Norton, David. <em>A estratégia em ação</em>. Campus.</li>
    <li>Kotler, Philip. <em>Administração de marketing</em>. Pearson.</li>
    <li>Reichheld, Frederick. <em>A pergunta definitiva</em>. Alta Books.</li>
    <li>Sebrae. Materiais de orientação sobre gestão, finanças, atendimento, preço e estoque para pequenos negócios.</li>
  </ol>
  <h2>Como usar as fontes</h2>
  ${table(['Finalidade', 'Fonte indicada'], [
    ['Rotina e melhoria', 'Falconi e Imai'],
    ['Decisão gerencial', 'Drucker e Chiavenato'],
    ['Finanças e caixa', 'Assaf Neto, Gitman e Sebrae'],
    ['Cliente e mercado', 'Kotler, Reichheld e Sebrae']
  ])}
  ${box('more', 'Saiba mais', 'magnifying-glass', 'Ao buscar materiais complementares, priorize guias com exemplos, planilhas e critérios de decisão aplicáveis ao porte do seu negócio.')}`),
    page('post-contracapa', 'page back-cover', `
  <div class="kicker">Administração aplicada</div>
  <h1>Gestão simples, decisão clara e execução constante.</h1>
  <p class="back-copy">Use esta apostila como material de trabalho. O ganho real aparece quando cada capítulo vira uma pequena melhoria implantada na rotina.</p>
  <div class="back-card"><strong>${title}</strong><p>Material educacional para empreendedores, MEIs e donos de pequenos negócios.</p></div>`)
  ];
}

function buildHtml(chaptersToRender, includePost) {
  pageNo = 0;
  const template = fs.readFileSync(path.join(root, 'assets', 'templates', 'apostila', 'apostila-template.html'), 'utf8');
  let head = template.slice(0, template.indexOf('<body>'));
  head = head
    .replace(/\[TEMA_COMPLETO\]/g, tema)
    .replace(/\[TITULO\]/g, title)
    .replace('</style>', `
.icon { display:inline-flex; width:14px; height:14px; margin-right:2mm; vertical-align:-2px; color:currentColor; }
.icon svg { width:14px; height:14px; display:block; }
.cover h1 { letter-spacing:0; text-align:center; }
.cover h1 span { display:block; white-space:nowrap; letter-spacing:0; }
.cover-title-top { font-size:58pt; line-height:.95; }
.cover-title-main { font-size:74pt; line-height:.95; }
.roadmap-item span { font-size: 9.8pt; line-height: 1.25; }
.answer { border-left: 3px solid var(--primary); padding-left: 4mm; margin-bottom: 4mm; }
.answer p { font-size: 10.4pt; line-height: 1.45; margin-bottom: 0; }
.examples-inline { display:grid; grid-template-columns:1fr 1fr; gap:3mm; margin-top:2mm; }
.examples-inline .example { margin:0; padding:3.2mm; }
.examples-inline .example p { font-size:9.8pt; line-height:1.35; }
</style>`);
  const parts = [
    ...preTextual(chaptersToRender),
    ...chapters.slice(0, chaptersToRender).flatMap(chapterPages),
    ...(includePost ? postTextual() : [])
  ];
  return `${head}<body>
${parts.join('\n\n')}
<script>
(function () {
  function inspectDocument() {
    var pageList = Array.prototype.slice.call(document.querySelectorAll('.page'));
    var overflow = pageList.filter(function (page) { return page.scrollHeight > page.clientHeight + 1; });
    if (overflow.length) {
      console.warn('[apostila] páginas em overflow:', overflow.map(function (p) { return p.id; }));
    } else {
      console.info('[apostila] nenhuma página em overflow (' + pageList.length + ' páginas).');
    }
  }
  window.inspectApostila = inspectDocument;
  window.addEventListener('load', inspectDocument);
})();
</script>
</body>
</html>`;
}

function main() {
  ensureDir(outDir);
  ensureDir(path.join(outDir, 'fonts'));
  ensureDir(path.join(outDir, 'icons'));
  ensureDir(path.join(outDir, 'images'));
  copyFile(path.join(root, 'assets', 'fonts', 'BricolageGrotesque-Variable.ttf'), path.join(outDir, 'fonts', 'BricolageGrotesque-Variable.ttf'));
  copyFile(path.join(root, 'assets', 'fonts', 'PlusJakartaSans-Variable.ttf'), path.join(outDir, 'fonts', 'PlusJakartaSans-Variable.ttf'));
  copyFile(path.join(root, 'assets', 'images', 'apostilas', 'capa-coaching-mentoring-pmes-lucid-realism-leonardo-2c7d8af7.jpg'), path.join(outDir, 'images', 'capa.jpg'));
  for (const name of iconNames) {
    copyFile(path.join(root, 'assets', 'icons', 'duotone', `${name}-duotone.svg`), path.join(outDir, 'icons', `${name}-duotone.svg`));
  }
  const html = buildHtml(Math.min(chaptersLimit, chapters.length), finalMode);
  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(JSON.stringify({ htmlPath, pages: pageNo, chapters: Math.min(chaptersLimit, chapters.length), final: finalMode }, null, 2));
}

main();
