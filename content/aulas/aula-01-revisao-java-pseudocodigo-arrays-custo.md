# Aula 01 — Revisão curta de Java, pseudocódigo, arrays e contagem de operações

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- ler um algoritmo simples em pseudocódigo e traduzi-lo para Java;
- reconhecer entrada, saída, estado acumulado e condição de parada;
- percorrer arrays com segurança usando índices válidos;
- fazer testes de mesa pequenos antes de programar;
- contar operações principais em laços simples;
- comparar informalmente custos constantes, lineares e quadráticos.

<!-- ## Pré-requisitos

Esta aula pressupõe que você já viu variáveis, condicionais, laços e métodos em alguma linguagem de programação. Como a disciplina usará Java, a aula também revisa a forma básica de declarar arrays, criar métodos `static` e escrever pequenos testes no `main`. -->

## Problema motivador

Imagine que uma turma fez uma avaliação e as notas estão em um array. Queremos responder três perguntas:

1. Qual é a maior nota?
2. Quantos estudantes ficaram acima ou iguais a 6?
3. Quantas comparações fazemos para responder essas perguntas?

O algoritmo não é difícil, mas ele concentra ideias que aparecem o curso inteiro: percorrer dados, manter acumuladores, tratar arrays vazios, explicar custo e transformar uma ideia em código Java.

## Do enunciado ao pseudocódigo

Antes de escrever Java, vale separar contrato e passos. Para a maior nota, uma primeira versão do pseudocódigo poderia ser:

```text
MAIOR_NOTA(notas)
  Input: array notas
  Output: number

  IF notas.length = 0 THEN
    RETURN -1

  maior <- notas[0]

  FOR i <- 1 TO notas.length - 1 DO
    IF notas[i] > maior THEN
      maior <- notas[i]

  RETURN maior

CONTAR_APROVADOS(notas)
  Input: array notas
  Output: number

  aprovados <- 0

  FOR i <- 0 TO notas.length - 1 DO
    IF notas[i] >= 6 THEN
      aprovados <- aprovados + 1

  RETURN aprovados
```

Há três decisões importantes nesse pseudocódigo. Primeiro, o que fazer com array vazio. Segundo, começar `maior` com um valor real do array, não com um número inventado. Terceiro, iniciar o laço em `1`, porque `notas[0]` já foi usado como referência inicial.

## Tradução para Java

Em Java, arrays têm tamanho fixo e o campo `.length`. O primeiro índice é `0` e o último é `length - 1`.

```java
public class RevisaoArrays {
    public static double maiorNota(double[] notas) {
        if (notas.length == 0) {
            return -1.0;
        }

        double maior = notas[0];

        for (int i = 1; i < notas.length; i++) {
            if (notas[i] > maior) {
                maior = notas[i];
            }
        }

        return maior;
    }

    public static int contarAprovados(double[] notas) {
        int aprovados = 0;

        for (int i = 0; i < notas.length; i++) {
            if (notas[i] >= 6.0) {
                aprovados++;
            }
        }

        return aprovados;
    }

    public static void main(String[] args) {
        double[] notas = {7.5, 4.0, 9.0, 6.0, 5.5};

        System.out.println(maiorNota(notas));      // 9.0
        System.out.println(contarAprovados(notas)); // 3
    }
}
```

Observe que os métodos têm nomes orientados ao problema. Isso ajuda a separar a intenção do detalhe do laço.

## Teste de mesa

Para `notas = {7.5, 4.0, 9.0, 6.0, 5.5}`, o método `maiorNota` começa com `maior = 7.5`.

| i | notas[i] | maior antes | comparação | maior depois |
| -: | -------: | ----------: | ---------- | -----------: |
| 1 | 4.0 | 7.5 | 4.0 > 7.5? não | 7.5 |
| 2 | 9.0 | 7.5 | 9.0 > 7.5? sim | 9.0 |
| 3 | 6.0 | 9.0 | 6.0 > 9.0? não | 9.0 |
| 4 | 5.5 | 9.0 | 5.5 > 9.0? não | 9.0 |

