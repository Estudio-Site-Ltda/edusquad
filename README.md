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

### Interface Web (opcional)

```bash
npx edusquad web
```

Abre uma interface visual no browser (`localhost:3000`) para usuários que preferem não usar o terminal. Veja a seção [Interface Web](#interface-web) para mais detalhes.

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

## Interface Web

Uma interface visual local para usar o EduSquad sem precisar do terminal — ideal para usuários não-técnicos.

### Como iniciar

```bash
npx edusquad web
# ou, dentro do projeto:
npm run web
```

O servidor inicia em `http://localhost:3000` e abre o browser automaticamente. Se a porta 3000 estiver em uso, tenta automaticamente as próximas disponíveis (3001, 3002…).

### Layout

```
┌──────────────────────────────────────────┬─────────────┐
│           Squad em execução              │             │
│  Avatares ilustrados dos agentes,        │  Projetos   │
│  animações, barra de progresso           │  criados    │
├──────────────────────────────────────────│  e outputs  │
│  [menu] [criar squad] [listar] [rodar…]  │  gerados    │
│  Terminal com cores ANSI (Claude Code)   │             │
└──────────────────────────────────────────┴─────────────┘
```

| Área | Função |
|------|--------|
| **Centro** | Visualização dos agentes com avatares ilustrados por função, animações em tempo real, barra de progresso e label do step atual. |
| **Terminal (inferior)** | Terminal completo embutido no browser com suporte a cores ANSI. Inclui botões de comando rápido clicáveis. |
| **Sidebar (direita)** | Histórico de todos os projetos e execuções, com arquivos gerados visualizáveis com um clique. Textura de papel de caderno. |

### Avatares dos agentes

Cada agente recebe um avatar SVG ilustrado automaticamente com base no seu papel:

| Tipo detectado | Palavras-chave no ID | Visual |
|----------------|---------------------|--------|
| Professor | `pedagog`, `teacher`, `professor` | Mortarboard, óculos, gravata |
| Roteirista | `roteirist`, `writer`, `redator` | Boina, lápis |
| Revisor | `revisor`, `review`, `editor` | Óculos redondos, lupa |
| Designer | `design`, `visual`, `artis` | Cabelo colorido, paleta |
| Pesquisador | `pesquis`, `research`, `analista` | Óculos de arame, livros |
| Genérico | qualquer outro | Avatar neutro com acentos teal |

### Comandos rápidos

A interface inclui botões clicáveis acima do terminal com os principais comandos EduSquad:

| Botão | Ação |
|-------|------|
| `menu` | Envia `/edusquad` |
| `criar squad` | Envia `/edusquad criar` |
| `listar squads` | Envia `/edusquad listar` |
| `rodar squad…` | Preenche `/edusquad rodar ` no input para completar com o nome |
| `skills` | Envia `/edusquad skills` |
| `ajuda` | Envia `/edusquad ajuda` |

### Animações

- **Agente ativo** — anel giratório âmbar + pulse no card
- **Handoff** — flash verde no receptor + toast flutuante com `de → para`
- **Concluído** — anel verde permanente no avatar

### Pré-requisitos adicionais

A interface web usa `node-pty` para comunicação com o Claude Code. Na maioria dos sistemas o pacote já vem com binários pré-compilados. Se encontrar erro de compilação no Windows, instale as ferramentas de build:

```bash
npm install --global windows-build-tools
```

### Modos de uso

O terminal e a interface web são **independentes e intercambiáveis**. Você pode:
- Usar apenas o terminal (comportamento original, nada muda)
- Usar apenas a interface web
- Alternar entre os dois a qualquer momento

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

### Comandos CLI (terminal)

```bash
npx edusquad init    # Instalar o framework
npx edusquad update  # Atualizar o framework
npx edusquad web     # Abrir a interface web
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
├── web/                         # Interface web local
│   ├── server.js                # Servidor HTTP + WebSocket + PTY
│   ├── public/                  # Frontend (HTML, CSS, JS)
│   └── node_modules/            # Dependências da interface web
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
