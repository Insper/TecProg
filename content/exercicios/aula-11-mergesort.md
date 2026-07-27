---
title: "Exercícios — Aula 11 — Mergesort"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Antes de pensar no mergesort completo, domine a intercalação de duas partes ordenadas.
- Use intervalos abertos no fim: `[inicio, meio)` e `[meio, fim)`.
- Em simulações de merge, acompanhe `i`, `j`, `k`, o valor copiado e o vetor auxiliar.

## Exercício 1 — Simulação de `MERGE`

Simule o algoritmo para:

- `A1 = [4, 4, 7, 8]`;
- `A2 = [1, 3, 5, 6]`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{MERGE-DOIS-ARRAYS}.}
\Input{arrays ordenados A1 e A2}
\Output{array ordenado AUX}
\BlankLine
\BlankLine
$AUX \gets \texttt{NOVO-ARRAY}(\texttt{TAMANHO}(A1) + \texttt{TAMANHO}(A2))$\;
$i \gets 0$\;
$j \gets 0$\;
$k \gets 0$\;
\BlankLine
\While{$i < \texttt{TAMANHO}(A1) \textbf{ and } j < \texttt{TAMANHO}(A2)$}{
    \If{$A1[i] \le  A2[j]$}{
        $AUX[k] \gets A1[i]$\;
        $i \gets i + 1$\;
    } \Else{
        $AUX[k] \gets A2[j]$\;
        $j \gets j + 1$\;
    }
    $k \gets k + 1$\;
\BlankLine
}
\While{$i < \texttt{TAMANHO}(A1)$}{
    $AUX[k] \gets A1[i]$\;
    $i \gets i + 1$\;
    $k \gets k + 1$\;
\BlankLine
}
\While{$j < \texttt{TAMANHO}(A2)$}{
    $AUX[k] \gets A2[j]$\;
    $j \gets j + 1$\;
    $k \gets k + 1$\;
\BlankLine
}
\Return{AUX}\;
\caption{MergeDoisArrays}
\end{algorithm}

[break]

| k | i antes | j antes | comparação | valor copiado | AUX parcial |
| -: | ------: | ------: | --- | ------------: | --- |
| 0 | | | | | |
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |
| 6 | | | | | |
| 7 | | | | | |

Qual é o valor final de `AUX`?

[break]

## Exercício 2 — Divisões do mergesort

Para `v = [8, 3, 7, 1, 5, 2, 6, 4]`, desenhe a árvore de divisões do mergesort até chegar a intervalos de tamanho `1`.

Use a notação `[inicio, fim)`.

```text
[0, 8)
|-- [0, 4)
|   |-- ...
|   `-- ...
`-- [4, 8)
    |-- ...
    `-- ...
```

Depois, marque em que ordem os merges acontecem na volta da recursão.

[break]

## Exercício 3 — Completar pseudocódigo de merge em um array

Complete o pseudocódigo para intercalar duas metades ordenadas de `v`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{MERGE}.}
\Input{array v, array aux, int inicio, int meio, int fim}
\Output{v[inicio..fim) ordenado}
\BlankLine
\BlankLine
$i \gets inicio$\;
$j \gets meio$\;
$k \gets inicio$\;
\BlankLine
\While{$i < meio \textbf{ and } j < fim$}{
    \If{$\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$}{
        $aux[k] \gets v[i]$\;
        $i \gets i + 1$\;
    } \Else{
        $aux[k] \gets v[j]$\;
        $j \gets j + 1$\;
    }
    $k \gets k + 1$\;
\BlankLine
}
\While{$\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$}{
    $aux[k] \gets v[i]$\;
    $i \gets i + 1$\;
    $k \gets k + 1$\;
\BlankLine
}
\While{$\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$}{
    $aux[k] \gets v[j]$\;
    $j \gets j + 1$\;
    $k \gets k + 1$\;
\BlankLine
}
\For{$p \gets inicio \textbf{ to } fim - 1$}{
    $\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$\;
}
\caption{Merge}
\end{algorithm}

Teste com `v = [2, 7, 9, 1, 5, 8]`, `inicio = 0`, `meio = 3`, `fim = 6`.

[break]

## Exercício 4 — Estabilidade no merge

Considere:

- esquerda: `[(4, "A"), (4, "B"), (7, "C")]`;
- direita: `[(4, "D"), (5, "E")]`.

O merge usa a condição `esquerda[i].chave <= direita[j].chave`.

1. Simule a intercalação.
2. Em que ordem aparecem `"A"`, `"B"` e `"D"`?
3. O que mudaria se a condição fosse `<` em vez de `<=`?
4. Explique por que essa escolha está ligada à estabilidade.

[break]

## Exercício 5 — Níveis e custo `n log n`

Complete a tabela considerando arrays cujo tamanho é potência de 2.

| tamanho `n` | quantidade aproximada de níveis | trabalho total por nível | trabalho total aproximado |
| ----------: | ------------------------------: | -----------------------: | ------------------------: |
| 2 | | | |
| 4 | | | |
| 8 | | | |
| 16 | | | |
| 32 | | | |

Explique por que cada nível faz trabalho linear e por que há cerca de `log2(n)` níveis.

[break]

## Exercício 6 — Mergesort completo

Escreva pseudocódigo para `MERGESORT`.

Contrato:

- entrada: array `v`;
- saída: `v` ordenado;

Depois, teste manualmente com:

- `v = []`;
- `v = [5]`;
- `v = [2, 1]`;
- `v = [4, 1, 3, 2]`.
