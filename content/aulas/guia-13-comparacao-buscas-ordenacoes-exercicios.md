# Aula 13 — Comparação de buscas e ordenações; exercícios aplicados

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- comparar busca linear, busca binária e busca com hash;
- comparar insertion sort, mergesort e quicksort;
- escolher técnica com base no cenário;
- justificar custo, pré-condições e memória;
- montar testes para algoritmos de busca e ordenação;
- resolver problemas aplicados que misturam escolha e implementação.

<!-- ## Pré-requisitos

Você deve conhecer as aulas de busca, estruturas de hash, insertion sort, mergesort e quicksort. Esta aula é uma consolidação antes de grafos: o foco é decidir, não apenas executar um algoritmo já indicado no enunciado. -->

## Problema motivador

Uma loja mantém códigos de produtos. Dependendo do cenário, soluções diferentes fazem sentido:

- poucos produtos e uma consulta eventual: busca linear pode bastar;
- produtos já ordenados e muitas consultas: busca binária é atraente;
- consulta frequente por código sem necessidade de ordem: `HashSet` ou `HashMap`;
- relatório ordenado por preço: ordenação entra na solução;
- dados pequenos quase ordenados: insertion sort pode ser suficiente;
- dados grandes: mergesort ou quicksort tendem a ser melhores.

O bom programador não escolhe técnica por nome bonito. Ele lê as operações dominantes.

## Tabela comparativa de buscas

| Técnica | Pré-condição | Pior caso | Quando usar |
| --- | --- | --- | --- |
| Busca linear | nenhuma ordenação | `O(n)` | dados pequenos, uma consulta, solução simples |
| Busca binária | dados ordenados | `O(log n)` | muitas consultas em dados ordenados |
| `HashSet` | chave bem modelada | esperado `O(1)` por consulta | muitas consultas de presença |
| `HashMap` | chave bem modelada | esperado `O(1)` por consulta | consulta por chave com valor associado |

Busca binária é excelente, mas exige ordenação. Hash é excelente para consulta, mas não entrega dados em ordem e exige modelagem correta de chaves.

## Tabela comparativa de ordenações

| Algoritmo | Melhor caso | Pior caso | Memória extra | Observação |
| --- | --- | --- | --- | --- |
| Insertion sort | `O(n)` | `O(n²)` | `O(1)` | bom para dados pequenos/quase ordenados |
| Mergesort | `O(n log n)` | `O(n log n)` | `O(n)` | estável na versão estudada |
| Quicksort | médio `O(n log n)` | `O(n²)` | baixo, fora pilha | rápido na prática, sensível ao pivô |

Nenhum algoritmo vence sempre. A comparação depende de tamanho, ordem inicial, estabilidade, memória e simplicidade.

## Como escolher?

Pergunte primeiro:

1. O dado precisa estar ordenado?
2. A operação principal é consultar, inserir, remover ou ordenar?
3. Quantas vezes a operação será repetida?
4. Existe pré-condição de ordenação?
5. Preciso preservar ordem de elementos empatados?
6. A memória extra importa?

Essas perguntas transformam análise em decisão técnica.

<!-- ```text
ESCOLHER-TECNICA(dados, muitasConsultas, precisaOrdem, precisaOrdenar)
    IF precisaOrdenar THEN
        IF dados são pequenos OU quase ordenados THEN
            RETURN INSERTION-SORT
        IF precisa de estabilidade garantida THEN
            RETURN MERGESORT
        RETURN QUICKSORT

    IF muitasConsultas AND precisaOrdem THEN
        ORDENAR dados UMA VEZ
        RETURN BUSCA-BINARIA
    IF muitasConsultas THEN
        RETURN HASHSET ou HASHMAP
    RETURN BUSCA-LINEAR
```

O roteiro não substitui a análise: ele torna explícitas as perguntas que precisam ser respondidas antes de escolher uma técnica. -->

## Exemplo aplicado: consultas de estoque

Se temos um array de códigos carregado uma vez e consultado milhares de vezes, há três estratégias:

1. manter sem ordenação e usar busca linear;
2. ordenar uma vez e usar busca binária;
3. construir um `HashSet` e consultar presença.

A estratégia 1 tem implementação simples, mas cada consulta custa `O(n)`. A estratégia 2 paga custo de ordenação antes, mas reduz cada consulta para `O(log n)`. A estratégia 3 paga custo de construção do conjunto e tende a consultar em tempo constante.

Se também precisamos imprimir relatório em ordem, ordenar pode ter valor adicional.

## Testes de corretude

Para busca, teste:

- estrutura vazia;
- um elemento presente;
- um elemento ausente;
- alvo no início;
- alvo no fim;
- repetidos, quando o contrato fala de primeira ou última ocorrência.

Para ordenação, teste:

- vazio;
- um elemento;
- já ordenado;
- ordem inversa;
- repetidos;
- números negativos;
- array aleatório pequeno comparando com resultado esperado.

## Análise informal de custo

Nesta aula, a análise é comparativa:

- busca linear cresce proporcionalmente ao número de elementos;
- busca binária cresce pelo número de divisões por dois;
- hash depende de boa modelagem de chave e tem custo esperado muito baixo por consulta;
- insertion sort pode ser linear em quase ordenado, mas quadrático no pior caso;
- mergesort tem garantia `O(n log n)` e usa memória extra;
- quicksort tem médio `O(n log n)`, mas pode cair para `O(n²)`.

Justificativas devem sempre mencionar pré-condições. Dizer "use busca binária porque é rápida" é incompleto se os dados não estão ordenados.

## Erros comuns

- Usar busca binária em dados não ordenados.
- Ordenar a cada consulta, pagando custo desnecessário.
- Usar hash quando a saída precisa estar ordenada sem etapa extra.
- Comparar algoritmos sem dizer tamanho e padrão dos dados.
- Ignorar estabilidade quando elementos empatados têm informação associada.
- Medir desempenho uma única vez e tirar conclusão forte demais.

<!-- ## Exercícios de fixação

1. Para cada cenário, escolha linear, binária, hash ou ordenação prévia.
2. Monte uma tabela de custos para 10 consultas e para 10.000 consultas.
3. Explique quando insertion sort é aceitável.
4. Explique quando mergesort é preferível a quicksort.
5. Explique quando quicksort pode ter pior caso quadrático.
6. Crie um conjunto de testes para um método de ordenação.

## Exercício integrador

Implemente um mini sistema de catálogo com duas soluções:

- solução A: `ArrayList` + busca linear;
- solução B: `HashMap<Integer, String>` para código e nome.

Depois escreva uma análise curta comparando:

- custo de consulta;
- simplicidade;
- memória;
- facilidade de imprimir os produtos ordenados por código.

## Checkpoint sugerido

Resolva em sala ou como entrega curta:

1. implementar busca binária;
2. implementar insertion sort;
3. explicar quando usar hash;
4. comparar mergesort e quicksort;
5. resolver um cenário em que a técnica não é dada no enunciado. -->

## Checklist de aprendizagem

- [ ] Sei comparar buscas.
- [ ] Sei comparar ordenações.
- [ ] Sei declarar pré-condições.
- [ ] Sei escolher técnica por cenário.
- [ ] Sei montar testes de borda.
- [ ] Sei justificar custo e memória.