O retorno é `9.0`. O teste de mesa mostra o estado mudando e ajuda a encontrar erros antes da execução.

## Análise informal de custo

Nesta disciplina, vamos estimar custo contando quantas vezes a operação principal executa. Em `maiorNota`, a operação principal é a comparação `notas[i] > maior`. Para um array de tamanho `n`, ela executa `n - 1` vezes, se `n > 0`. Dizemos informalmente que o custo cresce de forma linear com o tamanho da entrada.

Em `contarAprovados`, a comparação `notas[i] >= 6.0` executa uma vez por elemento. Para `n` notas, são `n` comparações. Também é custo linear.

Agora compare com este método:

```java
public static boolean temRepetido(int[] v) {
    for (int i = 0; i < v.length; i++) {
        for (int j = i + 1; j < v.length; j++) {
            if (v[i] == v[j]) {
                return true;
            }
        }
    }
    return false;
}
```

No pior caso, quando não há repetidos, o método compara muitos pares: o primeiro elemento com quase todos, o segundo com quase todos os restantes, e assim por diante. O custo cresce de forma quadrática. Ainda não precisamos de uma fórmula exata; o ponto é perceber que dois laços aninhados sobre o mesmo array costumam ser bem mais caros que um único laço.

## Arrays

Um **array** é uma estrutura de dados utilizada para armazenar uma sequência **finita** de elementos do mesmo tipo. Cada elemento ocupa uma posição numerada, chamada de **índice**, permitindo acessar qualquer posição diretamente.

Por exemplo, o array abaixo armazena cinco notas:

```text
Índice:  0   1   2   3   4
Notas:  [7, 5, 9, 6, 8]
```

Neste exemplo:

- `notas[0]` vale `7`;
- `notas[2]` vale `9`;
- `notas[4]` vale `8`.

Os índices sempre começam em **0**.

### Principais operações

As operações mais comuns envolvendo arrays são:

- criação de um array;
- consultar um elemento;
- alterar um elemento;
- percorrer todos os elementos;
- buscar um valor;
- inserir um novo elemento;
- remover um elemento.

Cada uma dessas operações possui um custo diferente, dependendo da quantidade de elementos que precisam ser acessados ou movimentados.

---

### Criação de um array

Diferentemente de algumas outras estruturas de dados, um **array possui um tamanho definido no momento de sua criação**. Isso significa que, antes de utilizá-lo, é necessário informar quantas posições ele terá.

Por exemplo, o pseudocódigo abaixo cria um array capaz de armazenar 5 notas.

```text
CRIAR_NOTAS()
  Output: array

  notas <- NEW ARRAY[5]

  RETURN notas
```

Após sua criação, todas as posições já existem e podem ser acessadas pelos seus índices.

```text
Índice:   0   1   2   3   4
Notas:   [ ,  ,  ,  ,  ]
```

Depois, os valores podem ser armazenados normalmente.

```text
ADICIONAR_EXEMPLO()
  Output: array

  notas <- NEW ARRAY[5]

  notas[0] <- 7
  notas[1] <- 5
  notas[2] <- 9
  notas[3] <- 6
  notas[4] <- 8

  RETURN notas
```

Resultando em:

```text
Índice:   0   1   2   3   4
Notas:   [7, 5, 9, 6, 8]
```

### O tamanho não pode ser alterado

Uma característica importante dos arrays é que **seu tamanho permanece o mesmo durante toda a execução do programa**.

Se um array foi criado com 5 posições, ele sempre terá exatamente 5 posições.

Caso seja necessário armazenar mais elementos, normalmente é preciso criar um novo array maior e copiar todos os elementos do array antigo para o novo.

Por esse motivo, arrays são uma excelente escolha quando a quantidade de elementos é conhecida ou varia pouco ao longo da execução do programa.

---

### Consulta de um elemento

Como cada posição possui um índice conhecido, acessar um elemento é uma operação muito rápida.

```text
OBTER_NOTA(notas, indice)
  Input: array notas, number indice
  Output: number

  IF indice < 0 OR indice >= notas.length THEN
    RETURN -1

  RETURN notas[indice]
```

