const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const slug = 'fundamentos-administracao-pequenos-negocios';
const runId = '2026-06-01-apostila';
const outDir = path.join(root, 'squads', slug, 'output', runId, 'slides-capitulo-01');
const imagesDir = path.join(outDir, 'images');
const iconsDir = path.join(outDir, 'icons');
const fontsDir = path.join(outDir, 'fonts');
const htmlPath = path.join(outDir, 'slide.html');

const heroImage = path.join(root, 'assets', 'images', slug, 'capitulo-01-gestao-rotina-pequeno-negocio-lucid-realism-leonardo-5dd94d1f.jpg');
const caseImage = path.join(root, 'assets', 'images', slug, 'capitulo-01-padaria-rotina-gestao-sem-letterbox-lucid-realism-leonardo-4d066c17.jpg');

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
  copyFile(heroImage, path.join(imagesDir, 'capitulo-01-gestao-rotina.jpg'));
  copyFile(caseImage, path.join(imagesDir, 'capitulo-01-padaria-rotina.jpg'));
  copyFile(path.join(root, 'assets', 'fonts', 'BricolageGrotesque-Variable.ttf'), path.join(fontsDir, 'BricolageGrotesque-Variable.ttf'));
  copyFile(path.join(root, 'assets', 'fonts', 'PlusJakartaSans-Variable.ttf'), path.join(fontsDir, 'PlusJakartaSans-Variable.ttf'));
  for (const icon of icons) {
    copyFile(path.join(root, 'assets', 'icons', 'duotone', `${icon}-duotone.svg`), path.join(iconsDir, `${icon}-duotone.svg`));
  }
}

function icon(name, extra = '') {
  return `<img class="icon ${extra}" src="icons/${name}-duotone.svg" alt="" aria-hidden="true">`;
}

