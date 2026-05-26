---
name: criar-imagem-leonardo
description: Gera imagens para materiais educacionais com a API Leonardo.Ai, incluindo Lucid Origin, Lucid Realism, Seedream 4.5 e GPT Image 2, seleciona modelo e proporcao conforme o uso final e salva arquivos em assets/images por categoria. Use para ilustracoes, fotografias, capas, thumbnails, cards sociais e fundos visuais reutilizaveis pelos squads.
type: script
version: 1.1.0
categories: [design, imagem, leonardo-ai, assets]
script:
  path: scripts/generate-image.js
  runtime: node
  dependencies: []
env:
  - LEONARDO_API_KEY
---

# Skill: Criar Imagem Leonardo

Use a Production API da Leonardo.Ai para produzir assets raster reutilizaveis do EduSquad. A imagem final deve ficar em `assets/images/<categoria>/`; outputs exclusivos de uma execucao de squad podem ser copiados depois para `squads/<nome>/output/<run_id>/`.

## Regras Obrigatorias

1. Ler `DESIGN.md` antes de produzir imagem com identidade visual, marca ou paleta institucional.
2. Usar a chave apenas por `LEONARDO_API_KEY` no `.env` da raiz ou na variavel de ambiente do processo.
3. Nunca imprimir, registrar, incluir em prompt ou gravar em arquivo o valor da API key.
4. Avisar que a geracao consome creditos antes de iniciar uma geracao paga, exceto quando o pedido do usuario ja autorizar explicitamente gerar a imagem.
5. Gerar inicialmente uma imagem por prompt. Produzir variantes somente quando solicitado.
6. Nao confiar em texto longo dentro da imagem. Para materiais com texto preciso, gerar apenas a arte de fundo e compor texto no Canva, HTML, PDF ou slides.
7. Salvar com nome descritivo, sem sobrescrever arquivos anteriores, e inspecionar a imagem baixada antes de entregar.

## Decisao Rapida

Leia [references/modelos-e-formatos.md](references/modelos-e-formatos.md) sempre que o pedido nao informar claramente modelo, estilo ou proporcao.

Escolha por finalidade:

| Necessidade | Modelo preferido | Direcao de estilo |
|---|---|---|
| Ilustracao didatica, cena conceitual, capa ilustrada, background | `Lucid Origin` | `DYNAMIC` ou `ILLUSTRATION` |
| Fotografia realista de pessoas, ambiente corporativo ou produto | `Lucid Realism` | `STOCK_PHOTO` ou `CINEMATIC` |
| Composicao visual com referencias, estilo preset e consistencia por seed via fluxo v2 | `Seedream 4.5` | `DYNAMIC`, `CINEMATIC`, `STOCK_PHOTO` ou outro estilo documentado |
| Imagem que exija escolha explicita de qualidade ou dimensoes flexiveis de alta resolucao via fluxo v2 | `GPT Image 2` | `--quality MEDIUM` ou `HIGH`; sem `--style` |
| Card/cartaz com poucas palavras incorporadas na arte | `Ideogram 3.0`, seguindo o guia especifico do modelo | Prompt com texto curto e verificacao rigorosa |
| Diagrama, fluxograma ou infografico com dados/rotulos exatos | Nao gerar o diagrama final via imagem | Gerar somente elementos visuais; montar estrutura em ferramenta deterministica |

`Lucid Origin` e o default seguro para ilustracoes educacionais. O script cobre:

- API v1: `Lucid Origin` e `Lucid Realism`, com `styleUUID`.
- API v2: `Seedream 4.5`, com `style_ids`, e `GPT Image 2`, com `quality`.

Usar Seedream 4.5 ou GPT Image 2 quando o usuario solicitar o modelo ou quando os controles especificos acima forem necessarios. Para outro modelo, ler o guia oficial correspondente antes de gerar.

## Fluxo

### 1. Preparar o pedido

Definir:

- finalidade do asset: capa, hero, ilustracao interna, thumbnail, fundo ou card;
- categoria de armazenamento: por exemplo `educacao`, `lideranca`, `seguranca-do-trabalho`;
- formato/dimensoes com base no uso final;
- prompt com cena, publico, estilo, composicao, luz e restricoes;
- negative prompt quando houver riscos claros, como marca d'agua ou texto involuntario.

Para imagens de marca, extrair do `DESIGN.md` a paleta e descrever as cores no prompt; nao pedir que o modelo redesenhe o logo.

### 2. Verificar acesso e modelos sem consumir creditos

Executar da raiz do projeto:

```bash
node skills/criar-imagem-leonardo/scripts/generate-image.js --list-models
```

Esse comando consulta `GET /api/rest/v1/platformModels`. Usar a lista para localizar o ID do modelo pretendido quando nao for o default testado `lucid-origin`.

### 3. Gerar e salvar

Exemplo de ilustracao educacional:

```bash
node skills/criar-imagem-leonardo/scripts/generate-image.js \
  --category educacao \
  --name aprendizagem-colaborativa \
  --model lucid-origin \
  --style DYNAMIC \
  --width 1024 \
  --height 1024 \
  --prompt "Ilustracao editorial acolhedora de adultos colaborando em uma atividade de aprendizagem, paleta teal e coral suave, composicao limpa, sem texto, sem logotipo, sem marca d'agua."
```

