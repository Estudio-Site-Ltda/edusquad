---
name: scorm-builder
description: Gera um pacote SCORM 1.2 completo em duas etapas — primeiro cria slides HTML educacionais (baseados no template slide.html) e depois empacota como SCORM pronto para upload em qualquer LMS (Moodle, Hotmart, Teachable, Canvas LMS). Use quando o usuário pedir "SCORM", "pacote e-learning", "módulo para LMS", "curso interativo para Moodle/Hotmart" ou qualquer conteúdo que precise ser importado em uma plataforma EAD.
type: hybrid
version: 2.0.0
categories: [conteudo, lms, scorm, elearning, interativo]
---

# SCORM Builder

Gera um **pacote SCORM 1.2** em duas etapas bem definidas:

---

## PROIBIÇÕES ABSOLUTAS — Nunca aparecer no produto final

O aluno nunca deve ver termos de produção, metodologia ou formato editorial no slide. Qualquer texto visível no HTML é lido pelo aluno — não existe "rodapé interno".

| Nunca escrever | Por quê |
|---|---|
| "PLR", "PLR Personalizável", "Produto com PLR" | Jargão de produtor, invisível e sem sentido para o aluno |
| "Taxonomia de Bloom", "verbo de Bloom", "nível cognitivo" | Linguagem técnica de design instrucional |
| "Scaffolding", "andragogia", "metacognição" | Jargão acadêmico que não pertence ao conteúdo do curso |
| "Objetivo de aprendizagem (nível X)" | Rótulo interno; substitua pelo benefício concreto ao aluno |
| "Slide de conceito", "slide de síntese", "tipo: cover" | Nomenclatura do template, não do curso |
| Nome do agente, Run ID, nome do squad | Artefatos de pipeline que nunca devem vazar |
| "Estúdio Site", "EduSquad", "gerado por IA" | Metadados de produção |

**Regra para o `.slide-context` (breadcrumb no topo do slide):**
Somente `{Nome do Curso} · Módulo {N} de {Total}`. Nenhum outro rótulo.

```html
<!-- CORRETO -->
<p class="slide-context"><strong>Venda pelo WhatsApp</strong><span>·</span><span>Módulo</span><strong>01</strong><span>de 04</span></p>

<!-- ERRADO — nunca fazer -->
<p class="slide-context"><strong>Venda pelo WhatsApp</strong><span>|</span><span>Módulo 01</span><span>|</span><strong>PLR Personalizável</strong></p>
```

---

1. **Slides HTML** — arquivo `index.html` autocontido com CSS e JS inline, baseado no template `assets/templates/slides/slide.html`
2. **Empacotamento SCORM** — `imsmanifest.xml` + pasta `media/` + `.zip` pronto para LMS

---

## Estrutura de Saída

```
squads/{nome}/output/{run_id}/{step}/
  index.html                          ← arquivo único com tudo inline
  imsmanifest.xml                     ← manifesto SCORM 1.2
  README-SCORM.txt                    ← instruções de upload
  media/
    fonts/
      BricolageGrotesque-Variable.ttf ← copiado de assets/fonts/
      PlusJakartaSans-Variable.ttf    ← copiado de assets/fonts/
      OFL-BricolageGrotesque.txt
      OFL-PlusJakartaSans.txt
    images/
      {nome-descritivo-leonardo}.jpg  ← geradas com a skill leonardo
    icons/
      {nome}-duotone.svg              ← copiados de assets/icons/duotone/
  {id-do-modulo}-scorm-1.2.zip       ← pacote final para upload
```

> **Regra de ouro**: tudo vive em `index.html`. Nenhum arquivo CSS ou JS externo.

---

## ETAPA 0 — Leia o Design System

**Obrigatório:** leia `DESIGN.md` na raiz do projeto antes de qualquer coisa.

Se `DESIGN.md` não existir, use os valores do template `assets/templates/slides/slide.html` como fallback (já embutidos abaixo).

### Mapeamento DESIGN.md → CSS Tokens

| Variável CSS | Campo em DESIGN.md |
|---|---|
| `--primary-500` | Cor Primária |
| `--primary-700` | Cor Primária Escura |
| `--primary-50` / `--primary-100` / `--primary-200` | Escalas claras da primária |
| `--accent-500` / `--accent-700` | Cor de Destaque |
| `--neutral-900` | Cor de Texto Principal |
| `--neutral-500` | Texto Secundário/Suave |
| `--neutral-50` | Cor de Fundo |
| `--neutral-200` | Cor de Borda |
| `--success` | Cor Sucesso |
| `--title` | Fonte de Títulos |
| `--body` | Fonte de Corpo |

**Fallback** (sem DESIGN.md):
```css
--primary-50:  #eff9fb; --primary-100: #d7f0f4; --primary-200: #b2e0e8;
--primary-500: #1d8a9c; --primary-700: #145c6c; --primary-900: #103b45;
--accent-500:  #d9534f; --accent-700:  #9d3836;
--neutral-0:   #ffffff; --neutral-50:  #f8fafb; --neutral-100: #eef2f4;
--neutral-200: #d9e2e7; --neutral-500: #5d6e78; --neutral-600: #43515a;
--neutral-900: #141a1d;
--success: #216b42; --focus: #d9534f;
--title: "Bricolage Grotesque", Georgia, serif;
--body:  "Plus Jakarta Sans", Arial, sans-serif;
```

---

## ETAPA 1 — Gerar Imagens Inéditas (`criar-imagem-leonardo`)

Use a skill [`criar-imagem-leonardo`](../criar-imagem-leonardo/SKILL.md) para gerar as imagens **antes** de construir os slides.

- Gere **ao menos 3 imagens inéditas por módulo/pacote**: capa + uma imagem de conteúdo + uma imagem de caso, contexto ou aplicação
- Cada módulo deve ter suas próprias imagens; **não reutilize imagens de módulos ou pacotes anteriores**, mesmo quando pertencerem ao mesmo curso
- Salve em `media/images/` com nome descritivo: `{tema}-{estilo}-leonardo-{hash}.jpg`
- Estilo recomendado: `lucid realism` ou o definido em DESIGN.md
- Descreva cenas reais, com profissionais, ambientes de trabalho ou contextos do tema
- Nunca use imagens genéricas ou abstratas demais
- Confirme no HTML que as três imagens aparecem em pontos coerentes do roteiro e não apenas armazenadas na pasta `media/`

