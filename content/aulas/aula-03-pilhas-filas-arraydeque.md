# Aula 03 — Pilhas e filas com `ArrayDeque`

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar os comportamentos LIFO e FIFO;
- usar `ArrayDeque` como pilha e como fila;
- aplicar operações de inserção, remoção e consulta sem remover;
- resolver problemas simples de validação com pilha;
- resolver problemas simples de atendimento com fila;
- justificar por que pilhas e filas têm operações principais eficientes.

<!-- ## Pré-requisitos

Você já deve saber usar classes da biblioteca Java, laços, condicionais e listas. Na aula anterior, vimos que remover do começo de um `ArrayList` pode ser caro. Agora veremos uma estrutura mais adequada para operações nas extremidades. -->

## Problema motivador

Considere dois sistemas:

1. Um editor precisa verificar se os parênteses de uma expressão estão balanceados.
2. Uma central de atendimento precisa chamar pessoas na ordem em que chegaram.

<!-- No primeiro caso, o último símbolo de abertura precisa ser o primeiro a ser fechado. Isso é comportamento de pilha. No segundo caso, a primeira pessoa que entrou deve ser a primeira atendida. Isso é comportamento de fila. -->

## Pilha: LIFO

Uma **pilha** é uma estrutura de dados na qual os elementos são inseridos e removidos sempre pela mesma extremidade, chamada **topo**.

Ela segue a regra **LIFO** (*Last In, First Out*), isto é:

> O último elemento inserido é o primeiro elemento removido.

Um exemplo cotidiano é uma pilha de pratos. Um novo prato é colocado no topo, e o primeiro prato retirado também é o que está no topo.

Considere a seguinte sequência de operações:

```text
EMPILHAR(P, 10)
EMPILHAR(P, 20)
EMPILHAR(P, 30)
```

A pilha passa a ter a seguinte organização:

```text
Topo -> 30
        20
        10
```

Ao remover um elemento:

```text
DESEMPILHAR(P)
```

o valor `30` é removido, pois ele está no topo da pilha.

Depois da remoção:

```text
Topo -> 20
        10
```

Em uma pilha, não é permitido inserir ou remover diretamente elementos que estejam no meio da estrutura. Para acessar o valor `10`, por exemplo, seria necessário remover primeiro os valores `30` e `20`.

### TAD Pilha

A pilha pode utilizar internamente uma lista redimensionável. O último elemento da lista representa o topo da pilha.

```text
TAD Pilha
  elementos: Lista
```

As principais operações do TAD são:

- criar uma pilha;
- empilhar um elemento;
- desempilhar o elemento do topo;
- consultar o elemento do topo;
- verificar se a pilha está vazia;
- consultar a quantidade de elementos.

### Criar uma pilha

A operação de criação inicializa uma pilha sem nenhum elemento.

```text
CRIAR-PILHA()
  Input: none
  Output: Pilha

  P <- nova Pilha
  P.elementos <- CRIAR-LISTA()

  RETURN P
```

### Empilhar um elemento

Empilhar significa inserir um novo elemento no topo da pilha.

Como o topo corresponde ao final da lista, o elemento é adicionado ao final de `P.elementos`.

```text
EMPILHAR(P, elemento)
  Input: Pilha P, elemento
  Output: none

  ADICIONAR-FIM(P.elementos, elemento)
```

Por exemplo:

```text
EMPILHAR(P, 10)
EMPILHAR(P, 20)
EMPILHAR(P, 30)
```

Depois dessas operações, o valor `30` está no topo da pilha.

### Consultar o topo

A operação `TOPO` retorna o elemento que está no topo sem removê-lo.

```text
TOPO(P)
  Input: Pilha P
  Output: elemento ou NULL

  IF VAZIA(P) THEN
    RETURN NULL

  ultimaPosicao <- TAMANHO(P.elementos) - 1

  RETURN ACESSAR(P.elementos, ultimaPosicao)
```

Quando a pilha está vazia, não existe um elemento no topo. Nesse caso, a operação retorna `NULL`.

### Desempilhar um elemento

Desempilhar significa remover e retornar o elemento que está no topo da pilha.

