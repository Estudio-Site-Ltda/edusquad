# EduSquad - Instrucoes do Projeto

Este repositorio contem o framework EduSquad. No Codex, a entrada operacional e a skill `.agents/skills/edusquad/SKILL.md`.

## Ativacao Obrigatoria

Quando o usuario escrever `/edusquad`, `$edusquad`, `edusquad ...`, ou pedir para criar, executar, listar ou gerenciar squads ou skills educacionais:

1. Leia `.agents/skills/edusquad/SKILL.md`.
2. Execute a acao solicitada; nao responda apenas com explicacoes genericas.
3. Se faltarem dados, siga o fluxo interativo definido na skill.

## Separacao De Skills

- `.agents/skills/edusquad/SKILL.md`: skill nativa que ativa o EduSquad no Codex.
- `skills/*/SKILL.md`: capacidades internas usadas pelos squads; devem ser descobertas e carregadas pelo EduSquad, nao pelo carregador de skills do Codex.
- `.claude/skills/` e `.agent/workflows/`: compatibilidade com outras interfaces; nao sao a fonte de comportamento do Codex.

## Arquivos Core Sob Demanda

- Criacao, edicao e listagem: `_edusquad/core/architect.agent.yaml`
- Execucao de squad: `_edusquad/core/runner.pipeline.md`
- Descoberta e gerenciamento de skills: `_edusquad/core/skills.engine.md`
- Primeiro uso ou reconfiguracao: `_edusquad/core/prompts/onboarding.prompt.md`

## Pasta `assets/`

A pasta `assets/` é compartilhada via Git e contém recursos reutilizáveis pelos squads. Consulte-a antes de gerar ou solicitar recursos externos.

| Pasta | Conteúdo | Quando usar |
|-------|----------|-------------|
| `assets/fonts/` | Bricolage Grotesque, Plus Jakarta Sans (variáveis e estáticas) | Ao especificar tipografia em templates, slides ou documentos diagramados |
| `assets/icons/` | Ícones em 6 estilos: `bold`, `duotone`, `fill`, `light`, `regular`, `thin` | **Usar sempre o estilo `duotone` por padrão.** Outros estilos apenas quando o contexto exigir explicitamente. |
| `assets/images/` | Imagens organizadas por tema (`educacao/`, `recrutamento-selecao/`) | Antes de gerar novas imagens, verifique se já existe algo adequado aqui |
| `assets/templates/slides/` | Templates base para apresentações | Ao criar slides — use como ponto de partida em vez de criar do zero |
| `assets/audio/` | Reservado para áudios futuros | Verificar antes de solicitar gravação ou síntese de voz |
| `assets/videos/` | Reservado para vídeos futuros | Verificar antes de solicitar produção de vídeo |
| `assets/branding/` | Arquivos de marca (não versionados) | Consultar junto ao `DESIGN.md` para identidade visual do cliente |

## Identidade Visual

Antes de produzir qualquer conteúdo, verifique se o arquivo `DESIGN.md` existe na raiz do projeto.

- Se existir: leia-o e aplique as diretrizes de identidade visual (cores, tipografia, tom, logos, exemplos de linguagem) em todo o material gerado.
- Se não existir: prossiga sem restrições de marca.

## Dados Locais

Nao versionar, substituir por atualizacao ou expor sem necessidade:

- `_edusquad/_memory/*.md`, exceto `*.example.md`
- `DESIGN.md`, `.env`, `.codex/`, `.playwright-cli/`
- `_edusquad/_browser_profile/`, `assets/branding/`, `squads/`

`assets/` fora de `branding/` e compartilhado pelo Git.

Mantenha este arquivo curto. Os fluxos operacionais pertencem a skill Codex e aos arquivos core.
