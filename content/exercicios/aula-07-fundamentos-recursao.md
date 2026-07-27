---
title: "Exercícios — Aula 07 — Fundamentos de recursão"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Leia o pseudocódigo antes de executar mentalmente.
- Em simulações recursivas, registre chamadas, casos base e retornos.
- Para cada algoritmo, procure responder: qual é o caso base, qual é o passo recursivo e qual é o progresso?

## Exercício 1 — Simulação da pilha de chamadas

Simule o algoritmo para `n = 4`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{SOMA-ATE}.}
\Input{int n}
\Output{int}
\BlankLine
\BlankLine
\If{$n = 0$}{
    \Return{0}\;
\BlankLine
}
$resposta \gets n + \texttt{SOMA-ATE}(n - 1)$\;
\Return{resposta}\;
\caption{SomaAte}
\end{algorithm}

Preencha a tabela de chamadas.

| chamada | ainda precisa calcular | próxima chamada |
| --- | --- | --- |
| `SOMA-ATE(4)` | `4 + SOMA-ATE(3)` | |
| `SOMA-ATE(3)` | | |
| `SOMA-ATE(2)` | | |
| `SOMA-ATE(1)` | | |
| `SOMA-ATE(0)` | | |

Agora preencha a tabela de retornos.

| retorno de | valor retornado | cálculo que volta para a chamada anterior |
| --- | ---: | --- |
| `SOMA-ATE(0)` | | |
| `SOMA-ATE(1)` | | |
| `SOMA-ATE(2)` | | |
| `SOMA-ATE(3)` | | |
| `SOMA-ATE(4)` | | |

Qual é o resultado final?

[break]

## Exercício 2 — Caso base, passo recursivo e progresso

Para cada algoritmo, identifique caso base, passo recursivo e progresso.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONTAGEM}.}
\Input{int n}
\Output{none}
\BlankLine
\BlankLine
\If{$n = 0$}{
    $\texttt{IMPRIMIR}("fim")$\;
    \Return{}\;
\BlankLine
}
$\texttt{IMPRIMIR}(n)$\;
$\texttt{CONTAGEM}(n - 1)$\;
\caption{Contagem}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{FATORIAL}.}
\Input{int n}
\Output{int}
\BlankLine
\BlankLine
\If{$n = 0$}{
    \Return{1}\;
\BlankLine
}
\Return{n * \texttt{FATORIAL}(n - 1)}\;
\caption{Fatorial}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{DOBROS}.}
\Input{int n}
\Output{int}
\BlankLine
\BlankLine
\If{$n = 0$}{
    \Return{1}\;
\BlankLine
}
\Return{2 * \texttt{DOBROS}(n - 1)}\;
\caption{Dobros}
\end{algorithm}

| Algoritmo | Caso base | Passo recursivo | Progresso |
| --- | --- | --- | --- |
| `CONTAGEM` | | | |
| `FATORIAL` | | | |
| `DOBROS` | | | |

Para quais entradas esses algoritmos terminam?

[break]

## Exercício 3 — Recursão sem progresso

O algoritmo abaixo tenta somar de `1` até `n`, mas está incorreto.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{SOMA-ATE-COM-ERRO}.}
\Input{int n}
\Output{int}
\BlankLine
\BlankLine
\If{$n = 0$}{
    \Return{0}\;
\BlankLine
}
\Return{n + \texttt{SOMA-ATE-COM-ERRO}(n)}\;
\caption{SomaAteComErro}
\end{algorithm}

1. Qual é o caso base?
2. Para `n = 3`, qual chamada é feita depois da primeira?
3. Por que essa chamada não aproxima o algoritmo do caso base?
4. Reescreva o algoritmo corrigido.

[break]

## Exercício 4 — Potência recursiva

Escreva pseudocódigo para `POTENCIA(base, expoente)`.

Contrato:

- entrada: número `base`, inteiro `expoente`;
- o expoente sempre é maior ou igual a `0`;
- saída: `base` elevado a `expoente`.

Exemplos esperados:

- `POTENCIA(2, 0)` retorna `1`;
- `POTENCIA(2, 3)` retorna `8`;
- `POTENCIA(5, 2)` retorna `25`.

Depois de escrever, identifique:

1. caso base;
2. passo recursivo;
3. progresso;
4. número de chamadas para `POTENCIA(2, 4)`.

[break]

## Exercício 5 — Laço e recursão

Os dois algoritmos abaixo calculam a mesma soma.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{SOMA-ITERATIVA}.}
\Input{int n}
\Output{int}
\BlankLine
\BlankLine
$soma \gets 0$\;
\BlankLine
\For{$i \gets 1 \textbf{ to } n$}{
    $soma \gets soma + i$\;
\BlankLine
}
\Return{soma}\;
\caption{SomaIterativa}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{SOMA-RECURSIVA}.}
\Input{int n}
\Output{int}
\BlankLine
\BlankLine
\If{$n = 0$}{
    \Return{0}\;
\BlankLine
}
\Return{n + \texttt{SOMA-RECURSIVA}(n - 1)}\;
\caption{SomaRecursiva}
\end{algorithm}

Para `n = 5`, responda:

1. Quantas iterações o algoritmo iterativo faz?
2. Quantas chamadas o algoritmo recursivo faz, contando a chamada com `n = 0`?
3. Qual deles deixa chamadas pendentes na pilha?
4. O crescimento do tempo é constante, linear ou quadrático?
5. O crescimento da pilha na versão recursiva é constante, linear ou quadrático?

[break]

## Exercício 6 — Contando chamadas

Para cada algoritmo, determine quantas chamadas acontecem em função de `n`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONTA-UM}.}
\Input{int n}
\Output{int}
\BlankLine
\BlankLine
\If{$n = 0$}{
    \Return{0}\;
\BlankLine
}
\Return{1 + \texttt{CONTA-UM}(n - 1)}\;
\caption{ContaUm}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONTA-DOIS}.}
\Input{int n}
\Output{int}
\BlankLine
\BlankLine
\If{$n \le  0$}{
    \Return{0}\;
\BlankLine
}
\Return{1 + \texttt{CONTA-DOIS}(n - 2)}\;
\caption{ContaDois}
\end{algorithm}

Complete a tabela.

| n | chamadas de `CONTA-UM` | chamadas de `CONTA-DOIS` |
| -: | ---------------------: | -----------------------: |
| 0 | | |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |

Depois, classifique o custo de cada algoritmo em Big-O.