---
name: SCORM Builder
description: Gera um pacote SCORM 1.2 completo e funcional — pronto para upload em qualquer LMS (Moodle, Hotmart, Teachable, Canvas LMS). Inclui conteúdo HTML, imsmanifest.xml, rastreamento de progresso e script de empacotamento. Use quando o usuário pedir "SCORM", "pacote e-learning", "módulo para LMS", "curso interativo para Moodle/Hotmart" ou qualquer conteúdo que precise ser importado em uma plataforma EAD.
type: hybrid
version: 1.0.0
categories: [conteudo, lms, scorm, elearning, interativo]
---

# SCORM Builder

Esta skill gera um **pacote SCORM 1.2** completo — estrutura de arquivos, conteúdo HTML, manifesto XML, rastreamento de progresso via SCORM API e script Node.js para zipar e entregar o `.zip` pronto para upload no LMS.

---

## O que esta skill entrega

```
squads/{nome}/output/{run_id}/{step}/scorm/
├── imsmanifest.xml          ← manifesto obrigatório (LMS lê isso primeiro)
├── build.js                 ← script Node.js para gerar o .zip
├── package.json             ← dependência: archiver
├── content/
│   ├── index.html           ← página de entrada (SCO principal)
│   ├── slide_01.html        ← conteúdo slide a slide
│   ├── slide_02.html
│   └── ...
├── assets/
│   ├── scorm.js             ← wrapper SCORM API 1.2
│   ├── style.css            ← estilo do player
│   └── progress.js         ← lógica de navegação e rastreamento
└── README.md                ← instruções de upload
```

Após gerar os arquivos, rode:
```bash
cd squads/{nome}/output/{run_id}/{step}/scorm
npm install
node build.js
# → gera course.zip pronto para upload no LMS
```

---

## Estrutura de Dados

```js
const course = {
  // Metadados do manifesto
  id: 'curso-python-basico',          // ID único sem espaços
  title: 'Python para Iniciantes',
  version: '1.0',
  language: 'pt-BR',
  description: 'Introdução à programação com Python',
  duration: 'PT45M',                  // ISO 8601 — PT45M = 45 minutos

  // Configurações de conclusão
  passingScore: 70,                   // nota mínima para "passed" (0-100)
  masteryScore: 70,                   // mesmo que passingScore no SCORM 1.2

  // Slides do curso
  slides: [
    {
      id: 'slide_01',
      title: 'Boas-vindas',
      type: 'content',               // 'content' | 'quiz' | 'activity'
      content: {
        heading: 'Bem-vindo ao curso',
        body: '<p>Neste módulo você vai aprender...</p>',
        notes: 'Orientação inicial ao aprendiz.',
      }
    },
    {
      id: 'slide_02',
      title: 'O que é Python?',
      type: 'content',
      content: {
        heading: 'Python — A linguagem que pensa como você',
        body: `<p>Python é uma linguagem de programação...</p>
               <ul><li>Simples de aprender</li><li>Muito poderosa</li></ul>`,
        image: '',                   // URL ou path local (opcional)
        notes: '',
      }
    },
    {
      id: 'slide_quiz',
      title: 'Verificação de Conhecimento',
      type: 'quiz',
      questions: [
        {
          id: 'q1',
          text: 'O que é Python?',
          type: 'multiple-choice',   // 'multiple-choice' | 'true-false'
          options: [
            { id: 'a', text: 'Uma linguagem de programação', correct: true },
            { id: 'b', text: 'Um banco de dados', correct: false },
            { id: 'c', text: 'Um sistema operacional', correct: false },
          ],
          feedback: {
            correct: 'Exato! Python é uma linguagem de programação de alto nível.',
            incorrect: 'Não exatamente. Python é uma linguagem de programação.'
          }
        }
      ]
    }
  ]
};
```

---

