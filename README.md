# EduSquad

**Framework de orquestração multi-agente para criação de recursos educacionais.**

Crie equipes virtuais (squads) de agentes de IA que colaboram para produzir materiais educacionais de alta qualidade — desde o planejamento pedagógico até a entrega em múltiplos formatos.

---

## Instalação

```bash
npx edusquad init
```

O comando acima clona o framework no diretório atual, instala as dependências e inicia o onboarding interativo de configuração.

### Atualizar para a versão mais recente

```bash
npx edusquad update
```

Atualiza os arquivos core do framework (`_edusquad/`) preservando seus squads, skills e configurações locais.

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

O EduSquad funciona em qualquer IDE que suporte agentes de IA com MCP:

| IDE | Como usar |
|-----|-----------|
| **Claude Code** | `claude` no terminal — recomendado |
| **Cursor** | Abra a pasta do projeto no Cursor |
| **VS Code + Copilot** | Instale a extensão GitHub Copilot |
| **Windsurf** | Abra a pasta do projeto |

### Opcionais (por skill)

Instale apenas o que for usar:

| Ferramenta | Para quê | Instalação |
|------------|----------|------------|
| **FFmpeg** | Montagem de vídeos | [ffmpeg.org](https://ffmpeg.org) |
| **Python 3.10+** | Skills com runtime Python | [python.org](https://python.org) |

### Variáveis de ambiente (por integração)

Crie um arquivo `.env` na raiz do projeto com as chaves que precisar:

```bash
# Canva (design de apresentações)
CANVA_API_KEY=

# Geração de narração em voz IA
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

> Você não precisa preencher todas — apenas as das integrações que for usar.

---

## Início Rápido

Após instalar, abra a pasta do projeto no seu IDE e execute:

```
/edusquad
```

Na primeira vez, o onboarding interativo será iniciado automaticamente para configurar o framework com os dados da sua instituição.

### Comandos principais

```
/edusquad criar          — Criar um novo squad educacional
/edusquad rodar <nome>   — Executar um squad
/edusquad listar         — Ver todos os squads
/edusquad skills         — Gerenciar skills instaladas
/edusquad configurar     — Reconfigurar o ambiente
/edusquad ajuda          — Ver todos os comandos
```

---

## Formatos de Conteúdo Suportados

| Formato | Descrição |
|---------|-----------|
| Roteiro de Vídeo | Script com cenas, narração e notas de produção |
| Apresentação | Slides com notas do apresentador e design guide |
| SCORM | Módulo e-learning para LMS (Moodle, Hotmart, etc.) |
| PDF Educacional | Material com teoria, exemplos e exercícios |
| Apostila | Material didático completo com referências |
| Plano de Aula | Objetivo, metodologia, recursos e avaliação |
| Quiz / Avaliação | Questões objetivas, dissertativas ou mistas |
| Mapa Mental | Estrutura visual hierárquica dos conceitos |
| Fluxograma | Diagrama de processos ou jornada de aprendizagem |
| Trilha de Aprendizagem | Sequência de módulos com progressão |

---

## Estrutura do Projeto

```
edusquad/
├── _edusquad/                  # Core do framework (não editar manualmente)
│   ├── _memory/                # Configurações (preenchidas pelo onboarding)
│   ├── config/                 # Configuração do Playwright
│   └── core/
│       ├── architect.agent.yaml    # Agente Pedagogo (criação de squads)
│       ├── runner.pipeline.md      # Orquestrador de execução
│       ├── skills.engine.md        # Motor de skills
│       ├── prompts/                # Prompts especializados
│       └── best-practices/         # Biblioteca pedagógica (10+ arquivos)
│
├── skills/                     # Skills instaladas
│   ├── bloom/                  # Taxonomia de Bloom
│   ├── instructional-design/   # Modelo ADDIE
│   ├── video-script/           # Roteiros educacionais
│   └── edusquad-skill-creator/ # Criar novas skills
│
├── squads/                     # Seus squads ficam aqui
├── .env                        # Suas chaves de API (não versionado)
└── .mcp.json                   # Configuração MCP
```

---

## Skills Incluídas

| Skill | Tipo | Descrição |
|-------|------|-----------|
| `bloom` | prompt | Taxonomia de Bloom — objetivos de aprendizagem por nível cognitivo |
| `instructional-design` | prompt | Modelo ADDIE + princípios de Mayer |
| `video-script` | prompt | Estruturação de roteiros pedagógicos |
| `edusquad-skill-creator` | prompt | Criação de novas skills personalizadas |

---

## Licença

MIT — livre para uso pessoal e comercial.

---

## Contribuindo

Pull requests são bem-vindos! Veja as [issues abertas](https://github.com/Estudio-Site-Ltda/edusquad/issues) para ideias de contribuição.
