---
name: Quiz Builder
description: Gera avaliações e quizzes educacionais em múltiplos formatos — JSON estruturado, HTML standalone interativo com feedback imediato, JSON compatível com H5P, CSV para Moodle (plugin qformat_csv) e CSV para LMS Estúdio. Suporta múltipla escolha, verdadeiro/falso, resposta curta, correspondência e ordenação. Use quando o usuário pedir "quiz", "avaliação", "prova", "questões", "banco de questões", "atividade de fixação", "exportar para Moodle", "importar no LMS" ou qualquer forma de avaliação de aprendizagem.
type: prompt
version: 1.1.0
categories: [conteudo, avaliacao, quiz, interativo, moodle, lms]
---

# Quiz Builder — Avaliações Educacionais

Esta skill gera avaliações educacionais completas em 3 formatos simultâneos:

1. **`quiz.json`** — dados estruturados (exportável, importável, integrável)
2. **`quiz.html`** — quiz standalone interativo com feedback imediato e relatório de resultado
3. **`quiz-h5p.json`** — estrutura compatível com H5P Question Set (para importar em LMS com H5P)

---

## O que esta skill entrega

```
squads/{nome}/output/{run_id}/{step}/
  quiz.json              ← dados brutos estruturados
  quiz.html              ← quiz standalone interativo (abrir no browser)
  quiz-h5p.json          ← compatível com H5P Question Set
  quiz-moodle.csv        ← importação direta no Moodle (plugin qformat_csv)
  quiz-lms-estudio.csv   ← importação direta no LMS Estúdio
  README.md              ← instruções de uso e integração
```

---

## Estrutura de Dados

```js
const quiz = {
  // Metadados
  id: 'quiz-python-basico',
  title: 'Verificação de Conhecimento — Python Básico',
  description: 'Avalie o que você aprendeu no módulo de Python para iniciantes.',
  subject: 'Programação',
  level: 'iniciante',                // 'iniciante' | 'intermediário' | 'avançado'
  language: 'pt-BR',
  passingScore: 70,                  // % mínimo para aprovação
  timeLimit: 0,                      // minutos — 0 = sem limite
  shuffleQuestions: true,
  shuffleOptions: true,

  // Questões
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',       // ver tipos abaixo
      bloom: 'lembrar',              // nível cognitivo de Bloom
      text: 'O que é uma variável em Python?',
      image: '',                     // URL opcional
      options: [
        { id: 'a', text: 'Um espaço na memória para armazenar dados', correct: true },
        { id: 'b', text: 'Um tipo de loop', correct: false },
        { id: 'c', text: 'Uma função matemática', correct: false },
        { id: 'd', text: 'Um arquivo de configuração', correct: false },
      ],
      feedback: {
        correct: 'Correto! Uma variável é um nome que aponta para um espaço na memória onde um dado é armazenado.',
        incorrect: 'Não exatamente. Em Python, uma variável é como um rótulo que você cola em um espaço de memória para guardar um dado.'
      },
      explanation: 'Variáveis são fundamentais em programação — elas permitem guardar valores para usar depois no código.',
      points: 1
    },
    {
      id: 'q2',
      type: 'true-false',
      bloom: 'compreender',
      text: 'Em Python, o índice de uma lista começa em 1.',
      correct: false,                // true ou false
      feedback: {
        correct: 'Correto! Em Python (e na maioria das linguagens), índices começam em 0.',
        incorrect: 'Na verdade, em Python os índices começam em 0. O primeiro elemento é lista[0], não lista[1].'
      },
      points: 1
    },
    {
      id: 'q3',
      type: 'fill-in-blank',
      bloom: 'aplicar',
      text: 'Para exibir algo na tela em Python, usamos a função ______.',
      blanks: [
        { id: 'b1', answer: 'print', alternatives: ['print()', 'Print', 'PRINT'] }
      ],
      feedback: {
        correct: 'Correto! A função print() exibe valores no console.',
        incorrect: 'A função correta é print(). Exemplo: print("Olá, Mundo!")'
      },
      points: 1
    },
    {
      id: 'q4',
      type: 'matching',
      bloom: 'compreender',
      text: 'Relacione cada tipo de dado do Python com sua descrição:',
      pairs: [
        { left: 'int',   right: 'Número inteiro' },
        { left: 'str',   right: 'Texto' },
        { left: 'float', right: 'Número decimal' },
        { left: 'bool',  right: 'Verdadeiro ou Falso' },
      ],
      points: 2
    },
    {
      id: 'q5',
      type: 'ordering',
      bloom: 'aplicar',
      text: 'Coloque os passos para criar e usar uma variável em Python na ordem correta:',
      items: [
        { id: 'i1', text: 'Escolha um nome para a variável', order: 1 },
        { id: 'i2', text: 'Use o operador = para atribuir um valor', order: 2 },
        { id: 'i3', text: 'Use a variável em uma expressão ou print()', order: 3 },
      ],
      points: 1
    }
  ]
};
```

