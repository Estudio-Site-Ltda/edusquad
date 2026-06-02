---
name: criar-apostila
description: Gera apostilas educacionais completas de 100 a 150 páginas em HTML/PDF, autocontidas, prontas para diagramação e impressão. Cobre planejamento estrutural, produção capítulo a capítulo, revisão pedagógica e pós-textuais. Segue identidade visual do DESIGN.md, template padrão de layout A4 e progressão cognitiva crescente. Use para cursos corporativos, treinamentos, materiais PLR e apostilas de qualquer área temática.
type: prompt
version: 1.1.0
categories: [conteudo, apostila, pdf, instrucional]
---

# Skill: Criar Apostila

> **Regra mestra:** o resultado final deve parecer impresso por uma editora profissional. Cada página A4 precisa estar bem preenchida — nem cortando conteúdo nem deixando vazio excessivo. Tipografia, espaçamento, ícones e ortografia seguem padrões fixos descritos abaixo. Nunca improvise.

---

## 1. Pré-requisitos Obrigatórios

### 1.1. Identidade visual — `DESIGN.md` (prioridade absoluta)
Antes de gerar qualquer linha de HTML:

1. Leia `DESIGN.md` na raiz do projeto.
2. Extraia: **Paleta**, **Tipografia**, **Iconografia**, **Tom de voz**, **Nome da marca**.
3. Aplique no `:root` do CSS e em todos os textos institucionais.
4. **Se um campo estiver vazio ou ausente em `DESIGN.md`**, use o fallback documentado no template (`assets/templates/apostila/apostila-template.html`).
5. **Nunca** invente cor, fonte, ícone ou nome de marca sem checar `DESIGN.md` primeiro.

### 1.2. Template de layout
Base estrutural obrigatória:
`assets/templates/apostila/apostila-template.html`

O template define: CSS completo com tokens, todas as variantes de página (capa, apresentação, sumário, capítulos `chapter-open`, conteúdo padrão, variante `dense`, estudo de caso, atividade, pós-textuais, contracapa), todos os componentes (`box.alert/tip/more/reflect/best`, `script`, `example`, `step`, `roadmap`, `metrics`, `toc`, `write-line`, `case`) e hierarquia tipográfica A4. Os valores de cor no template são fallback — `DESIGN.md` tem prioridade.

### 1.3. Fontes e ícones em disco
- **Fontes:** `assets/fonts/BricolageGrotesque-Variable.ttf` e `assets/fonts/PlusJakartaSans-Variable.ttf`. Copiar para `output/[run_id]/fonts/` antes de gerar PDF.
- **Ícones:** somente arquivos SVG existentes em `assets/icons/[bold|duotone|fill|light|regular|thin]/*.svg`. **Proibido emoji decorativo** (📌 💡 🔍 ✅ 📝 ⚠️ 🎯 🚀 etc.) e proibido inventar SVG ou usar bibliotecas externas. Veja seção 6.

---

## 2. Parâmetros de Entrada

| Parâmetro | Obrigatório | Descrição |
|-----------|-------------|-----------|
| `TEMA` | sim | Tema central da apostila |
| `PUBLICO_ALVO` | sim | Perfil do aprendiz (cargo, contexto, nível) |
| `SUBTITULO` | — | Recorte ou diferencial do tema |
| `NIVEL` | — | Básico / Intermediário / Avançado |
| `NUMERO_CAPITULOS` | — | Quantidade de capítulos (meta: 100-150 páginas) |
| `CARGA_HORARIA` | — | Estimada em horas |
| `TOM_VOZ` | — | Tom desejado (ex: direto, consultivo, motivacional) |
| `DIFERENCIAIS` | — | Abordagens ou metodologias específicas |
| `INSTITUICAO` | — | Nome real, `PLR`, ou omitir (ver seção 5) |
| `MODO` | — | `direto` (passo único) ou `multi-step` (ver seção 4) |

### Inferência inteligente
Para qualquer parâmetro não informado, inferir com base no tema e no público:

