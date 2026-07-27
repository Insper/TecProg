# Aula 07 — Fundamentos de recursão

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar o que é uma chamada recursiva;
- identificar caso base, passo recursivo e progresso;
- simular a pilha de chamadas em exemplos pequenos;
- implementar métodos recursivos simples em Java;
- reconhecer recursões que não terminam;
- estimar custo por número de chamadas.

<!-- ## Pré-requisitos

Você deve saber escrever métodos em Java, usar condicionais e compreender laços. Recursão não substitui tudo que fizemos com `for` e `while`; ela oferece outra forma de resolver problemas que podem ser descritos em termos de versões menores do mesmo problema. -->

## Problema motivador

Queremos imprimir uma contagem regressiva:

```text
5
4
3
2
1
fim
```

Com laço, isso é direto. Com recursão, a ideia é: para imprimir a contagem a partir de `n`, imprima `n` e depois resolva a contagem a partir de `n - 1`. O problema fica menor a cada chamada.

## A ideia central

Um método recursivo chama a si mesmo. Para isso funcionar, ele precisa de três elementos:

1. Caso base: situação resolvida diretamente, sem nova chamada.
2. Passo recursivo: chamada para uma versão menor do problema.
3. Progresso: garantia de que as chamadas se aproximam do caso base.

Sem caso base, o método não sabe parar. Sem progresso, ele pode chamar a si mesmo para sempre com o mesmo problema.

## Primeiro exemplo: contagem regressiva

```text
CONTAGEM(n)
    IF n = 0 THEN
        IMPRIME "fim"
    ELSE
        IMPRIME n
        CONTAGEM(n - 1)
```

em Java:

```java
public class RecursaoBasica {
    public static void contagem(int n) {
        if (n == 0) {
            System.out.println("fim");
            return;
        }

        System.out.println(n);
        contagem(n - 1);
    }

    public static void main(String[] args) {
        contagem(5);
    }
}
```

O caso base é `n = 0`. O passo recursivo é `contagem(n - 1)`. O progresso ocorre porque `n` diminui em direção a zero.

## Pilha de chamadas

Quando chamamos `contagem(3)`, as linguagens de programação mantém chamadas pendentes:

```text
contagem(3)
  imprime 3
  chama contagem(2)
    imprime 2
    chama contagem(1)
      imprime 1
      chama contagem(0)
        imprime fim
```

Depois que `contagem(0)` termina, o controle volta para `contagem(1)`, depois para `contagem(2)`, depois para `contagem(3)`. Essa estrutura é chamada informalmente de pilha de chamadas.

## Exemplo guiado: soma de 1 até n

A soma de `1` até `n` pode ser descrita assim:

```text
somaAte(n) = n + somaAte(n - 1)
somaAte(0) = 0
```

Em Java:

```java
public static int somaAte(int n) {
    if (n == 0) {
        return 0;
    }

    return n + somaAte(n - 1);
}
```

Para `somaAte(4)`, o cálculo fica:

```text
somaAte(4)
4 + somaAte(3)
4 + 3 + somaAte(2)
4 + 3 + 2 + somaAte(1)
4 + 3 + 2 + 1 + somaAte(0)
4 + 3 + 2 + 1 + 0
```

O retorno final é `10`.

## Exemplo guiado: fatorial

Fatorial segue a mesma estrutura:

```text
fatorial(n) = n * fatorial(n - 1)
fatorial(0) = 1
```

```java
public static int fatorial(int n) {
    if (n == 0) {
        return 1;
    }

    return n * fatorial(n - 1);
}
```

Aqui, o caso base `0! = 1` é essencial. Para entradas negativas, o método acima não termina. Em código de produção, devemos validar:

```java
if (n < 0) {
    throw new IllegalArgumentException("n deve ser nao negativo");
}
```

## Antes ou depois da chamada?

Em recursão, a posição da chamada muda o comportamento. Compare:

```java
public static void imprimirCrescente(int n) {
    if (n == 0) {
        return;
    }
    imprimirCrescente(n - 1);
    System.out.println(n);
}
```

Esse método imprime `1, 2, 3, ..., n`, porque imprime depois que as chamadas menores terminam. A recursão permite fazer trabalho antes da chamada, depois da chamada, ou nos dois momentos.

## Variação: acumulador

Algumas recursões carregam um acumulador como parâmetro. Isso deixa explícito o estado parcial do cálculo:

```java
public static int somaAteComAcumulador(int n) {
    return somaAteComAcumulador(n, 0);
}

private static int somaAteComAcumulador(int n, int acumulado) {
    if (n == 0) {
        return acumulado;
    }

    return somaAteComAcumulador(n - 1, acumulado + n);
}
```

Para `somaAteComAcumulador(4)`, as chamadas carregam `acumulado` como memória do que já foi somado:

```text
soma(4, 0)
soma(3, 4)
soma(2, 7)
soma(1, 9)
soma(0, 10)
```

Esse formato é útil quando queremos tornar o estado mais visível. Em Java, ele não elimina automaticamente o custo de pilha, mas ajuda a entender como muitos algoritmos recursivos passam informações adiante.

## Validação de entrada

Nem toda entrada faz sentido para todo método recursivo. `fatorial(-1)`, por exemplo, não atinge o caso base `n == 0` se a cada chamada usamos `n - 1`. Antes de pensar em custo ou elegância, precisamos garantir que o domínio do método está claro.

Uma boa prática é deixar o método público validar a entrada e chamar um método auxiliar apenas quando os parâmetros fazem sentido. Esse padrão aparecerá bastante quando usarmos recursão com arrays.

## Análise informal de custo

Em `somaAte(n)`, cada chamada reduz `n` em `1`. Teremos chamadas para `n`, `n - 1`, `n - 2`, até `0`. Portanto, o número de chamadas cresce linearmente. O tempo é `O(n)`.

A memória também merece atenção. Como várias chamadas ficam pendentes na pilha, a profundidade da recursão também é `O(n)`. Isso é diferente de um laço, que normalmente usa memória extra constante.

## Erros comuns

- Esquecer o caso base.
- Escrever um caso base que nunca é atingido.
- Chamar o método com o mesmo valor, sem progresso.
- Não validar entradas fora do domínio esperado.
- Confundir o valor retornado por uma chamada com uma variável global.
- Achar que recursão é sempre melhor que laço e vice-versa.

<!-- ## Exercícios de fixação

1. Implemente `potencia(int base, int expoente)` para expoente não negativo.
2. Implemente `contarParesAte(int n)`.
3. Simule a pilha de chamadas de `somaAte(3)`.
4. Explique o caso base de `fatorial`.
5. Escreva uma versão recursiva que imprime de `n` até `1`.
6. Identifique o erro: `return somaAte(n);`.

## Exercício integrador

Implemente uma classe `RecursaoNumerica` com métodos recursivos para:

- soma de `1` até `n`;
- fatorial;
- potência;
- impressão crescente de `1` até `n`.

Inclua testes para `0`, `1` e valores maiores. Para cada método, escreva um comentário curto identificando caso base e passo recursivo. -->

## Checklist de aprendizagem

- [ ] Sei identificar caso base.
- [ ] Sei identificar passo recursivo.
- [ ] Sei explicar progresso.
- [ ] Sei simular chamadas pequenas.
- [ ] Sei estimar número de chamadas.
- [ ] Sei reconhecer recursão infinita.
