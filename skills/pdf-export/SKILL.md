---
name: Exportação PDF
description: Gera PDFs educacionais via Chrome headless + Node.js. Não usa Python, não usa npx, não usa puppeteer externo. Chrome é pré-requisito do EduSquad e Node.js está sempre disponível.
type: prompt
version: 2.0.0
categories: [exportacao, pdf, formatacao]
---

# Skill: Exportação PDF

## REGRAS OBRIGATÓRIAS — leia antes de qualquer coisa

- **NÃO use `npx playwright`** — lento e não confiável
- **NÃO use `npm install` para bibliotecas PDF** — pdfkit e similares geram PDFs em branco no Windows sem configuração extra
- **NÃO confie no alias do Windows Store** — se `python` retornar mensagem sobre "Microsoft Store", NÃO é Python real, continue a busca
- **Siga a cadeia de detecção abaixo** — use o primeiro método que funcionar

---

## Cadeia de Detecção de Ambiente

Execute **na ordem**. Use o primeiro que funcionar.

### Verificação 1 — Python real (não o alias do Windows)

Execute este script Node.js para encontrar o Python real no sistema:

```bash
node -e "
const { execSync } = require('child_process');
const fs = require('fs');

// Caminhos comuns — inclui Laragon e instalações padrão
const candidates = [
  'C:\\\\laragon\\\\bin\\\\python\\\\python-3.12.0-amd64\\\\python.exe',
  'C:\\\\laragon\\\\bin\\\\python\\\\python-3.11.0-amd64\\\\python.exe',
  'C:\\\\laragon\\\\bin\\\\python\\\\python-3.10.0-amd64\\\\python.exe',
  'C:\\\\Python312\\\\python.exe',
  'C:\\\\Python311\\\\python.exe',
  'C:\\\\Python310\\\\python.exe',
  process.env.LOCALAPPDATA + '\\\\Programs\\\\Python\\\\Python312\\\\python.exe',
  process.env.LOCALAPPDATA + '\\\\Programs\\\\Python\\\\Python311\\\\python.exe',
  '/usr/bin/python3',
  '/usr/local/bin/python3',
];

// Escaneia subpastas do Laragon dinamicamente
try {
  const laragonPy = 'C:\\\\laragon\\\\bin\\\\python';
  if (fs.existsSync(laragonPy)) {
    fs.readdirSync(laragonPy).forEach(d => candidates.unshift(laragonPy + '\\\\' + d + '\\\\python.exe'));
  }
} catch(e) {}

const found = candidates.find(p => { try { fs.accessSync(p); return true; } catch { return false; } });
console.log(found || 'NOT_FOUND');
"
```

Se retornar um caminho (não `NOT_FOUND`) → **use Método A** com o caminho completo encontrado.

### Verificação 2 — Chrome headless

```bash
node -e "
const fs = require('fs');
const paths = [
  'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
  'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
  (process.env.LOCALAPPDATA||'') + '\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const found = paths.find(p => { try { fs.accessSync(p); return true; } catch { return false; } });
console.log(found || 'NOT_FOUND');
"
```

Se retornar um caminho → **use Método B**.

### Verificação 3 — Playwright MCP

Sempre disponível como último recurso → **use Método C**.

---

## Método A — Python + reportlab

```bash
pip install reportlab
python gerar_pdf.py
```

### Registrar fontes no reportlab

**Prioridade de busca:**
1. `assets/fonts/` — fontes do projeto (TTF/OTF colocadas pelo usuário)
2. `C:/Windows/Fonts/` — fontes instaladas no sistema
3. Fallback: `arial.ttf`

### Registrar fontes do Windows no reportlab

Reportlab **não usa fontes do Windows automaticamente** — é obrigatório registrar os arquivos `.ttf` antes de usar.

Use este bloco no início do script para encontrar e registrar a fonte do design system:

