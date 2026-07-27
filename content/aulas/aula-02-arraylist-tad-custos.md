# Aula 02 — `ArrayList`, TAD e custos de operações

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar a diferença entre um TAD e uma implementação concreta;
- usar `ArrayList` para armazenar uma sequência dinâmica de elementos;
- aplicar operações como `add`, `get`, `set`, `remove`, `contains` e `size`;
- estimar custos de acesso, inserção, remoção e busca em uma lista baseada em array;
- escolher entre array e `ArrayList` em problemas simples;
- evitar erros comuns com índices e remoções durante percursos.

<!-- ## Pré-requisitos

Você precisa saber declarar variáveis, usar laços e trabalhar com arrays. A aula anterior revisou índices, varredura e contagem de operações. Agora vamos usar uma estrutura pronta da biblioteca Java, mas sem tratar a biblioteca como mágica. -->

## Problema motivador

Um professor está montando uma lista de presença. No começo da aula, ele não sabe exatamente quantos alunos vão participar. Durante a aula, alguns nomes são adicionados, um nome pode ser corrigido e talvez seja necessário remover uma inscrição feita por engano.

Como vimos anteriormente, um array puro exige escolher uma capacidade antes:

```java
String[] nomes = new String[60];
int tamanho = 0;
```

Isso funciona, mas obriga o programador a controlar manualmente `tamanho`, capacidade e deslocamentos. Podemos encapsular esse trabalho em uma estrutura de dados que cuide disso para nós. Um array redimensionável é uma boa ideia. Para isso, podemos usar um **tipo abstrato de dados (TAD)** chamado lista, que oferece operações bem definidas para manipular uma sequência de elementos.
<!-- Um `ArrayList` encapsula esse trabalho e oferece um TAD de lista: uma sequência com posições, tamanho atual e operações bem definidas. -->

## TAD e implementação

Um Tipo Abstrato de Dados descreve o que uma estrutura oferece, não exatamente como ela faz isso por dentro. Para uma lista, esperamos operações como:

- adicionar elemento no fim;
- acessar elemento por posição;
- trocar elemento de uma posição;
- remover elemento;
- perguntar o tamanho atual;
- percorrer todos os elementos.

## Pseudocódigo do TAD Lista

```text
TAD Lista
  elementos: array
  tamanho: number
  capacidade: number
```

- `elementos` armazena os valores da lista;
- `tamanho` indica quantos elementos estão atualmente armazenados;
- `capacidade` indica quantas posições existem no array interno.

### Criar uma lista

```text
CRIAR-LISTA()
  Input: none
  Output: Lista

  L <- nova Lista
  L.capacidade <- 4
  L.elementos <- novo array de tamanho L.capacidade
  L.tamanho <- 0

  RETURN L
```

A capacidade inicial pode ser qualquer valor positivo. Neste exemplo, a lista começa com espaço para quatro elementos.

### Redimensionar a lista

```text
REDIMENSIONAR(L)
  Input: Lista L
  Output: none

  novaCapacidade <- L.capacidade * 2
  novoArray <- novo array de tamanho novaCapacidade

  FOR i <- 0 TO L.tamanho - 1 DO
    novoArray[i] <- L.elementos[i]

  L.elementos <- novoArray
  L.capacidade <- novaCapacidade
```

Quando o array interno fica cheio, sua capacidade é dobrada. Os elementos são copiados para o novo array.

### Adicionar um elemento no fim

```text
ADICIONAR-FIM(L, elemento)
  Input: Lista L, elemento
  Output: none

  IF L.tamanho = L.capacidade THEN
    REDIMENSIONAR(L)

  L.elementos[L.tamanho] <- elemento
  L.tamanho <- L.tamanho + 1
```

A posição `L.tamanho` é a primeira posição livre do array. Depois da inserção, o tamanho da lista é incrementado.

### Acessar um elemento por posição

```text
ACESSAR(L, posicao)
  Input: Lista L, number posicao
  Output: elemento ou NULL

  IF posicao < 0 OR posicao >= L.tamanho THEN
    RETURN NULL

  RETURN L.elementos[posicao]
```

A operação retorna `NULL` quando a posição é inválida.

### Trocar o elemento de uma posição