---

## ETAPA 2 — Selecionar Ícones Duotone

Todos os ícones vêm de `assets/icons/duotone/`. Copie para `media/icons/` apenas os usados.

Ícones mais comuns para cursos:
```
target-duotone.svg          → objetivo, foco
check-circle-duotone.svg    → confirmação, acerto
book-open-duotone.svg       → conteúdo, leitura
lightbulb-duotone.svg       → dica, insight
users-duotone.svg           → equipe, pessoas
briefcase-duotone.svg       → trabalho, profissional
graduation-cap-duotone.svg  → aprendizado
chart-bar-duotone.svg       → dados, resultados
handshake-duotone.svg       → parceria, acordo
magnifying-glass-duotone.svg → análise, busca
warning-circle-duotone.svg  → atenção, alerta
arrow-right-duotone.svg     → navegação
arrow-left-duotone.svg      → navegação
```

Referência: `assets/icons/duotone/{nome}-duotone.svg`

**Regra de componente:** todo contêiner visual `.icon-shell` deve definir `width` e `height` explicitamente com o mesmo valor. Não use somente `flex-basis`, pois em cards de grid a largura pode acompanhar o SVG e gerar caixas desalinhadas.

---

## ETAPA 3 — Construir index.html

### Regras Obrigatórias

- **Mínimo 10 slides** por módulo
- **1 arquivo HTML autocontido** — CSS e JS 100% inline
- **Fontes locais** via `@font-face` apontando para `media/fonts/`
- **Imagens e ícones** referenciados como `media/images/` e `media/icons/`
- **SCORM API 1.2** embutida no `<script>` do HTML
- **Sem dependências externas** (sem CDN, sem Google Fonts)

### Tipos de Slide Disponíveis

| Tipo | Classe CSS | Uso |
|---|---|---|
| Capa | `.cover` | Slide 1 — abertura, hero image |
| Hook / Impacto | `.dark` | Fundo escuro — stat grande, gráfico de barras animado |
| Tinted / Separador | `.tint` | Fundo primário claro — transições narrativas |
| Conceito | `.concept` | Foto + feature list lateral |
| Flip Cards | (custom) | Cards 3D frente/verso revelados com clique |
| Drag & Drop | (custom) | Montar pipeline ou ordenar etapas |
| Accordion | (custom) | Caso: Problema / Ação / Resultado colapsável |
| Cenário / Studio | (custom) | Chat simulado + escolha de resposta |
| XP Mission | (custom + `.dark`) | Checklist gamificado com barra de progresso |
| Abas | `.tabs-slide` | Comparação lado a lado |
| Síntese | `.summary` | Slide final — 3 cards + takeaway |

**Regra de variedade:** nunca repita o mesmo tipo de slide em dois slides consecutivos. Alterne fundos: `.dark` → padrão → `.tint` → `.dark`.

### Sequência Mínima de 10 Slides — Variando Layouts e Interações

Nunca use o mesmo tipo em dois slides seguidos. A sequência abaixo é ponto de partida; adapte ao tema do módulo.

```
01. Capa (.cover)             ← fundo padrão, hero image
02. Hook (.dark)              ← stat grande + gráfico de barras animado
03. Introdução (.tint)        ← cards de revelação ou grid de tópicos
04. Conceito (.concept)       ← foto + feature list
05. Flip cards                ← 4 cards 3D frente/verso
06. Drag & drop (.tint)       ← pipeline de etapas para montar
07. Accordion                 ← estudo de caso em 3 seções colapsáveis
08. Prática (.dark)           ← cenário de resposta ou chat simulado
09. Quiz                      ← múltipla escolha com feedback imediato
10. XP Mission (.dark)        ← checklist gamificado com barra de progresso
11. Síntese (.summary)        ← 3 cards + takeaway
```

> Mínimo de 10 slides. 11–13 é ideal para módulos com 3+ conceitos.

---

## Componentes Interativos

Inclua **ao menos um elemento interativo a cada 3 slides**. O código vai diretamente no `<script>` inline do `index.html`.

### Sistema de Animação `.entered`

Quando um slide recebe `.entered`, as animações disparam. Use classes de stagger para escalonar entradas:

```css
/* Adicione ao bloco ANIMATIONS no index.html */
@keyframes riseIn  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
@keyframes scaleIn { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
@keyframes countUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
@keyframes barFill { from{width:0%} to{width:var(--w,0%)} }

/* .c0 = imediato, .c5 = mais atrasado */
.c0{--d:.04s} .c1{--d:.13s} .c2{--d:.24s} .c3{--d:.36s} .c4{--d:.49s} .c5{--d:.63s}
.slide.entered .c0,.slide.entered .c1,.slide.entered .c2,
.slide.entered .c3,.slide.entered .c4,.slide.entered .c5 {
  animation: riseIn .55s var(--d,0s) cubic-bezier(.16,1,.3,1) both;
}
.slide.entered .cscale { animation: scaleIn .55s .08s cubic-bezier(.16,1,.3,1) both; }
.slide.entered .cbig   { animation: countUp .7s  .05s cubic-bezier(.16,1,.3,1) both; }
.slide.entered .cbar .bar-fill { animation: barFill 1.1s .35s cubic-bezier(.4,0,.2,1) both; }
```

Use `.c0` no breadcrumb, `.c1` no eyebrow/título, `.c2`+ no conteúdo. `.cbig` para número de impacto. `.cbar` no container de barras.

---

### Slide Dark (`.dark`) com Stat de Impacto

