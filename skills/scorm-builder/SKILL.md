---
name: scorm-builder
description: Gera módulos de slides educacionais interativos em HTML e os empacota como SCORM 1.2 100% autocontido, prontos para subir em qualquer LMS. Cobre planejamento instrucional (objetivos, chunking, interações com propósito, knowledge check), runtime SCORM 1.2 (status, retomada, score), acessibilidade LBI/WCAG e validação mobile-first. Segue a identidade visual do DESIGN.md, reaproveita o template de slides e gera imagens pela skill criar-imagem-leonardo. Use para converter apostilas e conteúdos em cursos navegáveis no LMS Estúdio, Moodle ou outro player SCORM.
type: prompt
version: 1.0.0
categories: [scorm, slides, elearning, lms, instrucional]
---

# Skill: SCORM Builder

> **Regra mestra:** o pacote precisa rodar offline dentro de um iframe de LMS — todo CSS, JS, fontes e imagens são locais, por caminho relativo. Zero CDN, zero API em runtime. O conteúdo é fiel à apostila de origem; nada é inventado.

O roteiro operacional completo, fase a fase, está em **[PROMPT.md](PROMPT.md)**. Leia-o e siga-o na íntegra. Este arquivo descreve quando usar a skill, o que coletar antes de começar e os pré-requisitos.

---

## 1. Quando usar

- Transformar uma apostila/capítulo em um **módulo de slides interativo** navegável no LMS.
- Produzir um **pacote SCORM 1.2** com tracking (status, retomada, score) para LMS Estúdio, Moodle, etc.
- Converter conteúdo existente em e-learning acessível e responsivo.

Para apostilas longas em PDF, use `criar-apostila`. Para ebooks de captação, use `criar-ebook`.

## 2. Pré-requisitos do projeto

1. **Conteúdo de origem.** Uma apostila/capítulo/material como fonte. O conteúdo é fiel a ela — nada inventado.
2. **Identidade visual — `DESIGN.md`.** Leia antes do CSS; se faltar/estiver vazio, use o fallback do template de slides (teal/coral, Bricolage Grotesque + Plus Jakarta Sans).
3. **Template base.** Reaproveite `assets/templates/slides/slide.html` mantendo componentes, tokens e comportamento responsivo. O template é visual — o **runtime SCORM 1.2 é injetado na build** (Fase 4 do PROMPT.md).
4. **Imagens.** Geradas pela skill `criar-imagem-leonardo`; requer `LEONARDO_API_KEY` e consome créditos.

## 3. Briefing (colete antes de começar)

Se faltar dado essencial, **pergunte antes de assumir**.

| Variável | O que é | Default |
|---|---|---|
| `INPUT` | Apostila/capítulo/material de origem | — (perguntar) |
| `MODULO` | Capítulo ou tema do módulo | — (perguntar) |
| `OBJETIVOS` | Objetivos de aprendizagem (definem 10–15 slides) | — (perguntar) |
| `AVALIACAO` | Há knowledge check avaliativo com `score`? | formativo, sem score |
| `NOME_PROJETO` | Squad/projeto (define o local de saída) | — (perguntar) |
| `ESTILO_VISUAL` | Direção do *style anchor* das imagens | derivar do DESIGN.md |
| `CATEGORIA_IMAGENS` | Pasta em `assets/images/<categoria>/` | derivar do tema |

Cores e fontes **não** são briefing: vêm do `DESIGN.md` (com fallback).

## 4. Fluxo (resumo — detalhe no PROMPT.md)

1. **Planejamento instrucional** — objetivos, mapa de slides, interações (Fase 1).
2. **Variedade** — ver pacotes anteriores do squad, escolher paleta de interações/layouts e registrar em `variety-log.md` (Fase 1.5).
3. **Identidade visual** — DESIGN.md ou fallback; template de slides (Fase 2).
4. **Imagens** — style anchor + `criar-imagem-leonardo`; salvar nos dois locais (Fase 3).
5. **Slides + runtime SCORM** — montar sobre o template, injetar tracking e modal de retomada (Fases 2, 4, 5).
6. **Empacotamento** — SCORM 1.2 com `imsmanifest.xml` (Fase 6).
7. **Validação** — HTTP local + playwright-cli (mobile-first, interações, modal) e player SCORM real (Fase 7).

## 5. Entrega

Em `squads/<nome-do-projeto>/output/<run_id>/`:

```
slides-<modulo>/        ← build fonte (slide.html + fonts/ + images/)
scorm-<modulo>/         ← SCO empacotado (index.html + imsmanifest.xml + assets)
<modulo>-scorm-1.2.zip  ← pacote final para o LMS
variety-log.md          ← interações e layouts usados (antirrepetição entre pacotes)
```

**Imagens:** versão canônica em `assets/images/<categoria>/` (biblioteca reutilizável) + **cópia** em `<build>/images/`. Nunca mova as imagens para fora de `assets/images/` — sempre copie.

**Validação:** `file://` é bloqueado no ambiente; sirva por HTTP local e valide com playwright-cli (mobile-first, 0 erros de console) + teste o `.zip` num player SCORM 1.2 real.

## 6. Regras inegociáveis

- **Autocontido:** zero CDN/API em runtime; tudo por caminho relativo.
- **Fidelidade:** baseie-se na apostila; verifique e cite normas legais; não invente.
- **Acessibilidade:** teclado + foco + ARIA + contraste AA + `prefers-reduced-motion`; `alt` em toda imagem.
- **Tracking confiável:** `completed` no fim, `score` quando houver avaliação, e **retomada com modal** ao reabrir ("Continuar de onde parei" / "Recomeçar do início") — restaurando slide e estado das interações (Fase 4).
- **Toda interação funciona e dá feedback:** propósito claro + instrução + resposta visível + feedback imediato (acertou/errou **+ porquê**, anunciado por leitor de tela). Interação sem feedback ou com erro de JS é **bug**, não estilo (Fases 1.5.6 e 7.2).
- **Variedade sem fugir da fórmula:** a fórmula instrucional é fixa, mas interações e layouts variam a cada slide e a cada pacote (Fase 1.5). Nenhum tipo de interação repete >2× no módulo; ≥1 atividade de arrastar e ≥1 de gamificação; consulte o `variety-log.md` dos pacotes anteriores para não repetir.
