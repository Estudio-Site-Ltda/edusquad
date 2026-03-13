---
name: RH Training
description: Aplica frameworks de Treinamento & Desenvolvimento (T&D) corporativo — Kirkpatrick 4 níveis, modelo 70-20-10, análise de necessidades, ROI de treinamento e design instrucional para o contexto empresarial. Use quando o usuário pedir "treinamento corporativo", "T&D", "capacitação", "onboarding", "trilha de liderança", "programa de desenvolvimento", "avaliação de impacto de treinamento" ou qualquer formação voltada ao ambiente empresarial.
type: prompt
version: 1.0.0
categories: [corporativo, rh, treinamento, kirkpatrick, lideranca]
---

# RH Training Skill — Treinamento & Desenvolvimento Corporativo

Esta skill aplica os principais frameworks de T&D corporativo para garantir que treinamentos empresariais sejam planejados, executados e avaliados com rigor metodológico.

---

## Frameworks Incluídos

### 1. Modelo de Kirkpatrick — 4 Níveis de Avaliação

O padrão ouro para medir o impacto real de treinamentos:

| Nível | Nome | O que mede | Como medir |
|-------|------|-----------|------------|
| 1 | **Reação** | Satisfação imediata do participante | Pesquisa pós-treinamento (NPS, escala Likert) |
| 2 | **Aprendizagem** | Conhecimento ou habilidade adquirida | Avaliação pré/pós · Quiz · Prova prática |
| 3 | **Comportamento** | Aplicação no trabalho (30/60/90 dias) | Observação · Checklist · Avaliação 360° |
| 4 | **Resultado** | Impacto nos indicadores do negócio | KPIs · ROI · Redução de erros · Produtividade |

> **Regra de ouro:** planeje o nível 4 antes de desenhar o treinamento — comece pelo resultado esperado e trabalhe de trás para frente (Kirkpatrick Backwards Design).

---

### 2. Modelo 70-20-10

Distribuição de como adultos aprendem no ambiente corporativo:

```
70%  →  Aprendizagem pela experiência no trabalho
         (projetos desafiadores, rotação de funções, stretch assignments)

20%  →  Aprendizagem social e relacional
         (mentoria, coaching, feedback, comunidades de prática)

10%  →  Aprendizagem formal
         (treinamentos, cursos, e-learnings, workshops)
```

**Implicação para o design:** um treinamento isolado (os 10%) raramente gera mudança de comportamento. O design deve incluir os 70% e os 20%.

---

### 3. Análise de Necessidades de Treinamento (ANT)

Antes de qualquer design, responder:

```yaml
diagnostico:
  gap_de_desempenho: "O que as pessoas estão fazendo vs. o que deveriam fazer?"
  causa_raiz: "É falta de conhecimento/habilidade ou outro fator (processo, motivação)?"
  publico_alvo:
    - quem são os aprendizes?
    - qual nível hierárquico / área?
    - experiência prévia no tema?
  contexto_de_aplicacao: "Onde vão usar o que aprenderem?"
  indicadores_de_sucesso:
    - "Como saberemos que o treinamento funcionou? (Kirkpatrick nível 3 e 4)"
  restricoes:
    - tempo disponível, orçamento, modalidade (presencial/EAD/blended)
```

---

### 4. ROI de Treinamento (Philips Model)

Extensão do Kirkpatrick com nível 5:

```
ROI (%) = ((Benefício líquido do treinamento - Custo total) / Custo total) × 100

Benefício líquido = valor monetário dos resultados (nível 4)
                  - custo total do programa

Exemplo:
  Custo do treinamento de vendas: R$ 50.000
  Aumento de receita atribuído: R$ 200.000
  ROI = ((200.000 - 50.000) / 50.000) × 100 = 300%
```

---

## Estrutura de Output

### Plano de Treinamento Corporativo

```markdown
# [Nome do Treinamento]

## Contexto e Justificativa
- Necessidade identificada na ANT
- Gap de desempenho
- Causa raiz

## Público-alvo
- Cargo/área, nível hierárquico, tamanho da turma
- Conhecimento prévio assumido

## Objetivos de Aprendizagem (Kirkpatrick nível 2)
- Ao final, o participante será capaz de...
  - [verbo mensurável] + [conteúdo] + [condição]

## Estrutura do Programa (70-20-10)
| % | Modalidade | Ação |
|---|-----------|------|
| 10% | Formal | [workshop / e-learning / aula] |
| 20% | Social | [mentoria / grupo de prática / feedback] |
| 70% | Experiencial | [projeto on-the-job / desafio / rotação] |

## Conteúdo Programático
| Módulo | Tema | Carga horária | Formato |
|--------|------|--------------|---------|
| 1 | ... | xh | presencial/EAD |

## Estratégias Metodológicas
- Técnicas ativas: estudo de caso, role play, simulação, grupo focal
- Recursos: vídeos, infográficos, job aids, quick reference cards

## Plano de Avaliação (Kirkpatrick)
| Nível | Instrumento | Prazo | Responsável |
|-------|------------|-------|-------------|
| 1 — Reação | Pesquisa NPS + 5 questões | Imediato pós-treinamento | RH |
| 2 — Aprendizagem | Avaliação pré/pós | Início e fim do programa | Instrutor |
| 3 — Comportamento | Checklist de observação | 30/60/90 dias | Gestor direto |
| 4 — Resultado | KPIs do negócio | 90/180 dias | RH + Liderança |

## Indicadores de Sucesso
- [ ] NPS do treinamento ≥ 8,5
- [ ] Nota pós superior ao pré em X%
- [ ] X% dos participantes aplicando no trabalho (checklist 90 dias)
- [ ] [KPI do negócio] melhora Y% em 6 meses
```

---

## Exemplos de Uso

