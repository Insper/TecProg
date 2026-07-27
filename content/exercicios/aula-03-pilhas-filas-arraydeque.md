---
title: "Exercícios — Aula 03 — Pilhas e filas com `ArrayDeque`"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Use `Pilha` para comportamento LIFO: último a entrar, primeiro a sair.
- Use `Fila` para comportamento FIFO: primeiro a entrar, primeiro a sair.
- Em todas as simulações, mostre o estado da estrutura após cada operação.

## Exercício 1 — A mesma sequência em pilha e em fila

Simule os dois blocos de pseudocódigo. Compare as saídas.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{TESTE-PILHA}.}
\Input{none}
\Output{textos impressos}
\BlankLine
\BlankLine
$P \gets \texttt{PILHA-VAZIA}()$\;
\BlankLine
$\texttt{EMPILHAR}(P, "Ana")$\;
$\texttt{EMPILHAR}(P, "Bruno")$\;
$\texttt{EMPILHAR}(P, "Carla")$\;
$\texttt{IMPRIMIR}(\texttt{TOPO}(P))$\;
$\texttt{IMPRIMIR}(\texttt{DESEMPILHAR}(P))$\;
$\texttt{EMPILHAR}(P, "Diego")$\;
$\texttt{IMPRIMIR}(\texttt{DESEMPILHAR}(P))$\;
$\texttt{IMPRIMIR}(\texttt{DESEMPILHAR}(P))$\;
\caption{TestePilha}
\end{algorithm}

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{TESTE-FILA}.}
\Input{none}
\Output{textos impressos}
\BlankLine
\BlankLine
$F \gets \texttt{FILA-VAZIA}()$\;
\BlankLine
$\texttt{ENFILEIRAR}(F, "Ana")$\;
$\texttt{ENFILEIRAR}(F, "Bruno")$\;
$\texttt{ENFILEIRAR}(F, "Carla")$\;
$\texttt{IMPRIMIR}(\texttt{FRENTE}(F))$\;
$\texttt{IMPRIMIR}(\texttt{DESENFILEIRAR}(F))$\;
$\texttt{ENFILEIRAR}(F, "Diego")$\;
$\texttt{IMPRIMIR}(\texttt{DESENFILEIRAR}(F))$\;
$\texttt{IMPRIMIR}(\texttt{DESENFILEIRAR}(F))$\;
\caption{TesteFila}
\end{algorithm}

[break]

| passo | estado da pilha | saída da pilha | estado da fila | saída da fila |
| ----: | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |

Por que as saídas finais são diferentes?

[break]

## Exercício 2 — Parênteses balanceados

Complete a simulação do algoritmo para `texto = "(()())"` e para `texto = "())("`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{PARENTESES-BALANCEADOS}.}
\Input{string}
\Output{boolean}
\BlankLine
\BlankLine
$P \gets \texttt{PILHA-VAZIA}()$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(texto) - 1$}{
    $c \gets texto[i]$\;
\BlankLine
    \If{$c = "("$}{
        $\texttt{EMPILHAR}(P, c)$\;
\BlankLine
    }
    \If{$c = ")"$}{
        \If{$\texttt{VAZIA}(P)$}{
            \Return{\textbf{false}}\;
        }
        $\texttt{DESEMPILHAR}(P)$\;
\BlankLine
    }
}
\Return{\texttt{VAZIA}(P)}\;
\caption{ParentesesBalanceados}
\end{algorithm}

| i | c | ação | pilha após a ação |
| -: | --- | --- | --- |
| 0 | | | |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

Explique o que significa a pilha estar vazia no final.

[break]

## Exercício 3 — Fila de atendimento

Uma central usa uma fila para registrar chegada e atendimento.

Simule as operações:

1. chega Ana;
2. chega Bruno;
3. atende;
4. chega Carla;
5. chega Diego;
6. atende;
7. consulta próximo;
8. atende.

| passo | operação | fila após operação | saída |
| ----: | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |

Qual pessoa fica aguardando ao final?

[break]

## Exercício 4 — Estrutura inadequada

O algoritmo abaixo usa uma Lista para simular atendimento por ordem de chegada.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{ATENDIMENTO-COM-LISTA}.}
\Input{list pessoas}
\Output{pessoas atendidas}
\BlankLine
\BlankLine
\While{$\texttt{TAMANHO}(pessoas) > 0$}{
    $pessoa \gets \texttt{OBTER}(pessoas, 0)$\;
    $\texttt{REMOVER}(pessoas, 0)$\;
    $\texttt{IMPRIMIR}(pessoa)$\;
}
\caption{AtendimentoComLista}
\end{algorithm}

1. O algoritmo atende na ordem correta?
2. Qual operação tende a ser cara em uma lista baseada em array?
3. Reescreva o algoritmo usando TAD Fila.

[break]

## Exercício 5 — Pilha ou fila?

Escolha a estrutura mais adequada para cada cenário.

| Cenário | Pilha ou fila? | Por quê? |
| --- | --- | --- |
| Desfazer a última ação de um editor | | |
| Chamar senhas de atendimento em ordem | | |
| Verificar delimitadores em uma expressão | | |
| Processar tarefas na ordem em que chegaram | | |
| Resolver o próximo item mais recentemente aberto | | |

Depois, crie um cenário em que usar a estrutura errada muda a resposta.

[break]

## Exercício 6 — Delimitadores múltiplos

Escreva pseudocódigo para validar textos com os delimitadores `()`, `[]` e `{}`.

<!-- Regras:

- ao encontrar abertura, empilhe;
- ao encontrar fechamento, ele deve corresponder ao topo;
- se houver fechamento sem abertura, a resposta é `FALSO`;
- ao final, a pilha deve estar vazia. -->

Teste com:

- `"([{}])"` deve retornar `VERDADEIRO`;
- `"([)]"` deve retornar `FALSO`;
- `"(()"` deve retornar `FALSO`;
- `""` deve retornar `VERDADEIRO`.