# Aula 06 — Busca binária iterativa

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar a pré-condição de ordenação da busca binária;
- implementar busca binária iterativa com intervalo fechado;
- atualizar corretamente `inicio`, `fim` e `meio`;
- simular a busca com alvo presente e ausente;
- identificar erros comuns de limite e laço infinito;
- justificar o custo logarítmico de forma informal.

<!-- ## Pré-requisitos

Você deve saber implementar busca linear, percorrer arrays e interpretar índices. Também deve estar confortável com a ideia de pior caso e com a notação `O(n)` vista na aula anterior. -->

## Problema motivador

Suponha que temos um array com códigos de alunos em ordem crescente:

```text
{3, 8, 12, 19, 25, 31, 42, 57, 68}
```

Queremos descobrir se o código `42` está presente. A busca linear olharia um por um. Mas, como os dados estão ordenados, podemos começar pelo meio. Se o valor do meio é menor que o alvo, descartamos toda a metade esquerda. Se é maior, descartamos toda a metade direita. A cada passo, o intervalo de candidatos diminui drasticamente.

Essa é a busca binária.

## Pré-condição: array ordenado

Busca binária só é correta quando o array está ordenado segundo o mesmo critério usado na comparação. Se o array não está ordenado, comparar com o elemento do meio não permite descartar metade dos dados.

Esta pré-condição precisa aparecer na explicação e nos testes:

```text
Pré-condição: v está ordenado em ordem crescente.
Pós-condição: retorna o índice do alvo ou -1 se o alvo não aparece.
```

Usar busca binária em dados não ordenados é um erro de corretude, não apenas de desempenho.

## Ideia com intervalo fechado

Vamos usar a convenção de intervalo fechado: os candidatos estão entre `inicio` e `fim`, inclusive. No começo:

```text
inicio = 0
fim = v.length - 1
```

Enquanto `inicio <= fim`, ainda existe pelo menos um candidato. Calculamos o meio, comparamos e descartamos uma parte:

- se `v[meio] == alvo`, encontramos;
- se `v[meio] < alvo`, o alvo só pode estar à direita;
- se `v[meio] > alvo`, o alvo só pode estar à esquerda.

## Pseudocódigo

```text
BUSCA-BINARIA(v, alvo)
    inicio <- 0
    fim <- TAMANHO(v) - 1
    WHILE inicio <= fim DO
        meio <- inicio + (fim - inicio) / 2
        IF v[meio] = alvo THEN
            RETURN meio
        ELSE IF v[meio] < alvo THEN
            inicio <- meio + 1
        ELSE
            fim <- meio - 1
    RETURN -1
```

<!-- ## Implementação Java

```java
public class BuscaBinariaIterativa {
    public static int buscar(int[] v, int alvo) {
        int inicio = 0;
        int fim = v.length - 1;

        while (inicio <= fim) {
            int meio = inicio + (fim - inicio) / 2;

            if (v[meio] == alvo) {
                return meio;
            } else if (v[meio] < alvo) {
                inicio = meio + 1;
            } else {
                fim = meio - 1;
            }
        }

        return -1;
    }

    public static void main(String[] args) {
        int[] v = {3, 8, 12, 19, 25, 31, 42, 57, 68};

        System.out.println(buscar(v, 42)); // 6
        System.out.println(buscar(v, 4));  // -1
        System.out.println(buscar(v, 3));  // 0
        System.out.println(buscar(v, 68)); // 8
    }
}
``` -->

A expressão `inicio + (fim - inicio) / 2` evita uma soma potencialmente grande em arrays enormes. Para nossos exemplos, `(inicio + fim) / 2` funcionaria, mas é bom praticar a forma mais robusta.

## Simulação com alvo presente

Para `v = {3, 8, 12, 19, 25, 31, 42, 57, 68}` e alvo `42`:

| passo | inicio | fim | meio | v[meio] | decisão |
| ----: | -----: | --: | ---: | ------: | ------- |
| 1 | 0 | 8 | 4 | 25 | alvo está à direita |
| 2 | 5 | 8 | 6 | 42 | encontrou |