Para uma capa fotografica, usar o alias de `Lucid Realism`:

```bash
node skills/criar-imagem-leonardo/scripts/generate-image.js \
  --category curso-vendas \
  --name capa-modulo \
  --model lucid-realism \
  --style STOCK_PHOTO \
  --width 1280 \
  --height 720 \
  --prompt "Fotografia realista de uma reuniao consultiva, enquadramento horizontal com espaco negativo a esquerda, sem texto e sem marcas."
```

Para Seedream 4.5, quando o fluxo v2 com estilo for necessario:

```bash
node skills/criar-imagem-leonardo/scripts/generate-image.js \
  --category educacao \
  --name abertura-curso \
  --model seedream-4.5 \
  --style DYNAMIC \
  --width 1280 \
  --height 720 \
  --prompt "Cena horizontal acolhedora de estudo profissional, espaco negativo a esquerda para titulo aplicado posteriormente, sem texto e sem logotipo."
```

Seedream tambem aceita `--seed` e referencias v2 com `--reference-id`, `--reference-type` e `--reference-strength LOW|MID|HIGH`.

Para GPT Image 2, quando a qualidade ou a resolucao flexivel forem determinantes:

```bash
node skills/criar-imagem-leonardo/scripts/generate-image.js \
  --category educacao \
  --name hero-plataforma \
  --model gpt-image-2 \
  --quality HIGH \
  --width 1376 \
  --height 768 \
  --prompt "Hero visual limpo para plataforma de cursos, profissionais estudando com tecnologia, luz natural, espaco para copy, sem texto e sem marca d'agua."
```

GPT Image 2 aceita referencias v2 com `--reference-id` e `--reference-type`, mas nao aceita intensidade de referencia nesta integracao.

O script cria `assets/images/<categoria>/` quando necessario, aguarda a geracao, baixa a primeira imagem e grava um nome versionado pelo ID da geracao. Para Flux, Phoenix, Ideogram ou outros modelos, seguir a pagina oficial do modelo antes de adaptar a chamada, pois os parametros podem diferir.

### 4. Validar antes da entrega

Confirmar:

- arquivo existe e e JPEG, PNG ou WebP valido;
- assunto, enquadramento e estilo atendem ao pedido;
- nao ha texto ilegivel, watermark, logos inventados ou artefatos evidentes;
- categoria e nome de arquivo permitem reutilizacao;
- para material institucional, as cores e o tom permanecem coerentes com `DESIGN.md`.

Se a imagem falhar visualmente, criar uma nova variante com uma unica correcao objetiva no prompt e registrar qual foi escolhida.

## Transparencia e Imagens Com Texto

- Para fundo transparente, nao usar o executor atual: a opcao `--transparent` e recusada ate que um modelo v1 oficialmente compativel seja implementado. Seedream 4.5 e GPT Image 2 nao documentam esse parametro nas paginas usadas por esta skill.
- Para copy, titulos, legendas, rotulos de diagramas e valores numericos, gerar arte sem texto e inserir texto depois em um formato editavel.

## Endpoints Usados

| Operacao | Endpoint |
|---|---|
| Listar modelos | `GET https://cloud.leonardo.ai/api/rest/v1/platformModels` |
| Criar com Lucid Origin/Realism | `POST https://cloud.leonardo.ai/api/rest/v1/generations` |
| Criar com Seedream 4.5/GPT Image 2 | `POST https://cloud.leonardo.ai/api/rest/v2/generations` |
| Consultar geracao | `GET https://cloud.leonardo.ai/api/rest/v1/generations/{generationId}` |

A autenticacao REST usa o header `Authorization: Bearer <LEONARDO_API_KEY>`.

Documentacao oficial de referencia:

- `https://docs.leonardo.ai/docs/getting-started`
- `https://docs.leonardo.ai/docs/commonly-used-api-values`
- `https://docs.leonardo.ai/reference/creategeneration`
- `https://docs.leonardo.ai/docs/seedream-4-5`
- `https://docs.leonardo.ai/docs/gpt-image-2`

## Diagnostico

| Situacao | Acao |
|---|---|
| `LEONARDO_API_KEY` ausente | Solicitar que o usuario a configure no `.env`; nunca pedir que seja incluida em arquivo versionado |
| `401` ou `403` | Validar chave e permissao/creditos da Production API |
| Modelo Lucid rejeitado | Rodar `--list-models` e passar `--model-id` valido |
| Parametro v2 rejeitado | Conferir dimensoes e opcoes validas para `seedream-4.5` ou `gpt-image-2`; nao repetir geracao sem corrigir o payload |
| Geracao demora | Consultar o `generationId` retornado; nao disparar outra geracao automaticamente |
| Download falha | Reconsultar a geracao concluida e baixar a URL novamente |

## Checklist

- [ ] Ler `DESIGN.md` quando aplicavel
- [ ] Definir finalidade, categoria e proporcao
- [ ] Escolher modelo com base no uso final
- [ ] Confirmar consumo de creditos quando necessario
- [ ] Usar `LEONARDO_API_KEY` sem expo-la
- [ ] Salvar em `assets/images/<categoria>/`
- [ ] Inspecionar o resultado final