## imsmanifest.xml — Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="{course.id}"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                      http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                      http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">

  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>

  <organizations default="org_main">
    <organization identifier="org_main">
      <title>{course.title}</title>
      <item identifier="item_main" identifierref="res_main">
        <title>{course.title}</title>
        <adlcp:masteryscore>{course.masteryScore}</adlcp:masteryscore>
      </item>
    </organization>
  </organizations>

  <resources>
    <resource identifier="res_main"
              type="webcontent"
              adlcp:scormtype="sco"
              href="content/index.html">
      <file href="content/index.html"/>
      <!-- adicionar todos os slides aqui -->
      <file href="assets/scorm.js"/>
      <file href="assets/style.css"/>
      <file href="assets/progress.js"/>
    </resource>
  </resources>

</manifest>
```

---

## assets/scorm.js — SCORM API 1.2 Wrapper

```js
// SCORM 1.2 API Wrapper — compatível com Moodle, Hotmart, Canvas LMS, Teachable
const SCORM = (() => {
  let api = null;
  let initialized = false;

  function findAPI(win) {
    let attempts = 0;
    while (!win.API && win.parent && win.parent !== win && attempts < 10) {
      win = win.parent;
      attempts++;
    }
    return win.API || null;
  }

  function init() {
    api = findAPI(window);
    if (!api) {
      console.warn('[SCORM] API não encontrada — modo standalone (sem LMS)');
      return false;
    }
    const result = api.LMSInitialize('');
    initialized = result === 'true' || result === true;
    return initialized;
  }

  function getValue(key) {
    if (!api || !initialized) return '';
    return api.LMSGetValue(key);
  }

  function setValue(key, value) {
    if (!api || !initialized) return false;
    return api.LMSSetValue(key, String(value)) === 'true';
  }

  function commit() {
    if (!api || !initialized) return false;
    return api.LMSCommit('') === 'true';
  }

  function finish(status) {
    if (!api || !initialized) return false;
    setValue('cmi.core.lesson_status', status || 'completed');
    commit();
    return api.LMSFinish('') === 'true';
  }

  // API pública
  return {
    init,
    getValue,
    setValue,
    commit,
    finish,

    setScore(raw, min = 0, max = 100) {
      setValue('cmi.core.score.raw', raw);
      setValue('cmi.core.score.min', min);
      setValue('cmi.core.score.max', max);
    },

    setStatus(status) {
      // status: 'not attempted' | 'incomplete' | 'completed' | 'passed' | 'failed'
      setValue('cmi.core.lesson_status', status);
      commit();
    },

    setBookmark(location) {
      setValue('cmi.core.lesson_location', location);
      commit();
    },

    getBookmark() {
      return getValue('cmi.core.lesson_location');
    },

    setSuspendData(data) {
      setValue('cmi.suspend_data', JSON.stringify(data));
      commit();
    },

    getSuspendData() {
      try { return JSON.parse(getValue('cmi.suspend_data') || '{}'); }
      catch { return {}; }
    }
  };
})();

// Auto-inicialização
window.addEventListener('load', () => SCORM.init());
window.addEventListener('beforeunload', () => {
  if (SCORM.initialized) SCORM.commit();
});
```

---

## content/index.html — Player Principal

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{course.title}</title>
  <link rel="stylesheet" href="../assets/style.css">
</head>
<body>
  <div id="player">
    <header id="player-header">
      <div id="course-title">{course.title}</div>
      <div id="progress-bar-wrap">
        <div id="progress-bar"></div>
      </div>
      <div id="slide-counter">1 / {totalSlides}</div>
    </header>

    <main id="slide-area">
      <!-- conteúdo injetado por progress.js -->
    </main>

    <footer id="player-footer">
      <button id="btn-prev" onclick="Slides.prev()">← Anterior</button>
      <button id="btn-next" onclick="Slides.next()">Próximo →</button>
    </footer>
  </div>

  <script src="../assets/scorm.js"></script>
  <script src="../assets/progress.js"></script>
  <script>
    // Slides inline gerados pela skill
    const SLIDES = [
      /* array de objetos {id, title, html} gerado pela skill */
    ];
    Slides.init(SLIDES);
  </script>
</body>
</html>
```

