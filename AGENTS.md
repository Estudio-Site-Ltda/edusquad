# EduSquad — Agent Instructions

Framework de orquestração multi-agente para criação de recursos educacionais.

---

## Inicialização — LEIA PRIMEIRO

Toda vez que o usuário invocar `/edusquad` ou qualquer comando EduSquad:

1. Se `_edusquad/_memory/institution.md`, `learner-profile.md` ou `preferences.md` não existir, copie o respectivo arquivo `.example.md` para o nome sem `.example`
2. Leia `_edusquad/_memory/institution.md`
3. Verifique se ainda contém a string `ex:` ou se o campo `**Nome:**` está vazio/template
4. **Se sim (primeiro uso):** leia `_edusquad/core/prompts/onboarding.prompt.md` e execute o onboarding interativo **antes de qualquer outra coisa**
5. **Se não (já configurado):** carregue o contexto e exiba o menu principal normalmente

---

## Comandos disponíveis

| Comando | Ação |
|---------|------|
| `/edusquad` | Menu principal |
| `/edusquad criar` | Criar novo squad educacional |
| `/edusquad rodar <nome>` | Executar um squad |
| `/edusquad listar` | Listar todos os squads |
| `/edusquad skills` | Gerenciar skills instaladas |
| `/edusquad configurar` | Reconfigurar o ambiente |
| `/edusquad ajuda` | Ver todos os comandos |

---

## Arquivos core

| Arquivo | Função |
|---------|--------|
| `_edusquad/core/architect.agent.yaml` | Agente Pedagogo (arquiteto) |
| `_edusquad/core/runner.pipeline.md` | Orquestrador de execução |
| `_edusquad/core/skills.engine.md` | Motor de skills |
| `_edusquad/core/best-practices/` | Biblioteca pedagógica (Bloom, ADDIE…) |
| `_edusquad/core/prompts/onboarding.prompt.md` | Onboarding interativo |

---

## Memória persistente

Carregue estes arquivos no início de cada sessão EduSquad:

| Arquivo | Conteúdo |
|---------|----------|
| `_edusquad/_memory/institution.md` | Dados da instituição/empresa |
| `_edusquad/_memory/learner-profile.md` | Perfil do aprendiz típico |
| `_edusquad/_memory/preferences.md` | Preferências do usuário |
| `_edusquad/_memory/design-system.md` | Design system carregado via interface web — opcional |
| [`DESIGN.md`](../DESIGN.md) | **Manual da marca local** — fonte de verdade de cores, fontes, logo e regras visuais. Leia antes de gerar qualquer material com identidade visual. |

Esses arquivos podem ser editados manualmente a qualquer momento e não são versionados. Se `DESIGN.md` ainda não existir, copie `DESIGN.example.md` antes de registrar a identidade visual.

---

## Estrutura de diretórios

```
edusquad/
├── _edusquad/               # Core do framework (não editar manualmente)
│   ├── _memory/             # Memória persistente
│   ├── _browser_profile/    # Sessões de browser (privado, não versionado)
│   └── core/                # Agentes, runner, skills engine, prompts
│
├── assets/                  # Recursos reutilizáveis entre squads
│   ├── branding/            # Logo, paleta, identidade visual
│   ├── images/              # Fotos e ilustrações
│   ├── icons/               # Ícones SVG/PNG
│   ├── fonts/               # Fontes TTF/OTF (uso offline no reportlab e PDF)
│   ├── audio/               # Narração, trilhas sonoras
│   ├── videos/              # Vídeos de referência ou b-roll
│   └── templates/           # Templates HTML, PPTX base
│
├── skills/                  # Skills instaladas
├── squads/                  # Squads criados pelo usuário
│   └── {nome}/
│       ├── squad.yaml
│       └── output/{run_id}/ # Outputs versionados por data/hora
│
└── web/                     # Interface web local (npm run web → localhost:3000)
```

---

## Como funciona

1. No **primeiro uso** o onboarding configura o ambiente via `institution.md`, `learner-profile.md` e `preferences.md`
2. O agente **Pedagogo** (`architect.agent.yaml`) cria e configura squads
3. O **Pipeline Runner** executa os squads passo a passo
4. Agentes comunicam-se via persona switching (inline) ou subagentes (background)
5. Checkpoints pausam a execução para revisão e aprovação humana

---

## Assets

A pasta `assets/` é o repositório central de recursos reutilizáveis entre squads.

- **`fonts/`** — fontes colocadas aqui são detectadas automaticamente pela skill `pdf-export` (prioridade sobre fontes do sistema)
- **`branding/`** — coloque logo e guias visuais para uso consistente nos materiais
- Branding, imagens, áudio, vídeos e templates adicionados pela instituição **não sobem para o git** (regra no `.gitignore`)
- Fontes e ícones distribuídos com o framework **são versionados**

---

## Sessões de browser

O EduSquad usa um perfil persistente do Playwright para sessões em plataformas externas.

- Sessões salvas em `_edusquad/_browser_profile/` (privado, não versionado)
- Primeiro acesso a uma plataforma requer login manual
- Execuções subsequentes reutilizam a sessão salva
