const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const slug = 'fundamentos-administracao-pequenos-negocios';
const runId = '2026-06-01-apostila';
const outDir = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-06');
const imagesDir = path.join(outDir, 'images');
const iconsDir = path.join(outDir, 'icons');
const fontsDir = path.join(outDir, 'fonts');
const htmlPath = path.join(outDir, 'slide.html');
const baseHtmlPath = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-05', 'slide.html');

const heroImage = path.join(root, 'assets', 'images', slug, 'capitulo-01-padaria-rotina-gestao-sem-letterbox-lucid-realism-leonardo-4d066c17.jpg');
const serviceImage = path.join(root, 'assets', 'images', slug, 'capitulo-02-atelie-planejamento-kits-lucid-realism-leonardo-6ced821c.jpg');
const registerImage = path.join(root, 'assets', 'images', slug, 'capitulo-03-rotina-trabalho-processo-sem-texto-lucid-realism-leonardo-5c24d1b1.jpg');

const icons = [
  'arrow-left', 'arrow-right', 'check-circle', 'lightbulb', 'warning',
  'target', 'list-checks', 'briefcase', 'clock', 'calendar-check',
  'clipboard-text', 'chart-bar', 'storefront', 'notebook', 'path',
  'users-three', 'gear', 'chat-text', 'phone-list', 'user-check',
  'star', 'hand-heart', 'seal-check', 'smiley', 'envelope'
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
  copyFile(heroImage, path.join(imagesDir, 'capitulo-06-atendimento-hero.jpg'));
  copyFile(serviceImage, path.join(imagesDir, 'capitulo-06-servico-cliente.jpg'));
  copyFile(registerImage, path.join(imagesDir, 'capitulo-06-registro-cliente.jpg'));
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
    'Correto. Promoção saudável mantém margem positiva e tem limite claro.',
    'Correto. Atendimento com padrão reduz falhas e facilita recorrência.'
  )
  .replace(
    'Ainda não. Desconto sem cálculo pode aumentar movimento e reduzir resultado.',
    'Ainda não. Atendimento depende de confirmação, registro e acompanhamento.'
  );

baseScript = baseScript.replace(
  /function collectLearnerState\(\)\{ return \{[\s\S]*?\}; \}/,
  `function collectLearnerState(){ return {
  quizzes:[].map.call(document.querySelectorAll('[data-quiz] .quiz-btn'),function(el){return el.classList.contains('correct')?'correct':(el.classList.contains('wrong')?'wrong':'');}),
  journey:(function(){ var out={}; [].forEach.call(document.querySelectorAll('.journey-item'),function(el){out[el.id]=el.dataset.bucket||'';}); return out; })(),
  serviceStep:[].map.call(document.querySelectorAll('.service-step'),function(el){return el.getAttribute('aria-pressed')==='true';}),
  feedbackChoice:[].map.call(document.querySelectorAll('.feedback-choice'),function(el){return el.classList.contains('chosen');}),
  checklist:[].map.call(document.querySelectorAll('.standard-check'),function(el){return el.classList.contains('done');}),
  followup:[].map.call(document.querySelectorAll('.follow-card'),function(el){return el.classList.contains('active');})
}; }`
);

baseScript = baseScript.replace(
  'var restored=learnerRuntime.restore(); applyLearnerState(restored.suspend);\n  showSlide(Math.min(restored.locationIndex,slides.length-1),false);',
  `var restored=learnerRuntime.restore(); applyLearnerState(restored.suspend); if(typeof applyCustomState==='function')applyCustomState(restored.suspend);
  function beginAt(index){ showSlide(Math.min(index,slides.length-1),false); }
  var hasProgress=restored.locationIndex>0 || Object.keys(restored.suspend||{}).length>0;
  var modal=document.getElementById('resume-modal');
  if(hasProgress && modal){
    modal.hidden=false;
    var continueBtn=document.getElementById('resume-continue');
    var restartBtn=document.getElementById('resume-restart');
    continueBtn.focus();
    continueBtn.addEventListener('click',function(){ modal.hidden=true; beginAt(restored.locationIndex); });
    restartBtn.addEventListener('click',function(){ modal.hidden=true; if(typeof resetCustomState==='function')resetCustomState(); learnerRuntime.save(1,{}); beginAt(0); });
    modal.addEventListener('keydown',function(event){
      if(event.key==='Escape'){ restartBtn.click(); }
      if(event.key==='Tab'){
        var focusable=[continueBtn,restartBtn], first=focusable[0], last=focusable[focusable.length-1];
        if(event.shiftKey && document.activeElement===first){ event.preventDefault(); last.focus(); }
        else if(!event.shiftKey && document.activeElement===last){ event.preventDefault(); first.focus(); }
      }
    });
  } else {
    beginAt(restored.locationIndex);
  }`
);

