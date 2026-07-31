---
title: "Exercícios — Aula 20 — Problema aplicado e escolha da técnica"
subtitle: "Técnicas de Programação"
author: "Marcio F. Stabile Jr."
...

## Instruções

- Antes de escolher uma técnica, identifique a operação dominante.
- Justifique pré-condições, custo, memória e riscos de erro.
- Quando houver pseudocódigo pronto, simule primeiro e só depois proponha melhoria.

## Exercício 1 — Solução ingênua e gargalo

Um catálogo guarda produtos como pares `(codigo, preco)`.

```text
produtos = [(42, 10), (17, 8), (93, 25), (58, 12), (21, 7)]
consultas = [93, 10, 42, 21]
```

Simule a solução ingênua abaixo.

\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\KwResult{Executa \texttt{CONSULTAR-PRODUTOS-INGENUO}.}
\Input{list produtos, list consultas}
\Output{respostas e quantidade de comparações}
\BlankLine
\BlankLine
$comparacoes \gets 0$\;
\BlankLine
\For{$c \gets 0 \textbf{ to } \texttt{TAMANHO}(consultas) - 1$}{
    $alvo \gets consultas[c]$\;
    $encontrado \gets \textbf{false}$\;
    $preco \gets -1$\;
\BlankLine
    \For{$i \gets 0 \textbf{ to } \texttt{TAMANHO}(produtos) - 1$}{
        $comparacoes \gets comparacoes + 1$\;
\BlankLine
        \If{$produtos[i].codigo = alvo$}{
            $encontrado \gets \textbf{true}$\;
            $preco \gets produtos[i].preco$\;
            \textbf{break}\;
\BlankLine
        }
    }
    $\texttt{IMPRIMIR}(alvo, encontrado, preco)$\;
\BlankLine
}
$\texttt{IMPRIMIR}("comparacoes", comparacoes)$\;
\caption{ConsultarProdutosIngenuo}
\end{algorithm}

Preencha a tabela.

| consulta | índices visitados | encontrado? | preço | comparações acumuladas |
| -------: | --- | --- | ---: | ---------------------: |
| 93 | | | | |
| 10 | | | | |
| 42 | | | | |
| 21 | | | | |

Depois responda:

1. Qual é o gargalo da solução?
2. Se houvesse milhares de consultas, qual estrutura estudada seria melhor?
3. Qual custo extra aparece antes das consultas nessa solução melhor?
4. Se também fosse necessário imprimir produtos ordenados por código, que etapa adicional poderia ser útil?

[break]

## Exercício 2 — Estrutura de dados para consultas

Escolha a estrutura ou estratégia mais adequada em cada cenário.

| Cenário | Técnica escolhida | Justificativa |
| --- | --- | --- |
| Poucos produtos e uma consulta eventual | | |
| Muitas consultas de presença por código | | |
| Muitas consultas que precisam devolver preço por código | | |
| Relatório ordenado por código uma vez por dia | | |
| Inserções frequentes e consultas simples em turma pequena | | |
| Verificar rapidamente se uma matrícula já apareceu | | |

Para cada linha, diga se a técnica exige alguma preparação antes das consultas.

[break]

## Exercício 3 — Busca e ordenação em um catálogo

Uma loja recebe diariamente um catálogo novo. Ela precisa:

- responder a muitas consultas por código;
- gerar um relatório ordenado por preço;
- detectar códigos repetidos;
- aceitar que o catálogo do dia anterior seja descartado.

Monte uma solução em etapas. Para cada etapa, escolha uma técnica estudada.

| Etapa | Técnica | Custo esperado ou pior caso | Justificativa |
| --- | --- | --- | --- |
| Detectar repetidos | | | |
| Preparar consultas por código | | | |
| Responder consultas | | | |
| Gerar relatório ordenado | | | |
| Testar corretude | | | |

Depois escreva uma explicação curta dizendo por que ordenar a cada consulta seria uma má escolha.

[break]

## Exercício 4 — DFS ou BFS em matriz

Para cada problema em matriz, escolha DFS, BFS ou ambos.

| Problema | Técnica | Justificativa |
| --- | --- | --- |
| Saber se existe caminho entre `S` e `D` | | |
| Encontrar menor número de passos até `D` | | |
| Contar regiões livres separadas | | |
| Pintar uma região inteira com uma nova cor | | |
| Listar todos os caminhos simples entre origem e destino | | |
| Verificar se todas as células livres são alcançáveis a partir de `S` | | |

Agora crie uma matriz pequena em que DFS encontra um caminho, mas não necessariamente o menor.

[break]

## Exercício 5 — Quando escolher backtracking?

Para cada enunciado, diga se backtracking é uma boa técnica inicial.

| Enunciado | Backtracking? | Estado parcial | Restrição ou poda possível |
| --- | --- | --- | --- |
| Existe subconjunto com soma igual a `T`? | | | |
| Gerar todas as permutações de uma lista pequena | | | |
| Consultar preço de produto por código | | | |
| Escolher itens de maior valor sem passar da capacidade | | | |
| Encontrar menor caminho em grafo sem pesos | | | |
| Gerar combinações de tamanho `k` | | | |

Explique por que backtracking não deve ser usado apenas porque o problema “parece difícil”.

[break]

## Exercício 6 — Justificativa técnica completa

Leia o cenário.

Uma feira de projetos precisa de um sistema que:

- receba inscrições de equipes;
- consulte rapidamente uma equipe pelo código;
- gere uma lista ordenada por nota final;
- calcule o menor caminho entre salas do evento em uma matriz sem pesos;
- escolha, entre até 20 oficinas, um subconjunto que caiba em um limite de horas e maximize interesse.

Preencha a tabela.

| Parte do sistema | Técnica escolhida | Pré-condição | Custo esperado/pior caso | Risco principal |
| --- | --- | --- | --- | --- |
| Consulta por código | | | | |
| Lista ordenada por nota | | | | |
| Menor caminho entre salas | | | | |
| Escolha de oficinas | | | | |
| Testes de borda | | | | |

Finalize com um parágrafo defendendo suas escolhas. O parágrafo deve mencionar pelo menos uma pré-condição, um custo e uma alternativa rejeitada.

## Créditos e reaproveitamento

Exercícios adaptados de comparação de desempenho, ordenação, labirintos, heurísticas e backtracking dos handouts antigos devem indicar:

> Adaptado de material de Igor Montagner para a disciplina Técnicas de Programação.
