---
title: "Exercícios — Aula 17 — Introdução ao backtracking"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Leia o pseudocódigo antes de executar mentalmente.
- Em backtracking, acompanhe estado parcial, índice atual, escolha feita e desfazer.
- Quando uma solução for registrada, pense se é necessário copiar o estado parcial.

## Exercício 1 — Simulação de subconjuntos

Simule o algoritmo para `v = [1, 2, 3]`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{GERAR-SUBCONJUNTOS}.}
\Input{array v}
\Output{list respostas}
\BlankLine
\BlankLine
$respostas \gets \texttt{LISTA-VAZIA}()$\;
$atual \gets \texttt{LISTA-VAZIA}()$\;
$\texttt{BACKTRACK}(v, 0, atual, respostas)$\;
\Return{respostas}\;
\BlankLine
\caption{GerarSubconjuntos}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BACKTRACK}.}
\Input{array v, int i, list atual, list respostas}
\Output{none}
\BlankLine
\BlankLine
\If{$i = \texttt{TAMANHO}(v)$}{
    $\texttt{ADICIONAR-COPIA}(respostas, atual)$\;
    \Return{}\;
\BlankLine
}
$\texttt{BACKTRACK}(v, i + 1, atual, respostas)$\;
\BlankLine
$\texttt{ADICIONAR}(atual, v[i])$\;
$\texttt{BACKTRACK}(v, i + 1, atual, respostas)$\;
$\texttt{REMOVER-ULTIMO}(atual)$\;
\caption{Backtrack}
\end{algorithm}

Preencha a árvore de decisões. Use `N` para “não incluir” e `S` para “incluir”.

```text
i=0, atual=[]
|-- N 1 -> i=1, atual=[]
|   |-- N 2 -> ...
|   `-- S 2 -> ...
`-- S 1 -> i=1, atual=[1]
    |-- N 2 -> ...
    `-- S 2 -> ...
```

Agora liste, na ordem em que o algoritmo registra, todos os subconjuntos adicionados a `respostas`.

[break]

## Exercício 2 — Estado, candidatos e caso base

Para o algoritmo do Exercício 1, complete a tabela.

| Pergunta | Resposta |
| --- | --- |
| Qual é o estado parcial? | |
| Qual variável indica a decisão atual? | |
| Quais são os candidatos em cada nível? | |
| Qual é o caso base? | |
| O que é registrado como resposta? | |
| Qual operação desfaz uma escolha? | |

Depois responda:

1. Por que cada elemento gera duas possibilidades?
2. O algoritmo gera subconjuntos repetidos?
3. A ordem dos subconjuntos registrados muda se a chamada “incluir” vier antes da chamada “não incluir”?

[break]

## Exercício 3 — Falta de desfazer

O pseudocódigo abaixo esquece de desfazer a escolha.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BACKTRACK-COM-ERRO}.}
\Input{array v, int i, list atual, list respostas}
\Output{none}
\BlankLine
\BlankLine
\If{$i = \texttt{TAMANHO}(v)$}{
    $\texttt{ADICIONAR-COPIA}(respostas, atual)$\;
    \Return{}\;
\BlankLine
}
$\texttt{BACKTRACK-COM-ERRO}(v, i + 1, atual, respostas)$\;
\BlankLine
$\texttt{ADICIONAR}(atual, v[i])$\;
$\texttt{BACKTRACK-COM-ERRO}(v, i + 1, atual, respostas)$\;
\caption{BacktrackComErro}
\end{algorithm}

1. Simule para `v = [1, 2]`.
2. Quais respostas são registradas?
3. Qual elemento fica indevidamente em `atual` ao voltar para outro ramo?
4. Reescreva as últimas três linhas com o desfazer correto.

[break]

## Exercício 4 — Falta de cópia

O algoritmo abaixo registra `atual` diretamente em `respostas`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BACKTRACK-SEM-COPIA}.}
\Input{array v, int i, list atual, list respostas}
\Output{none}
\BlankLine
\BlankLine
\If{$i = \texttt{TAMANHO}(v)$}{
    $\texttt{ADICIONAR}(respostas, atual)$\;
    \Return{}\;
\BlankLine
}
$\texttt{BACKTRACK-SEM-COPIA}(v, i + 1, atual, respostas)$\;
$\texttt{ADICIONAR}(atual, v[i])$\;
$\texttt{BACKTRACK-SEM-COPIA}(v, i + 1, atual, respostas)$\;
$\texttt{REMOVER-ULTIMO}(atual)$\;
\caption{BacktrackSemCopia}
\end{algorithm}

Responda:

1. Por que `atual` continua mudando depois de ser adicionada a `respostas`?
2. O que significa registrar uma “fotografia” da solução?
3. Qual linha deve ser trocada para evitar o problema?
4. Escreva a versão corrigida do caso base.

[break]

## Exercício 5 — Subconjuntos com soma par

Escreva pseudocódigo para gerar apenas subconjuntos cuja soma é par.

Contrato:

- entrada: array `v` de inteiros;
- saída: lista de subconjuntos com soma par;
- use backtracking com decisões incluir/não incluir;
- carregue `soma_atual` como parte do estado;
- registre uma cópia de `atual` apenas se `soma_atual MOD 2 = 0`.

Teste com:

- `v = [1, 2, 3]`;
- `v = [2, 4]`;
- `v = [1]`.

[break]

## Exercício 6 — Número de folhas

Complete a tabela para a geração de subconjuntos.

| n | escolhas por elemento | número de folhas | número de subconjuntos |
| -: | --------------------: | ----------------: | ---------------------: |
| 0 | | | |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

Depois responda:

1. Por que a quantidade de folhas é `2^n`?
2. Qual é a profundidade máxima da recursão?
3. Por que gerar todas as respostas já custa tempo exponencial?

## Créditos e reaproveitamento

Exercícios adaptados de ideias dos handouts antigos de backtracking, árvore de decisões e mochila devem indicar:

> Adaptado de material de Igor Montagner para a disciplina Técnicas de Programação.
