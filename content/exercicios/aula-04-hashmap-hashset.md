---
title: "Exercícios — Aula 04 — Mapas e Conjuntos"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Neste handout, use os TADs `Mapa` e `Conjunto`.
- Um mapa associa chave a valor. Um conjunto guarda presença sem repetição.
- A ordem interna de mapas e conjuntos não faz parte da resposta.

## Exercício 1 — Frequência de palavras com mapa

Simule o algoritmo para:

`palavras = ["Casa", "casa", "mesa", "CASA", "mesa", "janela"]`

Considere que `NORMALIZAR` transforma o texto para letras minúsculas e remove espaços extras.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{FREQUENCIA-PALAVRAS}.}
\Input{array palavras}
\Output{mapa freq}
\BlankLine
\BlankLine
$freq \gets \texttt{MAPA-VAZIO}()$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(palavras) - 1$}{
    $chave \gets \texttt{NORMALIZAR}(palavras[i])$\;
\BlankLine
    \If{$\texttt{CONTEM-CHAVE}(freq, chave)$}{
        $atual \gets \texttt{OBTER}(freq, chave)$\;
    } \Else{
        $atual \gets 0$\;
\BlankLine
    }
    $\texttt{COLOCAR}(freq, chave, atual + 1)$\;
\BlankLine
}
\Return{freq}\;
\caption{FrequenciaPalavras}
\end{algorithm}

| i | palavra original | chave normalizada | mapa ao final da repetição |
| -: | --- | --- | --- |
| 0 | | | |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

Qual é o mapa final?

[break]

## Exercício 2 — Deduplicação com conjunto

Simule o algoritmo para `valores = [4, 8, 4, 2, 8, 9]`.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{UNICOS}.}
\Input{array values}
\Output{conjunto vistos}
\BlankLine
\BlankLine
$vistos \gets \texttt{CONJUNTO-VAZIO}()$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(valores) - 1$}{
    $\texttt{ADICIONAR}(vistos, valores[i])$\;
\BlankLine
}
\Return{vistos}\;
\caption{Unicos}
\end{algorithm}

| i | valores[i] | conjunto após adicionar |
| -: | ---------: | --- |
| 0 | | |
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |

Quantos valores distintos existem? Por que adicionar `4` pela segunda vez não muda o conjunto?

[break]

## Exercício 3 — Consulta de chave ausente

O pseudocódigo abaixo tenta contar ocorrências, mas tem um problema quando a chave ainda não existe.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONTA-COM-ERRO}.}
\Input{array values}
\Output{mapa contagem}
\BlankLine
\BlankLine
$contagem \gets \texttt{MAPA-VAZIO}()$\;
\BlankLine
\For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(valores) - 1$}{
    $x \gets valores[i]$\;
    $atual \gets \texttt{OBTER}(contagem, x)$\;
    $\texttt{COLOCAR}(contagem, x, atual + 1)$\;
\BlankLine
}
\Return{contagem}\;
\caption{ContaComErro}
\end{algorithm}

1. Simule a primeira repetição para `valores = [5, 5, 7]`.
2. O que acontece ao tentar obter uma chave ausente?
3. Reescreva o corpo do laço tratando esse caso.

[break]

## Exercício 4 — Contagem de inteiros

Escreva pseudocódigo para `CONTAR-INTEIROS`. Tente não consultar exercícios anteriores.

Contrato:

- entrada: array de inteiros `valores`;
- saída: mapa em que cada inteiro aponta para sua quantidade de ocorrências.

Teste com:

- `[1, 2, 1, 3, 2, 1]`;
- `[]`;
- `[9, 9, 9]`.

[break]

## Exercício 5 — Estruturas.

Escolha a estrutura mais adequada.

| Problema | Estrutura | Justificativa |
| --- | --- | --- |
| Guardar nomes na ordem em que foram digitados | | |
| Saber rapidamente se uma matrícula já apareceu | | |
| Associar matrícula a nota final | | |
| Contar quantas vezes cada palavra aparece | | |
| Remover repetições de uma coleção | | |
| Guardar uma fila de atendimento | | |

Em quais linhas a ordem de inserção é importante?