```python
import os, glob
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

def registrar_fonte(nome_busca, nome_registro):
    """
    Busca a fonte em assets/fonts/ depois em C:/Windows/Fonts/.
    Retorna True se registrou, False se não encontrou (use fallback).
    """
    # 1. Pasta do projeto
    raiz = os.path.dirname(os.path.abspath(__file__))
    while raiz and not os.path.exists(os.path.join(raiz, 'assets')):
        raiz = os.path.dirname(raiz)
    assets_fonts = os.path.join(raiz, 'assets', 'fonts') if raiz else ''
    padrao = f"{assets_fonts}/*{nome_busca}*" if assets_fonts else ''
    arquivos = sorted(glob.glob(padrao)) if padrao else []
    # 2. Windows Fonts como fallback
    if not arquivos:
        arquivos = sorted(glob.glob(f"C:/Windows/Fonts/*{nome_busca}*"))
    if not arquivos:
        return False
    # Prefere Regular/SemiBold, evita Bold/Italic
    preferidos = [f for f in arquivos if 'Regular' in f or 'regular' in f]
    ttf_path = preferidos[0] if preferidos else arquivos[0]
    pdfmetrics.registerFont(TTFont(nome_registro, ttf_path))
    print(f"Fonte registrada: {nome_registro} → {ttf_path}")
    return True

# Exemplo de uso com Bricolage Grotesque (design system padrão):
if not registrar_fonte_windows('BricolageGrotesque', 'BricolageGrotesque'):
    if not registrar_fonte_windows('Bricolage', 'BricolageGrotesque'):
        # Fallback seguro
        pdfmetrics.registerFont(TTFont('BricolageGrotesque', 'C:/Windows/Fonts/arial.ttf'))

# Para bold:
registrar_fonte_windows('BricolageGrotesque-Bold', 'BricolageGrotesque-Bold') or \
registrar_fonte_windows('BricolageGrotesque', 'BricolageGrotesque-Bold')
```

> **Regra:** sempre chame `registrar_fonte_windows()` para **cada variante** usada (Regular, Bold, Italic).
> Se a fonte não for encontrada, use `arial.ttf` como fallback — está garantida em qualquer Windows.

Use `SimpleDocTemplate`, `Paragraph`, `Spacer`, `Table` e `HRFlowable` do reportlab.
Aplique as cores e fontes do design system via `ParagraphStyle` e `HexColor`.

---

## Método B — Node.js + Chrome headless

Crie `gerar-pdf.js` na mesma pasta do HTML:

```javascript
const { execSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

const htmlFile = process.argv[2] || 'apostila.html';
const pdfFile  = process.argv[3] || htmlFile.replace('.html', '.pdf');
const htmlPath = path.resolve(htmlFile);
const pdfPath  = path.resolve(pdfFile);

if (!fs.existsSync(htmlPath)) { console.error('HTML não encontrado:', htmlPath); process.exit(1); }

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  (process.env.LOCALAPPDATA  || '') + '\\Google\\Chrome\\Application\\chrome.exe',
  (process.env.PROGRAMFILES  || '') + '\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
];
const chromePath = chromePaths.find(p => { try { fs.accessSync(p); return true; } catch { return false; } });

if (!chromePath) { console.error('Chrome não encontrado.'); process.exit(1); }

const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
execSync(`"${chromePath}" --headless=new --disable-gpu --no-sandbox --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" --print-to-pdf-no-header "${fileUrl}"`, { stdio: 'pipe', timeout: 30000 });
console.log('PDF gerado:', pdfPath);
```

```bash
node gerar-pdf.js apostila.html apostila.pdf
```

---

## Método C — Playwright MCP (último recurso)

Use as ferramentas Playwright MCP já conectadas:

1. Navegue até o arquivo HTML:
   - Use `browser_navigate` com `file:///caminho/absoluto/apostila.html`
2. Aguarde o carregamento:
   - Use `browser_wait_for` com seletor `body`
3. Gere o PDF via CDP:
   ```javascript
   // Usar browser_evaluate com:
   const response = await fetch('about:blank'); // confirma contexto ativo
   ```
   Em seguida use `browser_evaluate` para acionar `window.print()` e instrua o usuário a salvar como PDF, **ou** use a função nativa do MCP se disponível.

---

## Processo (siga exatamente nesta ordem)

### Passo 1 — Ler o Design System

Verifique se existe `_edusquad/_memory/design-system.md`.
- **Se existir**: aplique as fontes, cores e estilos definidos nele no CSS do HTML
- **Se não existir**: use os padrões abaixo

**Padrões:**
- Fonte: `Inter`, fallback `Arial, sans-serif`
- Cor principal: `#1a1a2e` — Cor destaque: `#7c6af7` — Texto: `#2d2d2d` — Fundo: `#ffffff`

---