```text
TROCAR(L, posicao, elemento)
  Input: Lista L, number posicao, elemento
  Output: boolean

  IF posicao < 0 OR posicao >= L.tamanho THEN
    RETURN false

  L.elementos[posicao] <- elemento

  RETURN true
```

A operação retorna `false` quando a posição é inválida. Caso contrário, substitui o elemento e retorna `true`.

### Remover um elemento por posição

```text
REMOVER(L, posicao)
  Input: Lista L, number posicao
  Output: elemento ou NULL

  IF posicao < 0 OR posicao >= L.tamanho THEN
    RETURN NULL

  removido <- L.elementos[posicao]

  FOR i <- posicao TO L.tamanho - 2 DO
    L.elementos[i] <- L.elementos[i + 1]

  L.tamanho <- L.tamanho - 1

  RETURN removido
```

Os elementos localizados depois da posição removida são deslocados uma posição para a esquerda.

O array interno não precisa ser reduzido após cada remoção. Ele pode manter sua capacidade atual para evitar redimensionamentos frequentes.

### Perguntar o tamanho atual

```text
TAMANHO(L)
  Input: Lista L
  Output: number

  RETURN L.tamanho
```

O tamanho representa a quantidade de elementos armazenados, e não a capacidade do array interno.

### Percorrer todos os elementos

```text
PERCORRER(L)
  Input: Lista L
  Output: none

  FOR i <- 0 TO L.tamanho - 1 DO
    PROCESSAR(L.elementos[i])
```

`PROCESSAR` representa a ação realizada com cada elemento.

Por exemplo:

```text
IMPRIMIR-TODOS(L)
  Input: Lista L
  Output: none

  FOR i <- 0 TO L.tamanho - 1 DO
    IMPRIMIR(L.elementos[i])
```

Apenas as posições de `0` até `L.tamanho - 1` fazem parte da lista. As demais posições pertencem ao array interno, mas ainda não contêm elementos válidos da lista.

## Implementação em Java

Em Java, `ArrayList` é uma implementação desse contrato usando internamente um array redimensionável. Isso significa que a lista tem posições contíguas e acesso rápido por índice, mas inserções e remoções no meio podem exigir deslocamento de elementos.

## Uso básico de `ArrayList`

```java
import java.util.ArrayList;

public class CadastroPresenca {
    public static void main(String[] args) {
        ArrayList<String> nomes = new ArrayList<>();

        nomes.add("Ana");
        nomes.add("Bruno");
        nomes.add("Carla");

        System.out.println(nomes.size()); // 3
        System.out.println(nomes.get(1)); // Bruno

        nomes.set(1, "Breno");
        nomes.remove("Ana");

        for (int i = 0; i < nomes.size(); i++) {
            System.out.println(i + ": " + nomes.get(i));
        }
    }
}
```

O tipo entre `<>` indica o tipo dos elementos. `ArrayList<String>` guarda strings. `ArrayList<Integer>` guarda inteiros, usando a classe `Integer`, não o tipo primitivo `int`.

## Operações principais

`add(valor)` insere no final da lista. Em geral, essa operação é rápida. Eventualmente, quando o array interno fica cheio, a lista precisa criar outro array maior e copiar os elementos. Mesmo assim, no uso comum, tratamos `add` no fim como uma operação eficiente.

`add(indice, valor)` insere em uma posição específica. Se inserimos no meio ou no começo, os elementos à direita precisam ser movidos uma posição para a direita. Isso custa mais.

`get(indice)` acessa diretamente uma posição. Como `ArrayList` é baseada em array, encontrar a posição pelo índice é rápido.

`set(indice, valor)` substitui o elemento de uma posição. Também é rápido, desde que o índice seja válido.

`remove(indice)` remove por posição. Se removemos do meio ou do começo, os elementos à direita precisam andar uma posição para a esquerda. Isso custa mais.

`contains(valor)` verifica se um valor aparece. Para isso, a lista precisa procurar elemento por elemento até encontrar ou até terminar. Portanto, essa operação tem custo linear no pior caso.

## Exemplo guiado: lista de tarefas

