---
id: apostila-step-01-estrutura
label: Estrutura Curricular da Apostila
obrigatorio: TEMA, PUBLICO_ALVO
opcionais: SUBTITULO, NIVEL, NUMERO_CAPITULOS, CARGA_HORARIA, TOM_VOZ, DIFERENCIAIS, INSTITUICAO
output: output/[SLUG]/estrutura-apostila.md
---

# Step 1 — Estrutura Curricular

## Missão

Projete a arquitetura pedagógica completa da apostila antes de qualquer produção de conteúdo.

**Parâmetros recebidos:**
- **Tema:** [TEMA]
- **Público-alvo:** [PUBLICO_ALVO]
- **Informações adicionais (se fornecidas):** [DEMAIS_PARAMETROS]

## Inferência Inteligente

Para qualquer parâmetro não informado, decida com base no tema e no público:

| Parâmetro | Como inferir |
|-----------|-------------|
| Nível | Complexidade esperada para o perfil do público |
| Nº de capítulos | Quantos tópicos essenciais o tema exige (meta: 100-150 páginas) |
| Carga horária | Estimada a partir do volume projetado |
| Tom de voz | Adequado ao contexto profissional do público |
| Objetivos gerais | As 3-5 competências centrais que o tema desenvolve |

---

## Tarefa

Para cada capítulo, defina:

1. **Título** — orientado à competência que será desenvolvida
2. **Objetivo principal** — verbo adequado ao nível cognitivo do capítulo + conteúdo
3. **2-3 objetivos secundários**
4. **5-7 tópicos** que serão abordados
5. **Estudo de caso** — descrição em 1-2 frases
6. **Conexão** — como conecta com o capítulo anterior e o seguinte

**Progressão cognitiva obrigatória (uso interno — não expor no material):**
- 1º terço da apostila: verbos de reconhecimento/compreensão (identificar, explicar, descrever)
- 2º terço: verbos de aplicação/análise (executar, aplicar, construir, comparar)
- Último terço: verbos de avaliação/criação (avaliar, elaborar, criar, justificar)

---

## Formato de Entrega

```markdown
# Estrutura Curricular — [TEMA]

## Visão Geral
{Parágrafo descrevendo a jornada: de onde o aprendiz parte e onde chega}

## Parâmetros Inferidos
- Nível: {inferido}
- Número de capítulos: {N}
- Carga horária estimada: {X}h
- Tom de voz: {inferido}
- Pré-requisitos: {inferidos}

## Mapa de Progressão
| Capítulo | Título | Nível cognitivo |
|----------|--------|----------------|
| 1 | {título} | reconhecer/compreender |
| ... | ... | ... |

---

## Capítulo 1: {Título}
**Objetivo:** Ao final, você será capaz de [verbo] [objeto].
**Objetivos secundários:** ...
**Tópicos:** 1. ... 2. ... 3. ... 4. ... 5. ...
**Estudo de caso:** {1-2 frases}
**Conexão:** {como abre a apostila / prepara o cap. 2}

[repetir para todos os capítulos]

---

## Cobertura dos Objetivos Gerais
| Objetivo | Capítulo(s) |
|----------|------------|
| {objetivo} | Cap. X, Y |
```

---

## Critérios de Qualidade

- [ ] Títulos distintos e complementares entre si
- [ ] Verbo adequado ao nível cognitivo em cada objetivo principal
- [ ] Progressão cognitiva crescente do primeiro ao último capítulo
- [ ] Nenhuma sobreposição temática entre capítulos
- [ ] Todos os objetivos gerais cobertos
- [ ] Nenhum termo da Taxonomia de Bloom exposto no formato de entrega
