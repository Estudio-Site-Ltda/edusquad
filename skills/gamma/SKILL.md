---
name: Gamma
description: Gera apresentações, documentos e páginas web educacionais com IA diretamente no Gamma via MCP. Ideal para criar módulos de curso, resumos visuais, materiais de apoio e landing pages de cursos em minutos, com design automático de alta qualidade. Use quando o usuário pedir "criar no Gamma", "apresentação com IA", "módulo visual", "página de curso", "resumo interativo" ou qualquer conteúdo que se beneficie do design automático do Gamma.
type: mcp
version: 1.0.0
categories: [design, apresentacao, ia, gamma, conteudo]
mcp_server: claude_ai_Gamma
---

# Gamma Skill — Apresentações com IA via MCP

Esta skill usa o MCP do Gamma (já conectado neste ambiente) para gerar apresentações, documentos e páginas web educacionais com design automático e de alta qualidade — sem precisar criar slide por slide manualmente.

> **Importante:** O Gamma cria conteúdo novo — não edita Gammas existentes. Após a geração, o usuário pode refinar diretamente no editor do Gamma.

---

## Ferramentas MCP Disponíveis

| Ferramenta | O que faz |
|---|---|
| `mcp__claude_ai_Gamma__generate` | Gera um novo Gamma (apresentação, doc ou página) com IA |
| `mcp__claude_ai_Gamma__get_generation_status` | Verifica o status da geração (pode levar alguns segundos) |
| `mcp__claude_ai_Gamma__get_themes` | Lista os temas visuais disponíveis |
| `mcp__claude_ai_Gamma__get_folders` | Lista as pastas organizacionais do usuário |

---

## Tipos de Output

O Gamma suporta 3 tipos de conteúdo:

| Tipo | Uso Educacional | Quando usar |
|---|---|---|
| `presentation` | Aulas, módulos de curso, treinamentos, webinars | Conteúdo sequencial com slides |
| `document` | Apostilas, guias, relatórios, planos de aula | Conteúdo longo e linear |
| `webpage` | Landing pages de curso, portfólio, syllabus online | Publicação na web |

---

## Fluxo de Uso

### 1. Listar temas disponíveis (opcional)

```
Use mcp__claude_ai_Gamma__get_themes para ver os temas visuais disponíveis
Escolha o mais adequado ao contexto educacional (formal, moderno, corporativo)
```

### 2. Gerar o conteúdo

```
Use mcp__claude_ai_Gamma__generate com:
- text: outline ou prompt do conteúdo
- mode: "text" (usa o texto como estrutura) ou "generate" (IA cria o conteúdo)
- contentType: "presentation" | "document" | "webpage"
- theme (opcional): ID do tema visual escolhido
- language (opcional): "pt" para português
```

### 3. Verificar status

```
Use mcp__claude_ai_Gamma__get_generation_status com o generation_id retornado
Repita até status ser "complete"
```

### 4. Apresentar resultado

Gamma retorna uma URL pública do conteúdo gerado. Compartilhe com o usuário.

---

## Estratégia de Prompt

O Gamma funciona melhor com **outline estruturado** — uma lista clara do que cada slide/seção deve conter. Quanto mais estruturado o input, melhor o output.

### Formato recomendado para apresentações

```
# [Título da Apresentação]

## Slide 1 — [Título]
- Ponto principal 1
- Ponto principal 2
- Destaque ou dado relevante

## Slide 2 — [Título]
- ...

## Slide N — Encerramento
- Resumo
- Próximos passos
- Chamada para ação
```

### Formato recomendado para documentos

```
# [Título do Documento]

## Introdução
[parágrafo ou bullets]

## [Seção 1]
[conteúdo]

## [Seção 2]
[conteúdo]

## Conclusão
[conteúdo]
```

---

## Exemplos Educacionais

### Exemplo 1 — Módulo de Curso (Apresentação)

```
Tipo: presentation
Modo: text
Conteúdo:

# Design Instrucional para Iniciantes
## Módulo 1 — Fundamentos

## Slide 1 — O que é Design Instrucional?
- Processo sistemático de criação de experiências de aprendizagem eficazes
- Une pedagogia, psicologia cognitiva e design
- Resultado: aprendizes que realmente aprendem

## Slide 2 — Por que o DI importa?
- 70% dos treinamentos falham por falta de planejamento pedagógico
- DI reduz retrabalho e aumenta engajamento
- Kirkpatrick: mede impacto nos 4 níveis

## Slide 3 — O Modelo ADDIE
- Analysis — quem aprende e por quê
- Design — como estruturar a experiência
- Development — produzir o conteúdo
- Implementation — entregar ao aprendiz
- Evaluation — medir o impacto

## Slide 4 — A Análise (A do ADDIE)
- Quem é o público-alvo?
- Qual é o GAP de aprendizagem?
- Quais são os objetivos mensuráveis?
- Quais recursos existem?

## Slide 5 — Objetivos de Aprendizagem com Bloom
- Use verbos mensuráveis: criar, analisar, aplicar, comparar
- Evite: entender, saber, conhecer (não mensuráveis)
- Exemplo ruim: "O aluno vai entender Python"
- Exemplo bom: "O aluno vai escrever um programa em Python que lê um arquivo CSV"

## Slide 6 — Próximos Passos
- Pratique: defina 3 objetivos de aprendizagem para seu próximo curso
- Leia: "Design for How People Learn" — Julie Dirksen
- Explore: EduSquad para acelerar sua produção
```