---

## Tipos de Questão

| type | Descrição | Bloom sugerido |
|---|---|---|
| `multiple-choice` | 4 alternativas, uma ou mais corretas | Lembrar, Compreender |
| `true-false` | Afirmação para julgar como V ou F | Lembrar, Compreender |
| `fill-in-blank` | Complete a lacuna com a palavra certa | Aplicar |
| `matching` | Relacione dois grupos (par a par) | Compreender, Analisar |
| `ordering` | Ordene itens em sequência correta | Aplicar, Analisar |

---

## Exemplos Educacionais de Uso

### Exemplo 1 — Verificação de Aprendizagem (Aula)

```js
const quiz = {
  id: 'quiz-bloom-taxonomia',
  title: 'Taxonomia de Bloom — Revisão',
  description: 'Teste sua compreensão dos 6 níveis cognitivos de Bloom.',
  passingScore: 70,
  questions: [
    {
      id: 'q1', type: 'ordering', bloom: 'lembrar',
      text: 'Ordene os 6 níveis da Taxonomia de Bloom do mais simples ao mais complexo:',
      items: [
        { id: 'i1', text: 'Lembrar', order: 1 },
        { id: 'i2', text: 'Compreender', order: 2 },
        { id: 'i3', text: 'Aplicar', order: 3 },
        { id: 'i4', text: 'Analisar', order: 4 },
        { id: 'i5', text: 'Avaliar', order: 5 },
        { id: 'i6', text: 'Criar', order: 6 },
      ],
      points: 2
    },
    {
      id: 'q2', type: 'matching', bloom: 'compreender',
      text: 'Relacione cada verbo ao nível cognitivo correspondente:',
      pairs: [
        { left: 'Projetar',    right: 'Criar' },
        { left: 'Comparar',   right: 'Analisar' },
        { left: 'Explicar',   right: 'Compreender' },
        { left: 'Executar',   right: 'Aplicar' },
      ],
      points: 2
    },
    {
      id: 'q3', type: 'multiple-choice', bloom: 'aplicar',
      text: 'Um professor pede para os alunos "criar um mapa mental sobre o tema". Qual nível de Bloom essa atividade alcança?',
      options: [
        { id: 'a', text: 'Lembrar', correct: false },
        { id: 'b', text: 'Aplicar', correct: false },
        { id: 'c', text: 'Criar', correct: true },
        { id: 'd', text: 'Avaliar', correct: false },
      ],
      feedback: {
        correct: 'Correto! Criar um mapa mental exige síntese e organização original — nível mais alto da taxonomia.',
        incorrect: '"Criar" é o nível mais alto de Bloom. Produzir algo novo e original envolve criação, não apenas lembrar ou aplicar.'
      },
      points: 1
    }
  ]
};
```

### Exemplo 2 — Avaliação de Treinamento Corporativo