| Parâmetro | Como inferir |
|-----------|-------------|
| Subtítulo | Recorte mais relevante do tema para o público |
| Nível | Complexidade esperada para o perfil |
| Nº de capítulos | Quantos tópicos essenciais o tema exige (8 a 12 é a faixa saudável para 100-150 páginas) |
| Carga horária | Estimada a partir do volume de conteúdo |
| Tom de voz | Adequado ao contexto profissional do público |
| Pré-requisitos | O que qualquer pessoa deste público já sabe |
| Objetivos gerais | As 3-5 competências centrais que o tema desenvolve |

---

## 3. Identificação da Instituição / PLR

O parâmetro `INSTITUICAO` controla como a marca aparece no produto final:

| Valor | Comportamento |
|-------|---------------|
| **Não informado** | Produto limpo — sem nome de empresa, sem placeholders, sem página PLR. Cabeçalhos trazem apenas o título da apostila. |
| **Nome real** (ex: `Empresa XYZ`) | Usar o nome fornecido nos cabeçalhos e na capa. Nenhum placeholder `[NOME DA EMPRESA]` deve aparecer. |
| **`PLR`** | Adicionar uma breve nota de personalização **fora do conteúdo** (seção separada antes da apresentação), listando os campos a substituir. Nunca embutir página PLR dentro do corpo da apostila. |

**Regra absoluta:** nunca deixar `[NOME DA EMPRESA]` visível. Se não há empresa definida, omitir a referência — não criar campo em branco.

---

## 4. Modos de Execução

A escolha do modo vem do prompt do usuário (parâmetro `MODO` ou pedido explícito). Não decida sozinho — siga o que foi solicitado.

### Modo 1 — Passo único
Gera a apostila inteira em uma única execução: estrutura + todos os capítulos + pós-textuais. Recomendado para apostilas até 8 capítulos quando o usuário pede "criar apostila completa" sem mencionar etapas.

### Modo 2 — Multi-step (três passos)
Execute em três passos separados quando o usuário pedir revisão intermediária, apostilas extensas ou referir-se a `step 1/2/3`:

| Step | Arquivo de referência | O que produz |
|------|----------------------|--------------|
| Step 1 | `references/step-01-estrutura.md` | `estrutura-apostila.md` com todos os capítulos planejados |
| Step 2 | `references/step-02-capitulo.md` | Cada capítulo individualmente (repetir N vezes) |
| Step 3 | `references/step-03-revisao.md` | Relatório de revisão pedagógica e consolidação final |

---

## 5. Tipografia — valores fixos

Os valores abaixo são **obrigatórios** e devem estar no `:root` ou nas regras correspondentes do CSS. Eles foram calibrados para A4 com `padding: 23mm 20mm 20mm` e impressão profissional.

### 5.1. Famílias
| Função | Família | Fallback | Pesos |
|--------|---------|----------|-------|
| Títulos (h1, h2, h3, blockquote, kicker em alguns lugares) | Bricolage Grotesque | Georgia, serif | 200-800 (variable) |
| Corpo, listas, tabelas, caixas | Plus Jakarta Sans | Arial, sans-serif | 200-800 (variable) |

### 5.2. Escala (não alterar sem ordem)

