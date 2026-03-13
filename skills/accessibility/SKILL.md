---
name: Accessibility
description: Garante que materiais educacionais sejam acessíveis e inclusivos — aplica WCAG 2.1, diretrizes para deficiências visuais, auditivas, motoras e cognitivas, e princípios do Design Universal para Aprendizagem (DUA/UDL). Use quando o usuário mencionar "acessibilidade", "inclusão", "WCAG", "Libras", "audiodescrição", "leitores de tela", "DUA", "UDL", "diversidade", "estudantes com deficiência" ou quiser tornar um material mais acessível.
type: prompt
version: 1.0.0
categories: [acessibilidade, inclusao, wcag, dua, diversidade]
---

# Accessibility Skill — Educação Acessível e Inclusiva

Esta skill aplica diretrizes de acessibilidade digital e princípios de inclusão para garantir que materiais educacionais alcancem todos os aprendizes, independentemente de deficiências, limitações sensoriais ou diferenças cognitivas.

---

## Frameworks de Referência

### WCAG 2.1 — Web Content Accessibility Guidelines

4 princípios fundamentais (POUR):

| Princípio | O que significa |
|-----------|----------------|
| **Perceptível** | Informação apresentada de formas que todos possam perceber |
| **Operável** | Interface navegável por diferentes meios (teclado, voz, switch) |
| **Compreensível** | Conteúdo e operações inteligíveis |
| **Robusto** | Compatível com tecnologias assistivas atuais e futuras |

**Níveis de conformidade:**
- **A** — mínimo essencial (obrigatório)
- **AA** — padrão recomendado para a maioria dos contextos
- **AAA** — excelência em acessibilidade

---

### DUA / UDL — Design Universal para Aprendizagem

3 princípios para remover barreiras ao aprendizado:

| Princípio | Estratégia | Exemplos práticos |
|-----------|-----------|-------------------|
| **Múltiplos meios de representação** | Apresente o conteúdo de formas variadas | Texto + áudio + vídeo + infográfico |
| **Múltiplos meios de ação e expressão** | Permita que o aprendiz demonstre o conhecimento de formas diferentes | Prova escrita + oral + projeto + portfólio |
| **Múltiplos meios de engajamento** | Ofereça opções de motivação e desafio | Escolha de tema, ritmo próprio, gamificação |

---

## Diretrizes por Tipo de Material

### Textos e Documentos (PDF, apostilas, handouts)

**Estrutura:**
- Use cabeçalhos hierárquicos (H1 → H2 → H3) — nunca pule níveis
- Listas com marcadores para itens não-sequenciais; numeradas para passos
- Parágrafos curtos (3-5 linhas máximo)
- Uma ideia por parágrafo

**Tipografia:**
- Fonte sans-serif para leitura digital (Inter, Open Sans, Verdana)
- Tamanho mínimo: 12pt impresso / 16px tela
- Espaçamento de linha: mínimo 1.5×
- Não justificar texto (dificulta leitores com dislexia)
- Negrito para ênfase — nunca só cor ou itálico

**Contraste de cor (WCAG AA):**
- Texto normal: mínimo 4.5:1
- Texto grande (18pt+): mínimo 3:1
- Nunca transmitir informação apenas por cor (ex: "o item em vermelho é incorreto")

**Imagens:**
- Alt text descritivo para imagens informativas
- Imagens decorativas: `alt=""` (vazias)
- Texto em imagens: evitar; se necessário, repetir no corpo do documento
- Gráficos: descrever os dados no texto, não só na figura

**Links:**
- Texto descritivo: "Acesse o guia de atividades" (não "clique aqui")
- Indicar quando o link abre nova aba

---

### Vídeos e Áudios

**Legendas:**
- Legendas fechadas (CC) em todos os vídeos — mínimo nível A (WCAG 1.2.2)
- Sincronizadas com o áudio, identificando quem fala
- Pontuação e sons importantes entre colchetes: [música suave] [aplausos]
- Velocidade de leitura máxima: 17 caracteres/segundo

**Audiodescrição (AD):**
- Narrar o que é visualmente relevante e não está descrito na fala
- Inserir nas pausas naturais do áudio
- AD estendida quando o áudio original não deixa espaço suficiente

**Transcrição:**
- Texto completo do conteúdo falado + descrição de elementos visuais relevantes
- Disponível em arquivo separado ou abaixo do vídeo

**Boas práticas de produção:**
- Fale de frente para a câmera (leitura labial)
- Iluminação adequada no rosto do apresentador
- Contraste entre apresentador e fundo
- Evite fundos muito movimentados

---

### Apresentações (Slides)

- Mínimo 24pt de fonte nos slides
- Contraste adequado entre texto e fundo (4.5:1)
- Não transmitir informação só por cor
- Ordem de leitura lógica no PowerPoint/Google Slides (painel de seleção)
- Imagens com alt text no arquivo fonte
- Evitar animações que piscam mais de 3 vezes/segundo (pode desencadear crises epilépticas — WCAG 2.3.1)
- PDF exportado com tags de acessibilidade

---

### E-learning (SCORM / HTML)

- Navegação completa por teclado (Tab, Enter, setas)
- Foco visível (outline de foco nunca removido via CSS)
- Compatibilidade com JAWS, NVDA, VoiceOver (leitores de tela)
- `aria-label` e `role` em elementos interativos
- Formulários com labels explícitos (`<label for="id">`)
- Mensagens de erro descritivas (não apenas cor vermelha)
- Timeout avisado e estendível (WCAG 2.2.1)
- Vídeos com controles de play/pause acessíveis por teclado