```js
const quiz = {
  id: 'quiz-comunicacao-nao-violenta',
  title: 'Comunicação Não-Violenta — Avaliação Final',
  description: 'Avaliação de conclusão do módulo CNV para a equipe.',
  passingScore: 80,
  timeLimit: 20,
  questions: [
    {
      id: 'q1', type: 'multiple-choice', bloom: 'compreender',
      text: 'Qual é o primeiro componente do processo de CNV segundo Marshall Rosenberg?',
      options: [
        { id: 'a', text: 'Sentimentos', correct: false },
        { id: 'b', text: 'Observação (sem julgamento)', correct: true },
        { id: 'c', text: 'Pedido', correct: false },
        { id: 'd', text: 'Necessidades', correct: false },
      ],
      feedback: {
        correct: 'Correto! O primeiro passo da CNV é observar a situação sem julgamentos ou avaliações.',
        incorrect: 'O processo CNV começa pela Observação — descrever os fatos sem interpretações ou julgamentos.'
      },
      points: 1
    },
    {
      id: 'q2', type: 'true-false', bloom: 'analisar',
      text: '"Você nunca me ouve!" é um exemplo de observação sem julgamento.',
      correct: false,
      feedback: {
        correct: 'Correto! Esta frase é um julgamento/generalização, não uma observação factual.',
        incorrect: '"Nunca" é uma generalização — isso é julgamento, não observação. Uma observação seria: "Na reunião de hoje, você olhou para o celular enquanto eu falava."'
      },
      points: 1
    }
  ]
};
```

---

## quiz.html — Template Standalone