```text
DESEMPILHAR(P)
  Input: Pilha P
  Output: elemento ou NULL

  IF VAZIA(P) THEN
    RETURN NULL

  ultimaPosicao <- TAMANHO(P.elementos) - 1

  RETURN REMOVER(P.elementos, ultimaPosicao)
```

Quando a pilha está vazia, não existe um elemento que possa ser removido. Nesse caso, a operação retorna `NULL`.

Por exemplo, considere:

```text
EMPILHAR(P, 10)
EMPILHAR(P, 20)
EMPILHAR(P, 30)

valor <- DESEMPILHAR(P)
```

Ao final, `valor` contém `30`, e o topo da pilha passa a ser `20`.

### Verificar se a pilha está vazia

A pilha está vazia quando sua lista interna não possui elementos.

```text
VAZIA(P)
  Input: Pilha P
  Output: boolean

  RETURN TAMANHO(P.elementos) = 0
```

A operação retorna:

- `true` quando não há elementos;
- `false` quando há pelo menos um elemento.

### Consultar o tamanho

A operação `TAMANHO-PILHA` retorna a quantidade de elementos atualmente armazenados.

```text
TAMANHO-PILHA(P)
  Input: Pilha P
  Output: number

  RETURN TAMANHO(P.elementos)
```

A capacidade interna da lista não interfere no tamanho da pilha. Apenas os elementos efetivamente inseridos são contados.

### Remover todos os elementos

Uma operação opcional é esvaziar completamente a pilha.

```text
ESVAZIAR(P)
  Input: Pilha P
  Output: none

  WHILE NOT VAZIA(P) DO
    DESEMPILHAR(P)
```

Os elementos são removidos um de cada vez, sempre a partir do topo.

### Resumo das operações

| Operação | Comportamento |
|---|---|
| `CRIAR-PILHA()` | Cria uma pilha vazia |
| `EMPILHAR(P, elemento)` | Insere um elemento no topo |
| `TOPO(P)` | Retorna o elemento do topo sem removê-lo |
| `DESEMPILHAR(P)` | Remove e retorna o elemento do topo |
| `VAZIA(P)` | Informa se a pilha está vazia |
| `TAMANHO-PILHA(P)` | Retorna a quantidade de elementos |
| `ESVAZIAR(P)` | Remove todos os elementos |

As operações `TOPO` e `DESEMPILHAR` retornam `NULL` quando a pilha está vazia. Outra convenção possível seria indicar um erro de pilha vazia, mas o comportamento escolhido deve ser declarado e utilizado de forma consistente.

### Custos das operações

Quando o topo é representado pelo final de uma lista redimensionável:

- consultar o topo exige apenas localizar o último elemento;
- desempilhar exige apenas remover o último elemento;
- verificar se a pilha está vazia e consultar seu tamanho são operações diretas;
- empilhar normalmente exige apenas colocar o elemento na próxima posição livre;
- ocasionalmente, empilhar pode exigir a criação de um array interno maior e a cópia dos elementos da lista.

Mesmo que algumas inserções exijam redimensionamento, isso não ocorre em todas as chamadas. Por isso, adicionar elementos ao topo continua sendo eficiente ao longo de uma sequência de operações.

## Implementação da Pilha em Java

Em Java, podemos usar a interface `Deque` com implementação `ArrayDeque`:

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class ExemploPilha {
    public static void main(String[] args) {
        Deque<String> pilha = new ArrayDeque<>();

        pilha.push("primeiro");
        pilha.push("segundo");
        pilha.push("terceiro");

        System.out.println(pilha.peek()); // terceiro
        System.out.println(pilha.pop());  // terceiro
        System.out.println(pilha.pop());  // segundo
    }
}
```

As operações principais são:

- `push(x)`: empilha;
- `pop()`: remove e retorna o topo;
- `peek()`: consulta o topo sem remover;
- `isEmpty()`: verifica se está vazia.

### Exemplo guiado: parênteses balanceados

Queremos validar expressões como `(a + b) * (c + d)` e rejeitar expressões como `(a + b))`.

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Balanceamento {
    public static boolean balanceado(String texto) {
        Deque<Character> pilha = new ArrayDeque<>();

        for (int i = 0; i < texto.length(); i++) {
            char c = texto.charAt(i);

            if (c == '(') {
                pilha.push(c);
            } else if (c == ')') {
                if (pilha.isEmpty()) {
                    return false;
                }
                pilha.pop();
            }
        }

        return pilha.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(balanceado("(a + b)"));  // true
        System.out.println(balanceado("(a + b))")); // false
        System.out.println(balanceado("((a)"));     // false
    }
}
```

