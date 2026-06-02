const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const slug = 'fundamentos-administracao-pequenos-negocios';
const runId = '2026-06-01-apostila';
const outDir = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-04');
const imagesDir = path.join(outDir, 'images');
const iconsDir = path.join(outDir, 'icons');
const fontsDir = path.join(outDir, 'fonts');
const htmlPath = path.join(outDir, 'slide.html');
const baseHtmlPath = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-02', 'slide.html');

const heroImage = path.join(root, 'assets', 'images', slug, 'capitulo-04-controle-financeiro-hero-lucid-realism-leonardo-d31dcc43.jpg');
const planningImage = path.join(root, 'assets', 'images', slug, 'capitulo-04-previsao-caixa-30-dias-lucid-realism-leonardo-29c62e40.jpg');
const caseImage = path.join(root, 'assets', 'images', slug, 'capitulo-04-oficina-ponto-certo-caixa-lucid-realism-leonardo-e5b6bf84.jpg');

const icons = [
  'arrow-left', 'arrow-right', 'check-circle', 'lightbulb', 'warning',
  'target', 'list-checks', 'briefcase', 'clock', 'calendar-check',
  'clipboard-text', 'chart-bar', 'storefront', 'notebook', 'path',
  'users-three', 'gear', 'money'
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function setupAssets() {
  ensureDir(outDir);
  ensureDir(imagesDir);
  ensureDir(iconsDir);
  ensureDir(fontsDir);
  copyFile(heroImage, path.join(imagesDir, 'capitulo-04-controle-financeiro.jpg'));
  copyFile(planningImage, path.join(imagesDir, 'capitulo-04-previsao-caixa.jpg'));
  copyFile(caseImage, path.join(imagesDir, 'capitulo-04-oficina-caixa.jpg'));
  copyFile(path.join(root, 'assets', 'fonts', 'BricolageGrotesque-Variable.ttf'), path.join(fontsDir, 'BricolageGrotesque-Variable.ttf'));
  copyFile(path.join(root, 'assets', 'fonts', 'PlusJakartaSans-Variable.ttf'), path.join(fontsDir, 'PlusJakartaSans-Variable.ttf'));
  for (const icon of icons) {
    copyFile(path.join(root, 'assets', 'icons', 'duotone', `${icon}-duotone.svg`), path.join(iconsDir, `${icon}-duotone.svg`));
  }
}

function extractBetween(html, start, end) {
  const a = html.indexOf(start);
  const b = html.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error(`Nao foi possivel extrair ${start}`);
  return html.slice(a + start.length, b);
}

function icon(name, extra = '') {
  return `<img class="icon ${extra}" src="icons/${name}-duotone.svg" alt="" aria-hidden="true">`;
}

function slide(id, label, classes, content) {
  return `<section class="slide ${classes}" id="${id}" aria-label="${label}" aria-roledescription="slide" tabindex="-1" aria-hidden="true">
${content}
</section>`;
}

const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');
const style = extractBetween(baseHtml, '<style>', '</style>');
const script = extractBetween(baseHtml, '<script>', '</script>')
  .replace(
    'Correto. A meta tem número, prazo, público, ação e revisão.',
    'Correto. Controle financeiro bom mostra data, categoria, entrada, saída e previsão.'
  )
  .replace(
    'Ainda não. Uma meta pronta para execução precisa orientar o que você fará e quando vai revisar.',
    'Ainda não. Controle financeiro precisa mostrar dinheiro que entra, sai e vence nos próximos dias.'
  );

const slides = [
slide('slide-1', 'Slide 1: abertura e objetivos', 'cover active', `
  <div class="inner">
    <div class="cover-copy">
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Finanças</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Controle financeiro sem complicação</p>
      <h1 class="title reveal reveal-up delay-2">Organize o dinheiro antes que ele <span class="highlight">vire urgência</span></h1>
      <p class="lead reveal reveal-up delay-3">Você vai aprender a registrar entradas e saídas, separar contas, prever o caixa e tomar decisões sem depender apenas do saldo bancário.</p>
      <ul class="objective-list reveal reveal-up delay-3" aria-label="Objetivos de aprendizagem">
        <li>Montar um fluxo de caixa simples para o dia a dia.</li>
        <li>Diferenciar saldo, lucro, retirada e capital de giro.</li>
        <li>Projetar os próximos compromissos financeiros do negócio.</li>
      </ul>
      <button class="button reveal reveal-up delay-4" type="button" data-next>${icon('arrow-right')} Iniciar capítulo</button>
    </div>
    <aside class="hero-panel reveal reveal-scale delay-2">
      <figure><img src="images/capitulo-04-controle-financeiro.jpg" alt="Pessoa organizando cartões, calculadora, recibos e notebook para controlar o caixa de um pequeno negócio."></figure>
      <div class="metadata">
        <div class="meta-row"><span class="icon-shell">${icon('target')}</span><div><strong>Objetivo</strong><span>Enxergar o dinheiro antes que falte.</span></div></div>
        <div class="meta-row"><span class="icon-shell">${icon('clock')}</span><div><strong>Tempo sugerido</strong><span>40 a 50 minutos com exercício.</span></div></div>
      </div>
    </aside>
  </div>`),
slide('slide-2', 'Slide 2: mapa do capítulo', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Roteiro</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="tag">Você vai praticar</span>
      <h2 class="section-title">Controle financeiro é rotina simples, não planilha complicada</h2>
      <p class="lead" style="margin:.8rem auto 0">A meta é você saber quanto entrou, quanto saiu, o que ainda vai vencer e qual decisão precisa ser tomada.</p>
    </header>
    <div class="summary-grid stagger-children delay-2">
      <article class="card"><span class="icon-shell">${icon('money')}</span><h3>Registrar</h3><p>Anotar entradas e saídas do jeito que acontecem, todos os dias.</p></article>
      <article class="card"><span class="icon-shell">${icon('chart-bar')}</span><h3>Interpretar</h3><p>Separar saldo, lucro, retirada e capital de giro para não se enganar.</p></article>
      <article class="card"><span class="icon-shell">${icon('calendar-check')}</span><h3>Prever</h3><p>Olhar os próximos dias e agir antes do aperto aparecer.</p></article>
    </div>
  </div>`),
slide('slide-3', 'Slide 3: ideia central', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-04-previsao-caixa.jpg" alt="Empreendedor organizando cartões coloridos, calendário e calculadora para prever entradas e saídas.">
      <figcaption>Fluxo de caixa mostra datas reais: quando o dinheiro entra, quando sai e onde pode faltar.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Ideia central</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Caixa é movimento</p>
      <h2 class="section-title reveal reveal-up delay-2">O saldo de hoje não conta <span class="highlight">a história toda</span></h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('money')}</span><div><h3>Entradas</h3><p>Vendas recebidas, parcelas previstas e valores que ainda devem cair.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('warning')}</span><div><h3>Saídas</h3><p>Fornecedores, aluguel, impostos, ferramentas, taxas e retiradas.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('calendar-check')}</span><div><h3>Datas</h3><p>O problema aparece quando entrada e vencimento não acontecem no mesmo dia.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-4', 'Slide 4: quatro conceitos', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Conceitos essenciais</span></p>
    <header style="max-width:780px;margin-bottom:1.3rem">
      <p class="eyebrow reveal reveal-up delay-1">Antes de decidir, nomeie certo</p>
      <h2 class="section-title reveal reveal-up delay-2">Quatro palavras evitam decisões <span class="highlight">no escuro</span></h2>
    </header>
    <div class="grid-4 stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('chart-bar')}</span><h3>Fluxo de caixa</h3><p>Registro de entradas e saídas em datas reais.</p></article>
      <article class="card"><span class="icon-shell">${icon('briefcase')}</span><h3>Capital de giro</h3><p>Dinheiro para manter o negócio funcionando entre pagar e receber.</p></article>
      <article class="card"><span class="icon-shell">${icon('money')}</span><h3>Margem</h3><p>Parte que sobra depois dos custos diretos da venda.</p></article>
      <article class="card"><span class="icon-shell">${icon('users-three')}</span><h3>Retirada</h3><p>Valor combinado para o dono, sem misturar tudo com a conta pessoal.</p></article>
    </div>
  </div>`),
slide('slide-5', 'Slide 5: comparação interativa', 'tabs-slide tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Interativo</span></p>
    <header style="margin-bottom:1.2rem">
      <p class="eyebrow reveal reveal-up delay-1">Clique nas abas</p>
      <h2 class="section-title reveal reveal-up delay-2">Compare três leituras do <span class="highlight">mesmo dinheiro</span></h2>
    </header>
    <div class="tabs reveal reveal-scale delay-3">
      <div class="tablist" role="tablist" aria-label="Comparação financeira">
        <button class="tab" id="tab-1" role="tab" aria-selected="true" aria-controls="panel-1">Saldo</button>
        <button class="tab" id="tab-2" role="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">Lucro</button>
        <button class="tab" id="tab-3" role="tab" aria-selected="false" aria-controls="panel-3" tabindex="-1">Caixa</button>
      </div>
      <div class="tabpanel" id="panel-1" role="tabpanel" aria-labelledby="tab-1"><div><h3>Saldo é o que aparece agora.</h3><p>Ele pode parecer alto porque uma conta grande ainda não venceu. Sozinho, ele pode enganar.</p></div><aside class="side-note"><p class="eyebrow">Cuidado</p><strong>Saldo não é lucro.</strong><p>Dinheiro parado na conta pode já ter destino.</p></aside></div>
      <div class="tabpanel" id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden><div><h3>Lucro considera o resultado.</h3><p>Ele depende de preço, custo, despesa e retirada. É uma visão de desempenho, não de vencimento.</p></div><aside class="side-note"><p class="eyebrow">Use assim</p><strong>Revise preço e margem.</strong><p>Venda alta com margem baixa ainda aperta o caixa.</p></aside></div>
      <div class="tabpanel" id="panel-3" role="tabpanel" aria-labelledby="tab-3" hidden><div><h3>Caixa mostra o tempo do dinheiro.</h3><p>Ele junta o que entra, o que sai e quando cada movimento acontece.</p></div><aside class="side-note"><p class="eyebrow">Decisão</p><strong>Antecipe o aperto.</strong><p>Com previsão, você negocia prazo antes de atrasar.</p></aside></div>
    </div>
  </div>`),
slide('slide-6', 'Slide 6: método de controle', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Método</span></p>
    <header style="max-width:780px">
      <p class="eyebrow reveal reveal-up delay-1">Cinco passos</p>
      <h2 class="section-title reveal reveal-up delay-2">Monte um controle financeiro <span class="highlight">que você realmente usa</span></h2>
    </header>
    <div class="flow stagger-children delay-3">
      <article class="step"><span>1</span><h3>Registre</h3><p>Anote toda entrada e saída no dia em que acontecer.</p></article>
      <article class="step"><span>2</span><h3>Classifique</h3><p>Venda, custo, despesa, imposto, investimento ou retirada.</p></article>
      <article class="step"><span>3</span><h3>Separe</h3><p>Não misture conta pessoal com dinheiro do negócio.</p></article>
      <article class="step"><span>4</span><h3>Projete</h3><p>Liste pagamentos e recebimentos dos próximos trinta dias.</p></article>
      <article class="step"><span>5</span><h3>Ajuste</h3><p>Revise preço, compra e prazo quando o caixa apertar.</p></article>
    </div>
  </div>`),
slide('slide-7', 'Slide 7: cards de fixação', 'tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Fixação</span></p>
    <header style="margin-bottom:1.35rem;max-width:780px">
      <p class="eyebrow reveal reveal-up delay-1">Clique para revelar</p>
      <h2 class="section-title reveal reveal-up delay-2">Use estes termos para conversar com <span class="highlight">o seu caixa</span></h2>
    </header>
    <div class="flip-grid reveal reveal-scale delay-3">
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Fluxo de caixa"><div class="flip-inner"><div class="flip-front">${icon('chart-bar','icon-lg')}<h3>Fluxo de caixa</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Fluxo de caixa</h3><p>Mostra dinheiro que entra, sai e vence. É o mapa para evitar surpresa.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Capital de giro"><div class="flip-inner"><div class="flip-front">${icon('briefcase','icon-lg')}<h3>Capital de giro</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Capital de giro</h3><p>É a reserva que sustenta a operação entre pagar fornecedores e receber clientes.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Margem"><div class="flip-inner"><div class="flip-front">${icon('money','icon-lg')}<h3>Margem</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Margem</h3><p>É o que sobra da venda depois dos custos diretos. Sem margem, o caixa sofre.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Retirada"><div class="flip-inner"><div class="flip-front">${icon('users-three','icon-lg')}<h3>Retirada</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Retirada</h3><p>É o valor combinado para o dono. Quando vira impulso, o negócio perde fôlego.</p></div></div></div>
    </div>
  </div>`),
slide('slide-8', 'Slide 8: estudo de caso', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-04-oficina-caixa.jpg" alt="Dono de oficina analisando papéis financeiros e calculadora sobre uma bancada de trabalho.">
      <figcaption>Oficina Ponto Certo: vendia bem, mas atrasava fornecedor porque olhava apenas o saldo do banco.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Estudo de caso</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Situação realista</p>
      <h2 class="section-title reveal reveal-up delay-2">Faturamento bom não salvou a oficina de <span class="highlight">aperto no vencimento</span></h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('warning')}</span><div><h3>Problema</h3><p>O dono comprava peças sem olhar os pagamentos que venceriam na semana.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('calendar-check')}</span><div><h3>Ação</h3><p>Montou previsão por vencimento e reduziu compras sem giro rápido.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('check-circle')}</span><div><h3>Resultado</h3><p>Evitou juros por atraso e passou a negociar prazo antes do aperto.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-9', 'Slide 9: análise guiada', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Análise guiada</span></p>
    <header style="margin-bottom:1.35rem">
      <p class="eyebrow reveal reveal-up delay-1">Abra cada parte</p>
      <h2 class="section-title reveal reveal-up delay-2">O que você aprende com a <span class="highlight">Oficina Ponto Certo</span>?</h2>
    </header>
    <div class="accord-list reveal reveal-scale delay-3">
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">1. Qual era a ilusão?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>O saldo parecia suficiente, mas parte do dinheiro já tinha destino: fornecedor, aluguel, impostos e retirada.</p></div></div></div>
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">2. Qual controle resolveu?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>Uma previsão por data: entradas prováveis de um lado, saídas assumidas do outro.</p></div></div></div>
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">3. O que você deve copiar?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>Antes de comprar ou retirar dinheiro, olhe os próximos vencimentos e decida com base na previsão.</p></div></div></div>
    </div>
  </div>`),
slide('slide-10', 'Slide 10: sinais de alerta', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Alertas práticos</span></p>
    <header style="max-width:780px;margin-bottom:1.3rem">
      <p class="eyebrow reveal reveal-up delay-1">Observe estes sinais</p>
      <h2 class="section-title reveal reveal-up delay-2">O caixa começa a avisar antes de <span class="highlight">virar problema</span></h2>
    </header>
    <div class="grid-3 stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('warning')}</span><h3>Contas misturadas</h3><p>Gasto pessoal entra na conta da empresa e o lucro fica impossível de enxergar.</p></article>
      <article class="card"><span class="icon-shell">${icon('storefront')}</span><h3>Compra por impulso</h3><p>Estoque parado consome dinheiro que pagaria despesas próximas.</p></article>
      <article class="card"><span class="icon-shell">${icon('money')}</span><h3>Preço baixo</h3><p>Venda acontece, mas a margem não paga custo, despesa e reinvestimento.</p></article>
    </div>
    <div class="callout reveal reveal-up delay-4" style="margin-top:1.1rem">${icon('lightbulb')} <p><strong>Regra prática:</strong> registre diariamente e revise semanalmente. Controle atrasado vira memória falha.</p></div>
  </div>`),
slide('slide-11', 'Slide 11: missão prática', 'dark', `
  <div class="inner mission-layout">
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Missão prática</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Marque conforme concluir</p>
      <h2 class="section-title reveal reveal-up delay-2">Monte sua previsão de <span class="highlight">15 dias</span></h2>
      <p class="lead reveal reveal-up delay-3">Use papel, planilha ou aplicativo. O importante é separar entradas prováveis e saídas já assumidas por data.</p>
    </div>
    <div class="ms-panel reveal reveal-scale delay-2">
      <p class="ms-title">Sua missão financeira</p>
      <p class="ms-sub">Clique para marcar cada etapa concluída.</p>
      <div class="ms-list">
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Registrar o saldo inicial do negócio</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Listar entradas prováveis por data</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Listar saídas já assumidas</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Definir uma ação se faltar caixa</div>
      </div>
      <div class="xp-label"><span>Progresso</span><span class="xp-pct">0%</span></div>
      <div class="xp-track"><div class="xp-bar"></div></div>
      <div class="ms-badge">Previsão pronta para revisão.</div>
    </div>
  </div>`),
slide('slide-12', 'Slide 12: checagem formativa', '', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Checagem rápida</span></p>
    <header style="margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Teste sua decisão</p>
      <h2 class="section-title reveal reveal-up delay-2">Qual atitude mostra melhor <span class="highlight">controle financeiro</span>?</h2>
    </header>
    <div class="quiz-options reveal reveal-scale delay-3" data-quiz>
      <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('warning')}</span><div><strong>A</strong><br><span>Usar o saldo do banco como única referência antes de comprar mais.</span></div></button>
      <button class="quiz-btn" type="button" data-answer="correct"><span class="icon-shell">${icon('check-circle')}</span><div><strong>B</strong><br><span>Conferir entradas, saídas e vencimentos antes de decidir compra ou retirada.</span></div></button>
      <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('clock')}</span><div><strong>C</strong><br><span>Registrar tudo só no fim do mês, quando sobrar tempo.</span></div></button>
    </div>
    <p class="quiz-feedback" aria-live="polite">Escolha uma alternativa.</p>
  </div>`),
slide('slide-13', 'Slide 13: síntese e recapitulação', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 4</strong><span>·</span><span>Fechamento</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="tag">Recapitulação</span>
      <h2 class="section-title">O que você deve levar para <span class="highlight">o caixa da empresa</span></h2>
    </header>
    <div class="summary-grid stagger-children delay-2">
      <article class="card"><span class="icon-shell">${icon('chart-bar')}</span><h3>Registre o movimento</h3><p>Entrada e saída sem registro viram chute na hora da decisão.</p></article>
      <article class="card"><span class="icon-shell">${icon('users-three')}</span><h3>Separe as contas</h3><p>Retirada combinada protege o negócio e evita falsa sensação de lucro.</p></article>
      <article class="card"><span class="icon-shell">${icon('calendar-check')}</span><h3>Projete antes de agir</h3><p>Previsão de caixa mostra se compra, prazo ou preço precisam mudar.</p></article>
    </div>
    <div class="takeaway reveal reveal-up delay-4"><span class="icon-shell">${icon('lightbulb')}</span><div><h3>Próximo passo</h3><p>Faça sua previsão de 15 dias hoje e revise semanalmente. Fontes verificadas em 01/06/2026: Sebrae e Gov.br/Receita Federal.</p></div></div>
  </div>`)
];

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Capítulo 4 | Controle financeiro sem complicação</title>
<link rel="icon" href="data:,">
<style>
${style}
</style>
</head>
<body>
<a class="skip-link" href="#slide-1">Ir para o conteúdo</a>
<div class="progress" id="progress" role="progressbar" aria-label="Progresso dos slides" aria-valuemin="1" aria-valuemax="${slides.length}" aria-valuenow="1"></div>
<main class="stage" id="slide-1">
${slides.join('\n')}
</main>
<nav class="nav" aria-label="Navegação dos slides">
  <button class="nav-button" id="previous" type="button" aria-label="Slide anterior" disabled>${icon('arrow-left')}</button>
  <div class="dots" id="dots" aria-label="Selecionar slide"></div>
  <span class="count" id="count" aria-live="polite">1 / ${slides.length}</span>
  <button class="nav-button" id="next" type="button" aria-label="Próximo slide">${icon('arrow-right')}</button>
</nav>
<script>
${script}
</script>
</body>
</html>`;

setupAssets();
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(JSON.stringify({ htmlPath, slides: slides.length }, null, 2));
