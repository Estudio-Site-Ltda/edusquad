---
name: Squad Templates
description: Fornece templates prontos de squads para os cenários educacionais mais comuns — curso online completo, treinamento corporativo (RH), aula presencial (BNCC), módulo de e-learning e trilha de aprendizagem. Use quando o usuário quiser criar um novo squad e precisar de um ponto de partida, ou quando o Pedagogo estiver no fluxo de criação de squads e precisar de referência de estrutura.
type: prompt
version: 1.0.0
categories: [squads, templates, orchestration, pedagogia]
---

# Squad Templates — Configurações Prontas

Esta skill fornece templates de squads prontos para os cenários mais comuns do EduSquad. Cada template inclui `squad.yaml`, definição de agentes, pipeline de steps e skills recomendadas.

---

## Template 1 — Curso Online Completo

**Cenário:** criador de cursos quer produzir um curso EAD completo com vídeos, material de apoio, quizzes e SCORM.

```yaml
# squads/curso-online/squad.yaml
code: curso-online-completo
name: "[Nome do Curso]"
description: "Curso online completo com vídeos, PDF de apoio, quiz e SCORM"
updated: YYYY-MM-DD

target:
  audience: "[descrição do público]"
  format: curso-online
  duration: "[Xh]"
  platform: "[Hotmart / Teachable / Moodle / LMS Estúdio]"
  language: pt-BR

skills:
  - bloom
  - instructional-design
  - video-script
  - storyboard
  - quiz-builder
  - scorm-builder
  - canva
  - gamma

agents:
  - id: pedagogo
    name: Pedagogo
    icon: 🎓
    role: >
      Define objetivos de aprendizagem (Bloom), estrutura curricular,
      sequência de módulos e estratégias pedagógicas.

  - id: pesquisador
    name: Pesquisador
    icon: 🔍
    role: >
      Levanta conteúdo de referência, dados, exemplos reais e casos
      de uso para enriquecer o curso.

  - id: roteirista
    name: Roteirista
    icon: ✍️
    role: >
      Escreve roteiros de vídeo com estrutura didática — hook, conteúdo,
      exemplos, síntese e chamada para ação.

  - id: designer-instrucional
    name: Designer Instrucional
    icon: 🎨
    role: >
      Estrutura SCORMs, quizzes, interatividades e materiais de apoio.
      Garante acessibilidade e UX do conteúdo.

  - id: revisor
    name: Revisor
    icon: ✅
    role: >
      Valida alinhamento pedagógico, clareza, consistência e qualidade
      de todos os entregáveis antes da publicação.

pipeline:
  steps:
    - file: step-01-estrutura-curricular.md
      checkpoint: true
    - file: step-02-roteiros-video.md
      checkpoint: false
    - file: step-03-storyboards.md
      checkpoint: true
    - file: step-04-material-apoio.md
      checkpoint: false
    - file: step-05-quiz-avaliacao.md
      checkpoint: true
    - file: step-06-scorm.md
      checkpoint: false
    - file: step-07-revisao-final.md
      checkpoint: true
```

**Steps sugeridos:**

| Step | Agente | Output |
|------|--------|--------|
| 01 — Estrutura curricular | Pedagogo | Módulos, objetivos Bloom, sequência |
| 02 — Roteiros de vídeo | Roteirista | `roteiro-modulo-N.md` por módulo |
| 03 — Storyboards | Roteirista + DI | `storyboard-modulo-N.md` |
| 04 — Material de apoio | DI | `apostila.md`, `pdf-resumo.md` |
| 05 — Quiz e avaliação | DI | `quiz.json`, `quiz.html`, `quiz-moodle.csv` |
| 06 — SCORM | DI | `scorm/course.zip` |
| 07 — Revisão final | Revisor | Relatório de revisão + aprovação |

---

## Template 2 — Treinamento Corporativo (RH)

**Cenário:** equipe de RH ou T&D precisa criar um treinamento empresarial com avaliação Kirkpatrick.

```yaml
code: treinamento-corporativo
name: "[Nome do Treinamento]"
description: "Treinamento empresarial com design instrucional, avaliação Kirkpatrick e materiais de apoio"

target:
  audience: "[cargo/área dos participantes]"
  format: blended
  duration: "[Xh]"
  platform: "[LMS corporativo]"

skills:
  - rh-training
  - bloom
  - instructional-design
  - video-script
  - quiz-builder
  - scorm-builder
  - canva
  - accessibility

agents:
  - id: analista-td
    name: Analista de T&D
    icon: 📊
    role: >
      Conduz a Análise de Necessidades de Treinamento (ANT), define o gap
      de desempenho, causa raiz e indicadores de sucesso (Kirkpatrick nível 4).

  - id: conteudista
    name: Conteudista
    icon: ✍️
    role: >
      Produz o conteúdo técnico e comportamental do treinamento com
      linguagem corporativa e exemplos do contexto da empresa.

  - id: designer
    name: Designer Instrucional
    icon: 🎨
    role: >
      Cria os materiais visuais, job aids, apresentações e e-learnings.
      Garante acessibilidade e engajamento.

  - id: avaliador
    name: Avaliador
    icon: 📝
    role: >
      Desenvolve instrumentos de avaliação nos 4 níveis Kirkpatrick:
      pesquisa de reação, pré/pós teste, checklist 90 dias e KPIs.

  - id: revisor
    name: Revisor
    icon: ✅
    role: >
      Valida compliance, tom corporativo, adequação ao público e
      efetividade pedagógica do material.

pipeline:
  steps:
    - file: step-01-ant-diagnostico.md
      checkpoint: true
    - file: step-02-design-instrucional.md
      checkpoint: true
    - file: step-03-conteudo-modulos.md
      checkpoint: false
    - file: step-04-materiais-apoio.md
      checkpoint: false
    - file: step-05-avaliacao-kirkpatrick.md
      checkpoint: true
    - file: step-06-scorm-elearning.md
      checkpoint: false
    - file: step-07-revisao-aprovacao.md
      checkpoint: true
```

