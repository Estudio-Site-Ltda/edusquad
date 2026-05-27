---
id: apostila-unico
label: Geração Completa de Apostila (Passo Único)
obrigatorio: TEMA, PUBLICO_ALVO
opcionais: SUBTITULO, NIVEL, NUMERO_CAPITULOS, CARGA_HORARIA, TOM_VOZ, DIFERENCIAIS, INSTITUICAO
---

# Prompt Único — Geração de Apostila Completa

## Template e Identidade Visual

**Passo 1 — Leia o DESIGN.md** na raiz do projeto antes de gerar qualquer coisa.
- Se existir: extraia as cores (Paleta), as fontes (Tipografia) e o tom de voz. Aplique-os na apostila.
- Se não existir: use os valores padrão do template como fallback.

**Passo 2 — Use o template padrão de apostilas:**
`assets/templates/apostila/apostila-template.html`

O template define: estrutura HTML de todas as páginas, componentes (boxes, estudo de caso, atividade, scripts, roadmap), hierarquia tipográfica e layout A4. Os valores de cor e fonte no template são apenas fallback — o `DESIGN.md` tem prioridade.

**Regra:** nunca fixar cores ou fontes no output sem verificar o `DESIGN.md` primeiro.

---

## Missão

Você é um designer instrucional sênior. Produza uma apostila completa de 100 a 150 páginas, autocontida, que o aprendiz possa estudar de forma autônoma.

**Parâmetros recebidos:**
- **Tema:** [TEMA]
- **Público-alvo:** [PUBLICO_ALVO]
- **Informações adicionais (se fornecidas):** [DEMAIS_PARAMETROS]

## Inferência Inteligente

Para qualquer parâmetro não informado, decida com base no tema e no público:

| Parâmetro | Como inferir |
|-----------|-------------|
| Subtítulo | Recorte mais relevante do tema para o público |
| Nível | Complexidade esperada para o perfil do público |
| Nº de capítulos | Quantos tópicos essenciais o tema exige (meta: 100-150 páginas) |
| Carga horária | Estimada a partir do volume de conteúdo |
| Tom de voz | Adequado ao contexto profissional do público |
| Pré-requisitos | O que qualquer pessoa deste público já sabe |
| Objetivos gerais | As 3-5 competências centrais que o tema desenvolve |

### Identificação da Instituição / PLR

O parâmetro `INSTITUICAO` controla como a marca é tratada no produto final:

| Valor de `INSTITUICAO` | Comportamento |
|------------------------|---------------|
| **Não informado** | Produto limpo — sem nome de empresa, sem placeholders, sem página PLR. Cabeçalhos trazem apenas o título da apostila. |
| **Nome real** (ex: `Empresa XYZ`) | Usar o nome fornecido nos cabeçalhos e na capa. Nenhum placeholder `[NOME DA EMPRESA]` deve aparecer. |
| **`PLR`** | Adicionar uma breve nota de personalização **fora do conteúdo da apostila** (ex: seção separada antes da apresentação), listando os campos a substituir. Nunca embutir a página PLR dentro do corpo da apostila. |

**Regra absoluta:** nunca deixar o placeholder `[NOME DA EMPRESA]` visível no produto final. Se não há empresa definida, omitir a referência — não criar campo em branco.

---

## Estrutura Obrigatória

### Pré-textuais
1. **Capa** — use a skill `@skills/criar-imagem-leonardo` para gerar a imagem de fundo da capa:
   - **Modelo:** `lucid-realism` · **Estilo:** `CINEMATIC` · **Dimensões:** `--width 896 --height 1264`
   - **Não usar GPT Image 2** (retorna erro genérico de API neste formato)
   - **Estrutura do prompt de imagem** (adaptar ao tema):
     ```
     Back view of a confident professional [PERFIL DO PÚBLICO] standing,
     holding or interacting with [OBJETO CENTRAL DO TEMA].
     Around them in a dark background: [ELEMENTOS VISUAIS DO TEMA] floating
     as glowing icons or chalk drawings.
     Dark dramatic background, warm golden spotlight from above,
     cinematic depth of field, moody professional atmosphere.
     No text, no logos, no watermarks, portrait orientation.
     ```
   - **CSS de fundo** (3 zonas): escuro no topo (texto legível) → transparente no meio (pessoa visível) → escuro no rodapé (descrição legível):
     ```css
     background: linear-gradient(to bottom,
       rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 32%,
       rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.10) 64%,
       rgba(5,20,28,0.94) 78%, rgba(5,20,28,1) 100%),
       url('images/capa.jpg') center top/cover no-repeat;
     ```
   - Salvar em `assets/images/[categoria]/` e copiar para `output/[run]/images/capa.jpg`
2. **Apresentação** — para quem é, o que vai aprender, como usar
3. **Sumário** — capítulos e seções numerados
4. **Legenda de boxes** — ícones usados ao longo do material

