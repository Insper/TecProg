# Aula 05 — Busca linear e introdução prática a Big-O

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- implementar busca linear em arrays e `ArrayList`;
- definir contratos de busca com retorno booleano ou índice;
- tratar casos de borda como estrutura vazia e alvo ausente;
- explicar melhor caso, pior caso e caso médio informal;
- usar Big-O como linguagem para descrever crescimento;
- comparar busca linear com estruturas vistas anteriormente.

<!-- ## Pré-requisitos

Você já deve saber percorrer arrays e listas, contar operações simples e usar `ArrayList`, `HashSet` e `HashMap`. Agora vamos estudar explicitamente a estratégia mais direta de busca: olhar um elemento por vez. -->

## Problema motivador

Temos um array de códigos de alunos e queremos saber se um código específico está presente.

Se os dados não estão ordenados e não há estrutura auxiliar, a solução mais simples é verificar cada elemento:

```text
BUSCAR(v, alvo)
  Input: array v, value alvo
  Output: int

  FOR i <- 0 TO tamanho(v) - 1 DO
    IF v[i] = alvo THEN
      RETURN i

  RETURN -1
```

Essa estratégia é chamada de busca linear ou busca sequencial.

## Contratos de busca

Antes de implementar um algoritmo de busca, precisamos decidir qual seu objetivo. Esse é o contrato do método. Alguns contratos comuns:

- retornar `true` ou `false`;
- retornar o índice em que o alvo aparece;
- retornar `-1` quando o alvo não aparece;
- retornar a primeira ocorrência;
- retornar a última ocorrência;
- contar quantas ocorrências existem.

O contrato deve estar claro porque o código muda. Uma busca que retorna `boolean` pode parar assim que encontra o alvo. Uma busca que conta ocorrências precisa percorrer até o fim.

## Exemplo guiado: retornar índice

```text
BUSCAR-INDICE(v, alvo)
  Input: array v, number alvo
  Output: number

  FOR i <- 0 TO v.length - 1 DO
    IF v[i] = alvo THEN
      RETURN i

  RETURN -1
```

O método `BUSCAR-INDICE` retorna a posição da primeira ocorrência do valor alvo. Para `{42, 17, 93, 58, 17}` e alvo `17`, o retorno é `1`, não `4`, porque a busca para no primeiro encontro.

Podemos facilmente adaptar a solução para construir um contrato onde verificamos se o alvo está presente, retornando `true` ou `false`.

```text
CONTEM(v, alvo)
  Input: array v, number alvo
  Output: boolean

  RETURN BUSCAR-INDICE(v, alvo) != -1
```

Podemos reaproveitar o código de busca por índice para implementar a busca booleana. O contrato de `CONTEM` é mais simples, mas o código pode ser mais longo dependendo de como implementamos. Por isso, é importante pensar no contrato antes de escrever o código.

## Big-O

Big-O é uma forma curta de falar sobre como o custo cresce quando a entrada aumenta. Nesta aula, vamos usar Big-O como linguagem prática, não como formalismo matemático pesado.

Na busca linear:

- se o alvo está na primeira posição, fazemos uma comparação;
- se o alvo está na última posição, fazemos `n` comparações;
- se o alvo não aparece, também fazemos `n` comparações.

O pior caso cresce proporcionalmente ao tamanho do array. Por isso dizemos que a busca linear tem custo `O(n)`.

`O(n)` não significa exatamente `n` operações sempre. Significa que o custo cresce linearmente: dobrar o tamanho da entrada tende a dobrar o trabalho no pior caso.

## Melhor caso, pior caso e caso ausente

Considere `v = {8, 3, 5, 9, 2}`.

| Alvo | Comparações | Situação |
| ---: | ----------: | --- |
| 8 | 1 | melhor caso |
| 5 | 3 | caso intermediário |
| 2 | 5 | pior caso com presente |
| 7 | 5 | pior caso com ausente |

O caso ausente é especialmente importante. Muitos bugs aparecem quando o programador esquece de retornar algo depois do laço.

## Busca linear versus hash

Na aula anterior, vimos `HashSet`. Se precisamos fazer uma única busca em uma lista pequena, busca linear pode ser suficiente e simples. Se precisamos fazer milhares de consultas de presença, talvez valha construir um `HashSet` uma vez e consultar nele.

Exemplo de decisão:

- "Tenho cinco nomes e vou procurar uma vez": busca linear.
- "Tenho milhares de matrículas e vou verificar presença muitas vezes": `HashSet`.
- "Preciso associar matrícula a nota": `HashMap`.

Escolher técnica é parte do raciocínio algorítmico.

## Análise informal de custo

Para `buscarIndice`, a operação principal é a comparação entre elemento e alvo. No pior caso, ela ocorre uma vez para cada elemento. Portanto:

- tempo: `O(n)`;
- memória extra: `O(1)`, porque usamos apenas algumas variáveis além da entrada.

Para contar ocorrências, o tempo também é `O(n)`, mesmo que o alvo apareça na primeira posição, porque precisamos saber se aparece de novo depois.

## Erros comuns

- Retornar `false` ou `-1` dentro do laço depois da primeira comparação que falha.
- Usar `==` para comparar strings.
- Esquecer o retorno quando o alvo não aparece.
- Dizer que busca linear é sempre ruim. Para dados pequenos ou poucas consultas, ela pode ser adequada.
- Confundir primeira ocorrência com qualquer ocorrência.
- Ignorar o custo de construir uma estrutura auxiliar antes de comparar com hash.

<!-- ## Exercícios de fixação

1. Implemente `contem(int[] v, int alvo)` retornando booleano.
2. Implemente `primeiraOcorrencia(String[] nomes, String alvo)`.
3. Implemente `contarOcorrencias(int[] v, int alvo)`.
4. Implemente `todosMaioresQue(int[] v, int limite)`.
5. Faça teste de mesa para buscar `9` em `{4, 9, 1, 9}`.
6. Para cada método, indique a operação principal e o pior caso.
7. Explique quando seria melhor usar `HashSet` em vez de busca linear.

## Exercício integrador

Implemente um pequeno sistema de consulta de códigos:

- receba um array de códigos inteiros;
- implemente busca linear por código;
- retorne a primeira posição;
- conte quantas consultas foram feitas;
- imprima uma explicação do custo no pior caso.

Depois, responda: se o sistema passasse a receber muitas consultas por minuto, qual estrutura estudada até agora poderia melhorar as consultas de presença? -->

## Checklist de aprendizagem

- [ ] Sei implementar busca linear.
- [ ] Sei definir retorno para alvo ausente.
- [ ] Sei diferenciar primeira e última ocorrência.
- [ ] Sei explicar `O(n)` em linguagem prática.
- [ ] Sei identificar melhor e pior caso.
- [ ] Sei comparar busca linear com uso de hash.
