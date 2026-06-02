const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const slug = 'fundamentos-administracao-pequenos-negocios';
const runId = '2026-06-01-apostila';
const outDir = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-05');
const imagesDir = path.join(outDir, 'images');
const iconsDir = path.join(outDir, 'icons');
const fontsDir = path.join(outDir, 'fonts');
const htmlPath = path.join(outDir, 'slide.html');
const baseHtmlPath = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-04', 'slide.html');

const heroImage = path.join(root, 'assets', 'images', slug, 'capitulo-05-pacotes-valor-sem-texto-lucid-origin-leonardo-b7946cee.jpg');
const deskImage = path.join(root, 'assets', 'images', slug, 'capitulo-05-preco-margem-hero-objetos-limpos-lucid-realism-leonardo-88cb8223.jpg');

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
  copyFile(heroImage, path.join(imagesDir, 'capitulo-05-pacotes-valor.jpg'));
  copyFile(deskImage, path.join(imagesDir, 'capitulo-05-mesa-preco.jpg'));
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
let baseScript = extractBetween(baseHtml, '<script>', '</script>')
  .replace(
    'Correto. Controle financeiro bom mostra data, categoria, entrada, saída e previsão.',
    'Correto. Promoção saudável mantém margem positiva e tem limite claro.'
  )
  .replace(
    'Ainda não. Controle financeiro precisa mostrar dinheiro que entra, sai e vence nos próximos dias.',
    'Ainda não. Desconto sem cálculo pode aumentar movimento e reduzir resultado.'
  );

baseScript = baseScript.replace(
  /function collectLearnerState\(\)\{ return \{[\s\S]*?\}; \}/,
  `function collectLearnerState(){ return {
  checks:[].map.call(document.querySelectorAll('.ms-item'),function(el){return el.classList.contains('done');}),
  flips:[].map.call(document.querySelectorAll('.flip-card'),function(el){return el.classList.contains('flipped');}),
  accordions:[].map.call(document.querySelectorAll('.accord-btn'),function(el){return el.getAttribute('aria-expanded')==='true';}),
  quizzes:[].map.call(document.querySelectorAll('[data-quiz] .quiz-btn'),function(el){return el.classList.contains('correct')?'correct':(el.classList.contains('wrong')?'wrong':'');}),
  hotspots:[].map.call(document.querySelectorAll('.price-layer'),function(el){return el.getAttribute('aria-pressed')==='true';}),
  sort:(function(){ var out={}; [].forEach.call(document.querySelectorAll('.sort-item'),function(el){out[el.id]=el.dataset.bucket||'';}); return out; })(),
  decisions:[].map.call(document.querySelectorAll('.decision-card'),function(el){return el.classList.contains('chosen');}),
  calc:{price:document.querySelector('#calc-price')?document.querySelector('#calc-price').value:'',cost:document.querySelector('#calc-cost')?document.querySelector('#calc-cost').value:'',expense:document.querySelector('#calc-expense')?document.querySelector('#calc-expense').value:''}
}; }`
);

baseScript = baseScript.replace(
  'applyLearnerState(learnerRuntime.restore().suspend); setupDots();',
  'var restoredState=learnerRuntime.restore().suspend; applyLearnerState(restoredState); applyCustomState(restoredState); setupDots();'
);

