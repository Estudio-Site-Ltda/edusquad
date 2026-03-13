---
name: Mind Map Creator
description: Gera um mapa mental interativo standalone em HTML com dark mode premium e glassmorphism — ideal para visualizar estruturas de curso, competências da BNCC, taxonomia de Bloom, módulos de trilha de aprendizagem, conceitos interligados e sínteses de conteúdo educacional. Use quando o usuário pedir "mapa mental", "mind map", "mapa conceitual", "visão geral do curso", "estrutura de módulo" ou quiser visualizar relações entre conceitos de um conteúdo educacional.
type: prompt
version: 1.0.0
categories: [conteudo, visual, mapa-mental, apresentacao]
---

# Mind Map Creator — Mapa Mental Educacional

Esta skill gera um arquivo HTML standalone — sem build, sem dependências externas além de uma fonte Google — que apresenta conteúdo educacional como um mapa mental interativo com dark mode premium e glassmorphism.

Use para visualizar: estrutura de cursos e módulos, competências e habilidades, taxonomia de Bloom aplicada ao conteúdo, conexões entre conceitos, trilhas de aprendizagem, sínteses de aula, mapeamento de pré-requisitos.

---

## Estética Visual (OBRIGATÓRIA)

### Identidade

- **Fundo:** `#060609` com grid sutil de linhas índigo
- **Nós:** glassmorphism — `rgba(13,13,20,.85)` + `backdrop-filter: blur(16px)` + bordas coloridas por ramo
- **Tipografia:** **Syne** (labels, header) + **DM Sans** (subtítulos, sub)
- **Cores:** paleta de 7 cores vibrantes, uma por ramo — âmbar, índigo, esmeralda, rosa, azul, roxo, laranja
- **Conexões:** linhas bezier animadas com `stroke-dashoffset`
- **Tooltips:** glassmorphism com `backdrop-filter: blur(12px)`

### Fontes (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

| Papel | Família | Peso | Tamanho |
|---|---|---|---|
| Nó central | Syne | 800 | 17px |
| Sub do central | Syne | 500 | 12px (cor âmbar) |
| Ramo (branch) | Syne | 700 | 14px |
| Folha (leaf) | Syne | 500 | 11.5px |
| Sub / detalhe | DM Sans | 300 | 11px |

### Paleta de Cores

| color | Hex | Nome | Uso Educacional Sugerido |
|---|---|---|---|
| 0 | #f59e0b | Âmbar | Conhecimento / Fundamentos |
| 1 | #6366f1 | Índigo | Compreensão / Teoria |
| 2 | #10b981 | Esmeralda | Aplicação / Prática |
| 3 | #f43f5e | Rosa | Análise / Avaliação |
| 4 | #3b82f6 | Azul | Síntese / Criação |
| 5 | #a855f7 | Roxo | Competências / Habilidades |
| 6 | #fb923c | Laranja | Recursos / Ferramentas |

---

## Estrutura de Dados (JS)

```js
const data = {
  id: 'center',
  icon: '🎓',                     // emoji representativo do tema educacional
  label: 'TEMA CENTRAL',          // nome do módulo, curso ou conceito (CAPS)
  sub: 'descrição do objetivo',   // propósito do mapa (ex: "Trilha de Aprendizagem")
  branches: [
    {
      id: 'b1',
      icon: '📚',
      label: 'Nome do Ramo',      // competência, fase, área temática
      sub: '',                    // opcional — ex: "3 aulas", "Nível 1"
      color: 0,                   // índice 0–6 da paleta
      tooltip: 'Descrição do ramo em 2ª pessoa.',
      leaves: [
        {
          id: 'l1a',
          icon: '🎯',
          label: 'Folha',         // conceito, habilidade, tópico
          sub: 'detalhe',         // ex: "20 min", "obrigatório"
          tooltip: 'Explicação específica e útil em 2ª pessoa.'
        }
      ]
    }
  ]
};
```

### Tipos de nó

| tipo | Classe CSS | Uso Educacional |
|---|---|---|
| `center` | `.node-center` | Tema central do mapa (curso, módulo, competência) |
| `branch` | `.node-branch` | Área temática, fase do curso, competência principal |
| `leaf` | `.node-leaf` | Conceito específico, habilidade, tópico de aula |

---

## Regras de Conteúdo

**Tom de voz — obrigatório:**
- Escreva SEMPRE na 2ª pessoa: fale COM quem está vendo ("você vai aprender", "você pode")
- NUNCA na perspectiva do apresentador ("vou mostrar", "meu objetivo é")
- NUNCA use jargões de bastidores ("pitch", "CTA", "objetivo:")

