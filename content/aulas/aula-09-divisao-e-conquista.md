# Aula 09 — Divisão e conquista

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- reconhecer problemas que podem ser divididos em subproblemas;
- explicar o padrão dividir, resolver e combinar;
- implementar um exemplo simples por divisão e conquista;
- simular uma árvore de chamadas;
- comparar divisão equilibrada e desequilibrada;
<!-- - preparar o raciocínio para mergesort e quicksort. -->

<!-- ## Pré-requisitos

Você deve conhecer recursão, arrays e análise informal de custo. Também deve ter visto busca binária recursiva, que já usa uma forma simples de divisão do espaço de busca. -->

## Problema motivador

Queremos encontrar o maior valor de um array. A solução linear tradicional percorre todos os elementos mantendo um máximo. Uma alternativa recursiva é dividir o array em duas metades, encontrar o maior valor de cada metade e combinar os resultados escolhendo o maior dos dois.

Essa estratégia parece mais trabalhosa para máximo, mas ela revela um padrão poderoso usado em algoritmos como mergesort e quicksort.

## O padrão

Divisão e conquista costuma seguir três perguntas:

1. Como dividir o problema?
2. Como resolver os subproblemas?
3. Como combinar as respostas?

Também precisamos de um caso base. Sem caso base, a recursão não termina.

Para encontrar o máximo:

- dividir: separar o intervalo em duas metades;
- resolver: encontrar o máximo de cada metade;
- combinar: retornar o maior entre os dois máximos;
- caso base: intervalo com um único elemento.

## Intervalo aberto no fim

Nesta aula, vamos usar intervalo aberto no fim: `[inicio, fim)`. Isso significa que `inicio` está incluído e `fim` não está. O array inteiro é `[0, v.length)`.

Essa convenção é comum em algoritmos de ordenação porque facilita calcular tamanhos:

```text
tamanho = fim - inicio
```

Um intervalo com um único elemento tem `fim - inicio == 1`.

## Exemplo guiado: máximo por divisão

O contrato externo trata o array vazio. O procedimento auxiliar recebe sempre um intervalo não vazio `[inicio, fim)`, divide-o e confia que cada chamada devolve o máximo de sua própria metade.

```text
MAXIMO(v)
    IF TAMANHO(v) = 0 THEN
        ERRO "array vazio"
    RETURN MAXIMO-INTERVALO(v, 0, TAMANHO(v))

MAXIMO-INTERVALO(v, inicio, fim)
    IF fim - inicio = 1 THEN
        RETURN v[inicio]

    meio <- inicio + (fim - inicio) / 2
    maxEsq <- MAXIMO-INTERVALO(v, inicio, meio)
    maxDir <- MAXIMO-INTERVALO(v, meio, fim)

    IF maxEsq > maxDir THEN
        RETURN maxEsq
    RETURN maxDir
```

<!-- ```java
public class MaximoDivisaoConquista {
    public static int maximo(int[] v) {
        if (v.length == 0) {
            throw new IllegalArgumentException("array vazio");
        }

        return maximo(v, 0, v.length);
    }

    private static int maximo(int[] v, int inicio, int fim) {
        if (fim - inicio == 1) {
            return v[inicio];
        }

        int meio = inicio + (fim - inicio) / 2;
        int maxEsq = maximo(v, inicio, meio);
        int maxDir = maximo(v, meio, fim);

        if (maxEsq > maxDir) {
            return maxEsq;
        }
        return maxDir;
    }

    public static void main(String[] args) {
        int[] v = {8, 3, 12, 5, 9};
        System.out.println(maximo(v)); // 12
    }
}
```
O método público valida o array e chama o método auxiliar com o intervalo inicial. -->

## Simulação da árvore de chamadas

Para `{8, 3, 12, 5}`:

