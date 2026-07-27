# Aula 08 — Recursão em arrays e busca binária recursiva

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- usar índices como estado de uma recursão em arrays;
- implementar soma, busca e contagem recursivas;
- converter a ideia da busca binária iterativa para recursiva;
- comparar versões iterativas e recursivas de um mesmo algoritmo;
- explicar custo de tempo e custo de pilha;
- testar casos de borda em recursões com arrays.

<!-- ## Pré-requisitos

Você deve conhecer arrays, busca linear, busca binária iterativa e os fundamentos de recursão. A novidade desta aula é aplicar recursão a estruturas com posições. -->

## Problema motivador

Na aula anterior, usamos exemplos numéricos como `somaAte(n)`. Agora queremos somar os elementos de um array:

```text
{4, 7, 2, 9}
```

Uma forma recursiva é dizer: a soma a partir da posição `i` é `v[i]` mais a soma a partir da posição `i + 1`. O problema diminui porque o índice avança.

## O índice como estado

Em recursão com arrays, normalmente passamos um índice para indicar qual parte do array ainda precisa ser processada.

```text
SOMA-A-PARTIR(v, i):
    IF i == v.LENGTH THEN
        RETORNA 0
    RETORNA v[i] + SOMA-A-PARTIR(v, i + 1)
```

Em Java:

```java
public class RecursaoArrays {
    public static int soma(int[] v) {
        return somaAPartir(v, 0);
    }

    private static int somaAPartir(int[] v, int i) {
        if (i == v.length) {
            return 0;
        }

        return v[i] + somaAPartir(v, i + 1);
    }
}
```

O método público `soma` oferece um contrato simples. O método privado carrega o estado recursivo: a posição atual.

## Simulação

Para `v = {4, 7, 2}`:

```text
SOMA-A-PARTIR(v, 0)
4 + SOMA-A-PARTIR(v, 1)
4 + 7 + SOMA-A-PARTIR(v, 2)
4 + 7 + 2 + SOMA-A-PARTIR(v, 3)
4 + 7 + 2 + 0
13
```

O caso base é `i == v.length`, que significa "não há mais elementos".

## Busca linear recursiva

A busca linear também pode ser descrita recursivamente:

```text
BUSCA-A-PARTIR(v, alvo, i):
    IF i == v.LENGTH THEN
        RETORNA -1
    IF v[i] == alvo THEN
        RETORNA i
    RETORNA BUSCA-A-PARTIR(v, alvo, i + 1)
```

Em Java:

```java
public static int buscar(int[] v, int alvo) {
    return buscarAPartir(v, alvo, 0);
}

private static int buscarAPartir(int[] v, int alvo, int i) {
    if (i == v.length) {
        return -1;
    }

    if (v[i] == alvo) {
        return i;
    }

    return buscarAPartir(v, alvo, i + 1);
}
```

Esse método retorna a primeira ocorrência. Se o alvo não aparece, o índice chega ao fim e o retorno é `-1`.

## Contagem recursiva

Para contar ocorrências, não podemos parar na primeira:

```text
CONTAR-A-PARTIR(v, alvo, i):
    IF i == v.LENGTH THEN
        RETORNA 0
    resto = CONTAR-A-PARTIR(v, alvo, i + 1)
    IF v[i] == alvo THEN
        RETORNA 1 + resto
    RETORNA resto
```

Em Java:

```java
public static int contar(int[] v, int alvo) {
    return contarAPartir(v, alvo, 0);
}

private static int contarAPartir(int[] v, int alvo, int i) {
    if (i == v.length) {
        return 0;
    }

    int resto = contarAPartir(v, alvo, i + 1);
    if (v[i] == alvo) {
        return 1 + resto;
    }
    return resto;
}
```

Esse exemplo mostra trabalho depois da chamada recursiva: primeiro contamos no restante, depois somamos a contribuição da posição atual.

## Busca binária recursiva

