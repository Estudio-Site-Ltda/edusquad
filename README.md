# EduSquad

Framework de orquestração multi-agente para criação de recursos educacionais.

## O que é o EduSquad?

EduSquad permite criar equipes virtuais (squads) de agentes de IA que colaboram para produzir materiais educacionais de alta qualidade — desde o planejamento pedagógico até a entrega em múltiplos formatos.

## Formatos Suportados

- Roteiros de vídeo
- Apresentações (slides)
- SCORMs para LMS
- PDFs e apostilas
- Planos de aula
- Mapas mentais
- Fluxogramas
- Quizzes e avaliações
- Trilhas de aprendizagem

## Início Rápido

```bash
# No Claude Code ou IDE compatível
/edusquad criar
```

## Estrutura

```
edusquad/
├── _edusquad/        # Core framework
├── skills/           # Skills instaladas
├── squads/           # Seus squads
└── dashboard/        # UI visual (Fase 4)
```

## Skills Incluídas (Fase 1)

- `bloom` — Taxonomia de Bloom para objetivos de aprendizagem
- `instructional-design` — Modelos ADDIE e design instrucional
- `video-script` — Estruturação de roteiros educacionais

## Documentação

Veja `_edusquad/core/` para documentação completa do framework.
