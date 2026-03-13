---
name: Canva
description: Cria apresentações, infográficos, capas de curso, materiais visuais e posts educacionais diretamente no Canva via MCP. Use quando o usuário pedir "criar no Canva", "apresentação no Canva", "infográfico", "capa de curso", "slide no Canva", "material visual" ou qualquer design que deva ser produzido na plataforma Canva.
type: mcp
version: 1.0.0
categories: [design, visual, apresentacao, canva]
mcp_server: claude_ai_Canva
---

# Canva Skill — Design Educacional via MCP

Esta skill usa o MCP do Canva (já conectado neste ambiente) para criar designs educacionais diretamente na plataforma — sem precisar abrir o browser manualmente.

---

## Ferramentas MCP Disponíveis

| Ferramenta | O que faz |
|---|---|
| `mcp__claude_ai_Canva__generate-design` | Cria um design novo a partir de um prompt de texto |
| `mcp__claude_ai_Canva__generate-design-structured` | Cria design com controle estruturado de slides/páginas |
| `mcp__claude_ai_Canva__get-design` | Recupera informações de um design existente |
| `mcp__claude_ai_Canva__get-design-pages` | Lista e lê as páginas de um design |
| `mcp__claude_ai_Canva__get-design-content` | Lê o conteúdo detalhado de um design |
| `mcp__claude_ai_Canva__start-editing-transaction` | Inicia edição de um design existente |
| `mcp__claude_ai_Canva__perform-editing-operations` | Modifica textos, imagens e elementos |
| `mcp__claude_ai_Canva__commit-editing-transaction` | Salva as edições feitas |
| `mcp__claude_ai_Canva__export-design` | Exporta o design como PNG, PDF ou MP4 |
| `mcp__claude_ai_Canva__get-design-thumbnail` | Obtém thumbnail de preview |
| `mcp__claude_ai_Canva__search-designs` | Busca designs existentes no Canva do usuário |
| `mcp__claude_ai_Canva__list-brand-kits` | Lista brand kits disponíveis |
| `mcp__claude_ai_Canva__resize-design` | Redimensiona um design para outro formato |

---

## Tipos de Design Educacional

### Apresentações (Slides)

```
Prompt: "Crie uma apresentação profissional com {N} slides sobre {tema}
para {público}. Inclua: título, agenda, {tópicos}, e slide de encerramento.
Estilo: {formal/moderno/minimalista}. Paleta: {cores}."
```

Formatos disponíveis no Canva:
- `presentation` — 16:9 padrão (1920×1080px)
- `presentation_16_9` — equivalente
- `presentation_4_3` — formato clássico

### Infográficos Educacionais

```
Prompt: "Crie um infográfico vertical sobre {tema} com:
1. Título chamativo
2. {N} seções com ícones e textos curtos
3. Dados/estatísticas relevantes
4. Rodapé com fonte ou instituição
Estilo visual: clean, educacional, paleta {cores}."
```

Formatos:
- `infographic` — 800×2000px (vertical)
- `a4_document` — A4 para impressão

### Capas de Curso

```
Prompt: "Crie uma capa profissional para o curso '{título do curso}'.
Inclua: título do curso, subtítulo opcional, nome da instituição/instrutor,
elemento visual representando o tema. Estilo: {moderno/acadêmico/corporativo}."
```

Formatos:
- `youtube_thumbnail` — 1280×720px (ideal para plataformas EAD)
- `facebook_cover` — 820×312px
- `presentation` — 1920×1080px

### Material de Apoio

```
Prompt: "Crie um {folheto/handout/guia rápido} de 1 página sobre {tema}
com: título, {N} tópicos principais com descrição curta, dica de destaque,
e rodapé com informações de contato/fonte."
```

Formatos:
- `a4_document` — A4
- `us_letter` — Carta
- `flyer_portrait` — Flyer vertical

---

## Fluxo de Uso

### 1. Criar design novo

```
Use mcp__claude_ai_Canva__generate-design com:
- prompt: descrição detalhada do design
- title: nome do arquivo no Canva
- design_type: tipo do formato (ver lista acima)
```

### 2. Verificar e refinar

```
Use mcp__claude_ai_Canva__get-design para ver o resultado
Use mcp__claude_ai_Canva__get-design-thumbnail para preview
```

### 3. Editar se necessário

```
Use mcp__claude_ai_Canva__start-editing-transaction
Use mcp__claude_ai_Canva__perform-editing-operations (modificar textos/elementos)
Use mcp__claude_ai_Canva__commit-editing-transaction
```

### 4. Exportar

```
Use mcp__claude_ai_Canva__export-design com:
- format: "png" | "pdf" | "mp4"
- export_quality: "regular" | "high" | "pro"
```

---

## Exemplos Educacionais

