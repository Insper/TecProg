---
title: "Exercícios — Aula 18 — Combinações, subconjuntos e permutações"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Diferencie a pergunta: qualquer subconjunto, subconjunto de tamanho fixo, combinação ou permutação.
- Use `inicio` quando a ordem não importa e não queremos duplicar combinações.
- Use `usado[]` quando a ordem importa e cada elemento pode ocupar posições diferentes.

## Exercício 1 — Simulação de permutações com `usado[]`

Simule o algoritmo para `v = [1, 2, 3]`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{PERMUTACOES}.}
\Input{array v}
\Output{list respostas}
\BlankLine
\BlankLine
$respostas \gets \texttt{LISTA-VAZIA}()$\;
$atual \gets \texttt{LISTA-VAZIA}()$\;
$usado \gets \texttt{ARRAY-DE-FALSOS}(\texttt{TAMANHO}(v))$\;
$\texttt{PERMUTAR}(v, usado, atual, respostas)$\;
\Return{respostas}\;
\BlankLine
\caption{Permutacoes}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{PERMUTAR}.}
\Input{array v, array usado, list atual, list respostas}
\Output{none}
\BlankLine
\BlankLine
\If{$\texttt{TAMANHO}(atual) = \texttt{TAMANHO}(v)$}{
    $\texttt{ADICIONAR-COPIA}(respostas, atual)$\;
    \Return{}\;
\BlankLine
}
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(v) - 1$}{
    \If{$usado[i] = \textbf{false}$}{
        $usado[i] \gets \textbf{true}$\;
        $\texttt{ADICIONAR}(atual, v[i])$\;
\BlankLine
        $\texttt{PERMUTAR}(v, usado, atual, respostas)$\;
\BlankLine
        $\texttt{REMOVER-ULTIMO}(atual)$\;
        $usado[i] \gets \textbf{false}$\;
    }
}
\caption{Permutar}
\end{algorithm}

Preencha a tabela para as primeiras chamadas até registrar `[1, 2, 3]`, depois continue listando todas as respostas.

| passo | `atual` antes da escolha | `usado` antes | escolha | resposta registrada? |
| ----: | --- | --- | --- | --- |
| 1 | `[]` | `[F, F, F]` | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |

Liste todas as permutações registradas na ordem do algoritmo.

[break]

## Exercício 2 — Combinações de tamanho `k`

Escreva pseudocódigo para gerar combinações de tamanho `k`.

Contrato:

- entrada: array `v`, inteiro `k`;
- saída: lista de combinações com exatamente `k` elementos;
- use parâmetro `inicio`;
- registre uma cópia quando `TAMANHO(atual) = k`;
- depois de escolher um elemento, a próxima chamada deve começar em `i + 1`.

Teste com:

- `v = [1, 2, 3, 4]`, `k = 2`;
- `v = [1, 2, 3]`, `k = 0`;
- `v = [1, 2]`, `k = 3`.

[break]

## Exercício 3 — Subconjuntos de tamanho `k`

Agora gere subconjuntos de tamanho `k` usando a lógica incluir/não incluir.

Complete o pseudocódigo.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{SUBCONJUNTOS-K}.}
\Input{array v, int k}
\Output{list respostas}
\BlankLine
\BlankLine
$respostas \gets \texttt{LISTA-VAZIA}()$\;
$\texttt{BACKTRACK-K}(v, 0, k, \texttt{LISTA-VAZIA}(), respostas)$\;
\Return{respostas}\;
\BlankLine
\caption{SubconjuntosK}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{BACKTRACK-K}.}
\Input{array v, int i, int k, list atual, list respostas}
\Output{none}
\BlankLine
\BlankLine
\If{$\texttt{TAMANHO}(atual) > k$}{
    \Return{}\;
\BlankLine
}
\If{$i = \texttt{TAMANHO}(v)$}{
    \If{$\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$}{
        $\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$\;
    }
    \Return{}\;
\BlankLine
}
$\texttt{BACKTRACK-K}(v, i + 1, k, atual, respostas)$\;
\BlankLine
$\texttt{ADICIONAR}(atual, v[i])$\;
$\texttt{BACKTRACK-K}(v, i + 1, k, atual, respostas)$\;
$\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_$\;
\caption{BacktrackK}
\end{algorithm}

Compare com o Exercício 2:

1. Qual versão tende a fazer chamadas que já sabemos que não completam tamanho `k`?
2. Como poderíamos podar quando faltam poucos elementos?

[break]

## Exercício 4 — Qual estado usar?

Escolha entre `i`, `inicio` e `usado[]`.

| Tarefa | Estado mais adequado | Justificativa |
| --- | --- | --- |
| Gerar todos os subconjuntos | | |
| Gerar combinações de tamanho 3 | | |
| Gerar permutações | | |
| Decidir incluir/não incluir cada item da mochila | | |
| Escolher uma ordem de apresentação de grupos | | |
| Escolher um grupo sem importar a ordem | | |

Depois responda:

1. Por que `inicio` evita combinações duplicadas?
2. Por que `usado[]` é necessário em permutações?
3. Em quais tarefas a ordem da resposta importa?

[break]

## Exercício 5 — Duplicação de combinações

O algoritmo abaixo tenta gerar combinações de tamanho `2`, mas produz duplicatas em ordens diferentes.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{COMBINACOES-COM-ERRO}.}
\Input{array v, int k, list atual, list respostas}
\Output{none}
\BlankLine
\BlankLine
\If{$\texttt{TAMANHO}(atual) = k$}{
    $\texttt{ADICIONAR-COPIA}(respostas, atual)$\;
    \Return{}\;
\BlankLine
}
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(v) - 1$}{
    \If{$v[i] \textbf{ not in } atual$}{
        $\texttt{ADICIONAR}(atual, v[i])$\;
        $\texttt{COMBINACOES-COM-ERRO}(v, k, atual, respostas)$\;
        $\texttt{REMOVER-ULTIMO}(atual)$\;
    }
}
\caption{CombinacoesComErro}
\end{algorithm}

1. Simule para `v = [1, 2, 3]`, `k = 2`.
2. Quais respostas duplicadas aparecem como ordens diferentes?
3. Qual parâmetro deve ser adicionado para evitar isso?
4. Reescreva o laço usando esse parâmetro.

[break]

## Exercício 6 — Quantidade de respostas

Complete a tabela.

| n | subconjuntos `2^n` | permutações `n!` | combinações de tamanho 2 |
| -: | -----------------: | ---------------: | -----------------------: |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |

Depois responda:

1. Qual cresce mais rápido: `2^n` ou `n!`?
2. Por que permutação costuma explodir rapidamente?
3. Para `n = 10`, quantas permutações existem?
4. Por que é perigoso testar geração de todas as permutações apenas com entradas pequenas?

## Créditos e reaproveitamento

Exercícios majoritariamente novos. Quando houver inspiração direta do acervo antigo de backtracking, árvore de decisões e enumeração exaustiva, indicar:

> Adaptado de material de Igor Montagner para a disciplina Técnicas de Programação.
