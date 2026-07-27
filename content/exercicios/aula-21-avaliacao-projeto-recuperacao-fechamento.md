---
title: "Exercícios — Aula 21 — Avaliação, projeto, recuperação ou fechamento"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Esta aula funciona como fechamento: diagnostique, escolha técnica e justifique.
- Em cada resposta, declare pré-condições e casos de borda.
- Use pseudocódigo quando precisar descrever um algoritmo.

## Exercício 1 — Diagnóstico de técnica incorreta

O algoritmo abaixo tenta procurar um código usando busca binária, mas a entrada não garante ordenação.

Simule para `v = [40, 10, 30, 20]` e `alvo = 10`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BUSCA-BINARIA-SEM-PRECONDICAO}.}
\Input{array v, value alvo}
\Output{índice ou -1}
\BlankLine
\BlankLine
$inicio \gets 0$\;
$fim \gets \texttt{TAMANHO}(v) - 1$\;
\BlankLine
\While{$inicio \le  fim$}{
    $meio \gets inicio + \texttt{INTEIRO}((fim - inicio) / 2)$\;
\BlankLine
    \If{$v[meio] = alvo$}{
        \Return{meio}\;
\BlankLine
    }
    \If{$v[meio] < alvo$}{
        $inicio \gets meio + 1$\;
    } \Else{
        $fim \gets meio - 1$\;
\BlankLine
    }
}
\Return{-1}\;
\caption{BuscaBinariaSemPrecondicao}
\end{algorithm}

Preencha a tabela.

| passo | inicio | fim | meio | v[meio] | decisão |
| ----: | -----: | --: | ---: | ------: | --- |
| 1 | | | | | |
| 2 | | | | | |
| fim | | | | | |

Depois responda:

1. Qual retorno o algoritmo produz?
2. O alvo realmente está no array?
3. Qual pré-condição foi violada?
4. Quais são duas correções possíveis?
5. Em que cenário cada correção faria mais sentido?

[break]

## Exercício 2 — Busca e estrutura de dados

Escolha a técnica mais adequada para cada situação.

| Situação | Técnica | Justificativa |
| --- | --- | --- |
| Uma consulta em 15 elementos não ordenados | | |
| Dez mil consultas em dados já ordenados | | |
| Consulta por matrícula com nota associada | | |
| Verificar presença de códigos bloqueados | | |
| Encontrar primeira ocorrência em lista com repetidos | | |
| Consultas frequentes e relatório ordenado ocasional | | |

Agora escreva um pseudocódigo curto para a situação “consulta por matrícula com nota associada”, usando TAD Mapa.

[break]

## Exercício 3 — Ordenação e análise

Considere três algoritmos estudados: insertion sort, mergesort e quicksort.

Preencha a tabela.

| Critério | Insertion sort | Mergesort | Quicksort |
| --- | --- | --- | --- |
| Melhor caso | | | |
| Pior caso | | | |
| Memória extra na versão estudada | | | |
| Estável na versão estudada? | | | |
| Bom para dados pequenos/quase ordenados? | | | |
| Sensível à escolha de pivô? | | | |

Depois responda:

1. Qual algoritmo você escolheria para ordenar uma lista pequena quase ordenada?
2. Qual escolheria se precisa de garantia de pior caso `O(n log n)` na versão estudada?
3. Qual cuidado deve existir ao testar quicksort?
4. Crie três testes de borda para qualquer algoritmo de ordenação.

[break]

## Exercício 4 — Grafos, matrizes e caminhos

Leia os problemas e escolha DFS, BFS ou backtracking.

| Problema | Técnica | Justificativa |
| --- | --- | --- |
| Existe caminho entre duas salas? | | |
| Menor número de passos em labirinto sem pesos | | |
| Contar componentes conectadas | | |
| Listar todos os caminhos simples sem repetir célula | | |
| Pintar região conectada | | |
| Escolher subconjunto ótimo de itens | | |

Para o problema de menor caminho, escreva o esqueleto do pseudocódigo usando fila e matriz `dist`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{MENOR-CAMINHO-FECHAMENTO}.}
\Input{matrix lab, origem, destino}
\Output{menor distância ou -1}
\BlankLine
\BlankLine
$...$\;
\caption{MenorCaminhoFechamento}
\end{algorithm}

[break]

## Exercício 5 — Backtracking com restrição

Considere `valores = [3, 4, 6, 8]` e `alvo = 10`.

1. Desenhe a árvore de incluir/não incluir até encontrar uma solução ou esgotar possibilidades.
2. Marque ramos podados por `soma > alvo`.
3. Explique por que essa poda é válida para valores positivos.
4. Diga o que mudaria se houvesse valores negativos.
5. Escreva pseudocódigo para a função `EXISTE-SOMA` usando essa poda.

Agora responda: esse problema é melhor modelado com busca linear, BFS ou backtracking? Justifique.

[break]

## Exercício 6 — Roteiro alternativo de projeto final

Escolha um dos temas abaixo ou proponha um equivalente.

- Catálogo de produtos com consultas, ordenação e relatórios.
- Analisador de labirintos com DFS, BFS e contagem de regiões.
- Planejador de oficinas com combinações, restrições e mochila.

Monte um roteiro de projeto com cinco partes.

| Parte | Entrega esperada | Técnica principal | Testes obrigatórios |
| --- | --- | --- | --- |
| 1 | Modelagem da entrada | | |
| 2 | Operação principal simples | | |
| 3 | Operação eficiente ou algoritmo central | | |
| 4 | Casos de borda e validação | | |
| 5 | Relatório de análise | | |

O relatório deve conter:

- pré-condições;
- custo esperado ou pior caso;
- justificativa da técnica escolhida;
- uma alternativa rejeitada;
- principal bug evitado.

## Créditos e reaproveitamento

Exercícios adaptados de busca e desempenho, ordenação, caminhos e mochila/backtracking dos handouts antigos devem indicar:

> Adaptado de material de Igor Montagner para a disciplina Técnicas de Programação.