| Elemento | `font-size` | `line-height` | `font-weight` | Cor |
|----------|-------------|---------------|---------------|-----|
| h1 (corpo) | `30pt` | `1.17` | 800 | `--ink` |
| h1 (capa) | `90pt` | `0.90` | 900 | `#ffffff` |
| h2 | `16pt` | normal | 700 | `--ink` |
| h3 | `15pt` | normal | 600 | `#2e3940` |
| Corpo (`p`, `li`) | `12pt` | `1.62` (corpo) · `1.5` (li) | 400 | `--ink` |
| `.kicker` | `10pt` | normal | 700 (uppercase, letter-spacing .09em) | `--primary` |
| `.subtitle` (capa) | `13pt` | `1.65` | 400 | `rgba(255,255,255,.84)` |
| `.cover-pre` | `12pt` | normal | 300 (uppercase, letter-spacing .18em) | `rgba(255,255,255,.68)` |
| `.cover-post` | `15pt` | normal | 500 | `rgba(255,255,255,.82)` |
| `.box p` / `.box li` | `10.8pt` | `1.52` | 400 | `--ink` |
| `.box strong` (label) | `9pt` | normal | 700 (uppercase, letter-spacing .07em) | varia por tipo |
| `.example p` | `10.2pt` | normal | 400 | `--ink` |
| `.script p` | `10.3pt` | normal | 400 | `--ink` |
| `.customize` | `8.6pt` | normal | 400 | `--muted` |
| Tabela (`th`, `td`) | `10.5pt` (10pt em variantes densas) | `1.4` | 600 (th) · 400 (td) | branco em th, `--ink` em td |
| `.toc-item` | `11pt` | normal | 400 (strong = 700) | `--ink` |
| `.footnote` | `8.5pt` | `1.4` | 400 | `--muted` |
| `.sources li` | `8.4pt` | `1.3` | 400 | `--ink` |
| `.bibliography li` | `9.2pt` | `1.35` | 400 | `--ink` |
| `.page-header` / `.page-footer` | `8` a `8.5pt` | normal | 400 (uppercase no header) | `--muted` |

**Regra:** se o conteúdo de uma página estiver curto, **não aumente fontes** para preencher — use a versão padrão (não `dense`) e mais espaço respiratório natural. Se estiver longo, use `class="page dense"` (ver seção 7.3) antes de cogitar reduzir tamanho.

---

## 6. Iconografia — somente Phosphor local

### 6.1. Origem única
Todos os ícones do material vêm de `assets/icons/`. A biblioteca disponível é a **Phosphor Icons** local, em seis estilos: `bold`, `duotone`, `fill`, `light`, `regular`, `thin`.

**Estilo padrão:** `regular`. Use `bold` apenas quando o ícone aparecer ≤ 16px e precisar manter peso visual. Não misture estilos na mesma apostila.

### 6.2. Como incluir no HTML
Copie o conteúdo do SVG (`<svg ...>...</svg>`) inline no HTML, defina `width`/`height` em milímetros ou pontos, e use `currentColor` no `fill`/`stroke` quando aplicável para herdar a cor do texto.

```html
<!-- Exemplo: ícone "warning" no rótulo de um box.alert -->
<aside class="box alert">
  <strong>
    <svg viewBox="0 0 256 256" width="14" height="14" aria-hidden="true">
      <!-- ... conteúdo de assets/icons/regular/warning.svg ... -->
    </svg>
    Atenção
  </strong>
  <p>...</p>
</aside>
```

### 6.3. Mapeamento obrigatório componente → ícone
Nunca use ícone fora desta tabela sem instrução explícita do usuário.

| Componente | Ícone Phosphor (sem sufixo de estilo) | Onde aparece |
|------------|---------------------------------------|--------------|
| `box.alert` (Atenção) | `warning` | Antes do rótulo "Atenção" |
| `box.tip` (Dica prática) | `lightbulb` | Antes do rótulo "Dica prática" |
| `box.more` (Saiba mais) | `magnifying-glass` | Antes do rótulo "Saiba mais" |
| `box.reflect` (Para refletir) | `pencil-line` | Antes do rótulo "Para refletir" |
| `box.best` (Boas práticas) | `check-circle` | Antes do rótulo "Boas práticas" |
| Sumário (`toc-item`) | `caret-right` (opcional) | Antes do título do capítulo |
| `step` (passo a passo) | número, **sem ícone** | — |
| Estudo de caso (`case`) | `briefcase` | No `h2 "Estudo de caso"` |
| Atividade (`activity`) | `clipboard-text` | No `h2 "Atividade de fixação"` |
| Síntese | `list-checks` | No `h2 "Síntese do capítulo"` |
| Referências (`sources`/`bibliography`) | `book-open` | No `h2 "Referências"` |
| Capa — ícone decorativo | escolher um ícone temático único | `cover-icon`, opacidade .8 |

