# Gestão Rápida · Estoque Inteligente

App da **SAKUMA Agronegócios** para o balanço e a contagem rápida de estoque — insumos,
fertilizantes e EPIs — e o acerto entre as fazendas (Lote 35, Faz. Faca, Faz. Morro Branco,
Faz. Três Riachos). Desenvolvido pela **LOP**.

O app não dá entrada nem saída: ele conta o que está na prateleira, compara com o saldo que
vem do sistema e aponta o que transferir entre as fazendas, o que baixar e o que lançar.

## Módulos

| Módulo | Situação |
| --- | --- |
| Acerto | Pronto — lê a planilha `Acerto_Insumos` no próprio navegador e mostra painel, divergências, transferências sugeridas e relatório em A4 |
| Contagem | A fazer — balanço pelo celular no almoxarifado |
| Cadastros | A fazer |

## Como roda

HTML, CSS e JavaScript puro, em ES modules, sem build e sem framework. PWA instalável, que
funciona offline e envia os dados quando a internet voltar. Mesma arquitetura do app
[Gestão Rápida · Pessoas](https://github.com/sakuma-agro/gestao-rapida-pessoas): uma
`<section class="tela">` por tela, módulos declarados em `js/acesso.js` e service worker com
`VERSAO` a subir a cada publicação.

## Pastas

```
index.html              tela inicial, menu e as seções de cada tela
manifest.webmanifest    PWA
sw.js                   service worker (subir a VERSAO a cada publicação)
css/app.css             padrão visual do Gestão Rápida
css/estoque.css         telas do estoque
js/app.js               partida do app e navegação
js/acesso.js            declaração dos módulos
js/planilha.js          leitura da planilha dentro do navegador
js/acerto.js            telas do acerto
js/acerto-motor.js      motor do acerto
img/                    marca SAKUMA e assinatura LOP
icons/                  ícones do PWA
```

## Padrão visual

Verde `#84BD00`, marrom `#744F28`, cinza `#51534A`, Arial, sem preto. A logo da SAKUMA é usada
exatamente como o arquivo veio. A LOP assina como desenvolvedora, gravada a laser na barra do
app e uma vez só no pé do documento impresso.

---

Responsável: Guilherme Lopes