**Tooltips — o diferencial educacional:**
- Cada tooltip deve explicar o que o aprendiz ganha com aquele tópico
- Inclua exemplos concretos, competências desenvolvidas, aplicações práticas
- Mínimo 1 frase completa, máximo 3 frases
- Conecte ao contexto pedagógico quando possível

**Quantidade:**
- Ramos: mínimo 3, máximo 7
- Folhas por ramo: mínimo 2, máximo 5
- IDs dos ramos: b1, b2, b3...
- IDs das folhas: l1a, l1b, l2a, l2b...

---

## Exemplos Educacionais de Uso

### Exemplo 1 — Estrutura de Módulo de Curso

```js
const data = {
  id: 'center',
  icon: '🎓',
  label: 'DESIGN INSTRUCIONAL',
  sub: 'Fundamentos do Curso',
  branches: [
    {
      id: 'b1', icon: '🔍', label: 'Análise', sub: 'Fase 1',
      color: 0,
      tooltip: 'Você aprende a identificar as necessidades reais de aprendizagem antes de criar qualquer conteúdo.',
      leaves: [
        { id:'l1a', icon:'👥', label:'Público-alvo',    sub:'perfil',       tooltip:'Você mapeia quem são os aprendizes, o que já sabem e o que precisam desenvolver.' },
        { id:'l1b', icon:'🎯', label:'Objetivos',       sub:'SMART',        tooltip:'Você define o que o aprendiz será capaz de fazer ao final — com verbos mensuráveis de Bloom.' },
        { id:'l1c', icon:'📊', label:'GAP Analysis',    sub:'diagnóstico',  tooltip:'Você identifica a distância entre o que o aprendiz sabe hoje e o que precisa saber.' }
      ]
    },
    {
      id: 'b2', icon: '✏️', label: 'Design', sub: 'Fase 2',
      color: 1,
      tooltip: 'Você estrutura a experiência de aprendizagem: sequência, estratégias e avaliações.',
      leaves: [
        { id:'l2a', icon:'🗺️', label:'Mapa de Conteúdo', sub:'estrutura',   tooltip:'Você organiza os tópicos em sequência lógica, do simples ao complexo.' },
        { id:'l2b', icon:'⚡', label:'Estratégias Ativas', sub:'metodologia', tooltip:'Você escolhe atividades que engajam: estudos de caso, simulações, projetos.' },
        { id:'l2c', icon:'📝', label:'Avaliação',          sub:'Kirkpatrick', tooltip:'Você define como medir se o aprendizado aconteceu nos 4 níveis de Kirkpatrick.' }
      ]
    },
    {
      id: 'b3', icon: '🛠️', label: 'Desenvolvimento', sub: 'Fase 3',
      color: 2,
      tooltip: 'Você produz os materiais: vídeos, slides, atividades e recursos complementares.',
      leaves: [
        { id:'l3a', icon:'🎬', label:'Roteiro de Vídeo', sub:'storytelling', tooltip:'Você escreve scripts que prendem atenção e explicam com clareza em até 5 minutos.' },
        { id:'l3b', icon:'🖼️', label:'Slides',           sub:'visual',       tooltip:'Você cria apresentações com hierarquia visual clara — uma ideia por slide.' },
        { id:'l3c', icon:'🎮', label:'Atividades',        sub:'engajamento',  tooltip:'Você produz exercícios, quizzes e projetos práticos que fixam o conteúdo.' }
      ]
    },
    {
      id: 'b4', icon: '🚀', label: 'Implementação', sub: 'Fase 4',
      color: 3,
      tooltip: 'Você entrega o curso ao aprendiz — na plataforma, no ritmo certo, com suporte.',
      leaves: [
        { id:'l4a', icon:'💻', label:'LMS / Plataforma', sub:'publicação',   tooltip:'Você configura o ambiente de aprendizagem: Moodle, Hotmart, LMS Estúdio.' },
        { id:'l4b', icon:'📅', label:'Cronograma',        sub:'ritmo',        tooltip:'Você define a cadência de liberação para manter engajamento sem sobrecarregar.' }
      ]
    },
    {
      id: 'b5', icon: '📈', label: 'Avaliação', sub: 'Fase 5',
      color: 4,
      tooltip: 'Você mede o impacto real do curso e usa os dados para melhorar continuamente.',
      leaves: [
        { id:'l5a', icon:'😊', label:'Reação',    sub:'nível 1',  tooltip:'Você coleta o feedback imediato dos aprendizes sobre a experiência do curso.' },
        { id:'l5b', icon:'🧠', label:'Aprendizado', sub:'nível 2', tooltip:'Você aplica testes e avaliações para confirmar que o conhecimento foi adquirido.' },
        { id:'l5c', icon:'💼', label:'Comportamento', sub:'nível 3', tooltip:'Você acompanha se o aprendiz aplica o que aprendeu no trabalho ou na vida real.' }
      ]
    }
  ]
};
```

