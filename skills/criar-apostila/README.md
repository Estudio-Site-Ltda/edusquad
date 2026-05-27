# Skill: Criar Apostila — Exemplos de Uso

---

## Exemplo 1 — Passo Único

Use quando quiser gerar a apostila completa de uma vez, sem etapas intermediárias.

```
@skills/criar-apostila

TEMA: Gestão da qualidade para QUALIDADE E PROCESSOS
PUBLICO_ALVO: Profissionais de qualidade, processos, operações e liderança que precisam padronizar atividades, melhorar indicadores, reduzir falhas e fortalecer a cultura de melhoria contínua na organização.
NIVEL: Básico ao Intermediário
NUMERO_CAPITULOS: 10
CARGA_HORARIA: 20h
TOM_VOZ: Direto, prático e motivacional — sem jargões acadêmicos
DIFERENCIAIS: Foco em situações reais do dia a dia do profissional, com ferramentas aplicáveis imediatamente
```

**O que será gerado:**
- Apostila HTML completa (capa + apresentação + sumário + 8 capítulos + gabarito + glossário + referências)
- Imagem de capa via `criar-imagem-leonardo` (lucid-realism, CINEMATIC, 896×1264)
- PDF pronto para distribuição

---

## Exemplo 2 — Multi-step (3 etapas)

Use quando quiser revisar e aprovar a estrutura antes de produzir o conteúdo, ou quando a apostila tiver muitos capítulos.

### Etapa 1 — Estrutura curricular

```
@skills/criar-apostila/references/step-01-estrutura

TEMA: Vendas Consultivas B2B
PUBLICO_ALVO: Vendedores externos com experiência em vendas transacionais que estão migrando para o modelo consultivo
NIVEL: Intermediário
NUMERO_CAPITULOS: 15
CARGA_HORARIA: 30h
TOM_VOZ: Consultivo, respeitoso e orientado a resultados — sem pressão ou linguagem de "fechamento a qualquer custo"
DIFERENCIAIS: Metodologia SPIN Selling adaptada para o mercado brasileiro
```

**O que será gerado:**
- `output/vendas-consultivas-b2b/estrutura-apostila.md` com todos os capítulos planejados, objetivos, tópicos e mapa de progressão cognitiva

> Revise e aprove a estrutura antes de prosseguir para a Etapa 2.

---

### Etapa 2 — Produção dos capítulos (repetir para cada capítulo)

```
@skills/criar-apostila/references/step-02-capitulo

INPUT: output/vendas-consultivas-b2b/estrutura-apostila.md
CAPITULO: 1
```

Repetir incrementando `CAPITULO` de 1 até 10. Cada execução gera:
- `output/vendas-consultivas-b2b/capitulo-1/capitulo-1.md`
- … até `capitulo-10/capitulo-10.md`

> Revise cada capítulo antes de prosseguir para o próximo ou para a Etapa 3.

---

### Etapa 3 — Revisão e consolidação

```
@skills/criar-apostila/references/step-03-revisao

INPUT: output/vendas-consultivas-b2b/estrutura-apostila.md
       output/vendas-consultivas-b2b/capitulo-*/
```

**O que será gerado:**
- `output/vendas-consultivas-b2b/revisao-final/relatorio-revisao.md` com parecer global, status por capítulo, ajustes prioritários e checklist de pós-textuais
