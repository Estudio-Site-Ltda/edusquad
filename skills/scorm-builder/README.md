# Skill: SCORM Builder — Exemplos de Uso

Gera módulos de slides educacionais interativos em HTML e os empacota como **SCORM 1.2 autocontido**. O roteiro operacional completo está em [PROMPT.md](PROMPT.md); a visão geral e o briefing, em [SKILL.md](SKILL.md).

---

## Exemplo 1 — Um capítulo de apostila → SCORM

```
@scorm-builder

INPUT: squads/fundamentos-administracao-pequenos-negocios/output/2026-06-01-apostila/capitulo-01/capitulo-01.md
MODULO: capitulo-01
OBJETIVOS: (use os objetivos do capítulo na apostila)
AVALIACAO: knowledge check formativo no slide final, sem score
NOME_PROJETO: fundamentos-administracao-pequenos-negocios
ESTILO_VISUAL: ilustração editorial flat, acolhedora
CATEGORIA_IMAGENS: fundamentos-administracao-pequenos-negocios

Crie o módulo de slides sobre o template de slides, gere as imagens com
criar-imagem-leonardo (salvando em assets/images e copiando para a build),
injete o runtime SCORM 1.2 e empacote. Valide mobile-first via HTTP + playwright-cli
e teste o .zip num player SCORM 1.2 antes de entregar.
```

**O que será gerado** (em `squads/<nome-do-projeto>/output/<run_id>/`):
- `slides-capitulo-01/` — build fonte (slide.html + fonts/ + images/)
- `scorm-capitulo-01/` — SCO empacotado (index.html + imsmanifest.xml + assets)
- `capitulo-01-scorm-1.2.zip` — pacote final para o LMS
- Imagens canônicas em `assets/images/<categoria>/` (biblioteca reutilizável)

---

## Exemplo 2 — Módulo com avaliação pontuada

```
@scorm-builder

INPUT: material/seguranca-do-trabalho/nr-12.md
MODULO: nr-12-fundamentos
OBJETIVOS: ao final, o aluno identifica riscos e aplica os dispositivos de segurança da NR-12
AVALIACAO: quiz de 5 questões com score reportado (score.raw)
NOME_PROJETO: seguranca-do-trabalho
```

Afirmações normativas (NR-12) são **verificadas e citadas**. O SCO reporta `cmi.core.score.raw` ao LMS.

---

## Exemplo 3 — Reusar imagens da biblioteca

```
@scorm-builder

INPUT: ...
MODULO: ...
NOME_PROJETO: ...
Reaproveite imagens já existentes em assets/images/<categoria>/ quando servirem;
só gere novas (Leonardo) para o que faltar.
```

A biblioteca em `assets/images/` existe justamente para evitar regerar imagens (e gastar créditos) entre módulos e squads.

---

## Notas

- **Pacote autocontido:** zero CDN/API em runtime — todo CSS, JS, fonte e imagem locais por caminho relativo.
- **`file://` bloqueado** no ambiente: a validação no playwright-cli exige servir por HTTP local (ver Fase 7 do PROMPT.md).
- **Empacotamento:** referência em `tools/package-fundamentos-admin-scorm.js` (gera `imsmanifest.xml` SCORM 1.2).
- **Imagens consomem créditos** da Leonardo.Ai (`LEONARDO_API_KEY` no `.env`).