A busca binária iterativa mantém `inicio` e `fim` em variáveis. Na versão recursiva, esses limites viram parâmetros.

```text
BUSCA-BINARIA(v, alvo, inicio, fim):
    IF inicio > fim THEN
        RETORNA -1
    meio = (inicio + fim) / 2
    IF v[meio] == alvo THEN
        RETORNA meio
    IF v[meio] < alvo THEN
        RETORNA BUSCA-BINARIA(v, alvo, meio + 1, fim)
    RETORNA BUSCA-BINARIA(v, alvo, inicio, meio - 1)
```

Em Java:

```java
public class BuscaBinariaRecursiva {
    public static int buscar(int[] v, int alvo) {
        return buscar(v, alvo, 0, v.length - 1);
    }

    private static int buscar(int[] v, int alvo, int inicio, int fim) {
        if (inicio > fim) {
            return -1;
        }

        int meio = inicio + (fim - inicio) / 2;

        if (v[meio] == alvo) {
            return meio;
        }

        if (v[meio] < alvo) {
            return buscar(v, alvo, meio + 1, fim);
        }

        return buscar(v, alvo, inicio, meio - 1);
    }

    public static void main(String[] args) {
        int[] v = {2, 5, 8, 12, 16, 21};
        System.out.println(buscar(v, 12)); // 3
        System.out.println(buscar(v, 7));  // -1
    }
}
```

A pré-condição continua a mesma: o array precisa estar ordenado.

## Comparação com a versão iterativa

A versão iterativa usa um laço `while`. A versão recursiva usa chamadas de método. A ideia de algoritmo é idêntica: manter um intervalo de candidatos e descartar metade a cada comparação.

Na prática, a versão iterativa costuma ser preferida para busca binária simples em Java, porque evita custo de chamadas e uso de pilha. A versão recursiva é útil para entender a estrutura do problema e prepara terreno para divisão e conquista.

## Análise informal de custo

Soma recursiva em array visita cada elemento uma vez: tempo `O(n)` e pilha `O(n)`.

Busca linear recursiva também tem pior caso `O(n)` e pilha `O(n)`.

Busca binária recursiva reduz o intervalo pela metade a cada chamada: tempo `O(log n)` e pilha `O(log n)`.

O custo de pilha é parte da análise porque chamadas ficam pendentes até a recursão terminar.

## Erros comuns

- Usar `i == v.length - 1` como caso base e esquecer o último elemento ou duplicar lógica.
- Avançar o índice na direção errada.
- Não passar `inicio` e `fim` atualizados na busca binária.
- Usar busca binária recursiva em array não ordenado.
- Esquecer de retornar o resultado da chamada recursiva.
- Criar método público difícil de usar, exigindo que quem chama informe índice inicial.
<!-- 
## Exercícios de fixação

1. Implemente `maiorAPartir(int[] v, int i)`.
2. Implemente `todosPositivos(int[] v)` de forma recursiva.
3. Implemente `ultimaOcorrencia` recursiva.
4. Simule a busca binária recursiva por `21` no array do exemplo.
5. Compare custo de pilha entre soma recursiva e busca binária recursiva.
6. Explique por que `inicio > fim` é o caso base da busca binária recursiva.

## Exercício integrador

Crie uma classe `OperacoesRecursivasArray` com métodos públicos simples para soma, busca linear, contagem e busca binária recursiva. Cada método público deve chamar um método privado que recebe os parâmetros de estado necessários.

Inclua testes com array vazio, array de um elemento, alvo presente e alvo ausente. -->

## Checklist de aprendizagem

- [ ] Sei usar índice como estado recursivo.
- [ ] Sei criar método público simples e método auxiliar privado.
- [ ] Sei implementar busca linear recursiva.
- [ ] Sei implementar busca binária recursiva.
- [ ] Sei comparar recursão e iteração.
- [ ] Sei analisar tempo e pilha.
