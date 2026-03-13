# EduSquad — Agent Instructions

This file initializes the EduSquad framework for agent-based IDEs (Codex, Copilot, etc.).

## Framework Initialization

When the user invokes `/edusquad` or any EduSquad command:

1. Read `_edusquad/core/architect.agent.yaml` — load the Pedagogo architect agent
2. Read `_edusquad/_memory/institution.md` — load institution context
3. Read `_edusquad/_memory/learner-profile.md` — load learner profile
4. Read `_edusquad/_memory/preferences.md` — load user preferences
5. Present the main menu or execute the requested command

## Available Commands

- `criar` / `create` — Create a new educational squad
- `rodar <nome>` / `run <name>` — Execute a squad pipeline
- `skills` — Manage installed skills
- `listar` / `list` — List all squads
- `ajuda` / `help` — Show help

## Core Files

- Architect Agent: `_edusquad/core/architect.agent.yaml`
- Pipeline Runner: `_edusquad/core/runner.pipeline.md`
- Skills Engine: `_edusquad/core/skills.engine.md`
- Best Practices: `_edusquad/core/best-practices/`
- Memory: `_edusquad/_memory/`