```css
.slide.dark { background:var(--primary-900); color:var(--neutral-0); }
.slide.dark .slide-context { color:rgba(255,255,255,.4); }
.slide.dark .slide-context strong { color:var(--primary-200); }
.slide.dark .section-title,.slide.dark .eyebrow { color:var(--neutral-0); }
.slide.dark .lead { color:rgba(255,255,255,.65); }
.stat-big   { font-family:var(--title); font-size:clamp(4rem,9vw,7rem); font-weight:800; line-height:1; letter-spacing:-.06em; color:var(--primary-200); }
.stat-label { font-size:.82rem; color:rgba(255,255,255,.55); text-transform:uppercase; letter-spacing:.12em; margin-bottom:1.6rem; }
.bar-row  { display:grid; gap:.65rem; }
.bar-item { display:flex; align-items:center; gap:.75rem; font-size:.82rem; color:rgba(255,255,255,.7); }
.bar-track { flex:1; height:7px; border-radius:99px; background:rgba(255,255,255,.12); overflow:hidden; }
.bar-fill  { height:100%; border-radius:99px; background:var(--primary-200); width:var(--w,0%); }
```

```html
<section class="slide dark" id="sN">
  <div class="inner" style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center">
    <div>
      <p class="slide-context c0">...</p>
      <p class="eyebrow c1">Dado real</p>
      <div class="cbig"><p class="stat-big">87%</p></div>
      <p class="stat-label c2">dos clientes ignoram mensagens sem personalização</p>
      <p class="lead c3">Contexto que conecta o dado ao aprendizado do módulo.</p>
    </div>
    <div class="cbar bar-row">
      <div class="bar-item">
        <span style="min-width:5rem">Com abordagem</span>
        <div class="bar-track"><div class="bar-fill" style="--w:87%"></div></div>
        <span>87%</span>
      </div>
      <div class="bar-item">
        <span style="min-width:5rem">Sem abordagem</span>
        <div class="bar-track"><div class="bar-fill" style="--w:23%"></div></div>
        <span>23%</span>
      </div>
    </div>
  </div>
</section>
```

---

### Flip Cards

```css
.flip-grid  { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:.9rem; }
.flip-card  { aspect-ratio:3/2; perspective:900px; cursor:pointer; }
.flip-inner { position:relative; width:100%; height:100%; transform-style:preserve-3d; transition:transform .55s cubic-bezier(.4,0,.2,1); border-radius:var(--radius-lg); }
.flip-card.flipped .flip-inner { transform:rotateY(180deg); }
.flip-front,.flip-back { position:absolute; inset:0; border-radius:var(--radius-lg); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.6rem; padding:1rem; backface-visibility:hidden; text-align:center; }
.flip-front { background:var(--primary-700); color:var(--neutral-0); }
.flip-back  { background:var(--neutral-0); transform:rotateY(180deg); border:1px solid var(--neutral-200); }
.flip-front h3 { font-family:var(--title); font-size:.88rem; color:var(--neutral-0); }
.flip-back p   { font-size:.78rem; color:var(--neutral-500); line-height:1.5; }
```

```javascript
function doFlip(card){ card.classList.toggle('flipped'); }
```

```html
<div class="flip-grid c2">
  <div class="flip-card" onclick="doFlip(this)" tabindex="0" role="button"
       onkeydown="if(event.key==='Enter'||event.key===' ')doFlip(this)" aria-label="Virar card: Conceito A">
    <div class="flip-inner">
      <div class="flip-front">
        <img class="icon-lg" src="media/icons/lightbulb-duotone.svg" alt="" aria-hidden="true">
        <h3>Conceito A</h3>
        <span style="font-size:.66rem;opacity:.6">Clique para revelar</span>
      </div>
      <div class="flip-back">
        <p>Explicação em 2–3 linhas, direta e aplicável ao contexto do aluno.</p>
      </div>
    </div>
  </div>
  <!-- repita para cada conceito -->
</div>
```

---

### Accordion (Estudo de Caso)

```css
.accord-list { display:grid; gap:.55rem; }
.accord-item { border:1px solid var(--neutral-200); border-radius:var(--radius); overflow:hidden; background:var(--neutral-0); }
.accord-btn  { display:flex; align-items:center; justify-content:space-between; width:100%; padding:.95rem 1.1rem; border:0; background:transparent; cursor:pointer; font-family:var(--title); font-size:.92rem; font-weight:700; text-align:left; }
.accord-caret{ width:1rem; height:1rem; transition:transform .25s; flex-shrink:0; }
.accord-btn[aria-expanded="true"] .accord-caret { transform:rotate(180deg); }
.accord-body { max-height:0; overflow:hidden; transition:max-height .35s cubic-bezier(.4,0,.2,1); }
.accord-body.open { max-height:400px; }
.accord-content { padding:0 1.1rem 1.1rem; color:var(--neutral-500); font-size:.85rem; line-height:1.65; }
```

```javascript
function toggleAcc(btn){
  var open = btn.getAttribute('aria-expanded')==='true';
  btn.setAttribute('aria-expanded', String(!open));
  btn.nextElementSibling.classList.toggle('open', !open);
}
```

```html
<div class="accord-list c2">
  <div class="accord-item">
    <button class="accord-btn" aria-expanded="false" onclick="toggleAcc(this)">
      Problema
      <svg class="accord-caret" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="accord-body" role="region">
      <div class="accord-content"><p>Situação-problema real que o aluno provavelmente reconhece.</p></div>
    </div>
  </div>
  <!-- repita para: Ação tomada / Resultado obtido -->
</div>
```

---

### XP Mission (Checklist Gamificado)

```css
.ms-panel { background:linear-gradient(135deg,var(--primary-900),var(--primary-700)); border-radius:var(--radius-lg); padding:1.6rem; color:var(--neutral-0); }
.ms-list  { display:grid; gap:.5rem; margin-bottom:1.2rem; }
.ms-item  { display:flex; align-items:center; gap:.7rem; padding:.65rem .9rem; border-radius:8px; background:rgba(255,255,255,.07); cursor:pointer; font-size:.84rem; transition:background .18s; user-select:none; }
.ms-item:hover { background:rgba(255,255,255,.12); }
.ms-item.done  { text-decoration:line-through; color:rgba(255,255,255,.4); }
.ms-check { width:18px; height:18px; border-radius:50%; border:2px solid rgba(255,255,255,.35); flex-shrink:0; transition:all .2s; }
.ms-item.done .ms-check { background:var(--primary-200); border-color:var(--primary-200); }
.xp-label { display:flex; justify-content:space-between; font-size:.74rem; color:rgba(255,255,255,.55); margin-bottom:.4rem; }
.xp-track { height:8px; border-radius:99px; background:rgba(255,255,255,.12); overflow:hidden; }
.xp-bar   { height:100%; border-radius:99px; background:linear-gradient(90deg,var(--primary-200),var(--accent-500)); width:0%; transition:width .45s cubic-bezier(.4,0,.2,1); }
.ms-badge { display:inline-flex; align-items:center; gap:.45rem; margin-top:.9rem; padding:.45rem .9rem; border-radius:999px; background:rgba(255,255,255,.1); font-size:.75rem; font-weight:700; opacity:.5; transition:all .35s; }
.ms-badge.earned { opacity:1; background:var(--accent-500); }
```