const customStyle = `
.chapter-map{display:grid;grid-template-columns:.9fr 1.1fr;gap:1.4rem;align-items:stretch}
.map-rail{display:grid;gap:.75rem}
.map-node{display:grid;grid-template-columns:auto 1fr;gap:.75rem;align-items:center;padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius);background:#fff}
.map-node strong{font-family:var(--title);font-size:1rem}
.map-node span{color:var(--neutral-500);font-size:.82rem}
.quote-panel{min-height:100%;padding:1.6rem;border-radius:var(--radius-lg);background:linear-gradient(135deg,var(--primary-900),var(--primary-700));color:#fff;display:flex;flex-direction:column;justify-content:space-between}
.quote-panel p{color:rgba(255,255,255,.78)}
.anatomy{display:grid;grid-template-columns:1fr 1fr;gap:1.1rem;align-items:stretch}
.price-stack{position:relative;display:grid;align-content:center;gap:.7rem;padding:1.2rem;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--neutral-200);box-shadow:var(--shadow)}
.price-layer{position:relative;width:100%;padding:1rem 1rem 1rem 3.1rem;border-radius:14px;background:var(--neutral-50);border:1px solid var(--neutral-200);text-align:left;cursor:pointer;color:var(--neutral-900)}
.price-layer:hover,.price-layer.active{border-color:var(--primary-600);box-shadow:0 0 0 3px var(--primary-100);background:#fff}
.price-layer b{display:block;font-family:var(--title)}
.hotspot-index{position:absolute;left:.82rem;top:50%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;border:2px solid var(--primary-600);background:#fff;color:var(--primary-700);font-weight:900}
.price-layer.active .hotspot-index{background:var(--primary-700);color:#fff}
.hotspot-panel{padding:1.2rem;border-radius:var(--radius-lg);background:var(--primary-50);border:1px solid rgba(29,138,156,.28)}
.hotspot-panel h3{font-family:var(--title);font-size:1.28rem}
.hotspot-panel p{margin-top:.55rem;color:var(--neutral-600)}
.compare-table{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1.2rem}
.compare-box{padding:1.15rem;border-radius:var(--radius-lg);border:1px solid var(--neutral-200);background:#fff}
.compare-box.bad{border-color:rgba(217,83,79,.38);background:#fff7f6}
.compare-box.good{border-color:rgba(77,184,122,.38);background:#effaf4}
.sort-board{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.sort-pool,.bucket{min-height:160px;padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;color:var(--neutral-900)}
.sort-pool h3,.bucket h3{font-family:var(--title);font-size:1rem;margin-bottom:.75rem}
.sort-items{display:grid;gap:.55rem}
.sort-item{display:block;width:100%;padding:.72rem .82rem;border:1px solid var(--neutral-200);border-radius:12px;background:var(--neutral-50);cursor:grab;text-align:left;font-weight:700;color:var(--neutral-700)}
.sort-item.selected{outline:3px solid var(--primary-200);border-color:var(--primary-600)}
.bucket{background:var(--primary-50)}
.bucket[data-kind="despesa"]{background:#fff7f6}
.sort-status{min-height:44px;margin-top:.7rem;padding:.72rem .9rem;border-radius:var(--radius);background:rgba(255,255,255,.92);color:var(--neutral-900);font-size:.88rem;font-weight:800}
.sort-status.good{background:#effaf4;color:#1e6b43}
.sort-status.warn{background:#fff7e8;color:#744e00}
.sort-status.bad{background:#fdf1f0;color:#7d302f}
.calc-box{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;align-items:stretch}
.calc-controls{display:grid;gap:.75rem;padding:1.2rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff}
.calc-controls label{display:grid;gap:.32rem;font-weight:800;color:var(--neutral-700)}
.calc-controls input{width:100%;padding:.78rem;border:1px solid var(--neutral-200);border-radius:10px;font:inherit}
.calc-result{display:grid;align-content:center;gap:.75rem;padding:1.4rem;border-radius:var(--radius-lg);background:var(--primary-900);color:#fff}
.calc-number{font-family:var(--title);font-size:clamp(2.5rem,7vw,5rem);line-height:.95;font-weight:900;color:#fff}
.calc-result p{color:rgba(255,255,255,.78)}
.decision-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.decision-card{padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;text-align:left;cursor:pointer}
.decision-card h3{font-family:var(--title);font-size:1rem}
.decision-card p{margin-top:.45rem;color:var(--neutral-500);font-size:.84rem}
.decision-card.chosen{border-color:var(--primary-600);box-shadow:0 0 0 3px var(--primary-100)}
.decision-feedback{min-height:58px;margin-top:1rem;padding:1rem;border-radius:var(--radius);background:var(--neutral-100);color:var(--neutral-700)}
.package-visual{display:grid;grid-template-columns:1.1fr .9fr;gap:1.4rem;align-items:center}
.package-visual figure{overflow:hidden;border-radius:var(--radius-lg);border:1px solid var(--neutral-200);box-shadow:var(--shadow);background:#fff}
.package-visual img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block}
.audit-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem}
.audit-row{padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius);background:#fff}
.audit-row strong{display:block;font-family:var(--title);margin-bottom:.3rem}
.final-badge{display:inline-flex;align-items:center;gap:.55rem;margin:.9rem 0;padding:.55rem .8rem;border-radius:999px;background:var(--primary-700);color:#fff;font-weight:900}
.final-panel{display:grid;grid-template-columns:.82fr 1.18fr;gap:1rem;align-items:start}
.recap-list{display:grid;gap:.55rem;padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff}
.recap-list li{display:grid;grid-template-columns:auto 1fr;gap:.55rem;align-items:start;color:var(--neutral-600);font-size:.88rem}
.recap-list strong{display:block;color:var(--neutral-900);font-family:var(--title)}
@media (max-width:900px){
  .chapter-map,.anatomy,.sort-board,.calc-box,.package-visual,.compare-table,.audit-grid,.final-panel{grid-template-columns:1fr}
  .decision-grid{grid-template-columns:1fr}
  .price-stack,.sort-pool,.bucket{min-height:auto}
  .calc-result{min-height:180px}
  .recap-list{padding:.8rem}
  .recap-list li{font-size:.8rem;line-height:1.35}
}
@media (max-height:680px) and (min-width:901px){
  .sort-board{gap:.65rem}
  .sort-pool,.bucket{min-height:118px;padding:.7rem}
  .sort-pool h3,.bucket h3{margin-bottom:.45rem}
  .sort-items{gap:.38rem}
  .sort-item{padding:.5rem .62rem;font-size:.82rem}
  .sort-status{margin-top:.35rem}
  .final-panel{gap:.75rem}
  .recap-list{padding:.8rem;gap:.4rem}
  .recap-list li{font-size:.78rem;line-height:1.28}
  .final-panel .quiz-options{gap:.5rem;margin-top:0}
  .final-panel .quiz-btn{padding:.72rem}
}
@media (min-width:700px) and (max-width:900px) and (max-height:700px){
  .slide{padding-top:1.1rem;padding-bottom:7.2rem}
  .section-title{font-size:clamp(1.55rem,4.1vw,2.15rem);line-height:1.05}
  .lead{font-size:.86rem;line-height:1.42}
  .sort-board{grid-template-columns:1fr 1fr;gap:.75rem}
  .sort-pool,.bucket{min-height:104px;padding:.7rem}
  .sort-pool h3,.bucket h3{margin-bottom:.4rem;font-size:.9rem}
  .sort-items{gap:.34rem}
  .sort-item{padding:.48rem .6rem;font-size:.8rem}
  .sort-status{margin-top:.35rem;font-size:.76rem}
  .final-panel{grid-template-columns:.78fr 1.22fr;gap:.75rem}
  .summary-header{margin-bottom:.85rem}
  .final-badge{margin:.25rem 0 .55rem}
  .recap-list{padding:.75rem;gap:.38rem}
  .recap-list li{font-size:.76rem;line-height:1.25}
  .final-panel .quiz-options{gap:.45rem;margin-top:0}
  .final-panel .quiz-btn{padding:.62rem;min-height:auto}
  .final-panel .quiz-btn span{font-size:.75rem}
  .quiz-feedback{min-height:28px;margin-top:.45rem;font-size:.78rem}
}
`;