```java
import java.util.ArrayList;

public class ListaTarefas {
    private ArrayList<String> tarefas = new ArrayList<>();

    public void adicionar(String tarefa) {
        tarefas.add(tarefa);
    }

    public boolean contem(String tarefa) {
        return tarefas.contains(tarefa);
    }

    public void concluirPrimeira() {
        if (!tarefas.isEmpty()) {
            tarefas.remove(0);
        }
    }

    public void imprimir() {
        for (int i = 0; i < tarefas.size(); i++) {
            System.out.println((i + 1) + ". " + tarefas.get(i));
        }
    }

    public static void main(String[] args) {
        ListaTarefas lista = new ListaTarefas();
        lista.adicionar("Ler enunciado");
        lista.adicionar("Implementar solucao");
        lista.adicionar("Testar casos de borda");

        System.out.println(lista.contem("Implementar solucao"));
        lista.concluirPrimeira();
        lista.imprimir();
    }
}
```

Nesse exemplo, concluir a primeira tarefa usa `remove(0)`. Isso é correto, mas pode ser caro se a lista for grande, porque todos os outros elementos precisam ser deslocados. Se o problema for sempre remover o primeiro da fila, veremos na próxima aula que uma fila é uma estrutura mais adequada.

## Array ou `ArrayList`?

Use array quando o tamanho é fixo, conhecido e faz parte do problema, como notas de uma turma já carregada ou uma matriz de distâncias. Use `ArrayList` quando a quantidade de elementos cresce ou diminui durante a execução.

Mas `ArrayList` não elimina raciocínio de custo. Ela facilita redimensionamento e organização da sequência, mas busca por valor continua exigindo varredura; inserir no meio continua exigindo deslocamento; remover do começo continua deslocando elementos.

## Análise informal de custo

| Operação | Custo informal | Por quê |
| --- | --- | --- |
| `get(i)` | constante | acesso direto por índice |
| `set(i, x)` | constante | troca em posição conhecida |
| `add(x)` no fim | geralmente constante | insere após o último elemento |
| `add(i, x)` | linear | pode deslocar muitos elementos |
| `remove(i)` | linear | pode deslocar muitos elementos |
| `contains(x)` | linear | precisa procurar valor |
| percorrer tudo | linear | visita cada elemento uma vez |

<!-- Esses custos ajudam a escolher estrutura. Se a operação principal do problema é "consultar por chave", talvez `HashMap` seja melhor. Se é "remover sempre do começo", uma fila com `ArrayDeque` será melhor. -->

## Erros comuns

- Usar `nomes[nomes.length]` como se `ArrayList` fosse array. A lista usa `size()` e `get(i)`.
- Percorrer com `i <= lista.size()`. O último índice válido é `size() - 1`.
- Remover elementos enquanto percorre para frente sem ajustar o índice.
- Confundir `remove(2)` com `remove(Integer.valueOf(2))` em listas de inteiros.
- Escolher `ArrayList` para tudo sem pensar na operação dominante.

<!-- ## Exercícios de fixação

1. Crie um `ArrayList<Integer>` e adicione cinco números. Imprima todos com seus índices.
2. Implemente `soma(ArrayList<Integer> valores)`.
3. Implemente `maioresQue(ArrayList<Integer> valores, int limite)`, retornando uma nova lista.
4. Escreva um método que remove todos os nomes vazios de uma lista de strings.
5. Para cada operação (`get`, `contains`, `remove(0)`, `add` no fim), diga se o custo esperado é constante ou linear.
6. Explique por que `ArrayList` é uma boa escolha para montar uma lista de participantes, mas não necessariamente para atender pessoas por ordem de chegada.

## Exercício integrador

Implemente uma classe `HistoricoNotas` com:

- um `ArrayList<Double>` interno;
- método `adicionarNota(double nota)`;
- método `media()`;
- método `maiorNota()`;
- método `removerNotaNaPosicao(int indice)`;
- método `imprimirRelatorio()`.

Inclua tratamento para lista vazia e pelo menos quatro testes no `main`. -->

## Checklist de aprendizagem

- [ ] Sei criar e usar um `ArrayList`.
- [ ] Sei explicar o que é um TAD em linguagem simples.
- [ ] Sei diferenciar acesso por índice e busca por valor.
- [ ] Sei estimar custos principais de `ArrayList`.
- [ ] Sei identificar quando uma lista não é a melhor estrutura.