### Exemplo 2 — Taxonomia de Bloom Aplicada

```js
const data = {
  id: 'center',
  icon: '🌱',
  label: 'TAXONOMIA DE BLOOM',
  sub: 'Verbos para Objetivos de Aprendizagem',
  branches: [
    {
      id: 'b1', icon: '💾', label: 'Lembrar', sub: 'Nível 1',
      color: 0,
      tooltip: 'Você reconhece e recupera informações da memória. É o ponto de partida de todo aprendizado.',
      leaves: [
        { id:'l1a', icon:'📋', label:'Listar',     sub:'verbo',    tooltip:'Você enumera itens, elementos ou etapas de um processo.' },
        { id:'l1b', icon:'🔤', label:'Definir',    sub:'verbo',    tooltip:'Você enuncia o significado preciso de um conceito com suas próprias palavras.' },
        { id:'l1c', icon:'🔁', label:'Reconhecer', sub:'verbo',    tooltip:'Você identifica quando um conceito ou exemplo aparece em um contexto novo.' }
      ]
    },
    {
      id: 'b2', icon: '💡', label: 'Compreender', sub: 'Nível 2',
      color: 1,
      tooltip: 'Você interpreta e explica o significado do que aprendeu — não só repete, mas entende.',
      leaves: [
        { id:'l2a', icon:'🗣️', label:'Explicar',    sub:'verbo',   tooltip:'Você descreve como algo funciona para alguém que nunca viu antes.' },
        { id:'l2b', icon:'📊', label:'Classificar',  sub:'verbo',   tooltip:'Você agrupa exemplos em categorias com base em critérios definidos.' },
        { id:'l2c', icon:'🔄', label:'Resumir',      sub:'verbo',   tooltip:'Você extrai os pontos essenciais sem perder o sentido central.' }
      ]
    },
    {
      id: 'b3', icon: '⚙️', label: 'Aplicar', sub: 'Nível 3',
      color: 2,
      tooltip: 'Você usa o que aprendeu para resolver problemas reais em contextos novos.',
      leaves: [
        { id:'l3a', icon:'🛠️', label:'Executar',     sub:'verbo',   tooltip:'Você realiza um procedimento seguindo os passos corretos.' },
        { id:'l3b', icon:'🧩', label:'Resolver',      sub:'verbo',   tooltip:'Você aplica conceitos para encontrar a solução de um problema concreto.' },
        { id:'l3c', icon:'🔨', label:'Implementar',   sub:'verbo',   tooltip:'Você coloca em prática uma solução em um contexto real ou simulado.' }
      ]
    },
    {
      id: 'b4', icon: '🔬', label: 'Analisar', sub: 'Nível 4',
      color: 3,
      tooltip: 'Você decompõe informações complexas e identifica relações entre as partes.',
      leaves: [
        { id:'l4a', icon:'⚖️', label:'Comparar',     sub:'verbo',   tooltip:'Você identifica semelhanças e diferenças entre dois ou mais conceitos.' },
        { id:'l4b', icon:'🔍', label:'Examinar',      sub:'verbo',   tooltip:'Você investiga os detalhes de algo para entender sua estrutura interna.' },
        { id:'l4c', icon:'🧐', label:'Inferir',       sub:'verbo',   tooltip:'Você tira conclusões com base em evidências, mesmo sem informação explícita.' }
      ]
    },
    {
      id: 'b5', icon: '⭐', label: 'Avaliar', sub: 'Nível 5',
      color: 4,
      tooltip: 'Você emite julgamentos fundamentados sobre qualidade, valor ou eficácia.',
      leaves: [
        { id:'l5a', icon:'🏆', label:'Julgar',       sub:'verbo',   tooltip:'Você decide qual opção é melhor com base em critérios claros e justificados.' },
        { id:'l5b', icon:'✅', label:'Validar',       sub:'verbo',   tooltip:'Você confirma se uma solução ou conclusão é correta e bem fundamentada.' }
      ]
    },
    {
      id: 'b6', icon: '✨', label: 'Criar', sub: 'Nível 6',
      color: 5,
      tooltip: 'Você combina elementos de formas novas para gerar algo original e funcional.',
      leaves: [
        { id:'l6a', icon:'🎨', label:'Projetar',     sub:'verbo',   tooltip:'Você planeja e estrutura algo novo com intenção e critérios definidos.' },
        { id:'l6b', icon:'🔗', label:'Combinar',      sub:'verbo',   tooltip:'Você integra ideias de fontes diferentes para produzir algo inédito.' },
        { id:'l6c', icon:'💫', label:'Produzir',      sub:'verbo',   tooltip:'Você materializa uma ideia em forma de projeto, artefato ou conteúdo.' }
      ]
    }
  ]
};
```

---

## Interatividade