### 6.4. Proibições
- **Sem emojis** em qualquer lugar do material (📌 💡 🔍 ✅ 📝 ⚠️ 🎯 ✨ 📊 🚀 etc.).
- Sem ícones de outras bibliotecas (Lucide, Heroicons, Font Awesome, Material).
- Sem PNG/JPG como ícone — SVG inline obrigatório.
- Sem ícones aleatórios meramente decorativos. Cada ícone deve ter relação direta com o conceito.

---

## 7. Espaçamento e Layout

### 7.1. Página A4
- `width: 210mm; height: 297mm; padding: 23mm 20mm 20mm;`
- `.page-header` em `top: 10mm` (apenas tema, sem número).
- `.page-footer` em `bottom: 9mm` com `border-top: 1px solid var(--line)` (tema à esquerda, número à direita).
- `page-break-after: always` em toda página; `overflow: hidden` para detectar overflow.

### 7.2. Escala de espaçamento (todos em mm)

| Onde | Valor |
|------|-------|
| Margem inferior padrão de `p` | `5mm` |
| Margem inferior de `p` em `.dense` | `3.4mm` |
| `h1` margem inferior | `10mm` (padrão) · `7mm` (`.dense`) · `6mm` (`chapter-open`) |
| `h2` margem | `8mm 0 4mm` (padrão) · `5mm 0 2.5mm` (`.dense`) |
| `ul`/`ol` margem | `3mm 0 7mm 7mm` · `padding-left: 5mm` |
| `li` margem inferior | `3mm` (padrão) · `2mm` (`.dense`) |
| `blockquote` | `padding: 6mm` · `margin-bottom: 8mm` · `border-left: 4px solid var(--accent)` |
| `.box` | `padding: 4.5mm 5mm` · `margin: 7mm 0` (padrão) · `3.5mm 4mm` / `4mm 0` (`.dense`) |
| `.example` | `padding: 5mm` · `margin: 6mm 0` (padrão) · `3mm 4mm` / `3mm 0` (`.dense`) |
| `.script` | `padding: 5mm` · `margin: 6mm 0` |
| `.step` | `padding: 3mm` · `margin-bottom: 3mm` · gap entre bolinha e texto `4mm` |
| Tabela | `margin: 5mm 0 8mm` · células `padding: 2.8mm 4mm` |
| `.activity` | `padding: 6mm` · `margin-bottom: 8mm` |
| `.write-line` | `margin: 4.5mm 0` · linha com `height: 7mm` |
| `.metrics` | grid 2 ou 3 colunas · `gap: 3mm` · cards `padding: 3mm 4mm` |

### 7.3. Orçamento de conteúdo por página (nunca ultrapassar)

A regra mais quebrada por IAs é colocar conteúdo demais e estourar a página. Use estes tetos:

| Variante de página | Texto corrido máximo | Elementos extras máximos |
|--------------------|----------------------|--------------------------|
| `page` (padrão) | ~1.800 caracteres | 2 boxes + 1 example + 1 tabela pequena |
| `page chapter-open` | ~900 caracteres | 1 blockquote + 1 lista de 3 itens |
| `page dense concepts-page` | ~2.600 caracteres | 4 h2 + 2 examples + 1 footnote |
| `page dense case-page` | ~2.400 caracteres | 5 h2 + 1 box |
| `page dense roadmap-page` | ~1.500 caracteres | grid 10 itens + 1 box |
| `page cover` | ~280 caracteres (subtitle) | 1 ícone, 1 kicker, h1, pre/post |
| `page back-cover` | ~600 caracteres | 1 back-card |
| `page` com atividade (`activity` + síntese + referências) | ~1.500 caracteres | 1 activity (3-4 write-lines) + síntese (5-7 itens) + 3 referências |

