# Manual da Marca

Copie este arquivo para `DESIGN.md` e preencha a identidade visual local. O arquivo preenchido nao e versionado.

---

## Identidade

**Nome da marca:** <!-- ex: Bricola Academy -->
**Slogan:** <!-- ex: Aprenda com proposito -->
**Tom de voz:** <!-- ex: direto, acolhedor, sem jargoes -->

---

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Primaria | `#` | Titulos, cabecalhos, CTAs principais |
| Secundaria | `#` | Destaques, bordas, badges |
| Fundo | `#` | Background de paginas e slides |
| Texto | `#` | Corpo de texto |
| Texto suave | `#` | Legendas, notas, placeholders |
| Sucesso | `#` | Feedback positivo, acertos |
| Alerta | `#` | Atencao, dicas importantes |
| Erro | `#` | Feedback negativo, erros |

### Gradientes (opcional)

```css
linear-gradient(135deg, #____ 0%, #____ 100%)
```

---

## Tipografia

### Fonte principal

- **Familia:** <!-- ex: Bricolage Grotesque -->
- **Arquivo TTF:** `assets/fonts/`
- **Fallback:** <!-- ex: Arial, sans-serif -->
- **Google Fonts:** <!-- URL opcional -->

### Fonte de destaque / titulos

- **Familia:** <!-- ex: Bricolage Grotesque -->
- **Peso:** <!-- ex: 700 Bold -->

### Escala tipografica

| Elemento | Tamanho | Peso | Cor |
|----------|---------|------|-----|
| H1 - Titulo principal | `px` / `pt` | | |
| H2 - Secao | `px` / `pt` | | |
| H3 - Subsecao | `px` / `pt` | | |
| Corpo | `px` / `pt` | | |
| Legenda / nota | `px` / `pt` | | |

---

## Layout

- **Unidade base:** <!-- ex: 8px -->
- **Margem de pagina (PDF A4):** <!-- ex: 22mm topo/base, 24mm laterais -->
- **Espacamento entre secoes:** <!-- ex: 32px -->
- **Border radius:** <!-- ex: 8px suave, 4px botoes -->

---

## Logo

- **Arquivo principal:** `assets/branding/logo.svg` (ou `.png`)
- **Versao clara:** `assets/branding/logo-white.svg`
- **Versao escura:** `assets/branding/logo-dark.svg`
- **Tamanho minimo:** <!-- ex: 120px de largura -->
- **Area de respiro:** <!-- ex: 16px em todos os lados -->

---

## Iconografia E Imagens

- **Biblioteca de icones:** <!-- ex: Phosphor Icons -->
- **Estilo de imagens:** <!-- ex: fotografia real, ilustracao vetorial -->
- **Arquivos de icones:** `assets/icons/`
- **Arquivos de marca locais:** `assets/branding/`
- **Imagens compartilhadas:** `assets/images/`

---

## Regras De Aplicacao

### Sempre fazer

- Usar a paleta definida acima
- Manter hierarquia tipografica consistente
- Preservar a area de respiro do logo

### Nunca fazer

- Distorcer ou recolorir o logo
- Usar fontes fora da escala definida
- Usar cores fora da paleta sem justificativa

---

## Uso Em PDFs

Ao gerar PDFs, busque fontes em:

1. `assets/fonts/`
2. `C:/Windows/Fonts/`

Cores: use os valores hex definidos na tabela.