### Revelação progressiva por clique

- **Estado inicial:** apenas o nó central visível
- **Clique no centro:** revela um ramo por clique; após todos revelados, próximo clique reseta tudo
- **Clique em um ramo:** revela uma folha por clique; após todas reveladas, próximo clique recolhe as folhas
- Animação de entrada dos nós: `pop` (scale .6→1 + fade)
- Animação das conexões: `stroke-dashoffset` de 600→0

### Contadores de Progresso

- **Pontos coloridos abaixo do nó central:** indicam quantos ramos foram revelados
- **Pontos coloridos abaixo de cada ramo:** indicam quantas folhas foram reveladas naquele ramo
- Pontos preenchidos = revelados; vazios = ainda ocultos

### Drag e Zoom

- `mousedown` → arrastar para fazer pan
- `wheel` → zoom (0.3× a 3×)
- Botões `+` / `−` fixos no canto inferior direito

### Tooltips

- `mouseenter` no nó → exibe tooltip com glassmorphism
- Mostra: ícone + label (título) + texto explicativo em 2ª pessoa
- Posição: segue o cursor, com clamping nas bordas

---

## Template HTML Completo

**REGRA PRINCIPAL:** não altere o motor JS nem o CSS — apenas substitua `const data` e o texto do `#header`.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[SUBSTITUIR: Título do Mapa] — Mapa Mental</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060609;
    --bg2: #0d0d14;
    --c1: #f59e0b;
    --c2: #6366f1;
    --c3: #10b981;
    --c4: #f43f5e;
    --c5: #3b82f6;
    --c6: #a855f7;
    --c7: #fb923c;
    --center: #e2e8f0;
    --text: #cbd5e1;
    --text-dim: #64748b;
    --radius: 12px;
    --font-head: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html, body {
    width: 100%; height: 100%;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    overflow: hidden;
  }

  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0;
    background-image:
      linear-gradient(rgba(99,102,241,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,.04) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  #app { position: relative; width: 100vw; height: 100vh; z-index: 1; }

  #canvas {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    overflow: visible;
  }

  #header {
    position: fixed; top: 20px; left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    display: flex; align-items: center; gap: 12px;
    background: rgba(13,13,20,.8);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 999px;
    padding: 8px 20px;
    backdrop-filter: blur(12px);
    font-family: var(--font-head);
    font-size: 13px;
    color: var(--text-dim);
    letter-spacing: .04em;
  }
  #header span { color: var(--c1); font-weight: 700; }

  #hint {
    position: fixed; bottom: 20px; left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    font-size: 12px;
    color: var(--text-dim);
    letter-spacing: .05em;
    background: rgba(13,13,20,.7);
    padding: 6px 16px; border-radius: 999px;
    border: 1px solid rgba(255,255,255,.05);
  }

  .node-wrap {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    user-select: none;
    transition: transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .node-wrap:hover { transform: translate(-50%,-50%) scale(1.07); }
  .node-wrap.popping { animation: pop .35s cubic-bezier(.34,1.56,.64,1) forwards; }

  @keyframes pop {
    0%   { transform: translate(-50%,-50%) scale(.6); opacity: 0; }
    100% { transform: translate(-50%,-50%) scale(1);  opacity: 1; }
  }

  .node {
    position: relative;
    border-radius: var(--radius);
    padding: 10px 16px;
    display: flex; align-items: center; gap: 8px;
    background: rgba(13,13,20,.85);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,.08);
    white-space: nowrap;
    transition: box-shadow .25s, border-color .25s;
  }
  .node:hover { border-color: rgba(255,255,255,.2); }

  .node-icon { font-size: 16px; flex-shrink: 0; }
  .node-label {
    font-family: var(--font-head);
    font-weight: 600;
    font-size: 13px;
    letter-spacing: .01em;
  }
  .node-sub {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 300;
    color: var(--text-dim);
    margin-left: 2px;
  }

  .node-center .node {
    padding: 18px 28px;
    border-radius: 18px;
    background: rgba(15,15,22,.95);
    border: 1px solid rgba(255,255,255,.14);
  }
  .node-center .node-label { font-size: 17px; font-weight: 800; color: #fff; letter-spacing: -.01em; }
  .node-center .node-sub { font-size: 12px; color: var(--c1); font-weight: 500; }

  .node-branch .node { padding: 11px 18px; border-radius: 14px; }
  .node-branch .node-label { font-size: 14px; font-weight: 700; }

  .node-leaf .node { padding: 7px 12px; border-radius: 8px; }
  .node-leaf .node-label { font-size: 11.5px; font-weight: 500; }

  .accent-1 .node { border-color: rgba(245,158,11,.3); box-shadow: 0 0 20px rgba(245,158,11,.08); }
  .accent-1 .node:hover { box-shadow: 0 0 30px rgba(245,158,11,.2); border-color: rgba(245,158,11,.6); }
  .accent-1 .node-icon { color: var(--c1); }

  .accent-2 .node { border-color: rgba(99,102,241,.3); box-shadow: 0 0 20px rgba(99,102,241,.08); }
  .accent-2 .node:hover { box-shadow: 0 0 30px rgba(99,102,241,.2); border-color: rgba(99,102,241,.6); }
  .accent-2 .node-icon { color: var(--c2); }

  .accent-3 .node { border-color: rgba(16,185,129,.3); box-shadow: 0 0 20px rgba(16,185,129,.08); }
  .accent-3 .node:hover { box-shadow: 0 0 30px rgba(16,185,129,.2); border-color: rgba(16,185,129,.6); }
  .accent-3 .node-icon { color: var(--c3); }

  .accent-4 .node { border-color: rgba(244,63,94,.3); box-shadow: 0 0 20px rgba(244,63,94,.08); }
  .accent-4 .node:hover { box-shadow: 0 0 30px rgba(244,63,94,.2); border-color: rgba(244,63,94,.6); }
  .accent-4 .node-icon { color: var(--c4); }

  .accent-5 .node { border-color: rgba(59,130,246,.3); box-shadow: 0 0 20px rgba(59,130,246,.08); }
  .accent-5 .node:hover { box-shadow: 0 0 30px rgba(59,130,246,.2); border-color: rgba(59,130,246,.6); }
  .accent-5 .node-icon { color: var(--c5); }

  .accent-6 .node { border-color: rgba(168,85,247,.3); box-shadow: 0 0 20px rgba(168,85,247,.08); }
  .accent-6 .node:hover { box-shadow: 0 0 30px rgba(168,85,247,.2); border-color: rgba(168,85,247,.6); }
  .accent-6 .node-icon { color: var(--c6); }

  .accent-7 .node { border-color: rgba(251,146,60,.3); box-shadow: 0 0 20px rgba(251,146,60,.08); }
  .accent-7 .node:hover { box-shadow: 0 0 30px rgba(251,146,60,.2); border-color: rgba(251,146,60,.6); }
  .accent-7 .node-icon { color: var(--c7); }

  .edge-path {
    fill: none; stroke-width: 1.5; stroke-linecap: round; opacity: .5;
    stroke-dasharray: 600; stroke-dashoffset: 600;
    transition: opacity .3s;
    animation: drawLine .9s cubic-bezier(.4,0,.2,1) forwards;
  }
  .edge-leaf { stroke-dasharray: 300; stroke-dashoffset: 300; animation: drawLine .6s cubic-bezier(.4,0,.2,1) forwards; }
  @keyframes drawLine { to { stroke-dashoffset: 0; } }
  .edge-path.hidden { opacity: 0 !important; }

  #tooltip {
    position: fixed; z-index: 100;
    background: rgba(13,13,20,.95);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 10px; padding: 12px 16px; max-width: 260px;
    pointer-events: none; opacity: 0; transition: opacity .2s;
    backdrop-filter: blur(12px);
  }
  #tooltip.show { opacity: 1; }
  #tooltip h4 { font-family: var(--font-head); font-size: 13px; font-weight: 700; margin-bottom: 6px; color: #fff; }
  #tooltip p { font-size: 11px; color: var(--text-dim); line-height: 1.6; }

  #app.dragging { cursor: grabbing; }
  #canvas-wrap { position: absolute; inset: 0; cursor: grab; transform-origin: 50% 50%; }
  #canvas-wrap.dragging { cursor: grabbing; }

  #zoom-controls { position: fixed; bottom: 20px; right: 24px; z-index: 50; display: flex; gap: 6px; }
  .zoom-btn {
    width: 32px; height: 32px;
    background: rgba(13,13,20,.8); border: 1px solid rgba(255,255,255,.08);
    border-radius: 8px; color: var(--text-dim); font-size: 18px; line-height: 1;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(12px); transition: border-color .2s, color .2s;
    font-family: var(--font-head); user-select: none;
  }
  .zoom-btn:hover { border-color: rgba(255,255,255,.2); color: var(--text); }

  .node-counter { position: absolute; transform: translateX(-50%); display: flex; gap: 6px; align-items: center; pointer-events: none; transition: opacity .3s; }
  .cdot { width: 7px; height: 7px; border-radius: 50%; transition: background .35s, transform .35s cubic-bezier(.34,1.56,.64,1); }
  .cdot.empty  { background: rgba(255,255,255,.12); transform: scale(1); }
  .cdot.filled { transform: scale(1.2); }