const customStyle = `
.journey-map{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.journey-pool,.journey-bucket{min-height:180px;padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff}
.journey-bucket{background:var(--primary-50)}
.journey-bucket[data-kind="depois"]{background:#fff7f6}
.dark .journey-pool,.dark .journey-bucket{color:var(--neutral-900)}
.dark .journey-pool h3,.dark .journey-bucket h3{color:var(--neutral-900)}
.journey-items{display:grid;gap:.55rem}
.journey-item{display:block;width:100%;padding:.75rem .85rem;border:1px solid var(--neutral-200);border-radius:12px;background:var(--neutral-50);cursor:grab;text-align:left;font-weight:800;color:var(--neutral-700)}
.dark .journey-item{background:#fff;color:var(--neutral-800);border-color:var(--neutral-300)}
.dark .journey-item:hover,.dark .journey-item:focus-visible{background:var(--primary-50);color:var(--neutral-900);border-color:var(--primary-600)}
.journey-item.selected{outline:3px solid var(--primary-200);border-color:var(--primary-600)}
.journey-status,.feedback-status,.check-status,.follow-status{min-height:46px;margin-top:.8rem;padding:.78rem .9rem;border-radius:var(--radius);background:#fff;color:var(--neutral-700);font-weight:800}
.dark .journey-status,.dark .feedback-status,.dark .check-status,.dark .follow-status{background:#fff;color:var(--neutral-900)!important}
.journey-status.good,.feedback-status.good,.check-status.good,.follow-status.good{background:#effaf4;color:#1e6b43}
.journey-status.warn,.feedback-status.warn,.check-status.warn,.follow-status.warn{background:#fff7e8;color:#744e00}
.dark .journey-status.good,.dark .feedback-status.good,.dark .check-status.good,.dark .follow-status.good{color:#1e6b43!important}
.dark .journey-status.warn,.dark .feedback-status.warn,.dark .check-status.warn,.dark .follow-status.warn{color:#744e00!important}
.service-lane{display:grid;grid-template-columns:.9fr 1.1fr;gap:1.2rem;align-items:stretch}
.service-steps{display:grid;gap:.72rem}
.service-step{display:grid;grid-template-columns:auto 1fr;gap:.7rem;align-items:center;padding:.9rem;border:1px solid var(--neutral-200);border-radius:var(--radius);background:#fff;text-align:left;cursor:pointer;color:var(--neutral-700)}
.service-step[aria-pressed="true"]{border-color:var(--primary-600);box-shadow:0 0 0 3px var(--primary-100)}
.service-panel{padding:1.25rem;border-radius:var(--radius-lg);background:var(--primary-900);color:#fff;display:grid;align-content:center}
.service-panel h3{font-family:var(--title);font-size:1.45rem;color:#fff}
.service-panel p{margin-top:.6rem;color:rgba(255,255,255,.82)}
.message-card{padding:1.2rem;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--neutral-200);box-shadow:var(--shadow)}
.message-bubble{margin-top:1rem;padding:1rem;border-radius:18px 18px 18px 4px;background:var(--primary-50);border:1px solid rgba(29,138,156,.25);color:var(--neutral-800);font-weight:700}
.feedback-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.feedback-choice{padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;text-align:left;cursor:pointer}
.feedback-choice h3{font-family:var(--title);font-size:1rem}
.feedback-choice p{margin-top:.45rem;color:var(--neutral-500);font-size:.86rem}
.feedback-choice.chosen{border-color:var(--primary-600);box-shadow:0 0 0 3px var(--primary-100)}
.standard-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:.75rem}
.standard-check{display:grid;gap:.55rem;align-content:start;min-height:126px;padding:.9rem;border:1px solid var(--neutral-200);border-radius:var(--radius);background:#fff;text-align:left;cursor:pointer;color:var(--neutral-700)}
.dark .standard-check{background:#fff;color:var(--neutral-900)!important;border-color:var(--neutral-300)}
.dark .standard-check strong{color:var(--neutral-900)!important}
.dark .standard-check:hover,.dark .standard-check:focus-visible{background:var(--primary-50);border-color:var(--primary-600)}
.standard-check.done{border-color:var(--success);background:#effaf4}
.dark .standard-check.done{background:#effaf4;color:var(--neutral-900)!important;border-color:var(--success)}
.metric-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.metric{display:grid;align-content:start;gap:.45rem;padding:1.1rem;border-radius:var(--radius-lg);background:#fff;border:1px solid var(--neutral-200)}
.metric .icon-shell{display:flex;width:44px;height:44px;align-items:center;justify-content:center;margin:0 0 .35rem 0;color:var(--primary-700)}
.metric .icon-shell .icon{display:block;width:1.22rem;height:1.22rem}
.metric strong{display:block;font-family:var(--title);font-size:1.05rem}
.metric .metric-value{display:block;color:var(--primary-700);font-weight:900}
.follow-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.follow-card{padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;text-align:left;cursor:pointer}
.follow-card.active{border-color:var(--success);background:#effaf4}
.resume-modal{position:fixed;inset:0;z-index:50;display:grid;place-items:center;background:rgba(20,26,29,.66);padding:1rem}
.resume-modal[hidden]{display:none}
.resume-dialog{width:min(520px,100%);padding:1.4rem;border-radius:var(--radius-lg);background:#fff;box-shadow:0 24px 80px rgba(0,0,0,.28)}
.resume-dialog h2{font-family:var(--title);font-size:1.55rem}
.resume-dialog p{margin-top:.55rem;color:var(--neutral-600)}
.resume-actions{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1rem}
@media (max-width:900px){
  .journey-map,.service-lane,.feedback-grid,.standard-grid,.metric-strip,.follow-grid{grid-template-columns:1fr}
  .journey-pool,.journey-bucket{min-height:auto}
  .standard-check{min-height:auto}
}
`;

