---
title: "Exercícios — Aula 13 — Comparação de buscas e ordenações"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Para cada escolha de técnica, declare pré-condições, custo e motivo.
- Não basta dizer que uma técnica é “mais rápida”: explique em que cenário.
- Nos exercícios de simulação, conte operações conceituais, não tempo em segundos.

## Exercício 1 — Duas estratégias de consulta

Um catálogo tem os códigos:

`codigos = [42, 17, 93, 58, 21, 70]`

Vamos comparar duas estratégias para responder às consultas `[93, 10, 70]`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONSULTAS-LINEARES}.}
\Input{list codigos, list consultas}
\Output{respostas e quantidade de comparações}
\BlankLine
\BlankLine
$comparacoes \gets 0$\;
\BlankLine
\For{$c \gets 0 \textbf{ to } \texttt{TAMANHO}(consultas) - 1$}{
    $alvo \gets consultas[c]$\;
    $achou \gets \textbf{false}$\;
\BlankLine
    \For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(codigos) - 1$}{
        $comparacoes \gets comparacoes + 1$\;
        \If{$codigos[i] = alvo$}{
            $achou \gets \textbf{true}$\;
            \textbf{break}\;
\BlankLine
        }
    }
    $\texttt{IMPRIMIR}(alvo, achou)$\;
\BlankLine
}
$\texttt{IMPRIMIR}(comparacoes)$\;
\caption{ConsultasLineares}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONSULTAS-COM-MAPA}.}
\Input{list codigos, list consultas}
\Output{respostas e quantidade de consultas ao mapa}
\BlankLine
\BlankLine
$M \gets \texttt{MAPA-VAZIO}()$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(codigos) - 1$}{
    $\texttt{COLOCAR}(M, codigos[i], \textbf{true})$\;
\BlankLine
}
$consultas\_mapa \gets 0$\;
\BlankLine
\For{$c \gets 0 \textbf{ to } \texttt{TAMANHO}(consultas) - 1$}{
    $consultas\_mapa \gets consultas\_mapa + 1$\;
    $\texttt{IMPRIMIR}(consultas[c], \texttt{CONTEM-CHAVE}(M, consultas[c]))$\;
\BlankLine
}
$\texttt{IMPRIMIR}(consultas\_mapa)$\;
\caption{ConsultasComMapa}
\end{algorithm}

1. Simule a estratégia linear e conte comparações.
2. Simule a estratégia com mapa e conte consultas ao mapa.
3. Qual estratégia tem custo extra antes das consultas?
4. Em que cenário esse custo extra vale a pena?

[break]

## Exercício 2 — Escolha de técnica por cenário

Escolha uma técnica para cada caso: busca linear, busca binária, conjunto/mapa, insertion sort, mergesort ou quicksort.

| Cenário | Técnica escolhida | Pré-condição ou cuidado | Justificativa |
| --- | --- | --- | --- |
| 20 nomes e uma única consulta | | | |
| 1 milhão de códigos já ordenados e muitas consultas | | | |
| Verificar presença de matrículas muitas vezes, sem precisar de ordem | | | |
| Ordenar array pequeno quase ordenado | | | |
| Ordenar grande volume com garantia de pior caso na versão estudada | | | |
| Ordenar no próprio array e aceitar risco de pivô ruim | | | |

Em quais linhas a técnica escolhida exige preparar uma estrutura ou ordenar antes?

[break]

## Exercício 3 — Tabela de custos

Complete a tabela com Big-O no pior caso ou custo esperado, quando indicado.

| Técnica | Pré-condição | Consulta/ordenação | Memória extra | Observação |
| --- | --- | --- | --- | --- |
| Busca linear | | | | |
| Busca binária | | | | |
| Consulta em conjunto | | | | custo esperado |
| Insertion sort | | | | |
| Mergesort | | | | |
| Quicksort | | | | pior caso depende do pivô |

Depois, escolha duas técnicas da tabela e explique por que não faz sentido compará-las sem dizer o problema.

[break]

## Exercício 4 — Projetando testes para ordenação

Você precisa testar um algoritmo de ordenação que recebe um array de números.

Monte um conjunto de testes cobrindo:

1. array vazio;
2. um elemento;
3. já ordenado;
4. ordem inversa;
5. repetidos;
6. números negativos;
7. array pequeno aleatório.

Para cada teste, escreva a entrada e a saída esperada.

Depois, responda: qual desses testes ajuda a revelar o pior caso da versão de quicksort com pivô final?

[break]

## Exercício 5 — Memória versus tempo

Compare mergesort e quicksort na versão estudada.

| Critério | Mergesort | Quicksort |
| --- | --- | --- |
| Trabalho principal | | |
| Memória auxiliar | | |
| Pior caso | | |
| Estabilidade na versão estudada | | |
| Sensibilidade à escolha do pivô | | |

Agora escreva um parágrafo curto respondendo:

Quando pode valer a pena usar mais memória para ter uma garantia melhor de pior caso?

[break]

## Exercício 6 — Mini checkpoint integrador

Resolva os itens abaixo.

1. Um array `v` está ordenado. Escreva a pré-condição e a pós-condição de uma busca binária.
2. Dado `v = [5, 1, 4, 2]`, simule a primeira iteração de insertion sort.
3. Em mergesort, explique por que o merge só funciona quando as duas metades já estão ordenadas.
4. Em quicksort, explique por que o pivô não deve entrar nas chamadas recursivas depois da partição.
5. Um sistema tem muitas consultas por código e também precisa imprimir relatório ordenado uma vez por dia. Proponha uma estratégia combinando estruturas ou algoritmos estudados.

## Créditos e reaproveitamento

Exercícios adaptados de comparação de desempenho, busca binária, ordenações por simulação e análise de custo dos handouts antigos devem indicar:

> Adaptado de material de Igor Montagner para a disciplina Técnicas de Programação.