</style>
</head>
<body>

<!-- [SUBSTITUIR: atualize o texto do header abaixo] -->
<div id="header">
  NOME DO CURSO &nbsp;·&nbsp; <span>Módulo ou Tema</span> &nbsp;·&nbsp; Mapa Mental
</div>

<div id="app">
  <div id="canvas-wrap">
    <svg id="svg-canvas" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible;"></svg>
    <div id="nodes-layer" style="position:absolute;inset:0;"></div>
  </div>
</div>

<div id="hint">Clique no centro para abrir os ramos &nbsp;·&nbsp; Clique nos ramos para expandir &nbsp;·&nbsp; Arraste para navegar &nbsp;·&nbsp; Scroll para zoom</div>
<div id="zoom-controls">
  <button class="zoom-btn" id="btn-zoom-out">−</button>
  <button class="zoom-btn" id="btn-zoom-in">+</button>
</div>
<div id="tooltip"></div>

<script>
const COLORS = ['#f59e0b','#6366f1','#10b981','#f43f5e','#3b82f6','#a855f7','#fb923c'];

// ─── [SUBSTITUIR: substitua todo o bloco const data abaixo] ───
const data = {
  id: 'center',
  icon: '🎓',
  label: 'TEMA CENTRAL',
  sub: 'Objetivo do Mapa',
  branches: [
    {
      id: 'b1', icon: '📚', label: 'Primeiro Ramo', sub: '',
      color: 0,
      tooltip: 'Descrição do que você vai aprender neste ramo.',
      leaves: [
        { id:'l1a', icon:'🎯', label:'Primeira Folha', sub:'detalhe', tooltip:'Explicação específica em 2ª pessoa do que você ganha com este tópico.' },
        { id:'l1b', icon:'💡', label:'Segunda Folha',  sub:'detalhe', tooltip:'Explicação específica em 2ª pessoa do que você ganha com este tópico.' }
      ]
    }
  ]
};
// ─── fim do bloco data ────────────────────────────────────────