### Exemplo 2 — Plano de Aula (Documento)

```
Tipo: document
Modo: text
Conteúdo:

# Plano de Aula — Introdução à Programação com Python
## Turma: 9º ano EF | Duração: 50 min | Professor: [nome]

## Objetivos de Aprendizagem
- Identificar o que é uma linguagem de programação
- Executar o primeiro programa "Olá, Mundo!" em Python
- Reconhecer variáveis como conceito fundamental

## Sequência Didática

### Abertura (10 min)
- Pergunta-problema: "Como você daria instruções precisas para um robô?"
- Discussão: diferença entre linguagem humana e linguagem de máquina

### Desenvolvimento (30 min)
- Explicação: o que é Python e onde é usado (15 min)
- Prática guiada: "Olá, Mundo!" no browser (Trinket.io) (10 min)
- Prática: modificar o programa para exibir nome do aluno (5 min)

### Encerramento (10 min)
- Síntese: o que é uma variável?
- Saída de 1 minuto: cada aluno escreve 1 coisa que aprendeu + 1 dúvida

## Recursos Necessários
- Computadores ou tablets com acesso ao browser
- Trinket.io (online Python, sem instalação)
- Projetor/tela para demonstração

## Avaliação
- Formativa: observação durante a prática
- Verificação: o programa roda e exibe o nome do aluno?
```

### Exemplo 3 — Landing Page de Curso (Webpage)

```
Tipo: webpage
Modo: text
Conteúdo:

# Python para Educadores — Aprenda programação para transformar suas aulas

## Por que este curso?
- Aprenda Python do zero, no seu ritmo
- Aplicações práticas para a sala de aula
- Certificado reconhecido pelo MEC

## O que você vai aprender
- Variáveis, listas e loops
- Automação de tarefas repetitivas
- Análise de dados de turmas com pandas
- Criação de quizzes interativos

## Para quem é este curso?
- Professores da Educação Básica ou Superior
- Sem experiência em programação necessária
- Qualquer disciplina — não só Matemática ou Tecnologia

## Depoimentos
- "Mudou minha relação com tecnologia na sala de aula" — Maria S., professora de Geografia
- "Aprendi em 4 semanas o que tentei em 2 anos" — João P., professor de Ciências

## Inscreva-se agora
- 40 horas de conteúdo
- Acesso vitalício
- Suporte da comunidade
- Certificado ao final
```

### Exemplo 4 — Treinamento Corporativo (Apresentação)

```
Tipo: presentation
Modo: text
Conteúdo:

# Comunicação Não-Violenta no Trabalho
## Treinamento para Líderes — RH

## Slide 1 — O problema
- 67% dos conflitos no trabalho vêm de falhas de comunicação
- Custo médio de um conflito mal gerenciado: 8h de produtividade por pessoa
- Solução: CNV — Comunicação Não-Violenta (Marshall Rosenberg)

## Slide 2 — Os 4 Componentes da CNV
- Observação (sem julgamento)
- Sentimento
- Necessidade
- Pedido (claro e realizável)

## Slide 3 — Observação vs. Julgamento
- Julgamento: "Você nunca entrega no prazo"
- Observação: "Nas últimas 3 semanas, o relatório chegou após o prazo combinado"
- Regra: só fatos observáveis, sem interpretações

## Slide 4 — Atividade Prática
- Transforme estas frases em observações CNV:
  1. "Você é muito agressivo nas reuniões"
  2. "O cliente nunca está satisfeito"
  3. "A equipe não colabora"

## Slide 5 — Aplicação no Dia a Dia
- 1-1s: use CNV para feedback de performance
- E-mails: revise antes de enviar — há julgamentos?
- Reuniões: intervença com "O que você observou?"

## Slide 6 — Plano de Ação
- Semana 1: pratique observações sem julgamento
- Semana 2: adicione sentimentos e necessidades
- Semana 3: formule pedidos claros
- Acompanhamento: check-in em 30 dias
```

---

## Boas Práticas

1. **Use o modo `text`** — passar um outline já estruturado gera resultados melhores que deixar a IA criar tudo do zero
2. **Máximo 15 slides** para apresentações — o Gamma distribui o conteúdo com qualidade
3. **Bullets curtos** — o Gamma expande o conteúdo com design; não precisa escrever parágrafos inteiros
4. **Inclua dados e exemplos** — números e casos concretos tornam o design mais rico
5. **Especifique a língua** — use `language: "pt"` para garantir outputs em português

---

## Onde Salvar (EduSquad)

```
squads/{nome}/output/{run_id}/{step}/
  gamma-link.txt      ← URL do Gamma gerado (para compartilhar/editar)
```

Após a geração, salve a URL em `gamma-link.txt`. O usuário pode:
- Visualizar diretamente pelo link
- Editar no editor do Gamma
- Exportar como PDF ou apresentação
- Publicar como página web pública

---

## Checklist para Design no Gamma

- [ ] Definir tipo: `presentation`, `document` ou `webpage`
- [ ] Escolher tema visual (opcional — `get_themes`)
- [ ] Escrever outline estruturado com `##` por slide/seção
- [ ] Incluir bullets curtos e objetivos (não parágrafos)
- [ ] Definir `language: "pt"` para conteúdo em português
- [ ] Verificar status da geração (`get_generation_status`)
- [ ] Apresentar URL ao usuário com instrução de personalização
- [ ] Salvar link em `gamma-link.txt`
