# Skill: Criar Ebook — Exemplos de Uso

Gera ebooks curtos, persuasivos e visualmente impecáveis em HTML A4 paginado, prontos para exportar em PDF. O roteiro operacional completo está em [PROMPT.md](PROMPT.md); a visão geral e o briefing, em [SKILL.md](SKILL.md).

---

## Exemplo 1 — Isca digital (lead magnet)

```
/goal @skills/criar-ebook em passo único para:

OBJETIVO_PRINCIPAL: isca_digital
PROMESSA_PRINCIPAL: Sair do zero e publicar o primeiro anúncio que vende em 7 dias
LIMITE_PAGINAS: 20
ESTILO_VISUAL: ilustração editorial flat, moderna e acolhedora
EMBUTIR_BASE64: não

Defina a estratégia, escreva a copy página a página, gere as imagens com a skill
criar-imagem-leonardo e monte o HTML reaproveitando o scaffold A4 da apostila.
Valide o overflow servindo por HTTP local + playwright-cli antes de exportar o PDF.
```

**O que será gerado** (em `squads/<nome-do-projeto>/output/<run_id>/`):
- `ebook.html` (capa full-bleed + promessa + núcleo + mecanismo único + quick wins + ponte + CTA + sobre o autor + contracapa)
- `images/` — cópia das imagens usadas (canônicas em `assets/images/<categoria>/`, geradas via `criar-imagem-leonardo`)
- `README.md` curto com instruções de exportar PDF

---

## Exemplo 2 — Ebook de autoridade

```
@skills/criar-ebook

OBJETIVO_PRINCIPAL: autoridade
PROMESSA_PRINCIPAL: PROPOR
LIMITE_PAGINAS: 24
ESTILO_VISUAL: fotografia editorial corporativa, luz natural
EMBUTIR_BASE64: sim
```

Como `PROMESSA_PRINCIPAL` veio como `PROPOR`, a skill gera 3 opções de promessa e segue a mais forte. Vende pouco, prova muito: insight denso + framework proprietário nomeado. CTA suave ("conheça / fale comigo").

---

## Exemplo 3 — Ebook de venda direta

```
@skills/criar-ebook

OBJETIVO_PRINCIPAL: venda_direta
PROMESSA_PRINCIPAL: Dobrar a conversão da sua página em 30 dias com 1 ajuste por semana
LIMITE_PAGINAS: 18
ESTILO_VISUAL: derivar do DESIGN.md
EMBUTIR_BASE64: não
```

Entrega valor + pitch claro: oferta, urgência honesta, garantia, bônus e CTA reforçado 2–3x com link.

---

## Notas

- **Cores e fontes não são variáveis de briefing** — vêm do `DESIGN.md` (com fallback documentado na Fase 3.0 do PROMPT.md).
- **Imagens consomem créditos** da Leonardo.Ai (`LEONARDO_API_KEY` no `.env`). A skill avisa antes de gerar.
- Para materiais longos e didáticos (100–150 páginas, com atividades e pós-textuais), use `criar-apostila`.