let visibleBranches = new Set();
let nextBranchIdx = 0;
let visibleLeafCount = {};
let offsetX = 0, offsetY = 0;
let zoom = 1;
const ZOOM_MIN = 0.3, ZOOM_MAX = 3;
let isDragging = false, dragStartX, dragStartY, dragOffX, dragOffY;

function getLayout() {
  const W = window.innerWidth, H = window.innerHeight;
  const cx = W / 2 + offsetX, cy = H / 2 + offsetY;
  const n = data.branches.length;
  const branchR = Math.min(W, H) * 0.28;
  const leafR   = Math.min(W, H) * 0.46;
  const nodes = [], edges = [];
  nodes.push({ id: 'center', x: cx, y: cy, type: 'center', data: data });
  data.branches.forEach((branch, i) => {
    if (!visibleBranches.has(branch.id)) return;
    const angle = (2 * Math.PI * i / n) - Math.PI / 2;
    const bx = cx + branchR * Math.cos(angle);
    const by = cy + branchR * Math.sin(angle);
    nodes.push({ id: branch.id, x: bx, y: by, type: 'branch', color: branch.color, data: branch });
    edges.push({ id: `e-center-${branch.id}`, x1: cx, y1: cy, x2: bx, y2: by, color: COLORS[branch.color], type: 'branch' });
    const leafCount = visibleLeafCount[branch.id] || 0;
    const lCount = branch.leaves.length;
    const spreadAngle = Math.PI * 0.55;
    branch.leaves.slice(0, leafCount).forEach((leaf, j) => {
      const leafAngle = angle - spreadAngle / 2 + (spreadAngle / (lCount - 1 || 1)) * j;
      const lx = bx + leafR * 0.52 * Math.cos(leafAngle);
      const ly = by + leafR * 0.52 * Math.sin(leafAngle);
      nodes.push({ id: leaf.id, x: lx, y: ly, type: 'leaf', color: branch.color, data: leaf });
      edges.push({ id: `e-${branch.id}-${leaf.id}`, x1: bx, y1: by, x2: lx, y2: ly, color: COLORS[branch.color], type: 'leaf' });
    });
  });
  return { nodes, edges };
}

const svg = document.getElementById('svg-canvas');
const layer = document.getElementById('nodes-layer');
const tooltip = document.getElementById('tooltip');
let renderedNodes = {}, renderedEdges = {};

function bezierPath(x1, y1, x2, y2) {
  const dx = (x2 - x1) * 0.5, dy = (y2 - y1) * 0.5;
  return `M${x1},${y1} C${x1+dx},${y1} ${x2-dx},${y2} ${x2},${y2}`;
}