const customScript = `
function resetCustomState(){
  document.querySelectorAll('.journey-item').forEach(function(item){ document.querySelector('.journey-pool .journey-items').appendChild(item); item.dataset.bucket=''; item.classList.remove('selected'); });
  document.querySelectorAll('.service-step,.feedback-choice,.follow-card').forEach(function(el){ el.classList.remove('chosen','active'); el.setAttribute('aria-pressed','false'); });
  document.querySelectorAll('.standard-check').forEach(function(el){ el.classList.remove('done'); el.setAttribute('aria-checked','false'); });
  updateJourneyStatus(); updateChecklistStatus(); updateFollowStatus();
}
function applyCustomState(state){
  if(!state)return;
  if(state.journey){ document.querySelectorAll('.journey-item').forEach(function(item){ var kind=state.journey[item.id]; if(kind){ var bucket=document.querySelector('.journey-bucket[data-kind="'+kind+'"] .journey-items'); if(bucket){ bucket.appendChild(item); item.dataset.bucket=kind; } } }); updateJourneyStatus(); }
  if(state.serviceStep){ document.querySelectorAll('.service-step').forEach(function(btn,i){ if(state.serviceStep[i])chooseServiceStep(btn,false); }); }
  if(state.feedbackChoice){ document.querySelectorAll('.feedback-choice').forEach(function(btn,i){ if(state.feedbackChoice[i])chooseFeedback(btn,false); }); }
  if(state.checklist){ document.querySelectorAll('.standard-check').forEach(function(btn,i){ if(state.checklist[i]){ btn.classList.add('done'); btn.setAttribute('aria-checked','true'); } }); updateChecklistStatus(); }
  if(state.followup){ document.querySelectorAll('.follow-card').forEach(function(btn,i){ if(state.followup[i]){ btn.classList.add('active'); btn.setAttribute('aria-pressed','true'); } }); updateFollowStatus(); }
}
var selectedJourneyItem=null;
function moveJourneyItem(item,bucket){
  bucket.querySelector('.journey-items').appendChild(item);
  item.dataset.bucket=bucket.dataset.kind;
  item.classList.remove('selected');
  selectedJourneyItem=null;
  updateJourneyStatus();
  saveLearnerState();
}
function updateJourneyStatus(){
  var items=[].slice.call(document.querySelectorAll('.journey-item'));
  var placed=items.filter(function(i){return !!i.dataset.bucket;}).length;
  var ok=items.filter(function(i){return i.dataset.bucket && i.dataset.bucket===i.dataset.answer;}).length;
  var status=document.querySelector('.journey-status');
  if(!status)return;
  status.classList.remove('good','warn');
  if(!placed) status.textContent='Classifique cada item no momento correto.';
  else if(ok===items.length){ status.classList.add('good'); status.textContent='Correto: atendimento forte cuida do antes da venda e do depois da entrega.'; }
  else { status.classList.add('warn'); status.textContent='Você acertou '+ok+' de '+items.length+'. Revise se a ação vem antes da venda ou no pós-venda.'; }
}
function setupJourney(){
  document.querySelectorAll('.journey-item').forEach(function(item){
    item.setAttribute('draggable','true');
    item.addEventListener('dragstart',function(e){ e.dataTransfer.setData('text/plain',item.id); });
    item.addEventListener('click',function(){ if(selectedJourneyItem)selectedJourneyItem.classList.remove('selected'); selectedJourneyItem=item; item.classList.add('selected'); });
    item.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); item.click(); } });
  });
  document.querySelectorAll('.journey-bucket').forEach(function(bucket){
    bucket.addEventListener('dragover',function(e){ e.preventDefault(); });
    bucket.addEventListener('drop',function(e){ e.preventDefault(); var item=document.getElementById(e.dataTransfer.getData('text/plain')); if(item)moveJourneyItem(item,bucket); });
    bucket.addEventListener('click',function(){ if(selectedJourneyItem)moveJourneyItem(selectedJourneyItem,bucket); });
    bucket.addEventListener('keydown',function(e){ if((e.key==='Enter'||e.key===' ')&&selectedJourneyItem){ e.preventDefault(); moveJourneyItem(selectedJourneyItem,bucket); } });
  });
  updateJourneyStatus();
}
function chooseServiceStep(btn,save){
  document.querySelectorAll('.service-step').forEach(function(b){ b.setAttribute('aria-pressed','false'); });
  btn.setAttribute('aria-pressed','true');
  var panel=document.querySelector('.service-panel');
  if(panel)panel.innerHTML='<h3>'+btn.dataset.title+'</h3><p>'+btn.dataset.copy+'</p>';
  if(save!==false)saveLearnerState();
}
function setupServiceSteps(){
  document.querySelectorAll('.service-step').forEach(function(btn){ btn.addEventListener('click',function(){ chooseServiceStep(btn,true); }); });
}
function chooseFeedback(btn,save){
  document.querySelectorAll('.feedback-choice').forEach(function(b){ b.classList.remove('chosen'); b.setAttribute('aria-pressed','false'); });
  btn.classList.add('chosen'); btn.setAttribute('aria-pressed','true');
  var status=document.querySelector('.feedback-status');
  if(status){ status.classList.remove('good','warn'); status.classList.add(btn.dataset.kind==='good'?'good':'warn'); status.textContent=btn.dataset.feedback; }
  if(save!==false)saveLearnerState();
}
function setupFeedback(){
  document.querySelectorAll('.feedback-choice').forEach(function(btn){ btn.addEventListener('click',function(){ chooseFeedback(btn,true); }); });
}
function updateChecklistStatus(){
  var total=document.querySelectorAll('.standard-check').length;
  var done=document.querySelectorAll('.standard-check.done').length;
  var status=document.querySelector('.check-status');
  if(status){ status.classList.toggle('good',done===total); status.textContent=done===total?'Padrão completo: a experiência fica mais previsível para o cliente.':'Marque os itens que já existem no seu padrão de atendimento: '+done+' de '+total+'.'; }
}
function setupChecklist(){
  document.querySelectorAll('.standard-check').forEach(function(btn){
    btn.setAttribute('role','checkbox'); btn.setAttribute('aria-checked','false');
    btn.addEventListener('click',function(){ btn.classList.toggle('done'); btn.setAttribute('aria-checked',String(btn.classList.contains('done'))); updateChecklistStatus(); saveLearnerState(); });
  });
  updateChecklistStatus();
}
function updateFollowStatus(){
  var done=document.querySelectorAll('.follow-card.active').length;
  var status=document.querySelector('.follow-status');
  if(status){ status.classList.toggle('good',done>0); status.textContent=done?'Ação escolhida. O próximo passo é registrar data e responsável.':'Escolha uma ação de retorno útil para aplicar com clientes recentes.'; }
}
function setupFollowup(){
  document.querySelectorAll('.follow-card').forEach(function(btn){ btn.addEventListener('click',function(){ btn.classList.toggle('active'); btn.setAttribute('aria-pressed',String(btn.classList.contains('active'))); updateFollowStatus(); saveLearnerState(); }); });
  updateFollowStatus();
}
setupJourney();
setupServiceSteps();
setupFeedback();
setupChecklist();
setupFollowup();
`;

