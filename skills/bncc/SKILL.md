---
name: BNCC
description: Alinha conteúdo educacional com a Base Nacional Comum Curricular (BNCC) — identifica competências gerais, componentes curriculares, unidades temáticas e habilidades específicas por ano e área. Use quando o usuário mencionar "BNCC", "alinhamento curricular", "habilidades", "competências", "componente curricular", "ano escolar", "Educação Básica", "EF01LP01" (qualquer código de habilidade) ou quando o material for destinado à Educação Infantil ou Ensino Fundamental brasileiro.
type: prompt
version: 1.0.0
categories: [pedagogia, bncc, curriculo, educacao-basica, alinhamento]
---

# BNCC Skill — Alinhamento Curricular

Esta skill garante que materiais educacionais produzidos pelo EduSquad estejam alinhados à **Base Nacional Comum Curricular (BNCC)** — o documento que define os direitos de aprendizagem e desenvolvimento para a Educação Básica brasileira.

---

## Fontes desta Skill

| Arquivo | Uso |
|---------|-----|
| `skills/bncc/bncc-reference.md` | **Use sempre** — resumo estruturado com competências, componentes, sistema de códigos e progressão por ano |
| `skills/bncc/BNCC_EI_EF_versaofinal.pdf` | **Use quando precisar** — documento oficial completo (600 páginas) para habilidades exatas |

### Quando usar o resumo vs. o PDF

```
bncc-reference.md  →  alinhamento geral, verificação de competências,
                       construção de objetivos, identificação de área/ano

BNCC PDF           →  texto exato de uma habilidade específica,
                       lista completa de habilidades de um componente/ano,
                       objetos de conhecimento detalhados
```

Para consultar o PDF com eficiência, use o Read tool com páginas específicas:

```
Read tool:
  file_path: skills/bncc/BNCC_EI_EF_versaofinal.pdf
  pages: "326-360"
```

> Ver mapa de páginas por seção em `bncc-reference.md`.

---

## O que esta skill faz

### 1. Alinhamento de objetivos de aprendizagem

Dado um tema, ano e componente, a skill:
- Identifica as **competências gerais** relacionadas (1 a 10)
- Sugere os **códigos de habilidades** relevantes (ex: `EF03MA07`)
- Propõe **objetos de conhecimento** da unidade temática correspondente
- Valida se os objetivos escritos usam **verbos mensuráveis** compatíveis com os descritores da BNCC

### 2. Geração de habilidades alinhadas

Produz objetivos de aprendizagem no formato BNCC:

```markdown
**Habilidade:** (EF05CI04) Identificar os principais usos da água e
como a  interferência humana no ciclo da água pode afetar o clima
da região.

**Competência Geral:** 2 — Pensamento Científico · 7 — Argumentação

**Componente:** Ciências — Unidade: Terra e Universo

**Ano:** 5º ano — Anos Iniciais
```

### 3. Verificação de alinhamento (checklist)

Para um material já produzido, verifica:
- [ ] Objetivos expressos em verbos de ação (não "entender", "conhecer")
- [ ] Ano e etapa corretos para o nível de complexidade
- [ ] Cobertura de pelo menos 1 competência geral
- [ ] Alinhamento com unidade temática do componente
- [ ] Temas Contemporâneos Transversais presentes se aplicável

### 4. Mapeamento de conteúdo → BNCC

Dado um plano de aula ou sequência didática, mapeia automaticamente:

```yaml
conteudo: "Frações equivalentes"
mapeamento:
  etapa: Ensino Fundamental — Anos Iniciais
  ano: 4º ano
  componente: Matemática
  unidade: Números
  habilidades:
    - EF04MA04: Reconhecer as representações decimais dos números
      racionais e relacioná-las à representação fracionária
    - EF04MA05: Comparar e ordenar números racionais positivos
      (representações fracionária e decimal)
  competencias_gerais: [2, 4, 5]
```

---

## Exemplos de Uso

### Exemplo 1 — Plano de Aula com alinhamento BNCC

**Input:** "Criar um plano de aula sobre o ciclo da água para o 4º ano do EF"

