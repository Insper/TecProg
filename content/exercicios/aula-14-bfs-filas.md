---
title: "Exercícios — Aula 15 — BFS em matrizes e uso de filas"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Em BFS, marque uma posição quando ela entra na fila.
- Considere apenas movimentos para cima, baixo, esquerda e direita.
- `#` representa parede e `.` representa uma posição livre.

## Exercício 1 — Simulação da fila na BFS

Considere o labirinto. A origem é `S`; o destino é `D`.

```text
S . .
. # D
. . .
```

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Calcula distâncias mínimas a partir da origem.}
\Input{labirinto lab, origem}
\Output{matriz dist}
\BlankLine
$dist \gets \texttt{MatrizPreenchida}(-1)$\;
$fila \gets \texttt{FilaVazia}()$\;
$dist[origem] \gets 0$\;
$\texttt{Enfileirar}(fila, origem)$\;
\While{$\texttt{Vazia}(fila) = \textbf{false}$}{
    $atual \gets \texttt{Desenfileirar}(fila)$\;
    \ForEach{vizinho ortogonal de atual}{
        \If{vizinho é livre \textbf{ and } $dist[vizinho] = -1$}{
            $dist[vizinho] \gets dist[atual] + 1$\;
            $\texttt{Enfileirar}(fila, vizinho)$\;
        }
    }
}
\Return{$dist$}\;
\caption{DistanciasBfs}
\end{algorithm}

Complete os quatro primeiros passos da execução, usando a ordem cima, baixo, esquerda e direita.

| passo | posição removida | posições enfileiradas | fila ao final | novas distâncias |
| ---: | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |

[break]

## Exercício 2 — Matriz de distâncias

Preencha a matriz com a distância mínima a partir de `S`. Mantenha `#` para paredes e use `-1` para posições livres inalcançáveis.

```text
S . . #
. # . #
. . . D
```

```text
0  _  _  #
_  #  _  #
_  _  _  _
```

Em qual camada da BFS o destino é descoberto?

[break]

## Exercício 3 — Reconstrução de caminho

Uma BFS registrou os predecessores abaixo. Cada seta aponta da posição descoberta para a posição de onde ela veio.

```text
(2, 3) <- (2, 2) <- (1, 2) <- (0, 2) <- (0, 1) <- (0, 0)
```

1. Escreva o caminho da origem até o destino na ordem correta.
2. Quantos movimentos ele possui?
3. Que valores devem ser armazenados para a posição `(1, 2)` nas matrizes de predecessores de linha e coluna?

[break]

## Exercício 4 — Completar menor distância

Complete o procedimento. Ele deve retornar `-1` se o destino não for alcançado.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Encontra o menor número de movimentos em um labirinto.}
\Input{lab, origem, destino}
\Output{int}
\BlankLine
$dist[origem] \gets 0$\;
$\texttt{Enfileirar}(fila, origem)$\;
\While{$\texttt{Vazia}(fila) = \textbf{false}$}{
    $atual \gets \texttt{Desenfileirar}(fila)$\;
    \If{$atual = destino$}{
        \Return{\underline{\hspace{2cm}}}\;
    }
    \ForEach{vizinho ortogonal de atual}{
        \If{vizinho é livre \textbf{ and } $dist[vizinho] = -1$}{
            $dist[vizinho] \gets$ \underline{\hspace{3cm}}\;
            \underline{\hspace{5cm}}\;
        }
    }
}
\Return{\underline{\hspace{2cm}}}\;
\caption{MenorDistancia}
\end{algorithm}

Por que a atribuição da distância precisa ocorrer antes de enfileirar o vizinho?

[break]

## Exercício 5 — Por que a primeira chegada é mínima?

Explique, com suas palavras, por que a primeira vez que BFS alcança o destino corresponde ao menor número de movimentos.

Use obrigatoriamente as ideias de:

- fila;
- camadas de distância `0`, `1`, `2`, ...;
- marcação na descoberta;
- todos os movimentos terem o mesmo custo.

Depois, explique por que DFS pode encontrar um caminho válido sem encontrar o menor.

[break]

## Exercício 6 — Quando BFS simples não basta?

Classifique cada situação.

| Situação | BFS simples resolve menor caminho? | Justificativa |
| --- | --- | --- |
| cada movimento custa 1 | | |
| mover na areia custa 3 e na estrada custa 1 | | |
| há teleporte que também custa 1 | | |
| movimentos diagonais também custam 1 | | |
| queremos apenas saber se existe algum caminho | | |

Para a segunda situação, explique por que “menor número de movimentos” e “menor custo” podem ser perguntas diferentes.
