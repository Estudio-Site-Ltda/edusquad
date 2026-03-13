---
name: Storyboard
description: Gera storyboards visuais frame a frame para produção de vídeos educacionais — descreve cenas, enquadramentos, narração, B-roll, transições e notas de edição em formato estruturado (Markdown) e opcionalmente como HTML visual. Use quando o usuário pedir "storyboard", "planejamento de vídeo", "roteiro visual", "plano de cenas", "sequência de frames" ou quando um roteiro de vídeo precisar ser detalhado para produção.
type: prompt
version: 1.0.0
categories: [video, producao, storyboard, roteiro, visual]
---

# Storyboard Skill — Planejamento Visual para Vídeo Educacional

Esta skill transforma roteiros de vídeo em **storyboards detalhados frame a frame**, prontos para guiar a equipe de produção (ou a IA geradora de vídeo) com precisão total sobre cada cena.

---

## O que esta skill entrega

```
squads/{nome}/output/{run_id}/{step}/
  storyboard.md        ← storyboard em Markdown (formato principal)
  storyboard.html      ← versão visual interativa (opcional)
```

---

## Estrutura de um Frame

Cada frame do storyboard contém:

```markdown
### Frame [N] — [Nome da Cena]

| Campo | Valor |
|-------|-------|
| **Duração** | [X segundos] |
| **Tipo de plano** | [ver tabela abaixo] |
| **Ângulo** | [normal / alto / baixo / holandês] |
| **Movimento** | [estático / pan / zoom in / zoom out / dolly] |

**Visual / O que aparece na tela:**
> [descrição detalhada do que o espectador vê — personagem, fundo, elementos gráficos, texto na tela]

**Narração / Fala:**
> "[texto exato narrado ou falado neste frame]"

**Áudio / Música:**
> [música de fundo, SFX, silêncio]

**Notas de produção:**
> [instruções para câmera, animação, edição, grafismo, B-roll a inserir]
```

---

## Tipos de Plano

| Tipo | Sigla | O que mostra | Uso educacional |
|------|-------|-------------|----------------|
| Plano Geral | PG | Ambiente inteiro | Estabelecer contexto, cenário |
| Plano Médio | PM | Pessoa da cintura para cima | Apresentador falando |
| Plano Americano | PA | Joelhos para cima | Entrevistas, diálogos |
| Primeiro Plano | PP | Rosto e ombros | Emoção, conexão com o aprendiz |
| Primeiríssimo Plano | PPP | Apenas o rosto | Impacto, revelação importante |
| Plano Detalhe | PD | Objeto ou detalhe | Demonstração de produto/procedimento |
| Close-up | CU | Equivalente ao PP | Destaque de elemento específico |
| Insert | INS | Tela, documento, gráfico | Mostrar conteúdo de referência |

---

## Estrutura do Storyboard Completo

```markdown
# Storyboard — [Título do Vídeo]

## Metadados

| Campo | Valor |
|-------|-------|
| Vídeo | [nome do vídeo] |
| Módulo / Curso | [nome] |
| Duração estimada | [X min] |
| Formato | [16:9 / 9:16 / 1:1] |
| Estilo de produção | [talking head / screencast / animação / híbrido] |
| Narrador/Apresentador | [nome ou "narração em off"] |
| Versão | 1.0 |

---

## Sequência de Frames

[frames aqui]

---

## Recursos de Produção Necessários

### Gravações necessárias
- [ ] Apresentador: [X cenas, Y minutos de gravação estimados]
- [ ] B-roll: [lista de imagens/vídeos de apoio necessários]
- [ ] Screencasts: [lista de telas a capturar]

### Grafismos e Animações
- [ ] [Lower thirds com nome do apresentador]
- [ ] [Gráfico de barras animado — Frame 5]
- [ ] [Texto animado — Frame 8]

### Áudios
- [ ] Narração gravada: [X minutos]
- [ ] Trilha musical: [estilo — ex: "lo-fi instrumental, tom reflexivo"]
- [ ] SFX: [lista de efeitos sonoros]
```

---

## Exemplos Educacionais

### Exemplo 1 — Vídeo de Introdução a Módulo (3 min)

