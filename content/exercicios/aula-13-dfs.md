---
title: "Exercícios — Aula 14 — DFS em matrizes e exploração recursiva"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Leia o pseudocódigo antes de executar mentalmente.
- Use apenas os quatro vizinhos ortogonais: cima, baixo, esquerda e direita.
- Acompanhe a posição atual, a matriz `visitado` e as chamadas pendentes.

## Exercício 1 — Simulação de DFS em labirinto

Considere a matriz abaixo. `S` é a origem, `D` é o destino, `#` é parede e `.` é uma posição livre. A ordem de tentativa é cima, baixo, esquerda e direita.

```text
S . . D
# . # .
# . . .
```

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Busca o destino a partir de uma posição do labirinto.}
\Input{labirinto lab, posição $(l, c)$, destino $(dl, dc)$, matriz visitado}
\Output{boolean}
\BlankLine
\If{$(l, c)$ está fora da matriz}{
    \Return{\textbf{false}}\;
}
\If{$lab[l][c] = \texttt{\#}$ \textbf{ or } $visitado[l][c] = \textbf{true}$}{
    \Return{\textbf{false}}\;
}
\If{$(l, c) = (dl, dc)$}{
    \Return{\textbf{true}}\;
}
\BlankLine
$visitado[l][c] \gets \textbf{true}$\;
\Return{$\texttt{ExisteCaminho}(lab, l-1, c, dl, dc, visitado)$ \textbf{ or }$\newline
\texttt{ExisteCaminho}(lab, l+1, c, dl, dc, visitado)$ \textbf{ or }$\newline
\texttt{ExisteCaminho}(lab, l, c-1, dl, dc, visitado)$ \textbf{ or }$\newline
\texttt{ExisteCaminho}(lab, l, c+1, dl, dc, visitado)$}\;
\caption{ExisteCaminho}
\end{algorithm}

Complete a tabela até encontrar o destino. Registre somente as chamadas que alcançam posições livres e ainda não visitadas.

| passo | chamada ativa | posição marcada | próxima tentativa | resultado |
| ---: | --- | --- | --- | --- |
| 1 | `ExisteCaminho(0, 0)` | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |

Qual condição impede que uma posição já explorada seja visitada novamente?

[break]

## Exercício 2 — Quatro vizinhos e limites

Considere a posição `(0, 1)` na matriz abaixo.

```text
. . .
# . #
. . .
```

Preencha a tabela. Use `sim` ou `não`.

| direção | coordenada | dentro da matriz? | é parede? | pode ser explorada? |
| --- | --- | --- | --- | --- |
| cima | | | | |
| baixo | | | | |
| esquerda | | | | |
| direita | | | | |

Depois explique por que a verificação de limites deve acontecer antes de acessar `lab[linha][coluna]`.

[break]

## Exercício 3 — Completar busca de caminho

Complete as lacunas do procedimento. O método deve devolver `true` quando alcançar o destino e `false` quando não houver caminho a partir da posição atual.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Verifica se há caminho em uma matriz.}
\Input{lab, $(l,c)$, destino $(dl,dc)$, visitado}
\Output{boolean}
\BlankLine
\If{\underline{\hspace{7cm}}}{
    \Return{\textbf{false}}\;
}
\If{$(l,c) = (dl,dc)$}{
    \Return{\underline{\hspace{2cm}}}\;
}
\BlankLine
$visitado[l][c] \gets$ \underline{\hspace{2cm}}\;
\Return{\underline{\hspace{10cm}}}\;
\caption{ExisteCaminho}
\end{algorithm}

[break]

## Exercício 4 — Simulação de flood fill

Aplicamos `PREENCHER(tela, 1, 1, '.', 'x')` na tela abaixo.

```text
. . # .
. . # #
# . . .
```

1. Desenhe a tela depois do preenchimento.
2. Quais células mudam de cor?
3. Por que o algoritmo deve retornar imediatamente se `original` e `nova` forem iguais?

[break]

## Exercício 5 — Contar regiões livres

Uma região é formada por posições `.` conectadas pelas quatro direções. Complete o pseudocódigo.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Conta regiões livres da matriz.}
\Input{matriz mapa}
\Output{int}
\BlankLine
$visitado \gets \texttt{MatrizDeFalsos}(\texttt{Linhas}(mapa), \texttt{Colunas}(mapa))$\;
$total \gets 0$\;
\ForEach{posição $(l,c)$ de mapa}{
    \If{\underline{\hspace{6cm}}}{
        $\texttt{MarcarRegiao}(mapa, l, c, visitado)$\;
        $total \gets$ \underline{\hspace{2cm}}\;
    }
}
\Return{$total$}\;
\caption{ContarRegioes}
\end{algorithm}

Use sua resposta para contar as regiões da matriz:

```text
. # .
. # .
# # .
```

[break]

## Exercício 6 — Casos de borda

Para cada caso, indique o resultado esperado de uma busca de caminho e justifique em uma frase.

| Caso | Resultado | Justificativa |
| --- | --- | --- |
| matriz vazia | | |
| origem fora da matriz | | |
| origem em parede | | |
| destino em parede | | |
| origem igual ao destino e posição livre | | |
| matriz com uma única posição livre | | |
