---
title: "Exercícios — Aula 16 — Problemas com BFS e DFS"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Antes de escolher DFS ou BFS, identifique a pergunta principal do problema.
- Em matrizes, valide limites antes de acessar uma posição.
- Use vizinhança de 4 direções, exceto quando o exercício disser outra coisa.

## Exercício 1 — Simulação de contagem de ilhas

Considere a matriz abaixo, em que `1` é terra e `0` é água.

```text
1 1 0 0
0 1 0 1
1 0 0 1
0 0 1 1
```

Simule o algoritmo de contagem de ilhas com DFS.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONTAR-ILHAS}.}
\Input{matrix mapa}
\Output{int}
\BlankLine
\BlankLine
$visitado \gets \texttt{MATRIZ-DE-FALSOS}(\text{same dimensions as } mapa)$\;
$total \gets 0$\;
\BlankLine
\For{$l \gets 0 \textbf{ to } \texttt{LINHAS}(mapa) - 1$}{
    \For{$c \gets 0 \textbf{ to } \texttt{COLUNAS}(mapa) - 1$}{
        \If{$mapa[l][c] = 1 \textbf{ and } visitado[l][c] = \textbf{false}$}{
            $\texttt{MARCAR-ILHA}(mapa, l, c, visitado)$\;
            $total \gets total + 1$\;
\BlankLine
        }
    }
}
\Return{total}\;
\BlankLine
\caption{ContarIlhas}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{MARCAR-ILHA}.}
\Input{mapa, l, c, visitado}
\Output{none}
\BlankLine
\BlankLine
\If{$\text{l or c is outside the matrix}$}{
    \Return{}\;
\BlankLine
}
\If{$mapa[l][c] \ne  1 \textbf{ or } visitado[l][c] = \textbf{true}$}{
    \Return{}\;
\BlankLine
}
$visitado[l][c] \gets \textbf{true}$\;
$\texttt{MARCAR-ILHA}(mapa, l - 1, c, visitado)$\;
$\texttt{MARCAR-ILHA}(mapa, l + 1, c, visitado)$\;
$\texttt{MARCAR-ILHA}(mapa, l, c - 1, visitado)$\;
$\texttt{MARCAR-ILHA}(mapa, l, c + 1, visitado)$\;
\caption{MarcarIlha}
\end{algorithm}

Preencha a tabela.

| célula encontrada no percurso externo | começa nova DFS? | células marcadas por essa DFS | total após a DFS |
| --- | --- | --- | ---: |
| `(0, 0)` | | | |
| próxima terra não visitada | | | |
| próxima terra não visitada | | | |

Quantas ilhas existem?

[break]

## Exercício 2 — Maior região

Escreva pseudocódigo para `MAIOR-ILHA`.

Contrato:

- entrada: matriz `mapa` com `1` para terra e `0` para água;
- saída: tamanho da maior ilha;
- use DFS;
- o algoritmo auxiliar deve retornar o tamanho da região marcada.

Esqueleto sugerido:

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{TAMANHO-ILHA}.}
\Input{mapa, l, c, visitado}
\Output{int}
\BlankLine
\BlankLine
\If{$\text{invalid position, water, or already visited}$}{
    \Return{0}\;
\BlankLine
}
$visitado[l][c] \gets \textbf{true}$\;
\BlankLine
\Return{1}\;
    $+ \texttt{TAMANHO-ILHA}(mapa, l - 1, c, visitado)$\;
    $+ \texttt{TAMANHO-ILHA}(mapa, l + 1, c, visitado)$\;
    $+ \texttt{TAMANHO-ILHA}(mapa, l, c - 1, visitado)$\;
    $+ \texttt{TAMANHO-ILHA}(mapa, l, c + 1, visitado)$\;
\caption{TamanhoIlha}
\end{algorithm}

Teste com a matriz do Exercício 1.

[break]

## Exercício 3 — Flood fill

Escreva pseudocódigo para `PREENCHER-REGIAO`.

Contrato:

- entrada: matriz `tela`, posição inicial `(l, c)`, valor `novo`;
- todas as células conectadas ao ponto inicial que têm o valor original devem receber `novo`;
- use vizinhança de 4 direções;
- se `original = novo`, retorne sem fazer alterações.

Teste com:

```text
A A B B
A B B A
A A B A
```

iniciando em `(0, 0)` e usando `novo = C`.

Mostre a matriz final.

[break]

## Exercício 4 — Menor caminho com BFS

No labirinto abaixo, calcule a menor distância de `S` até `D`.

```text
########
#S..#..#
#.#.#D.#
#.#....#
#......#
########
```

1. Preencha a matriz de distâncias usando BFS.
2. Marque a ordem em que as células entram na fila até `D` ser alcançado.
3. Qual é a menor distância?
4. DFS poderia encontrar algum caminho?
5. DFS garantiria essa mesma distância?

[break]

## Exercício 5 — Escolher DFS ou BFS

Escolha a técnica mais adequada.

| Problema | DFS, BFS ou ambos? | Justificativa |
| --- | --- | --- |
| Saber se existe caminho entre duas salas | | |
| Menor número de passos até a saída | | |
| Contar quantas ilhas existem | | |
| Pintar uma região conectada | | |
| Encontrar qualquer caminho para depuração | | |
| Calcular menor caminho quando cada movimento custa 1 | | |

Depois, crie um exemplo em que escolher DFS no lugar de BFS ainda encontra uma resposta correta, mas não a melhor resposta pedida.

[break]

## Exercício 6 — Testes de borda para matriz

Crie testes de borda para algoritmos de DFS/BFS em matriz.

Preencha a tabela com uma matriz pequena e o resultado esperado.

| Situação | Matriz de teste | Resultado esperado |
| --- | --- | --- |
| matriz `1x1` livre | | |
| origem igual ao destino | | |
| destino bloqueado por paredes | | |
| nenhuma terra para contar ilhas | | |
| uma única ilha ocupando tudo | | |
| várias ilhas separadas | | |
| caminho existe, mas não é direto | | |

Qual desses testes costuma revelar erro de validação de limites?

## Créditos e reaproveitamento

Exercícios adaptados de labirintos, critérios de parada, chamadas em vizinhos e comparação DFS/BFS dos handouts antigos devem indicar:

> Adaptado de material de Igor Montagner para a disciplina Técnicas de Programação.

Fonte externa opcional para variações conceituais: Princeton Undirected Graphs, <https://algs4.cs.princeton.edu/41graph/>.