**Atributos ARIA essenciais:**
```html
<!-- Botão com ação não óbvia pelo texto -->
<button aria-label="Avançar para o próximo módulo">→</button>

<!-- Região de conteúdo dinâmico -->
<div role="status" aria-live="polite">Questão 3 de 10</div>

<!-- Imagem informativa -->
<img src="grafico.png" alt="Gráfico de barras mostrando crescimento de 40% em 2025">

<!-- Imagem decorativa -->
<img src="decoracao.png" alt="">
```

---

### Quizzes e Avaliações

- Instruções claras antes das questões
- Tempo suficiente — ou sem limite (WCAG 2.2.1)
- Feedback em texto, não apenas cor
- Alternativas com tamanho de clique adequado (mínimo 44×44px — WCAG 2.5.5)
- Evitar dependência de arrastar-e-soltar como único modo de interação
- Permitir revisão antes de enviar

---

## Libras e Surdez

**Diretrizes para materiais com público surdo ou com deficiência auditiva:**

- Legendas em todos os vídeos (obrigatório)
- Intérprete de Libras em vídeo — janela no canto inferior direito, mínimo 1/8 da tela
- Texto como formato primário (não apenas áudio)
- Glosas em Libras para termos técnicos quando disponível
- Vocabulário visual: imagens, infográficos e esquemas reforçam a compreensão

---

## Dislexia e Neurodiversidade

**Ajustes que beneficiam aprendizes com dislexia, TDAH e TEA:**

| Ajuste | Implementação |
|--------|--------------|
| Fonte amigável | OpenDyslexic, Arial, Verdana — evitar serifadas |
| Espaçamento | Letra: 0.12em · Palavra: 0.16em · Linha: 1.5× |
| Texto curto | Parágrafos de 2-3 linhas máximo |
| Fundo | Creme (#FAF0E6) ou cinza claro em vez de branco puro |
| Divisão de conteúdo | Microlearning — blocos pequenos com uma ideia cada |
| Instruções | Passo a passo numerado, sem ambiguidade |
| Tempo | Nenhuma atividade com contagem regressiva estressante |

---

## Checklist de Acessibilidade por Formato

### Para qualquer material

- [ ] Contraste de cor verificado (ferramenta: WebAIM Contrast Checker)
- [ ] Informação não transmitida apenas por cor
- [ ] Linguagem clara e objetiva (evitar jargões sem explicação)
- [ ] Estrutura lógica e hierárquica (títulos, listas, tabelas)
- [ ] Alternativa em texto para todo conteúdo não-textual

### Para vídeos

- [ ] Legendas sincronizadas
- [ ] Transcrição disponível
- [ ] Audiodescrição (se necessário)
- [ ] Controles acessíveis por teclado

### Para HTML/SCORM

- [ ] Navegável completamente por teclado
- [ ] Compatível com leitor de tela (NVDA ou VoiceOver)
- [ ] `alt` em todas as imagens
- [ ] `aria-label` em elementos interativos sem texto
- [ ] Sem conteúdo piscante (>3 flashes/segundo)

### Para PDFs

- [ ] Tags de acessibilidade ativas
- [ ] Ordem de leitura correta
- [ ] Imagens com alt text
- [ ] Formulários com campos etiquetados

---

## Ferramentas Recomendadas

| Ferramenta | Para quê | Gratuita? |
|------------|---------|-----------|
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) | Verificar contraste de cor | Sim |
| [WAVE](https://wave.webaim.org/) | Auditoria de acessibilidade web | Sim |
| [axe DevTools](https://www.deque.com/axe/) | Teste automatizado WCAG | Freemium |
| [NVDA](https://www.nvaccess.org/) | Leitor de tela (Windows) | Sim |
| [VoiceOver](https://support.apple.com/pt-br/guide/voiceover/welcome/mac) | Leitor de tela (Mac/iOS) | Nativo |
| [Adobe Acrobat](https://adobe.com) | Verificar acessibilidade de PDF | Pago |
| [Subtitle Edit](https://nikse.dk/subtitleedit) | Criar/editar legendas | Sim |

---

## Legislação Brasileira de Referência

| Lei / Decreto | O que determina |
|---------------|----------------|
| **Lei 13.146/2015** — Lei Brasileira de Inclusão | Direito à acessibilidade em produtos e serviços, incluindo educação |
| **Decreto 5.296/2004** | Normas gerais e critérios para acessibilidade |
| **ABNT NBR 9050** | Norma de acessibilidade de construção e comunicação |
| **Portaria MEC 3/2007** | Acessibilidade em materiais pedagógicos do MEC |

---

## Integração com Outras Skills

| Skill | Integração com Acessibilidade |
|-------|------------------------------|
| `scorm-builder` | ARIA, navegação por teclado, contraste no player HTML |
| `quiz-builder` | Tempo adequado, feedback textual, área de clique mínima |
| `video-script` | Instruções para AD, momentos de pausa para AD estendida |
| `canva` | Verificar contraste e alternativas textuais antes de exportar |
| `bncc` | Competência Geral 9 (Empatia) e Temas Transversais de inclusão |