A pilha guarda aberturas pendentes. Quando aparece um fechamento, precisamos ter uma abertura disponível para casar. Ao final, a pilha deve estar vazia.

## Fila: FIFO

Uma **fila** é uma estrutura de dados na qual os elementos são inseridos em uma extremidade e removidos pela outra.

Ela segue a regra **FIFO** (*First In, First Out*), isto é:

> O primeiro elemento inserido é o primeiro elemento removido.

Um exemplo cotidiano é uma fila de pessoas aguardando atendimento. Uma nova pessoa entra no final da fila, enquanto a pessoa que está há mais tempo é atendida primeiro.

Considere a seguinte sequência de operações:

```text
ENFILEIRAR(F, 10)
ENFILEIRAR(F, 20)
ENFILEIRAR(F, 30)
```

A fila passa a ter a seguinte organização:

```text
Frente -> 10, 20, 30 <- Final
```

Ao remover um elemento:

```text
DESENFILEIRAR(F)
```

o valor `10` é removido, pois ele está na frente da fila.

Depois da remoção:

```text
Frente -> 20, 30 <- Final
```

Em uma fila, novos elementos sempre entram no final, enquanto as remoções sempre acontecem na frente.

### TAD Fila

A fila pode utilizar internamente uma lista redimensionável.

```text
TAD Fila
  elementos: Lista
```

As principais operações do TAD são:

- criar uma fila;
- inserir um elemento no final;
- remover o elemento da frente;
- consultar o elemento da frente;
- verificar se a fila está vazia;
- consultar a quantidade de elementos.

### Criar uma fila

A operação de criação inicializa uma fila sem nenhum elemento.

```text
CRIAR-FILA()
  Input: none
  Output: Fila

  F <- nova Fila
  F.elementos <- CRIAR-LISTA()

  RETURN F
```

### Enfileirar um elemento

Enfileirar significa inserir um novo elemento no final da fila.

```text
ENFILEIRAR(F, elemento)
  Input: Fila F, elemento
  Output: none

  ADICIONAR-FIM(F.elementos, elemento)
```

Por exemplo:

```text
ENFILEIRAR(F, 10)
ENFILEIRAR(F, 20)
ENFILEIRAR(F, 30)
```

Depois dessas operações, o valor `10` está na frente da fila e o valor `30` está no final.

### Consultar a frente

A operação `FRENTE` retorna o primeiro elemento da fila sem removê-lo.

```text
FRENTE(F)
  Input: Fila F
  Output: elemento ou NULL

  IF VAZIA(F) THEN
    RETURN NULL

  RETURN ACESSAR(F.elementos, 0)
```

Quando a fila está vazia, não existe um elemento na frente. Nesse caso, a operação retorna `NULL`.

### Desenfileirar um elemento

Desenfileirar significa remover e retornar o elemento que está na frente da fila.

```text
DESENFILEIRAR(F)
  Input: Fila F
  Output: elemento ou NULL

  IF VAZIA(F) THEN
    RETURN NULL

  RETURN REMOVER(F.elementos, 0)
```

Quando a fila está vazia, não existe um elemento que possa ser removido. Nesse caso, a operação retorna `NULL`.

Por exemplo:

```text
ENFILEIRAR(F, 10)
ENFILEIRAR(F, 20)
ENFILEIRAR(F, 30)

valor <- DESENFILEIRAR(F)
```

Ao final, `valor` contém `10`, e o elemento na frente da fila passa a ser `20`.

### Verificar se a fila está vazia

A fila está vazia quando sua lista interna não possui elementos.

```text
VAZIA(F)
  Input: Fila F
  Output: boolean

  RETURN TAMANHO(F.elementos) = 0
```

A operação retorna:

- `true` quando não há elementos;
- `false` quando há pelo menos um elemento.

### Consultar o tamanho