Se o conteúdo exceder, **divida em duas páginas** com o mesmo kicker (`Scripts prontos 1/2`, `Scripts prontos 2/2`). Nunca reduza fonte ou espaçamento abaixo dos valores da seção 5/7.2.

### 7.4. Combate ao vazio
Se uma página ficar com mais de **40% de espaço branco vertical**, escolha **uma** destas correções (em ordem de preferência):

1. Mover um bloco do capítulo seguinte para preencher (mantendo coerência didática).
2. Adicionar um `box tip` ou `example` que complemente o tópico.
3. Acrescentar uma tabela de vocabulário, checklist ou síntese visual.
4. Promover a página a `chapter-open` se for o caso de virada de capítulo.

Não centralize verticalmente uma página meio-vazia, não infle parágrafos com paráfrases e não invente conteúdo só para preencher.

---

## 8. Estrutura Obrigatória da Apostila

### 8.1. Pré-textuais (nesta ordem)
1. **Capa** — imagem gerada via skill `criar-imagem-leonardo` (ver seção 10)
2. **Apresentação** — para quem é, o que vai aprender, como usar
3. **Legenda de boxes** — explica cada tipo de box visual (com ícone do mapa em 6.3)
4. **Sumário** — capítulos e seções com paginação
5. **Roadmap** (opcional, recomendado) — visão de jornada `page dense roadmap-page`

### 8.2. Cada capítulo (sequência fixa)
A geração de cada capítulo deve produzir as **9 páginas** abaixo (no padrão consolidado), na ordem:

| # | Página | Classe | Função |
|---|--------|--------|--------|
| 1 | Abertura | `page chapter-open` | epígrafe + objetivos + vocabulário |
| 2 | Base conceitual | `page dense concepts-page` | teoria mínima + 2 exemplos |
| 3 | Método prático | `page` | passo a passo (5 `step`) + 3 boxes |
| 4 | Scripts/Práticas 1/2 | `page` | 2-3 `script` ou `example` + 1 box |
| 5 | Scripts/Práticas 2/2 | `page` | continuação + checklist |
| 6 | Estudo de caso | `page dense case-page` | contexto → problema → análise → solução → resultado + questões |
| 7 | Atividade de fixação | `page` | `activity` + `write-line` (3-5) |
| 8 | Controle de qualidade | `page` | `metrics` + auditoria/tabela |
| 9 | Síntese e fontes | `page` | `summary` (5-7 itens) + ação de campo + 3-5 `sources` |

**Profundidade variável:** se o tema do capítulo justificar, capítulos podem ter 7, 8 ou 10 páginas — mas todos os blocos da sequência devem estar presentes (mesmo que mesclados). Nunca pular Atividade ou Estudo de caso.

### 8.3. Boxes didáticos por capítulo
Mínimo **3 boxes**, tipos variados (não usar 3 `box tip`). Use o mapa de ícones da seção 6.3.

### 8.4. Pós-textuais (nesta ordem)
- **Gabarito comentado** — uma `answer` por capítulo, respostas com justificativa pedagógica
- **Glossário** — mínimo 30 termos, em uma ou duas páginas `page dense`
- **Bibliografia** — ordem alfabética por sobrenome, `class="bibliography"`
- **Plano de implantação** (somente se `INSTITUICAO=PLR`) — fora do corpo, ao final
- **Contracapa** — `page back-cover`, frase de fechamento + nota institucional

---

## 9. Progressão Cognitiva (uso interno — nunca expor no material)

A Taxonomia de Bloom é ferramenta de planejamento do autor, **não rótulo para o leitor**. Nunca escrever "Bloom", "Lembrar", "Criar" ou qualquer nível taxonômico no texto da apostila.

| Posição na apostila | Verbos dos objetivos | Verbo da atividade |
|---------------------|---------------------|--------------------|
| Caps iniciais (1-3) | identificar, explicar, descrever, distinguir | identificar, descrever |
| Caps intermediários (4-6) | executar, aplicar, construir, usar | aplicar, construir |
| Caps de análise (7-8) | comparar, diferenciar, avaliar | comparar, avaliar |
| Caps finais (9-10) | elaborar, criar, justificar, propor | elaborar, criar |

