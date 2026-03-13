# EduSquad — Instruções do Projeto

Este projeto usa o **EduSquad**, um framework de orquestração multi-agente para criação de recursos educacionais.

## ⚡ Inicialização — LEIA PRIMEIRO

**Toda vez que o usuário invocar `/edusquad` ou qualquer comando EduSquad:**

1. Leia `_edusquad/_memory/institution.md`
2. Verifique se o arquivo ainda contém a string `(ex:` ou se o campo `**Nome:**` ainda está vazio/template
3. **Se sim (primeiro uso):** leia `_edusquad/core/prompts/onboarding.prompt.md` e execute o onboarding interativo ANTES de qualquer outra coisa
4. **Se não (já configurado):** carregue o contexto e exiba o menu principal normalmente

> Esta verificação garante que novos usuários sejam guiados na configuração inicial automaticamente, sem precisar editar arquivos manualmente.

## Início Rápido (após configuração)

- `/edusquad` — Menu principal
- `/edusquad criar` — Criar um novo squad educacional
- `/edusquad rodar <nome>` — Executar um squad
- `/edusquad skills` — Gerenciar skills instaladas
- `/edusquad ajuda` — Ver todos os comandos

## Estrutura de Diretórios

- `_edusquad/` — Core do framework (não modificar manualmente)
- `_edusquad/_memory/` — Memória persistente (preenchida pelo onboarding)
- `_edusquad/core/` — Agentes, runner, skills engine e best practices
- `squads/` — Squads criados pelo usuário
- `squads/{nome}/output/` — Conteúdos gerados
- `skills/` — Skills instaladas

## Como Funciona

1. No **primeiro uso**, o onboarding configura automaticamente o ambiente
2. O agente **Pedagogo** cria e configura squads educacionais
3. O **Pipeline Runner** executa os squads passo a passo
4. Agentes se comunicam via persona switching (inline) ou subagentes (background)
5. Checkpoints pausam a execução para revisão e aprovação humana

## Arquivos de Memória

| Arquivo | Conteúdo | Preenchido por |
|---------|----------|---------------|
| `institution.md` | Dados da instituição/empresa | Onboarding |
| `learner-profile.md` | Perfil do aprendiz típico | Onboarding |
| `preferences.md` | Preferências do usuário | Onboarding |

Esses arquivos podem ser editados manualmente a qualquer momento para atualizar as configurações.

## Sessões de Browser

O EduSquad usa um perfil persistente do Playwright para sessões em plataformas externas.
- Sessões salvas em `_edusquad/_browser_profile/` (privado, não versionado)
- Primeiro acesso a uma plataforma requer login manual
- Execuções subsequentes reutilizam a sessão salva
