---
title: "Exercícios — Aula 10 — Divisão e conquista"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Em cada algoritmo, identifique as etapas: dividir, resolver e combinar.
- Use intervalos abertos no fim: `[inicio, fim)`.
- Em simulações, desenhe a árvore de chamadas e depois os retornos subindo pela árvore.

## Exercício 1 — Máximo por divisão e conquista

Simule o algoritmo para `v = [8, 3, 12, 5]`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{MAXIMO}.}
\Input{array v}
\Output{maior value}
\BlankLine
\BlankLine
\If{$\texttt{TAMANHO}(v) = 0$}{
    \Return{"erro: array vazio"}\;
\BlankLine
}
\Return{\texttt{MAXIMO-INTERVALO}(v, 0, \texttt{TAMANHO}(v))}\;
\BlankLine
\caption{Maximo}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{MAXIMO-INTERVALO}.}
\Input{array v, int inicio, int fim}
\Output{maior value em v[inicio..fim)}
\BlankLine
\BlankLine
\If{$fim - inicio = 1$}{
    \Return{v[inicio]}\;
\BlankLine
}
$meio \gets inicio + \texttt{INTEIRO}((fim - inicio) / 2)$\;
$maior\_esq \gets \texttt{MAXIMO-INTERVALO}(v, inicio, meio)$\;
$maior\_dir \gets \texttt{MAXIMO-INTERVALO}(v, meio, fim)$\;
\BlankLine
\If{$maior\_esq > maior\_dir$}{
    \Return{maior\_esq}\;
} \Else{
    \Return{maior\_dir}\;
}
\caption{MaximoIntervalo}
\end{algorithm}

Complete a árvore de chamadas.

```text
MAXIMO-INTERVALO(v, 0, 4)
|-- MAXIMO-INTERVALO(v, __, __)
|   |-- MAXIMO-INTERVALO(v, __, __) -> __
|   `-- MAXIMO-INTERVALO(v, __, __) -> __
`-- MAXIMO-INTERVALO(v, __, __)
    |-- MAXIMO-INTERVALO(v, __, __) -> __
    `-- MAXIMO-INTERVALO(v, __, __) -> __
```

Agora indique os valores combinados em cada nó interno e o retorno final.

[break]

## Exercício 2 — Dividir, resolver e combinar

Para cada problema, descreva as três etapas (dividir, resolver e combinar).

1. Encontrar máximo
2. Somar elementos
3. Verificar se todos são positivos

Em qual problema a combinação é mais trabalhosa? Em qual problema o trabalho principal acontece antes das chamadas recursivas?

[break]

## Exercício 3 — Mínimo por divisão e conquista

Escreva pseudocódigo para `MINIMO`.

Contrato:

- entrada: array não vazio `v`;
- saída: menor valor;
- use um auxiliar `MINIMO-INTERVALO(v, inicio, fim)`;
- use intervalo `[inicio, fim)`;
- caso base: intervalo com um único elemento.

Teste com:

- `v = [8, 3, 12, 5]`;
- `v = [4]`;
- `v = [-2, 9, -5, 1]`.

[break]

## Exercício 4 — Soma por divisão e conquista

Escreva pseudocódigo para `SOMA-INTERVALO`.

Contrato:

- entrada: array `v`, inteiros `inicio` e `fim`;
- saída: soma dos elementos em `v[inicio..fim)`;
- se `inicio = fim`, retorne `0`;
- se houver um elemento, retorne esse elemento;
- caso contrário, divida em duas metades e combine somando.

Depois simule para `v = [4, 7, 2, 1]`.

[break]

## Exercício 5 — Divisão equilibrada e desequilibrada

Compare duas formas de dividir um intervalo de tamanho `8`.

**Estratégia A:** dividir em duas metades de tamanho `4` e `4`.

**Estratégia B:** dividir em partes de tamanho `1` e `7`.

Responda:

1. Qual estratégia gera uma árvore mais baixa?
2. Qual estratégia se parece mais com busca binária?
3. Para uma entrada de tamanho `n`, por que divisões equilibradas tendem a produzir profundidade `O(log n)`?