---

## Template 3 — Aula Presencial com Alinhamento BNCC

**Cenário:** professor da Educação Básica quer planejar uma aula ou sequência didática alinhada à BNCC.

```yaml
code: aula-bncc
name: "[Tema da Aula] — [Componente] [Ano]"
description: "Plano de aula e materiais didáticos alinhados à BNCC"

target:
  audience: "[Xº ano do EF / EM]"
  format: presencial
  duration: "[X aulas de 50 min]"
  platform: sala-de-aula

skills:
  - bncc
  - bloom
  - instructional-design
  - flowchart-creator
  - mind-map-creator
  - quiz-builder
  - canva

agents:
  - id: pedagogo
    name: Pedagogo
    icon: 🎓
    role: >
      Alinha a aula à BNCC, define objetivos com verbos de Bloom,
      e estrutura a sequência didática com metodologias ativas.

  - id: conteudista
    name: Conteudista
    icon: ✍️
    role: >
      Desenvolve explicações, exemplos, textos de apoio e
      atividades adequadas à faixa etária e nível cognitivo.

  - id: criador-atividades
    name: Criador de Atividades
    icon: 🎮
    role: >
      Produz exercícios, dinâmicas, quizzes e atividades práticas
      que fixam o conteúdo e desenvolvem as habilidades BNCC.

  - id: revisor
    name: Revisor Pedagógico
    icon: ✅
    role: >
      Verifica alinhamento BNCC, adequação à faixa etária,
      clareza e coerência da sequência didática.

pipeline:
  steps:
    - file: step-01-alinhamento-bncc.md
      checkpoint: true
    - file: step-02-plano-de-aula.md
      checkpoint: false
    - file: step-03-material-didatico.md
      checkpoint: false
    - file: step-04-atividades-avaliacao.md
      checkpoint: true
    - file: step-05-slides-apoio.md
      checkpoint: false
```

---

## Template 4 — Módulo de E-Learning Rápido

**Cenário:** produção rápida de um módulo de e-learning curto (microlearning) para tema específico.

```yaml
code: microlearning
name: "[Tema do Módulo]"
description: "Módulo de microlearning — 5 a 15 minutos, SCORM + quiz"

target:
  audience: "[público]"
  format: e-learning
  duration: "5-15 min"
  platform: "[LMS]"

skills:
  - instructional-design
  - video-script
  - quiz-builder
  - scorm-builder

agents:
  - id: designer-instrucional
    name: Designer Instrucional
    icon: 🎨
    role: >
      Cria o módulo completo: conteúdo, interatividades e quiz.
      Foco em objetivos precisos e conteúdo mínimo necessário.

pipeline:
  steps:
    - file: step-01-objetivo-e-conteudo.md
      checkpoint: true
    - file: step-02-scorm-quiz.md
      checkpoint: true
```

---

## Template 5 — Trilha de Aprendizagem

**Cenário:** criar uma trilha completa com múltiplos módulos em sequência lógica, com pré-requisitos e progressão de competências.

```yaml
code: trilha-aprendizagem
name: "[Nome da Trilha]"
description: "Trilha de aprendizagem com N módulos, pré-requisitos e progressão de competências"

target:
  audience: "[público]"
  format: trilha
  duration: "[X horas no total]"
  platform: "[LMS]"

skills:
  - bloom
  - instructional-design
  - scorm-builder
  - quiz-builder
  - video-script
  - canva
  - gamma

agents:
  - id: arquiteto-trilha
    name: Arquiteto da Trilha
    icon: 🗺️
    role: >
      Define a sequência dos módulos, pré-requisitos, progressão de
      competências e critérios de conclusão de cada etapa.

  - id: conteudista
    name: Conteudista
    icon: ✍️
    role: >
      Produz o conteúdo de cada módulo mantendo consistência de
      linguagem, profundidade e referências cruzadas entre módulos.

  - id: avaliador
    name: Avaliador
    icon: 📝
    role: >
      Cria avaliações de nivelamento (entrada), formativas (entre módulos)
      e somativa (conclusão da trilha).

pipeline:
  steps:
    - file: step-01-mapa-da-trilha.md
      checkpoint: true
    - file: step-02-modulo-N.md          # repetir por módulo
      checkpoint: false
    - file: step-03-avaliacoes.md
      checkpoint: true
    - file: step-04-publicacao.md
      checkpoint: true
```

---

## Como Usar os Templates

O Agente Pedagogo usa estes templates como ponto de partida no fluxo de criação de squads:

1. **Identifica o cenário** do usuário (curso online, RH, BNCC, etc.)
2. **Carrega o template correspondente** desta skill
3. **Personaliza** com o tema, público, plataforma e duração específicos
4. **Gera os arquivos** `squad.yaml`, agent definitions e step files

O usuário pode solicitar um template diretamente:
```
/edusquad criar     → Pedagogo pergunta o tipo → carrega template
```

Ou referenciar diretamente:
```
"Crie um squad de treinamento corporativo sobre CNV para líderes"
→ Pedagogo carrega Template 2 e personaliza
```