```javascript
function msTgl(el){
  el.classList.toggle('done');
  var panel = el.closest('.ms-panel');
  var items = panel.querySelectorAll('.ms-item');
  var done  = [].filter.call(items, function(i){ return i.classList.contains('done'); }).length;
  var pct   = Math.round(done / items.length * 100);
  panel.querySelector('.xp-bar').style.width = pct + '%';
  var xpPct = panel.querySelector('.xp-pct');
  if(xpPct) xpPct.textContent = pct + '%';
  var badge = panel.querySelector('.ms-badge');
  if(badge) badge.classList.toggle('earned', pct === 100);
}
```

```html
<div class="ms-panel c1">
  <p style="font-family:var(--title);font-size:1.1rem;font-weight:700;margin-bottom:.2rem">Sua missão desta semana</p>
  <p style="font-size:.8rem;color:rgba(255,255,255,.6);margin-bottom:1.1rem">Marque cada item ao concluir</p>
  <div class="ms-list">
    <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0">
      <div class="ms-check"></div> Tarefa 1 — ação concreta e verificável
    </div>
    <div class="ms-item" onclick="msTgl(this)" role="checkbox" aria-checked="false" tabindex="0">
      <div class="ms-check"></div> Tarefa 2
    </div>
  </div>
  <div class="xp-label"><span>XP</span><span class="xp-pct">0%</span></div>
  <div class="xp-track"><div class="xp-bar"></div></div>
  <div class="ms-badge">Missão completa!</div>
</div>
```

---

### Drag & Drop Pipeline

```css
.etiqueta-pool  { display:flex; flex-wrap:wrap; gap:.5rem; padding:.9rem; border:1px solid var(--neutral-200); border-radius:var(--radius); background:var(--neutral-0); margin-bottom:1rem; }
.etiqueta       { padding:.5rem .75rem; border-radius:7px; background:var(--primary-700); color:var(--neutral-0); font-size:.8rem; font-weight:600; cursor:grab; border:0; user-select:none; }
.pipeline       { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:.75rem; }
.pipeline-stage { min-height:90px; border:2px dashed var(--neutral-200); border-radius:var(--radius); padding:.65rem; display:flex; flex-direction:column; gap:.4rem; background:var(--neutral-50); transition:border-color .18s,background .18s; }
.pipeline-stage.over { border-color:var(--primary-500); background:var(--primary-50); }
.pipeline-stage h4   { font-size:.72rem; letter-spacing:.1em; text-transform:uppercase; color:var(--neutral-500); }
```

```javascript
var _drag = null;
function ddStart(el){ _drag=el; el.style.opacity='.5'; }
function ddEnd(el)  { el.style.opacity='1'; }
function ddOver(z)  { event.preventDefault(); z.classList.add('over'); }
function ddLeave(z) { z.classList.remove('over'); }
function doDrop(z)  { z.classList.remove('over'); if(_drag)z.appendChild(_drag); _drag=null; }
```

```html
<div class="etiqueta-pool" ondragover="event.preventDefault()" ondrop="doDrop(this)">
  <div class="etiqueta" draggable="true" ondragstart="ddStart(this)" ondragend="ddEnd(this)">Etapa A</div>
  <div class="etiqueta" draggable="true" ondragstart="ddStart(this)" ondragend="ddEnd(this)">Etapa B</div>
</div>
<div class="pipeline">
  <div class="pipeline-stage" ondragover="ddOver(this)" ondragleave="ddLeave(this)" ondrop="doDrop(this)">
    <h4>Passo 1</h4>
  </div>
  <div class="pipeline-stage" ondragover="ddOver(this)" ondragleave="ddLeave(this)" ondrop="doDrop(this)">
    <h4>Passo 2</h4>
  </div>
</div>
```

---

## Template index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{TITULO_MODULO} | {NOME_CURSO}</title>
<link rel="icon" href="data:,">
<style>
@font-face {
  font-family: 'Bricolage Grotesque';
  src: url('media/fonts/BricolageGrotesque-Variable.ttf') format('truetype');
  font-style: normal; font-weight: 300 800; font-display: swap;
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('media/fonts/PlusJakartaSans-Variable.ttf') format('truetype');
  font-style: normal; font-weight: 400 700; font-display: swap;
}