### Exemplo 1 — Apresentação de Aula (20 slides)

```
Criar design no Canva:
- Tipo: presentation (16:9)
- Título: "Fundamentos de Design Instrucional — Módulo 1"
- Prompt:
  "Apresentação profissional sobre Design Instrucional com 20 slides.
  Slide 1: Título com nome do módulo e instrutor.
  Slide 2: Agenda — 5 tópicos numerados.
  Slides 3-5: O que é Design Instrucional? + definição + benefícios.
  Slides 6-9: Modelo ADDIE — 1 slide por fase com ícone e descrição.
  Slides 10-13: Taxonomia de Bloom — pirâmide visual com 6 níveis coloridos.
  Slides 14-16: Atividades práticas — PBL, sala invertida, gamificação.
  Slide 17: Estudo de caso rápido.
  Slides 18-19: Principais ferramentas do DI.
  Slide 20: Encerramento com próximos passos e QR code.
  Estilo: clean e profissional, paleta azul-índigo e branco, tipografia sans-serif."
```

### Exemplo 2 — Infográfico Taxonomia de Bloom

```
Criar design no Canva:
- Tipo: infographic
- Título: "Taxonomia de Bloom — Infográfico"
- Prompt:
  "Infográfico vertical sobre a Taxonomia de Bloom com pirâmide de 6 níveis.
  Cada nível deve ter: nome, cor diferente (vermelho no topo, tons mais
  claros na base), 3 verbos de ação representativos, e ícone ilustrativo.
  Níveis de baixo para cima: Lembrar (azul), Compreender (verde),
  Aplicar (amarelo), Analisar (laranja), Avaliar (vermelho-claro), Criar (vermelho).
  Título no topo: 'Taxonomia de Bloom'. Subtítulo: 'Objetivos de Aprendizagem'.
  Rodapé: 'Adaptado de Bloom et al. (1956) / Anderson & Krathwohl (2001)'."
```

### Exemplo 3 — Capa de Curso para Hotmart/Moodle

```
Criar design no Canva:
- Tipo: youtube_thumbnail (1280×720px)
- Título: "Capa — Curso Python Básico"
- Prompt:
  "Capa profissional para curso online de Python para iniciantes.
  Elementos: título 'Python para Iniciantes' em destaque, subtítulo
  'Do zero ao seu primeiro programa', ícone ou logo Python (cobra/serpente),
  fundo com gradiente escuro azul-marinho, textura tech sutil.
  Nome do instrutor no canto inferior. Selo 'GRÁTIS' ou 'NOVO' opcional.
  Estilo: moderno, tech, atrativo para iniciantes."
```

---

## Dimensões de Referência por Formato

| Formato Canva | Dimensões | Uso Educacional |
|---|---|---|
| `presentation` | 1920×1080px | Slides de aula, apresentações |
| `infographic` | 800×2000px | Resumos visuais, timelines |
| `a4_document` | 794×1123px | Handouts, apostilas, fichas |
| `youtube_thumbnail` | 1280×720px | Capas de curso online |
| `instagram_post_square` | 1080×1080px | Cards educacionais para redes |
| `instagram_story` | 1080×1920px | Stories com dicas rápidas |
| `facebook_cover` | 820×312px | Capa de grupo/comunidade |
| `email_newsletter` | 600×800px | E-mail marketing para alunos |
| `certificate` | 1920×1357px | Certificados de conclusão |

---

## Onde Salvar (EduSquad)

```
squads/{nome}/output/{run_id}/{step}/
  canva-link.txt      ← URL do design no Canva (para editar)
  design.png          ← export PNG (se solicitado)
  design.pdf          ← export PDF (se solicitado)
```

Após criar o design, salve o link do Canva em `canva-link.txt` para que o usuário possa editar diretamente na plataforma.

---

## Boas Práticas de Prompt para Canva Educacional

1. **Especifique o número de slides/seções** — o Canva respeita estruturas claras
2. **Descreva a hierarquia visual** — título > subtítulo > corpo > rodapé
3. **Mencione cores e estilo** — "paleta azul corporativo", "estilo minimalista"
4. **Inclua público-alvo** — "para universitários", "para crianças do EF1"
5. **Indique o uso final** — "para projetar em sala", "para redes sociais"

---

## Checklist para Design Educacional no Canva

- [ ] Escolher tipo de design adequado ao uso final
- [ ] Escrever prompt detalhado com estrutura de conteúdo
- [ ] Incluir paleta de cores ou brand kit preferido
- [ ] Verificar thumbnail após criação
- [ ] Editar textos ou elementos se necessário
- [ ] Exportar no formato adequado (PNG para digital, PDF para impressão)
- [ ] Salvar link do Canva para edições futuras
- [ ] Registrar link em `canva-link.txt` no output do squad
