# Aula 10 — Ordenação quadrática: insertion sort e análise

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar a ideia do insertion sort;
- implementar insertion sort em Java;
- simular deslocamentos em um array;
- identificar o invariante do prefixo ordenado;
- comparar melhor e pior caso;
- justificar por que o pior caso é quadrático.

<!-- ## Pré-requisitos

Você deve saber trabalhar com arrays, índices, busca linear e custos lineares/quadráticos. Também deve lembrar da discussão sobre inserção no meio de listas: abrir espaço pode exigir deslocar vários elementos. -->

## Problema motivador

Imagine organizar cartas na mão. Você pega uma carta nova e a coloca na posição correta entre as cartas que já estavam ordenadas. Para isso, talvez precise deslocar algumas cartas maiores para a direita.

Insertion sort usa exatamente essa ideia. Ele percorre o array da esquerda para a direita mantendo um prefixo ordenado. A cada passo, insere o próximo elemento na posição correta desse prefixo.

## Ideia central

Para o array:

```text
{8, 3, 5, 2}
```

Começamos considerando que o prefixo de tamanho 1 já está ordenado:

```text
{8 | 3, 5, 2}
```

Agora inserimos `3` no prefixo ordenado:

```text
{3, 8 | 5, 2}
```

Depois inserimos `5`:

```text
{3, 5, 8 | 2}
```

Por fim, inserimos `2`:

```text
{2, 3, 5, 8}
```

## Invariante

Ao início de cada iteração com índice `i`, a parte `v[0..i-1]` está ordenada. A tarefa da iteração é inserir `v[i]` nessa parte, preservando a ordenação.

Esse invariante ajuda a explicar a corretude. Quando o laço termina, `i` já passou por todas as posições; portanto, o array inteiro é o prefixo ordenado.

## Implementação

O algoritmo mantém a `chave` fora do array enquanto abre uma posição para ela. A cada deslocamento, `j` anda para a esquerda; por isso a posição livre final é `j + 1`.

```text
INSERTION-SORT(v)
    FOR i <- 1 TO v.length - 1
        chave <- v[i]
        j <- i - 1

        WHILE j >= 0 AND v[j] > chave DO
            v[j + 1] <- v[j]
            j <- j - 1

        v[j + 1] <- chave
```

Para `i = 2` em `{3, 8, 5, 2}`, o estado intermediário é:

```text
chave = 5, j = 1
{3, 8, 8, 2}  <- desloca 8 para abrir espaço
{3, 5, 8, 2}  <- coloca a chave em j + 1
```
<!-- 
```java
public class InsertionSort {
    public static void ordenar(int[] v) {
        for (int i = 1; i < v.length; i++) {
            int chave = v[i];
            int j = i - 1;

            while (j >= 0 && v[j] > chave) {
                v[j + 1] = v[j];
                j--;
            }

            v[j + 1] = chave;
        }
    }

    public static void imprimir(int[] v) {
        for (int valor : v) {
            System.out.print(valor + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        int[] v = {8, 3, 5, 2};
        ordenar(v);
        imprimir(v); // 2 3 5 8
    }
}
``` -->

<!-- A variável `chave` guarda o valor que será inserido. O laço `while` desloca para a direita os elementos maiores que a chave. Quando encontramos a posição correta, colocamos a chave em `j + 1`. -->

## Simulação passo a passo

Para `{8, 3, 5, 2}`:

| i | chave | deslocamentos | resultado parcial |
| -: | ----: | ------------ | ----------------- |
| 1 | 3 | 8 vai para a direita | `{3, 8, 5, 2}` |
| 2 | 5 | 8 vai para a direita | `{3, 5, 8, 2}` |
| 3 | 2 | 8, 5 e 3 vão para a direita | `{2, 3, 5, 8}` |

O deslocamento é a operação que domina o custo no pior caso.

Você pode acompanhar a execução do algoritmo através do [visualizador de insertion sort](https://www.hackerearth.com/practice/algorithms/sorting/insertion-sort/visualize/)

## Melhor caso

Se o array já está ordenado:

```text
{2, 3, 5, 8}
```

Para cada `i`, a condição `v[j] > chave` falha logo na primeira comparação. Não há deslocamentos. O algoritmo ainda percorre o array, mas faz pouco trabalho interno. O melhor caso é linear: `O(n)`.

## Pior caso

Se o array está em ordem inversa:

```text
{8, 5, 3, 2}
```

Cada nova chave precisa atravessar todo o prefixo ordenado. Para `i = 1`, desloca um elemento. Para `i = 2`, desloca dois. Para `i = 3`, desloca três. Em geral, o total cresce como:

```text
1 + 2 + 3 + ... + (n - 1)
```

Isso cresce proporcionalmente a `n²`. Portanto, o pior caso é `O(n²)`.

## Quando insertion sort é útil?

Insertion sort não é a melhor escolha para arrays muito grandes e desordenados. Mesmo assim, ele é didaticamente valioso e útil em alguns contextos:

- arrays pequenos;
- dados quase ordenados;
- situações em que queremos entender deslocamentos;
- como parte de algoritmos híbridos mais avançados.

Além disso, ele reforça a relação entre ordenação, invariantes e custo.

## Análise informal de custo

O laço externo executa `n - 1` vezes. O laço interno pode executar poucas vezes, se o dado já está quase ordenado, ou muitas vezes, se cada chave precisa voltar até o início.

- Melhor caso: `O(n)`.
- Pior caso: `O(n²)`.
- Memória extra: `O(1)`, pois ordena no próprio array.

O algoritmo é estável se usamos `v[j] > chave`, e não `v[j] >= chave`, porque elementos iguais não são invertidos.

## Erros comuns

- Perder a chave ao sobrescrever `v[i]` antes de guardá-la.
- Usar `j > 0` em vez de `j >= 0`, deixando de comparar com a posição zero.
- Colocar a chave em `v[j]` em vez de `v[j + 1]`.
- Trocar elementos sem entender o deslocamento.
- Dizer que insertion sort é sempre `O(n²)`, ignorando o melhor caso.
- Esquecer que o array é modificado in-place.

<!-- ## Exercícios de fixação

1. Simule insertion sort em `{4, 1, 3, 2}`.
2. Implemente `ordenar(double[] v)`.
3. Conte quantos deslocamentos ocorrem em `{5, 4, 3, 2, 1}`.
4. Explique o invariante do prefixo ordenado.
5. Teste o algoritmo com array vazio e array de um elemento.
6. Explique por que `v[j] > chave` preserva estabilidade.

## Exercício integrador

Implemente uma versão de insertion sort que retorna o número de comparações e deslocamentos realizados. Teste com três arrays:

- já ordenado;
- ordem inversa;
- ordem aleatória.

Escreva um parágrafo comparando os resultados observados com a análise de melhor e pior caso. -->

## Checklist de aprendizagem

- [ ] Sei implementar insertion sort.
- [ ] Sei simular deslocamentos.
- [ ] Sei explicar o invariante.
- [ ] Sei diferenciar melhor e pior caso.
- [ ] Sei justificar `O(n²)` no pior caso.
- [ ] Sei identificar estabilidade no algoritmo.