---

## assets/progress.js — Navegação e Rastreamento

```js
const Slides = (() => {
  let slides = [];
  let current = 0;
  let visited = new Set();
  let quizScore = { correct: 0, total: 0 };

  function render(index) {
    const slide = slides[index];
    document.getElementById('slide-area').innerHTML = slide.html;
    document.getElementById('slide-counter').textContent = `${index + 1} / ${slides.length}`;
    const pct = ((index + 1) / slides.length) * 100;
    document.getElementById('progress-bar').style.width = pct + '%';
    document.getElementById('btn-prev').disabled = index === 0;
    document.getElementById('btn-next').textContent =
      index === slides.length - 1 ? 'Concluir ✓' : 'Próximo →';

    visited.add(slide.id);
    SCORM.setBookmark(slide.id);
    SCORM.setStatus('incomplete');
  }

  function checkComplete() {
    const allVisited = slides.every(s => visited.has(s.id));
    if (!allVisited) return;

    if (quizScore.total > 0) {
      const pct = Math.round((quizScore.correct / quizScore.total) * 100);
      SCORM.setScore(pct);
      SCORM.setStatus(pct >= PASSING_SCORE ? 'passed' : 'failed');
    } else {
      SCORM.setStatus('completed');
    }
    SCORM.commit();
  }

  return {
    init(slideList) {
      slides = slideList;
      const saved = SCORM.getBookmark();
      const startIdx = saved ? Math.max(0, slides.findIndex(s => s.id === saved)) : 0;
      current = startIdx;
      render(current);
    },
    next() {
      if (current < slides.length - 1) {
        current++;
        render(current);
      } else {
        checkComplete();
        SCORM.finish('completed');
        document.getElementById('slide-area').innerHTML =
          '<div class="completion"><h2>✅ Módulo concluído!</h2><p>Você pode fechar esta janela.</p></div>';
      }
    },
    prev() {
      if (current > 0) { current--; render(current); }
    },
    recordAnswer(correct) {
      quizScore.total++;
      if (correct) quizScore.correct++;
    }
  };
})();

const PASSING_SCORE = 70; // substituir pelo valor do course.passingScore
```

---

## build.js — Script de Empacotamento

```js
#!/usr/bin/env node
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'course.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`✅ course.zip gerado — ${(archive.pointer() / 1024).toFixed(1)} KB`);
  console.log('   Faça upload deste arquivo no seu LMS.');
});

archive.on('error', err => { throw err; });
archive.pipe(output);

// Adiciona todos os arquivos do pacote (exceto o próprio build.js e node_modules)
archive.glob('**/*', {
  cwd: __dirname,
  ignore: ['build.js', 'package.json', 'package-lock.json', 'node_modules/**', 'course.zip']
});

archive.finalize();
```

```json
// package.json
{
  "name": "scorm-package",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "archiver": "^6.0.1"
  }
}
```

---

## assets/style.css — Player Educacional

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f8fafc;
  --surface: #ffffff;
  --primary: #4f46e5;
  --primary-dark: #3730a3;
  --text: #1e293b;
  --text-dim: #64748b;
  --border: #e2e8f0;
  --success: #10b981;
  --error: #f43f5e;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#player {
  width: 960px; max-width: 100%;
  height: 600px; max-height: 100vh;
  background: var(--surface);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,.1);
  display: flex; flex-direction: column;
  overflow: hidden;
}

#player-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 16px;
}

#course-title { font-weight: 700; font-size: 15px; color: var(--text); flex-shrink: 0; }

#progress-bar-wrap {
  flex: 1; height: 6px; background: var(--border); border-radius: 99px; overflow: hidden;
}
#progress-bar { height: 100%; background: var(--primary); border-radius: 99px; transition: width .4s ease; width: 0%; }
#slide-counter { font-size: 13px; color: var(--text-dim); flex-shrink: 0; }