### Passo 2 — Gerar o arquivo HTML

Crie `apostila.html` (ou nome adequado ao conteúdo) com todo o CSS inline:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>{título}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', Arial, sans-serif;
      font-size: 11pt;
      color: #2d2d2d;
      background: #fff;
      line-height: 1.75;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 22mm 24mm 20mm;
      margin: 0 auto;
    }
    .page-break { page-break-after: always; break-after: page; }
    .no-break   { page-break-inside: avoid; break-inside: avoid; }
    h1 { font-size: 24pt; font-weight: 700; margin-bottom: 14px; color: {cor-principal}; }
    h2 { font-size: 16pt; font-weight: 600; margin: 28px 0 10px; color: {cor-principal}; border-bottom: 2px solid {cor-destaque}; padding-bottom: 6px; }
    h3 { font-size: 13pt; font-weight: 600; margin: 20px 0 8px; }
    p  { margin-bottom: 12px; text-align: justify; }
    ul, ol { margin: 0 0 12px 24px; }
    li { margin-bottom: 5px; }
    .highlight {
      background: #f5f3ff;
      border-left: 4px solid {cor-destaque};
      padding: 12px 16px;
      border-radius: 4px;
      margin: 16px 0;
    }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    th { background: {cor-principal}; color: #fff; padding: 9px 13px; text-align: left; font-size: 10pt; }
    td { padding: 8px 13px; border-bottom: 1px solid #e5e5e5; font-size: 10pt; }
    tr:nth-child(even) td { background: #f9f9f9; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- conteúdo aqui -->
  </div>
</body>
</html>
```

---

### Passo 3 — Gerar o PDF com Node.js + Chrome headless

Crie o arquivo `gerar-pdf.js` **na mesma pasta do HTML** com este conteúdo exato:

```javascript
const { execSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

const htmlFile = process.argv[2] || 'apostila.html';
const pdfFile  = process.argv[3] || htmlFile.replace('.html', '.pdf');
const htmlPath = path.resolve(htmlFile);
const pdfPath  = path.resolve(pdfFile);

if (!fs.existsSync(htmlPath)) {
  console.error('ERRO: arquivo HTML não encontrado:', htmlPath);
  process.exit(1);
}

// Localiza o Chrome instalado no Windows
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  (process.env.LOCALAPPDATA || '') + '\\Google\\Chrome\\Application\\chrome.exe',
  (process.env.PROGRAMFILES || '') + '\\Google\\Chrome\\Application\\chrome.exe',
];
const chromePath = chromePaths.find(p => fs.existsSync(p));

if (!chromePath) {
  console.error('ERRO: Google Chrome não encontrado. Instale o Chrome (pré-requisito do EduSquad).');
  process.exit(1);
}

const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
const cmd = `"${chromePath}" --headless=new --disable-gpu --no-sandbox --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" --print-to-pdf-no-header "${fileUrl}"`;

console.log('Gerando PDF...');
try {
  execSync(cmd, { stdio: 'pipe', timeout: 30000 });
  console.log('PDF gerado com sucesso:', pdfPath);
} catch (err) {
  console.error('ERRO ao gerar PDF:', err.message);
  process.exit(1);
}
```

Execute com:
```bash
node gerar-pdf.js apostila.html apostila.pdf
```

---

### Passo 4 — Verificar o resultado

Após executar, confirme:
- [ ] O comando retornou "PDF gerado com sucesso"?
- [ ] O arquivo `.pdf` existe no diretório de output?
- [ ] O tamanho do arquivo é maior que 20KB?

Se o PDF foi gerado, entregue **ambos os arquivos**:
```
output/{run_id}/
├── apostila.html      ← sempre entregue junto
├── apostila.pdf       ← gerado via Chrome headless
└── gerar-pdf.js       ← pode remover após gerar
```

---

## Diagnóstico de erros

| Erro | Solução |
|------|---------|
| Chrome não encontrado | Instale o Google Chrome — é pré-requisito do EduSquad |
| PDF em branco | Adicione `--run-all-compositor-stages-before-draw` (já incluso acima) |
| Fontes em fallback | Normal em headless — o PDF usará Arial. Se necessário, use fontes do sistema no CSS |
| Timeout | Reduza o conteúdo por página ou divida em múltiplos arquivos HTML |
| Erro de permissão | Execute o terminal como administrador |