const slides = [
slide('slide-1', 'Slide 1: abertura e objetivos', 'cover active', `
  <div class="inner">
    <div class="cover-copy">
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Mercado</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Clientes, atendimento e relacionamento</p>
      <h1 class="title reveal reveal-up delay-2">Faça o cliente perceber valor <span class="highlight">antes, durante e depois</span> da venda</h1>
      <p class="lead reveal reveal-up delay-3">Você vai praticar padrões simples de atendimento, registro de clientes e uso de feedback para melhorar a experiência.</p>
      <ul class="objective-list reveal reveal-up delay-3" aria-label="Objetivos de aprendizagem">
        <li>Aplicar padrões simples de atendimento.</li>
        <li>Construir um registro básico de clientes.</li>
        <li>Usar feedback para melhorar a experiência.</li>
      </ul>
      <button class="button reveal reveal-up delay-4" type="button" data-next>${icon('arrow-right')} Iniciar capítulo</button>
    </div>
    <aside class="hero-panel reveal reveal-scale delay-2">
      <figure><img src="images/capitulo-06-atendimento-hero.jpg" alt="Atendimento em pequeno comércio, com organização de balcão e contato direto com cliente."></figure>
      <div class="metadata">
        <div class="meta-row"><span class="icon-shell">${icon('target')}</span><div><strong>Objetivo</strong><span>Transformar atendimento em recorrência.</span></div></div>
        <div class="meta-row"><span class="icon-shell">${icon('clock')}</span><div><strong>Tempo sugerido</strong><span>40 minutos com prática.</span></div></div>
      </div>
    </aside>
  </div>`),
slide('slide-2', 'Slide 2: roteiro do capítulo', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Roteiro</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="tag">Ideia central</span>
      <h2 class="section-title">Atendimento bom não depende de simpatia isolada</h2>
      <p class="lead" style="margin:.8rem auto 0">Ele depende de padrão, escuta e acompanhamento para que o cliente confie e volte.</p>
    </header>
    <div class="summary-grid stagger-children delay-2">
      <article class="card"><span class="icon-shell">${icon('chat-text')}</span><h3>Clareza</h3><p>O cliente entende prazo, condição, escopo e próximo passo.</p></article>
      <article class="card"><span class="icon-shell">${icon('phone-list')}</span><h3>Registro</h3><p>A empresa lembra compras, preferências e oportunidades de retorno.</p></article>
      <article class="card"><span class="icon-shell">${icon('star')}</span><h3>Feedback</h3><p>Reclamação e elogio viram dados para melhorar o processo.</p></article>
    </div>
  </div>`),
slide('slide-3', 'Slide 3: experiência percebida', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-06-servico-cliente.jpg" alt="Mesa de trabalho organizada com materiais de planejamento, representando cuidado com pedidos e preferências do cliente.">
      <figcaption>O cliente avalia a solução inteira: clareza, prazo, confiança, pós-venda e facilidade para resolver problemas.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Conceito</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Experiência do cliente</p>
      <h2 class="section-title reveal reveal-up delay-2">Produto bom perde força quando a experiência é confusa</h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('check-circle')}</span><div><h3>Antes</h3><p>Resposta inicial clara e confirmação das condições antes da venda.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('calendar-check')}</span><div><h3>Durante</h3><p>Prazo combinado, acompanhamento e aviso quando algo muda.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('hand-heart')}</span><div><h3>Depois</h3><p>Pós-venda curto, útil e registrado para próximas oportunidades.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-4', 'Slide 4: atendimento em etapas', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Explorar</span></p>
    <header style="margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Clique nas etapas</p>
      <h2 class="section-title reveal reveal-up delay-2">O padrão aparece nos pequenos combinados</h2>
    </header>
    <div class="service-lane reveal reveal-scale delay-3">
      <div class="service-steps">
        <button class="service-step" type="button" data-title="Resposta inicial" data-copy="Cumprimento, identificação da necessidade e prazo de retorno reduzem ansiedade logo no primeiro contato."><span class="icon-shell">${icon('chat-text')}</span><strong>Resposta inicial</strong></button>
        <button class="service-step" type="button" data-title="Confirmação" data-copy="Antes de vender, confirme prazo, condição, endereço, escopo e forma de pagamento para evitar retrabalho."><span class="icon-shell">${icon('check-circle')}</span><strong>Confirmação</strong></button>
        <button class="service-step" type="button" data-title="Acompanhamento" data-copy="Após a entrega ou uso do serviço, uma pergunta curta mostra cuidado e gera informação de melhoria."><span class="icon-shell">${icon('hand-heart')}</span><strong>Acompanhamento</strong></button>
      </div>
      <aside class="service-panel" aria-live="polite"><h3>Escolha uma etapa</h3><p>Clique em cada ponto para ver como ele reduz falhas no atendimento.</p></aside>
    </div>
  </div>`),
slide('slide-5', 'Slide 5: mensagem de confirmação', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Prática</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Modelo simples</p>
      <h2 class="section-title reveal reveal-up delay-2">Confirmação evita desencontro e protege a confiança</h2>
    </header>
    <div class="message-card reveal reveal-scale delay-3">
      <span class="icon-shell">${icon('envelope')}</span>
      <div class="message-bubble">Olá, tudo certo? Seu pedido está confirmado para amanhã, com entrega prevista no período combinado. Qualquer ajuste, me avise por aqui.</div>
    </div>
    <div class="callout reveal reveal-up delay-4" style="margin-top:1rem">${icon('lightbulb')} <p><strong>Use como base:</strong> adapte produto, prazo, canal e próximo passo sem transformar a mensagem em texto longo.</p></div>
  </div>`),
slide('slide-6', 'Slide 6: arrastar ações da jornada', 'dark', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Arrastar ou clicar</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Antes ou depois?</p>
      <h2 class="section-title reveal reveal-up delay-2">Classifique as ações da jornada do cliente</h2>
      <p class="lead reveal reveal-up delay-3">Você pode arrastar ou selecionar um item e depois escolher a coluna pelo teclado/clique.</p>
    </header>
    <div class="journey-map reveal reveal-scale delay-3">
      <div class="journey-pool"><h3>Itens para classificar</h3><div class="journey-items">
        <button class="journey-item" id="journey-1" type="button" data-answer="antes">Confirmar prazo antes da venda</button>
        <button class="journey-item" id="journey-2" type="button" data-answer="depois">Perguntar satisfação após entrega</button>
        <button class="journey-item" id="journey-3" type="button" data-answer="antes">Explicar condição de pagamento</button>
        <button class="journey-item" id="journey-4" type="button" data-answer="depois">Registrar oportunidade de retorno</button>
      </div></div>
      <div style="display:grid;gap:1rem">
        <div class="journey-bucket" role="button" tabindex="0" data-kind="antes" aria-label="Coluna antes da venda"><h3>Antes da venda</h3><div class="journey-items"></div></div>
        <div class="journey-bucket" role="button" tabindex="0" data-kind="depois" aria-label="Coluna depois da entrega"><h3>Depois da entrega</h3><div class="journey-items"></div></div>
      </div>
    </div>
    <p class="journey-status" aria-live="polite">Classifique cada item no momento correto.</p>
  </div>`),
slide('slide-7', 'Slide 7: registro de clientes', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-06-registro-cliente.jpg" alt="Rotina de trabalho organizada com blocos e anotações, representando registro simples de clientes.">
      <figcaption>Relacionamento vira ativo quando a empresa registra o que aprendeu sobre o cliente.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Registro</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Cadastro útil</p>
      <h2 class="section-title reveal reveal-up delay-2">Anote o suficiente para lembrar e agir</h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('user-check')}</span><div><h3>Cliente</h3><p>Nome, contato, compra e preferência.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('warning')}</span><div><h3>Histórico</h3><p>Reclamação, atraso, elogio ou ajuste combinado.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('calendar-check')}</span><div><h3>Próxima ação</h3><p>Retorno, lembrete, reposição ou oferta adequada.</p></div></article>
      </div>
    </div>
  </div>`),
slide('slide-8', 'Slide 8: feedback como dado', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Decisão</span></p>
    <header style="margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Feedback orienta melhoria</p>
      <h2 class="section-title reveal reveal-up delay-2">Escolha a melhor leitura para cada retorno</h2>
    </header>
    <div class="feedback-grid reveal reveal-scale delay-3">
      <button class="feedback-choice" type="button" data-kind="warn" data-feedback="Cuidado: uma reclamação isolada merece resposta, mas não prova padrão de falha. Registre e acompanhe."><h3>Uma reclamação única</h3><p>Mudar todo o processo imediatamente.</p></button>
      <button class="feedback-choice" type="button" data-kind="good" data-feedback="Boa leitura: reclamação recorrente mostra processo falho e deve virar ação de correção."><h3>Reclamação recorrente</h3><p>Investigar causa e ajustar o padrão.</p></button>
      <button class="feedback-choice" type="button" data-kind="good" data-feedback="Boa leitura: elogio recorrente mostra diferencial que pode ser comunicado melhor."><h3>Elogio recorrente</h3><p>Reforçar o diferencial na venda.</p></button>
    </div>
    <p class="feedback-status" aria-live="polite">Escolha uma opção para ver o feedback.</p>
  </div>`),
