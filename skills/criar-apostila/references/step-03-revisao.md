---
id: apostila-step-03-revisao-consolidacao
label: Revisão Pedagógica e Consolidação Final
obrigatorio: input estrutura-apostila.md + todos os capítulos
execution: uma vez, após todos os capítulos aprovados
output: output/[SLUG]/revisao-final/relatorio-revisao.md
---

# Step 3 — Revisão Pedagógica e Consolidação Final

## Template e Identidade Visual

**Fonte de verdade visual:** `DESIGN.md` (cores, fontes, iconografia, tom) — o template é referência de estrutura, não de valores.
**Template padrão:** `assets/templates/apostila/apostila-template.html`
**Regras estritas (tipografia, espaçamento, ícones, orçamento por página, PT-BR):** `skills/criar-apostila/SKILL.md` (seções 5 a 7 e 11).

Durante a revisão, verificar: classes CSS corretas, hierarquia de páginas, tokens de cor originados do `DESIGN.md` (não hardcoded sem referência), fontes corretas conforme `DESIGN.md > Tipografia`, tokens de tipografia e espaçamento da SKILL §5 e §7.2 preservados, ícones somente de `assets/icons/` no mesmo estilo, nenhum emoji decorativo em todo o material, nenhuma página em overflow e nenhuma com mais de 40% em branco.

## Missão

Revise a apostila como obra unificada — não apenas capítulo por capítulo — e emita um relatório com parecer global, ajustes prioritários e checklist de pós-textuais.

Leia:
- `output/[SLUG]/estrutura-apostila.md`
- Todos os capítulos em `output/[SLUG]/capitulo-*/`

---

## O que revisar

### Por capítulo
- Aderência aos objetivos e tópicos da estrutura
- Verbos dos objetivos adequados ao nível cognitivo do capítulo na sequência da apostila
- Atividade de fixação alinhada ao nível cognitivo: caps iniciais pedem "identifique/descreva", não "crie"
- Nenhum jargão da Taxonomia de Bloom aparece no texto visível ao leitor
- Presença de todos os elementos obrigatórios
- Qualidade e realismo dos exemplos
- Título do capítulo sem palavras duplicadas ou redundantes

### Apostila como um todo
- Cobertura dos objetivos gerais
- Progressão cognitiva do primeiro ao último capítulo
- Coerência terminológica (mesmo conceito = mesmo nome)
- Encadeamento narrativo (ganchos entre capítulos)
- Equilíbrio de profundidade entre capítulos (volume ≠ igual para todos — deve refletir a complexidade do tema)

### Diagramação e identidade visual
- Tokens de tipografia (SKILL §5) e espaçamento (SKILL §7.2) preservados — nenhuma fonte ou margem improvisada
- Ícones somente de `assets/icons/[estilo]/`, mesmo estilo em toda a apostila, mapeamento da SKILL §6.3 respeitado
- **Nenhum emoji decorativo** (📌 💡 🔍 ✅ 📝 ⚠️ etc.) em qualquer página, rótulo ou tabela
- Validação de overflow rodada (script ao final do HTML); nenhuma página em overflow
- Nenhuma página com mais de 40% de espaço em branco — correções da SKILL §7.4 aplicadas
- Páginas longas divididas em `1/2`, `2/2` quando excederam o orçamento (SKILL §7.3)

### Identificação / PLR
- Nenhum placeholder `[NOME DA EMPRESA]` aparece no produto final
- Se `INSTITUICAO` não foi informado: cabeçalhos e capa trazem apenas o título da apostila
- Se `INSTITUICAO: PLR`: existe nota de personalização **fora** do corpo da apostila; nenhum campo em branco está embutido nos capítulos
- Se `INSTITUICAO: [nome real]`: o nome real está aplicado e nenhum placeholder restou