const customScript = `
function applyCustomState(state){
  if(!state)return;
  if(state.hotspots){ [].forEach.call(document.querySelectorAll('.price-layer'),function(btn,i){ if(state.hotspots[i]) btn.click(); }); }
  if(state.sort){ [].forEach.call(document.querySelectorAll('.sort-item'),function(item){ var kind=state.sort[item.id]; if(kind){ var bucket=document.querySelector('.bucket[data-kind="'+kind+'"] .sort-items'); if(bucket){ bucket.appendChild(item); item.dataset.bucket=kind; } } }); updateSortStatus(); }
  if(state.decisions){ [].forEach.call(document.querySelectorAll('.decision-card'),function(card,i){ if(state.decisions[i]) chooseDecision(card,false); }); }
  if(state.calc){ var p=document.querySelector('#calc-price'), c=document.querySelector('#calc-cost'), e=document.querySelector('#calc-expense'); if(p&&state.calc.price)p.value=state.calc.price; if(c&&state.calc.cost)c.value=state.calc.cost; if(e&&state.calc.expense)e.value=state.calc.expense; updateCalc(false); }
}
function setupHotspots(){
  var panel=document.querySelector('.hotspot-panel');
  if(!panel)return;
  var copy={
    custo:['Custo direto','É o gasto ligado ao produto ou serviço vendido. Se você ignora esse valor, a venda parece boa enquanto consome margem.'],
    despesa:['Despesa fixa','Mantém a empresa funcionando: aluguel, energia, internet, contador, sistemas e estrutura. Ela precisa entrar na lógica do preço.'],
    margem:['Margem de contribuição','É a sobra inicial da venda depois dos custos diretos. Essa sobra ajuda a pagar despesas fixas e formar lucro.'],
    desconto:['Desconto','Só deve entrar depois da margem mínima. Se o desconto passa do limite, a promoção trabalha contra o negócio.']
  };
  document.querySelectorAll('.price-layer').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.price-layer').forEach(function(b){ b.setAttribute('aria-pressed','false'); b.classList.remove('active'); });
      btn.setAttribute('aria-pressed','true');
      btn.classList.add('active');
      var data=copy[btn.dataset.hotspot];
      panel.innerHTML='<h3>'+data[0]+'</h3><p>'+data[1]+'</p>';
      saveLearnerState();
    });
  });
}
var selectedSortItem=null;
function moveSortItem(item, bucket){
  bucket.querySelector('.sort-items').appendChild(item);
  item.dataset.bucket=bucket.dataset.kind;
  item.classList.remove('selected');
  selectedSortItem=null;
  updateSortStatus();
  saveLearnerState();
}
function updateSortStatus(){
  var total=document.querySelectorAll('.sort-item').length;
  var placed=[].filter.call(document.querySelectorAll('.sort-item'),function(i){return !!i.dataset.bucket;}).length;
  var ok=[].filter.call(document.querySelectorAll('.sort-item'),function(i){return i.dataset.bucket && i.dataset.bucket===i.dataset.answer;}).length;
  var status=document.querySelector('.sort-status');
  if(status){
    status.classList.remove('good','warn','bad');
    if(placed===0){
      status.textContent='Selecione ou arraste cada item para a coluna correta.';
    } else if(ok===total){
      status.classList.add('good');
      status.textContent='Perfeito: todos os itens foram classificados corretamente.';
    } else if(ok>0){
      status.classList.add('warn');
      status.textContent='Você acertou '+ok+' de '+total+'. Revise os itens restantes antes de avançar.';
    } else {
      status.classList.add('bad');
      status.textContent='Ainda não. Compare se o gasto nasce em cada venda ou se mantém a empresa funcionando.';
    }
  }
}
function setupSorter(){
  document.querySelectorAll('.sort-item').forEach(function(item){
    item.setAttribute('draggable','true');
    item.addEventListener('dragstart',function(e){ e.dataTransfer.setData('text/plain',item.id); });
    item.addEventListener('click',function(){ if(selectedSortItem)selectedSortItem.classList.remove('selected'); selectedSortItem=item; item.classList.add('selected'); });
    item.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); item.click(); } });
  });
  document.querySelectorAll('.bucket').forEach(function(bucket){
    bucket.addEventListener('dragover',function(e){ e.preventDefault(); });
    bucket.addEventListener('drop',function(e){ e.preventDefault(); var id=e.dataTransfer.getData('text/plain'); var item=document.getElementById(id); if(item)moveSortItem(item,bucket); });
    bucket.addEventListener('click',function(){ if(selectedSortItem)moveSortItem(selectedSortItem,bucket); });
    bucket.addEventListener('keydown',function(e){ if((e.key==='Enter'||e.key===' ')&&selectedSortItem){ e.preventDefault(); moveSortItem(selectedSortItem,bucket); } });
  });
  updateSortStatus();
}
function updateCalc(save){
  var p=Number(document.querySelector('#calc-price')&&document.querySelector('#calc-price').value || 0);
  var c=Number(document.querySelector('#calc-cost')&&document.querySelector('#calc-cost').value || 0);
  var e=Number(document.querySelector('#calc-expense')&&document.querySelector('#calc-expense').value || 0);
  var contribution=p-c;
  var afterExpense=contribution-e;
  var pct=p>0?Math.round(contribution/p*100):0;
  var n=document.querySelector('.calc-number'), msg=document.querySelector('.calc-message'), detail=document.querySelector('.calc-detail');
  if(n)n.textContent=pct+'%';
  if(detail)detail.textContent='Sobra inicial: R$ '+contribution.toFixed(2).replace('.',',')+' | Após despesa estimada: R$ '+afterExpense.toFixed(2).replace('.',',');
  if(msg)msg.textContent=afterExpense>0?'Este cenário ainda contribui para o resultado.':'Atenção: este cenário pode não cobrir a despesa estimada.';
  if(save)saveLearnerState();
}
function setupCalc(){
  document.querySelectorAll('.calc-controls input').forEach(function(input){ input.addEventListener('input',function(){ updateCalc(true); }); });
  updateCalc(false);
}
function chooseDecision(card, save){
  document.querySelectorAll('.decision-card').forEach(function(c){ c.classList.remove('chosen'); c.setAttribute('aria-pressed','false'); });
  card.classList.add('chosen'); card.setAttribute('aria-pressed','true');
  var fb=document.querySelector('.decision-feedback');
  if(fb) fb.textContent=card.dataset.feedback;
  if(save!==false)saveLearnerState();
}
function setupDecision(){
  document.querySelectorAll('.decision-card').forEach(function(card){
    card.setAttribute('aria-pressed','false');
    card.addEventListener('click',function(){ chooseDecision(card,true); });
  });
}
setupHotspots();
setupSorter();
setupCalc();
setupDecision();
`;