### Capítulos

Para cada capítulo, siga esta sequência didática:

1. **Abertura** — epígrafe ou pergunta provocadora + conexão com o capítulo anterior
2. **Objetivos** — 2-3 objetivos com verbos adequados ao nível cognitivo do capítulo
3. **Conceito central** — teoria mínima necessária, vocabulário técnico definido
4. **Tópico 2** — técnica, ferramenta ou dimensão complementar + exemplo real
5. **Tópico 3** — aplicação prática, passo a passo ou framework utilizável imediatamente
6. **Boxes didáticos** — mínimo 3 por capítulo, distribuídos:
   - 📌 ATENÇÃO — erros críticos
   - 💡 DICA PRÁTICA — aplicação imediata
   - 🔍 SAIBA MAIS — aprofundamento opcional
   - 📝 PARA REFLETIR — questão reflexiva
   - ✅ BOAS PRÁTICAS — recomendações diretas
7. **Estudo de caso** — contexto → problema → análise → solução → resultado + 2-3 questões
8. **Atividade de fixação** — exercício alinhado ao nível cognitivo do capítulo
9. **Síntese** — 5-7 pontos-chave + gancho para o próximo capítulo
10. **Referências do capítulo** — 3-5 fontes confiáveis

### Progressão cognitiva (uso interno — não expor no material)
- Capítulos iniciais: verbos de reconhecimento/compreensão — identificar, explicar, descrever, distinguir
- Capítulos intermediários: verbos de aplicação/análise — executar, aplicar, construir, comparar
- Capítulos finais: verbos de avaliação/criação — avaliar, elaborar, criar, justificar

### Pós-textuais
- **Gabarito comentado** — respostas e justificativas de todas as atividades
- **Glossário** — mínimo 30 termos com definições claras
- **Referências bibliográficas** — lista consolidada em ordem alfabética

---

## Diretrizes de Escrita

- Use "você" para se dirigir ao aprendiz
- Todo termo técnico é definido na primeira ocorrência
- Mínimo 2 exemplos práticos reais por capítulo (não genéricos)
- Frases: 15-25 palavras. Parágrafos: 3-6 frases.
- Cada capítulo conecta explicitamente com o anterior e o seguinte

### Qualidade linguística (obrigatório revisar antes de entregar)

- **Acentos**: nunca omitir — erros frequentes: `critérios`, `endereço`, `Governança`, `família`, `início`, `avança`, `mudança`, `anúncio`, `relevância`
- **Verbo "é" vs conjunção "e"**: toda cópula exige acento — revisar frases como "O investimento é [X]", "entrega prevista é [DATA]", "Serviço é comprado"
- **Scripts**: saudações com acento — `Olá, [NOME]` (nunca `Ola,`); identificação — `Aqui é [VENDEDOR]` (nunca `Aqui e`)
- **Nomes de marcas**: capitalização oficial — `WhatsApp` (não `whatsapp`), `Meta`, `LGPD`, `CDC`
- **Títulos**: sem palavras duplicadas nem redundâncias (ex: "Manual de vendas e campanha", não "Manual de vendas de vendas e campanha")

### Progressão cognitiva (uso interno — não expor no material)

A Taxonomia de Bloom é ferramenta de planejamento do autor, não rótulo para o leitor. **Nunca escrever "Bloom", "Lembrar", "Criar" ou qualquer nível taxonômico no texto da apostila.**

- Caps iniciais: objetivos com verbos de reconhecimento/compreensão (identificar, explicar, descrever, distinguir)
- Caps intermediários: objetivos com verbos de aplicação/análise (executar, aplicar, construir, comparar)
- Caps finais: objetivos com verbos de avaliação/criação (avaliar, elaborar, criar, justificar)
- A atividade de fixação deve usar o mesmo tipo de verbo dos objetivos do capítulo — caps iniciais pedem "descreva/identifique", não "crie/elabore"

---

## Critérios de Qualidade

- [ ] 100-150 páginas estimadas (A4, fonte 11pt, espaço 1,5)
- [ ] Todos os capítulos com sequência didática completa
- [ ] Progressão cognitiva crescente (verbos simples → complexos ao longo dos capítulos)
- [ ] Atividade de fixação alinhada ao nível cognitivo do capítulo (caps iniciais: identificar/descrever — não "criar")
- [ ] Nenhum termo da Taxonomia de Bloom aparece no material visível ao leitor
- [ ] Mínimo 2 exemplos reais e 1 estudo de caso por capítulo
- [ ] Glossário com mínimo 30 termos
- [ ] Gabarito comentado completo
- [ ] Ortografia revisada: acentos, verbos "é", nomes de marcas, títulos sem duplicações
- [ ] Nenhum placeholder `[NOME DA EMPRESA]` visível — empresa real, nota PLR separada, ou campo omitido