### Exemplo 1 — Programa de Onboarding

```yaml
treinamento: Onboarding para Novos Colaboradores
duracao: 30 dias (blended)
publico: todos os novos contratados
estrutura_70_20_10:
  formal_10:
    - Módulo 1 (EAD, 4h): Cultura, valores e história da empresa
    - Módulo 2 (EAD, 2h): Políticas internas e compliance
    - Workshop (presencial, 8h): Integração com times
  social_20:
    - Buddy program: mentor dos primeiros 30 dias
    - Reunião 1:1 com gestor — semanas 1, 2 e 4
    - Almoço com equipe na primeira semana
  experiencial_70:
    - Job shadowing — semanas 1-2
    - Primeira entrega real — semana 3
    - Apresentação de aprendizados — semana 4

avaliacao:
  nivel_1: Pesquisa de satisfação no dia 30
  nivel_2: Teste de cultura e políticas — aprovação mínima 80%
  nivel_3: Check-in de performance com gestor — dia 90
  nivel_4: Taxa de retenção em 6 meses · Tempo para produtividade plena
```

### Exemplo 2 — Trilha de Desenvolvimento de Liderança

```yaml
programa: Líderes em Desenvolvimento (LED)
duracao: 6 meses
publico: coordenadores e supervisores (gestão nível 1)
modulos:
  - nome: Autoconhecimento e Estilo de Liderança
    carga: 8h (workshop) + assessment DISC/MBTI
  - nome: Comunicação e Feedback
    carga: 6h (workshop) + 4 sessões de coaching
  - nome: Gestão de Pessoas e Performance
    carga: 8h (workshop) + projeto on-the-job
  - nome: Pensamento Estratégico e Tomada de Decisão
    carga: 6h (workshop) + caso prático

avaliacao:
  nivel_1: NPS do programa + entrevista de satisfação
  nivel_2: Avaliação 360° (pré e pós-programa)
  nivel_3: Avaliação de desempenho do gestor (90 dias pós)
  nivel_4: Engajamento da equipe · Turnover · Resultados de negócio

roi_esperado:
  custo_estimado: R$ 3.500/participante
  beneficio_esperado: Redução de 15% no turnover da equipe gerenciada
```

### Exemplo 3 — Treinamento Técnico de Vendas

```yaml
treinamento: Técnicas de Negociação e Fechamento
gap_identificado: Taxa de conversão de propostas abaixo da meta (40% vs. 60%)
causa_raiz: Falta de habilidade em identificar objeções e argumentar com dados
duracao: 2 dias presencial + 30 dias de reforço

objetivos:
  - Identificar os 5 tipos mais comuns de objeção de clientes
  - Aplicar a técnica SPIN Selling em simulações
  - Construir propostas de valor baseadas em dados do cliente

metodologia:
  - Roleplay: simulação de negociações com feedback imediato
  - Estudo de caso: análise de negociações reais (sucesso e fracasso)
  - Job aid: card de objeções para uso no campo

avaliacao:
  nivel_1: Pesquisa de reação pós-treinamento
  nivel_2: Simulação de negociação com rubrica — mínimo 70 pontos
  nivel_3: Observação em campo pelo gestor (30 dias)
  nivel_4: Taxa de conversão de propostas (meta: 60% em 90 dias)
```

---

## Templates Rápidos

### Job Aid — Checklist de Feedback (modelo SBI)

```
SITUAÇÃO: "Na reunião de ontem..."
COMPORTAMENTO: "quando você interrompeu o cliente durante a apresentação..."
IMPACTO: "...o cliente ficou visivelmente desconfortável e a reunião encerrou cedo."

Próximo passo: "O que você poderia fazer diferente na próxima vez?"
```

### Pesquisa de Reação (Nível 1 — Kirkpatrick)

```
1. Como você avalia o treinamento no geral? (1-10)
2. O conteúdo foi relevante para o seu trabalho? (1-5 | Discordo totalmente → Concordo totalmente)
3. O instrutor/formato facilitou o aprendizado? (1-5)
4. Você se sente preparado para aplicar o que aprendeu? (1-5)
5. O que foi mais valioso?
6. O que poderia ser melhorado?
```

### Checklist de Comportamento (Nível 3 — 90 dias)

```
[ ] Aplica o conceito X nas situações Y
[ ] Demonstra comportamento Z com a frequência esperada
[ ] Reporta dificuldades de aplicação ao gestor/RH
[ ] Ensina/compartilha o aprendizado com o time (multiplicação)
```

---

## Integração com Outras Skills

| Skill | Integração com RH Training |
|-------|--------------------------|
| `bloom` | Alinhar objetivos do treinamento aos 6 níveis cognitivos |
| `quiz-builder` | Gerar avaliações de nível 2 (Kirkpatrick) com questões por habilidade |
| `video-script` | Roteiros de vídeos instrucionais para módulos EAD |
| `scorm-builder` | Empacotar módulos de e-learning para o LMS corporativo |
| `canva` | Criar job aids, infográficos de processo e materiais de apoio |

---

## Checklist para Novo Treinamento Corporativo

- [ ] Aplicar ANT: qual é o gap? qual a causa raiz?
- [ ] Confirmar que é problema de treinamento (não de processo ou motivação)
- [ ] Definir público, carga horária e modalidade
- [ ] Escrever objetivos mensuráveis (Bloom nível 3+)
- [ ] Distribuir esforços no modelo 70-20-10
- [ ] Planejar avaliação Kirkpatrick nos 4 níveis ANTES de criar o conteúdo
- [ ] Definir KPIs do negócio que o treinamento deve impactar (nível 4)
- [ ] Criar instrumentos de avaliação (pesquisa, rubrica, checklist 90 dias)
- [ ] Calcular ROI esperado (se solicitado)
