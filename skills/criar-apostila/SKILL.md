---
name: criar-apostila
description: Gera apostilas educacionais completas de 100 a 150 páginas em HTML/PDF, autocontidas, prontas para diagramação e impressão. Cobre planejamento estrutural, produção capítulo a capítulo, revisão pedagógica e pós-textuais. Segue identidade visual do DESIGN.md, template padrão de layout A4 e progressão cognitiva crescente. Use para cursos corporativos, treinamentos, materiais PLR e apostilas de qualquer área temática.
type: prompt
version: 1.0.0
categories: [conteudo, apostila, pdf, instrucional]
---

# Skill: Criar Apostila

## Pré-requisitos Obrigatórios

### 1. Identidade visual — DESIGN.md
Leia `DESIGN.md` na raiz do projeto **antes de gerar qualquer coisa**.
- Se existir: extraia cores (Paleta), fontes (Tipografia) e tom de voz. Aplique no output.
- Se não existir: use os valores padrão do template como fallback.
- **Nunca** fixar cores ou fontes sem verificar o `DESIGN.md` primeiro.

### 2. Template de layout
Use o template padrão como base estrutural:
`assets/templates/apostila/apostila-template.html`

O template define: CSS completo, todas as páginas (capa, apresentação, sumário, capítulos, pós-textuais, contracapa), todos os componentes HTML (boxes, estudo de caso, atividade, scripts, roadmap) e hierarquia tipográfica A4. Os valores de cor no template são fallback — `DESIGN.md` tem prioridade.

---

## Parâmetros

| Parâmetro | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `TEMA` | ✅ | Tema central da apostila |
| `PUBLICO_ALVO` | ✅ | Perfil do aprendiz (cargo, contexto, nível) |
| `SUBTITULO` | — | Recorte ou diferencial do tema |
| `NIVEL` | — | Básico / Intermediário / Avançado |
| `NUMERO_CAPITULOS` | — | Quantidade de capítulos (meta: 100-150 páginas) |
| `CARGA_HORARIA` | — | Estimada em horas |
| `TOM_VOZ` | — | Tom desejado (ex: direto, consultivo, motivacional) |
| `DIFERENCIAIS` | — | Abordagens ou metodologias específicas |
| `INSTITUICAO` | — | Nome real, `PLR`, ou omitir (ver seção abaixo) |

### Inferência inteligente
Para qualquer parâmetro não informado, inferir com base no tema e no público:

| Parâmetro | Como inferir |
|-----------|-------------|
| Subtítulo | Recorte mais relevante do tema para o público |
| Nível | Complexidade esperada para o perfil |
| Nº de capítulos | Quantos tópicos essenciais o tema exige |
| Carga horária | Estimada a partir do volume de conteúdo |
| Tom de voz | Adequado ao contexto profissional do público |
| Pré-requisitos | O que qualquer pessoa deste público já sabe |
| Objetivos gerais | As 3-5 competências centrais que o tema desenvolve |

---

## Identificação da Instituição / PLR

O parâmetro `INSTITUICAO` controla como a marca aparece no produto final:

| Valor | Comportamento |
|-------|---------------|
| **Não informado** | Produto limpo — sem nome de empresa, sem placeholders, sem página PLR. Cabeçalhos trazem apenas o título da apostila. |
| **Nome real** (ex: `Empresa XYZ`) | Usar o nome fornecido nos cabeçalhos e na capa. Nenhum placeholder `[NOME DA EMPRESA]` deve aparecer. |
| **`PLR`** | Adicionar uma breve nota de personalização **fora do conteúdo** (seção separada antes da apresentação), listando os campos a substituir. Nunca embutir página PLR dentro do corpo da apostila. |

**Regra absoluta:** nunca deixar o placeholder `[NOME DA EMPRESA]` visível no produto final. Se não há empresa definida, omitir a referência — não criar campo em branco.

---

## Modos de Execução

### Modo 1 — Passo único (recomendado para apostilas até 8 capítulos)
Gera a apostila completa de uma vez: estrutura + todos os capítulos + pós-textuais.

### Modo 2 — Multi-step (recomendado para apostilas extensas ou com revisão intermediária)
Execute em três passos separados:

