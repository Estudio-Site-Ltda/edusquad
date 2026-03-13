# EduSquad

**Framework de orquestração multi-agente para criação de recursos educacionais.**

Crie equipes virtuais (squads) de agentes de IA que colaboram para produzir materiais educacionais de alta qualidade — desde o planejamento pedagógico até a entrega em múltiplos formatos.

---

## Instalação

```bash
npx edusquad init
```

Clona o framework no diretório atual, instala as dependências e inicia o onboarding interativo de configuração.

### Atualizar para a versão mais recente

```bash
npx edusquad update
```

Atualiza os arquivos core do framework preservando seus squads, skills e configurações locais.

---

## Pré-requisitos

### Obrigatórios

| Requisito | Versão mínima | Instalação |
|-----------|--------------|------------|
| **Node.js** | 18.x ou superior | [nodejs.org](https://nodejs.org) |
| **Git** | qualquer versão recente | [git-scm.com](https://git-scm.com) |
| **Google Chrome** | qualquer versão atual | [google.com/chrome](https://google.com/chrome) |
| **IDE compatível** | — | ver lista abaixo |

### IDE compatível (escolha uma)

| IDE | Como usar |
|-----|-----------|
| **Claude Code** | `claude` no terminal — recomendado |
| **Cursor** | Abra a pasta do projeto |
| **VS Code + Copilot** | Instale a extensão GitHub Copilot |
| **Windsurf** | Abra a pasta do projeto |

### Opcionais (por skill)

| Ferramenta | Para quê |
|------------|----------|
| **FFmpeg** | Montagem e exportação de vídeos |
| **Python 3.10+** | Skills com runtime Python |

### Variáveis de ambiente

Crie um `.env` na raiz com as chaves das integrações que for usar:

```bash
# Design
CANVA_API_KEY=

# Narração em voz IA
ELEVENLABS_API_KEY=

# Avatar em vídeo
HEYGEN_API_KEY=

# Moodle LMS
MOODLE_URL=
MOODLE_TOKEN=

# LMS Estúdio
LMS_ESTUDIO_URL=
LMS_ESTUDIO_API_KEY=

# Hotmart
HOTMART_CLIENT_ID=
HOTMART_CLIENT_SECRET=

# Upload de imagens
IMGBB_API_KEY=
```

---

## Início Rápido

Abra a pasta do projeto no seu IDE e execute:

```
/edusquad
```

Na primeira vez, o onboarding interativo configura o framework com os dados da sua instituição. Nas próximas vezes, exibe o menu principal.

### Comandos principais

```
/edusquad               — Menu principal
/edusquad criar         — Criar um novo squad educacional
/edusquad rodar <nome>  — Executar um squad
/edusquad listar        — Ver todos os squads
/edusquad skills        — Gerenciar skills instaladas
/edusquad configurar    — Reconfigurar o ambiente
/edusquad ajuda         — Ver todos os comandos
```

---

## Skills Incluídas

### Pedagógicas

| Skill | Descrição |
|-------|-----------|
| `bloom` | Taxonomia de Bloom — objetivos de aprendizagem por nível cognitivo |
| `instructional-design` | Modelo ADDIE + princípios de Mayer |
| `video-script` | Estruturação de roteiros pedagógicos com cenas e narração |
| `edusquad-skill-creator` | Criação de novas skills personalizadas |

### Formatos Visuais (HTML standalone)

| Skill | Output | Descrição |
|-------|--------|-----------|
| `flowchart-creator` | `fluxograma.html` | Fluxograma interativo estilo quadro-negro com revelação progressiva |
| `mind-map-creator` | `mapa-mental.html` | Mapa mental dark mode com glassmorphism, tooltips e drag/zoom |

### Avaliação

| Skill | Outputs | Descrição |
|-------|---------|-----------|
| `quiz-builder` | `quiz.json` `quiz.html` `quiz-h5p.json` `quiz-moodle.csv` `quiz-lms-estudio.csv` | Avaliações com múltipla escolha, V/F, lacuna, correspondência e ordenação. Exportação direta para Moodle e LMS Estúdio |

### E-Learning (LMS)

| Skill | Output | Descrição |
|-------|--------|-----------|
| `scorm-builder` | `scorm/course.zip` | Pacote SCORM 1.2 completo com player HTML, rastreamento e quiz. Upload direto em Moodle, Hotmart, Teachable |

### Design (MCP)

| Skill | Integração | Descrição |
|-------|-----------|-----------|
| `canva` | Canva MCP | Apresentações, infográficos, capas de curso e materiais visuais |
| `gamma` | Gamma MCP | Apresentações, documentos e páginas web gerados por IA |

---

## Formatos de Conteúdo Suportados

| Formato | Skill(s) |
|---------|---------|
| Roteiro de Vídeo | `video-script` |
| Apresentação / Slides | `canva`, `gamma` |
| SCORM (e-learning LMS) | `scorm-builder` |
| Quiz / Avaliação | `quiz-builder` |
| Mapa Mental interativo | `mind-map-creator` |
| Fluxograma interativo | `flowchart-creator` |
| Design educacional | `canva` |
| Planejamento instrucional | `bloom`, `instructional-design` |

---

## Estrutura do Projeto

```
edusquad/
├── _edusquad/                   # Core do framework (não editar manualmente)
│   ├── _memory/                 # Configurações preenchidas pelo onboarding
│   │   ├── institution.md
│   │   ├── learner-profile.md
│   │   └── preferences.md
│   ├── config/
│   └── core/
│       ├── architect.agent.yaml     # Agente Pedagogo
│       ├── runner.pipeline.md       # Orquestrador de execução
│       ├── skills.engine.md         # Motor de skills
│       ├── prompts/
│       └── best-practices/          # Biblioteca pedagógica (Bloom, ADDIE, etc.)
│
├── skills/                      # Skills instaladas
│   ├── bloom/
│   ├── instructional-design/
│   ├── video-script/
│   ├── flowchart-creator/
│   ├── mind-map-creator/
│   ├── quiz-builder/
│   ├── scorm-builder/
│   ├── canva/
│   ├── gamma/
│   └── edusquad-skill-creator/
│
├── squads/                      # Seus squads ficam aqui
│   └── {nome}/
│       ├── squad.yaml
│       └── output/
│           └── {run_id}/        # Versionado por data/hora
│
├── bin/                         # CLI (npx edusquad)
├── .env                         # Suas chaves de API (não versionado)
└── .mcp.json                    # Configuração MCP
```

---

## Licença

MIT — livre para uso pessoal e comercial.

---

## Contribuindo

Pull requests são bem-vindos. Veja as [issues abertas](https://github.com/Estudio-Site-Ltda/edusquad/issues) para ideias de contribuição.
