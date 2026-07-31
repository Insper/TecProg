# Aula 12 — Quicksort

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar quicksort como divisão e conquista;
- implementar uma função de particionamento;
- simular a posição final do pivô;
- implementar quicksort recursivo;
- comparar caso médio e pior caso;
- reconhecer cuidados com valores repetidos e escolha de pivô.

<!-- ## Pré-requisitos

Você deve conhecer recursão, divisão e conquista, arrays e ordenação por mergesort. No quicksort, a combinação é diferente: em vez de intercalar depois, reorganizamos o array antes das chamadas recursivas. -->

## Problema motivador

Queremos ordenar um array, mas sem usar vetor auxiliar grande como no mergesort. Uma ideia é escolher um elemento como pivô e reorganizar o array para que:

- todos os elementos menores ou iguais ao pivô fiquem antes dele;
- todos os elementos maiores fiquem depois dele;
- o pivô fique em sua posição final.

Depois disso, basta ordenar recursivamente os dois lados.

## Partição como centro do algoritmo

Nesta aula, usaremos o último elemento do intervalo como pivô. O método `particionar` recebe um intervalo fechado `[inicio, fim]` e retorna a posição final do pivô.

```text
QUICKSORT(v, inicio, fim)
    IF inicio >= fim THEN
        RETURN

    p <- PARTICIONAR(v, inicio, fim)
    QUICKSORT(v, inicio, p - 1)
    QUICKSORT(v, p + 1, fim)

PARTICIONAR(v, inicio, fim)
    pivo <- v[fim]
    menores <- inicio

    FOR atual <- inicio TO fim - 1
        IF v[atual] <= pivo THEN
            TROCAR(v, menores, atual)
            menores <- menores + 1

    TROCAR(v, menores, fim)
    RETURN menores
```

Antes de cada iteração, `v[inicio..menores)` contém valores menores ou iguais ao pivô, e `v[menores..atual)` contém valores maiores. Esse é o invariante que explica a posição final do pivô.

<!-- ```java
public class QuickSort {
    public static void ordenar(int[] v) {
        quicksort(v, 0, v.length - 1);
    }

    private static void quicksort(int[] v, int inicio, int fim) {
        if (inicio >= fim) {
            return;
        }

        int p = particionar(v, inicio, fim);
        quicksort(v, inicio, p - 1);
        quicksort(v, p + 1, fim);
    }

    private static int particionar(int[] v, int inicio, int fim) {
        int pivo = v[fim];
        int menores = inicio;

        for (int atual = inicio; atual < fim; atual++) {
            if (v[atual] <= pivo) {
                trocar(v, menores, atual);
                menores++;
            }
        }

        trocar(v, menores, fim);
        return menores;
    }

    private static void trocar(int[] v, int i, int j) {
        int temp = v[i];
        v[i] = v[j];
        v[j] = temp;
    }
}
```

A variável `menores` indica a primeira posição livre depois dos elementos menores ou iguais ao pivô já encontrados. -->

## Simulação da partição

Para `v = {8, 3, 7, 2, 5}`, pivô `5`:

| atual | v[atual] | ação | array |
| ----: | -------: | ---- | ----- |
| 0 | 8 | não troca | `{8, 3, 7, 2, 5}` |
| 1 | 3 | troca com posição 0 | `{3, 8, 7, 2, 5}` |
| 2 | 7 | não troca | `{3, 8, 7, 2, 5}` |
| 3 | 2 | troca com posição 1 | `{3, 2, 7, 8, 5}` |
| fim | 5 | troca pivô com posição 2 | `{3, 2, 5, 8, 7}` |

O pivô `5` está na posição correta: nada à esquerda é maior que ele e nada à direita é menor ou igual a ele.

Você pode acompanhar a execução do algoritmo através do [visualizador de quick sort](https://coddy.tech/visualize/sorting/quick-sort)

## Quicksort depois da partição

Depois da partição, o pivô não precisa mais ser mexido. As chamadas recursivas ordenam apenas os lados:

```text
quicksort(esquerda)
pivo
quicksort(direita)
```

Não há merge final. Essa é uma diferença importante em relação ao mergesort.

## Por que o pivô fica correto?

Durante a partição, mantemos duas regiões:

- antes de `menores`: elementos menores ou iguais ao pivô;
- entre `menores` e `atual`: elementos maiores que o pivô;
- depois de `atual`: elementos ainda não examinados.

Quando o laço termina, todos os elementos antes de `menores` são adequados para a esquerda, e todos entre `menores` e `fim - 1` são maiores que o pivô. Ao trocar o pivô com `menores`, ele entra entre as duas regiões.

## Melhor, médio e pior caso

Se o pivô divide o array em partes razoavelmente equilibradas, o comportamento se parece com outros algoritmos de divisão em metades: custo médio `O(n log n)`.

Se o pivô é sempre o menor ou o maior elemento, uma chamada recebe quase todo o array e a outra recebe quase nada. Isso pode acontecer com esta versão em arrays já ordenados. Nesse caso, o pior caso é `O(n²)`.

## Valores repetidos

Valores repetidos podem gerar divisões ruins dependendo da estratégia de partição. A versão desta aula é simples e didática, mas não é a única. Existem partições em três partes, separando menores, iguais e maiores que o pivô, que lidam melhor com muitos repetidos.

Para a disciplina, o objetivo principal é entender o papel do particionamento e sua relação com as chamadas recursivas.

## Análise informal de custo

Cada chamada de partição percorre o intervalo uma vez. Se as divisões são equilibradas, temos cerca de `log n` níveis, cada um com trabalho total linear. Custo médio: `O(n log n)`.

No pior caso, as divisões são extremamente desequilibradas e o trabalho soma algo como `n + (n - 1) + (n - 2) + ...`. Custo: `O(n²)`.

A memória extra, além da pilha de chamadas, é pequena. A ordenação ocorre no próprio array.

## Erros comuns

- Incluir o pivô no laço de varredura.
- Retornar a posição errada do pivô.
- Chamar recursivamente incluindo o pivô de novo.
- Não tratar caso base `inicio >= fim`.
- Achar que quicksort sempre é `O(n log n)`.
- Ignorar que a escolha do pivô influencia muito o desempenho.

<!-- ## Exercícios de fixação

1. Simule a partição de `{4, 9, 1, 7, 3}` com pivô `3`.
2. Implemente `particionar` e teste isoladamente.
3. Teste quicksort com array já ordenado, inverso e com repetidos.
4. Explique por que o pivô não participa das chamadas recursivas.
5. Compare quicksort e mergesort em memória extra.
6. Explique um cenário em que esta escolha de pivô é ruim.

## Exercício integrador

Implemente quicksort contando quantas chamadas recursivas e quantas partições foram feitas. Teste com arrays aleatórios, ordenados e em ordem inversa. Escreva uma conclusão curta sobre o efeito da escolha do pivô. -->

## Checklist de aprendizagem

- [ ] Sei explicar o objetivo da partição.
- [ ] Sei implementar quicksort simples.
- [ ] Sei simular a posição final do pivô.
- [ ] Sei comparar caso médio e pior caso.
- [ ] Sei explicar por que não há merge final.
- [ ] Sei reconhecer problemas com pivô ruim.