O HTML do quiz é gerado com todas as questões inline, sistema de pontuação e relatório final.

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{quiz.title}</title>
  <style>
    /* CSS completo do quiz player */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: #4f46e5; --success: #10b981; --error: #f43f5e;
      --bg: #f8fafc; --surface: #ffffff; --text: #1e293b; --dim: #64748b; --border: #e2e8f0;
    }
    body { font-family: system-ui, sans-serif; background: var(--bg); min-height: 100vh; display: flex; align-items: flex-start; justify-content: center; padding: 40px 16px; }
    .quiz-wrap { width: 720px; max-width: 100%; }
    .quiz-header { margin-bottom: 32px; }
    .quiz-header h1 { font-size: 24px; font-weight: 800; color: var(--text); margin-bottom: 8px; }
    .quiz-header p { color: var(--dim); font-size: 15px; }
    .progress-wrap { height: 6px; background: var(--border); border-radius: 99px; margin-bottom: 32px; }
    .progress-fill { height: 100%; background: var(--primary); border-radius: 99px; transition: width .4s; }
    .question-card { background: var(--surface); border-radius: 12px; padding: 28px; margin-bottom: 20px; border: 2px solid var(--border); }
    .question-card.answered-correct { border-color: var(--success); }
    .question-card.answered-incorrect { border-color: var(--error); }
    .question-number { font-size: 12px; font-weight: 600; color: var(--primary); text-transform: uppercase; letter-spacing: .08em; margin-bottom: 10px; }
    .question-text { font-size: 17px; font-weight: 600; color: var(--text); margin-bottom: 20px; line-height: 1.5; }
    .options { display: flex; flex-direction: column; gap: 10px; }
    .option {
      display: flex; align-items: center; gap: 12px; padding: 14px 16px;
      border-radius: 8px; border: 2px solid var(--border); cursor: pointer; transition: all .2s;
      font-size: 15px; color: var(--text);
    }
    .option:hover:not(.locked) { border-color: var(--primary); background: #eef2ff; }
    .option.correct { border-color: var(--success); background: #d1fae5; }
    .option.incorrect { border-color: var(--error); background: #ffe4e6; }
    .option.locked { cursor: default; }
    .feedback { margin-top: 16px; padding: 14px; border-radius: 8px; font-size: 14px; line-height: 1.6; }
    .feedback.correct { background: #d1fae5; color: #065f46; }
    .feedback.incorrect { background: #ffe4e6; color: #9f1239; }
    .quiz-result { background: var(--surface); border-radius: 16px; padding: 48px; text-align: center; margin-top: 32px; border: 2px solid var(--border); }
    .result-score { font-size: 64px; font-weight: 900; margin-bottom: 8px; }
    .result-score.pass { color: var(--success); }
    .result-score.fail { color: var(--error); }
    .result-label { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .result-sub { color: var(--dim); }
    .btn-restart { margin-top: 24px; padding: 12px 32px; background: var(--primary); color: #fff; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; }
  </style>
</head>
<body>
<div class="quiz-wrap">
  <div class="quiz-header">
    <h1><!-- quiz.title --></h1>
    <p><!-- quiz.description --></p>
  </div>
  <div class="progress-wrap"><div class="progress-fill" id="progress"></div></div>
  <div id="questions-container">
    <!-- questões geradas inline pela skill -->
  </div>
  <div id="quiz-result" class="quiz-result" style="display:none"></div>
</div>
<script>
  // Motor do quiz — gerado inline pela skill
  const QUIZ = { /* quiz data inline */ };
  const PASSING = QUIZ.passingScore || 70;
  let answered = 0, correct = 0;

  function answer(qIdx, optId, isCorrect) {
    const card = document.querySelector(`[data-q="${qIdx}"]`);
    if (card.classList.contains('answered-correct') || card.classList.contains('answered-incorrect')) return;
    card.querySelectorAll('.option').forEach(o => {
      o.classList.add('locked');
      if (o.dataset.correct === 'true') o.classList.add('correct');
      if (o.dataset.id === optId && !isCorrect) o.classList.add('incorrect');
    });
    if (isCorrect) { card.classList.add('answered-correct'); correct++; }
    else card.classList.add('answered-incorrect');
    card.querySelector('.feedback').style.display = 'block';
    answered++;
    document.getElementById('progress').style.width = (answered / QUIZ.questions.length * 100) + '%';
    if (answered === QUIZ.questions.length) setTimeout(showResult, 600);
  }

  function showResult() {
    const pct = Math.round(correct / QUIZ.questions.length * 100);
    const pass = pct >= PASSING;
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('quiz-result').innerHTML = `
      <div class="result-score ${pass ? 'pass' : 'fail'}">${pct}%</div>
      <div class="result-label">${pass ? '✅ Aprovado!' : '❌ Tente novamente'}</div>
      <div class="result-sub">${correct} de ${QUIZ.questions.length} questões corretas · Mínimo: ${PASSING}%</div>
      <button class="btn-restart" onclick="location.reload()">Refazer Quiz</button>
    `;
    document.getElementById('quiz-result').scrollIntoView({ behavior: 'smooth' });
  }
</script>
</body>
</html>
```

---

## quiz-h5p.json — Estrutura H5P Question Set

```json
{
  "library": "H5P.QuestionSet 1.20",
  "params": {
    "introPage": {
      "showIntroPage": true,
      "title": "{quiz.title}",
      "introduction": "{quiz.description}",
      "startButtonText": "Iniciar"
    },
    "passPercentage": 70,
    "disableBackwardsNavigation": false,
    "randomQuestions": true,
    "questions": [
      {
        "library": "H5P.MultiChoice 1.16",
        "params": {
          "question": "{question.text}",
          "answers": [
            { "text": "{option.text}", "correct": true,  "tipsAndFeedback": { "chosenFeedback": "{feedback.correct}" } },
            { "text": "{option.text}", "correct": false, "tipsAndFeedback": { "chosenFeedback": "{feedback.incorrect}" } }
          ],
          "behaviour": { "singleAnswer": true, "randomAnswers": true },
          "l10n": { "correctAnswer": "Resposta correta", "wrongAnswer": "Resposta incorreta" }
        }
      }
    ],
    "endGame": {
      "showResultPage": true,
      "showSolutionButton": true,
      "showRetryButton": true,
      "noResultMessage": "Quiz concluído",
      "message": "Seu resultado:",
      "successGreeting": "Parabéns!",
      "successComment": "Você atingiu a nota mínima.",
      "failGreeting": "Tente novamente",
      "failComment": "Você precisa de @minscore% para aprovação.",
      "solutionButtonText": "Ver gabarito",
      "retryButtonText": "Tentar novamente",
      "finishButtonText": "Finalizar",
      "submitButtonText": "Enviar"
    }
  }
}
```

---

## Alinhamento com Bloom

Cada questão deve ter o campo `bloom` preenchido para garantir que a avaliação cubra os níveis cognitivos adequados ao objetivo de aprendizagem:

| Nível | Verbos de questão recomendados |
|---|---|
| Lembrar | "O que é?", "Liste", "Defina", "Identifique" |
| Compreender | "Explique", "Por que?", "Qual a diferença?" |
| Aplicar | "Como você faria?", "Calcule", "Resolva" |
| Analisar | "Compare", "Classifique", "Qual o problema em...?" |
| Avaliar | "Julgue", "Justifique", "Qual é a melhor opção?" |
| Criar | "Elabore", "Proponha", "Crie" |

---

---

## Exportação CSV para LMS

A skill gera dois arquivos CSV prontos para importação direta em plataformas LMS, sem precisar cadastrar as questões manualmente.

> **Atenção:** Ambos os formatos suportam apenas questões de **múltipla escolha** (`multiple-choice`). Questões de outros tipos (`true-false`, `fill-in-blank`, `matching`, `ordering`) devem ser adaptadas para múltipla escolha ao exportar em CSV, ou omitidas com aviso.

---

### quiz-moodle.csv — Formato Moodle (plugin qformat_csv)

**Plugin:** [qformat_csv](https://moodle.org/plugins/qformat_csv) — instale no Moodle antes de importar.

#### Estrutura do arquivo

```
questiontext,A,B,C,D,Answer 1,Answer 2
```

| Coluna | Descrição |
|---|---|
| `questiontext` | Texto completo da questão |
| `A` `B` `C` `D` | Texto de cada alternativa |
| `Answer 1` | Letra da alternativa correta (obrigatório: `A`, `B`, `C` ou `D`) |
| `Answer 2` | Segunda alternativa correta (opcional — para questões com 2 respostas) |

#### Regras obrigatórias

- **Header exato:** `questiontext,A,B,C,D,Answer 1,Answer 2` — case-sensitive, sem espaços extras
- **Encoding:** UTF-8 (evita erro de importação com caracteres especiais)
- **Vírgulas no texto:** se a questão ou alternativa contiver vírgula, envolva o campo em aspas duplas `"texto, com vírgula"`
- **Aspas simples/curvas** (`'` `"`) causam erros — use apenas aspas retas `"`
- **Answer 2** é opcional — deixe vazio (`,` no final da linha) se houver só uma resposta

#### Exemplo

```csv
questiontext,A,B,C,D,Answer 1,Answer 2
O que é uma variável em Python?,Um espaço na memória para armazenar dados,Um tipo de loop,Uma função matemática,Um arquivo de configuração,A,
"Quais dos itens abaixo são tipos primitivos em Python?",int e str,list e dict,int e list,"str, float e bool",D,
Em Python o índice de uma lista começa em:,0,1,2,Depende do tipo,A,
```

#### Geração a partir do quiz.json

Para converter as questões `multiple-choice` do `quiz.json` para este formato:

```
Para cada questão do tipo multiple-choice:
  - questiontext  = question.text
  - A             = options[0].text
  - B             = options[1].text
  - C             = options[2].text
  - D             = options[3].text
  - Answer 1      = letra (A/B/C/D) da opção com correct: true
  - Answer 2      = vazio (ou segunda letra correta se houver)

Regras de sanitização:
  - Se o texto contiver vírgula → envolver em aspas duplas
  - Remover aspas curvas/inteligentes → substituir por aspas retas
  - Encoding final: UTF-8
```

#### Como importar no Moodle

```
1. Acesse o Banco de Questões do curso: Mais → Banco de questões → Importar
2. Formato: CSV (requer plugin qformat_csv instalado)
3. Selecione o arquivo quiz-moodle.csv
4. Categoria destino: escolha ou crie uma
5. Clique em Importar
6. Revise as questões e confirme
```

---

### quiz-lms-estudio.csv — Formato LMS Estúdio

Formato nativo de importação de questões do **LMS Estúdio**.

#### Estrutura do arquivo

```
id,questão,pontos,texto_A,correto_A,texto_B,correto_B,texto_C,correto_C,texto_D,correto_D
```

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | inteiro | Número sequencial da questão (1, 2, 3...) |
| `questão` | string | Texto completo da questão (entre aspas duplas) |
| `pontos` | inteiro | Valor da questão em pontos (padrão: `10`) |
| `texto_A` | string | Texto da alternativa A (entre aspas duplas) |
| `correto_A` | 0 ou 1 | `1` se A é a resposta correta, `0` caso contrário |
| `texto_B` | string | Texto da alternativa B |
| `correto_B` | 0 ou 1 | Correção de B |
| `texto_C` | string | Texto da alternativa C |
| `correto_C` | 0 ou 1 | Correção de C |
| `texto_D` | string | Texto da alternativa D |
| `correto_D` | 0 ou 1 | Correção de D |

> **Sem header:** o arquivo começa diretamente com a primeira questão — sem linha de cabeçalho.

#### Exemplo

```csv
1,"O que é uma grandeza física?",10,"Tudo aquilo que pode ser medido e expresso numericamente",1,"Qualquer fenômeno que ocorre na natureza",0,"Somente valores relacionados à velocidade",0,"Qualquer objeto que possua massa",0
2,"Qual é a unidade de tempo no Sistema Internacional (SI)?",10,"Minuto",0,"Hora",0,"Segundo",1,"Dia",0
3,"Qual das opções abaixo representa uma grandeza escalar?",10,"Força",0,"Velocidade",0,"Aceleração",0,"Temperatura",1
```

#### Geração a partir do quiz.json

```
Para cada questão do tipo multiple-choice:
  - id       = índice sequencial (1, 2, 3...)
  - questão  = question.text (entre aspas duplas)
  - pontos   = question.points * 10  (ou 10 como padrão)
  - texto_A  = options[0].text (entre aspas duplas)
  - correto_A = options[0].correct ? 1 : 0
  - texto_B  = options[1].text
  - correto_B = options[1].correct ? 1 : 0
  - texto_C  = options[2].text
  - correto_C = options[2].correct ? 1 : 0
  - texto_D  = options[3].text
  - correto_D = options[3].correct ? 1 : 0

Sem linha de header.
Encoding: UTF-8.
```

#### Como importar no LMS Estúdio

```
1. Acesse o curso no LMS Estúdio → Avaliações → Banco de Questões
2. Clique em Importar → CSV
3. Selecione o arquivo quiz-lms-estudio.csv
4. Revise o mapeamento de colunas (automático)
5. Confirme a importação
```

---

### Comparativo dos Formatos CSV

| Característica | quiz-moodle.csv | quiz-lms-estudio.csv |
|---|---|---|
| Header | Sim (obrigatório) | Não |
| Respostas corretas | Letra (A/B/C/D) | Flag 0/1 por alternativa |
| Múltiplas respostas | Sim (Answer 2) | Não |
| Pontuação | Não | Sim (coluna `pontos`) |
| Encoding | UTF-8 | UTF-8 |
| Textos com vírgula | Aspas duplas | Aspas duplas |
| Plataforma | Moodle (plugin) | LMS Estúdio |

---

## Checklist para Novo Quiz

- [ ] Definir metadados: `id`, `title`, `description`, `passingScore`
- [ ] Mínimo 5 questões, máximo 20 por avaliação
- [ ] Usar ao menos 3 tipos diferentes de questão
- [ ] Preencher `bloom` em todas as questões
- [ ] Feedback `correct` e `incorrect` em todas as questões (específicos e pedagógicos)
- [ ] Distratores plausíveis nas múltipla escolha (não obviamente errados)
- [ ] Embaralhar opções quando `shuffleOptions: true`
- [ ] Gerar `quiz.json`, `quiz.html` e `quiz-h5p.json`
- [ ] Testar quiz.html standalone no browser
- [ ] Verificar cálculo de pontuação e mensagem de aprovação/reprovação
- [ ] Gerar `quiz-moodle.csv` (apenas questões `multiple-choice`, header obrigatório, UTF-8)
- [ ] Gerar `quiz-lms-estudio.csv` (apenas `multiple-choice`, sem header, flags 0/1, UTF-8)
- [ ] Verificar que textos com vírgula estão entre aspas duplas em ambos os CSVs
- [ ] Avisar o usuário quais tipos de questão foram omitidos dos CSVs (se houver)
