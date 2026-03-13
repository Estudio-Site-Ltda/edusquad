---
id: quiz-design
name: Design de Quiz e Avaliação
version: 1.0.0
applies_to: [quiz, avaliacao]
---

# Design de Quiz e Avaliação Educacional

## Tipos de Questão

### Múltipla Escolha
- 1 resposta correta + 3-4 distratores plausíveis
- Distratores devem ser erros comuns — não absurdos
- Evite "todas as anteriores" e "nenhuma das anteriores"
- Enunciado deve ser uma afirmação ou pergunta clara

### Verdadeiro ou Falso
- Use apenas para conceitos claramente verdadeiros ou falsos
- Evite afirmações com "sempre", "nunca", "todos" — são dicas
- Ideal para verificação rápida de conceitos básicos

### Dissertativa
- Enunciado claro com critério de avaliação explícito
- Defina extensão esperada (mínimo/máximo de palavras)
- Forneça rubrica com pontuação por critério

### Correspondência (Match)
- Ideal para relacionar conceitos, datas, autores
- Máximo de 8 pares por questão
- Inclua mais opções na coluna de resposta do que na de pergunta

### Ordenação
- Ideal para sequências, processos, cronologias
- Máximo de 7 itens para não sobrecarregar a memória de trabalho

## Estrutura de uma Questão de Múltipla Escolha

```
ENUNCIADO:
{contexto se necessário}
{pergunta ou afirmação incompleta}

A) {alternativa — distrator plausível}
B) {alternativa — distrator plausível}
C) {alternativa — CORRETA}
D) {alternativa — distrator plausível}

GABARITO: C
FEEDBACK PARA ACERTO: {por que C está correta}
FEEDBACK PARA ERRO: {o que cada distrator representa como erro comum}
NÍVEL BLOOM: {Lembrar|Compreender|Aplicar|Analisar|Avaliar|Criar}
DIFICULDADE: {fácil|médio|difícil}
```

## Regras de Qualidade

1. Cada questão mede UM objetivo de aprendizagem específico
2. O enunciado deve ser compreensível sem as alternativas
3. Todas as alternativas devem ter comprimento similar
4. Evite linguagem negativa ("qual NÃO é...") — use com moderação
5. Distribua as respostas corretas uniformemente entre A, B, C, D
6. Sempre forneça feedback — especialmente para erros

## Distribuição por Nível de Bloom

Para uma avaliação equilibrada:
- 20% — Lembrar / Compreender (questões diretas)
- 50% — Aplicar / Analisar (questões de contexto)
- 30% — Avaliar / Criar (questões de julgamento ou produção)
