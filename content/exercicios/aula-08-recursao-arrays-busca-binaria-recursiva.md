---
title: "Exercícios — Aula 08 — Recursão em arrays e busca binária recursiva"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Em recursão com arrays, o índice ou intervalo faz parte do estado.
- Nas simulações, registre parâmetros da chamada, caso base, retorno e chamadas pendentes.
- Para busca binária recursiva, mantenha a pré-condição: o array está ordenado.

## Exercício 1 — Soma recursiva em array

Simule o algoritmo para `v = [4, 7, 2]` e `i = 0`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{SOMA-A-PARTIR}.}
\Input{array v, int i}
\Output{int}
\BlankLine
\BlankLine
\If{$i = \texttt{TAMANHO}(v)$}{
    \Return{0}\;
\BlankLine
}
\Return{v[i] + \texttt{SOMA-A-PARTIR}(v, i + 1)}\;
\caption{SomaAPartir}
\end{algorithm}

Preencha a tabela de chamadas.

| chamada | valor de `i` | expressão pendente | próxima chamada |
| --- | -: | --- | --- |
| `SOMA-A-PARTIR(v, 0)` | 0 | `4 + SOMA-A-PARTIR(v, 1)` | |
| `SOMA-A-PARTIR(v, 1)` | | | |
| `SOMA-A-PARTIR(v, 2)` | | | |
| `SOMA-A-PARTIR(v, 3)` | | | |

Preencha a tabela de retornos.

| retorno de | valor retornado |
| --- | ---: |
| `SOMA-A-PARTIR(v, 3)` | |
| `SOMA-A-PARTIR(v, 2)` | |
| `SOMA-A-PARTIR(v, 1)` | |
| `SOMA-A-PARTIR(v, 0)` | |

Qual é o resultado de `SOMA-A-PARTIR(v, 0)`?

[break]

## Exercício 2 — Busca linear recursiva

Escreva pseudocódigo para `BUSCA-LINEAR-RECURSIVA`.

Contrato:

- entrada: array `v`, valor `alvo`;
- saída: último índice em que `alvo` aparece;
- se o alvo não aparece, retorne `-1`;
- use um algoritmo auxiliar com o índice atual.

Esqueleto sugerido:

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCA-LINEAR-RECURSIVA}.}
\Input{array v, value alvo}
\Output{int}
\BlankLine
\BlankLine
\Return{\texttt{BUSCA-A-PARTIR}(v, alvo, v.length - 1)}\;
\BlankLine
\caption{BuscaLinearRecursiva}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCA-A-PARTIR}.}
\Input{array v, value alvo, int i}
\Output{int}
\BlankLine
\BlankLine
$...$\;
\caption{BuscaAPartir}
\end{algorithm}

Teste com:

- `v = [8, 3, 5, 3]`, `alvo = 8`;
- `v = [8, 3, 5, 3]`, `alvo = 3`;
- `v = [8, 3, 5, 3]`, `alvo = 9`;
- `v = []`, `alvo = 8`.

[break]

## Exercício 3 — Busca binária recursiva

Simule a busca por `21` em:

`v = [2, 5, 8, 12, 16, 21, 27]`

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCA-BINARIA-RECURSIVA}.}
\Input{array ordenado v, value alvo}
\Output{índice do alvo ou -1}
\BlankLine
\BlankLine
\Return{\texttt{BUSCA-INTERVALO}(v, alvo, 0, \texttt{TAMANHO}(v) - 1)}\;
\BlankLine
\caption{BuscaBinariaRecursiva}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCA-INTERVALO}.}
\Input{array ordenado v, value alvo, int inicio, int fim}
\Output{índice do alvo ou -1}
\BlankLine
\BlankLine
\If{$inicio > fim$}{
    \Return{-1}\;
\BlankLine
}
$meio \gets inicio + \texttt{INTEIRO}((fim - inicio) / 2)$\;
\BlankLine
\If{$v[meio] = alvo$}{
    \Return{meio}\;
\BlankLine
}
\If{$v[meio] < alvo$}{
    \Return{\texttt{BUSCA-INTERVALO}(v, alvo, meio + 1, fim)}\;
\BlankLine
}
\Return{\texttt{BUSCA-INTERVALO}(v, alvo, inicio, meio - 1)}\;
\caption{BuscaIntervalo}
\end{algorithm}

| chamada | inicio | fim | meio | v[meio] | próxima chamada ou retorno |
| --- | -----: | --: | ---: | ------: | --- |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

Agora simule para `alvo = 6` e indique em que chamada o caso base é atingido.

[break]

## Exercício 4 — Completar auxiliar de contagem

Complete o pseudocódigo para contar quantas vezes `alvo` aparece no array.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONTAR-OCORRENCIAS}.}
\Input{array v, value alvo}
\Output{int}
\BlankLine
\BlankLine
\Return{\texttt{CONTAR-A-PARTIR}(v, alvo, 0)}\;
\BlankLine
\caption{ContarOcorrencias}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONTAR-A-PARTIR}.}
\Input{array v, value alvo, int i}
\Output{int}
\BlankLine
\BlankLine
\If{$\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$}{
    \Return{\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_}\;
\BlankLine
}
$resto \gets \texttt{CONTAR-A-PARTIR}(v, alvo, \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_)$\;
\BlankLine
\If{$\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$}{
    \Return{\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_}\;
\BlankLine
}
\Return{\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_}\;
\caption{ContarAPartir}
\end{algorithm}

Teste com:

- `v = [1, 2, 1, 3, 1]`, `alvo = 1`;
- `v = [1, 2, 1, 3, 1]`, `alvo = 4`;
- `v = []`, `alvo = 1`.

[break]

## Exercício 5 — Pilha de chamadas: linear versus binária

Considere um array ordenado de tamanho `16`.

1. No pior caso, quantas chamadas a busca linear recursiva pode fazer?
2. No pior caso, quantas chamadas a busca binária recursiva faz aproximadamente?
3. Qual delas tem pilha de chamadas com profundidade `O(n)`?
4. Qual delas tem pilha de chamadas com profundidade `O(log n)`?
5. Se o array dobrar de tamanho, o que acontece com a quantidade de chamadas de cada uma?

Preencha a tabela com estimativas.

| tamanho `n` | busca linear recursiva no pior caso | busca binária recursiva no pior caso |
| ----------: | ----------------------------------: | -----------------------------------: |
| 8 | | |
| 16 | | |
| 32 | | |
| 64 | | |

[break]

## Exercício 6 — Caso base incorreto

O algoritmo abaixo tenta somar um array recursivamente, mas tem um caso base perigoso.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{SOMA-A-PARTIR-COM-ERRO}.}
\Input{array v, int i}
\Output{int}
\BlankLine
\BlankLine
\If{$i = \texttt{TAMANHO}(v) - 1$}{
    \Return{0}\;
\BlankLine
}
\Return{v[i] + \texttt{SOMA-A-PARTIR-COM-ERRO}(v, i + 1)}\;
\caption{SomaAPartirComErro}
\end{algorithm}

1. Simule para `v = [4, 7, 2]`, começando em `i = 0`.
2. Qual elemento deixa de ser somado?
3. O que acontece se `v = []` e começamos em `i = 0`?
4. Reescreva o caso base corretamente.
5. Reescreva a linha de retorno se o caso base correto for usado.