:root {
  /* — substitua pelos valores de DESIGN.md ou use o fallback abaixo — */
  --primary-50:  #eff9fb;
  --primary-100: #d7f0f4;
  --primary-200: #b2e0e8;
  --primary-500: #1d8a9c;
  --primary-700: #145c6c;
  --primary-900: #103b45;
  --accent-500:  #d9534f;
  --accent-700:  #9d3836;
  --neutral-0:   #ffffff;
  --neutral-50:  #f8fafb;
  --neutral-100: #eef2f4;
  --neutral-200: #d9e2e7;
  --neutral-500: #5d6e78;
  --neutral-600: #43515a;
  --neutral-900: #141a1d;
  --success:     #216b42;
  --focus:       #d9534f;
  --title:       "Bricolage Grotesque", Georgia, serif;
  --body:        "Plus Jakarta Sans", Arial, sans-serif;
  --radius:      10px;
  --radius-lg:   18px;
  --shadow:      0 12px 34px rgba(20,26,29,.08);
  --nav-clearance: 6.6rem;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 100%; height: 100%; overflow: hidden; background: var(--neutral-50); color: var(--neutral-900); font-family: var(--body); font-size: 16px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
button { font: inherit; color: inherit; }
img { display: block; max-width: 100%; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px; }

/* PROGRESS */
#progressBar { position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, var(--primary-700), var(--primary-500)); transition: width .5s cubic-bezier(.4,0,.2,1); z-index: 1000; box-shadow: 0 0 12px rgba(29,138,156,.35); }

/* SLIDE CONTEXT */
.slide-context { display: flex; align-items: center; gap: .45rem; grid-column: 1/-1; margin-bottom: .35rem; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; color: var(--neutral-500); }
.slide-context strong { color: var(--primary-700); }

/* NAVIGATION */
.nav { position: fixed; bottom: 1.7rem; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: .55rem; padding: .42rem .68rem; border: 1px solid var(--neutral-200); border-radius: 999px; background: rgba(255,255,255,.98); box-shadow: var(--shadow); z-index: 1000; }
.nav-btn { width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--neutral-200); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .2s; }
.nav-btn:hover:not(:disabled) { border-color: var(--primary-500); background: var(--primary-50); }
.nav-btn:disabled { opacity: .28; cursor: not-allowed; }
.nav-icon { width: 20px; height: 20px; }
.dots { display: flex; align-items: center; }
.dot { width: 36px; height: 44px; border: 0; background: transparent; cursor: pointer; position: relative; }
.dot::before { content: ''; position: absolute; left: 50%; top: 50%; width: 8px; height: 8px; border-radius: 50%; transform: translate(-50%,-50%); background: var(--neutral-500); transition: all .35s; }
.dot.active::before { background: var(--primary-700); width: 20px; border-radius: 4px; }
.nav-count { font-size: 11px; color: var(--neutral-500); min-width: 36px; text-align: center; }

/* STAGE & SLIDES */
.stage { position: relative; width: 100%; height: 100%; }
.slide { position: absolute; inset: 0; display: flex; align-items: flex-start; justify-content: center; padding: 2.4rem 3rem calc(var(--nav-clearance) + 1.5rem); opacity: 0; transform: translateX(50px); transition: opacity .48s cubic-bezier(.4,0,.2,1), transform .48s cubic-bezier(.4,0,.2,1); pointer-events: none; overflow-y: auto; }
.slide.active { opacity: 1; transform: translateX(0); pointer-events: all; }
.slide.exit { opacity: 0; transform: translateX(-50px); }
.inner { width: 100%; max-width: 1060px; margin-block: auto; }

/* TYPOGRAPHY */
.eyebrow { font-size: 10.5px; letter-spacing: .16em; text-transform: uppercase; color: var(--primary-700); font-weight: 600; margin-bottom: .75rem; }
.title { font-family: var(--title); font-size: clamp(2.35rem,4.7vw,4rem); font-weight: 800; line-height: 1.06; letter-spacing: -.035em; }
.title .hi, .section-title .hi { color: var(--primary-700); }
.section-title { font-family: var(--title); font-size: clamp(1.75rem,3vw,2.55rem); font-weight: 700; line-height: 1.14; letter-spacing: -.028em; }
.lead { max-width: 62ch; color: var(--neutral-500); font-size: 1.02rem; line-height: 1.7; }

/* COMPONENTS */
.tag { display: inline-flex; align-items: center; padding: .32rem .82rem; border: 1px solid rgba(29,138,156,.35); border-radius: 999px; background: var(--primary-50); color: var(--primary-700); font-size: .7rem; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.icon { width: 1.25rem; height: 1.25rem; flex-shrink: 0; object-fit: contain; }
.icon-lg { width: 1.65rem; height: 1.65rem; }
.icon-shell { display: flex; width: 38px; flex: 0 0 38px; height: 38px; align-items: center; justify-content: center; border: 1px solid rgba(29,138,156,.32); border-radius: 9px; background: var(--primary-50); }
.button { display: inline-flex; align-items: center; gap: .5rem; min-height: 48px; padding: .7rem 1.35rem; border: 0; border-radius: 9px; background: var(--primary-700); color: var(--neutral-0); cursor: pointer; font-weight: 700; font-family: var(--body); transition: background .18s, box-shadow .18s; }
.button:hover { background: var(--primary-500); box-shadow: 0 7px 18px rgba(20,92,108,.16); }
.callout { display: flex; gap: .7rem; padding: .9rem 1rem; border: 1px solid rgba(29,138,156,.32); border-radius: var(--radius); background: var(--primary-50); color: var(--neutral-600); font-size: .85rem; }
.callout strong { color: var(--neutral-900); }

/* COVER (.cover) */
.cover .inner { display: grid; grid-template-columns: minmax(360px,1fr) 420px; column-gap: 3rem; row-gap: 1.15rem; align-items: center; }
.cover-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 1.15rem; }
.hero-panel { overflow: hidden; border: 1px solid var(--neutral-200); border-radius: var(--radius-lg); background: var(--neutral-0); }
.hero-panel figure { aspect-ratio: 16/7; }
.hero-panel figure img { width: 100%; height: 100%; object-fit: cover; object-position: center 43%; }
.metadata { padding: 1rem 1.55rem 1.25rem; }
.meta-row { display: flex; gap: .8rem; align-items: flex-start; padding: .8rem 0; border-bottom: 1px solid var(--neutral-200); }
.meta-row:last-child { padding-bottom: 0; border-bottom: 0; }
.meta-row strong { display: block; margin-bottom: .15rem; font-family: var(--title); font-size: .88rem; }
.meta-row span { color: var(--neutral-500); font-size: .79rem; }

/* CONCEPT (.concept) */
.concept { background: var(--neutral-0); }
.concept .inner { display: grid; grid-template-columns: .92fr 1.08fr; column-gap: 3.5rem; row-gap: 1.15rem; align-items: center; }
.photo-card { overflow: hidden; border: 1px solid var(--neutral-200); border-radius: var(--radius-lg); background: var(--neutral-0); }
.photo-card img { width: 100%; height: auto; aspect-ratio: 16/11; object-fit: cover; }
.photo-card figcaption { padding: .8rem 1rem .95rem; color: var(--neutral-500); font-size: .8rem; }
.feature-list { display: grid; gap: .72rem; margin: 1.4rem 0; }
.feature { display: flex; gap: .8rem; padding: .9rem 1rem; border: 1px solid var(--neutral-200); border-radius: var(--radius); background: var(--neutral-0); }
.feature .icon-shell { width: 40px; flex-basis: 40px; height: 40px; }
.feature h3 { margin-bottom: .16rem; font-family: var(--title); font-size: .9rem; }
.feature p { color: var(--neutral-500); font-size: .8rem; line-height: 1.5; }

