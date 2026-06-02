const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const slug = 'fundamentos-administracao-pequenos-negocios';
const runId = '2026-06-01-apostila';
const outDir = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-03');
const imagesDir = path.join(outDir, 'images');
const iconsDir = path.join(outDir, 'icons');
const fontsDir = path.join(outDir, 'fonts');
const htmlPath = path.join(outDir, 'slide.html');
const baseHtmlPath = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-02', 'slide.html');

const heroImage = path.join(root, 'assets', 'images', slug, 'capitulo-03-rotina-trabalho-processo-sem-texto-lucid-realism-leonardo-5c24d1b1.jpg');
const processImage = path.join(root, 'assets', 'images', slug, 'capitulo-03-mapa-processo-ilustracao-sem-texto-lucid-origin-leonardo-f18182fb.jpg');
const caseImage = path.join(root, 'assets', 'images', slug, 'capitulo-03-mercadinho-conferencia-estoque-lucid-realism-leonardo-fe1ff701.jpg');

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
  copyFile(heroImage, path.join(imagesDir, 'capitulo-03-rotina-processo.jpg'));
  copyFile(processImage, path.join(imagesDir, 'capitulo-03-mapa-processo.jpg'));
  copyFile(caseImage, path.join(imagesDir, 'capitulo-03-mercadinho-estoque.jpg'));
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
    "Correto. A meta tem número, prazo, público, ação e revisão.",
    "Correto. Processo claro tem etapa, responsável e padrão mínimo."
  )
  .replace(
    "Ainda não. Uma meta pronta para execução precisa orientar o que você fará e quando vai revisar.",
    "Ainda não. Um processo útil precisa mostrar como o trabalho acontece e onde corrigir."
  );

