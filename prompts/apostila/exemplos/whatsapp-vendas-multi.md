# PASSO 1

/edusquad execute @prompts/apostila/multi-step/step-01-estrutura.md

TEMA: Venda de Serviços e Produtos pelo WhatsApp
PUBLICO_ALVO: Equipe comercial (vendedores e consultores)
DIFERENCIAIS: scripts prontos para uso imediato, foco no mercado brasileiro
INSTITUICAO: [NOME DA EMPRESA]
OUTPUT: output/apostila-whatsapp/estrutura-apostila.md

---

# PASSO 2 — repetir para N = 1 até o total de capítulos

/edusquad execute @prompts/apostila/multi-step/step-02-producao-capitulo.md

N: [N]
INPUT: output/apostila-whatsapp/estrutura-apostila.md
OUTPUT: output/apostila-whatsapp/capitulo-[N]/capitulo-[N].md

---

# PASSO 3

/edusquad execute @prompts/apostila/multi-step/step-03-revisao-consolidacao.md

INPUT: output/apostila-whatsapp/
OUTPUT: output/apostila-whatsapp/revisao-final/relatorio-revisao.md
