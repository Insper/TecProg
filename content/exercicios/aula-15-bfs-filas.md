---
title: "Exercícios — Aula 15 — BFS e uso de filas"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- BFS usa fila: quem é descoberto primeiro deve ser processado primeiro.
- A matriz ou array `dist` também serve como marca de visitado quando `-1` significa “ainda não visitado”.
- Em toda simulação, acompanhe fila, distâncias e ordem de descoberta.

## Exercício 1 — Simulação da fila na BFS

Considere o grafo não direcionado:

```text
adj[0] = [1, 2]
adj[1] = [0, 3, 4]
adj[2] = [0, 4]
adj[3] = [1, 5]
adj[4] = [1, 2, 5]
adj[5] = [3, 4]
```

Simule `BFS(adj, 0)`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BFS-DISTANCIAS}.}
\Input{list de adjacência adj, int origem}
\Output{array dist}
\BlankLine
\BlankLine
$dist \gets \texttt{ARRAY-PREENCHIDO}(\texttt{TAMANHO}(adj), -1)$\;
$fila \gets \texttt{FILA-VAZIA}()$\;
\BlankLine
$dist[origem] \gets 0$\;
$\texttt{ENFILEIRAR}(fila, origem)$\;
\BlankLine
\While{$\texttt{VAZIA}(fila) = \textbf{false}$}{
    $atual \gets \texttt{DESENFILEIRAR}(fila)$\;
\BlankLine
    \ForEach{$vizinho \in adj[atual]$}{
        \If{$dist[vizinho] = -1$}{
            $dist[vizinho] \gets dist[atual] + 1$\;
            $\texttt{ENFILEIRAR}(fila, vizinho)$\;
\BlankLine
        }
    }
}
\Return{dist}\;
\caption{BfsDistancias}
\end{algorithm}

Preencha uma linha a cada remoção da fila.

| passo | removido da fila | vizinhos descobertos | fila ao final do passo | dist ao final do passo |
| ----: | ---------------: | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |

Qual é a distância final de `0` até `5`?

[break]

## Exercício 2 — Matriz de distâncias

No labirinto abaixo, `S` é origem, `D` é destino, `.` é livre e `#` é parede.

```text
#######
#S....#
###.#D#
#.....#
#######
```

Use BFS com vizinhança em 4 direções e preencha a matriz de distâncias. Use `#` para paredes e `-1` para células livres inalcançáveis.

```text
#######
#0????#
###?#?#
#?????#
#######
```

Depois responda:

1. Qual é a menor distância de `S` até `D`?
2. Quais células entram na fila com distância `1`?
3. Quais células entram na fila com distância `2`?

[break]

## Exercício 3 — Reconstrução de caminho

Durante a BFS, além de `dist`, guardamos `pred[vizinho] \gets atual` quando descobrimos um vizinho.

Considere:

```text
pred[0] = -1
pred[1] = 0
pred[2] = 0
pred[3] = 1
pred[4] = 2
pred[5] = 4
```

Reconstrua o caminho da origem `0` até o destino `5`.

1. Comece em `5` e siga predecessores até `-1`.
2. Escreva o caminho encontrado de trás para frente.
3. Inverta a ordem para obter o caminho da origem até o destino.
4. Qual distância esse caminho sugere?

Agora diga o que deve acontecer se `pred[destino] = -1` e `destino` não é a origem.

[break]

## Exercício 4 — Menor distância em matriz

Escreva pseudocódigo para `MENOR-DISTANCIA-MATRIZ`.

Contrato:

- entrada: matriz `lab`, origem `(li, ci)`, destino `(lf, cf)`;
- `#` representa parede e `.` representa livre;
- saída: menor número de passos ou `-1` se não houver caminho;
- use BFS com TAD Fila;
- use uma matriz `dist` inicializada com `-1`.

Inclua no pseudocódigo:

- validação de coordenadas;
- teste de parede;
- geração de vizinhos em quatro direções;
- retorno quando o destino for removido da fila ou ao final da busca.

[break]

## Exercício 5 — Por que BFS encontra menor caminho?

Explique com suas palavras por que BFS encontra menor caminho em grafos sem peso.

Use obrigatoriamente as ideias:

- fila;
- camadas;
- distância `0`, `1`, `2`, ...;
- primeira vez que um vértice é descoberto.

Depois compare com DFS:

1. DFS pode encontrar um caminho?
2. DFS garante o menor caminho?
3. O que muda se trocarmos a fila por pilha?

[break]

## Exercício 6 — Quando BFS simples não basta?

Para cada problema, diga se BFS simples resolve ou não.

| Problema | BFS simples resolve? | Justificativa |
| --- | --- | --- |
| Menor número de portas entre salas, cada porta custa 1 | | |
| Menor caminho em labirinto sem pesos | | |
| Caminho de menor custo quando cada estrada tem pedágio diferente | | |
| Quantidade mínima de movimentos em tabuleiro, todos com mesmo custo | | |
| Caminho que maximiza pontuação coletada | | |
| Verificar se existe algum caminho | | |

Quando BFS simples não resolve, que informação do problema quebra a hipótese de “cada passo custa igual”?

## Créditos e reaproveitamento

Exercícios adaptados de labirintos, contraste entre DFS e BFS e simulação de vizinhos dos handouts antigos devem indicar:

> Adaptado de material de Igor Montagner para a disciplina Técnicas de Programação.

Fonte externa opcional para variações conceituais: Princeton Undirected Graphs, <https://algs4.cs.princeton.edu/41graph/>.
