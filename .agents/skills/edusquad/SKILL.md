---
name: edusquad
description: Opera o framework EduSquad neste repositorio. Use quando o usuario digitar /edusquad ou $edusquad, pedir para criar, rodar, listar ou editar squads educacionais, consultar skills EduSquad, configurar o perfil ou gerar recursos educacionais por squads.
---

# EduSquad para Codex

Esta e a entrada operacional do Codex. A pasta `skills/` contem capacidades internas do framework; descubra-as quando solicitado ou ao criar ou executar um squad.

## Bootstrap

Antes de executar qualquer comando EduSquad:

1. Se faltar um arquivo local de memoria, crie-o a partir do exemplo correspondente:
   - `_edusquad/_memory/institution.example.md` para `_edusquad/_memory/institution.md`
   - `_edusquad/_memory/learner-profile.example.md` para `_edusquad/_memory/learner-profile.md`
   - `_edusquad/_memory/preferences.example.md` para `_edusquad/_memory/preferences.md`
2. Leia `_edusquad/_memory/institution.md` e `_edusquad/_memory/preferences.md`.
3. Considere o ambiente nao configurado se `institution.md` contiver `ex:` ou se `**Nome:**` estiver vazio ou for placeholder.
4. Se nao estiver configurado, ou se o comando for `configurar`, leia `_edusquad/core/prompts/onboarding.prompt.md`, execute o onboarding e retome a acao original.
5. Antes de produzir material com identidade visual, leia `DESIGN.md` se existir.

## Dispatcher

Trate os comandos abaixo mesmo quando forem enviados como texto literal:

| Entrada | Executar |
|---------|----------|
| `/edusquad`, `/edusquad menu`, `$edusquad` | Mostrar um menu curto com os comandos desta tabela. |
| `/edusquad ajuda` | Mostrar comandos e exemplos de uso. |
| `/edusquad criar [briefing]` | Ler `_edusquad/core/architect.agent.yaml` e seguir `create-squad`, aproveitando o briefing recebido. |
| `/edusquad editar <nome>` | Ler `_edusquad/core/architect.agent.yaml` e seguir `edit-squad`. |
| `/edusquad listar` | Listar `squads/*/squad.yaml`, ler cada YAML encontrado e resumir os squads. |
| `/edusquad rodar <nome>` | Ler o squad selecionado e `_edusquad/core/runner.pipeline.md`, resolver skills e executar o pipeline. |
| `/edusquad skills` | Executar a secao **Listar Skills** abaixo. |
| `/edusquad instalar ...`, `/edusquad remover ...` | Ler `_edusquad/core/skills.engine.md` e executar a operacao correspondente. |
| `/edusquad perfil` | Ler a memoria local e exibir uma sintese, sem expor segredos. |
| `/edusquad configurar` | Executar o onboarding. |

Pedidos em linguagem natural para criar, editar, rodar ou listar um squad devem ser mapeados para a acao correspondente e executados.

## Listar Skills

Para `/edusquad skills` e para selecao ou resolucao de skills:

1. Enumere `skills/*/SKILL.md` no workspace; nao use catalogo fixo.
2. Leia inicialmente apenas o frontmatter de cada skill e reporte nome, tipo, versao, descricao, variaveis de ambiente requeridas e status.
3. Uma skill esta disponivel se seu `SKILL.md` existir. Para `script`, confirme tambem que o caminho declarado do script existe. Para `mcp` ou `hybrid`, valide a configuracao MCP quando a skill for selecionada para uso.
4. Ao selecionar ou executar uma skill, leia seu corpo completo e siga suas instrucoes.

## Carregamento Minimo

- Para criar ou editar, leia o arquiteto e somente as referencias exigidas pelo fluxo.
- Para executar, leia o runner, o squad escolhido e as skills selecionadas.
- Para instalar ou remover skills, leia o skills engine.
- Para exibir menu, nao carregue todos os arquivos core ou corpos de skills.
- Use portugues do Brasil, salvo preferencia local diferente.
- Preserve os dados privados definidos em `AGENTS.md` e no `.gitignore`.
