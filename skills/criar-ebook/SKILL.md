---
name: criar-ebook
description: Gera ebooks curtos, persuasivos e visualmente impecáveis em HTML A4 paginado, prontos para exportar em PDF. Atua como copywriter de resposta direta, designer editorial e engenheiro front-end. Cobre estratégia (big idea, promessa e mecanismo único), copy de conversão, sistema de design A4, geração de imagens e montagem do HTML final. Segue a identidade visual do DESIGN.md, reaproveita o scaffold A4 da apostila e gera imagens pela skill criar-imagem-leonardo. Use para iscas digitais, ebooks de captação, materiais de autoridade e ebooks de venda direta.
type: prompt
version: 1.0.0
categories: [conteudo, ebook, copywriting, pdf, design]
---

# Skill: Criar Ebook

> **Regra mestra:** o ebook inteiro converge para **uma única promessa** e **um único CTA**. Profundidade em uma coisa vence amplitude rasa em dez. O resultado final deve parecer publicado por uma editora — copy de conversão impecável e diagramação A4 *print-ready*.

O roteiro operacional completo, fase a fase, está em **[PROMPT.md](PROMPT.md)**. Leia-o e siga-o na íntegra. Este arquivo descreve quando usar a skill, o que coletar antes de começar e os pré-requisitos do projeto.

---

## 1. Quando usar

- Iscas digitais (lead magnets) que entregam valor real e geram desejo pelo próximo passo.
- Ebooks de **autoridade** que demonstram expertise e um framework proprietário.
- Ebooks de **venda direta** com oferta, garantia e CTA reforçado.
- Qualquer material curto que precise ser persuasivo *e* visualmente premium em A4/PDF.

Para apostilas longas (100–150 páginas, didáticas, com atividades e pós-textuais), use a skill `criar-apostila`.

## 2. Pré-requisitos do projeto

1. **Identidade visual — `DESIGN.md` (prioridade absoluta).** Leia `DESIGN.md` na raiz antes de qualquer CSS; extraia paleta, tipografia, iconografia e tom de voz. Se faltar ou tiver campos vazios, use o fallback documentado na Fase 3.0 do PROMPT.md.
2. **Scaffold A4.** Reaproveite *apenas a estrutura de páginas* de `assets/templates/apostila/apostila-template.html` (`@page`, `.page`, header/footer, `@media print`, script de validação de overflow) — não os componentes específicos de apostila. O ebook tem biblioteca de elementos própria.
3. **Imagens.** Gere todas as imagens pela skill `criar-imagem-leonardo` (`node skills/criar-imagem-leonardo/scripts/generate-image.js`). Requer `LEONARDO_API_KEY` no `.env` e consome créditos — avise antes de gerar.

## 3. Briefing (colete antes de começar)

Se faltar qualquer dado essencial, **pergunte antes de assumir**.

| Variável | O que é | Default |
|---|---|---|
| `OBJETIVO_PRINCIPAL` | `isca_digital`, `autoridade` ou `venda_direta` (calibra intensidade e CTA) | — (perguntar) |
| `PROMESSA_PRINCIPAL` | A promessa única do ebook; se vier "PROPOR", gere 3 opções e siga a mais forte | — (perguntar) |
| `LIMITE_PAGINAS` | Teto de páginas A4 | ~24 |
| `ESTILO_VISUAL` | Direção do *style anchor* das imagens | derivar do DESIGN.md |
| `EMBUTIR_BASE64` | Embutir imagens no HTML (`sim`) ou referenciar arquivos (`não`) | não |

Cores e fontes **não** são variáveis de briefing: vêm do `DESIGN.md` (com fallback).

## 4. Fluxo (resumo — detalhe no PROMPT.md)

1. **Estratégia** — big idea, promessa, mecanismo único, jornada e mapa de páginas (Fase 1).
2. **Copy** — uma ideia por página, títulos magnéticos, sem prova social fabricada (Fase 2).
3. **Identidade visual** — ler `DESIGN.md` ou preparar fallback; definir tokens (Fase 3.0).
4. **Imagens** — style anchor + prompts; gerar com `criar-imagem-leonardo` (Fase 4).
5. **Montagem** — HTML A4 reaproveitando o scaffold da apostila, em `squads/<nome-do-projeto>/output/<run_id>/` (Fase 3 + 5).
6. **Validação e entrega** — servir por HTTP local, conferir overflow via playwright-cli (0 páginas), rodar o checklist, exportar PDF.

## 5. Entrega

O output fica em `squads/<nome-do-projeto>/output/<run_id>/` (run_id por data, ex. `2026-06-01`):

```
squads/<nome-do-projeto>/output/<run_id>/
  ebook.html
  images/        ← cópia das imagens usadas
  README.md      ← instruções de exportar PDF
```

As imagens geradas têm **versão canônica em `assets/images/<categoria>/`** (reutilizável); o deliverable carrega uma **cópia** em `images/`. Nunca mova as imagens para fora de `assets/images/` — sempre copie.

**Validação no navegador:** o `file://` é bloqueado no ambiente (MCP e playwright-cli). Sirva a pasta por HTTP local (`python -m http.server`) e valide com `playwright-cli` — o console deve acusar **0 páginas em overflow**. Detalhes e BUG conhecido na Fase 5 do PROMPT.md.

## 6. Regras inegociáveis

- **Foco único:** uma promessa, um CTA. Página que não empurra para o objetivo é cortada.
- **Honestidade:** zero prova social, número, depoimento ou case inventado. Use exemplos claramente rotulados como hipotéticos ou argumente por lógica.
- **Nada estoura a folha A4:** se uma página exceder, divida o conteúdo — nunca reduza fonte ou padding.