```text
maximo(0, 4)
  maximo(0, 2)
    maximo(0, 1) -> 8
    maximo(1, 2) -> 3
    combina -> 8
  maximo(2, 4)
    maximo(2, 3) -> 12
    maximo(3, 4) -> 5
    combina -> 12
  combina -> 12
```

A árvore mostra que o array foi dividido até chegar a intervalos de um elemento. Depois, as respostas sobem pela árvore.

## Soma por divisão

O mesmo padrão serve para soma:

```text
SOMA-INTERVALO(v, inicio, fim)
    IF inicio = fim THEN
        RETURN 0
    IF fim - inicio = 1 THEN
        RETURN v[inicio]

    meio <- inicio + (fim - inicio) / 2
    RETURN SOMA-INTERVALO(v, inicio, meio)
           + SOMA-INTERVALO(v, meio, fim)
```
<!-- 
```java
public static int soma(int[] v) {
    return soma(v, 0, v.length);
}

private static int soma(int[] v, int inicio, int fim) {
    if (inicio == fim) {
        return 0;
    }

    if (fim - inicio == 1) {
        return v[inicio];
    }

    int meio = inicio + (fim - inicio) / 2;
    return soma(v, inicio, meio) + soma(v, meio, fim);
}
``` -->

Aqui, a combinação é a soma dos resultados.

<!-- Em mergesort, a combinação será intercalar duas metades ordenadas. Em quicksort, grande parte do trabalho acontece antes das chamadas, durante o particionamento. -->

## Divisão equilibrada e desequilibrada

Quando dividimos em metades parecidas, a árvore de chamadas tende a ter altura pequena. Isso aparece em busca binária e mergesort.

Quando a divisão é muito desequilibrada, por exemplo um lado com `n - 1` elementos e outro com `0`, a recursão pode se comportar mais como uma sequência longa. 
<!-- Isso será importante em quicksort: escolhas ruins de pivô podem gerar divisões desequilibradas. -->

## Análise informal de custo

No máximo por divisão e conquista, cada elemento vira caso base uma vez e cada combinação faz trabalho constante. O tempo total continua `O(n)`. A estratégia não melhora o custo do máximo em relação ao laço, mas ensina o padrão.

<!-- Em algoritmos como mergesort, cada nível da árvore faz trabalho linear e há aproximadamente `log n` níveis. Por isso aparecem custos `O(n log n)`. O detalhe será estudado nas próximas aulas. -->

## Erros comuns

- Não reduzir o tamanho do intervalo nas chamadas.
- Misturar intervalo fechado com aberto no fim.
- Esquecer caso de array vazio no método público.
- Calcular `meio` e chamar duas vezes o mesmo intervalo.
- Combinar respostas de forma incompatível com o problema.
- Achar que toda recursão é divisão e conquista.

<!-- ## Exercícios de fixação

1. Simule `maximo` em `{4, 10, 2, 7}`.
2. Implemente `minimo` por divisão e conquista.
3. Implemente `soma` por divisão e conquista.
4. Explique a diferença entre caso base de intervalo vazio e de um elemento.
5. Dê um exemplo de combinação para soma, máximo e ordenação.
6. Explique por que busca binária pode ser vista como divisão do espaço de busca.

## Exercício integrador

Implemente uma classe `EstatisticasDivisaoConquista` com métodos recursivos para máximo, mínimo e soma usando intervalo `[inicio, fim)`. Inclua testes para arrays de tamanho `1`, tamanho par e tamanho ímpar.

Depois, escreva uma explicação curta respondendo: em quais desses métodos a divisão e conquista melhora o custo? Em quais ela serve mais como preparação conceitual? -->

## Checklist de aprendizagem

- [ ] Sei explicar dividir, resolver e combinar.
- [ ] Sei usar intervalo aberto no fim.
- [ ] Sei implementar máximo por divisão e conquista.
- [ ] Sei desenhar uma árvore de chamadas simples.
- [ ] Sei diferenciar divisão equilibrada e desequilibrada.
- [ ] Sei conectar esta aula a mergesort e quicksort.
