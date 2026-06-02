---
id: apostila-step-02-producao-capitulo
label: Produção de Conteúdo do Capítulo
obrigatorio: N, input estrutura-apostila.md
execution: repetir para N = 1 até total de capítulos
output: output/[SLUG]/capitulo-[N]/capitulo-[N].md
---

# Step 2 — Produção do Capítulo [N]

## Template e Identidade Visual

**Leia DESIGN.md** antes de produzir o capítulo — cores, fontes, iconografia e tom de voz vêm de lá, não do template. Onde DESIGN.md não definir, use o fallback do template.
**Template de componentes:** `assets/templates/apostila/apostila-template.html`
**Regras estritas de tipografia, espaçamento, ícones, orçamento por página e PT-BR:** `skills/criar-apostila/SKILL.md` (seções 5 a 7 e 11). Seguir sem alterar tokens.

Todos os componentes HTML estão documentados no template: `.page.chapter-open`, `.page.dense.concepts-page`, `.page.dense.case-page`, `.box.alert/tip/more/reflect/best`, `.case`, `.activity`, `.step`, `.script`, `.metrics`, `.roadmap`, `.toc-item`. Use as classes exatamente como definidas — não crie variantes novas.

**Ícones:** somente SVGs de `assets/icons/[bold|duotone|fill|light|regular|thin]/`, copiados inline. Estilo padrão `regular`, mantendo o mesmo estilo em todo o material. **Nenhum emoji decorativo** (📌 💡 🔍 ✅ 📝 ⚠️ 🎯 🚀 etc.) em qualquer página, rótulo, lista ou relatório. Mapa componente→ícone está em SKILL.md §6.3.

**Orçamento de conteúdo por página:** respeitar os tetos da SKILL §7.3. Se exceder, dividir em duas páginas (kicker `1/2`, `2/2`); se sobrar mais de 40% de página em branco, aplicar SKILL §7.4. Nunca reduzir fonte nem padding para forçar caber.

## Missão

Leia a especificação do Capítulo [N] em `estrutura-apostila.md` e produza o conteúdo completo, pronto para diagramação.

Não peça confirmações intermediárias. Produza o capítulo inteiro de uma vez, seguindo a sequência abaixo.

---

## Sequência Didática

1. **Abertura** — epígrafe ou pergunta provocadora + contextualização + conexão com capítulo anterior
2. **Objetivos** — copiados da estrutura curricular, em primeira pessoa do aprendiz
3. **Conceito central** — teoria mínima, vocabulário técnico definido na primeira ocorrência
4. **Tópico 2** — técnica ou dimensão complementar + exemplo real
5. **Tópico 3** — aplicação prática, passo a passo ou framework utilizável imediatamente
6. **Tópicos 4-5** — se definidos na estrutura
7. **Boxes didáticos** — mínimo 3, distribuídos ao longo do capítulo. Tipos disponíveis (com ícone SVG inline antes do rótulo — ver SKILL §6.3):
   - `box alert` Atenção (warning) · `box tip` Dica prática (lightbulb) · `box more` Saiba mais (magnifying-glass) · `box reflect` Para refletir (pencil-line) · `box best` Boas práticas (check-circle)
8. **Estudo de caso** — contexto → problema → análise → solução → resultado + 2-3 questões
9. **Atividade de fixação** — alinhada ao nível cognitivo do capítulo + gabarito (será separado no pós-textual)
10. **Síntese** — 5-7 pontos-chave + gancho para o próximo capítulo
11. **Referências** — 3-5 fontes confiáveis

---

## Diretrizes

- Use o tom inferido na estrutura curricular
- Exemplos reais e contextualizados para o público — nunca genéricos
- Todo termo técnico definido na primeira ocorrência
- Frases: 15-25 palavras. Parágrafos: 3-6 frases.
- **Profundidade variável**: cada capítulo deve refletir a complexidade do seu tema — não replicar mecanicamente o mesmo número de blocos, exemplos ou páginas
- **Sem placeholders de empresa**: nunca inserir `[NOME DA EMPRESA]` no corpo do capítulo — se a empresa foi informada no prompt, usar o nome real; se não foi, omitir a referência

### Qualidade linguística (revisar antes de entregar)

- **Acentos obrigatórios**: `critérios`, `endereço`, `Governança`, `família`, `início`, `avança`, `mudança`, `anúncio`, `relevância`, `mudanças` — nunca omitir
- **Verbo "é" vs conjunção "e"**: cópula exige acento — verificar especialmente em scripts e frases com placeholders como `"O valor é [X]"`, `"entrega prevista é [DATA]"`, `"Aqui é [VENDEDOR]"`
- **Scripts**: saudação `Olá, [NOME]` (com acento); identificação `Aqui é [VENDEDOR]` (nunca `Aqui e`)
- **Nomes de marcas**: `WhatsApp` (não `whatsapp`), `Meta`, `LGPD`, `CDC`
- **Títulos**: sem palavras duplicadas (ex: "Manual de vendas e campanha", nunca "Manual de vendas de vendas")

### Progressão cognitiva (uso interno — não expor no material)

A Taxonomia de Bloom orienta o planejamento, mas **nunca deve aparecer no texto da apostila** — o leitor não conhece nem precisa conhecer essa nomenclatura.

Regra por posição do capítulo:
- Caps iniciais (1-3): verbos de reconhecimento/compreensão — *identificar, explicar, descrever, distinguir*
- Caps intermediários (4-6): verbos de aplicação — *executar, aplicar, construir, usar*
- Caps de análise (7-8): verbos analíticos — *comparar, diferenciar, avaliar*
- Caps finais (9-10): verbos de síntese/criação — *elaborar, criar, justificar, propor*

A atividade de fixação deve usar o mesmo tipo de verbo dos objetivos. **Cap 1 não pode pedir "crie um manual"; deve pedir "identifique" ou "descreva".**

---

## Critérios de Qualidade

- [ ] Sequência didática completa (abertura → síntese → gancho)
- [ ] Objetivos copiados da estrutura com verbo adequado ao nível cognitivo do capítulo
- [ ] Atividade de fixação alinhada ao nível cognitivo (caps iniciais: identificar/descrever — não "criar")
- [ ] Nenhum termo da Taxonomia de Bloom visível no texto da apostila
- [ ] Mínimo 2 exemplos reais distintos
- [ ] Mínimo 3 boxes distribuídos, tipos variados, com ícone SVG (sem emoji)
- [ ] Estudo de caso com estrutura completa
- [ ] Ortografia revisada: acentos, verbos "é", marcas, títulos sem duplicações
- [ ] Tokens de tipografia e espaçamento da SKILL §5 e §7.2 preservados
- [ ] Orçamento de conteúdo por página respeitado (SKILL §7.3); páginas longas divididas em `1/2`, `2/2`
- [ ] Nenhuma página com mais de 40% em branco (aplicar SKILL §7.4 se necessário)
- [ ] Ícones somente de `assets/icons/`, mesmo estilo em todo o capítulo
