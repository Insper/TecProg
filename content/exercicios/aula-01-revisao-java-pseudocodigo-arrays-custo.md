---
title: "Exercícios — Aula 01 — Revisão, pseudocódigo, arrays e contagem de operações"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Leia o pseudocódigo antes de executar mentalmente.
- Para cada simulação, acompanhe índices, acumuladores, comparações e saída.
- Só escreva sua própria solução depois de conseguir prever o comportamento em entradas pequenas.

## Exercício 1 — Simulação de maior nota e aprovados

Simule o algoritmo abaixo para `notas = [7.5, 4.0, 9.0, 6.0, 5.5]`.

Preencha a tabela com os valores de `i`, `nota`, `maior`, `aprovados` e `comparacoes` ao final de cada repetição.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{RELATORIO-NOTAS}.}
\Input{array notas}
\Output{maior nota, quantidade de aprovados e quantidade de comparações}
\BlankLine
\BlankLine
\If{$\texttt{TAMANHO}(notas) = 0$}{
    \Return{(-1, 0, 0)}\;
\BlankLine
}
$maior \gets notas[0]$\;
$aprovados \gets 0$\;
$comparacoes \gets 0$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(notas) - 1$}{
    $comparacoes \gets comparacoes + 1$\;
    \If{$notas[i] \ge  6.0$}{
        $aprovados \gets aprovados + 1$\;
\BlankLine
    }
    \If{$i > 0$}{
        $comparacoes \gets comparacoes + 1$\;
        \If{$notas[i] > maior$}{
            $maior \gets notas[i]$\;
\BlankLine
        }
    }
}
\Return{(maior, aprovados, comparacoes)}\;
\caption{RelatorioNotas}
\end{algorithm}

| i | notas[i] | maior ao final | aprovados ao final | comparacoes ao final |
| -: | -------: | -------------: | -----------------: | -------------------: |
| 0 | | | | |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

Qual é a saída final?

[break]

## Exercício 2 — Divisibilidade

Simule o algoritmo abaixo para `N = 7`, `N = 22`, `N = 150` e `N = 9`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{DIVISIBILIDADE}.}
\Input{int N}
\Output{string}
\BlankLine
\BlankLine
\If{$N \bmod 2 = 0 \textbf{ and } N \bmod 3 \ne  0$}{
    \Return{"Ins"}\;
\BlankLine
}
\If{$N \bmod 2 \ne  0 \textbf{ and } N \bmod 3 = 0$}{
    \Return{"per"}\;
\BlankLine
}
\If{$N \bmod 2 = 0 \textbf{ and } N \bmod 3 = 0$}{
    \Return{"Insper"}\;
\BlankLine
}
\Return{""}\;
\caption{Divisibilidade}
\end{algorithm}

| N | primeira condição | segunda condição | terceira condição | retorno |
| -: | --- | --- | --- | --- |
| 7 | | | | |
| 22 | | | | |
| 150 | | | | |
| 9 | | | | |

Depois da simulação, explique por que a ordem das condições não muda o resultado neste algoritmo.

[break]

## Exercício 3 — Índice fora do array

O pseudocódigo abaixo tenta somar todos os elementos, mas contém um erro de índice.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{SOMA-COM-ERRO}.}
\Input{array v}
\Output{number}
\BlankLine
\BlankLine
$soma \gets 0$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(v)$}{
    $soma \gets soma + v[i]$\;
\BlankLine
}
\Return{soma}\;
\caption{SomaComErro}
\end{algorithm}

1. Simule para `v = [4, 8, 1]` até o ponto em que o problema aparece.
2. Qual índice inválido é acessado?
3. Reescreva apenas a linha do `PARA` corrigida.

[break]

## Exercício 4 — Soma e média

Escreva pseudocódigo para o algoritmo `MEDIA-ARRAY`.

Contrato:

- entrada: array `v` de números;
- saída: média dos elementos;
- se `v` estiver vazio, retorne `0`.

Antes de escrever a versão final, teste sua ideia com:

- `v = []`;
- `v = [10]`;
- `v = [4, 6, 8]`.

[break]

## Exercício 5 — Contagem de operações

Considere o algoritmo:

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONTA-PARES}.}
\Input{array v}
\Output{int}
\BlankLine
\BlankLine
$pares \gets 0$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(v) - 1$}{
    \If{$v[i] \bmod 2 = 0$}{
        $pares \gets pares + 1$\;
\BlankLine
    }
}
\Return{pares}\;
\caption{ContaPares}
\end{algorithm}

Para um array de tamanho `n`, responda:

1. Quantas vezes a condição `v[i] MOD 2 = 0` é avaliada?
2. Essa quantidade depende dos valores dentro do array?
3. O custo cresce de forma constante, linear ou quadrática?

[break]

## Exercício 6 — Um laço ou dois laços

Os dois algoritmos abaixo trabalham com um array de tamanho `n`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{A}.}
\Input{array v}
\Output{int}
\BlankLine
\BlankLine
$total \gets 0$\;
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(v) - 1$}{
    $total \gets total + v[i]$\;
}
\Return{total}\;
\caption{A}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{B}.}
\Input{array v}
\Output{boolean}
\BlankLine
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(v) - 1$}{
    \For{$j \gets i + 1 \textbf{ to } \texttt{TAMANHO}(v) - 1$}{
        \If{$v[i] = v[j]$}{
            \Return{\textbf{true}}\;
\BlankLine
        }
    }
}
\Return{\textbf{false}}\;
\caption{B}
\end{algorithm}

1. Qual algoritmo faz uma quantidade de trabalho proporcional a `n`?
2. Qual algoritmo compara pares de posições?
3. Para `v = [1, 2, 3, 4]`, quantas comparações `v[i] = v[j]` o Algoritmo B faz?
4. Explique por que o Algoritmo B cresce mais rápido quando o array aumenta.