**Regra crítica:** a atividade de fixação deve usar o mesmo nível de verbo dos objetivos do capítulo. Cap. 1 não pode pedir "crie um manual" — deve pedir "identifique" ou "descreva".

---

## 10. Capa — Geração de Imagem

Use a skill `criar-imagem-leonardo` para gerar a imagem de fundo da capa.

- **Modelo:** `lucid-realism`
- **Estilo:** `CINEMATIC`
- **Dimensões:** `--width 896 --height 1264`

> Nunca usar `gpt-image-2` para capas de apostila (retorna erro genérico de API neste formato).

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

Salvar em `assets/images/[categoria]/` e copiar para `output/[run_id]/images/capa.jpg`.

`<div class="cover-divider"></div>` é espaçador invisível entre subtítulo e descrição — **manter sempre**, nunca remover.

---

## 11. Diretrizes de Escrita — Português do Brasil impecável

### 11.1. Estilo
- Use "você" para se dirigir ao aprendiz.
- Todo termo técnico é definido na primeira ocorrência (em itálico ou entre aspas).
- Mínimo 2 exemplos práticos reais por capítulo — nunca genéricos.
- **Frases:** 15 a 25 palavras.
- **Parágrafos:** 3 a 6 frases.
- Cada capítulo conecta explicitamente com o anterior (no início) e o seguinte (no fim).
- Voz ativa, ritmo fluido, leitura natural em voz alta.

### 11.2. Ortografia, acentuação e concordância (checar antes de entregar)
- **Acentos obrigatórios** — erros frequentes: `critério(s)`, `endereço`, `governança`, `família`, `início`, `avança`, `mudança(s)`, `anúncio`, `relevância`, `está`, `próximo`, `público`, `série`, `é` (cópula), `também`, `só`, `após`, `através`.
- **Verbo "é" vs conjunção "e"** — toda cópula exige acento. Revisar especialmente: `"O valor é [X]"`, `"a entrega prevista é [DATA]"`, `"Aqui é [VENDEDOR]"`, `"O serviço é entregue"`. Nunca `"é utilizável"` quando o sentido é `"e utilizável"`.
- **Crase obrigatória** — `à medida que`, `às vezes`, `à vista`, `à disposição`, frente a substantivos femininos definidos.
- **Concordância verbal e nominal** — sujeito composto, partitivos, pronomes de tratamento.
- **"Há" vs "a"** — `há cinco anos` (passado), `daqui a cinco minutos` (futuro).
- **"Mau" vs "mal"** — `mau` é adjetivo (= ruim), `mal` é advérbio (= mal feito) ou substantivo.
- **"Por que / porque / por quê / porquê"** — todos os quatro têm uso específico; nunca trocar.

### 11.3. Padrões de marcas e siglas (capitalização oficial)
- `WhatsApp` (não `whatsapp` nem `Whatsapp`)
- `Meta`, `LGPD`, `CDC`, `LinkedIn`, `Instagram`, `Google`, `YouTube`, `iOS`, `e-mail`
- Sempre confirmar a grafia oficial antes de usar uma marca.

### 11.4. Erros estruturais a evitar
- **Títulos com palavras duplicadas** — proibido `"Manual de vendas de vendas"`, `"Plano de plano"`, etc.
- **Placeholders visíveis** — `[NOME DA EMPRESA]`, `[CLIENTE]`, `[VALOR]` só podem aparecer dentro de `script` editável marcado como tal; nunca no corpo institucional.
- **Reticências e exclamações decorativas** — máximo uma exclamação por seção; reticências só quando há omissão real.
- **Frases de IA** — proibido: "vamos mergulhar", "no mundo de hoje", "no cenário atual", "é importante notar", "vale ressaltar", "é fundamental entender".

