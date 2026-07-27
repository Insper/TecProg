---
title: "Exercícios — Aula 19 — Backtracking com restrições"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Antes de podar, escreva a hipótese que torna a poda correta.
- Diferencie poda de heurística: poda preserva corretude; heurística pode falhar.
- Em simulações, conte chamadas visitadas e ramos cortados.

## Exercício 1 — Soma-alvo com poda

Simule o algoritmo para `v = [4, 7, 2, 9]` e `alvo = 11`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{EXISTE-SOMA}.}
\Input{array v, int alvo}
\Output{boolean}
\BlankLine
\BlankLine
\Return{\texttt{BUSCAR}(v, 0, 0, alvo)}\;
\BlankLine
\caption{ExisteSoma}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCAR}.}
\Input{array v, int i, int soma, int alvo}
\Output{boolean}
\BlankLine
\BlankLine
\If{$soma = alvo$}{
    \Return{\textbf{true}}\;
\BlankLine
}
\If{$soma > alvo$}{
    \Return{\textbf{false}}\;
\BlankLine
}
\If{$i = \texttt{TAMANHO}(v)$}{
    \Return{\textbf{false}}\;
\BlankLine
}
\If{$\texttt{BUSCAR}(v, i + 1, soma + v[i], alvo) = \textbf{true}$}{
    \Return{\textbf{true}}\;
\BlankLine
}
\Return{\texttt{BUSCAR}(v, i + 1, soma, alvo)}\;
\caption{Buscar}
\end{algorithm}

Preencha a árvore de chamadas até o algoritmo retornar.

```text
BUSCAR(i=0, soma=0)
|-- inclui 4 -> BUSCAR(i=1, soma=4)
|   |-- inclui 7 -> ...
|   `-- não inclui 7 -> ...
`-- não inclui 4 -> ...
```

Marque cada ramo como:

- encontrou solução;
- podado por `soma > alvo`;
- terminou sem solução.

Qual subconjunto soma `11`?

[break]

## Exercício 2 — Quando a poda é inválida

A poda `soma > alvo` depende de todos os valores restantes serem positivos.

Considere `v = [8, -3, 2]` e `alvo = 5`.

1. Se começamos incluindo `8`, a soma parcial passa do alvo?
2. Ainda existe forma de voltar para `5` usando um número negativo?
3. Qual solução existe?
4. Por que podar quando `soma > alvo` seria incorreto nesse caso?

Agora crie outro exemplo com números negativos em que essa poda descartaria uma solução válida.

[break]

## Exercício 3 — Mochila 0/1 em três itens

Temos capacidade `C = 5`.

| item | peso | valor |
| ---: | ---: | ----: |
| 0 | 3 | 7 |
| 1 | 4 | 9 |
| 2 | 2 | 4 |

Simule a árvore de decisões incluir/não incluir.

Estado da chamada:

```text
(i, peso_atual, valor_atual, escolhidos)
```

Use a poda:

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\If{$peso\_atual > C$}{
    \Return{}\;
}
\caption{PodaPorCapacidade}
\end{algorithm}

Preencha:

| folha ou poda | escolhidos | peso | valor | válida? |
| --- | --- | ---: | ---: | --- |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

Qual é a melhor solução válida?

[break]

## Exercício 4 — Atualização da melhor solução

Complete o pseudocódigo da mochila para atualizar a melhor solução quando chega ao caso base.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{MOCHILA}.}
\Input{arrays pesos e values, int capacidade}
\Output{melhor solução}
\BlankLine
\BlankLine
$melhor\_valor \gets 0$\;
$melhor\_escolha \gets \texttt{ARRAY-DE-FALSOS}(\texttt{TAMANHO}(pesos))$\;
$escolha\_atual \gets \texttt{ARRAY-DE-FALSOS}(\texttt{TAMANHO}(pesos))$\;
\BlankLine
$\texttt{BUSCAR-MOCHILA}(0, 0, 0)$\;
\Return{(melhor\_valor, melhor\_escolha)}\;
\BlankLine
\caption{Mochila}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCAR-MOCHILA}.}
\Input{int i, int peso\_atual, int valor\_atual}
\Output{none}
\BlankLine
\BlankLine
\If{$peso\_atual > capacidade$}{
    \Return{}\;
\BlankLine
}
\If{$i = \texttt{TAMANHO}(pesos)$}{
    \If{$\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$}{
        $melhor\_valor \gets \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$\;
        $melhor\_escolha \gets \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$\;
    }
    \Return{}\;
\BlankLine
}
$escolha\_atual[i] \gets \textbf{true}$\;
$\texttt{BUSCAR-MOCHILA}(i + 1, peso\_atual + pesos[i], valor\_atual + valores[i])$\;
\BlankLine
$escolha\_atual[i] \gets \textbf{false}$\;
$\texttt{BUSCAR-MOCHILA}(i + 1, peso\_atual, valor\_atual)$\;
\caption{BuscarMochila}
\end{algorithm}

Responda:

1. Por que `melhor_escolha` precisa receber uma cópia?
2. Por que a melhor solução só é atualizada se a solução atual é válida?
3. O que deve acontecer antes de iniciar uma nova execução do algoritmo?

[break]

## Exercício 5 — Heurística versus busca completa

Considere a mochila com capacidade `10`.

| item | peso | valor |
| ---: | ---: | ----: |
| 0 | 9 | 19 |
| 1 | 5 | 10 |
| 2 | 5 | 10 |
| 3 | 4 | 7 |

Compare duas estratégias.

**Heurística:** escolher primeiro o item de maior valor que ainda cabe.

**Busca completa:** explorar incluir/não incluir todos os itens, respeitando a capacidade.

Responda:

1. Qual solução a heurística encontra?
2. Qual é o valor dessa solução?
3. Qual solução ótima a busca completa encontra?
4. Qual é o valor ótimo?
5. Por que a heurística não é garantia de ótimo?

[break]

## Exercício 6 — Medindo chamadas com e sem poda

Compare duas versões de soma-alvo para `v = [3, 4, 5, 6]` e `alvo = 9`.

**Versão A:** explora todos os ramos até `i = TAMANHO(v)`.

**Versão B:** corta quando `soma > alvo`.

Preencha a tabela.

| versão | chamadas visitadas | ramos podados | encontrou solução? |
| --- | -----------------: | ------------: | --- |
| sem poda | | | |
| com poda `soma > alvo` | | | |

Depois responda:

1. A poda muda o conjunto de soluções corretas para valores positivos?
2. A poda garante que o pior caso deixa de ser exponencial?
3. Em que tipo de entrada essa poda tende a ajudar mais?
4. Qual hipótese precisa aparecer na justificativa?

## Créditos e reaproveitamento

Exercícios adaptados de heurísticas da mochila, mochila por backtracking, estado parcial, incluir/não incluir e atualização de melhor solução dos handouts antigos devem indicar:

> Adaptado de material de Igor Montagner para a disciplina Técnicas de Programação.

Definições conceituais externas opcionais: Knapsack, <https://en.wikipedia.org/wiki/Knapsack_problem>, e Subset Sum, <https://en.wikipedia.org/wiki/Subset_sum_problem>.