/* TABS (.tabs-slide) */
.tabs-slide .inner { width: min(930px,100%); }
.tabs-header { margin-bottom: 1.55rem; }
.tabs { overflow: hidden; border: 1px solid var(--neutral-200); border-radius: var(--radius-lg); background: var(--neutral-0); }
.tablist { display: flex; border-bottom: 1px solid var(--neutral-200); }
.tab { position: relative; display: inline-flex; flex: 1; gap: .45rem; justify-content: center; align-items: center; min-height: 54px; padding: .8rem 1rem; border: 0; background: transparent; color: var(--neutral-500); cursor: pointer; font-family: var(--title); font-weight: 700; }
.tab[aria-selected="true"] { color: var(--primary-700); }
.tab[aria-selected="true"]::after { content: ""; position: absolute; right: 10%; bottom: 0; left: 10%; height: 3px; border-radius: 2px 2px 0 0; background: var(--primary-500); }
.tabpanel { display: grid; grid-template-columns: 1.1fr .9fr; gap: 2rem; padding: 1.65rem; }
.tabpanel[hidden] { display: none; }
.tabpanel h3 { margin-bottom: .4rem; font-family: var(--title); font-size: 1.24rem; }
.tabpanel p { max-width: 55ch; color: var(--neutral-500); font-size: .92rem; }
.checklist { display: grid; gap: .55rem; margin-top: 1rem; }
.checklist li { display: flex; gap: .5rem; align-items: flex-start; list-style: none; font-size: .85rem; }
.side-note { padding: 1.1rem; border-radius: var(--radius); background: var(--neutral-100); }
.side-note .eyebrow { margin-bottom: .55rem; }
.side-note strong { display: block; margin-bottom: .3rem; font-family: var(--title); font-size: 1.25rem; }
.side-note p { font-size: .82rem; }

/* SUMMARY (.summary) */
.summary .inner { width: min(950px,100%); }
.summary-header { max-width: 700px; margin: 0 auto 1.7rem; text-align: center; }
.summary-header .tag { margin-bottom: .8rem; }
.summary-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: .95rem; margin-bottom: 1.3rem; }
.summary-card { min-height: 170px; padding: 1.25rem; border: 1px solid var(--neutral-200); border-radius: var(--radius-lg); background: var(--neutral-0); }
.summary-card .icon-shell { margin-bottom: .85rem; }
.summary-card h3 { margin-bottom: .42rem; font-family: var(--title); font-size: .95rem; }
.summary-card p { color: var(--neutral-500); font-size: .8rem; }
.takeaway { display: flex; gap: 1rem; align-items: center; padding: 1.25rem 1.4rem; border: 1px solid rgba(29,138,156,.32); border-radius: var(--radius-lg); background: var(--primary-50); }
.takeaway h3 { margin-bottom: .18rem; font-family: var(--title); font-size: 1.05rem; }
.takeaway p { color: var(--neutral-500); font-size: .85rem; }

/* ANIMATIONS */
@keyframes revealUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
.reveal { opacity: 0; will-change: opacity,transform; }
.reveal-up { transform: translateY(18px); }
.delay-0 { --reveal-delay:.04s; } .delay-1 { --reveal-delay:.10s; } .delay-2 { --reveal-delay:.18s; } .delay-3 { --reveal-delay:.27s; } .delay-4 { --reveal-delay:.36s; }
.slide.entered .reveal-up { animation: revealUp .5s var(--reveal-delay,0s) cubic-bezier(.16,1,.3,1) both; }
.stagger-children>* { opacity:0; transform:translateY(14px); }
.slide.entered .stagger-children>* { animation: revealUp .46s calc(var(--reveal-delay,.14s) + var(--item-delay,0s)) cubic-bezier(.16,1,.3,1) both; }
.stagger-children>:nth-child(1){--item-delay:0s} .stagger-children>:nth-child(2){--item-delay:.07s} .stagger-children>:nth-child(3){--item-delay:.14s} .stagger-children>:nth-child(4){--item-delay:.21s}

@media (prefers-reduced-motion:reduce) { *,*::before,*::after { animation-duration:.01ms!important; transition-duration:.01ms!important; } .reveal,.stagger-children>* { opacity:1!important; transform:none!important; animation:none!important; } }
</style>
</head>
<body>

<div id="progressBar" style="width:10%"></div>