| Step | Arquivo de referência | O que produz |
|------|----------------------|--------------|
| Step 1 | `references/step-01-estrutura.md` | `estrutura-apostila.md` com todos os capítulos planejados |
| Step 2 | `references/step-02-capitulo.md` | Cada capítulo individualmente (repetir N vezes) |
| Step 3 | `references/step-03-revisao.md` | Relatório de revisão pedagógica e consolidação final |

---

## Estrutura Obrigatória da Apostila

### Pré-textuais
1. **Capa** — imagem gerada via `@skills/criar-imagem-leonardo` (ver seção Capa)
2. **Apresentação** — para quem é, o que vai aprender, como usar
3. **Sumário** — capítulos e seções numerados com páginas
4. **Legenda de boxes** — ícones usados ao longo do material

### Capítulos
Para cada capítulo, seguir esta sequência didática:

1. **Abertura** — epígrafe ou pergunta provocadora + contextualização + conexão com capítulo anterior
2. **Objetivos** — 2-3 objetivos com verbos adequados ao nível cognitivo do capítulo
3. **Conceito central** — teoria mínima, vocabulário técnico definido na primeira ocorrência
4. **Tópico 2** — técnica ou dimensão complementar + exemplo real
5. **Tópico 3** — aplicação prática, passo a passo ou framework utilizável imediatamente
6. **Tópicos 4-5** — se necessários para o tema
7. **Boxes didáticos** — mínimo 3, distribuídos ao longo do capítulo:
   - `box alert` · 📌 **ATENÇÃO** — erros críticos ou regras fundamentais
   - `box tip` · 💡 **DICA PRÁTICA** — aplicação imediata
   - `box more` · 🔍 **SAIBA MAIS** — aprofundamento opcional
   - `box reflect` · 📝 **PARA REFLETIR** — questão reflexiva
   - `box best` · ✅ **BOAS PRÁTICAS** — recomendações diretas
8. **Estudo de caso** — contexto → problema → análise → solução → resultado + 2-3 questões
9. **Atividade de fixação** — alinhada ao nível cognitivo do capítulo + gabarito (separado no pós-textual)
10. **Síntese** — 5-7 pontos-chave + gancho para o próximo capítulo
11. **Referências** — 3-5 fontes confiáveis

### Pós-textuais
- **Gabarito comentado** — respostas e justificativas de todas as atividades
- **Glossário** — mínimo 30 termos com definições claras
- **Referências bibliográficas** — lista consolidada em ordem alfabética

---

## Progressão Cognitiva (uso interno — nunca expor no material)

A Taxonomia de Bloom é ferramenta de planejamento do autor, **não rótulo para o leitor**. Nunca escrever "Bloom", "Lembrar", "Criar" ou qualquer nível taxonômico no texto da apostila.

| Posição na apostila | Verbos dos objetivos | Verbo da atividade |
|---------------------|---------------------|--------------------|
| Caps iniciais (1-3) | identificar, explicar, descrever, distinguir | identificar, descrever |
| Caps intermediários (4-6) | executar, aplicar, construir, usar | aplicar, construir |
| Caps de análise (7-8) | comparar, diferenciar, avaliar | comparar, avaliar |
| Caps finais (9-10) | elaborar, criar, justificar, propor | elaborar, criar |

**Regra crítica:** a atividade de fixação deve usar o mesmo nível de verbo dos objetivos do capítulo. Cap. 1 não pode pedir "crie um manual" — deve pedir "identifique" ou "descreva".

**Profundidade variável:** cada capítulo deve refletir a complexidade do seu tema — não replicar mecanicamente o mesmo número de blocos, exemplos ou páginas em todos os capítulos.

---

## Capa — Geração de Imagem

Use a skill `@skills/criar-imagem-leonardo` para gerar a imagem de fundo da capa:

**Modelo:** `lucid-realism` · **Estilo:** `CINEMATIC` · **Dimensões:** `--width 896 --height 1264`

> ⚠️ Não usar `gpt-image-2` para capas de apostila (retorna erro genérico de API neste formato).

**Estrutura do prompt de imagem** (adaptar ao tema):
```
Back view of a confident professional [PERFIL DO PÚBLICO] standing,
holding or interacting with [OBJETO CENTRAL DO TEMA].
Around them in a dark background: [ELEMENTOS VISUAIS DO TEMA] floating
as glowing icons or chalk drawings.
Dark dramatic background, warm golden spotlight from above,
cinematic depth of field, moody professional atmosphere.
No text, no logos, no watermarks, portrait orientation.
```