Como a posição é conhecida, basta acessar diretamente o elemento desejado. O tempo gasto é praticamente o mesmo independentemente do tamanho do array.

---

### Alteração de um elemento

Alterar um valor também é uma operação direta.

```text
ALTERAR_NOTA(notas, indice, novaNota)
  Input: array notas, number indice, number novaNota
  Output: boolean

  IF indice < 0 OR indice >= notas.length THEN
    RETURN FALSE

  notas[indice] <- novaNota

  RETURN TRUE
```

Assim como na consulta, apenas uma posição é acessada.

---

### Percorrendo um array

Muitas operações precisam visitar todos os elementos do array.

Um exemplo é o algoritmo que já utilizamos para calcular a maior nota.

```text
MAIOR_NOTA(notas)
  Input: array notas
  Output: number

  IF notas.length = 0 THEN
    RETURN -1

  maior <- notas[0]

  FOR i <- 1 TO notas.length - 1 DO
    IF notas[i] > maior THEN
      maior <- notas[i]

  RETURN maior
```

Como todos os elementos precisam ser visitados, quanto maior o array, maior será o tempo necessário para executar a operação.

---

### Busca por um valor

Quando não sabemos em qual posição está um elemento, precisamos procurá-lo.

```text
BUSCAR_NOTA(notas, valor)
  Input: array notas, number valor
  Output: number

  FOR i <- 0 TO notas.length - 1 DO
    IF notas[i] = valor THEN
      RETURN i

  RETURN -1
```

No melhor caso, o elemento é encontrado logo no início.

No pior caso, será necessário verificar todas as posições.

---

### Inserção no final

Se quisermos utilizar um array como fazíamos com listas em python, onde inserimos elementos que vão sendo adicionados no final, precisamos ter cuidado.

Como o tamanho de um array é definido no momento de sua criação, não é possível criar uma nova posição simplesmente escrevendo depois do último índice.

Para inserir elementos, é necessário distinguir:

- a **capacidade** do array, isto é, a quantidade total de posições disponíveis;
- a **quantidade de elementos armazenados**, isto é, quantas posições estão atualmente ocupadas.

O pseudocódigo abaixo insere um valor na primeira posição livre do array.

```text
INSERIR_FINAL(notas, quantidade, valor)
  Input: array notas, number quantidade, number valor
  Output: number

  IF quantidade = notas.length THEN
    RETURN -1

  notas[quantidade] <- valor

  RETURN quantidade + 1
```

A variável `quantidade` indica quantos elementos já estão armazenados. Por isso, ela também corresponde ao índice da próxima posição livre.

Por exemplo, considere um array com capacidade para cinco notas, mas com apenas três posições ocupadas:

```text
Índice:       0   1   2   3   4
Notas:       [7,  5,  9,  _,  _]
Quantidade:   3
```

Ao inserir a nota `6`, o valor é armazenado na posição `3`, e a quantidade passa a ser `4`.

```text
Índice:       0   1   2   3   4
Notas:       [7,  5,  9,  6,  _]
Quantidade:   4
```

Quando `quantidade` é igual a `notas.length`, todas as posições estão ocupadas. Nesse caso, não há espaço disponível para inserir outro elemento.

A inserção no final possui custo baixo enquanto existe uma posição livre, pois apenas uma posição do array é alterada.

---

### Inserção em uma posição intermediária

Inserir um elemento no meio do array é diferente.

Todos os elementos posteriores precisam ser deslocados uma posição para abrir espaço.

```text
INSERIR_POSICAO(notas, indice, valor)
  Input: array notas, number indice, number valor
  Output: boolean

  IF indice < 0 OR indice >= notas.length THEN
    RETURN FALSE

  FOR i <- notas.length TO indice + 1 STEP -1 DO
    notas[i] <- notas[i - 1]

  notas[indice] <- valor

  RETURN TRUE
```

Quanto mais próximo do início for a inserção, maior será a quantidade de elementos deslocados.

---

### Remoção de um elemento

Ao remover um elemento, também é necessário mover outros elementos para preencher o espaço vazio.