function render() {
  const { nodes, edges } = getLayout();
  const edgeIds = new Set(edges.map(e => e.id));
  Object.keys(renderedEdges).forEach(id => { if (!edgeIds.has(id)) { renderedEdges[id].remove(); delete renderedEdges[id]; } });
  edges.forEach(e => {
    if (!renderedEdges[e.id]) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'edge-path' + (e.type === 'leaf' ? ' edge-leaf' : ''));
      path.setAttribute('stroke', e.color);
      svg.appendChild(path);
      renderedEdges[e.id] = path;
    }
    renderedEdges[e.id].setAttribute('d', bezierPath(e.x1, e.y1, e.x2, e.y2));
  });
  const nodeIds = new Set(nodes.map(n => n.id));
  Object.keys(renderedNodes).forEach(id => { if (!nodeIds.has(id)) { renderedNodes[id].remove(); delete renderedNodes[id]; } });
  nodes.forEach(n => {
    if (!renderedNodes[n.id]) {
      const el = buildNodeEl(n);
      layer.appendChild(el);
      renderedNodes[n.id] = el;
      requestAnimationFrame(() => el.classList.add('popping'));
    }
    renderedNodes[n.id].style.left = n.x + 'px';
    renderedNodes[n.id].style.top  = n.y + 'px';
  });
  canvasWrap.style.transform = `scale(${zoom})`;
  const centerNode = nodes.find(n => n.id === 'center');
  if (centerNode) updateCounter(centerNode.x, centerNode.y);
  const visibleBranchNodes = nodes.filter(n => n.type === 'branch');
  const visibleBranchIds = new Set(visibleBranchNodes.map(n => n.id));
  Object.keys(leafCounterEls).forEach(id => { if (!visibleBranchIds.has(id)) { leafCounterEls[id].remove(); delete leafCounterEls[id]; } });
  visibleBranchNodes.forEach(n => updateLeafCounter(n.id, n.x, n.y, n.data));
}

function buildNodeEl(n) {
  const wrap = document.createElement('div');
  wrap.className = `node-wrap node-${n.type} accent-${n.color + 1}`;
  wrap.dataset.id = n.id;
  const node = document.createElement('div');
  node.className = 'node';
  const icon = document.createElement('span');
  icon.className = 'node-icon';
  icon.textContent = n.data.icon || '';
  const textWrap = document.createElement('div');
  const label = document.createElement('span');
  label.className = 'node-label';
  label.textContent = n.data.label;
  textWrap.appendChild(label);
  if (n.data.sub) {
    const sub = document.createElement('div');
    sub.className = 'node-sub';
    sub.textContent = n.data.sub;
    textWrap.appendChild(sub);
  }
  node.appendChild(icon);
  node.appendChild(textWrap);
  wrap.appendChild(node);
  wrap.addEventListener('click', (ev) => {
    ev.stopPropagation();
    if (n.type === 'center') toggleBranches();
    else if (n.type === 'branch') toggleBranch(n.id);
  });
  if (n.data.tooltip) {
    wrap.addEventListener('mouseenter', (ev) => showTooltip(ev, n));
    wrap.addEventListener('mouseleave', hideTooltip);
    wrap.addEventListener('mousemove', moveTooltip);
  }
  return wrap;
}

function toggleBranches() {
  if (nextBranchIdx < data.branches.length) {
    visibleBranches.add(data.branches[nextBranchIdx].id);
    nextBranchIdx++;
  } else {
    data.branches.forEach(branch => {
      branch.leaves.forEach(l => {
        if (renderedNodes[l.id]) { renderedNodes[l.id].remove(); delete renderedNodes[l.id]; }
        const eid = `e-${branch.id}-${l.id}`;
        if (renderedEdges[eid]) { renderedEdges[eid].remove(); delete renderedEdges[eid]; }
      });
      if (renderedNodes[branch.id]) { renderedNodes[branch.id].remove(); delete renderedNodes[branch.id]; }
      const eid = `e-center-${branch.id}`;
      if (renderedEdges[eid]) { renderedEdges[eid].remove(); delete renderedEdges[eid]; }
    });
    visibleBranches.clear(); visibleLeafCount = {}; nextBranchIdx = 0;
    Object.values(leafCounterEls).forEach(el => el.remove());
    leafCounterEls = {};
  }
  render();
}

function toggleBranch(id) {
  const branch = data.branches.find(b => b.id === id);
  const current = visibleLeafCount[id] || 0;
  if (current < branch.leaves.length) {
    visibleLeafCount[id] = current + 1;
  } else {
    branch.leaves.forEach(l => {
      if (renderedNodes[l.id]) { renderedNodes[l.id].remove(); delete renderedNodes[l.id]; }
      const eid = `e-${id}-${l.id}`;
      if (renderedEdges[eid]) { renderedEdges[eid].remove(); delete renderedEdges[eid]; }
    });
    visibleLeafCount[id] = 0;
  }
  render();
}

const counterEl = document.createElement('div');
counterEl.className = 'node-counter';
layer.appendChild(counterEl);
let leafCounterEls = {};