slide('slide-9', 'Slide 9: estudo de caso', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Estudo de caso</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Pet shop Amigo Fiel</p>
      <h2 class="section-title reveal reveal-up delay-2">A memória da equipe não era suficiente para gerar recorrência</h2>
    </header>
    <div class="grid-4 stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('storefront')}</span><h3>Contexto</h3><p>O pet shop tinha clientes fiéis, mas esquecia datas de banho, vacinas e reposição de ração.</p></article>
      <article class="card"><span class="icon-shell">${icon('warning')}</span><h3>Problema</h3><p>As informações ficavam na memória dos atendentes.</p></article>
      <article class="card"><span class="icon-shell">${icon('gear')}</span><h3>Ação</h3><p>A equipe criou cadastro com animal, preferência, frequência de compra e lembretes mensais.</p></article>
      <article class="card"><span class="icon-shell">${icon('check-circle')}</span><h3>Resultado</h3><p>As recompras aumentaram e os clientes elogiaram o cuidado.</p></article>
    </div>
  </div>`),
slide('slide-10', 'Slide 10: checklist do padrão', 'dark', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Checklist</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Marque seu padrão atual</p>
      <h2 class="section-title reveal reveal-up delay-2">Cinco itens deixam o atendimento mais previsível</h2>
    </header>
    <div class="standard-grid reveal reveal-scale delay-3">
      <button class="standard-check" type="button">${icon('chat-text')}<strong>Resposta padronizada</strong></button>
      <button class="standard-check" type="button">${icon('user-check')}<strong>Cadastro atualizado</strong></button>
      <button class="standard-check" type="button">${icon('calendar-check')}<strong>Prazo confirmado</strong></button>
      <button class="standard-check" type="button">${icon('hand-heart')}<strong>Pós-venda feito</strong></button>
      <button class="standard-check" type="button">${icon('star')}<strong>Feedback registrado</strong></button>
    </div>
    <p class="check-status" aria-live="polite">Marque os itens que já existem no seu padrão de atendimento: 0 de 5.</p>
  </div>`),
