# Formato de Skill EduSquad

## Estrutura de Diretório

```
skills/
└── {nome-da-skill}/
    ├── SKILL.md          # Obrigatório — definição da skill
    └── scripts/          # Opcional — para tipo script ou hybrid
        └── main.js       # Script principal
```

## Formato SKILL.md

```markdown
---
name: {Nome de Exibição}
description: {Descrição clara em 1-2 frases do que a skill faz}
type: prompt | script | mcp | hybrid
version: 1.0.0
categories: [{tag1}, {tag2}]

# Para tipo mcp ou hybrid:
mcp:
  server_name: {nome-do-servidor}
  command: npx
  args: [{arg1}, {arg2}]
  transport: stdio | http
  url: {url — apenas para http}

# Para tipo script ou hybrid:
script:
  path: scripts/main.js
  runtime: node | python | bash
  dependencies: [{pacote1}, {pacote2}]

# Variáveis de ambiente necessárias:
env:
  - NOME_DA_VARIAVEL
---

# Skill: {Nome}

{Instruções em Markdown que serão injetadas no contexto do agente}

## Como Usar
{Instruções específicas de uso}

## Checklist de Qualidade
{Lista de verificação antes de entregar}
```

## Tipos de Skill

| Tipo | Quando Usar | Exemplo |
|------|-------------|---------|
| `prompt` | Apenas instruções comportamentais | bloom, instructional-design |
| `script` | Execução de código local | pdf-builder, scorm-builder |
| `mcp` | Servidor MCP externo | canva, moodle-publisher |
| `hybrid` | MCP + script combinados | instagram-publisher |