const slides = [
slide('slide-1', 'Slide 1: abertura e objetivos', 'cover active', `
  <div class="inner">
    <div class="cover-copy">
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Finanças comerciais</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Preço, margem e decisão de venda</p>
      <h1 class="title reveal reveal-up delay-2">Preço não é chute: é <span class="highlight">decisão de sobrevivência</span></h1>
      <p class="lead reveal reveal-up delay-3">Você vai aprender a ligar custo, despesa, margem e desconto para vender com mais clareza e menos risco.</p>
      <ul class="objective-list reveal reveal-up delay-3" aria-label="Objetivos de aprendizagem">
        <li>Aplicar uma lógica básica de formação de preço.</li>
        <li>Calcular margem de contribuição de forma simples.</li>
        <li>Decidir promoções e pacotes sem destruir resultado.</li>
      </ul>
      <button class="button reveal reveal-up delay-4" type="button" data-next>${icon('arrow-right')} Iniciar capítulo</button>
    </div>
    <aside class="hero-panel reveal reveal-scale delay-2">
      <figure><img src="images/capitulo-05-pacotes-valor.jpg" alt="Três caixas sem rótulos em tamanhos diferentes, representando opções de valor e pacotes de venda."></figure>
      <div class="metadata">
        <div class="meta-row"><span class="icon-shell">${icon('target')}</span><div><strong>Objetivo</strong><span>Decidir preço com base em custo, despesa e margem.</span></div></div>
        <div class="meta-row"><span class="icon-shell">${icon('clock')}</span><div><strong>Tempo sugerido</strong><span>45 minutos com simulação.</span></div></div>
      </div>
    </aside>
  </div>`),
slide('slide-2', 'Slide 2: mapa do capítulo', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Roteiro</span></p>
    <div class="chapter-map">
      <aside class="quote-panel reveal reveal-left delay-1">
        <div><p class="eyebrow">Ideia do capítulo</p><h2 class="section-title" style="color:#fff">Você não precisa de uma fórmula perfeita para parar de vender no escuro.</h2></div>
        <p>Você precisa de uma conta simples, revisada com frequência e conectada ao que o cliente percebe como valor.</p>
      </aside>
      <div class="map-rail stagger-children delay-2">
        <article class="map-node"><span class="icon-shell">${icon('money')}</span><div><strong>1. Custo</strong><span>O que está ligado diretamente à entrega.</span></div></article>
        <article class="map-node"><span class="icon-shell">${icon('briefcase')}</span><div><strong>2. Despesa</strong><span>O que mantém a empresa funcionando.</span></div></article>
        <article class="map-node"><span class="icon-shell">${icon('chart-bar')}</span><div><strong>3. Margem</strong><span>Quanto sobra para sustentar o negócio.</span></div></article>
        <article class="map-node"><span class="icon-shell">${icon('target')}</span><div><strong>4. Decisão</strong><span>Preço, desconto, pacote ou reajuste.</span></div></article>
      </div>
    </div>
  </div>`),
slide('slide-3', 'Slide 3: conceito central', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-05-mesa-preco.jpg" alt="Mesa com blocos coloridos, caderno e objetos de trabalho representando os componentes de preço.">
      <figcaption>Preço precisa cobrir a entrega de hoje e manter o negócio vivo amanhã.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Ideia central</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Preço começa no custo</p>
      <h2 class="section-title reveal reveal-up delay-2">Venda boa é aquela que <span class="highlight">contribui para o resultado</span></h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('check-circle')}</span><div><h3>Custo direto</h3><p>Ingrediente, peça, embalagem, comissão, entrega ou hora diretamente ligada ao produto ou serviço.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('briefcase')}</span><div><h3>Despesa fixa</h3><p>Estrutura que precisa ser paga mesmo quando a venda muda de um dia para outro.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('chart-bar')}</span><div><h3>Margem</h3><p>Sobra inicial que ajuda a pagar despesas fixas e formar lucro.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-4', 'Slide 4: anatomia interativa do preço', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Interativo</span></p>
    <header style="margin-bottom:1.1rem">
      <p class="eyebrow reveal reveal-up delay-1">Clique nos pontos</p>
      <h2 class="section-title reveal reveal-up delay-2">Veja a anatomia de uma <span class="highlight">decisão de preço</span></h2>
    </header>
    <div class="anatomy reveal reveal-scale delay-3">
      <div class="price-stack" aria-label="Camadas da formação de preço">
        <button class="price-layer" type="button" data-hotspot="custo" aria-pressed="false"><span class="hotspot-index">1</span><b>Custo direto</b><span>O que a venda consome para existir.</span></button>
        <button class="price-layer" type="button" data-hotspot="despesa" aria-pressed="false"><span class="hotspot-index">2</span><b>Despesa fixa</b><span>O que mantém a empresa funcionando.</span></button>
        <button class="price-layer" type="button" data-hotspot="margem" aria-pressed="false"><span class="hotspot-index">3</span><b>Margem</b><span>O que sobra para sustentar o resultado.</span></button>
        <button class="price-layer" type="button" data-hotspot="desconto" aria-pressed="false"><span class="hotspot-index">4</span><b>Desconto</b><span>O que só entra depois do limite definido.</span></button>
      </div>
      <aside class="hotspot-panel" aria-live="polite"><h3>Comece pelo ponto 1</h3><p>Clique em cada camada para entender o papel dela na decisão de preço.</p></aside>
    </div>
  </div>`),
slide('slide-5', 'Slide 5: promoção com limite', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Promoção</span></p>
    <header style="max-width:800px">
      <p class="eyebrow reveal reveal-up delay-1">Movimento não é resultado</p>
      <h2 class="section-title reveal reveal-up delay-2">Promoção boa tem <span class="highlight">prazo, objetivo e produto escolhido</span></h2>
    </header>
    <div class="compare-table stagger-children delay-3">
      <article class="compare-box bad"><span class="icon-shell">${icon('warning')}</span><h3>Sem limite</h3><p>Desconto igual para tudo, sem conferir custo e sem saber se a margem continua positiva.</p></article>
      <article class="compare-box good"><span class="icon-shell">${icon('check-circle')}</span><h3>Com regra</h3><p>Desconto com valor mínimo, prazo definido e contrapartida, como pagamento à vista ou maior quantidade.</p></article>
    </div>
    <div class="callout reveal reveal-up delay-4" style="margin-top:1.1rem">${icon('lightbulb')} <p><strong>Use assim:</strong> antes de baixar preço, defina o menor valor aceitável e o motivo da promoção.</p></div>
  </div>`),
slide('slide-6', 'Slide 6: atividade de arrastar', 'dark', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Arrastar ou clicar</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Classifique os gastos</p>
      <h2 class="section-title reveal reveal-up delay-2">Separe <span class="highlight">custo direto</span> de <span class="highlight">despesa fixa</span></h2>
      <p class="lead reveal reveal-up delay-3">Você pode arrastar com o mouse ou selecionar um item e depois escolher a coluna pelo teclado/clique.</p>
    </header>
    <div class="sort-board reveal reveal-scale delay-3">
      <div class="sort-pool"><h3>Itens para classificar</h3><div class="sort-items">
        <button class="sort-item" id="sort-1" type="button" data-answer="custo">Embalagem da venda</button>
        <button class="sort-item" id="sort-2" type="button" data-answer="despesa">Internet mensal</button>
        <button class="sort-item" id="sort-3" type="button" data-answer="custo">Ingrediente do produto</button>
        <button class="sort-item" id="sort-4" type="button" data-answer="despesa">Sistema de gestão</button>
      </div></div>
      <div style="display:grid;gap:1rem">
        <div class="bucket" role="button" tabindex="0" data-kind="custo" aria-label="Coluna custo direto"><h3>Custo direto</h3><div class="sort-items"></div></div>
        <div class="bucket" role="button" tabindex="0" data-kind="despesa" aria-label="Coluna despesa fixa"><h3>Despesa fixa</h3><div class="sort-items"></div></div>
      </div>
    </div>
    <p class="sort-status" aria-live="polite">Selecione ou arraste cada item para a coluna correta.</p>
  </div>`),
slide('slide-7', 'Slide 7: simulador de margem', 'tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Simulador</span></p>
    <header style="max-width:820px;margin-bottom:1.1rem">
      <p class="eyebrow reveal reveal-up delay-1">Teste números simples</p>
      <h2 class="section-title reveal reveal-up delay-2">Calcule a sobra inicial antes de aceitar <span class="highlight">um desconto</span></h2>
    </header>
    <div class="calc-box reveal reveal-scale delay-3">
      <form class="calc-controls" aria-label="Simulador simples de margem">
        <label>Preço de venda <input id="calc-price" type="number" min="0" step="1" value="40"></label>
        <label>Custo direto <input id="calc-cost" type="number" min="0" step="1" value="22"></label>
        <label>Despesa estimada por venda <input id="calc-expense" type="number" min="0" step="1" value="8"></label>
      </form>
      <aside class="calc-result" aria-live="polite">
        <p class="eyebrow" style="color:rgba(255,255,255,.78)">Margem de contribuição aproximada</p>
        <div class="calc-number">45%</div>
        <strong class="calc-message">Este cenário ainda contribui para o resultado.</strong>
        <p class="calc-detail">Sobra inicial: R$ 18,00 | Após despesa estimada: R$ 10,00</p>
      </aside>
    </div>
  </div>`),
slide('slide-8', 'Slide 8: estudo de caso', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Estudo de caso</span></p>
    <header style="max-width:820px;margin-bottom:1.2rem">
      <p class="eyebrow reveal reveal-up delay-1">Marmitaria Bom Prato</p>
      <h2 class="section-title reveal reveal-up delay-2">A promoção vendia muito, mas <span class="highlight">o caixa não melhorava</span></h2>
    </header>
    <div class="grid-4 stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('storefront')}</span><h3>Contexto</h3><p>A marmitaria tinha alto volume na promoção semanal.</p></article>
      <article class="card"><span class="icon-shell">${icon('warning')}</span><h3>Problema</h3><p>O custo dos ingredientes subiu e o desconto continuou igual.</p></article>
      <article class="card"><span class="icon-shell">${icon('gear')}</span><h3>Ação</h3><p>A dona recalculou margem por prato e criou combos com bebida e entrega programada.</p></article>
      <article class="card"><span class="icon-shell">${icon('check-circle')}</span><h3>Resultado</h3><p>O volume caiu um pouco, mas a margem por pedido aumentou.</p></article>
    </div>
  </div>`),
slide('slide-9', 'Slide 9: decisão guiada', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Decisão</span></p>
    <header style="margin-bottom:1.1rem">
      <p class="eyebrow reveal reveal-up delay-1">O que você faria?</p>
      <h2 class="section-title reveal reveal-up delay-2">O fornecedor subiu o custo e o cliente pede desconto</h2>
    </header>
    <div class="decision-grid reveal reveal-scale delay-3">
      <button class="decision-card" type="button" data-feedback="Risco alto: você pode vender mais e ganhar menos. Antes de dar desconto, confira a margem mínima."><h3>Dar o mesmo desconto</h3><p>Mantém o movimento, mas ignora o novo custo.</p></button>
      <button class="decision-card" type="button" data-feedback="Boa decisão: recalcular margem mostra se o preço atual ainda sustenta o negócio."><h3>Recalcular a margem</h3><p>Confere custo direto, despesa estimada e limite de desconto.</p></button>
      <button class="decision-card" type="button" data-feedback="Pode funcionar, mas só depois de entender margem e comunicar valor percebido."><h3>Subir preço sem explicar</h3><p>Aumenta receita por venda, mas pode reduzir confiança.</p></button>
    </div>
    <p class="decision-feedback" aria-live="polite">Escolha uma ação para ver o feedback.</p>
  </div>`),
slide('slide-10', 'Slide 10: pacotes de valor', 'concept', `
  <div class="inner package-visual">
    <figure class="reveal reveal-left delay-1">
      <img src="images/capitulo-05-pacotes-valor.jpg" alt="Três caixas sem rótulo representando pacotes de venda com tamanhos diferentes.">
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Pacotes</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Venda valor, não só preço</p>
      <h2 class="section-title reveal reveal-up delay-2">Três pacotes ajudam o cliente a <span class="highlight">comparar escolhas</span></h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('notebook')}</span><div><h3>Básico</h3><p>Entrega essencial, com escopo claro e preço de entrada.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('briefcase')}</span><div><h3>Completo</h3><p>Melhor equilíbrio entre valor percebido, prazo e margem.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('target')}</span><div><h3>Premium</h3><p>Inclui conveniência, prioridade ou extras que justificam preço maior.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-11', 'Slide 11: critérios de decisão', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Critérios mínimos</span></p>
    <header style="max-width:820px;margin-bottom:1.2rem">
      <p class="eyebrow reveal reveal-up delay-1">Use antes de decidir</p>
      <h2 class="section-title reveal reveal-up delay-2">Quatro perguntas evitam uma venda <span class="highlight">mal calculada</span></h2>
    </header>
    <div class="audit-grid stagger-children delay-3">
      <article class="audit-row"><strong>Dar desconto</strong><p>A margem continua positiva depois do desconto?</p></article>
      <article class="audit-row"><strong>Criar pacote</strong><p>O escopo está claro para você e para o cliente?</p></article>
      <article class="audit-row"><strong>Subir preço</strong><p>O valor percebido foi comunicado de forma simples?</p></article>
      <article class="audit-row"><strong>Manter preço</strong><p>O custo atual ainda permite resultado?</p></article>
    </div>
  </div>`),
slide('slide-12', 'Slide 12: missão prática', 'dark', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Missão prática</span></p>
    <header style="max-width:820px;margin-bottom:1.2rem">
      <p class="eyebrow reveal reveal-up delay-1">Aplicação imediata</p>
      <h2 class="section-title reveal reveal-up delay-2">Recalcule a margem de <span class="highlight">três itens mais vendidos</span></h2>
      <p class="lead reveal reveal-up delay-3">Para cada item, anote preço, custo direto, sobra inicial e desconto máximo aceitável.</p>
    </header>
    <div class="grid-3 stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('money')}</span><h3>Preço</h3><p>Valor que o cliente paga hoje, sem misturar com desejo ou sensação.</p></article>
      <article class="card"><span class="icon-shell">${icon('clipboard-text')}</span><h3>Custo direto</h3><p>O que essa venda consome para ser entregue.</p></article>
      <article class="card"><span class="icon-shell">${icon('warning')}</span><h3>Limite</h3><p>Menor valor aceitável antes de a promoção prejudicar o resultado.</p></article>
    </div>
  </div>`),