```markdown
# Storyboard — Introdução ao Módulo 1: Fundamentos de Python

## Metadados
| Duração | 3 min | Formato | 16:9 |
| Estilo | Talking head + Screencast | Narrador | Apresentador (câmera) |

---

### Frame 01 — Abertura / Hook

| Duração | 8s | Plano | Plano Médio |
| Ângulo | Normal | Movimento | Estático |

**Visual:**
> Apresentador enquadrado à esquerda da tela. Fundo desfocado com tela de código.
> No lado direito, texto animado: "Você vai criar seu primeiro programa hoje."

**Narração:**
> "Você já imaginou dar instruções para o computador e ele obedecer? Isso é exatamente o que você vai aprender agora."

**Áudio:** Trilha suave, fade in nos primeiros 2s.

**Notas:** Apresentador mantém contato visual com câmera. Expressão confiante.

---

### Frame 02 — Título do Módulo

| Duração | 4s | Plano | Insert (tela cheia) |
| Ângulo | — | Movimento | Animação de entrada |

**Visual:**
> Tela preta com texto animado aparecendo: "MÓDULO 1" (pequeno, topo)
> "Fundamentos de Python" (grande, centro) · "Python para Iniciantes"

**Narração:** [silêncio — apenas música]

**Áudio:** Trilha principal, leve acento sonoro na entrada do título.

**Notas:** Animação: texto desliza de baixo para cima. Duração: 0.4s ease-out.

---

### Frame 03 — Agenda do Módulo

| Duração | 12s | Plano | Insert (tela dividida) |
| Ângulo | — | Movimento | Zoom suave |

**Visual:**
> Lado esquerdo: apresentador (PM). Lado direito: lista aparecendo item a item:
> "1. O que é Python?" · "2. Variáveis" · "3. Seu primeiro programa"

**Narração:**
> "Neste módulo você vai descobrir o que é Python, aprender a criar variáveis
> e, no final, escrever o seu primeiro programa real. Vamos lá?"

**Áudio:** Trilha contínua. Tom otimista.

**Notas:** Cada item da lista aparece sincronizado com a narração. Lower third:
"Prof. [Nome] · Designer Instrucional" durante os primeiros 5s.

---

### Frame 04 — Transição para Screencast

| Duração | 2s | Plano | Insert (tela do computador) |
| Ângulo | — | Movimento | Zoom in suave |

**Visual:**
> Tela do computador com IDE aberta (VS Code ou Trinket.io).
> Cursor piscando no editor.

**Narração:**
> "Abra o seu editor de código..."

**Notas:** Screencast gravado separadamente. Resolução 1920×1080, sem cursor jumpy.

---

### Frame 05 — Demonstração: "Olá, Mundo!"

| Duração | 20s | Plano | Insert (screencast) |
| Ângulo | — | Movimento | Estático + zoom suave no código |

**Visual:**
> Código digitado em tempo real:
> `print("Olá, Mundo!")`
> Execução: terminal exibe `Olá, Mundo!`

**Narração:**
> "Digite: print, abre parêntese, aspas, Olá vírgula Mundo, fecha aspas, fecha parêntese.
> Agora pressione Enter para executar. E olha — o computador respondeu!"

**Áudio:** SFX suave de "ding" ao executar com sucesso.

**Notas:** Digitar devagar — 1 palavra por segundo. Cursor visível. Terminal abaixo do editor.

---

### Frame 06 — Encerramento

| Duração | 10s | Plano | Plano Médio |
| Ângulo | Normal | Movimento | Zoom out leve |

**Visual:**
> Apresentador. Fundo com código desfocado. Texto no canto: "Próximo: Variáveis →"

**Narração:**
> "Você acabou de escrever seu primeiro programa em Python. No próximo vídeo,
> você vai aprender a usar variáveis — a base de qualquer código. Até lá!"

**Áudio:** Trilha sobe levemente e faz fade out nos últimos 2s.

**Notas:** Apresentador aponta para o texto "Próximo" com gesto natural.
```

---

### Exemplo 2 — Vídeo Conceitual Animado (1.5 min)

```markdown
# Storyboard — O que é Taxonomia de Bloom? (Animação)

### Frame 01 — Pergunta de abertura
| Duração | 5s | Plano | Tela cheia animada |

**Visual:** Fundo escuro. Pergunta aparece letra a letra:
"Por que alguns alunos entendem mas não conseguem aplicar?"

**Narração:** [silêncio — música pensativa]

---

### Frame 02 — Introdução da Pirâmide
| Duração | 15s | Plano | Animação — pirâmide construída de baixo para cima |

**Visual:** Pirâmide de 6 andares se constrói animada, um nível de cada vez,
com cor e nome de cada nível:
Lembrar (azul) → Compreender (verde) → Aplicar (amarelo) →
Analisar (laranja) → Avaliar (vermelho-claro) → Criar (vermelho)

**Narração:**
> "Em 1956, Benjamin Bloom mapeou os 6 níveis do pensamento humano —
> do mais simples ao mais complexo."

**Notas:** Cada nível aparece sincronizado com a narração, 2.5s por nível.
Animação: slide de baixo + fade.
```

---

## Estilos de Produção

| Estilo | Descrição | Quando usar |
|--------|-----------|------------|
| **Talking head** | Apresentador falando para câmera | Aulas, introduções, mentorias |
| **Screencast** | Gravação de tela + narração | Tutoriais de software, demonstrações |
| **Animação 2D** | Motion graphics, personagens | Conceitos abstratos, engajamento alto |
| **Híbrido** | Talking head + screencast + animação | Cursos completos de qualidade |
| **Whiteboard** | Desenho na tela em tempo real | Explicações matemáticas, diagramas |
| **Slide narrado** | Slides com narração em off | Treinamentos rápidos, atualizações |

---

## Integração com Outras Skills

| Skill | Fluxo com Storyboard |
|-------|---------------------|
| `video-script` | O roteiro é a entrada do storyboard — transformar cada beat em frames |
| `canva` | Produzir os grafismos e lower thirds descritos nos frames |
| `accessibility` | Planejar momentos de AD, pausas para legenda, contraste de fundo |
| `scorm-builder` | O vídeo produzido pode ser incorporado como objeto de aprendizagem |

---

## Checklist do Storyboard

- [ ] Todos os frames numerados e nomeados
- [ ] Duração estimada por frame (soma deve bater com duração total do vídeo)
- [ ] Tipo de plano definido em cada frame
- [ ] Narração escrita palavra por palavra (não apenas "fala sobre X")
- [ ] B-roll identificado e listado em "Recursos"
- [ ] Grafismos e animações especificados com comportamento (entrada, saída, duração)
- [ ] Notas de produção suficientes para produzir sem o autor presente
- [ ] Acessibilidade: momentos de AD sinalizados, pausas para legendas longas
- [ ] Música/SFX especificados por frame
- [ ] Lower thirds identificados (nome, cargo, timing)