A operação `TAMANHO-FILA` retorna a quantidade de elementos atualmente armazenados.

```text
TAMANHO-FILA(F)
  Input: Fila F
  Output: number

  RETURN TAMANHO(F.elementos)
```

O tamanho representa apenas a quantidade de elementos presentes na fila.

### Remover todos os elementos

Uma operação opcional é esvaziar completamente a fila.

```text
ESVAZIAR(F)
  Input: Fila F
  Output: none

  WHILE NOT VAZIA(F) DO
    DESENFILEIRAR(F)
```

Os elementos são removidos um de cada vez, sempre a partir da frente da fila.

## Resumo das operações

| Operação | Comportamento |
|---|---|
| `CRIAR-FILA()` | Cria uma fila vazia |
| `ENFILEIRAR(F, elemento)` | Insere um elemento no final |
| `FRENTE(F)` | Retorna o primeiro elemento sem removê-lo |
| `DESENFILEIRAR(F)` | Remove e retorna o primeiro elemento |
| `VAZIA(F)` | Informa se a fila está vazia |
| `TAMANHO-FILA(F)` | Retorna a quantidade de elementos |
| `ESVAZIAR(F)` | Remove todos os elementos |

As operações `FRENTE` e `DESENFILEIRAR` retornam `NULL` quando a fila está vazia. Outra convenção possível seria indicar um erro de fila vazia, desde que o comportamento seja declarado e utilizado de maneira consistente.

## Custos das operações

Quando a fila é implementada usando diretamente uma lista:

- consultar a frente exige apenas acessar a posição `0`;
- enfileirar normalmente exige apenas adicionar um elemento ao final;
- verificar se a fila está vazia e consultar seu tamanho são operações diretas;
- desenfileirar exige remover a posição `0`;
- ao remover a posição `0`, todos os elementos restantes precisam ser deslocados uma posição para a esquerda.

Assim, essa implementação é simples, mas a remoção da frente pode exigir bastante trabalho quando há muitos elementos na fila.

## Implementação mais eficiente

Para evitar o deslocamento dos elementos a cada remoção, a fila pode manter uma variável que indique a posição atual da frente.

```text
TAD Fila
  elementos: Lista
  inicio: number
```

### Criar uma fila

```text
CRIAR-FILA()
  Input: none
  Output: Fila

  F <- nova Fila
  F.elementos <- CRIAR-LISTA()
  F.inicio <- 0

  RETURN F
```

### Enfileirar um elemento

```text
ENFILEIRAR(F, elemento)
  Input: Fila F, elemento
  Output: none

  ADICIONAR-FIM(F.elementos, elemento)
```

### Consultar a frente

```text
FRENTE(F)
  Input: Fila F
  Output: elemento ou NULL

  IF VAZIA(F) THEN
    RETURN NULO

  RETURN ACESSAR(F.elementos, F.inicio)
```

### Desenfileirar um elemento

```text
DESENFILEIRAR(F)
  Input: Fila F
  Output: elemento ou NULO

  IF VAZIA(F) THEN
    RETURN NULO

  elemento <- ACESSAR(F.elementos, F.inicio)
  F.inicio <- F.inicio + 1

  RETURN elemento
```

Nessa versão, os elementos não são deslocados. A variável `inicio` simplesmente avança para a próxima posição.

### Verificar se a fila está vazia

```text
VAZIA(F)
  Input: Fila F
  Output: boolean

  RETURN F.inicio = TAMANHO(F.elementos)
```

### Consultar o tamanho

```text
TAMANHO-FILA(F)
  Input: Fila F
  Output: number

  RETURN TAMANHO(F.elementos) - F.inicio
```

Essa versão torna a remoção da frente mais eficiente. Entretanto, as posições anteriores a `F.inicio` deixam de ser utilizadas. Uma implementação completa pode ocasionalmente reorganizar a lista ou utilizar um array circular para reaproveitar essas posições.

## Implementação da Fila em Java

