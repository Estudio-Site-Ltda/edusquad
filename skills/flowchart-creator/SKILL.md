---
name: Flowchart Creator
description: Gera um fluxograma interativo standalone em HTML com estética de quadro-negro — ideal para visualizar sequências didáticas, jornadas de aprendizagem, processos pedagógicos, fluxos de decisão em avaliações e roteiros de aula. Use quando o usuário pedir "fluxograma", "flowchart", "mapa de processo", "sequência didática visual" ou quiser visualizar etapas de um conteúdo educacional.
type: prompt
version: 1.0.0
categories: [conteudo, visual, fluxograma, apresentacao]
---

# Flowchart Creator — Fluxograma Estilo Quadro-Negro

Esta skill gera um arquivo HTML standalone — sem build, sem dependências externas além de uma fonte Google — que apresenta conteúdo educacional como um fluxograma interativo com estética de quadro-negro (blackboard).

Use para visualizar: sequências didáticas, jornadas de aprendizagem, processos do modelo ADDIE, fluxos de avaliação, roteiros de aula, trilhas de curso, árvores de decisão pedagógica.

---

## Estética Visual (OBRIGATÓRIA)

### Identidade

- **Fundo:** preto absoluto `#0a0a0a`
- **Caixas:** retangulares, bordas brancas, cantos levemente arredondados (`border-radius: 4px`)
- **Tipografia:** fonte manuscrita estilo quadro-negro — **Caveat** (principal) + **Kalam** (subtítulos/notas)
- **Setas:** brancas, desenhadas com SVG, estilo esboço (não perfeitamente retas — leve ondulação)
- **Cor de destaque:** branco puro para texto principal, `rgba(255,255,255,0.45)` para notas secundárias
- **Sem gradientes**, sem glassmorphism, sem cores vibrantes — apenas branco sobre preto

### Fontes (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400&display=swap" rel="stylesheet">
```

| Papel | Família | Peso | Tamanho |
|---|---|---|---|
| Label da caixa | Caveat | 700 | 20px |
| Subtítulo/nota | Kalam | 400 | 14px |
| Header da página | Caveat | 700 | 16px |

### CSS Base

```css
:root {
  --bg: #0a0a0a;
  --box-bg: rgba(255,255,255,0.03);
  --box-border: rgba(255,255,255,0.85);
  --box-border-dim: rgba(255,255,255,0.35);
  --text: #ffffff;
  --text-dim: rgba(255,255,255,0.45);
  --arrow: rgba(255,255,255,0.7);
  --font-main: 'Caveat', cursive;
  --font-note: 'Kalam', cursive;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-main);
  overflow-x: hidden;
}

/* Textura sutil de quadro (grain) */
body::before {
  content: '';
  position: fixed; inset: 0; z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.6;
}
```

---

## Estrutura de Dados (JS)

```js
const data = {
  title: 'Título do Fluxograma',
  subtitle: 'subtítulo ou tema',
  steps: [
    {
      id: 'step1',
      label: 'Nome da Etapa',
      note: 'Detalhe ou explicação curta',   // opcional
      type: 'normal' | 'decision' | 'start' | 'end',
    },
  ],
  connections: [
    { from: 'step1', to: 'step2', label: '' },
    { from: 'step2', to: 'step3a', label: 'Sim' },
    { from: 'step2', to: 'step3b', label: 'Não' },
  ]
};
```

### Tipos de nó

| type | Visual | Uso Educacional |
|---|---|---|
| `'start'` | Caixa com borda dupla sutil | Início da aula / módulo |
| `'end'` | Caixa com borda dupla sutil | Conclusão / avaliação final |
| `'normal'` | Caixa retangular padrão | Etapas de conteúdo |
| `'decision'` | Losango (rotacionado 45°) | Ponto de decisão / bifurcação |
| `'terminal'` | Caixa com borda tracejada e texto dimmed | Desvio que sai do fluxo principal |

**`'terminal'` é diferente de `'end'`:** `end` é o destino final do fluxo principal. `terminal` é um caminho que sai do fluxo antes de chegar lá — representa uma condição não atendida, um desvio, ou uma instrução de "retorne depois". Visualmente mais apagado para não confundir com o fim real.

```css
.type-terminal .step-box {
  border-style: dashed;
  border-color: rgba(255,255,255,.35);
  background: rgba(255,255,255,.01);
}
.type-terminal .step-label { font-size: 17px; color: rgba(255,255,255,.55); }
.type-terminal .step-note  { color: rgba(255,255,255,.28); }
```

---

## Layout

### Modo Vertical (padrão)

Steps empilhados de cima para baixo com setas verticais. Ideal para sequências lineares — roteiros de aula, passos de um tutorial, etapas do ADDIE.

```
[INÍCIO] → [Diagnóstico] → [Conteúdo 1] → [Atividade?]
                                            ↓ Sim      ↓ Não
                                       [Próxima]  [Reforço]
                                            ↓          ↓
                                       [Avaliação] ←──┘
                                            ↓
                                         [FIM]