### Revisão linguística (varredura obrigatória)
Verificar em todo o material antes de aprovar:
- **Acentos ausentes**: `critérios`, `endereço`, `Governança`, `família`, `início`, `avança`, `mudança`, `mudanças`, `anúncio`, `relevância` — buscar versões sem acento
- **Verbo "é" escrito como "e"**: frases com placeholder ou complemento nominal — ex: `"O valor e [X]"` deve ser `"O valor é [X]"`
- **Scripts**: `Olá,` com acento; `"Aqui é [VENDEDOR]"` com acento no verbo
- **Nomes de marcas**: `WhatsApp` (não `whatsapp`), capitalização de `LGPD`, `CDC`, `Meta`

---

## Formato de Entrega

```markdown
# Relatório de Revisão — [TEMA]

## Parecer Global
[Aprovado | Aprovado com ressalvas | Requer revisão]
{2-3 frases sobre a qualidade geral}

---

## Por Capítulo
| Cap. | Título | Status | Nível obj. | Nível ativ. | Ajustes |
|------|--------|--------|-----------|------------|---------|
| 1 | ... | Aprovado | reconhecer | identificar | — |
| 2 | ... | Ressalvas | aplicar | criar | Atividade mais complexa que os objetivos |

---

## Apostila como Obra
**Cobertura dos objetivos:** {cobertos / parciais / ausentes}
**Progressão cognitiva (verbos):** {crescente / irregular — indicar onde os verbos regridem ou estagnam}
**Atividades vs. nível cognitivo:** {alinhadas / desalinhadas — indicar caps onde a atividade é mais complexa que os objetivos}
**Inconsistências terminológicas:** {listar ou "nenhuma"}
**Encadeamento:** {fluido / capítulos isolados — indicar quais}
**Placeholders visíveis:** {nenhum / listar ocorrências de [NOME DA EMPRESA] ou campos em branco}
**Erros ortográficos encontrados:** {listar ou "nenhum"}
**Páginas em overflow:** {nenhuma / listar IDs}
**Páginas com vazio >40%:** {nenhuma / listar IDs e correção sugerida}
**Emojis encontrados:** {nenhum / listar páginas e símbolos}
**Ícones fora do padrão:** {nenhum / listar ocorrências}

---

## Ajustes Prioritários
**Críticos:** {impactam compreensão}
1. Cap. N, seção X: {o que mudar}

**Relevantes:** {melhoram qualidade}
1. ...

**Cosméticos:**
1. ...

---

## Pós-textuais
- [ ] Gabarito comentado — todas as atividades incluídas?
- [ ] Glossário — mínimo 30 termos?
- [ ] Referências — lista consolidada e formatada?
- [ ] Sumário — atualizado?
- [ ] Capa — gerar via `@skills/criar-imagem-leonardo`:
  - Modelo: `lucid-realism` · Estilo: `CINEMATIC` · Dimensões: `896×1264`
  - Prompt: pessoa de costas + elementos visuais do tema flutuando + spotlight dourado + sem texto/logos
  - CSS: gradiente 3 zonas — ver seção Capa em `skills/criar-apostila/SKILL.md`

## Estimativa Final
**Páginas:** {X} (meta: 100-150)
**Próximo passo:** {instrução clara}
```

---

## Critérios de Qualidade

- [ ] Todos os capítulos revisados com status individual
- [ ] Progressão cognitiva verificada: verbos crescentes + atividades alinhadas ao nível do capítulo
- [ ] Inconsistências terminológicas identificadas
- [ ] Varredura linguística concluída (acentos, "é/e", marcas, títulos)
- [ ] Ajustes separados por prioridade (críticos / relevantes / cosméticos)
- [ ] Checklist de pós-textuais completo
- [ ] Nenhum placeholder `[NOME DA EMPRESA]` visível no produto final
- [ ] Validação de overflow rodada (script do template); nenhuma página em overflow
- [ ] Nenhuma página com >40% de espaço em branco
- [ ] Nenhum emoji decorativo no material; ícones somente de `assets/icons/`
- [ ] Tokens de tipografia e espaçamento do template/SKILL preservados
- [ ] Próximo passo definido