<main class="stage" id="stage">

  <!-- SLIDE 1: CAPA -->
  <section class="slide cover active" id="s1" tabindex="-1" aria-label="Slide 1 de N">
    <div class="inner">
      <p class="slide-context reveal reveal-up delay-0"><strong>{CURSO}</strong><span>·</span><span>Módulo</span><strong>01</strong><span>de N</span></p>
      <div class="cover-copy stagger-children delay-1">
        <span class="tag">{CATEGORIA}</span>
        <h1 class="title">Título com <span class="hi">palavra-chave</span></h1>
        <p class="lead">Objetivo do módulo em até duas linhas, linguagem clara e acolhedora.</p>
        <button class="button" type="button" id="btn-start">
          Começar módulo
          <img class="icon" src="media/icons/arrow-right-duotone.svg" alt="" aria-hidden="true">
        </button>
      </div>
      <aside class="hero-panel reveal reveal-up delay-2">
        <figure>
          <img src="media/images/{imagem-gerada-leonardo}.jpg" alt="{descrição da cena}">
        </figure>
        <div class="metadata">
          <div class="meta-row">
            <span class="icon-shell"><img class="icon" src="media/icons/book-open-duotone.svg" alt="" aria-hidden="true"></span>
            <div><strong>{N} slides</strong><span>Conceitos, exemplos e atividade</span></div>
          </div>
          <div class="meta-row">
            <span class="icon-shell"><img class="icon" src="media/icons/target-duotone.svg" alt="" aria-hidden="true"></span>
            <div><strong>O que você vai aprender</strong><span>{resultado concreto em linguagem direta para o aluno}</span></div>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <!-- SLIDES 2-9: conteúdo do curso seguindo os tipos acima -->

  <!-- SLIDE FINAL: SÍNTESE -->
  <section class="slide summary" id="sN" tabindex="-1" aria-label="Slide N de N" aria-hidden="true">
    <div class="inner">
      <p class="slide-context reveal reveal-up delay-0"><strong>{CURSO}</strong><span>·</span><span>Módulo</span><strong>0N</strong><span>de N</span></p>
      <header class="summary-header reveal reveal-up delay-1">
        <span class="tag">Síntese do módulo</span>
        <h2 class="section-title">O que você <span class="hi">aprendeu hoje</span></h2>
      </header>
      <div class="summary-grid stagger-children delay-2">
        <article class="summary-card">
          <span class="icon-shell"><img class="icon icon-lg" src="media/icons/target-duotone.svg" alt="" aria-hidden="true"></span>
          <h3>{Conceito 1}</h3>
          <p>{Síntese em uma sentença.}</p>
        </article>
        <article class="summary-card">
          <span class="icon-shell"><img class="icon icon-lg" src="media/icons/check-circle-duotone.svg" alt="" aria-hidden="true"></span>
          <h3>{Conceito 2}</h3>
          <p>{Síntese em uma sentença.}</p>
        </article>
        <article class="summary-card">
          <span class="icon-shell"><img class="icon icon-lg" src="media/icons/book-open-duotone.svg" alt="" aria-hidden="true"></span>
          <h3>Próximo passo</h3>
          <p>{Conexão com o próximo módulo.}</p>
        </article>
      </div>
      <div class="takeaway reveal reveal-up delay-4">
        <span class="icon-shell"><img class="icon icon-lg" src="media/icons/lightbulb-duotone.svg" alt="" aria-hidden="true"></span>
        <div>
          <h3>Virada de mentalidade</h3>
          <p>{Mensagem memorável e aplicável no trabalho.}</p>
        </div>
      </div>
    </div>
  </section>

</main>

<nav class="nav" aria-label="Navegação dos slides">
  <button class="nav-btn" id="prev" aria-label="Slide anterior" disabled>
    <img class="nav-icon" src="media/icons/arrow-left-duotone.svg" alt="">
  </button>
  <div class="dots" id="dots"></div>
  <span class="nav-count" id="count" aria-live="polite">1 / N</span>
  <button class="nav-btn" id="next" aria-label="Próximo slide">
    <img class="nav-icon" src="media/icons/arrow-right-duotone.svg" alt="">
  </button>
</nav>

<script>
/* ─── SCORM 1.2 API WRAPPER ─── */
var SCORM = (function(){
  var api=null, initialized=false;
  function findAPI(w){ var t=0; while(!w.API&&w.parent&&w.parent!==w&&t++<10)w=w.parent; return w.API||null; }
  function init(){ api=findAPI(window); if(!api){console.warn('[SCORM] standalone');return false;} var r=api.LMSInitialize(''); initialized=r==='true'||r===true; return initialized; }
  function set(k,v){ if(!api||!initialized)return; api.LMSSetValue(k,String(v)); }
  function commit(){ if(api&&initialized)api.LMSCommit(''); }
  function finish(status){ if(!api||!initialized)return; set('cmi.core.lesson_status',status||'completed'); commit(); api.LMSFinish(''); }
  function setBookmark(loc){ set('cmi.core.lesson_location',loc); commit(); }
  function getBookmark(){ if(!api||!initialized)return ''; return api.LMSGetValue('cmi.core.lesson_location'); }
  window.addEventListener('load',init);
  window.addEventListener('beforeunload',function(){ if(initialized)commit(); });
  return { setStatus:function(s){set('cmi.core.lesson_status',s);commit();}, setBookmark:setBookmark, getBookmark:getBookmark, finish:finish };
})();