```

### Modo Filtro (fluxo de qualificação)

Ideal para conteúdo que requer que o aprendiz tome decisões sobre si mesmo — diagnósticos de aprendizagem, pré-requisitos de curso, trilhas adaptativas.

```
        [INÍCIO]
           ↓
    [Tem pré-requisito?]──Sim──▶ [terminal: faça o módulo X primeiro]
           ↓ Não
    [É iniciante?]──Não──▶ [terminal: vá para o módulo avançado]
           ↓ Sim
    [Etapa A — Conceito]
           ↓
    [Etapa B — Prática]
           ↓
         [FIM]
```

Posicionamento: terminais em `x: -300` (esquerda), fluxo principal em `x: 0`. Espaçamento entre decisões consecutivas: **mínimo 270px**.

### Modo Horizontal

Steps distribuídos da esquerda para direita. Ideal para fases paralelas ou quando há poucos steps — ex: fases do ADDIE lado a lado.

---

## Exemplos Educacionais de Uso

### Exemplo 1 — Sequência Didática de Aula

```js
const data = {
  title: 'Sequência Didática',
  subtitle: 'Introdução à Programação — Aula 3',
  steps: [
    { id: 'start',    label: 'Início da Aula',       note: '5 min',  type: 'start' },
    { id: 'revisao',  label: 'Revisão Anterior',     note: '10 min', type: 'normal' },
    { id: 'hook',     label: 'Problema Real',         note: '5 min',  type: 'normal' },
    { id: 'conteudo', label: 'Loops em Python',       note: '20 min', type: 'normal' },
    { id: 'pratica',  label: 'Exercício Guiado',      note: '15 min', type: 'normal' },
    { id: 'avaliou',  label: 'Compreendeu?',          note: '',       type: 'decision' },
    { id: 'desafio',  label: 'Desafio Extra',         note: '10 min', type: 'normal' },
    { id: 'reforco',  label: 'Revisão Personalizada', note: '10 min', type: 'terminal' },
    { id: 'sintese',  label: 'Síntese Final',         note: '5 min',  type: 'normal' },
    { id: 'end',      label: 'Encerramento',          note: '',       type: 'end' },
  ],
  connections: [
    { from: 'start',    to: 'revisao'  },
    { from: 'revisao',  to: 'hook'     },
    { from: 'hook',     to: 'conteudo' },
    { from: 'conteudo', to: 'pratica'  },
    { from: 'pratica',  to: 'avaliou'  },
    { from: 'avaliou',  to: 'desafio',  label: 'Sim' },
    { from: 'avaliou',  to: 'reforco',  label: 'Não' },
    { from: 'desafio',  to: 'sintese'  },
    { from: 'reforco',  to: 'sintese'  },
    { from: 'sintese',  to: 'end'      },
  ]
};
```

### Exemplo 2 — Processo ADDIE

```js
const data = {
  title: 'Processo ADDIE',
  subtitle: 'Design Instrucional — Desenvolvimento de Curso',
  steps: [
    { id: 'start',   label: 'Demanda Identificada', note: '',        type: 'start' },
    { id: 'analise', label: 'Analysis',              note: 'Quem? Por quê?', type: 'normal' },
    { id: 'design',  label: 'Design',                note: 'Objetivos + estrutura', type: 'normal' },
    { id: 'dev',     label: 'Development',           note: 'Produção do conteúdo', type: 'normal' },
    { id: 'impl',    label: 'Implementation',        note: 'Entrega ao aprendiz', type: 'normal' },
    { id: 'avalia',  label: 'Evaluation',            note: 'Kirkpatrick 4 níveis', type: 'normal' },
    { id: 'ok',      label: 'Meta atingida?',        note: '',        type: 'decision' },
    { id: 'end',     label: 'Publicação Final',      note: '',        type: 'end' },
    { id: 'revisar', label: 'Revisar Design',        note: 'Iterar', type: 'terminal' },
  ],
  connections: [
    { from: 'start',   to: 'analise' },
    { from: 'analise', to: 'design'  },
    { from: 'design',  to: 'dev'     },
    { from: 'dev',     to: 'impl'    },
    { from: 'impl',    to: 'avalia'  },
    { from: 'avalia',  to: 'ok'      },
    { from: 'ok',      to: 'end',     label: 'Sim' },
    { from: 'ok',      to: 'revisar', label: 'Não' },
  ]
};
```

---

## Interatividade

### Revelação progressiva

- **Estado inicial:** apenas o primeiro step visível (`[START]` ou step 1)
- **Clique em qualquer lugar / tecla ESPAÇO / seta direita:** revela o próximo step + sua conexão animada
- **Todas as etapas reveladas → próximo clique:** reseta tudo
- Animação de entrada das caixas: fade + slide vertical sutil
- Animação das setas: `stroke-dashoffset` desenhando da origem ao destino

### Controles

```
ESPAÇO / → : avançar
← : voltar um step
R : resetar
```

Hint fixo no rodapé:
```html
<div id="hint">Pressione ESPAÇO ou clique para avançar &nbsp;·&nbsp; ← para voltar &nbsp;·&nbsp; R para reiniciar</div>
```

### Zoom e Pan

Incluir se o fluxograma tiver mais de 8 steps. `wheel` para zoom, `mousedown` para pan.

---

## SVG das Setas

Usar SVG absoluto sobreposto ao canvas. As setas devem:

1. Ter `marker-end` com arrowhead simples branco
2. Usar path com leve curva bezier (não linha reta — remete ao traço de giz)
3. Animar com `stroke-dashoffset` via **JS transition** (não CSS keyframe com `--dash-len`)

### Comprimento da seta — estimativa geométrica

**NUNCA** usar `getTotalLength()` com DOM temporário.

```js
function estimateLen(a1, a2) {
  const dx = a2.x - a1.x, dy = a2.y - a1.y;
  return Math.ceil(Math.sqrt(dx*dx + dy*dy) * 1.3) + 40;
}
```

### Animação da seta — via JS transition

```js
// 1. ao construir (buildEdge):
const len = estimateLen(a1, a2);
path.style.strokeDasharray  = len;
path.style.strokeDashoffset = len;

