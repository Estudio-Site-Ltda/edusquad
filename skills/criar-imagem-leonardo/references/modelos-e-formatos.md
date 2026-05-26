# Modelos e Formatos para Leonardo.Ai

Consulte este arquivo ao planejar um novo asset. A skill implementa fluxos v1 para Lucid e v2 para Seedream/GPT Image; confirme modelos v1 com `--list-models` e consulte o guia oficial se houver mudanca de contrato.

## Selecao de Modelo

| Tipo de imagem | Modelo indicado | Por que escolher | Evitar |
|---|---|---|---|
| Ilustracao editorial, conceito pedagogico, capa ilustrada, personagem ou ambiente estilizado | `Lucid Origin` | Bom modelo geral e flexivel para estilos variados | Texto pequeno e diagramas exatos |
| Foto de aluno, docente, equipe, equipamento, produto ou ambiente real | `Lucid Realism` | Prioriza aparencia fotografica e luz natural | Ilustracao flat ou materiais que precisem de rotulos |
| Cena de alto apelo visual que use estilo preset, seed ou ate 6 imagens de referencia | `Seedream 4.5` | O guia v2 documenta `style_ids`, `seed` e `guidances.image_reference` com forca | Usar parametros v1 como `modelId` e `styleUUID` no corpo raiz |
| Asset em que a equipe solicite GPT Image 2 ou controle de qualidade e resolucao flexivel | `GPT Image 2` | O guia v2 documenta `quality` (`LOW`, `MEDIUM`, `HIGH`) e resolucao customizada | Informar `--style`, `--negative-prompt` ou forca de referencia |
| Poster, thumbnail ou card com texto curto como parte do visual | `Ideogram 3.0`, usando o guia especifico desse modelo | Melhor opcao para tipografia dentro da imagem | Frases longas, tabelas e copy definitiva |
| Grafico, mapa mental, fluxograma, tela de interface ou infografico informativo | Compor fora da IA | Textos e dados exigem precisao editavel | Entregar imagem gerada como fonte de verdade |

O script incluido implementa:

- `lucid-origin` e `lucid-realism`: endpoint v1, ID de modelo e `styleUUID`.
- `seedream-4.5`: endpoint v2, identificador textual e `style_ids`.
- `gpt-image-2`: endpoint v2, identificador textual e `quality`.

Para identificar IDs dos modelos v1 disponiveis:

```bash
node skills/criar-imagem-leonardo/scripts/generate-image.js --list-models
```

Para Flux, Phoenix, Ideogram e modelos adicionados posteriormente, consultar o guia oficial daquele modelo antes de executar uma geracao, pois endpoint e parametros podem diferir.

## Dimensoes Recomendadas

Usar dimensoes proporcionais ao destino. Os valores abaixo mantem arquivos leves e sao adequados a assets iniciais; gerar em resolucao maior apenas quando a entrega exigir.

| Uso final | Proporcao | Dimensoes iniciais | Direcao de composicao |
|---|---:|---:|---|
| Icone ilustrado ou imagem quadrada de card | 1:1 | `1024 x 1024` | Assunto central, margens amplas |
| Capa de modulo, thumbnail ou hero de LMS | 16:9 | `1280 x 720` | Area livre para titulo aplicado depois |
| Slide ou banner horizontal | 16:9 | `1280 x 720` | Elementos fora da area reservada para texto |
| Card vertical/social | 4:5 | `1024 x 1280` | Assunto no terco central/inferior |
| Story ou tela mobile | 9:16 | `768 x 1360` | Espaco seguro no topo e na base |
| Material A4 com imagem de abertura | Aproximado A4 | `768 x 1088` | Composicao vertical sem texto embutido |
| Retrato/avatar | 1:1 ou 4:5 | `1024 x 1024` ou `1024 x 1280` | Rosto bem enquadrado e fundo simples |

### Regras por fluxo

| Modelo | Validacao aplicada pelo script |
|---|---|
| `lucid-origin`, `lucid-realism` | Lados entre `32` e `1536`, multiplos de `8` |
| `seedream-4.5` | Lados entre `256` e `1440`, multiplos de `8`; limite conservador baseado no campo documentado para largura |
| `gpt-image-2` | Lados multiplos de `16`, maior lado menor que `3840`, razao maxima `3:1`, area entre `655360` e `8294400` pixels |

O exemplo oficial de Seedream 4.5 mostra `1920 x 1080`, mas a mesma pagina informa largura suportada de `256` a `1440`. A skill adota o limite menor para evitar chamadas pagas potencialmente invalidas.

## Escolha de Estilo

| Direcao visual | Valor sugerido para `--style` | Aplicacao |
|---|---|---|
| Versatil e contemporanea | `DYNAMIC` | Default para ilustracoes e capas |
| Visual ilustrado | `ILLUSTRATION` | Cenas didaticas, personagens, conceitos |
| Fotografia editorial | `STOCK_PHOTO` | Pessoas, espacos e produtos realistas |
| Dramatico/cinematografico | `CINEMATIC` | Heroes e thumbnails realistas |
| Sem preset explicito | `NONE` | Quando o modelo ou prompt exigir controle proprio |

O script converte esses estilos em `styleUUID` oficiais, compativeis com Lucid Origin e Lucid Realism. Se a API rejeitar um estilo, usar `NONE` e refazer somente depois de confirmar que a geracao anterior falhou.

Para `seedream-4.5`, usar apenas estilos documentados: `CINEMATIC`, `CREATIVE`, `DYNAMIC`, `FASHION`, `PORTRAIT`, `STOCK_PHOTO` ou `VIBRANT`; o script os envia em `style_ids`. Para `gpt-image-2`, nao informar `--style`; escolher `--quality LOW`, `MEDIUM` ou `HIGH`.

## Exemplos V2

```bash
node skills/criar-imagem-leonardo/scripts/generate-image.js \
  --model seedream-4.5 --style CINEMATIC \
  --category capa --name modulo-inovacao \
  --width 1280 --height 720 \
  --prompt "Cena editorial de aprendizagem profissional, sem texto."

node skills/criar-imagem-leonardo/scripts/generate-image.js \
  --model seedream-4.5 --style DYNAMIC --seed 12345 \
  --reference-id ID_DA_IMAGEM --reference-type UPLOADED --reference-strength MID \
  --category capa --name variante-consistente \
  --width 1280 --height 720 \
  --prompt "Criar uma variacao consistente para abertura do curso, sem texto."

node skills/criar-imagem-leonardo/scripts/generate-image.js \
  --model gpt-image-2 --quality HIGH \
  --category hero --name plataforma-ead \
  --width 1376 --height 768 \
  --prompt "Hero moderno para plataforma EAD, sem texto."
```

## Formula de Prompt

Montar prompts nesta ordem:

```text
Finalidade e meio: [ilustracao/fotografia] para [capa/card/slide].
Cena: [ambiente e acao].
Sujeito: [pessoas/objeto/conceito] para [publico].
Composicao: [orientacao e espaco negativo].
Estilo e luz: [estetica, iluminacao, paleta].
Restricoes: sem texto, sem logotipo, sem marca d'agua, sem elementos inadequados.
```

Para o Estudio Site, quando a imagem fizer parte da identidade visual, ler `DESIGN.md` e considerar a paleta principal teal (`#1d8a9c`) com coral de destaque (`#d9534f`) sem forcar o uso em imagens que precisem parecer naturais.