Em vez de comparar sete elementos como a busca linear faria até o índice `6`, a busca binária fez duas comparações.

## Simulação com alvo ausente

Para `v = {3, 8, 12, 19, 25, 31, 42, 57, 68}` e alvo `4`:

| passo | inicio | fim | meio | v[meio] | decisão |
| ----: | -----: | --: | ---: | ------: | ------- |
| 1 | 0 | 8 | 4 | 25 | alvo está à esquerda |
| 2 | 0 | 3 | 1 | 8 | alvo está à esquerda |
| 3 | 0 | 0 | 0 | 3 | alvo está à direita |
| fim | 1 | 0 | - | - | intervalo vazio |

Quando `inicio` passa de `fim`, não há candidatos restantes. O retorno é `-1`.

## Invariante informal

Durante a execução, se o alvo ainda pode estar no array, ele está dentro do intervalo `inicio..fim`. Cada atualização precisa preservar essa frase. Quando descartamos uma metade, fazemos isso porque a ordenação garante que nenhum valor daquela metade pode ser o alvo.

Esse raciocínio é mais importante do que decorar o código. Ele explica por que `inicio = meio + 1` e `fim = meio - 1` avançam corretamente.

<!-- ## Análise informal de custo

A busca linear reduz o problema de `n` para `n - 1`, depois `n - 2`, e assim por diante. 

A busca binária é um algoritmo utilizado para procurar um valor em um **array ordenado**.

A ideia principal é comparar o valor procurado com o elemento que está no meio do array.

* Se o elemento do meio for o valor procurado, a busca termina.
* Se o valor procurado for menor, continuamos apenas na metade esquerda.
* Se o valor procurado for maior, continuamos apenas na metade direita.

Assim, a cada comparação, aproximadamente metade dos elementos restantes é descartada.

Para entender por que esse comportamento está relacionado ao logaritmo, primeiro precisamos entender o significado de um logaritmo na base 2. -->

---

## Análise de custo

Considere a seguinte potência:

[
2^3 = 8
]

Essa expressão responde à pergunta:

> Qual é o resultado de multiplicar o número 2 por ele mesmo 3 vezes?

[
2^3 = 2 \times 2 \times 2 = 8
]

O logaritmo faz a pergunta inversa.

[
\log_2 8 = 3
]

Essa expressão pode ser lida como:

> A qual potência devemos elevar 2 para obter 8?

Como:

[
2^3 = 8
]

então:

[
\log_2 8 = 3
]

De maneira geral:

[
\log_2 n = k
]

significa que:

[
2^k = n
]

Portanto, potência e logaritmo são operações inversas.

---

### Outra interpretação do logaritmo na base 2

O logaritmo na base 2 também pode ser entendido como:

> Quantas vezes podemos dividir um número por 2 até chegar a 1?

Por exemplo, começando com 8:

[
8 \div 2 = 4
]

[
4 \div 2 = 2
]

[
2 \div 2 = 1
]

Foram realizadas 3 divisões.

Por isso:

[
\log_2 8 = 3
]

---

### Exemplo com um array de tamanho 8

Considere o seguinte array ordenado:

```text
Índice:  0   1   2   3   4   5   6   7
Valor:  10  20  30  40  50  60  70  80
```

Suponha que queremos procurar o valor `80`.

No início, existem 8 elementos que podem conter o valor procurado.

### Primeira comparação

Analisamos um elemento próximo ao meio do array.

```text
10  20  30  40  50  60  70  80
             ^
```

Comparamos o valor procurado, `80`, com `40`.

Como:

```text
80 > 40
```

podemos descartar a metade esquerda, incluindo o valor `40`.

A região de busca passa a ter aproximadamente 4 elementos:

```text
50  60  70  80
```

Portanto:

```text
8 elementos -> 4 elementos
```

### Segunda comparação

Analisamos novamente um elemento próximo ao meio da região restante.

```text
50  60  70  80
        ^
```

Comparamos `80` com `70`.

Como:

```text
80 > 70
```

