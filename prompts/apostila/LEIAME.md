# Prompts — Apostila 100-150 Páginas

Dois modelos de prompt para geração de apostilas longas no EduSquad.

## Variáveis Dinâmicas (substituir antes de usar)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `[TEMA]` | Tema principal da apostila | `Gestão de Pessoas` |
| `[SUBTITULO]` | Recorte ou complemento do tema | `Do recrutamento à retenção de talentos` |
| `[PUBLICO_ALVO]` | Descrição do público | `Analistas de RH e gestores de equipe` |
| `[NIVEL]` | Nível de complexidade | `Intermediário` |
| `[NUMERO_CAPITULOS]` | Quantidade de capítulos | `10` |
| `[PAGINAS_POR_CAPITULO]` | Páginas por capítulo | `10-13` |
| `[CARGA_HORARIA]` | Horas estimadas de estudo | `40 horas` |
| `[OBJETIVOS_GERAIS]` | Lista de 3-5 objetivos macro | (ver exemplo abaixo) |
| `[TOM_VOZ]` | Estilo de linguagem | `Didático e acolhedor` |
| `[CONTEXTO_USO]` | Onde será usado | `Treinamento corporativo interno` |
| `[PREREQUISITOS]` | O que o aprendiz já deve saber | `Noções básicas de gestão` |
| `[DIFERENCIAIS]` | Foco especial ou restrições | `Ênfase na legislação trabalhista brasileira` |
| `[INSTITUICAO]` | Nome da instituição emissora | `Estúdio Site` |
| `[N]` | Número do capítulo atual | `3` (apenas no multi-step) |

**Exemplo de `[OBJETIVOS_GERAIS]`:**
```
- Compreender os fundamentos teóricos de Gestão de Pessoas
- Aplicar ferramentas práticas de recrutamento e seleção
- Analisar indicadores de desempenho e clima organizacional
- Desenvolver planos de desenvolvimento individual (PDI)
```

---

## Opção 1 — Prompt Único

**Arquivo:** [`apostila-unico.md`](apostila-unico.md)

**Quando usar:** Apostilas menores (100-120 páginas), temas bem delimitados, quando velocidade importa mais que profundidade máxima por capítulo.

**Como usar:** Substitua todas as variáveis `[...]` e envie o prompt inteiro para um único agente conteudista. O agente produz a apostila completa em uma execução.

**Prós:** Mais rápido, coerência narrativa natural.
**Contras:** Capítulos finais tendem a ser menos densos (limite de contexto).

---

## Opção 2 — Multi-Step (Recomendado para 130-150 páginas)

**Arquivos:** [`multi-step/`](multi-step/)

| Step | Arquivo | Agente | O que faz |
|------|---------|--------|-----------|
| 1 | `step-01-estrutura.md` | Pedagogo | Projeta toda a arquitetura curricular |
| 2 | `step-02-producao-capitulo.md` | Conteudista | Produz um capítulo (repetir N vezes) |
| 3 | `step-03-revisao-consolidacao.md` | Revisor | Revisa tudo e consolida o material |

**Como usar:**
1. Execute o Step 1 com as variáveis preenchidas → aprove a estrutura
2. Execute o Step 2 para cada capítulo (N = 1 até [NUMERO_CAPITULOS])
3. Execute o Step 3 com todos os capítulos como input

**Prós:** Máxima profundidade por capítulo, revisão estruturada, fácil regenerar capítulos específicos.
**Contras:** Mais execuções, precisa de checkpoint entre steps.