```text
REMOVER_POSICAO(notas, indice)
  Input: array notas, number indice
  Output: boolean

  IF indice < 0 OR indice >= notas.length THEN
    RETURN FALSE

  FOR i <- indice TO notas.length - 2 DO
    notas[i] <- notas[i + 1]

  RETURN TRUE
```

Assim como na inserção, remover um elemento no início costuma exigir o deslocamento de muitos elementos.

---

### Comparando os custos das operações

As operações em arrays possuem custos diferentes.

| Operação | Custo esperado |
|----------|----------------|
| Consultar um elemento por índice | Muito baixo |
| Alterar um elemento por índice | Muito baixo |
| Inserir no final | Baixo |
| Percorrer todos os elementos | Cresce junto com o tamanho do array |
| Buscar um valor | Cresce junto com o tamanho do array |
| Inserir em uma posição intermediária | Cresce conforme a quantidade de elementos deslocados |
| Remover um elemento | Cresce conforme a quantidade de elementos deslocados |

Observe que existem dois tipos principais de operações:

- **Operações de acesso direto**, como consultar e alterar um elemento, cujo custo praticamente não depende do tamanho do array.
- **Operações que percorrem ou deslocam elementos**, cujo custo aumenta conforme o array cresce.

Essa diferença é importante na escolha da estrutura de dados. Arrays são excelentes quando precisamos acessar posições rapidamente, mas podem não ser a melhor opção quando há muitas inserções ou remoções no meio da estrutura.

## Strings como arrays conceituais

Podemos usar a mesma notação de Array para percorrer uma `String` e contar vogais, por exemplo:

```text
CONTAR_VOGAIS(texto)
    Input: string texto
    Output: number

    total <- 0
    FOR i <- 0 TO texto.length - 1 DO
        c <- toLowerCase(texto[i])
        IF c = 'a' OR c = 'e' OR c = 'i' OR c = 'o' OR c = 'u' THEN
        total <- total + 1

    RETURN total
```

Embora `String` não seja array em Java, muitos raciocínios são parecidos. O tamanho vem de `.length()`, o caractere na posição `i` vem de `.charAt(i)` e o último índice válido é `length() - 1`.


```java
public static int contarVogais(String texto) {
    int total = 0;

    for (int i = 0; i < texto.length(); i++) {
        char c = Character.toLowerCase(texto.charAt(i));
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            total++;
        }
    }

    return total;
}
```

Esse exemplo reforça o mesmo padrão: percorrer, inspecionar, acumular.

## Erros comuns

- Acessar `v[v.length]`. Esse índice não existe; o último é `v.length - 1`.
- Inicializar maior valor com `0` quando o array pode conter números negativos.
- Esquecer o caso de array vazio.
- Misturar índice e valor armazenado.
- Alterar o acumulador na condição errada.
- Dizer que um algoritmo é "rápido" sem explicar em função de que entrada.

<!-- ## Exercícios de fixação

1. Escreva um método `soma(int[] v)` que retorna a soma dos elementos.
2. Escreva um método `media(double[] v)` que retorna a média ou `0.0` se o array estiver vazio.
3. Escreva um método `contaPares(int[] v)` que conta quantos números pares existem.
4. Faça teste de mesa para `contaPares` usando `{2, 7, 4, 9, 10}`.
5. Para cada método acima, indique qual é a operação principal e quantas vezes ela executa em função de `n`.
6. Escreva um método `contarCaractere(String texto, char alvo)`.

## Exercício integrador

Implemente `relatorioNotas(double[] notas)`, que imprime:

- maior nota;
- menor nota;
- quantidade de aprovados;
- média da turma;
- uma frase dizendo se o custo total do relatório é constante, linear ou quadrático.

Faça pelo menos três testes: array vazio, array com uma nota e array com várias notas. -->

## Checklist de aprendizagem

- [ ] Sei traduzir um pseudocódigo simples para Java.
- [ ] Sei percorrer arrays sem sair dos limites.
- [ ] Sei escolher um acumulador adequado.
- [ ] Sei fazer teste de mesa com índice e estado.
- [ ] Sei contar operações em laços simples.
- [ ] Sei reconhecer um padrão linear e um padrão quadrático.
