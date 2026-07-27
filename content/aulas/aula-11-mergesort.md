# Aula 11 — Mergesort

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar mergesort como algoritmo de divisão e conquista;
- implementar a intercalação de duas partes ordenadas;
- implementar mergesort com vetor auxiliar;
- justificar estabilidade em uma ordenação;
- estimar custo `O(n log n)` por níveis;
- reconhecer o custo de memória adicional.

<!-- ## Pré-requisitos

Você deve conhecer recursão, intervalos em arrays, divisão e conquista e insertion sort. Mergesort é o primeiro algoritmo de ordenação eficiente da sequência: ele troca deslocamentos quadráticos por divisões equilibradas e intercalações lineares. -->

## Problema motivador

Imagine duas pilhas de provas já ordenadas por nota. Para produzir uma única pilha ordenada, não precisamos reordenar tudo do zero. Basta olhar o primeiro elemento de cada pilha, retirar o menor e repetir. Essa operação é chamada de intercalação, ou merge.

Mergesort usa essa ideia: divide o array até partes pequenas, ordena recursivamente e intercala as metades ordenadas.

## O centro da aula: intercalar

Antes do algoritmo completo, precisamos saber juntar duas faixas ordenadas:

```text
esquerda:  [2, 7, 9]
direita:   [1, 5, 8]
resultado: [1, 2, 5, 7, 8, 9]
```

Usamos três índices: um para a esquerda, um para a direita e um para o vetor auxiliar. Em cada passo, copiamos o menor elemento disponível.

## Implementação do merge

Vamos usar intervalo aberto no fim: a metade esquerda é `[inicio, meio)` e a direita é `[meio, fim)`.

```text
MERGESORT(v, aux, inicio, fim)
    IF fim - inicio <= 1 THEN
        RETURN

    meio <- inicio + (fim - inicio) / 2
    MERGESORT(v, aux, inicio, meio)
    MERGESORT(v, aux, meio, fim)
    MERGE(v, aux, inicio, meio, fim)

MERGE(v, aux, inicio, meio, fim)
    i <- inicio; j <- meio; k <- inicio
    WHILE i < meio AND j < fim DO
        IF v[i] <= v[j] THEN
            aux[k] <- v[i]; i <- i + 1
        ELSE
            aux[k] <- v[j]; j <- j + 1
        k <- k + 1

    IF i < meio THEN
        WHILE i < meio DO
            aux[k] <- v[i]; i <- i + 1; k <- k + 1
    ELSE
        WHILE j < fim DO
            aux[k] <- v[j]; j <- j + 1; k <- k + 1

    FOR p <- inicio TO fim - 1 DO
        v[p] <- aux[p]
```

Os três índices têm papéis fixos: `i` lê a metade esquerda, `j` lê a direita e `k` escreve no auxiliar. Nenhum deles precisa voltar durante uma intercalação.

<!-- ```java
public class MergeSort {
    public static void ordenar(int[] v) {
        int[] aux = new int[v.length];
        ordenar(v, aux, 0, v.length);
    }

    private static void ordenar(int[] v, int[] aux, int inicio, int fim) {
        if (fim - inicio <= 1) {
            return;
        }

        int meio = inicio + (fim - inicio) / 2;
        ordenar(v, aux, inicio, meio);
        ordenar(v, aux, meio, fim);
        merge(v, aux, inicio, meio, fim);
    }

    private static void merge(int[] v, int[] aux, int inicio, int meio, int fim) {
        int i = inicio;
        int j = meio;
        int k = inicio;

        while (i < meio && j < fim) {
            if (v[i] <= v[j]) {
                aux[k] = v[i];
                i++;
            } else {
                aux[k] = v[j];
                j++;
            }
            k++;
        }

        while (i < meio) {
            aux[k] = v[i];
            i++;
            k++;
        }

        while (j < fim) {
            aux[k] = v[j];
            j++;
            k++;
        }

        for (int p = inicio; p < fim; p++) {
            v[p] = aux[p];
        }
    }
}
``` -->

O vetor `aux` é criado uma vez e reutilizado. Isso evita criar vários arrays durante as chamadas.

## Simulação da intercalação

Considere `v = {2, 7, 9, 1, 5, 8}`, com `inicio = 0`, `meio = 3`, `fim = 6`.

| i | j | comparação | copiado |
| -: | -: | ---------- | ------- |
| 0 | 3 | 2 <= 1? não | 1 |
| 0 | 4 | 2 <= 5? sim | 2 |
| 1 | 4 | 7 <= 5? não | 5 |
| 1 | 5 | 7 <= 8? sim | 7 |
| 2 | 5 | 9 <= 8? não | 8 |
| 2 | 6 | direita acabou | 9 |

Depois copiamos `aux` de volta para `v`.

## Por que é estável?

Uma ordenação é estável quando elementos empatados preservam a ordem relativa original. No merge acima, usamos `v[i] <= v[j]`. Em caso de empate, escolhemos primeiro o elemento que veio da metade esquerda. Como a metade esquerda aparece antes no array original, essa escolha preserva estabilidade.

Se trocássemos por `v[i] < v[j]`, empates vindos da direita poderiam passar à frente.

## Mergesort completo

O algoritmo completo segue o padrão da aula anterior:

- dividir: calcular `meio`;
- resolver: ordenar a metade esquerda e a metade direita;
- combinar: intercalar as duas metades ordenadas;
- caso base: intervalo com zero ou um elemento.

É importante notar que a intercalação só funciona corretamente porque as duas metades já estão ordenadas. Essa é a confiança recursiva do algoritmo.

## Análise informal de custo

Em cada nível da árvore de chamadas, todos os elementos participam de alguma intercalação. Portanto, cada nível custa `O(n)`. Como o array é dividido ao meio repetidamente, há cerca de `log n` níveis. O custo total é `O(n * log n)`.

O custo de memória extra é `O(n)`, por causa do vetor auxiliar. Além disso, existe custo de pilha recursiva `O(log n)` em divisões equilibradas.

## Erros comuns

- Tentar fazer merge antes de ordenar as metades.
- Misturar intervalo fechado com intervalo aberto no fim.
- Esquecer de copiar o vetor auxiliar de volta.
- Parar o merge quando uma metade acaba e perder o restante da outra.
- Criar vetor auxiliar novo em toda chamada sem necessidade.
- Usar `<` quando a estabilidade é desejada.

<!-- ## Exercícios de fixação

1. Simule o merge de `[3, 6, 10]` com `[1, 4, 8]`.
2. Implemente apenas o método `merge` e teste com duas metades já ordenadas.
3. Teste mergesort com array vazio, um elemento, repetidos e já ordenado.
4. Explique por que `fim - inicio <= 1` é caso base.
5. Explique por que mergesort não é in-place nesta versão.
6. Compare insertion sort e mergesort para arrays grandes.

## Exercício integrador

Implemente uma versão de mergesort que conta quantas vezes o método `merge` é chamado e quantos elementos são copiados de volta para o array original. Teste com arrays de tamanho `4`, `8` e `16` e relacione os resultados com a ideia de níveis. -->

## Checklist de aprendizagem

- [ ] Sei explicar a intercalação.
- [ ] Sei implementar mergesort com vetor auxiliar.
- [ ] Sei usar intervalo `[inicio, fim)`.
- [ ] Sei explicar estabilidade.
- [ ] Sei justificar `O(n log n)`.
- [ ] Sei reconhecer o custo de memória.