slide('slide-11', 'Slide 11: indicadores de acompanhamento', 'tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Métricas</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Poucos números bastam</p>
      <h2 class="section-title reveal reveal-up delay-2">Meça o que ajuda a melhorar a experiência</h2>
    </header>
    <div class="metric-strip stagger-children delay-3">
      <article class="metric"><span class="icon-shell">${icon('clock')}</span><strong>Tempo de resposta</strong><span class="metric-value">até 1 turno</span></article>
      <article class="metric"><span class="icon-shell">${icon('user-check')}</span><strong>Clientes registrados</strong><span class="metric-value">100% das vendas</span></article>
      <article class="metric"><span class="icon-shell">${icon('star')}</span><strong>Feedbacks mensais</strong><span class="metric-value">mínimo 10</span></article>
    </div>
    <div class="callout reveal reveal-up delay-4" style="margin-top:1rem">${icon('lightbulb')} <p><strong>Regra prática:</strong> indicador só vale se alguém olha, decide e melhora algo com ele.</p></div>
  </div>`),
slide('slide-12', 'Slide 12: missão prática', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Missão prática</span></p>
    <header style="max-width:820px;margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Ação de campo</p>
      <h2 class="section-title reveal reveal-up delay-2">Registre dez clientes recentes e faça uma ação de retorno útil</h2>
    </header>
    <div class="follow-grid reveal reveal-scale delay-3">
      <button class="follow-card" type="button"><span class="icon-shell">${icon('phone-list')}</span><h3>Lembrete</h3><p>Avise sobre reposição, manutenção ou data importante.</p></button>
      <button class="follow-card" type="button"><span class="icon-shell">${icon('chat-text')}</span><h3>Feedback</h3><p>Pergunte se a entrega resolveu o que o cliente precisava.</p></button>
      <button class="follow-card" type="button"><span class="icon-shell">${icon('seal-check')}</span><h3>Oferta adequada</h3><p>Indique algo conectado à compra ou preferência registrada.</p></button>
    </div>
    <p class="follow-status" aria-live="polite">Escolha uma ação de retorno útil para aplicar com clientes recentes.</p>
  </div>`),