// 2. ao revelar (dentro de requestAnimationFrame):
path.style.opacity    = '1';
path.style.transition = 'stroke-dashoffset .45s ease';
path.style.strokeDashoffset = '0';
```

### Pan — prevenir avanço acidental após arrastar

```js
let hasDragged = false;
canvasWrap.addEventListener('mousedown', e => {
  isDragging = true; hasDragged = false;
});
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  if (Math.abs(e.clientX - dragStartX) > 4 || Math.abs(e.clientY - dragStartY) > 4)
    hasDragged = true;
});
appEl.addEventListener('click', e => {
  if (hasDragged) { hasDragged = false; return; }
  advance();
});
```

### Losango (decision) — half-extents corretos

```js
const HALF = {
  normal:   { hw: 115, hh: 36 },
  start:    { hw: 115, hh: 36 },
  end:      { hw: 115, hh: 36 },
  terminal: { hw: 115, hh: 36 },
  decision: { hw: 99,  hh: 99 },  // metade da diagonal do 140×140 rotacionado
};
```

---

## Estrutura do Arquivo HTML

```
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>[Título] — Fluxograma</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Kalam:wght@300;400&display=swap" rel="stylesheet">
  <style>/* CSS completo aqui */</style>
</head>
<body>
  <div id="header">[TÍTULO] · <span>[subtítulo]</span> · Fluxograma</div>
  <div id="app">
    <div id="canvas-wrap">
      <svg id="svg-arrows"></svg>
      <div id="steps-layer"></div>
    </div>
  </div>
  <div id="hint">Pressione ESPAÇO ou clique para avançar ...</div>
  <script>
    const data = { ... };
    // motor de renderização e interatividade
  </script>
</body>
</html>
```

---

## Onde Salvar (EduSquad)

```
squads/{nome}/output/{run_id}/{step}/
  fluxograma.html    ← arquivo gerado por esta skill
```

---

## Checklist para Novo Fluxograma

- [ ] Definir título e subtítulo (tema educacional)
- [ ] Mapear todos os steps (mínimo 4, máximo ~15)
- [ ] Identificar bifurcações pedagógicas (tipo `decision`) se houver
- [ ] Definir conexões com labels opcionais nas setas (ex: "Sim"/"Não", "Concluiu"/"Revisão")
- [ ] Escolher layout: vertical (sequência linear) ou filtro (diagnóstico/trilha adaptativa)
- [ ] Labels curtos (máx. ~4 palavras) — quadro-negro não suporta textos longos
- [ ] Notas (`note`) com tempo ou contexto adicional (ex: "20 min", "individual")
- [ ] Testar revelação progressiva (clique / ESPAÇO avança um step por vez)
- [ ] Testar reset (após último step, próximo clique reinicia)
- [ ] Verificar legibilidade: texto mínimo 18px para visibilidade em projetor
