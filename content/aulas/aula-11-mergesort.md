# Aula 11 — Mergesort

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar mergesort como algoritmo de divisão e conquista;
- implementar a intercalação de duas partes ordenadas;
- implementar mergesort com vetor auxiliar;
- justificar estabilidade em uma ordenação;
- estimar custo `O(n log n)` por níveis;
- reconhecer o custo de memória adicional.

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

## Simulação passo a passo

Para `{8, 3, 5, 2}`:

| i | chave | deslocamentos | resultado parcial |
| -: | ----: | ------------ | ----------------- |
| 1 | 3 | 8 vai para a direita | `{3, 8, 5, 2}` |
| 2 | 5 | 8 vai para a direita | `{3, 5, 8, 2}` |
| 3 | 2 | 8, 5 e 3 vão para a direita | `{2, 3, 5, 8}` |

O deslocamento é a operação que domina o custo no pior caso.

Você pode acompanhar a execução do algoritmo através do [visualizador de insertion sort](https://opendsa-server.cs.vt.edu/OpenDSA/AV/Sorting/insertionsortAV.html)

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

## Problema motivador

Agora imagine duas pilhas de provas já ordenadas por nota. Para produzir uma única pilha ordenada, não precisamos reordenar tudo do zero. Basta olhar o primeiro elemento de cada pilha, retirar o menor e repetir. Essa operação é chamada de intercalação, ou merge.

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

Você pode acompanhar a execução do algoritmo através do [visualizador de merge sort](https://opendsa-server.cs.vt.edu/embed/mergesortAV)

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

## Checklist de aprendizagem

- [ ] Sei explicar a intercalação.
- [ ] Sei implementar mergesort com vetor auxiliar.
- [ ] Sei usar intervalo `[inicio, fim)`.
- [ ] Sei explicar estabilidade.
- [ ] Sei justificar `O(n log n)`.
- [ ] Sei reconhecer o custo de memória.