const slides = [
slide('slide-1', 'Slide 1: abertura', 'cover active', `
  <div class="inner">
    <div class="cover-copy">
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Organização de processos</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Da meta para a operação</p>
      <h1 class="title reveal reveal-up delay-2">Organização de processos e <span class="highlight">rotina de trabalho</span></h1>
      <p class="lead reveal reveal-up delay-3">Você vai transformar o trabalho real em etapas simples, com responsáveis, padrões mínimos e pontos de melhoria visíveis.</p>
      <ul class="objective-list reveal reveal-up delay-3" aria-label="Objetivos de aprendizagem">
        <li>Descrever um processo simples do seu negócio.</li>
        <li>Distinguir etapa, responsável e padrão mínimo.</li>
        <li>Identificar gargalos e testar uma melhoria pequena.</li>
      </ul>
      <button class="button reveal reveal-up delay-4" type="button" data-next>${icon('arrow-right')} Iniciar capítulo</button>
    </div>
    <aside class="hero-panel reveal reveal-scale delay-2">
      <figure><img src="images/capitulo-03-rotina-processo.jpg" alt="Duas profissionais organizando documentos e bandejas de trabalho em uma pequena empresa."></figure>
      <div class="metadata">
        <div class="meta-row"><span class="icon-shell">${icon('target')}</span><div><strong>Objetivo</strong><span>Mapear um processo real e reduzir improviso.</span></div></div>
        <div class="meta-row"><span class="icon-shell">${icon('clock')}</span><div><strong>Tempo sugerido</strong><span>40 a 50 minutos com exercício.</span></div></div>
      </div>
    </aside>
  </div>`),
slide('slide-2', 'Slide 2: mapa do capítulo', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Roteiro</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="tag">Você vai praticar</span>
      <h2 class="section-title">Um processo fica claro quando o caminho do trabalho aparece</h2>
      <p class="lead" style="margin:.8rem auto 0">Neste capítulo, você sai do “cada um faz de um jeito” para uma rotina com etapas, padrão e acompanhamento.</p>
    </header>
    <div class="summary-grid stagger-children delay-2">
      <article class="card"><span class="icon-shell">${icon('path')}</span><h3>Caminho real</h3><p>Ver como o pedido, a compra ou a entrega passa de uma etapa para outra.</p></article>
      <article class="card"><span class="icon-shell">${icon('users-three')}</span><h3>Responsável</h3><p>Definir quem acompanha cada etapa, mesmo quando todos ajudam.</p></article>
      <article class="card"><span class="icon-shell">${icon('check-circle')}</span><h3>Padrão mínimo</h3><p>Combinar o que precisa ser conferido antes de seguir adiante.</p></article>
    </div>
  </div>`),
slide('slide-3', 'Slide 3: conceito central', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-03-mapa-processo.jpg" alt="Ilustração de loja pequena com cartões e checklist representando um fluxo de trabalho.">
      <figcaption>Processo não precisa ser sofisticado: precisa mostrar o caminho que o trabalho já percorre.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Ideia central</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Processo é caminho</p>
      <h2 class="section-title reveal reveal-up delay-2">Processo é a sequência que transforma <span class="highlight">pedido em entrega</span></h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('storefront')}</span><div><h3>Na venda</h3><p>Contato, orçamento, aprovação, pagamento e entrega precisam seguir uma ordem.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('clipboard-text')}</span><div><h3>Na operação</h3><p>Receber, conferir, registrar, separar e finalizar reduzem esquecimento.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('chart-bar')}</span><div><h3>Na melhoria</h3><p>Quando a sequência aparece, o gargalo fica mais fácil de localizar.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-4', 'Slide 4: blocos do processo', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Base prática</span></p>
    <header style="max-width:760px;margin-bottom:1.3rem">
      <p class="eyebrow reveal reveal-up delay-1">Pense em quatro blocos</p>
      <h2 class="section-title reveal reveal-up delay-2">Processo bom mostra <span class="highlight">o que acontece, quem faz e como conferir</span></h2>
    </header>
    <div class="grid-4 stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('path')}</span><h3>Etapa</h3><p>A ação que move o trabalho para frente.</p></article>
      <article class="card"><span class="icon-shell">${icon('users-three')}</span><h3>Dono</h3><p>Quem acompanha e responde pela etapa.</p></article>
      <article class="card"><span class="icon-shell">${icon('check-circle')}</span><h3>Padrão</h3><p>O mínimo aceitável antes de concluir.</p></article>
      <article class="card"><span class="icon-shell">${icon('warning')}</span><h3>Gargalo</h3><p>O ponto onde a fila, o erro ou a espera nasce.</p></article>
    </div>
  </div>`),
slide('slide-5', 'Slide 5: abas interativas', 'tabs-slide tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Interativo</span></p>
    <header style="margin-bottom:1.2rem">
      <p class="eyebrow reveal reveal-up delay-1">Clique nas abas</p>
      <h2 class="section-title reveal reveal-up delay-2">Compare três formas de enxergar <span class="highlight">o mesmo trabalho</span></h2>
    </header>
    <div class="tabs reveal reveal-scale delay-3">
      <div class="tablist" role="tablist" aria-label="Níveis de organização do processo">
        <button class="tab" id="tab-1" role="tab" aria-selected="true" aria-controls="panel-1">Improviso</button>
        <button class="tab" id="tab-2" role="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">Sequência</button>
        <button class="tab" id="tab-3" role="tab" aria-selected="false" aria-controls="panel-3" tabindex="-1">Padrão</button>
      </div>
      <div class="tabpanel" id="panel-1" role="tabpanel" aria-labelledby="tab-1"><div><h3>“A gente resolve na hora.”</h3><p>Funciona por pouco tempo, mas cada pessoa cria um jeito. O erro aparece quando o volume aumenta.</p></div><aside class="side-note"><p class="eyebrow">Risco</p><strong>O cliente sente a variação.</strong><p>Entrega, prazo e atendimento mudam conforme quem está no dia.</p></aside></div>
      <div class="tabpanel" id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden><div><h3>“Primeiro recebe, depois confere.”</h3><p>A ordem já reduz confusão. Ainda falta registrar quem faz e qual conferência encerra a etapa.</p></div><aside class="side-note"><p class="eyebrow">Melhorou</p><strong>O caminho ficou visível.</strong><p>Agora dá para observar onde o trabalho trava.</p></aside></div>
      <div class="tabpanel" id="panel-3" role="tabpanel" aria-labelledby="tab-3" hidden><div><h3>“Receber, contar, registrar, etiquetar e guardar.”</h3><p>Cada etapa tem responsável e checagem mínima antes de seguir para a próxima.</p></div><aside class="side-note"><p class="eyebrow">Use assim</p><strong>Simples e repetível.</strong><p>O padrão reduz retrabalho sem criar burocracia pesada.</p></aside></div>
    </div>
  </div>`),
slide('slide-6', 'Slide 6: método em cinco passos', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Método</span></p>
    <header style="max-width:780px">
      <p class="eyebrow reveal reveal-up delay-1">Mapa em uma página</p>
      <h2 class="section-title reveal reveal-up delay-2">Cinco passos para mapear um <span class="highlight">processo real</span></h2>
    </header>
    <div class="flow stagger-children delay-3">
      <article class="step"><span>1</span><h3>Escolha</h3><p>Comece por um processo que gera erro ou atraso.</p></article>
      <article class="step"><span>2</span><h3>Escreva</h3><p>Liste as etapas na ordem que realmente acontece.</p></article>
      <article class="step"><span>3</span><h3>Marque</h3><p>Defina quem executa ou acompanha cada etapa.</p></article>
      <article class="step"><span>4</span><h3>Padronize</h3><p>Registre a conferência mínima de qualidade.</p></article>
      <article class="step"><span>5</span><h3>Teste</h3><p>Aplique uma melhoria pequena por vez.</p></article>
    </div>
  </div>`),
slide('slide-7', 'Slide 7: fixação com cards', 'tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Fixação</span></p>
    <header style="margin-bottom:1.35rem;max-width:780px">
      <p class="eyebrow reveal reveal-up delay-1">Clique para revelar</p>
      <h2 class="section-title reveal reveal-up delay-2">Quatro termos para organizar <span class="highlight">sem complicar</span></h2>
    </header>
    <div class="flip-grid reveal reveal-scale delay-3">
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Processo"><div class="flip-inner"><div class="flip-front">${icon('path','icon-lg')}<h3>Processo</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Processo</h3><p>É o caminho combinado para uma tarefa sair do começo ao fim com menos erro.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Padrão"><div class="flip-inner"><div class="flip-front">${icon('check-circle','icon-lg')}<h3>Padrão</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Padrão</h3><p>É o mínimo aceitável para manter qualidade mesmo quando o dia está corrido.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Gargalo"><div class="flip-inner"><div class="flip-front">${icon('warning','icon-lg')}<h3>Gargalo</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Gargalo</h3><p>É o ponto em que a fila, o atraso ou o erro se concentra com frequência.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Melhoria"><div class="flip-inner"><div class="flip-front">${icon('gear','icon-lg')}<h3>Melhoria</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Melhoria</h3><p>É uma mudança pequena, testada na prática, para reduzir erro ou espera.</p></div></div></div>
    </div>
  </div>`),
slide('slide-8', 'Slide 8: estudo de caso Mercadinho Nova Praça', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-03-mercadinho-estoque.jpg" alt="Equipe de mercadinho conferindo produtos recebidos no estoque.">
      <figcaption>Mercadinho Nova Praça: produtos chegavam, mas a conferência falhava e o estoque ficava pouco confiável.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Estudo de caso</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Situação realista</p>
      <h2 class="section-title reveal reveal-up delay-2">O estoque parecia organizado, mas <span class="highlight">o processo de entrada falhava</span></h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('warning')}</span><div><h3>Problema</h3><p>Notas eram guardadas antes da contagem e diferenças só apareciam no caixa.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('list-checks')}</span><div><h3>Nova ordem</h3><p>Receber, contar, registrar divergência, etiquetar e guardar.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('check-circle')}</span><div><h3>Ganho</h3><p>As perdas por erro de entrada caíram e o estoque ficou mais confiável.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-9', 'Slide 9: análise do caso', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Análise guiada</span></p>
    <header style="margin-bottom:1.35rem">
      <p class="eyebrow reveal reveal-up delay-1">Abra cada parte</p>
      <h2 class="section-title reveal reveal-up delay-2">Veja como transformar falha recorrente em <span class="highlight">processo visível</span></h2>
    </header>
    <div class="accord-list reveal reveal-scale delay-3">
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">1. Onde estava o gargalo?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>Na entrada de produtos. A equipe guardava antes de conferir, então o erro ficava escondido até afetar estoque ou caixa.</p></div></div></div>
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">2. Qual padrão foi criado?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>Receber, contar, registrar divergência, etiquetar e guardar. Poucas etapas, mas em ordem fixa.</p></div></div></div>
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">3. O que você deve copiar desse caso?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>Escolha um ponto que gera erro repetido, escreva as etapas reais e crie uma conferência simples antes de avançar.</p></div></div></div>
    </div>
  </div>`),
slide('slide-10', 'Slide 10: métricas de processo', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Controle de qualidade</span></p>
    <header style="max-width:760px;margin-bottom:1.3rem">
      <p class="eyebrow reveal reveal-up delay-1">Meça sem complicar</p>
      <h2 class="section-title reveal reveal-up delay-2">Três sinais mostram se o processo <span class="highlight">precisa de ajuste</span></h2>
    </header>
    <div class="grid-3 stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('warning')}</span><h3>Erros repetidos</h3><p>Registre por uma semana. O erro que mais aparece vira prioridade.</p></article>
      <article class="card"><span class="icon-shell">${icon('clock')}</span><h3>Tempo de espera</h3><p>Observe onde o pedido fica parado ou volta para correção.</p></article>
      <article class="card"><span class="icon-shell">${icon('clipboard-text')}</span><h3>Processos mapeados</h3><p>Comece com três: venda, entrega e compra ou estoque.</p></article>
    </div>
    <div class="callout reveal reveal-up delay-4" style="margin-top:1.1rem">${icon('lightbulb')} <p><strong>Regra prática:</strong> observe antes de corrigir. Se você muda sem medir, pode mexer no ponto errado.</p></div>
  </div>`),
slide('slide-11', 'Slide 11: checklist interativo', 'dark', `
  <div class="inner mission-layout">
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Missão prática</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Marque conforme concluir</p>
      <h2 class="section-title reveal reveal-up delay-2">Mapeie um processo em <span class="highlight">até 10 etapas</span></h2>
      <p class="lead reveal reveal-up delay-3">Escolha algo real: recebimento, venda, entrega, orçamento, atendimento ou cobrança. O objetivo é clareza, não perfeição.</p>
    </div>
    <div class="ms-panel reveal reveal-scale delay-2">
      <p class="ms-title">Sua missão de processo</p>
      <p class="ms-sub">Clique para marcar cada etapa concluída.</p>
      <div class="ms-list">
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Escolher um processo que gera erro ou atraso</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Listar começo, meio e fim em ordem real</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Definir responsável por etapa crítica</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Testar uma melhoria simples esta semana</div>
      </div>
      <div class="xp-label"><span>Progresso</span><span class="xp-pct">0%</span></div>
      <div class="xp-track"><div class="xp-bar"></div></div>
      <div class="ms-badge">Processo pronto para teste.</div>
    </div>
  </div>`),
slide('slide-12', 'Slide 12: mini quiz', '', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Checagem rápida</span></p>
    <header style="margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Teste sua decisão</p>
      <h2 class="section-title reveal reveal-up delay-2">Qual alternativa mostra melhor um <span class="highlight">processo organizado</span>?</h2>
    </header>
    <div class="quiz-options reveal reveal-scale delay-3" data-quiz>
      <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('warning')}</span><div><strong>A</strong><br><span>Cada pessoa confere do seu jeito, desde que a entrega saia no fim do dia.</span></div></button>
      <button class="quiz-btn" type="button" data-answer="correct"><span class="icon-shell">${icon('check-circle')}</span><div><strong>B</strong><br><span>Receber, contar, registrar divergência, etiquetar e guardar sempre nessa ordem.</span></div></button>
      <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('clock')}</span><div><strong>C</strong><br><span>Resolver só quando o cliente reclamar, para não gastar tempo com controle.</span></div></button>
    </div>
    <p class="quiz-feedback" aria-live="polite">Escolha uma alternativa.</p>
  </div>`),
slide('slide-13', 'Slide 13: síntese e próximo passo', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 3</strong><span>·</span><span>Fechamento</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="tag">Síntese</span>
      <h2 class="section-title">O que você deve levar para a <span class="highlight">sua rotina</span></h2>
    </header>
    <div class="summary-grid stagger-children delay-2">
      <article class="card"><span class="icon-shell">${icon('path')}</span><h3>Processo é sequência real</h3><p>Ele mostra como o trabalho passa de uma etapa para outra.</p></article>
      <article class="card"><span class="icon-shell">${icon('check-circle')}</span><h3>Padrão mantém qualidade</h3><p>O mínimo combinado reduz variação, retrabalho e esquecimento.</p></article>
      <article class="card"><span class="icon-shell">${icon('warning')}</span><h3>Gargalo pede observação</h3><p>Antes de corrigir, veja onde erro, fila ou espera se repetem.</p></article>
    </div>
    <div class="takeaway reveal reveal-up delay-4"><span class="icon-shell">${icon('lightbulb')}</span><div><h3>Próximo passo</h3><p>Mapeie um processo em até dez etapas. No capítulo 4, essa organização conversa com o controle financeiro.</p></div></div>
  </div>`)
];

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Capítulo 3 | Organização de processos e rotina de trabalho</title>
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