/* ─── SLIDE ENGINE ─── */
(function(){
  var slides=Array.from(document.querySelectorAll('.slide'));
  var dotsEl=document.getElementById('dots');
  var progressBar=document.getElementById('progressBar');
  var countEl=document.getElementById('count');
  var prevBtn=document.getElementById('prev');
  var nextBtn=document.getElementById('next');
  var current=0;

  slides.forEach(function(slide,i){
    var d=document.createElement('button');
    d.className='dot'; d.setAttribute('aria-label','Ir para slide '+(i+1));
    d.addEventListener('click',function(){ go(i,true); });
    dotsEl.appendChild(d);
  });

  function go(idx,focus){
    if(idx<0||idx>=slides.length)return;
    slides[current].classList.add('exit');
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden','true');
    slides[current].inert=true;
    current=idx;
    var s=slides[current];
    s.classList.remove('exit');
    s.classList.add('active');
    s.setAttribute('aria-hidden','false');
    s.inert=false;
    s.classList.remove('entered'); void s.offsetWidth; s.classList.add('entered');
    Array.from(dotsEl.children).forEach(function(d,i){ d.classList.toggle('active',i===current); });
    var pct=Math.round((current+1)/slides.length*100);
    progressBar.style.width=pct+'%';
    countEl.textContent=(current+1)+' / '+slides.length;
    prevBtn.disabled=current===0;
    nextBtn.textContent=''; /* reset */
    if(current===slides.length-1){ nextBtn.disabled=true; complete(); }
    else nextBtn.disabled=false;
    SCORM.setBookmark('s'+(current+1));
    SCORM.setStatus('incomplete');
    if(focus)s.focus();
  }

  function complete(){
    SCORM.setStatus('completed');
    SCORM.finish('completed');
  }

  prevBtn.addEventListener('click',function(){ go(current-1,true); });
  nextBtn.addEventListener('click',function(){ go(current+1,true); });
  var startBtn=document.getElementById('btn-start');
  if(startBtn) startBtn.addEventListener('click',function(){ go(1,true); });

  document.addEventListener('keydown',function(e){
    if(e.target.closest('button,[role="tab"]'))return;
    if(e.key==='ArrowRight'||e.key==='ArrowDown')go(current+1,true);
    if(e.key==='ArrowLeft'||e.key==='ArrowUp')go(current-1,true);
  });

  /* Tab widget (slides com .tabs-slide) */
  document.querySelectorAll('.tablist').forEach(function(tl){
    var tabs=Array.from(tl.querySelectorAll('.tab'));
    var panels=tabs.map(function(t){ return document.getElementById(t.getAttribute('aria-controls')); });
    function selectTab(i,focus){
      tabs.forEach(function(t,ti){ var sel=ti===i; t.setAttribute('aria-selected',sel); t.tabIndex=sel?0:-1; panels[ti].hidden=!sel; });
      if(focus)tabs[i].focus();
    }
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){ selectTab(i,false); });
      t.addEventListener('keydown',function(e){
        if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
        e.preventDefault();
        selectTab((i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length,true);
      });
    });
  });

  /* Restaurar bookmark */
  var bookmark=SCORM.getBookmark();
  var startIdx=0;
  if(bookmark){ var m=bookmark.match(/s(\d+)/); if(m)startIdx=Math.max(0,parseInt(m[1])-1); }
  go(startIdx,false);
  slides[startIdx].classList.add('entered');
})();
</script>
</body>
</html>
```

---

## ETAPA 4 — imsmanifest.xml

Liste **todos** os arquivos usados. Sem isso o LMS rejeita o pacote.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="MANIFEST-{CURSO-ID}-MODULO-{N}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-{CURSO-ID}-MODULO-{N}">
    <organization identifier="ORG-{CURSO-ID}-MODULO-{N}">
      <title>{Nome do Curso} - Módulo {N}: {Título do Módulo}</title>
      <item identifier="ITEM-{CURSO-ID}-MODULO-{N}" identifierref="RES-{CURSO-ID}-MODULO-{N}">
        <title>Módulo {N}: {Título do Módulo}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-{CURSO-ID}-MODULO-{N}" type="webcontent" adlcp:scormtype="sco" href="index.html">
      <file href="index.html"/>
      <file href="media/fonts/BricolageGrotesque-Variable.ttf"/>
      <file href="media/fonts/PlusJakartaSans-Variable.ttf"/>
      <file href="media/fonts/OFL-BricolageGrotesque.txt"/>
      <file href="media/fonts/OFL-PlusJakartaSans.txt"/>
      <!-- uma linha por imagem gerada -->
      <file href="media/images/{nome-imagem}.jpg"/>
      <!-- uma linha por ícone usado -->
      <file href="media/icons/arrow-left-duotone.svg"/>
      <file href="media/icons/arrow-right-duotone.svg"/>
      <file href="media/icons/book-open-duotone.svg"/>
      <!-- ... demais ícones ... -->
      <file href="README-SCORM.txt"/>
    </resource>
  </resources>
</manifest>
```

---

## ETAPA 5 — Copiar Assets para media/

Copie os arquivos físicos para a pasta do módulo:

```powershell
# Fontes
Copy-Item "assets\fonts\BricolageGrotesque-Variable.ttf" "media\fonts\"
Copy-Item "assets\fonts\PlusJakartaSans-Variable.ttf"    "media\fonts\"
Copy-Item "assets\fonts\OFL-BricolageGrotesque.txt"      "media\fonts\"
Copy-Item "assets\fonts\OFL-PlusJakartaSans.txt"         "media\fonts\"

# Ícones (substitua pelos usados)
Copy-Item "assets\icons\duotone\target-duotone.svg"          "media\icons\"
Copy-Item "assets\icons\duotone\check-circle-duotone.svg"    "media\icons\"
Copy-Item "assets\icons\duotone\book-open-duotone.svg"       "media\icons\"
Copy-Item "assets\icons\duotone\lightbulb-duotone.svg"       "media\icons\"
Copy-Item "assets\icons\duotone\arrow-right-duotone.svg"     "media\icons\"
Copy-Item "assets\icons\duotone\arrow-left-duotone.svg"      "media\icons\"
# ... demais ícones
```

---

## ETAPA 6 — Empacotar (.zip)

```powershell
# Na pasta de saída do módulo
Compress-Archive -Path "index.html","imsmanifest.xml","media","README-SCORM.txt" `
  -DestinationPath "{id-do-modulo}-scorm-1.2.zip" -Force
```

O `.zip` deve ter `imsmanifest.xml` **na raiz** (não dentro de subpasta).

---

## README-SCORM.txt — Template

```
SCORM 1.2 — {Nome do Curso} — Módulo {N}: {Título}
Gerado em: {data}

UPLOAD
------
Moodle    : Atividades → SCORM → enviar course.zip
Hotmart   : Produto → Módulos → Aula → SCORM
Teachable : Curriculum → Add Lesson → SCORM/xAPI
Canvas    : Modules → Add Item → External Tool → SCORM

SUPORTE
-------
Em caso de dúvida, contate o administrador do LMS.
```

---

## Checklist de Entrega

- [ ] Ler `DESIGN.md` e extrair tokens de cores e fontes (ou confirmar fallback)
- [ ] Usar `skills/criar-imagem-leonardo/SKILL.md` para gerar pelo menos 3 imagens inéditas do módulo e salvar/copiar para `media/images/`
- [ ] Confirmar que nenhuma imagem foi reutilizada de outro módulo ou pacote e que as 3 imagens aparecem no HTML
- [ ] Selecionar ícones duotone e listar quais serão usados
- [ ] Criar `index.html` com mínimo de 10 slides, tudo inline
- [ ] Confirmar que fontes usam `@font-face` com `media/fonts/`
- [ ] Confirmar que ícones e imagens apontam para `media/icons/` e `media/images/`
- [ ] Confirmar que cada `.icon-shell` renderiza como quadrado (`width` igual a `height`) em desktop e mobile
- [ ] Gerar `imsmanifest.xml` listando **todos** os arquivos
- [ ] Copiar fontes e ícones para `media/`
- [ ] Gerar `README-SCORM.txt`
- [ ] Empacotar `.zip` com `imsmanifest.xml` na raiz
- [ ] Testar navegação standalone (abrir `index.html` direto no browser)
- [ ] Validar no SCORM Cloud ou LMS de destino
