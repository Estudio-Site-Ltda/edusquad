const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const slug = 'fundamentos-administracao-pequenos-negocios';
const runId = '2026-06-01-apostila';
const outDir = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-07');
const imagesDir = path.join(outDir, 'images');
const iconsDir = path.join(outDir, 'icons');
const fontsDir = path.join(outDir, 'fonts');
const htmlPath = path.join(outDir, 'slide.html');
const baseHtmlPath = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-06', 'slide.html');

const heroImage = path.join(root, 'assets', 'images', slug, 'capitulo-03-rotina-trabalho-processo-sem-texto-lucid-realism-leonardo-5c24d1b1.jpg');
const boardImage = path.join(root, 'assets', 'images', slug, 'capitulo-03-organizacao-processos-hero-limpo-lucid-realism-leonardo-f0121f01.jpg');
const storeImage = path.join(root, 'assets', 'images', slug, 'capitulo-01-padaria-rotina-gestao-sem-letterbox-lucid-realism-leonardo-4d066c17.jpg');

const icons = [
  'arrow-left', 'arrow-right', 'check-circle', 'lightbulb', 'warning',
  'target', 'list-checks', 'briefcase', 'clock', 'calendar-check',
  'clipboard-text', 'chart-bar', 'storefront', 'notebook', 'path',
  'users-three', 'gear', 'chat-text', 'phone-list', 'user-check',
  'star', 'hand-heart', 'seal-check', 'smiley', 'envelope',
  'flag-checkered', 'flow-arrow'
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
  copyFile(heroImage, path.join(imagesDir, 'capitulo-07-equipe-rotina.jpg'));
  copyFile(boardImage, path.join(imagesDir, 'capitulo-07-quadro-responsabilidades.jpg'));
  copyFile(storeImage, path.join(imagesDir, 'capitulo-07-loja-casa-bela.jpg'));
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
const baseStyle = extractBetween(baseHtml, '<style>', '</style>');

const customStyle = `
html,body{overflow-x:hidden}
.slide{box-sizing:border-box;transform:none!important}
.owner-board{display:grid;grid-template-columns:1.05fr .95fr;gap:1.15rem;align-items:stretch}
.owner-table{display:grid;gap:.62rem;padding:1.1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;box-shadow:var(--shadow)}
.owner-row{display:grid;grid-template-columns:1fr .72fr .72fr;gap:.6rem;align-items:center;padding:.75rem;border:1px solid var(--neutral-200);border-radius:var(--radius);background:var(--neutral-50);color:var(--neutral-900)}
.owner-row strong{font-family:var(--title)}
.owner-row span{color:var(--neutral-600);font-weight:800}
.quote-panel-clean{padding:1.3rem;border-radius:var(--radius-lg);background:linear-gradient(135deg,var(--primary-900),var(--primary-700));color:#fff;display:grid;align-content:center}
.quote-panel-clean h3{font-family:var(--title);font-size:1.55rem;color:#fff}
.quote-panel-clean p{margin-top:.75rem;color:rgba(255,255,255,.82)}
.delegate-lane{display:grid;grid-template-columns:.9fr 1.1fr;gap:1.15rem;align-items:stretch}
.delegate-steps{display:grid;gap:.7rem}
.delegate-step{display:grid;grid-template-columns:auto 1fr;gap:.7rem;align-items:center;padding:.9rem;border:1px solid var(--neutral-200);border-radius:var(--radius);background:#fff;text-align:left;cursor:pointer;color:var(--neutral-900)}
.delegate-step[aria-pressed="true"]{border-color:var(--primary-600);box-shadow:0 0 0 3px var(--primary-100)}
.delegate-panel{padding:1.25rem;border-radius:var(--radius-lg);background:var(--primary-50);border:1px solid rgba(29,138,156,.25);display:grid;align-content:center;color:var(--neutral-900)}
.delegate-panel h3{font-family:var(--title);font-size:1.45rem;color:var(--neutral-900)}
.delegate-panel p{margin-top:.6rem;color:var(--neutral-700)}
.assign-map{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.assign-pool,.assign-bucket{min-height:172px;padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;color:var(--neutral-900)}
.assign-bucket{background:var(--primary-50)}
.assign-bucket[data-kind="apoio"]{background:#fff7f6}
.assign-pool h3,.assign-bucket h3{color:var(--neutral-900);font-family:var(--title);font-size:1.05rem}
.assign-items{display:grid;gap:.55rem;margin-top:.65rem}
.assign-item{display:block;width:100%;padding:.72rem .85rem;border:1px solid var(--neutral-300);border-radius:12px;background:#fff;cursor:grab;text-align:left;font-weight:800;color:var(--neutral-900)}
.assign-item.selected{outline:3px solid var(--primary-200);border-color:var(--primary-600)}
.assign-status,.decision-status,.check-status,.channel-status{min-height:46px;margin-top:.8rem;padding:.78rem .9rem;border-radius:var(--radius);background:#fff;color:var(--neutral-900);font-weight:800}
.assign-status.good,.decision-status.good,.check-status.good,.channel-status.good{background:#effaf4;color:#1e6b43}
.assign-status.warn,.decision-status.warn,.check-status.warn,.channel-status.warn{background:#fff7e8;color:#744e00}
.decision-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.decision-card{padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;text-align:left;cursor:pointer;color:var(--neutral-900)}
.decision-card h3{font-family:var(--title);font-size:1rem;color:var(--neutral-900)}
.decision-card p{margin-top:.45rem;color:var(--neutral-600);font-size:.86rem}
.decision-card.chosen{border-color:var(--primary-600);box-shadow:0 0 0 3px var(--primary-100)}
.channel-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.channel-card{padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;text-align:left;cursor:pointer;color:var(--neutral-900)}
.channel-card h3{font-family:var(--title);font-size:1rem;color:var(--neutral-900)}
.channel-card p{margin-top:.45rem;color:var(--neutral-600);font-size:.86rem}
.channel-card.active{border-color:var(--success);background:#effaf4}
.standard-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:.75rem}
.standard-check{display:grid;gap:.55rem;align-content:start;min-height:126px;padding:.9rem;border:1px solid var(--neutral-300);border-radius:var(--radius);background:#fff;text-align:left;cursor:pointer;color:var(--neutral-900)}
.standard-check strong{color:var(--neutral-900)}
.standard-check.done{border-color:var(--success);background:#effaf4}
.metric-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.metric{display:grid;align-content:start;gap:.45rem;padding:1.1rem;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--neutral-200);color:var(--neutral-900)}
.metric .icon-shell{display:flex;width:44px;height:44px;align-items:center;justify-content:center;margin:0 0 .35rem 0;color:var(--primary-700)}
.metric .icon-shell .icon{display:block;width:1.22rem;height:1.22rem}
.metric strong{display:block;font-family:var(--title);font-size:1.05rem;color:var(--neutral-900)}
.metric .metric-value{display:block;color:var(--primary-700);font-weight:900}
.case-ribbon{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
.case-ribbon .card{background:#fff;color:var(--neutral-900)}
.case-ribbon .card h3{color:var(--neutral-900)}
.case-ribbon .card p{color:var(--neutral-600)}
@media (max-width:900px){
  html,body{overflow-x:hidden}
  .owner-board,.delegate-lane,.assign-map,.decision-grid,.channel-grid,.standard-grid,.metric-strip,.case-ribbon{grid-template-columns:1fr}
  .assign-pool,.assign-bucket{min-height:auto}
  .standard-check{min-height:auto}
  .owner-row{grid-template-columns:1fr}
}
`;

const slides = [
slide('slide-1', 'Slide 1: abertura e objetivos', 'cover active', `
  <div class="inner">
    <div class="cover-copy">
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Pessoas</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Pessoas, responsabilidades e liderança enxuta</p>
      <h1 class="title reveal reveal-up delay-2">Dê clareza antes de cobrar desempenho</h1>
      <p class="lead reveal reveal-up delay-3">Você vai organizar responsabilidades, reduzir falhas de comunicação e transformar combinados em rotina visível.</p>
      <ul class="objective-list reveal reveal-up delay-3" aria-label="Objetivos de aprendizagem">
        <li>Comparar responsabilidades formais e informais.</li>
        <li>Avaliar pontos de falha na comunicação.</li>
        <li>Definir combinados de trabalho.</li>
      </ul>
      <button class="button reveal reveal-up delay-4" type="button" data-next>${icon('arrow-right')} Iniciar capítulo</button>
    </div>
    <aside class="hero-panel reveal reveal-scale delay-2">
      <figure><img src="images/capitulo-07-equipe-rotina.jpg" alt="Ambiente de pequeno negócio com rotina organizada, representando equipe e divisão de tarefas."></figure>
      <div class="metadata">
        <div class="meta-row"><span class="icon-shell">${icon('target')}</span><div><strong>Objetivo</strong><span>Transformar tarefas soltas em responsabilidades claras.</span></div></div>
        <div class="meta-row"><span class="icon-shell">${icon('clock')}</span><div><strong>Tempo sugerido</strong><span>45 minutos com quadro prático.</span></div></div>
      </div>
    </aside>
  </div>`),
slide('slide-2', 'Slide 2: roteiro do capítulo', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Roteiro</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="tag">Ideia central</span>
      <h2 class="section-title">Liderança enxuta começa no combinado</h2>
      <p class="lead" style="margin:.8rem auto 0">Equipe pequena pode ajudar em tudo, mas cada área crítica precisa ter dono, padrão e forma de acompanhamento.</p>
    </header>
    <div class="summary-grid stagger-children delay-2">
      <article class="card"><span class="icon-shell">${icon('users-three')}</span><h3>Responsabilidade</h3><p>Quem responde por cada atividade crítica.</p></article>
      <article class="card"><span class="icon-shell">${icon('flow-arrow')}</span><h3>Delegação</h3><p>Resultado esperado, prazo, limite e acompanhamento.</p></article>
      <article class="card"><span class="icon-shell">${icon('chat-text')}</span><h3>Comunicação</h3><p>Onde registrar pedidos, mudanças e decisões.</p></article>
    </div>
  </div>`),
slide('slide-3', 'Slide 3: conceito central', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-07-quadro-responsabilidades.jpg" alt="Mesa organizada com materiais de trabalho, representando planejamento de responsabilidades e processos.">
      <figcaption>Clareza evita duas pessoas fazendo a mesma tarefa e outra ficando sem dono.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Conceito</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Função precisa ser clara</p>
      <h2 class="section-title reveal reveal-up delay-2">Todos ajudam em tudo, mas nem tudo pode ficar sem responsável</h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('user-check')}</span><div><h3>Dono</h3><p>Responsável principal pelo resultado e pelo aviso quando algo travar.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('users-three')}</span><div><h3>Apoio</h3><p>Quem ajuda na execução, sem virar responsável invisível.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('seal-check')}</span><div><h3>Padrão</h3><p>Como saber se a entrega está completa e aceitável.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-4', 'Slide 4: quadro de responsabilidades', 'tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Quadro</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Deixe visível</p>
      <h2 class="section-title reveal reveal-up delay-2">Um quadro simples já reduz ruído</h2>
    </header>
    <div class="owner-board reveal reveal-scale delay-3">
      <div class="owner-table" aria-label="Exemplo de quadro de responsabilidades">
        <div class="owner-row"><strong>Atividade</strong><span>Dono</span><span>Apoio</span></div>
        <div class="owner-row"><strong>Caixa</strong><span>Irmã</span><span>Gerente</span></div>
        <div class="owner-row"><strong>Compras</strong><span>Irmão</span><span>Produção</span></div>
        <div class="owner-row"><strong>Produção</strong><span>Mãe</span><span>Equipe</span></div>
      </div>
      <aside class="quote-panel-clean">
        <h3>Responsável não é culpado automático.</h3>
        <p>É a pessoa que sabe o estado da atividade, aciona apoio e avisa quando o combinado não vai acontecer.</p>
      </aside>
    </div>
  </div>`),
slide('slide-5', 'Slide 5: delegação em etapas', '', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Explorar</span></p>
    <header style="margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Delegar não é largar</p>
      <h2 class="section-title reveal reveal-up delay-2">Clique em cada parte de uma delegação completa</h2>
    </header>
    <div class="delegate-lane reveal reveal-scale delay-3">
      <div class="delegate-steps">
        <button class="delegate-step" type="button" data-title="Resultado esperado" data-copy="Explique em uma frase o que precisa estar pronto. Sem resultado claro, a pessoa adivinha o padrão."><span class="icon-shell">${icon('target')}</span><strong>Resultado esperado</strong></button>
        <button class="delegate-step" type="button" data-title="Prazo e limite" data-copy="Combine quando entregar e quais decisões a pessoa pode tomar sem pedir autorização."><span class="icon-shell">${icon('calendar-check')}</span><strong>Prazo e limite</strong></button>
        <button class="delegate-step" type="button" data-title="Acompanhamento" data-copy="Acompanhar é verificar andamento sem refazer o trabalho da pessoa."><span class="icon-shell">${icon('check-circle')}</span><strong>Acompanhamento</strong></button>
      </div>
      <aside class="delegate-panel" aria-live="polite"><h3>Escolha uma etapa</h3><p>Clique para ver o que não pode faltar em uma delegação clara.</p></aside>
    </div>
  </div>`),
slide('slide-6', 'Slide 6: classificação de responsabilidades', 'dark', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Arrastar ou clicar</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Dono ou apoio?</p>
      <h2 class="section-title reveal reveal-up delay-2">Classifique o papel de cada pessoa na atividade</h2>
      <p class="lead reveal reveal-up delay-3">Você pode arrastar ou selecionar um item e depois escolher a coluna pelo teclado/clique.</p>
    </header>
    <div class="assign-map reveal reveal-scale delay-3">
      <div class="assign-pool"><h3>Itens para classificar</h3><div class="assign-items">
        <button class="assign-item" id="assign-1" type="button" data-answer="dono">Pessoa que responde pelo prazo</button>
        <button class="assign-item" id="assign-2" type="button" data-answer="apoio">Pessoa chamada em horário de pico</button>
        <button class="assign-item" id="assign-3" type="button" data-answer="dono">Pessoa que registra mudança no pedido</button>
        <button class="assign-item" id="assign-4" type="button" data-answer="apoio">Pessoa que ajuda a conferir entrega</button>
      </div></div>
      <div style="display:grid;gap:1rem">
        <div class="assign-bucket" role="button" tabindex="0" data-kind="dono" aria-label="Coluna dono"><h3>Dono da atividade</h3><div class="assign-items"></div></div>
        <div class="assign-bucket" role="button" tabindex="0" data-kind="apoio" aria-label="Coluna apoio"><h3>Apoio</h3><div class="assign-items"></div></div>
      </div>
    </div>
    <p class="assign-status" aria-live="polite">Classifique cada item no papel correto.</p>
  </div>`),
slide('slide-7', 'Slide 7: comunicação com rastro', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Comunicação</span></p>
    <header style="margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Decisão precisa deixar rastro</p>
      <h2 class="section-title reveal reveal-up delay-2">Escolha onde registrar cada tipo de combinado</h2>
    </header>
    <div class="channel-grid reveal reveal-scale delay-3">
      <button class="channel-card" type="button" data-feedback="Bom: pedidos, faltas e mudanças precisam ficar em um canal visível para a equipe."><h3>Canal combinado</h3><p>Pedidos, faltas, atrasos e mudanças.</p></button>
      <button class="channel-card" type="button" data-feedback="Bom: o quadro deixa atividade, dono, apoio, prazo e padrão visíveis."><h3>Quadro visível</h3><p>Atividades críticas e responsáveis.</p></button>
      <button class="channel-card" type="button" data-feedback="Cuidado: conversa solta ajuda na urgência, mas não deve ser o único registro."><h3>Conversa solta</h3><p>Útil no momento, frágil como controle.</p></button>
    </div>
    <p class="channel-status" aria-live="polite">Escolha uma opção para ver o feedback.</p>
  </div>`),
slide('slide-8', 'Slide 8: estudo de caso', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Estudo de caso</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Loja Casa Bela</p>
      <h2 class="section-title reveal reveal-up delay-2">Promessas diferentes estavam criando confusão para clientes e equipe</h2>
    </header>
    <div class="case-ribbon stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('storefront')}</span><h3>Contexto</h3><p>Vendedoras prometiam prazos diferentes e consultavam estoque de forma irregular.</p></article>
      <article class="card"><span class="icon-shell">${icon('warning')}</span><h3>Problema</h3><p>Os combinados mudavam no meio do dia e ninguém sabia quem decidia.</p></article>
      <article class="card"><span class="icon-shell">${icon('gear')}</span><h3>Ação</h3><p>A gerente definiu responsáveis por estoque, vitrine, caixa e pós-venda.</p></article>
      <article class="card"><span class="icon-shell">${icon('check-circle')}</span><h3>Resultado</h3><p>As promessas ficaram consistentes e a equipe resolveu mais sem depender da gerente.</p></article>
    </div>
  </div>`),
slide('slide-9', 'Slide 9: decisão guiada', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Decisão</span></p>
    <header style="margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">O que você faria?</p>
      <h2 class="section-title reveal reveal-up delay-2">A equipe recebe respostas diferentes sobre o mesmo prazo</h2>
    </header>
    <div class="decision-grid reveal reveal-scale delay-3">
      <button class="decision-card" type="button" data-kind="warn" data-feedback="Risco alto: cobrar sem padrão só aumenta ruído. Primeiro defina o combinado."><h3>Cobrar mais atenção</h3><p>Pressiona a equipe, mas não cria referência comum.</p></button>
      <button class="decision-card" type="button" data-kind="good" data-feedback="Boa decisão: prazo, responsável e canal de registro reduzem versões diferentes."><h3>Definir padrão e canal</h3><p>Cria referência visível para consulta e acompanhamento.</p></button>
      <button class="decision-card" type="button" data-kind="warn" data-feedback="Cuidado: centralizar tudo na gerente resolve hoje e trava a equipe amanhã."><h3>Centralizar na gerente</h3><p>Evita erro pontual, mas aumenta dependência.</p></button>
    </div>
    <p class="decision-status" aria-live="polite">Escolha uma ação para ver o feedback.</p>
  </div>`),
slide('slide-10', 'Slide 10: checklist de combinados', 'dark', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Checklist</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Marque seu padrão atual</p>
      <h2 class="section-title reveal reveal-up delay-2">Cinco itens deixam a liderança menos improvisada</h2>
    </header>
    <div class="standard-grid reveal reveal-scale delay-3">
      <button class="standard-check" type="button">${icon('list-checks')}<strong>Atividades listadas</strong></button>
      <button class="standard-check" type="button">${icon('user-check')}<strong>Dono definido</strong></button>
      <button class="standard-check" type="button">${icon('seal-check')}<strong>Padrão escrito</strong></button>
      <button class="standard-check" type="button">${icon('chat-text')}<strong>Canal combinado</strong></button>
      <button class="standard-check" type="button">${icon('star')}<strong>Feedback registrado</strong></button>
    </div>
    <p class="check-status" aria-live="polite">Marque os itens que já existem: 0 de 5.</p>
  </div>`),
slide('slide-11', 'Slide 11: indicadores de liderança', 'tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Métricas</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Poucos sinais bastam</p>
      <h2 class="section-title reveal reveal-up delay-2">Acompanhe o que mostra clareza na equipe</h2>
    </header>
    <div class="metric-strip stagger-children delay-3">
      <article class="metric"><span class="icon-shell">${icon('user-check')}</span><strong>Atividades com dono</strong><span class="metric-value">100% das críticas</span></article>
      <article class="metric"><span class="icon-shell">${icon('clock')}</span><strong>Reunião rápida</strong><span class="metric-value">diária ou semanal</span></article>
      <article class="metric"><span class="icon-shell">${icon('warning')}</span><strong>Retrabalho por comunicação</strong><span class="metric-value">registrar ocorrências</span></article>
    </div>
    <div class="callout reveal reveal-up delay-4" style="margin-top:1rem">${icon('lightbulb')} <p><strong>Regra prática:</strong> se o mesmo erro volta, o combinado ainda não ficou claro.</p></div>
  </div>`),
slide('slide-12', 'Slide 12: missão prática', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Missão prática</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Ação de campo</p>
      <h2 class="section-title reveal reveal-up delay-2">Crie um quadro de responsabilidades para cinco atividades críticas</h2>
      <p class="lead reveal reveal-up delay-3">Para cada atividade, escreva dono, apoio, prazo, padrão de entrega e canal de aviso.</p>
    </header>
    <div class="summary-grid stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('clipboard-text')}</span><h3>Atividade</h3><p>O que precisa acontecer para a empresa funcionar.</p></article>
      <article class="card"><span class="icon-shell">${icon('user-check')}</span><h3>Dono</h3><p>Quem responde pelo resultado e pelo aviso de trava.</p></article>
      <article class="card"><span class="icon-shell">${icon('seal-check')}</span><h3>Padrão</h3><p>Como a equipe sabe que a entrega está correta.</p></article>
    </div>
  </div>`),
slide('slide-13', 'Slide 13: recapitulação e quiz', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 7</strong><span>·</span><span>Fechamento</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="final-badge">${icon('seal-check')} Badge: liderança com combinado</span>
      <h2 class="section-title">Recapitule e confirme sua decisão</h2>
    </header>
    <div class="final-panel">
      <ul class="recap-list reveal reveal-left delay-2">
        <li>${icon('user-check')}<span><strong>Responsabilidade clara</strong> Toda atividade crítica precisa ter dono.</span></li>
        <li>${icon('flow-arrow')}<span><strong>Delegação completa</strong> Resultado, prazo, limite e acompanhamento.</span></li>
        <li>${icon('chat-text')}<span><strong>Comunicação com rastro</strong> Combinado importante não vive só na conversa solta.</span></li>
      </ul>
      <div>
        <div class="quiz-options reveal reveal-scale delay-3" data-quiz>
          <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('warning')}</span><div><strong>A</strong><br><span>Confiar que todos vão lembrar dos combinados.</span></div></button>
          <button class="quiz-btn" type="button" data-answer="correct"><span class="icon-shell">${icon('check-circle')}</span><div><strong>B</strong><br><span>Definir dono, prazo, padrão e canal visível.</span></div></button>
          <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('clock')}</span><div><strong>C</strong><br><span>Deixar a liderança resolver tudo no fim do dia.</span></div></button>
        </div>
        <p class="quiz-feedback" aria-live="polite">Escolha uma alternativa.</p>
      </div>
    </div>
  </div>`)
];

const customScript = `
var learnerRuntime=(function(){
  var api=null, initialized=false, finished=false, key='scorm12:'+location.pathname;
  function findAPI(win){ var depth=0; while(win && depth<8){ if(win.API)return win.API; if(win.parent===win)break; win=win.parent; depth++; } try{ if(window.opener && window.opener.API)return window.opener.API; }catch(e){} return null; }
  function init(){ if(initialized)return; try{ api=findAPI(window); if(api){ api.LMSInitialize(''); var status=api.LMSGetValue('cmi.core.lesson_status')||''; if(status!=='completed') api.LMSSetValue('cmi.core.lesson_status','incomplete'); } initialized=true; }catch(e){ initialized=true; } }
  function get(name){ init(); try{ return api ? (api.LMSGetValue(name)||'') : ''; }catch(e){ return ''; } }
  function set(name,value){ init(); try{ if(api)api.LMSSetValue(name,String(value)); }catch(e){} }
  function commit(){ init(); try{ if(api)api.LMSCommit(''); }catch(e){} }
  function readLocal(){ try{ return JSON.parse(localStorage.getItem(key)||'{}'); }catch(e){ return {}; } }
  function writeLocal(data){ try{ localStorage.setItem(key,JSON.stringify(data)); }catch(e){} }
  function parseSuspend(raw){ try{ return raw ? JSON.parse(raw) : {}; }catch(e){ return {}; } }
  init();
  return {
    current:0,
    restore:function(){ var local=readLocal(); var rawLocation=get('cmi.core.lesson_location') || local.location || '1'; var locationIndex=Math.max(0,(parseInt(rawLocation,10)||1)-1); var suspendRaw=get('cmi.suspend_data') || local.suspendData || ''; return {locationIndex:locationIndex,suspend:parseSuspend(suspendRaw)}; },
    save:function(location,state){ var suspendData=JSON.stringify(state||{}); set('cmi.core.lesson_location',location); set('cmi.suspend_data',suspendData); writeLocal({location:String(location),suspendData:suspendData}); commit(); },
    complete:function(){ set('cmi.core.lesson_status','completed'); commit(); },
    score:function(raw){ set('cmi.core.score.min','0'); set('cmi.core.score.max','100'); set('cmi.core.score.raw',String(raw)); commit(); },
    finish:function(){ if(finished)return; commit(); try{ if(api)api.LMSFinish(''); }catch(e){} finished=true; }
  };
})();
function collectLearnerState(){ return {
  assign:(function(){ var out={}; [].forEach.call(document.querySelectorAll('.assign-item'),function(el){out[el.id]=el.dataset.bucket||'';}); return out; })(),
  delegate:[].map.call(document.querySelectorAll('.delegate-step'),function(el){return el.getAttribute('aria-pressed')==='true';}),
  channels:[].map.call(document.querySelectorAll('.channel-card'),function(el){return el.classList.contains('active');}),
  decisions:[].map.call(document.querySelectorAll('.decision-card'),function(el){return el.classList.contains('chosen');}),
  checklist:[].map.call(document.querySelectorAll('.standard-check'),function(el){return el.classList.contains('done');}),
  quizzes:[].map.call(document.querySelectorAll('[data-quiz] .quiz-btn'),function(el){return el.classList.contains('correct')?'correct':(el.classList.contains('wrong')?'wrong':'');})
}; }
function saveLearnerState(){ learnerRuntime.save(learnerRuntime.current+1,collectLearnerState()); }
function applyLearnerState(state){
  if(!state)return;
  if(state.assign){ [].forEach.call(document.querySelectorAll('.assign-item'),function(item){ var kind=state.assign[item.id]; if(kind){ var bucket=document.querySelector('.assign-bucket[data-kind="'+kind+'"] .assign-items'); if(bucket){ bucket.appendChild(item); item.dataset.bucket=kind; } } }); updateAssignStatus(); }
  if(state.delegate){ [].forEach.call(document.querySelectorAll('.delegate-step'),function(btn,i){ if(state.delegate[i])chooseDelegate(btn,false); }); }
  if(state.channels){ [].forEach.call(document.querySelectorAll('.channel-card'),function(btn,i){ if(state.channels[i])chooseChannel(btn,false); }); }
  if(state.decisions){ [].forEach.call(document.querySelectorAll('.decision-card'),function(btn,i){ if(state.decisions[i])chooseDecision(btn,false); }); }
  if(state.checklist){ [].forEach.call(document.querySelectorAll('.standard-check'),function(btn,i){ if(state.checklist[i]){ btn.classList.add('done'); btn.setAttribute('aria-checked','true'); } }); updateChecklistStatus(); }
  if(state.quizzes){ [].forEach.call(document.querySelectorAll('[data-quiz] .quiz-btn'),function(el,i){ el.setAttribute('aria-pressed','false'); if(state.quizzes[i]){ el.classList.add(state.quizzes[i]); el.setAttribute('aria-pressed','true'); } }); }
}
function resetLearnerState(){ document.querySelectorAll('.assign-item').forEach(function(item){ var pool=document.querySelector('.assign-pool .assign-items'); if(pool)pool.appendChild(item); item.dataset.bucket=''; item.classList.remove('selected'); }); document.querySelectorAll('.delegate-step,.channel-card,.decision-card').forEach(function(el){ el.classList.remove('active','chosen'); el.setAttribute('aria-pressed','false'); }); document.querySelectorAll('.standard-check').forEach(function(el){ el.classList.remove('done'); el.setAttribute('aria-checked','false'); }); document.querySelectorAll('.quiz-btn').forEach(function(el){ el.classList.remove('correct','wrong'); el.setAttribute('aria-pressed','false'); }); updateAssignStatus(); updateChecklistStatus(); updateQuizScore(false); }
function updateQuizScore(force){ var quizzes=[].slice.call(document.querySelectorAll('[data-quiz]')); if(!quizzes.length)return; var answered=0, correct=0; quizzes.forEach(function(quiz){ var selected=quiz.querySelector('.quiz-btn.correct,.quiz-btn.wrong'); if(selected){ answered++; if(selected.classList.contains('correct'))correct++; } }); if(answered || force){ learnerRuntime.score(Math.round(correct/quizzes.length*100)); } }
var selectedAssignItem=null;
function moveAssignItem(item,bucket){ bucket.querySelector('.assign-items').appendChild(item); item.dataset.bucket=bucket.dataset.kind; item.classList.remove('selected'); selectedAssignItem=null; updateAssignStatus(); saveLearnerState(); }
function updateAssignStatus(){ var items=[].slice.call(document.querySelectorAll('.assign-item')); var placed=items.filter(function(i){return !!i.dataset.bucket;}).length; var ok=items.filter(function(i){return i.dataset.bucket && i.dataset.bucket===i.dataset.answer;}).length; var status=document.querySelector('.assign-status'); if(!status)return; status.classList.remove('good','warn'); if(!placed)status.textContent='Classifique cada item no papel correto.'; else if(ok===items.length){ status.classList.add('good'); status.textContent='Correto: dono responde pelo resultado; apoio ajuda sem virar responsável invisível.'; } else { status.classList.add('warn'); status.textContent='Você acertou '+ok+' de '+items.length+'. Revise quem responde pelo resultado e quem apenas apoia.'; } }
function setupAssign(){ document.querySelectorAll('.assign-item').forEach(function(item){ item.setAttribute('draggable','true'); item.addEventListener('dragstart',function(e){ e.dataTransfer.setData('text/plain',item.id); }); item.addEventListener('click',function(){ if(selectedAssignItem)selectedAssignItem.classList.remove('selected'); selectedAssignItem=item; item.classList.add('selected'); }); item.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); item.click(); } }); }); document.querySelectorAll('.assign-bucket').forEach(function(bucket){ bucket.addEventListener('dragover',function(e){ e.preventDefault(); }); bucket.addEventListener('drop',function(e){ e.preventDefault(); var item=document.getElementById(e.dataTransfer.getData('text/plain')); if(item)moveAssignItem(item,bucket); }); bucket.addEventListener('click',function(){ if(selectedAssignItem)moveAssignItem(selectedAssignItem,bucket); }); bucket.addEventListener('keydown',function(e){ if((e.key==='Enter'||e.key===' ')&&selectedAssignItem){ e.preventDefault(); moveAssignItem(selectedAssignItem,bucket); } }); }); updateAssignStatus(); }
function chooseDelegate(btn,save){ document.querySelectorAll('.delegate-step').forEach(function(b){ b.setAttribute('aria-pressed','false'); }); btn.setAttribute('aria-pressed','true'); var panel=document.querySelector('.delegate-panel'); if(panel)panel.innerHTML='<h3>'+btn.dataset.title+'</h3><p>'+btn.dataset.copy+'</p>'; if(save!==false)saveLearnerState(); }
function setupDelegate(){ document.querySelectorAll('.delegate-step').forEach(function(btn){ btn.setAttribute('aria-pressed','false'); btn.addEventListener('click',function(){ chooseDelegate(btn,true); }); }); }
function chooseChannel(btn,save){ btn.classList.toggle('active'); btn.setAttribute('aria-pressed',String(btn.classList.contains('active'))); var status=document.querySelector('.channel-status'); if(status){ status.classList.remove('good','warn'); status.classList.add(btn.textContent.indexOf('Conversa')>=0?'warn':'good'); status.textContent=btn.dataset.feedback; } if(save!==false)saveLearnerState(); }
function setupChannels(){ document.querySelectorAll('.channel-card').forEach(function(btn){ btn.setAttribute('aria-pressed','false'); btn.addEventListener('click',function(){ chooseChannel(btn,true); }); }); }
function chooseDecision(btn,save){ document.querySelectorAll('.decision-card').forEach(function(b){ b.classList.remove('chosen'); b.setAttribute('aria-pressed','false'); }); btn.classList.add('chosen'); btn.setAttribute('aria-pressed','true'); var status=document.querySelector('.decision-status'); if(status){ status.classList.remove('good','warn'); status.classList.add(btn.dataset.kind==='good'?'good':'warn'); status.textContent=btn.dataset.feedback; } if(save!==false)saveLearnerState(); }
function setupDecisions(){ document.querySelectorAll('.decision-card').forEach(function(btn){ btn.setAttribute('aria-pressed','false'); btn.addEventListener('click',function(){ chooseDecision(btn,true); }); }); }
function updateChecklistStatus(){ var total=document.querySelectorAll('.standard-check').length; var done=document.querySelectorAll('.standard-check.done').length; var status=document.querySelector('.check-status'); if(status){ status.classList.toggle('good',done===total); status.textContent=done===total?'Combinados completos: a liderança deixa de depender da memória.':'Marque os itens que já existem: '+done+' de '+total+'.'; } }
function setupChecklist(){ document.querySelectorAll('.standard-check').forEach(function(btn){ btn.setAttribute('role','checkbox'); btn.setAttribute('aria-checked','false'); btn.addEventListener('click',function(){ btn.classList.toggle('done'); btn.setAttribute('aria-checked',String(btn.classList.contains('done'))); updateChecklistStatus(); saveLearnerState(); }); }); updateChecklistStatus(); }
function setupQuiz(){ document.querySelectorAll('[data-quiz] .quiz-btn').forEach(function(btn){ btn.setAttribute('aria-pressed','false'); btn.addEventListener('click',function(){ var root=btn.closest('[data-quiz]'); root.querySelectorAll('.quiz-btn').forEach(function(b){ b.classList.remove('correct','wrong'); b.setAttribute('aria-pressed','false'); }); var ok=btn.dataset.answer==='correct'; btn.classList.add(ok?'correct':'wrong'); btn.setAttribute('aria-pressed','true'); document.querySelector('.quiz-feedback').textContent=ok?'Correto. Liderança clara define dono, prazo, padrão e canal visível.':'Ainda não. Sem combinado visível, a equipe depende de memória e improviso.'; updateQuizScore(false); saveLearnerState(); }); }); }
(function(){
  var slides=[].slice.call(document.querySelectorAll('.slide'));
  var dots=document.getElementById('dots'), progress=document.getElementById('progress'), count=document.getElementById('count'), previous=document.getElementById('previous'), next=document.getElementById('next'), current=0;
  slides.forEach(function(slide,index){ var dot=document.createElement('button'); dot.type='button'; dot.className='dot'; dot.setAttribute('aria-label','Ir para slide '+(index+1)+' de '+slides.length); dot.addEventListener('click',function(){showSlide(index,true)}); dots.appendChild(dot); });
  function playSlideEntrance(slide){ slide.classList.remove('entered'); void slide.offsetWidth; slide.classList.add('entered'); }
  function showSlide(index,moveFocus){ if(index<0||index>=slides.length)return; slides.forEach(function(slide,i){ var active=i===index; slide.classList.toggle('active',active); slide.setAttribute('aria-hidden',String(!active)); slide.inert=!active; }); current=index; learnerRuntime.current=current; [].forEach.call(dots.children,function(dot,i){ if(i===index)dot.setAttribute('aria-current','step'); else dot.removeAttribute('aria-current'); }); progress.style.width=((index+1)/slides.length*100)+'%'; progress.setAttribute('aria-valuenow',String(index+1)); count.textContent=(index+1)+' / '+slides.length; previous.disabled=index===0; next.disabled=index===slides.length-1; playSlideEntrance(slides[index]); saveLearnerState(); if(index===slides.length-1){ updateQuizScore(true); learnerRuntime.complete(); } if(moveFocus)slides[index].focus(); }
  previous.addEventListener('click',function(){showSlide(current-1,true)}); next.addEventListener('click',function(){showSlide(current+1,true)});
  var start=document.querySelector('[data-next]'); if(start) start.addEventListener('click',function(){showSlide(1,true)});
  document.addEventListener('keydown',function(event){ if(event.target.closest('button,[role=button],[role=checkbox]'))return; if(event.key==='ArrowRight'||event.key==='ArrowDown')showSlide(current+1,true); if(event.key==='ArrowLeft'||event.key==='ArrowUp')showSlide(current-1,true); });
  setupAssign(); setupDelegate(); setupChannels(); setupDecisions(); setupChecklist(); setupQuiz();
  var restored=learnerRuntime.restore();
  applyLearnerState(restored.suspend);
  function beginAt(index){ showSlide(Math.min(index,slides.length-1),false); }
  var hasProgress=restored.locationIndex>0 || Object.keys(restored.suspend||{}).length>0;
  var modal=document.getElementById('resume-modal');
  if(hasProgress && modal){
    modal.hidden=false;
    var continueBtn=document.getElementById('resume-continue');
    var restartBtn=document.getElementById('resume-restart');
    continueBtn.focus();
    continueBtn.addEventListener('click',function(){ modal.hidden=true; beginAt(restored.locationIndex); });
    restartBtn.addEventListener('click',function(){ modal.hidden=true; resetLearnerState(); learnerRuntime.save(1,{}); beginAt(0); });
    modal.addEventListener('keydown',function(event){ if(event.key==='Escape'){ restartBtn.click(); } if(event.key==='Tab'){ var first=continueBtn,last=restartBtn; if(event.shiftKey && document.activeElement===first){ event.preventDefault(); last.focus(); } else if(!event.shiftKey && document.activeElement===last){ event.preventDefault(); first.focus(); } } });
  } else beginAt(restored.locationIndex);
})();
window.addEventListener('beforeunload',function(){ saveLearnerState(); learnerRuntime.finish(); });
`;

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Capítulo 7 | Pessoas, responsabilidades e liderança enxuta</title>
<link rel="icon" href="data:,">
<style>
${baseStyle}
${customStyle}
</style>
</head>
<body>
<a class="skip-link" href="#slide-1">Ir para o conteúdo</a>
<div class="progress" id="progress" role="progressbar" aria-label="Progresso dos slides" aria-valuemin="1" aria-valuemax="${slides.length}" aria-valuenow="1"></div>
<main class="stage" id="slide-1">
${slides.join('\n')}
</main>
<div class="resume-modal" id="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-title" hidden>
  <div class="resume-dialog">
    <h2 id="resume-title">Retomar capítulo?</h2>
    <p>Há progresso salvo neste módulo. Você pode continuar de onde parou ou recomeçar do início.</p>
    <div class="resume-actions">
      <button class="button" type="button" id="resume-continue">${icon('arrow-right')} Continuar de onde parei</button>
      <button class="button secondary" type="button" id="resume-restart">Recomeçar do início</button>
    </div>
  </div>
</div>
<nav class="nav" aria-label="Navegação dos slides">
  <button class="nav-button" id="previous" type="button" aria-label="Slide anterior" disabled>${icon('arrow-left')}</button>
  <div class="dots" id="dots" aria-label="Selecionar slide"></div>
  <span class="count" id="count" aria-live="polite">1 / ${slides.length}</span>
  <button class="nav-button" id="next" type="button" aria-label="Próximo slide">${icon('arrow-right')}</button>
</nav>
<script>
${customScript}
</script>
</body>
</html>`;

setupAssets();
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(JSON.stringify({ htmlPath, slides: slides.length }, null, 2));