function slide(id, label, classes, content) {
  return `<section class="slide ${classes}" id="${id}" aria-label="${label}" aria-roledescription="slide" tabindex="-1" aria-hidden="true">
${content}
</section>`;
}

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Capítulo 1 | Fundamentos de Administração</title>
<link rel="icon" href="data:,">
<style>
@font-face { font-family: 'Bricolage Grotesque'; src: url('fonts/BricolageGrotesque-Variable.ttf') format('truetype'); font-weight: 200 900; }
@font-face { font-family: 'Plus Jakarta Sans'; src: url('fonts/PlusJakartaSans-Variable.ttf') format('truetype'); font-weight: 200 900; }
:root {
  --primary-50:#eff9fb; --primary-100:#d7f0f4; --primary-200:#b2e0e8; --primary-500:#1d8a9c; --primary-700:#145c6c; --primary-900:#103b45;
  --accent-500:#d9534f; --accent-700:#9d3836;
  --neutral-0:#ffffff; --neutral-50:#f8fafb; --neutral-100:#eef2f4; --neutral-200:#d9e2e7; --neutral-500:#5d6e78; --neutral-600:#43515a; --neutral-900:#141a1d;
  --success:#4DB87A; --focus:#d9534f; --title:'Bricolage Grotesque', Georgia, serif; --body:'Plus Jakarta Sans', Arial, sans-serif;
  --shadow:0 16px 42px rgba(20,26,29,.10); --radius:12px; --radius-lg:20px; --nav-clearance:6.6rem;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{width:100%;height:100%;overflow:hidden}
body{background:var(--neutral-50);color:var(--neutral-900);font:400 16px/1.55 var(--body);-webkit-font-smoothing:antialiased}
button{font:inherit;color:inherit} img{display:block;max-width:100%}
:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
.skip-link{position:fixed;left:1rem;top:-4rem;z-index:1001;padding:.75rem 1rem;border-radius:var(--radius);background:var(--neutral-900);color:#fff;font-weight:800}.skip-link:focus{top:1rem}
.progress{position:fixed;top:0;left:0;height:3px;width:8.33%;z-index:1000;background:linear-gradient(90deg,var(--primary-700),var(--primary-500));transition:width .25s ease-out}
.stage{position:relative;width:100%;height:100%}
.slide{position:absolute;inset:0;display:flex;justify-content:center;align-items:flex-start;overflow-y:auto;padding:2.3rem 3rem calc(var(--nav-clearance) + 1.1rem);opacity:0;transform:translateX(32px);pointer-events:none;transition:opacity .22s ease-out,transform .22s ease-out}
.slide.active{opacity:1;transform:translateX(0);pointer-events:auto}.slide.exit{opacity:0;transform:translateX(-32px)}
.inner{width:min(1080px,100%);margin-block:auto}.narrow{width:min(860px,100%)}
.slide-context{display:flex;gap:.45rem;align-items:center;margin-bottom:.6rem;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:var(--neutral-500)}.slide-context strong{color:var(--primary-700)}
.eyebrow{margin-bottom:.75rem;color:var(--primary-700);font-size:.72rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.title{font-family:var(--title);font-size:clamp(2.45rem,5vw,4.2rem);font-weight:850;line-height:1.02;letter-spacing:0}
.section-title{font-family:var(--title);font-size:clamp(1.85rem,3.1vw,2.7rem);font-weight:780;line-height:1.12;letter-spacing:0}.highlight{color:var(--primary-700)}
.lead{max-width:62ch;color:var(--neutral-500);font-size:1.02rem;line-height:1.7}.muted{color:var(--neutral-500)}
.objective-list{display:grid;gap:.45rem;margin:.15rem 0 .1rem;padding-left:1.15rem;color:var(--neutral-600);font-size:.86rem;line-height:1.45}.objective-list strong{color:var(--neutral-900)}
.tag{display:inline-flex;align-items:center;padding:.32rem .82rem;border:1px solid rgba(29,138,156,.35);border-radius:999px;background:var(--primary-50);color:var(--primary-700);font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}
.button{display:inline-flex;align-items:center;gap:.5rem;min-height:48px;padding:.7rem 1.35rem;border:0;border-radius:9px;background:var(--primary-700);color:#fff;cursor:pointer;font-weight:800}.button:hover{background:var(--primary-500);box-shadow:0 7px 18px rgba(20,92,108,.16)}
.icon{width:1.22rem;height:1.22rem;flex:0 0 auto;object-fit:contain}.icon-lg{width:1.65rem;height:1.65rem}.icon-xl{width:2rem;height:2rem}
.icon-shell{display:flex;width:40px;height:40px;align-items:center;justify-content:center;border:1px solid rgba(29,138,156,.32);border-radius:10px;background:var(--primary-50)}
.cover .inner{display:grid;grid-template-columns:minmax(360px,1fr) 430px;gap:3rem;align-items:center}.cover-copy{display:flex;flex-direction:column;align-items:flex-start;gap:1.1rem}.hero-panel{overflow:hidden;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;box-shadow:var(--shadow)}.hero-panel figure{aspect-ratio:16/9}.hero-panel img{width:100%;height:100%;object-fit:cover}.metadata{padding:1rem 1.35rem 1.2rem}.meta-row{display:flex;gap:.8rem;padding:.75rem 0;border-bottom:1px solid var(--neutral-200)}.meta-row:last-child{border-bottom:0;padding-bottom:0}.meta-row strong{display:block;font-family:var(--title);font-size:.92rem}.meta-row span{color:var(--neutral-500);font-size:.8rem}
.concept{background:#fff}.concept .inner{display:grid;grid-template-columns:.92fr 1.08fr;gap:3.2rem;align-items:center}.photo-card{overflow:hidden;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;box-shadow:var(--shadow)}.photo-card img{width:100%;height:auto;aspect-ratio:16/11;object-fit:cover}.photo-card figcaption{padding:.8rem 1rem;color:var(--neutral-500);font-size:.8rem}
.feature-list{display:grid;gap:.72rem;margin:1.35rem 0}.feature{display:flex;gap:.8rem;padding:.85rem 1rem;border:1px solid var(--neutral-200);border-radius:var(--radius);background:#fff}.feature h3{margin-bottom:.14rem;font-family:var(--title);font-size:.95rem}.feature p{color:var(--neutral-500);font-size:.82rem;line-height:1.5}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:.85rem}.card{padding:1.15rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff;box-shadow:0 10px 26px rgba(20,26,29,.05)}.card h3{margin:.65rem 0 .35rem;font-family:var(--title);font-size:1rem}.card p,.card li{color:var(--neutral-500);font-size:.84rem}.card ul{display:grid;gap:.45rem;padding-left:1rem}
.callout{display:flex;gap:.75rem;padding:1rem;border:1px solid rgba(29,138,156,.32);border-radius:var(--radius);background:var(--primary-50);color:var(--neutral-600);font-size:.88rem}.callout strong{color:var(--neutral-900)}
.dark{background:var(--primary-900);color:#fff}.dark .slide-context{color:rgba(255,255,255,.45)}.dark .slide-context strong,.dark .highlight{color:var(--primary-200)}.dark .eyebrow,.dark .section-title{color:#fff}.dark .lead{color:rgba(255,255,255,.68)}.dark .card{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.16);box-shadow:none}.dark .card p,.dark .card li{color:rgba(255,255,255,.72)}.tint{background:var(--primary-50)}
.flow{display:grid;grid-template-columns:repeat(5,1fr);gap:.75rem;margin-top:1.4rem}.step{position:relative;min-height:196px;padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff}.step span{display:flex;width:34px;height:34px;align-items:center;justify-content:center;border-radius:50%;background:var(--primary-700);color:#fff;font-family:var(--title);font-weight:800}.step h3{margin:.75rem 0 .35rem;font-family:var(--title);font-size:.96rem}.step p{color:var(--neutral-500);font-size:.78rem}
.tabs{overflow:hidden;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);background:#fff}.tablist{display:flex;border-bottom:1px solid var(--neutral-200)}.tab{position:relative;display:inline-flex;flex:1;justify-content:center;align-items:center;min-height:54px;padding:.8rem 1rem;border:0;background:transparent;color:var(--neutral-500);cursor:pointer;font-family:var(--title);font-weight:800}.tab[aria-selected=true]{color:var(--primary-700)}.tab[aria-selected=true]::after{content:"";position:absolute;left:12%;right:12%;bottom:0;height:3px;background:var(--primary-500);border-radius:3px 3px 0 0}.tabpanel{display:grid;grid-template-columns:1.1fr .9fr;gap:1.6rem;padding:1.5rem}.tabpanel[hidden]{display:none}.tabpanel h3{margin-bottom:.4rem;font-family:var(--title);font-size:1.25rem}.tabpanel p{color:var(--neutral-500);font-size:.92rem}.side-note{padding:1rem;border-radius:var(--radius);background:var(--neutral-100)}
.flip-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}.flip-card{min-height:230px;perspective:1000px;cursor:pointer}.flip-inner{position:relative;width:100%;height:100%;min-height:230px;transition:transform .55s cubic-bezier(.16,1,.3,1);transform-style:preserve-3d}.flip-card.flipped .flip-inner{transform:rotateY(180deg)}.flip-front,.flip-back{position:absolute;inset:0;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between;padding:1.15rem;border:1px solid var(--neutral-200);border-radius:var(--radius-lg);backface-visibility:hidden;background:#fff}.flip-front{background:linear-gradient(135deg,var(--primary-50),#fff)}.flip-back{transform:rotateY(180deg);background:var(--primary-900);color:#fff}.flip-front h3,.flip-back h3{font-family:var(--title);font-size:1.05rem}.flip-back p{font-size:.86rem;color:rgba(255,255,255,.78)}.flip-hint{color:var(--primary-700);font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em}
.accord-list{display:grid;gap:.75rem}.accord-item{overflow:hidden;border:1px solid var(--neutral-200);border-radius:var(--radius);background:#fff}.accord-btn{display:flex;width:100%;align-items:center;justify-content:space-between;padding:1rem;border:0;background:#fff;cursor:pointer;font-family:var(--title);font-size:1rem;font-weight:800}.accord-caret{width:18px;height:18px;transition:transform .2s}.accord-btn[aria-expanded=true] .accord-caret{transform:rotate(180deg)}.accord-body{display:grid;grid-template-rows:0fr;transition:grid-template-rows .24s}.accord-body.open{grid-template-rows:1fr}.accord-content{overflow:hidden}.accord-content p{padding:0 1rem 1rem;color:var(--neutral-500)}
.ms-panel{padding:1.25rem;border-radius:var(--radius-lg);background:#fff;color:var(--neutral-900);box-shadow:var(--shadow)}.ms-title{font-family:var(--title);font-weight:800;font-size:1.2rem}.ms-sub{margin:.15rem 0 1rem;color:var(--neutral-500);font-size:.83rem}.ms-list{display:grid;gap:.6rem}.ms-item{display:flex;gap:.65rem;align-items:center;padding:.78rem;border:1px solid var(--neutral-200);border-radius:10px;cursor:pointer}.ms-check{width:21px;height:21px;border:2px solid var(--primary-500);border-radius:50%}.ms-item.done{background:var(--primary-50)}.ms-item.done .ms-check{background:var(--primary-700);box-shadow:inset 0 0 0 4px #fff}.xp-label{display:flex;justify-content:space-between;margin:1rem 0 .35rem;font-size:.78rem;font-weight:800;color:var(--neutral-500)}.xp-track{height:10px;border-radius:999px;background:var(--neutral-200);overflow:hidden}.xp-bar{height:100%;width:0;background:linear-gradient(90deg,var(--primary-700),var(--success));transition:width .25s}.ms-badge{margin-top:.8rem;opacity:.25;font-weight:800}.ms-badge.earned{opacity:1;color:var(--success)}
.mission-layout{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
.quiz-options{display:grid;gap:.75rem;margin-top:1.2rem}.quiz-btn{display:flex;gap:.75rem;align-items:flex-start;width:100%;padding:1rem;border:1px solid var(--neutral-200);border-radius:var(--radius);background:#fff;cursor:pointer;text-align:left}.quiz-btn strong{font-family:var(--title)}.quiz-btn span{color:var(--neutral-500);font-size:.86rem}.quiz-btn.correct{border-color:var(--success);background:#effaf4}.quiz-btn.wrong{border-color:var(--accent-500);background:#fdf1f0}.quiz-feedback{min-height:46px;margin-top:1rem;color:var(--neutral-600)}
.summary-header{max-width:720px;margin:0 auto 1.6rem;text-align:center}.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}.takeaway{display:flex;gap:1rem;align-items:center;margin-top:1.2rem;padding:1.2rem 1.35rem;border:1px solid rgba(29,138,156,.32);border-radius:var(--radius-lg);background:var(--primary-50)}
.nav{position:fixed;bottom:1.45rem;left:50%;z-index:1000;display:flex;gap:.55rem;align-items:center;padding:.42rem .68rem;border:1px solid var(--neutral-200);border-radius:999px;background:rgba(255,255,255,.98);box-shadow:var(--shadow);transform:translateX(-50%)}.nav-button{display:inline-flex;width:44px;height:44px;align-items:center;justify-content:center;border:1px solid var(--neutral-200);border-radius:50%;background:transparent;cursor:pointer}.nav-button:hover:not(:disabled){border-color:var(--primary-500);background:var(--primary-50)}.nav-button:disabled{opacity:.35;cursor:not-allowed}.dots{display:flex;align-items:center}.dot{position:relative;width:31px;height:44px;border:0;background:transparent;cursor:pointer}.dot::before{content:"";position:absolute;top:50%;left:50%;width:8px;height:8px;border-radius:99px;background:var(--neutral-500);transform:translate(-50%,-50%)}.dot[aria-current=step]::before{width:21px;background:var(--primary-700)}.count{min-width:48px;color:var(--neutral-500);font-size:.72rem;text-align:center}
@keyframes revealUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes revealLeft{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}@keyframes revealScale{from{opacity:0;transform:scale(.975)}to{opacity:1;transform:scale(1)}}
.reveal{opacity:0;will-change:opacity,transform}.reveal-up{transform:translateY(18px)}.reveal-left{transform:translateX(-20px)}.reveal-scale{transform:scale(.975)}.delay-0{--reveal-delay:.04s}.delay-1{--reveal-delay:.12s}.delay-2{--reveal-delay:.2s}.delay-3{--reveal-delay:.3s}.delay-4{--reveal-delay:.4s}
.slide.entered .reveal-up{animation:revealUp .5s var(--reveal-delay,0s) cubic-bezier(.16,1,.3,1) both}.slide.entered .reveal-left{animation:revealLeft .52s var(--reveal-delay,0s) cubic-bezier(.16,1,.3,1) both}.slide.entered .reveal-scale{animation:revealScale .5s var(--reveal-delay,0s) cubic-bezier(.16,1,.3,1) both}
.stagger-children>*{opacity:0;transform:translateY(14px)}.slide.entered .stagger-children>*{animation:revealUp .46s calc(var(--reveal-delay,.14s) + var(--item-delay,0s)) cubic-bezier(.16,1,.3,1) both}.stagger-children>:nth-child(1){--item-delay:0s}.stagger-children>:nth-child(2){--item-delay:.07s}.stagger-children>:nth-child(3){--item-delay:.14s}.stagger-children>:nth-child(4){--item-delay:.21s}.stagger-children>:nth-child(5){--item-delay:.28s}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.001ms!important}.slide{transform:none!important}.reveal,.stagger-children>*{opacity:1!important;transform:none!important}}
@media (max-height:680px) and (min-width:901px){.slide{padding-top:1.35rem;padding-bottom:8.2rem}.inner{margin-block:0}.title{font-size:clamp(2rem,4vw,3.25rem)}.cover .inner{gap:1.4rem}.cover-copy{gap:.68rem}.objective-list{font-size:.78rem;gap:.25rem}.lead{font-size:.92rem;line-height:1.55}.cover .hero-panel figure{aspect-ratio:16/7}.metadata{padding:.68rem 1rem}.meta-row{padding:.42rem 0}.meta-row .icon-shell{width:34px;height:34px}.meta-row strong{font-size:.82rem}.meta-row span{font-size:.72rem}}
@media (max-width:900px){html,body{overflow:auto}.slide{position:relative;display:none;min-height:100vh;padding:1.4rem 1rem 7.8rem}.slide.active{display:flex}.cover .inner,.concept .inner,.tabpanel{grid-template-columns:1fr}.cover .inner{gap:1.55rem}.cover-copy{gap:.85rem}.grid-2,.grid-3,.grid-4,.flow,.summary-grid{grid-template-columns:1fr}.flip-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}.flip-card,.flip-inner{min-height:154px}.flip-front,.flip-back{padding:.85rem}.flip-front .icon-lg{width:28px;height:28px}.flip-front h3,.flip-back h3{font-size:.95rem}.flip-back p{font-size:.76rem;line-height:1.34}.flip-hint{font-size:.58rem;letter-spacing:.05em}.hero-panel{max-width:520px}.cover .hero-panel figure{aspect-ratio:16/7}.metadata{padding:.62rem 1rem .72rem}.meta-row{padding:.46rem 0}.meta-row .icon-shell{width:34px;height:34px;flex:0 0 34px}.meta-row strong{font-size:.82rem}.meta-row span{font-size:.72rem}.mission-layout{display:flex!important;flex-direction:column;gap:1rem;align-items:stretch}.mission-layout .section-title{font-size:2rem;line-height:1.08}.mission-layout .lead{font-size:.92rem;line-height:1.55}.mission-layout .ms-panel{padding:1rem;border-radius:16px}.mission-layout .ms-title{font-size:1.05rem}.mission-layout .ms-sub{font-size:.78rem;margin-bottom:.7rem}.mission-layout .ms-list{gap:.48rem}.mission-layout .ms-item{min-height:48px;padding:.65rem .75rem;font-size:.82rem;line-height:1.28}.mission-layout .ms-check{width:18px;height:18px;flex:0 0 18px}.mission-layout .xp-label{margin:.75rem 0 .28rem}.mission-layout .ms-badge{margin-top:.55rem;font-size:.82rem}.nav{right:.65rem;left:.65rem;bottom:.75rem;transform:none;justify-content:center;gap:.28rem;overflow-x:hidden}.nav-button{width:38px;height:38px}.dot{width:22px;height:38px}.dot[aria-current=step]::before{width:18px}.count{min-width:36px;font-size:.68rem}}
</style>
</head>
<body>
<a class="skip-link" href="#slide-1">Ir para o conteúdo</a>
<div class="progress" id="progress" role="progressbar" aria-label="Progresso dos slides" aria-valuemin="1" aria-valuemax="12" aria-valuenow="1"></div>
<main class="stage" id="slide-1">
${slide('slide-1', 'Slide 1: abertura', 'cover active', `
  <div class="inner">
    <div class="cover-copy">
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Fundamentos de Administração</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Comece pela base</p>
      <h1 class="title reveal reveal-up delay-2">O papel da administração no <span class="highlight">pequeno negócio</span></h1>
      <p class="lead reveal reveal-up delay-3">Você vai enxergar a empresa como um sistema simples: rotina, prioridades, decisões e controle básico para não depender só da memória.</p>
      <ul class="objective-list reveal reveal-up delay-3" aria-label="Objetivos de aprendizagem">
        <li>Reconhecer as quatro funções da administração no dia a dia.</li>
        <li>Separar urgência, importância e tarefas que podem esperar.</li>
        <li>Criar uma rotina mínima de gestão para testar nesta semana.</li>
      </ul>
      <button class="button reveal reveal-up delay-4" type="button" data-next>${icon('arrow-right')} Iniciar capítulo</button>
    </div>
    <aside class="hero-panel reveal reveal-scale delay-2">
      <figure><img src="images/capitulo-01-gestao-rotina.jpg" alt="Empreendedora revisando a rotina de gestão em um pequeno negócio."></figure>
      <div class="metadata">
        <div class="meta-row"><span class="icon-shell">${icon('target')}</span><div><strong>Objetivo</strong><span>Organizar esforço diário em resultado previsível.</span></div></div>
        <div class="meta-row"><span class="icon-shell">${icon('clock')}</span><div><strong>Tempo sugerido</strong><span>35 a 45 minutos com prática.</span></div></div>
      </div>
    </aside>
  </div>`)}
${slide('slide-2', 'Slide 2: mapa do capítulo', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Mapa</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="tag">O que você vai praticar</span>
      <h2 class="section-title">Administração aqui é <span class="highlight">organizar o trabalho real</span></h2>
      <p class="lead" style="margin:.75rem auto 0">Não é teoria distante. É saber o que precisa acontecer, quem cuida, quando revisa e como corrige.</p>
    </header>
    <div class="summary-grid stagger-children delay-2">
      <article class="card"><span class="icon-shell">${icon('storefront')}</span><h3>Enxergar o negócio</h3><p>Você vai separar venda, entrega, cobrança e relacionamento para entender o sistema.</p></article>
      <article class="card"><span class="icon-shell">${icon('calendar-check')}</span><h3>Criar rotina mínima</h3><p>Você vai transformar tarefas repetidas em um checklist simples e útil.</p></article>
      <article class="card"><span class="icon-shell">${icon('chart-bar')}</span><h3>Medir o básico</h3><p>Você vai acompanhar sinais que mostram se a empresa está melhorando ou apenas correndo.</p></article>
    </div>
  </div>`)}
${slide('slide-3', 'Slide 3: conceito central', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-01-gestao-rotina.jpg" alt="Profissional analisando informações de gestão.">
      <figcaption>Administração começa quando você tira decisões importantes da cabeça e coloca em uma rotina visível.</figcaption>
    </figure>
    <div class="concept-copy">
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Conceito</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Ideia central</p>
      <h2 class="section-title reveal reveal-up delay-2">Administrar é decidir <span class="highlight">o que será feito, por quem e com qual padrão</span></h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('path')}</span><div><h3>Caminho claro</h3><p>Você sabe o começo, o meio e o fim das tarefas críticas.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('users-three')}</span><div><h3>Responsável visível</h3><p>Mesmo que a empresa seja pequena, cada rotina precisa de um dono.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('check-circle')}</span><div><h3>Padrão mínimo</h3><p>O cliente não deve depender do humor ou da memória de quem atende.</p></div></article>
      </div>
    </div>
  </div>`)}
${slide('slide-4', 'Slide 4: quatro funções da administração', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Funções essenciais</span></p>
    <header style="max-width:780px;margin-bottom:1.4rem">
      <p class="eyebrow reveal reveal-up delay-1">Base prática</p>
      <h2 class="section-title reveal reveal-up delay-2">Quatro funções que aparecem <span class="highlight">todo dia</span></h2>
    </header>
    <div class="grid-4 stagger-children delay-3">
      <article class="card"><span class="icon-shell">${icon('target')}</span><h3>Planejar</h3><p>Escolher prioridade, prazo e resultado esperado antes de sair executando.</p></article>
      <article class="card"><span class="icon-shell">${icon('gear')}</span><h3>Organizar</h3><p>Distribuir tarefas, recursos, horários e informações importantes.</p></article>
      <article class="card"><span class="icon-shell">${icon('users-three')}</span><h3>Dirigir</h3><p>Acompanhar pessoas, orientar decisões e remover travas do caminho.</p></article>
      <article class="card"><span class="icon-shell">${icon('chart-bar')}</span><h3>Controlar</h3><p>Conferir se o combinado aconteceu e corrigir antes de virar prejuízo.</p></article>
    </div>
    <div class="callout reveal reveal-up delay-4" style="margin-top:1.1rem">${icon('lightbulb')} <p><strong>Guarde:</strong> você pode executar tudo sozinho, mas precisa pensar nessas quatro funções separadamente.</p></div>
  </div>`)}
${slide('slide-5', 'Slide 5: comparação interativa de prioridades', 'tabs-slide', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Interativo</span></p>
    <header style="margin-bottom:1.2rem">
      <p class="eyebrow reveal reveal-up delay-1">Prioridade sem confusão</p>
      <h2 class="section-title reveal reveal-up delay-2">Clique nas abas e compare <span class="highlight">como decidir o que vem primeiro</span></h2>
    </header>
    <div class="tabs reveal reveal-scale delay-3">
      <div class="tablist" role="tablist" aria-label="Tipos de tarefa">
        <button class="tab" id="tab-1" role="tab" aria-selected="true" aria-controls="panel-1">Urgente</button>
        <button class="tab" id="tab-2" role="tab" aria-selected="false" aria-controls="panel-2" tabindex="-1">Importante</button>
        <button class="tab" id="tab-3" role="tab" aria-selected="false" aria-controls="panel-3" tabindex="-1">Pode esperar</button>
      </div>
      <div class="tabpanel" id="panel-1" role="tabpanel" aria-labelledby="tab-1">
        <div><h3>Precisa de resposta rápida</h3><p>É a tarefa que, se ignorada hoje, cria perda clara: cliente esperando, entrega atrasada, pagamento vencendo.</p></div>
        <aside class="side-note"><p class="eyebrow">Cuidado</p><strong>Urgência repetida mostra falha de rotina.</strong><p>Se tudo vira emergência, falta planejamento ou padrão.</p></aside>
      </div>
      <div class="tabpanel" id="panel-2" role="tabpanel" aria-labelledby="tab-2" hidden>
        <div><h3>Sustenta o negócio</h3><p>É o que protege caixa, cliente e qualidade, mesmo quando ninguém está cobrando agora.</p></div>
        <aside class="side-note"><p class="eyebrow">Exemplo</p><strong>Conferir estoque antes da compra.</strong><p>Não parece urgente, mas evita falta e dinheiro parado.</p></aside>
      </div>
      <div class="tabpanel" id="panel-3" role="tabpanel" aria-labelledby="tab-3" hidden>
        <div><h3>Não move o resultado principal</h3><p>É a tarefa que pode ser agendada sem prejudicar caixa, cliente ou operação.</p></div>
        <aside class="side-note"><p class="eyebrow">Decisão</p><strong>Agende, delegue ou elimine.</strong><p>Não deixe uma tarefa confortável ocupar o lugar da tarefa necessária.</p></aside>
      </div>
    </div>
  </div>`)}
${slide('slide-6', 'Slide 6: método em cinco passos', 'tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Método</span></p>
    <header style="max-width:760px">
      <p class="eyebrow reveal reveal-up delay-1">Roteiro operacional</p>
      <h2 class="section-title reveal reveal-up delay-2">Cinco passos para criar sua <span class="highlight">rotina mínima de gestão</span></h2>
    </header>
    <div class="flow stagger-children delay-3">
      <article class="step"><span>1</span><h3>Liste</h3><p>Escreva as atividades que se repetem toda semana.</p></article>
      <article class="step"><span>2</span><h3>Separe</h3><p>Marque o que gera venda, entrega, cobrança e relacionamento.</p></article>
      <article class="step"><span>3</span><h3>Defina dono</h3><p>Escolha quem acompanha cada rotina, mesmo que seja você.</p></article>
      <article class="step"><span>4</span><h3>Agende</h3><p>Coloque revisão fixa no calendário para não depender da memória.</p></article>
      <article class="step"><span>5</span><h3>Melhore</h3><p>Registre uma correção pequena por semana.</p></article>
    </div>
  </div>`)}
${slide('slide-7', 'Slide 7: flip cards de conceitos', '', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Fixação</span></p>
    <header style="margin-bottom:1.35rem;max-width:760px">
      <p class="eyebrow reveal reveal-up delay-1">Clique para revelar</p>
      <h2 class="section-title reveal reveal-up delay-2">Quatro termos que você precisa <span class="highlight">dominar sem jargão</span></h2>
    </header>
    <div class="flip-grid reveal reveal-scale delay-3">
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Gestão"><div class="flip-inner"><div class="flip-front">${icon('briefcase','icon-lg')}<h3>Gestão</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Gestão</h3><p>É acompanhar o que precisa acontecer para a empresa vender, entregar, cobrar e melhorar.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Processo"><div class="flip-inner"><div class="flip-front">${icon('path','icon-lg')}<h3>Processo</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Processo</h3><p>É o caminho combinado para uma tarefa sair do começo ao fim com menos erro.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Rotina"><div class="flip-inner"><div class="flip-front">${icon('calendar-check','icon-lg')}<h3>Rotina</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Rotina</h3><p>É uma ação repetida no dia certo, do jeito certo, para evitar improviso.</p></div></div></div>
      <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button" aria-label="Virar card Prioridade"><div class="flip-inner"><div class="flip-front">${icon('target','icon-lg')}<h3>Prioridade</h3><span class="flip-hint">Clique para revelar</span></div><div class="flip-back"><h3>Prioridade</h3><p>É aquilo que protege caixa, cliente e entrega antes das tarefas menos importantes.</p></div></div></div>
    </div>
  </div>`)}
${slide('slide-8', 'Slide 8: estudo de caso Padaria São Bento', 'concept', `
  <div class="inner">
    <figure class="photo-card reveal reveal-left delay-1">
      <img src="images/capitulo-01-padaria-rotina.jpg" alt="Dono de pequena padaria conferindo documentos e rotina de produção.">
      <figcaption>Padaria São Bento: vendas boas, mas falta de rotina gerava perda e falta de produto no horário de pico.</figcaption>
    </figure>
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Estudo de caso</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Situação realista</p>
      <h2 class="section-title reveal reveal-up delay-2">A padaria vendia bem, mas <span class="highlight">não conseguia prever a operação</span></h2>
      <div class="feature-list stagger-children delay-3">
        <article class="feature"><span class="icon-shell">${icon('warning')}</span><div><h3>Problema</h3><p>Faltava pão no pico e sobrava produto no fim do dia.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('notebook')}</span><div><h3>Causa provável</h3><p>Pedidos e produção dependiam de anotações soltas e memória.</p></div></article>
        <article class="feature"><span class="icon-shell">${icon('check-circle')}</span><div><h3>Correção</h3><p>Rotina de previsão, conferência e registro único de encomendas.</p></div></article>
      </div>
    </div>
  </div>`)}
${slide('slide-9', 'Slide 9: análise do caso em accordion', 'tint', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Análise guiada</span></p>
    <header style="margin-bottom:1.35rem">
      <p class="eyebrow reveal reveal-up delay-1">Abra cada parte</p>
      <h2 class="section-title reveal reveal-up delay-2">Veja como transformar problema em <span class="highlight">rotina de gestão</span></h2>
    </header>
    <div class="accord-list reveal reveal-scale delay-3">
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">1. O que estava fora de controle?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>Produção, encomendas e conferência do estoque não tinham horário nem padrão. O dono só percebia o erro quando o cliente já era afetado.</p></div></div></div>
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">2. Qual foi a rotina criada?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>Previsão por dia da semana, conferência às 11h e registro único de encomendas. Poucas regras, mas usadas todos os dias.</p></div></div></div>
      <div class="accord-item"><button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">3. O que você deve copiar desse caso?<svg class="accord-caret" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button><div class="accord-body"><div class="accord-content"><p>Escolha uma rotina crítica, defina horário de revisão e use um único lugar para registrar informações. Comece pequeno e mantenha.</p></div></div></div>
    </div>
  </div>`)}
${slide('slide-10', 'Slide 10: checklist interativo', 'dark', `
  <div class="inner mission-layout">
    <div>
      <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Missão prática</span></p>
      <p class="eyebrow reveal reveal-up delay-1">Marque conforme concluir</p>
      <h2 class="section-title reveal reveal-up delay-2">Crie sua primeira <span class="highlight">rotina semanal de gestão</span></h2>
      <p class="lead reveal reveal-up delay-3">A missão não é criar um sistema perfeito. É sair deste capítulo com uma rotina mínima que você consegue repetir na próxima semana.</p>
    </div>
    <div class="ms-panel reveal reveal-scale delay-2">
      <p class="ms-title">Sua missão desta semana</p>
      <p class="ms-sub">Clique para marcar cada etapa concluída.</p>
      <div class="ms-list">
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Listar 5 tarefas que se repetem toda semana</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Escolher 1 rotina crítica para padronizar</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Definir dia e horário fixo de revisão</div>
        <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0"><div class="ms-check"></div>Registrar o primeiro ajuste da semana</div>
      </div>
      <div class="xp-label"><span>Progresso</span><span class="xp-pct">0%</span></div>
      <div class="xp-track"><div class="xp-bar"></div></div>
      <div class="ms-badge">Missão completa.</div>
    </div>
  </div>`)}
${slide('slide-11', 'Slide 11: mini quiz', '', `
  <div class="inner narrow">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Checagem rápida</span></p>
    <header style="margin-bottom:1rem">
      <p class="eyebrow reveal reveal-up delay-1">Teste sua decisão</p>
      <h2 class="section-title reveal reveal-up delay-2">Qual ação representa melhor uma <span class="highlight">rotina de gestão</span>?</h2>
    </header>
    <div class="quiz-options reveal reveal-scale delay-3" data-quiz>
      <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('warning')}</span><div><strong>A</strong><br><span>Resolver tudo quando o problema aparecer, porque a empresa é pequena.</span></div></button>
      <button class="quiz-btn" type="button" data-answer="correct"><span class="icon-shell">${icon('check-circle')}</span><div><strong>B</strong><br><span>Conferir caixa, entregas e pendências toda sexta-feira, no mesmo horário.</span></div></button>
      <button class="quiz-btn" type="button" data-answer="wrong"><span class="icon-shell">${icon('clock')}</span><div><strong>C</strong><br><span>Guardar as informações principais na memória para ganhar tempo.</span></div></button>
    </div>
    <p class="quiz-feedback" aria-live="polite">Escolha uma alternativa.</p>
  </div>`)}
${slide('slide-12', 'Slide 12: síntese e próximo passo', 'summary tint', `
  <div class="inner">
    <p class="slide-context reveal reveal-up delay-0"><strong>Capítulo 1</strong><span>·</span><span>Fechamento</span></p>
    <header class="summary-header reveal reveal-up delay-1">
      <span class="tag">Síntese</span>
      <h2 class="section-title">O que você deve levar para a <span class="highlight">próxima semana</span></h2>
    </header>
    <div class="summary-grid stagger-children delay-2">
      <article class="card"><span class="icon-shell">${icon('briefcase')}</span><h3>Administração é prática</h3><p>Ela aparece em compra, venda, entrega, cobrança e atendimento.</p></article>
      <article class="card"><span class="icon-shell">${icon('calendar-check')}</span><h3>Rotina reduz improviso</h3><p>O controle básico evita esquecimento, retrabalho e urgências repetidas.</p></article>
      <article class="card"><span class="icon-shell">${icon('target')}</span><h3>Prioridade protege resultado</h3><p>Comece pelo que sustenta caixa, cliente e operação.</p></article>
    </div>
    <div class="takeaway reveal reveal-up delay-4"><span class="icon-shell">${icon('lightbulb')}</span><div><h3>Próximo passo</h3><p>Antes de avançar para planejamento, escolha uma rotina e teste um checklist por sete dias.</p></div></div>
  </div>`)}
</main>
<nav class="nav" aria-label="Navegação dos slides">
  <button class="nav-button" id="previous" type="button" aria-label="Slide anterior" disabled>${icon('arrow-left')}</button>
  <div class="dots" id="dots" aria-label="Selecionar slide"></div>
  <span class="count" id="count" aria-live="polite">1 / 12</span>
  <button class="nav-button" id="next" type="button" aria-label="Próximo slide">${icon('arrow-right')}</button>
</nav>
<script>
var learnerRuntime=(function(){
  var api=null, initialized=false, finished=false, key='scorm12:'+location.pathname;
  function findAPI(win){ var depth=0; while(win && depth<8){ if(win.API)return win.API; if(win.parent===win)break; win=win.parent; depth++; } try{ if(window.opener && window.opener.API)return window.opener.API; }catch(e){} return null; }
  function init(){ if(initialized)return; try{ api=findAPI(window); if(api){ api.LMSInitialize(''); } initialized=true; }catch(e){ initialized=true; } }
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
  checks:[].map.call(document.querySelectorAll('.ms-item'),function(el){return el.classList.contains('done');}),
  flips:[].map.call(document.querySelectorAll('.flip-card'),function(el){return el.classList.contains('flipped');}),
  accordions:[].map.call(document.querySelectorAll('.accord-btn'),function(el){return el.getAttribute('aria-expanded')==='true';}),
  quizzes:[].map.call(document.querySelectorAll('[data-quiz] .quiz-btn'),function(el){return el.classList.contains('correct')?'correct':(el.classList.contains('wrong')?'wrong':'');})
}; }
function applyLearnerState(state){ if(!state)return; [].forEach.call(document.querySelectorAll('.ms-item'),function(el,i){ if(state.checks&&state.checks[i]){ el.classList.add('done'); el.setAttribute('aria-checked','true'); } }); document.querySelectorAll('.ms-panel').forEach(function(panel){ var items=panel.querySelectorAll('.ms-item'); var done=[].filter.call(items,function(i){return i.classList.contains('done')}).length; var pct=items.length?Math.round(done/items.length*100):0; panel.querySelector('.xp-bar').style.width=pct+'%'; panel.querySelector('.xp-pct').textContent=pct+'%'; panel.querySelector('.ms-badge').classList.toggle('earned', pct===100); }); [].forEach.call(document.querySelectorAll('.flip-card'),function(el,i){ if(state.flips&&state.flips[i]){ el.classList.add('flipped'); el.setAttribute('aria-pressed','true'); } else { el.setAttribute('aria-pressed','false'); } }); [].forEach.call(document.querySelectorAll('.accord-btn'),function(el,i){ var open=!!(state.accordions&&state.accordions[i]); el.setAttribute('aria-expanded',String(open)); el.nextElementSibling.classList.toggle('open',open); }); [].forEach.call(document.querySelectorAll('[data-quiz] .quiz-btn'),function(el,i){ el.setAttribute('aria-pressed','false'); if(state.quizzes&&state.quizzes[i]){ el.classList.add(state.quizzes[i]); el.setAttribute('aria-pressed','true'); } }); }
function saveLearnerState(){ learnerRuntime.save(learnerRuntime.current+1,collectLearnerState()); }
function updateQuizScore(force){ var quizzes=[].slice.call(document.querySelectorAll('[data-quiz]')); if(!quizzes.length)return; var answered=0, correct=0; quizzes.forEach(function(quiz){ var selected=quiz.querySelector('.quiz-btn.correct,.quiz-btn.wrong'); if(selected){ answered++; if(selected.classList.contains('correct'))correct++; } }); if(answered || force){ learnerRuntime.score(Math.round(correct/quizzes.length*100)); } }
function doFlip(card){ card.classList.toggle('flipped'); card.setAttribute('aria-pressed',String(card.classList.contains('flipped'))); saveLearnerState(); }
function toggleAcc(btn){ var open = btn.getAttribute('aria-expanded') === 'true'; btn.setAttribute('aria-expanded', String(!open)); btn.nextElementSibling.classList.toggle('open', !open); saveLearnerState(); }
function msTgl(el){ el.classList.toggle('done'); el.setAttribute('aria-checked', String(el.classList.contains('done'))); var panel=el.closest('.ms-panel'); var items=panel.querySelectorAll('.ms-item'); var done=[].filter.call(items,function(i){return i.classList.contains('done')}).length; var pct=Math.round(done/items.length*100); panel.querySelector('.xp-bar').style.width=pct+'%'; panel.querySelector('.xp-pct').textContent=pct+'%'; panel.querySelector('.ms-badge').classList.toggle('earned', pct===100); saveLearnerState(); }
document.addEventListener('keydown', function(e){ if((e.key==='Enter'||e.key===' ') && e.target.classList.contains('ms-item')){ e.preventDefault(); msTgl(e.target); } if((e.key==='Enter'||e.key===' ') && e.target.classList.contains('flip-card')){ e.preventDefault(); doFlip(e.target); } });
(function(){
  var slides=[].slice.call(document.querySelectorAll('.slide'));
  var dots=document.getElementById('dots'), progress=document.getElementById('progress'), count=document.getElementById('count'), previous=document.getElementById('previous'), next=document.getElementById('next'), current=0;
  slides.forEach(function(slide,index){ var dot=document.createElement('button'); dot.type='button'; dot.className='dot'; dot.setAttribute('aria-label','Ir para slide '+(index+1)+' de '+slides.length); dot.addEventListener('click',function(){showSlide(index,true)}); dots.appendChild(dot); });
  function playSlideEntrance(slide){ slide.classList.remove('entered'); void slide.offsetWidth; slide.classList.add('entered'); }
  function showSlide(index, moveFocus){ if(index<0||index>=slides.length)return; slides.forEach(function(slide,i){ var active=i===index; slide.classList.toggle('active',active); slide.setAttribute('aria-hidden',String(!active)); slide.inert=!active; }); current=index; learnerRuntime.current=current; [].forEach.call(dots.children,function(dot,i){ if(i===index)dot.setAttribute('aria-current','step'); else dot.removeAttribute('aria-current'); }); progress.style.width=((index+1)/slides.length*100)+'%'; progress.setAttribute('aria-valuenow',String(index+1)); count.textContent=(index+1)+' / '+slides.length; previous.disabled=index===0; next.disabled=index===slides.length-1; playSlideEntrance(slides[index]); saveLearnerState(); if(index===slides.length-1){ updateQuizScore(true); learnerRuntime.complete(); } if(moveFocus)slides[index].focus(); }
  previous.addEventListener('click',function(){showSlide(current-1,true)}); next.addEventListener('click',function(){showSlide(current+1,true)});
  var start=document.querySelector('[data-next]'); if(start) start.addEventListener('click',function(){showSlide(1,true)});
  document.addEventListener('keydown',function(event){ if(event.target.closest('button,[role=tab],.flip-card,.ms-item'))return; if(event.key==='ArrowRight'||event.key==='ArrowDown')showSlide(current+1,true); if(event.key==='ArrowLeft'||event.key==='ArrowUp')showSlide(current-1,true); });
  var tabs=[].slice.call(document.querySelectorAll('.tab')); var panels=[].slice.call(document.querySelectorAll('.tabpanel'));
  function selectTab(index,focus){ tabs.forEach(function(tab,i){ var selected=i===index; tab.setAttribute('aria-selected',String(selected)); tab.tabIndex=selected?0:-1; panels[i].hidden=!selected; }); if(focus)tabs[index].focus(); }
  tabs.forEach(function(tab,index){ tab.addEventListener('click',function(){selectTab(index,false)}); tab.addEventListener('keydown',function(event){ if(event.key!=='ArrowRight'&&event.key!=='ArrowLeft')return; event.preventDefault(); selectTab((index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length,true); }); });
  document.querySelectorAll('[data-quiz] .quiz-btn').forEach(function(btn){ btn.setAttribute('aria-pressed','false'); btn.addEventListener('click',function(){ var root=btn.closest('[data-quiz]'); root.querySelectorAll('.quiz-btn').forEach(function(b){ b.classList.remove('correct','wrong'); b.setAttribute('aria-pressed','false'); }); var ok=btn.dataset.answer==='correct'; btn.classList.add(ok?'correct':'wrong'); btn.setAttribute('aria-pressed','true'); document.querySelector('.quiz-feedback').textContent=ok?'Correto. Rotina boa tem dia, horário e foco claro.':'Ainda não. A rotina de gestão precisa ser previsível, registrada e repetível.'; updateQuizScore(false); saveLearnerState(); }); });
  var restored=learnerRuntime.restore(); applyLearnerState(restored.suspend);
  showSlide(Math.min(restored.locationIndex,slides.length-1),false);
})();
window.addEventListener('beforeunload',function(){ saveLearnerState(); learnerRuntime.finish(); });
</script>
</body>
</html>`;

setupAssets();
fs.writeFileSync(htmlPath, html, 'utf8');
console.log(JSON.stringify({ htmlPath, slides: 12 }, null, 2));