#slide-area {
  flex: 1; padding: 40px 48px; overflow-y: auto;
  font-size: 16px; line-height: 1.7; color: var(--text);
}

#slide-area h1 { font-size: 28px; font-weight: 800; margin-bottom: 20px; color: var(--text); }
#slide-area h2 { font-size: 22px; font-weight: 700; margin-bottom: 16px; }
#slide-area p  { margin-bottom: 16px; }
#slide-area ul, #slide-area ol { padding-left: 24px; margin-bottom: 16px; }
#slide-area li { margin-bottom: 8px; }

/* Quiz */
.quiz-question { margin-bottom: 24px; }
.quiz-question p { font-weight: 600; margin-bottom: 12px; }
.quiz-option {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; border-radius: 8px;
  border: 2px solid var(--border); cursor: pointer;
  margin-bottom: 8px; transition: border-color .2s, background .2s;
}
.quiz-option:hover { border-color: var(--primary); background: #eef2ff; }
.quiz-option.correct { border-color: var(--success); background: #d1fae5; }
.quiz-option.incorrect { border-color: var(--error); background: #ffe4e6; }
.quiz-feedback { margin-top: 12px; padding: 12px; border-radius: 8px; font-size: 14px; }
.quiz-feedback.correct { background: #d1fae5; color: #065f46; }
.quiz-feedback.incorrect { background: #ffe4e6; color: #9f1239; }

/* Conclusão */
.completion { text-align: center; padding: 40px; }
.completion h2 { font-size: 28px; margin-bottom: 12px; }
.completion p { color: var(--text-dim); }

#player-footer {
  padding: 16px 24px; border-top: 1px solid var(--border);
  display: flex; justify-content: space-between;
}

button {
  padding: 10px 24px; border-radius: 8px; border: none;
  font-size: 15px; font-weight: 600; cursor: pointer; transition: background .2s;
}
#btn-next { background: var(--primary); color: #fff; }
#btn-next:hover { background: var(--primary-dark); }
#btn-prev { background: var(--border); color: var(--text); }
#btn-prev:hover { background: #cbd5e1; }
button:disabled { opacity: .4; cursor: not-allowed; }
```

---

## Guia de Upload por LMS

### Moodle
```
1. Atividades → Adicionar atividade → SCORM
2. Arquivo do pacote: course.zip
3. Nota de aprovação: {course.passingScore}%
4. Salvar e exibir
```

### Hotmart
```
1. Produto → Módulos → Adicionar aula → SCORM
2. Enviar arquivo: course.zip
3. Configurar conclusão automática
```

### Teachable
```
1. Curriculum → Add Lesson → SCORM/xAPI
2. Upload: course.zip
```

### Canvas LMS
```
1. Modules → Add item → External Tool → SCORM
2. ou: Import → Common Cartridge / SCORM
```

---

## Onde Salvar (EduSquad)

```
squads/{nome}/output/{run_id}/{step}/
  scorm/               ← pasta com todos os arquivos
    course.zip         ← gerado após npm install && node build.js
```

---

## Checklist para Novo SCORM

- [ ] Definir metadados: `id`, `title`, `language`, `duration`, `passingScore`
- [ ] Criar array `slides` com todos os slides de conteúdo
- [ ] Incluir ao menos 1 slide de quiz se houver avaliação
- [ ] Gerar `imsmanifest.xml` com todos os `<file>` referenciados
- [ ] Gerar `content/index.html` com array `SLIDES` inline
- [ ] Gerar `assets/scorm.js`, `assets/progress.js`, `assets/style.css`
- [ ] Gerar `build.js` e `package.json` com dependência `archiver`
- [ ] Gerar `README.md` com instruções de build e upload
- [ ] Substituir `PASSING_SCORE` em `progress.js` pelo valor de `course.passingScore`
- [ ] Testar navegação (prev/next) e conclusão standalone (sem LMS)
- [ ] Rodar `npm install && node build.js` para gerar `course.zip`
- [ ] Validar no SCORM Cloud ou diretamente no LMS