descartamos novamente uma parte da região.

Restam aproximadamente 2 elementos:

```text
70  80
```

Pensando apenas na redução do espaço de busca, temos:

```text
4 elementos -> 2 elementos
```

### Terceira comparação

Analisamos novamente a região restante.

```text
70  80
    ^
```

O valor `80` é encontrado.

A redução do espaço de busca foi aproximadamente:

```text
8 -> 4 -> 2 -> 1
```

Foram necessários 3 passos de divisão para transformar uma região de tamanho 8 em uma região de tamanho 1.

Isso pode ser representado por:

[
\frac{8}{2^3} = 1
]

Como:

[
2^3 = 8
]

temos:

[
\log_2 8 = 3
]

Portanto, para um array de tamanho 8, a busca binária precisa de aproximadamente 3 divisões do espaço de busca.

---

### Exemplo com um array de tamanho 16

Agora considere um array ordenado com 16 elementos:

```text
Índice:  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
Valor:   5  10  15  20  25  30  35  40  45  50  55  60  65  70  75  80
```

Suponha que queremos procurar o valor `80`.

Os valores comparados serão:

```text
40 -> 60 -> 70 -> 75 -> 80
```

A cada etapa, a região de busca é reduzida aproximadamente pela metade.

```text
16 -> 8 -> 4 -> 2 -> 1
```

Foram realizadas 4 reduções.

Logo:

[
\log_2 16 = 4
]

Isso acontece porque:

[
2^4 = 16
]

---

### Comparando arrays de tamanho 8 e 16

Observe a comparação:

| Tamanho do array | Reduções até chegar a 1 |       Logaritmo |
| ---------------: | ----------------------: | --------------: |
|                8 |                       3 |  (\log_2 8 = 3) |
|               16 |                       4 | (\log_2 16 = 4) |

Ao dobrarmos o tamanho do array de 8 para 16, o número de reduções aumenta apenas de 3 para 4.

```text
8 elementos  -> aproximadamente 3 reduções
16 elementos -> aproximadamente 4 reduções
```

Esse é um comportamento importante da busca binária: mesmo que o tamanho do array dobre, o número de etapas aumenta apenas em uma unidade.

Portanto, o número de etapas da busca binária cresce de acordo com:

[
\log_2 n
]

É por isso que dizemos que o custo da busca binária é:

[
O(\log n)
]

Normalmente, a base 2 não é escrita na notação de custo. Isso acontece porque, na análise do crescimento de algoritmos, mudar a base do logaritmo altera apenas um fator constante, sem mudar o comportamento geral do crescimento.

---

## Erros comuns

- Usar busca binária em array não ordenado.
- Escrever `while (inicio < fim)` e deixar de testar o último candidato.
- Atualizar `inicio = meio` ou `fim = meio`, causando laço infinito.
- Calcular `meio` fora do laço e não recalcular.
- Retornar `-1` dentro do laço após uma comparação que falha.
- Misturar convenção de intervalo fechado com intervalo aberto.

<!-- ## Exercícios de fixação

1. Simule a busca por `31` no array do exemplo.
2. Simule a busca por `70` no array do exemplo.
3. Implemente `contem(int[] v, int alvo)` usando busca binária.
4. Teste arrays de tamanho `0`, `1`, `2` e `3`.
5. Explique por que `inicio = meio + 1` é necessário.
6. Escreva um parágrafo comparando busca linear e binária.

## Exercício integrador

Implemente um método `consultarCodigosOrdenados(int[] codigos, int[] consultas)` que, para cada consulta, imprime se o código aparece e em qual posição. Use busca binária e inclua uma explicação curta da pré-condição de ordenação. -->

## Checklist de aprendizagem

- [ ] Sei declarar a pré-condição de ordenação.
- [ ] Sei implementar busca binária iterativa.
- [ ] Sei simular `inicio`, `fim` e `meio`.
- [ ] Sei explicar por que o intervalo diminui.
- [ ] Sei reconhecer erros de limite.
- [ ] Sei justificar `O(log n)` informalmente.