### 11.5. Scripts
- Saudação `Olá, [NOME]` (com acento, vírgula). Nunca `Ola,`.
- Identificação `Aqui é [VENDEDOR]` (com `é`). Nunca `Aqui e`.
- Sempre terminar com pergunta ou próximo passo claro.

---

## 12. Output

- **Formato:** HTML único, autocontido, pronto para impressão A4.
- **Caminho:** `squads/[slug]/output/[run_id]/apostila-[slug].html`
- **PDF:** gerar após validação via Chrome headless:
  ```powershell
  & "C:\Program Files\Google\Chrome\Application\chrome.exe" `
    --headless=new --disable-gpu --no-sandbox `
    "--print-to-pdf=apostila-[slug].pdf" `
    "--print-to-pdf-no-header" `
    "file:///caminho/apostila-[slug].html"
  ```
- **Fontes, ícones e imagens:** copiar de `assets/fonts/`, `assets/icons/[estilo]/` e `assets/images/` para `output/[run_id]/fonts/`, `output/[run_id]/icons/` (apenas os usados) e `output/[run_id]/images/` antes de gerar o PDF.

---

## 13. Validação de Overflow (passo obrigatório antes de entregar)

O template inclui um script ao final do `<body>` que mede cada `.page` e marca quando o conteúdo excede a altura útil. Antes de gerar PDF:

1. Abra o HTML no Chrome.
2. Verifique o `console.log` por mensagens de overflow.
3. Para cada página em overflow: divida em duas (mesmo kicker `1/2`, `2/2`) ou promova a `dense`.
4. Para cada página com `>40%` de espaço branco: aplique as correções da seção 7.4.
5. Só então gere o PDF.

---

## 14. Checklist de Qualidade (rodar antes de entregar)

**Identidade visual**
- [ ] `DESIGN.md` lido; cores, fontes e iconografia aplicadas (ou fallback documentado)
- [ ] Template `assets/templates/apostila/apostila-template.html` seguido sem alterar tokens da seção 5/7.2
- [ ] Nenhum emoji decorativo em qualquer página
- [ ] Todos os ícones vêm de `assets/icons/[estilo]/`, no mesmo estilo, com mapeamento da seção 6.3
- [ ] Capa gerada com `criar-imagem-leonardo` (lucid-realism, CINEMATIC, 896×1264)
- [ ] `cover-divider` presente no HTML da capa

**Estrutura**
- [ ] Pré-textuais, capítulos na sequência de 9 páginas, pós-textuais completos
- [ ] 100-150 páginas estimadas (A4, fonte 12pt, espaço 1,62)
- [ ] Mínimo 3 boxes por capítulo, tipos variados
- [ ] Mínimo 2 exemplos reais e 1 estudo de caso por capítulo
- [ ] Glossário com mínimo 30 termos
- [ ] Gabarito comentado para todas as atividades
- [ ] Bibliografia em ordem alfabética por sobrenome

**Diagramação**
- [ ] Nenhuma página em overflow (script de validação rodado)
- [ ] Nenhuma página com >40% de espaço branco
- [ ] Páginas longas divididas com kicker `1/2`, `2/2`
- [ ] Variante `dense` aplicada onde apropriado, fontes nunca reduzidas

**Pedagogia**
- [ ] Progressão cognitiva crescente — verbos simples nos caps iniciais, complexos nos finais
- [ ] Atividade alinhada ao nível cognitivo do capítulo
- [ ] Nenhum termo da Taxonomia de Bloom visível
- [ ] Cada capítulo conecta com o anterior (abertura) e o seguinte (gancho na síntese)

**Língua**
- [ ] Acentos revisados (lista da seção 11.2)
- [ ] `é` vs `e` revisado em todos os scripts e frases com placeholders
- [ ] Capitalização de marcas correta (WhatsApp, Meta, LGPD, etc.)
- [ ] Sem títulos duplicados, sem clichês de IA
- [ ] Nenhum `[NOME DA EMPRESA]` visível fora de script editável

**Institucional**
- [ ] `INSTITUICAO` tratado corretamente (real / omitido / PLR fora do corpo)