slide('slide-13', 'Slide 13: recapitulação e quiz', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 6</strong><span>·</span><span>Fechamento</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="final-badge">${icon('seal-check')} Badge: relacionamento com padrão</span>
      <h2 class="section-title">Recapitule e confirme sua decisão</h2>
    </header>
    <div class="final-panel">
      <ul class="recap-list reveal reveal-left delay-2">
        <li>${icon('chat-text')}<span><strong>Experiência inteira</strong> O cliente percebe clareza, prazo, confiança e pós-venda.</span></li>
        <li>${icon('phone-list')}<span><strong>Registro cria recorrência</strong> Cadastro simples ajuda a lembrar e agir.</span></li>
        <li>${icon('star')}<span><strong>Feedback orienta melhoria</strong> Reclamações e elogios mostram onde ajustar.</span></li>
      </ul>
      <div>
        <div class="quiz-options reveal reveal-scale delay-3" data-quiz>
          <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('warning')}</span><div><strong>A</strong><br><span>Confiar apenas na simpatia de cada atendente.</span></div></button>
          <button class="quiz-btn" type="button" data-answer="correct"><span class="icon-shell">${icon('check-circle')}</span><div><strong>B</strong><br><span>Padronizar resposta, registrar cliente e acompanhar feedback.</span></div></button>
          <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('clock')}</span><div><strong>C</strong><br><span>Fazer pós-venda apenas quando houver reclamação.</span></div></button>
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
<title>Capítulo 6 | Clientes, atendimento e relacionamento</title>
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
${baseScript}
${customScript}
</script>
</body>
</html>`;

setupAssets();
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(JSON.stringify({ htmlPath, slides: slides.length }, null, 2));