slide('slide-13', 'Slide 13: recapitulação e quiz', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 5</strong><span>·</span><span>Fechamento</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="final-badge">${icon('check-circle')} Badge: preço com critério</span>
      <h2 class="section-title">Recapitule e confirme sua decisão</h2>
    </header>
    <div class="final-panel">
      <ul class="recap-list reveal reveal-left delay-2">
        <li>${icon('money')}<span><strong>Custo vem primeiro</strong> Sem custo direto conhecido, o preço vira chute.</span></li>
        <li>${icon('chart-bar')}<span><strong>Margem orienta</strong> A sobra inicial precisa sustentar estrutura e lucro.</span></li>
        <li>${icon('target')}<span><strong>Desconto tem regra</strong> Promoção saudável tem limite, prazo e objetivo.</span></li>
      </ul>
      <div>
        <div class="quiz-options reveal reveal-scale delay-3" data-quiz>
          <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('warning')}</span><div><strong>A</strong><br><span>Dar desconto sempre que o cliente pedir para não perder a venda.</span></div></button>
          <button class="quiz-btn" type="button" data-answer="correct"><span class="icon-shell">${icon('check-circle')}</span><div><strong>B</strong><br><span>Conferir custo, despesa estimada e margem mínima antes do desconto.</span></div></button>
          <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('clock')}</span><div><strong>C</strong><br><span>Revisar preço apenas quando o caixa já estiver negativo.</span></div></button>
        </div>
        <p class="quiz-feedback" aria-live="polite">Escolha uma alternativa.</p>
      </div>
    </div>
  </div>`)
];

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Capítulo 5 | Preço, margem e decisão de venda</title>
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
<nav class="nav" aria-label="Navegação dos slides">
  <button class="nav-button" id="previous" type="button" aria-label="Slide anterior" disabled>${icon('arrow-left')}</button>
  <div class="dots" id="dots" aria-label="Selecionar slide"></div>
  <span class="count" id="count" aria-live="polite">1 / ${slides.length}</span>
  <button class="nav-button" id="next" type="button" aria-label="Próximo slide">${icon('arrow-right')}</button>
</nav>
<script>
${baseScript}
${customScript}
</script>
</body>
</html>`;

setupAssets();
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(JSON.stringify({ htmlPath, slides: slides.length }, null, 2));