**O que a skill faz:**
1. Lê `bncc-reference.md` → identifica Ciências, 4º ano, unidade "Terra e Universo"
2. Consulta PDF páginas ~345-355 → obtém habilidades exatas
3. Gera o plano com os códigos corretos e competências gerais relacionadas

**Output (fragmento):**
```markdown
## Alinhamento BNCC

**Etapa:** Ensino Fundamental — Anos Iniciais · 4º ano
**Componente:** Ciências da Natureza
**Unidade Temática:** Terra e Universo

**Habilidades trabalhadas:**
- (EF04CI01) Identificar misturas na vida diária, com base nas
  propriedades físicas observáveis, como densidade, coloração,
  e estado físico.
- (EF04CI09) Identificar os cuidados necessários para a manutenção
  da saúde e integridade do organismo.

**Competências Gerais:** 2 · 7 · 10

**Tema Contemporâneo Transversal:** Meio Ambiente — Educação Ambiental
```

---

### Exemplo 2 — Sequência Didática de Língua Portuguesa (2º ano)

**Input:** "Sequência didática de produção de texto para alfabetização — 2º ano"

**Mapeamento:**
```yaml
componente: Língua Portuguesa
ano: 2º ano
unidade: Produção de Textos
habilidades_sugeridas:
  - EF02LP07: Planejar, com a ajuda do professor, o texto que será
    produzido, considerando a situação comunicativa, os interlocutores
    e o suporte
  - EF02LP08: Reler e revisar o texto produzido com a ajuda do
    professor e a colaboração dos colegas
  - EF15LP05: Planejar e produzir, em colaboração com os colegas
    e com a ajuda do professor, recontagens de histórias
competencias: [1, 4, 7, 9]
```

---

### Exemplo 3 — Treinamento de Professores (uso indireto da BNCC)

Quando o conteúdo for formação de professores sobre a BNCC:

```markdown
## Módulo: Como alinhar suas aulas à BNCC

### Objetivos (alinhados à BNCC para formação docente)
1. Compreender a estrutura das 10 competências gerais
2. Decodificar e utilizar os códigos de habilidades
3. Planejar sequências didáticas com objetos de conhecimento BNCC
4. Integrar Temas Contemporâneos Transversais ao planejamento

### Competências BNCC abordadas na formação
- CG2: Pensamento científico e crítico aplicado ao planejamento
- CG4: Comunicação — uso das linguagens pedagógicas
- CG7: Argumentação — fundamentação das escolhas pedagógicas
```

---

## Estrutura de Output

Ao usar esta skill, inclua sempre no material produzido:

```markdown
---
## Alinhamento BNCC

| Campo | Valor |
|-------|-------|
| Etapa | Ensino Fundamental — Anos Iniciais / Anos Finais |
| Ano(s) | X º ano |
| Componente | [componente] |
| Unidade Temática | [unidade] |
| Habilidades | (EFXXxx00) Texto da habilidade |
| Competências Gerais | N · N |
| TCT (se aplicável) | [tema contemporâneo] |
---
```

---

## Integração com Outras Skills

| Skill | Como integrar com BNCC |
|-------|----------------------|
| `bloom` | Verificar se os verbos das habilidades BNCC batem com o nível Bloom planejado |
| `instructional-design` | Fase de Analysis do ADDIE — mapear BNCC é parte do diagnóstico curricular |
| `quiz-builder` | Cada questão pode ser tagueada com o código da habilidade BNCC avaliada |
| `lesson-plan` | Seção obrigatória de alinhamento BNCC no plano de aula |
| `scorm-builder` | Metadados do manifesto podem incluir os códigos de habilidades |

---

## Checklist de Alinhamento BNCC

- [ ] Leu `bncc-reference.md` para identificar área, ano e componente
- [ ] Consultou PDF para obter texto exato das habilidades (se necessário)
- [ ] Identificou ao menos 1 habilidade com código correto (ex: `EF03MA07`)
- [ ] Relacionou com ao menos 1 das 10 competências gerais
- [ ] Verificou unidade temática correspondente
- [ ] Incluiu Tema Contemporâneo Transversal se o conteúdo permitir
- [ ] Validou que os verbos dos objetivos são mensuráveis (não "entender" ou "conhecer")
- [ ] Adicionou bloco de alinhamento BNCC ao output do material
