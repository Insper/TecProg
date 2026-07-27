---
title: "Exercícios — Aula 05 — Busca linear e introdução prática a Big-O"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Em buscas, deixe claro se a saída é booleano, índice, contagem ou outra informação.
- Ao simular, conte a comparação principal entre elemento e alvo.
- Use Big-O para falar de crescimento no pior caso, não de tempo exato em segundos.

## Exercício 1 — Simulação de busca linear

Simule o algoritmo para o array `v = [42, 17, 93, 58, 17]` nos três alvos: `42`, `17` e `10`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCA-LINEAR-INDICE}.}
\Input{array v, value alvo}
\Output{índice da primeira ocorrência ou -1}
\BlankLine
\BlankLine
$comparacoes \gets 0$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(v) - 1$}{
    $comparacoes \gets comparacoes + 1$\;
\BlankLine
    \If{$v[i] = alvo$}{
        $\texttt{IMPRIMIR}("comparacoes = ", comparacoes)$\;
        \Return{i}\;
\BlankLine
    }
}
$\texttt{IMPRIMIR}("comparacoes = ", comparacoes)$\;
\Return{-1}\;
\caption{BuscaLinearIndice}
\end{algorithm}

| alvo | i visitados | comparações | retorno |
| ---: | --- | ---: | ---: |
| 42 | | | |
| 17 | | | |
| 10 | | | |

Por que o alvo `17` retorna a primeira posição em que aparece?

[break]

## Exercício 2 — Primeira ocorrência

Escreva pseudocódigo para `PRIMEIRA-OCORRENCIA`.

Contrato:

- entrada: array `v`, valor `alvo`;
- saída: primeiro índice em que `alvo` aparece;
- se o alvo não aparece, retorne `-1`.

Teste com:

- `v = [3, 8, 3, 1]`, `alvo = 3`;
- `v = [3, 8, 3, 1]`, `alvo = 1`;
- `v = [3, 8, 3, 1]`, `alvo = 7`;
- `v = []`, `alvo = 3`.

[break]

## Exercício 3 — Última ocorrência

Agora escreva pseudocódigo para `ULTIMA-OCORRENCIA`.

Contrato:

- entrada: array `v`, valor `alvo`;
- saída: último índice em que `alvo` aparece;
- se o alvo não aparece, retorne `-1`.

Você pode escolher uma das duas estratégias:

- percorrer do fim para o início e parar no primeiro encontro;
- percorrer do início ao fim guardando a última posição encontrada.

Compare as duas estratégias para `v = [5, 1, 5, 2, 5]`, `alvo = 5` e `alvo = 1`.

[break]

## Exercício 4 — Criando o pior caso

Para cada tamanho, crie um array e um alvo que façam a busca linear executar o pior caso.

| tamanho do array | array escolhido | alvo | comparações no pior caso |
| ---: | --- | ---: | ---: |
| 0 | | | |
| 1 | | | |
| 4 | | | |
| 8 | | | |

O pior caso exige que o alvo esteja ausente? Explique.

[break]

## Exercício 5 — Operação principal e Big-O

Para cada algoritmo, indique a operação principal e o custo no pior caso.

| Algoritmo | Operação principal | Pior caso | Big-O |
| --- | --- | --- | --- |
| buscar primeira ocorrência | | | |
| buscar última ocorrência percorrendo do fim | | | |
| contar todas as ocorrências | | | |
| verificar se todos são maiores que um limite | | | |
| comparar todos os pares de elementos | | | |

Em qual linha o custo deixa de ser linear?

[break]

## Exercício 6 — Busca linear ou conjunto?

Considere dois cenários.

**Cenário A:** há um array de 12 nomes e uma única consulta de presença.

**Cenário B:** há um array de 10000 matrículas e 5000 consultas de presença.

Responda:

1. Em qual cenário a busca linear é simples e suficiente?
2. Em qual cenário vale considerar construir um conjunto?
3. Qual é o custo de construir o conjunto antes das consultas?
4. Por que não faz sentido comparar apenas uma consulta isolada no cenário B?

[break]

## Exercício 7 — Retorno no lugar errado

O algoritmo abaixo deveria procurar `alvo`, mas retorna `-1` cedo demais.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCA-COM-ERRO}.}
\Input{array v, value alvo}
\Output{índice ou -1}
\BlankLine
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(v) - 1$}{
    \If{$v[i] = alvo$}{
        \Return{i}\;
    } \Else{
        \Return{-1}\;
    }
}
\caption{BuscaComErro}
\end{algorithm}

1. Simule para `v = [4, 9, 1, 9]`, `alvo = 9`.
2. Qual retorno o algoritmo produz?
3. Qual deveria ser o retorno?
4. Reescreva o pseudocódigo corrigindo a posição do `RETORNE -1`.