**CSS de fundo da capa** (3 zonas — escuro no topo → transparente no meio → escuro no rodapé):
```css
background:
  linear-gradient(to bottom,
    rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.80) 18%, rgba(0,0,0,0.65) 32%,
    rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.10) 64%,
    rgba(5,20,28,0.94) 78%, rgba(5,20,28,1) 100%),
  url('images/capa.jpg') center top/cover no-repeat;
```

Salvar em `assets/images/[categoria]/` e copiar para `output/[run]/images/capa.jpg`.

O elemento `<div class="cover-divider"></div>` atua como espaçador invisível entre o subtítulo e a descrição — mantê-lo no HTML, nunca remover.

---

## Diretrizes de Escrita

- Use "você" para se dirigir ao aprendiz
- Todo termo técnico é definido na primeira ocorrência
- Mínimo 2 exemplos práticos reais por capítulo — nunca genéricos
- Frases: 15-25 palavras · Parágrafos: 3-6 frases
- Cada capítulo conecta explicitamente com o anterior e o seguinte

### Qualidade linguística (revisar antes de entregar)

- **Acentos obrigatórios** — erros frequentes: `critérios`, `endereço`, `Governança`, `família`, `início`, `avança`, `mudança`, `mudanças`, `anúncio`, `relevância` — nunca omitir
- **Verbo "é" vs conjunção "e"** — toda cópula exige acento; revisar especialmente scripts e frases com placeholders: `"O valor é [X]"`, `"entrega prevista é [DATA]"`, `"Aqui é [VENDEDOR]"`, `"Serviço é comprado"`
- **Scripts** — saudação `Olá, [NOME]` (com acento; nunca `Ola,`); identificação `Aqui é [VENDEDOR]` (nunca `Aqui e`)
- **Nomes de marcas** — capitalização oficial: `WhatsApp` (não `whatsapp`), `Meta`, `LGPD`, `CDC`
- **Títulos** — sem palavras duplicadas nem redundâncias (ex: "Manual de vendas", nunca "Manual de vendas de vendas")
- **Placeholders de empresa** — nunca inserir `[NOME DA EMPRESA]` no corpo do capítulo; se a empresa foi informada, usar o nome real; se não foi, omitir

---

## Output

- **Formato:** HTML único, autocontido, pronto para impressão A4
- **Caminho:** `squads/[slug]/output/[run_id]/apostila-[slug].html`
- **PDF:** gerar após validação via Chrome headless:
  ```powershell
  & "C:\Program Files\Google\Chrome\Application\chrome.exe" `
    --headless=new --disable-gpu --no-sandbox `
    "--print-to-pdf=apostila-[slug].pdf" `
    "--print-to-pdf-no-header" `
    "file:///caminho/apostila-[slug].html"
  ```
- **Fontes e imagens:** copiar de `assets/fonts/` e `assets/images/` para `output/[run_id]/fonts/` e `output/[run_id]/images/` antes de gerar o PDF

---

## Checklist de Qualidade

- [ ] `DESIGN.md` lido e tokens CSS aplicados (ou fallback documentado)
- [ ] Template `assets/templates/apostila/apostila-template.html` seguido
- [ ] 100-150 páginas estimadas (A4, fonte 12pt, espaço 1,62)
- [ ] Todos os capítulos com sequência didática completa (abertura → gancho)
- [ ] Progressão cognitiva crescente — verbos simples nos caps iniciais, complexos nos finais
- [ ] Atividade de fixação alinhada ao nível cognitivo do capítulo
- [ ] Nenhum termo da Taxonomia de Bloom visível no texto da apostila
- [ ] Mínimo 2 exemplos reais e 1 estudo de caso por capítulo
- [ ] Mínimo 3 boxes por capítulo, tipos variados
- [ ] Glossário com mínimo 30 termos
- [ ] Gabarito comentado completo
- [ ] Ortografia revisada: acentos, verbos "é", marcas, títulos sem duplicações
- [ ] Nenhum placeholder `[NOME DA EMPRESA]` visível — empresa real, nota PLR separada, ou campo omitido
- [ ] Capa gerada com `criar-imagem-leonardo` (lucid-realism, CINEMATIC, 896×1264)
- [ ] `cover-divider` presente no HTML da capa (espaçador invisível)
