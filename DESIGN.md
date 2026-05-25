# Manual da Marca

Este arquivo é a fonte de verdade visual do projeto. Agentes devem lê-lo antes de gerar qualquer material — apresentações, PDFs, HTMLs, quizzes ou qualquer output com identidade visual.

---

## Identidade

**Nome da marca:** <!-- ex: Bricola Academy -->
**Slogan:** <!-- ex: Aprenda com propósito -->
**Tom de voz:** <!-- ex: direto, acolhedor, sem jargões -->

---

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Primária | `#` | Títulos, cabeçalhos, CTAs principais |
| Secundária | `#` | Destaques, bordas, badges |
| Fundo | `#` | Background de páginas e slides |
| Texto | `#` | Corpo de texto |
| Texto suave | `#` | Legendas, notas, placeholders |
| Sucesso | `#` | Feedback positivo, acertos |
| Alerta | `#` | Atenção, dicas importantes |
| Erro | `#` | Feedback negativo, erros |

### Gradientes (opcional)

```
Gradiente principal: linear-gradient(135deg, #____ 0%, #____ 100%)
```

---

## Tipografia

### Fonte principal
- **Família:** <!-- ex: Bricolage Grotesque -->
- **Arquivo TTF:** `assets/fonts/` <!-- ex: BricolageGrotesque-Regular.ttf -->
- **Fallback:** <!-- ex: Arial, sans-serif -->
- **Google Fonts:** <!-- ex: https://fonts.google.com/specimen/Bricolage+Grotesque -->

### Fonte de destaque / títulos (se diferente)
- **Família:** <!-- ex: Bricolage Grotesque -->
- **Peso:** <!-- ex: 700 Bold -->

### Escala tipográfica

| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| H1 — Título principal | `px` / `pt` | | |
| H2 — Seção | `px` / `pt` | | |
| H3 — Subseção | `px` / `pt` | | |
| Corpo | `px` / `pt` | | |
| Legenda / nota | `px` / `pt` | | |

---

## Espaçamento e Layout

- **Unidade base:** <!-- ex: 8px -->
- **Margem de página (PDF A4):** <!-- ex: 22mm topo/base, 24mm laterais -->
- **Espaçamento entre seções:** <!-- ex: 32px -->
- **Border radius:** <!-- ex: 8px suave, 4px botões -->

---

## Logo

- **Arquivo principal:** `assets/branding/logo.svg` (ou .png)
- **Versão clara (fundo escuro):** `assets/branding/logo-white.svg`
- **Versão escura (fundo claro):** `assets/branding/logo-dark.svg`
- **Tamanho mínimo:** <!-- ex: 120px de largura -->
- **Área de respiro:** <!-- ex: 16px em todos os lados -->

---

## Iconografia

- **Biblioteca:** <!-- ex: Lucide Icons, Heroicons, customizada -->
- **Estilo:** <!-- ex: outline, filled, duotone -->
- **Tamanho padrão:** <!-- ex: 24px -->
- **Cor padrão:** <!-- ex: mesma da cor primária -->
- **Arquivos locais:** `assets/icons/`

---

## Imagens e Ilustrações

- **Estilo:** <!-- ex: fotografia real, ilustração vetorial, flat design -->
- **Tom:** <!-- ex: pessoas reais em ambiente de trabalho, diversidade -->
- **Arquivos locais:** `assets/images/`

---

## Regras de Aplicação

### Sempre fazer
- Usar a paleta de cores definida acima
- Manter hierarquia tipográfica consistente
- Preservar a área de respiro do logo

### Nunca fazer
- Distorcer ou recolorir o logo
- Usar fontes fora da escala definida
- Usar cores fora da paleta sem justificativa

---

## Como usar em PDFs (reportlab)

Ao gerar PDFs com reportlab, busque os arquivos de fonte em:
1. `assets/fonts/` — fontes do projeto (prioridade)
2. `C:/Windows/Fonts/` — fontes instaladas no sistema

Cores: use os valores hex da tabela acima com `HexColor('#______')`.