Também podemos usar `ArrayDeque`, mas agora com operações de fila:

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class ExemploFila {
    public static void main(String[] args) {
        Deque<String> fila = new ArrayDeque<>();

        fila.addLast("Ana");
        fila.addLast("Bruno");
        fila.addLast("Carla");

        System.out.println(fila.peekFirst());   // Ana
        System.out.println(fila.removeFirst()); // Ana
        System.out.println(fila.removeFirst()); // Bruno
    }
}
```

As operações principais são:

- `addLast(x)`: entra no fim da fila;
- `removeFirst()`: remove o primeiro;
- `peekFirst()`: consulta o primeiro sem remover;
- `isEmpty()`: verifica se não há elementos.

## Exemplo guiado: atendimento

```java
import java.util.ArrayDeque;
import java.util.Deque;

public class Atendimento {
    private Deque<String> fila = new ArrayDeque<>();

    public void chegar(String nome) {
        fila.addLast(nome);
    }

    public String atender() {
        if (fila.isEmpty()) {
            return "Ninguem aguardando";
        }
        return fila.removeFirst();
    }

    public String proximo() {
        if (fila.isEmpty()) {
            return "Ninguem aguardando";
        }
        return fila.peekFirst();
    }

    public static void main(String[] args) {
        Atendimento atendimento = new Atendimento();
        atendimento.chegar("Ana");
        atendimento.chegar("Bruno");

        System.out.println(atendimento.proximo()); // Ana
        System.out.println(atendimento.atender()); // Ana
        System.out.println(atendimento.atender()); // Bruno
    }
}
```

Esse código preserva a ordem de chegada. Se usássemos `ArrayList` e `remove(0)` muitas vezes, cada atendimento poderia deslocar toda a lista. Com `ArrayDeque`, as operações nas extremidades são apropriadas para esse padrão.

## Quando usar pilha ou fila

Use pilha quando o problema depende do último elemento aberto, visitado ou adicionado. Exemplos: desfazer ações, validar delimitadores, simular chamadas recursivas, explorar caminhos.

Use fila quando o problema depende de ordem de chegada ou camadas. Exemplos: atendimento, processamento de tarefas em ordem, simulações de eventos.

## Análise informal de custo

As operações principais de `ArrayDeque` nas extremidades têm custo eficiente no uso esperado:

- empilhar e desempilhar: custo constante;
- inserir no fim e remover do começo: custo constante;
- consultar topo ou frente: custo constante;
- procurar um valor específico: custo linear, porque exige percorrer.

O ponto mais importante é escolher a operação dominante. Se o problema pede "sempre o último pendente", pense em pilha. Se pede "sempre o primeiro aguardando", pense em fila.

## Erros comuns

- Usar `pop()` sem verificar se a pilha está vazia.
- Usar operações de pilha quando o problema pede fila.
- Misturar `addFirst`, `addLast`, `removeFirst` e `removeLast` sem definir uma convenção.
- Usar `ArrayList.remove(0)` repetidamente para simular fila.
- Usar a classe antiga `Stack` sem necessidade.
- Esquecer que `ArrayDeque` não aceita `null`.

<!-- ## Exercícios de fixação

1. Simule manualmente uma pilha após as operações: `push(3)`, `push(8)`, `pop()`, `push(5)`, `peek()`.
2. Simule manualmente uma fila após: chega Ana, chega Bruno, atende, chega Carla, atende.
3. Modifique o validador de parênteses para aceitar também `[` e `]`.
4. Implemente uma fila de impressão com `adicionarDocumento` e `imprimirProximo`.
5. Explique por que uma pilha não é adequada para atendimento por ordem de chegada.
6. Explique por que uma fila não resolve diretamente validação de parênteses.

## Exercício integrador

Implemente `ValidadorDelimitadores` para aceitar `()`, `[]` e `{}`. O método deve retornar `true` apenas quando todo fechamento corresponde ao último delimitador aberto.

Casos de teste obrigatórios:

- `"([{}])"` deve ser válido;
- `"([)]"` deve ser inválido;
- `"(()"` deve ser inválido;
- `""` deve ser válido. -->

## Checklist de aprendizagem

- [ ] Sei explicar LIFO e FIFO.
- [ ] Sei usar `ArrayDeque` como pilha.
- [ ] Sei usar `ArrayDeque` como fila.
- [ ] Sei escolher entre pilha, fila e lista.
- [ ] Sei evitar remoções em estrutura vazia.
- [ ] Sei estimar o custo das operações principais.