function updateCounter(cx, cy) {
  counterEl.style.left = cx + 'px';
  counterEl.style.top  = (cy + 52) + 'px';
  if (nextBranchIdx === 0) { counterEl.style.opacity = '0'; return; }
  counterEl.style.opacity = '1';
  counterEl.innerHTML = data.branches.map((b, i) =>
    `<span class="cdot ${i < nextBranchIdx ? 'filled' : 'empty'}" style="${i < nextBranchIdx ? `background:${COLORS[b.color]}` : ''}"></span>`
  ).join('');
}

function updateLeafCounter(id, bx, by, branch) {
  if (!leafCounterEls[id]) {
    const el = document.createElement('div');
    el.className = 'node-counter';
    layer.appendChild(el);
    leafCounterEls[id] = el;
  }
  const el = leafCounterEls[id];
  const color = COLORS[branch.color];
  const count = visibleLeafCount[id] || 0;
  const total = branch.leaves.length;
  el.style.left = bx + 'px';
  el.style.top  = (by + 38) + 'px';
  if (count === 0) { el.style.opacity = '0'; return; }
  el.style.opacity = '1';
  el.innerHTML = Array.from({ length: total }, (_, i) =>
    `<span class="cdot ${i < count ? 'filled' : 'empty'}" style="${i < count ? `background:${color}` : ''}"></span>`
  ).join('');
}

let tooltipTarget = null;
function showTooltip(ev, n) {
  tooltipTarget = n;
  tooltip.innerHTML = `<h4>${n.data.icon} ${n.data.label}</h4><p>${n.data.tooltip}</p>`;
  tooltip.classList.add('show');
  moveTooltip(ev);
}
function hideTooltip() { tooltipTarget = null; tooltip.classList.remove('show'); }
function moveTooltip(ev) {
  const x = ev.clientX + 14, y = ev.clientY + 14;
  tooltip.style.left = Math.min(x, window.innerWidth - 280) + 'px';
  tooltip.style.top  = Math.min(y, window.innerHeight - 120) + 'px';
}

const canvasWrap = document.getElementById('canvas-wrap');
canvasWrap.addEventListener('mousedown', e => {
  isDragging = true; dragStartX = e.clientX; dragStartY = e.clientY;
  dragOffX = offsetX; dragOffY = offsetY;
  canvasWrap.classList.add('dragging');
});
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  offsetX = dragOffX + (e.clientX - dragStartX) / zoom;
  offsetY = dragOffY + (e.clientY - dragStartY) / zoom;
  render();
});
window.addEventListener('mouseup', () => { isDragging = false; canvasWrap.classList.remove('dragging'); });

function applyZoom(factor, mx, my) {
  const W = window.innerWidth, H = window.innerHeight;
  const zoomOld = zoom;
  zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom * factor));
  offsetX += (mx - W / 2) * (1 / zoom - 1 / zoomOld);
  offsetY += (my - H / 2) * (1 / zoom - 1 / zoomOld);
  render();
}
canvasWrap.addEventListener('wheel', e => { e.preventDefault(); applyZoom(e.deltaY < 0 ? 1.1 : 0.9, e.clientX, e.clientY); }, { passive: false });
document.getElementById('btn-zoom-in').addEventListener('click',  () => applyZoom(1.2, window.innerWidth/2, window.innerHeight/2));
document.getElementById('btn-zoom-out').addEventListener('click', () => applyZoom(1/1.2, window.innerWidth/2, window.innerHeight/2));
window.addEventListener('resize', () => render());
render();
</script>
</body>
</html>
```

---

## Onde Salvar (EduSquad)

```
squads/{nome}/output/{run_id}/{step}/
  mapa-mental.html    ← arquivo gerado por esta skill
```

---

## Checklist para Novo Mapa Mental

- [ ] Definir título central e subtítulo (tema educacional)
- [ ] Mapear ramos (mínimo 3, máximo 7) — competências, fases ou áreas
- [ ] Definir 2–5 folhas por ramo — conceitos ou habilidades específicas
- [ ] Cada ramo com `color` diferente (índice 0–6)
- [ ] IDs únicos: ramos `b1`, `b2`... folhas `l1a`, `l1b`, `l2a`...
- [ ] Tooltips em 2ª pessoa para todos os nós (ramos e folhas)
- [ ] `sub` do nó central preenchido (objetivo do mapa)
- [ ] Header do `#header` atualizado com nome do curso e tema
- [ ] Todo CSS e JS idênticos ao template (não alterar motor)
- [ ] Testar revelação progressiva (clique no centro → ramos um a um)
- [ ] Testar expansão de folhas (clique no ramo → folhas uma a uma)
- [ ] Testar reset (clique no centro após todos os ramos → reseta)
- [ ] Testar drag e zoom
- [ ] Verificar tooltips em hover
