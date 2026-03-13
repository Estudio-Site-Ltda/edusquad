---
name: EduSquad Skill Creator
description: Cria novas skills para o EduSquad, gerando o arquivo SKILL.md completo com frontmatter YAML e instruções Markdown para injeção no contexto dos agentes.
type: prompt
version: 1.0.0
categories: [sistema, geracao, skills]
---

# Skill: EduSquad Skill Creator

## Como Criar uma Nova Skill

Quando o usuário pedir para criar uma skill:

1. Colete as informações necessárias:
   - Nome da skill
   - O que ela faz
   - Tipo (prompt, script, mcp, hybrid)
   - Categorias
   - Variáveis de ambiente necessárias
   - Se script: runtime e dependências

2. Gere o arquivo `skills/{nome}/SKILL.md` seguindo o formato em `skills/edusquad-skill-creator/references/skill-format.md`

3. Se tipo script:
   - Crie também `skills/{nome}/scripts/`
   - Gere o script base funcional

4. Se tipo mcp:
   - Adicione a configuração em `.mcp.json`

5. Confirme ao usuário com instruções de uso
