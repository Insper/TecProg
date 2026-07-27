# Aula 04 — `Mapas` e `Conjuntos`

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- usar `HashMap` para associar chaves a valores;
- usar `HashSet` para representar presença sem repetição;
- implementar contadores e deduplicadores;
- escolher entre lista, mapa e conjunto;
- explicar por que consultas em hash costumam ser eficientes;
- reconhecer cuidados com normalização de chaves.

<!-- ## Pré-requisitos

Você já deve saber percorrer arrays, strings e listas. Também deve saber que buscar repetidamente em uma lista pode custar caro, porque `contains` em `ArrayList` precisa comparar elemento por elemento no pior caso. -->

## Problema motivador

Queremos analisar uma lista de palavras digitadas por estudantes em respostas curtas. Duas perguntas são comuns:

1. Quais palavras diferentes apareceram?
2. Quantas vezes cada palavra apareceu?

Para a primeira pergunta, queremos um conjunto de palavras únicas. Para a segunda, queremos associar cada palavra a uma contagem.

## Mapa

Um **mapa** é uma estrutura de dados que armazena associações entre **chaves** e **valores**.

Cada elemento do mapa é um par:

```text
chave -> valor
```

Por exemplo, um mapa pode relacionar o nome de um aluno à sua nota:

```text
"Ana"   -> 8.5
"Bruno" -> 7.0
"Carla" -> 9.2
```

Nesse exemplo:

* `"Ana"`, `"Bruno"` e `"Carla"` são as chaves;
* `8.5`, `7.0` e `9.2` são os valores.

As chaves de um mapa são únicas. Portanto, não podem existir dois pares diferentes com a mesma chave. Ao inserir novamente uma chave existente, seu valor é substituído.

```text
INSERIR(M, "Ana", 8.5)
INSERIR(M, "Ana", 9.0)
```

Após essas operações, o mapa contém:

```text
"Ana" -> 9.0
```

Mapas são úteis quando se deseja localizar um valor a partir de uma informação que o identifica, sem precisar conhecer sua posição numérica.

Alguns exemplos de uso são:

* localizar um aluno pelo número de matrícula;
* localizar um produto pelo código;
* contar quantas vezes cada palavra aparece em um texto;
* associar nomes de configurações aos seus valores;
* armazenar dados de usuários utilizando o nome de usuário como chave.

### Por que o Mapa é eficiente?

Uma possível implementação de mapa seria armazenar todos os pares em uma lista.

Para localizar uma chave nessa implementação, seria necessário percorrer os pares:

```text
("Ana", 8.5)
("Bruno", 7.0)
("Carla", 9.2)
...
```

Quanto maior fosse a lista, maior poderia ser a quantidade de comparações necessárias.

O `Mapa` evita normalmente esse percurso completo usando uma **função hash**.

A função hash recebe uma chave e produz um número inteiro:

```text
HASH("Ana") -> 35721
HASH("Bruno") -> 82416
HASH("Carla") -> 19304
```

Esse número é transformado em uma posição do array interno:

```text
posicao <- HASH(chave) MOD capacidade
```

Se o array possui capacidade `8`, por exemplo:

```text
HASH("Ana") MOD 8 -> 1
```

Assim, o par associado à chave `"Ana"` será procurado diretamente no balde de posição `1`.

Em vez de percorrer todos os elementos do mapa, a operação segue diretamente para uma pequena região na qual a chave deve estar.

Essa é a principal razão da eficiência computacional de um Mapa:

> A função hash transforma a chave em uma posição provável de armazenamento.

Quando a função hash distribui bem as chaves e o mapa mantém espaço livre suficiente, cada balde contém poucos elementos. Dessa forma, inserir, consultar e remover normalmente exigem apenas:

1. calcular o hash da chave;
2. localizar o balde correspondente;
3. examinar poucos pares dentro desse balde.

A quantidade total de elementos armazenados pode aumentar bastante sem fazer com que todas as consultas precisem percorrer o mapa inteiro.

### Colisões

Chaves diferentes podem produzir a mesma posição.

Por exemplo:

```text
HASH("Ana") MOD 8 -> 1
HASH("Carlos") MOD 8 -> 1
```

Essa situação é chamada de **colisão**.

Uma colisão não significa que as chaves são iguais. Significa apenas que elas foram direcionadas para o mesmo balde.

Uma forma de tratar colisões é fazer com que cada posição do array armazene uma lista de pares:

```text
Posição 0 -> []
Posição 1 -> [("Ana", 8.5), ("Carlos", 7.5)]
Posição 2 -> []
Posição 3 -> [("Bruno", 7.0)]
Posição 4 -> [("Carla", 9.2)]
Posição 5 -> []
Posição 6 -> []
Posição 7 -> []
```

Ao consultar `"Carlos"`, o mapa calcula a posição `1` e procura a chave apenas na lista daquele balde.

### Par chave-valor

Cada elemento armazenado nos baldes é um par contendo uma chave e um valor.

```text
TAD Par
  chave
  valor
```

## TAD Mapa

```text
TAD Mapa
  baldes: array de listas de Par
  tamanho: number
  capacidade: number
```

* `baldes` é o array usado para distribuir os pares;
* `tamanho` indica quantos pares estão armazenados;
* `capacidade` indica quantos baldes existem;
* cada balde contém uma lista de pares.

### Criar um mapa

```text
CRIAR-MAPA()
  Input: none
  Output: Mapa

  M <- novo Mapa
  M.capacidade <- 8
  M.tamanho <- 0
  M.baldes <- novo array de tamanho M.capacidade

  FOR i <- 0 TO M.capacidade - 1 DO
    M.baldes[i] <- CRIAR-LISTA()

  RETURN M
```

Nosso mapa começa com oito baldes. Esse valor é apenas uma escolha inicial e pode ser alterado.

### Calcular a posição de uma chave

```text
CALCULAR-POSICAO(chave, capacidade)
  Input: chave, number capacidade
  Output: number

  codigo <- HASH(chave)
  posicao <- codigo MOD capacidade

  RETURN posicao
```

A função `HASH` depende do tipo da chave. Ela deve sempre produzir o mesmo código quando recebe a mesma chave.

Também é desejável que ela distribua diferentes chaves entre várias posições do array.

### Inserir um par

A operação `INSERIR` associa uma chave a um valor.

Caso a chave já exista, seu valor é substituído. Caso contrário, um novo par é adicionado.

```text
INSERIR(M, chave, valor)
  Input: Mapa M, chave, valor
  Output: none

  IF PRECISA-REDIMENSIONAR(M) THEN
    REDIMENSIONAR(M)

  posicao <- CALCULAR-POSICAO(chave, M.capacidade)
  balde <- M.baldes[posicao]

  FOR i <- 0 TO TAMANHO(balde) - 1 DO
    par <- ACESSAR(balde, i)

    IF par.chave = chave THEN
      par.valor <- valor
      RETURN

  novoPar <- novo Par
  novoPar.chave <- chave
  novoPar.valor <- valor

  ADICIONAR-FIM(balde, novoPar)
  M.tamanho <- M.tamanho + 1
```

Observe que substituir o valor de uma chave existente não aumenta o tamanho do mapa.

### Consultar um valor

A operação `OBTER` recebe uma chave e retorna o valor associado a ela.

```text
OBTER(M, chave)
  Input: Mapa M, chave
  Output: valor ou NULL

  posicao <- CALCULAR-POSICAO(chave, M.capacidade)
  balde <- M.baldes[posicao]

  FOR i <- 0 TO TAMANHO(balde) - 1 DO
    par <- ACESSAR(balde, i)

    IF par.chave = chave THEN
      RETURN par.valor

  RETURN NULL
```

A operação retorna `NULL` quando a chave não está presente.

Essa convenção exige cuidado caso `NULL` também possa ser armazenado como valor. Nesse caso, a operação `CONTEM-CHAVE` pode ser usada para distinguir as situações.

### Verificar se uma chave existe

```text
CONTEM-CHAVE(M, chave)
  Input: Mapa M, chave
  Output: boolean

  posicao <- CALCULAR-POSICAO(chave, M.capacidade)
  balde <- M.baldes[posicao]

  FOR i <- 0 TO TAMANHO(balde) - 1 DO
    par <- ACESSAR(balde, i)

    IF par.chave = chave THEN
      RETURN true

  RETURN false
```

### Remover uma chave

A operação `REMOVER` elimina o par associado à chave e retorna seu valor.

```text
REMOVER(M, chave)
  Input: Mapa M, chave
  Output: valor ou NULL

  posicao <- CALCULAR-POSICAO(chave, M.capacidade)
  balde <- M.baldes[posicao]

  FOR i <- 0 TO TAMANHO(balde) - 1 DO
    par <- ACESSAR(balde, i)

    IF par.chave = chave THEN
      removido <- REMOVER(balde, i)
      M.tamanho <- M.tamanho - 1

      RETURN removido.valor

  RETURN NULL
```

Se a chave não existir, a operação retorna `NULL`.

### Consultar o tamanho

```text
TAMANHO-MAPA(M)
  Input: Mapa M
  Output: number

  RETURN M.tamanho
```

O tamanho corresponde à quantidade de pares chave-valor armazenados, e não à quantidade de baldes.

### Verificar se o mapa está vazio

```text
VAZIO(M)
  Input: Mapa M
  Output: boolean

  RETURN M.tamanho = 0
```

### Percorrer todos os pares

Como os elementos estão distribuídos entre os baldes, é necessário percorrer cada balde e, em seguida, os pares contidos nele.

```text
PERCORRER(M)
  Input: Mapa M
  Output: none

  FOR i <- 0 TO M.capacidade - 1 DO
    balde <- M.baldes[i]

    FOR j <- 0 TO TAMANHO(balde) - 1 DO
      par <- ACESSAR(balde, j)
      PROCESSAR(par.chave, par.valor)
```

`PROCESSAR` representa a ação realizada com cada par, como imprimir, copiar ou acumular informações.

A ordem de percurso de um Mapa normalmente não corresponde à ordem em que os pares foram inseridos.

### Redimensionamento

Se muitos pares forem armazenados em poucos baldes, as colisões se tornam frequentes. Os baldes ficam maiores e as operações passam a exigir mais comparações.

Para evitar esse problema, o mapa pode aumentar seu array interno quando a quantidade de elementos se aproxima da quantidade de baldes.

```text
PRECISA-REDIMENSIONAR(M)
  Input: Mapa M
  Output: boolean

  RETURN M.tamanho >= M.capacidade * 0.75
```

Nesse exemplo, o mapa é redimensionado quando estiver utilizando pelo menos 75% de sua capacidade.

A operação de redimensionamento cria um array maior e redistribui todos os pares.

```text
REDIMENSIONAR(M)
  Input: Mapa M
  Output: none

  baldesAntigos <- M.baldes
  capacidadeAntiga <- M.capacidade

  M.capacidade <- M.capacidade * 2
  M.baldes <- novo array de tamanho M.capacidade
  M.tamanho <- 0

  FOR i <- 0 TO M.capacidade - 1 DO
    M.baldes[i] <- CRIAR-LISTA()

  FOR i <- 0 TO capacidadeAntiga - 1 DO
    balde <- baldesAntigos[i]

    FOR j <- 0 TO TAMANHO(balde) - 1 DO
      par <- ACESSAR(balde, j)
      INSERIR(M, par.chave, par.valor)
```

Os pares precisam ser redistribuídos porque a posição depende da capacidade:

```text
posicao <- HASH(chave) MOD capacidade
```

Quando a capacidade muda, uma mesma chave pode passar a pertencer a outro balde.

O redimensionamento exige percorrer todos os pares, mas não acontece em toda inserção. Ele ocorre apenas ocasionalmente, quando o mapa precisa de mais espaço.

### Exemplo de uso

```text
notas <- CRIAR-MAPA()

INSERIR(notas, "Ana", 8.5)
INSERIR(notas, "Bruno", 7.0)
INSERIR(notas, "Carla", 9.2)

notaAna <- OBTER(notas, "Ana")
IMPRIMIR(notaAna)

INSERIR(notas, "Ana", 9.0)

IF CONTEM-CHAVE(notas, "Bruno") THEN
  IMPRIMIR("Bruno possui uma nota cadastrada")

notaRemovida <- REMOVER(notas, "Carla")
```

### Resumo das operações

| Operação                   | Comportamento                                 |
| -------------------------- | --------------------------------------------- |
| `CRIAR-MAPA()`             | Cria um mapa vazio                            |
| `INSERIR(M, chave, valor)` | Insere um par ou atualiza uma chave existente |
| `OBTER(M, chave)`          | Retorna o valor associado à chave             |
| `CONTEM-CHAVE(M, chave)`   | Informa se uma chave está presente            |
| `REMOVER(M, chave)`        | Remove a chave e retorna seu valor            |
| `TAMANHO-MAPA(M)`          | Retorna a quantidade de pares                 |
| `VAZIO(M)`                 | Informa se o mapa está vazio                  |
| `PERCORRER(M)`             | Percorre todos os pares                       |
| `REDIMENSIONAR(M)`         | Aumenta e reorganiza os baldes                |

### Custos das operações

Quando a função hash distribui bem as chaves e o mapa é redimensionado adequadamente:

* `OBTER` normalmente examina apenas um balde pequeno;
* `CONTEM-CHAVE` normalmente examina apenas um balde pequeno;
* `REMOVER` normalmente examina apenas um balde pequeno;
* `INSERIR` normalmente examina apenas um balde pequeno e adiciona o novo par;
* `TAMANHO-MAPA` e `VAZIO` consultam diretamente informações armazenadas;
* `PERCORRER` precisa visitar todos os pares;
* `REDIMENSIONAR` precisa redistribuir todos os pares, mas ocorre apenas ocasionalmente.

Por isso, consultar uma chave em um Mapa costuma ser muito mais eficiente do que procurar um elemento em uma lista inteira.

Entretanto, essa eficiência depende de alguns fatores:

* a função hash deve distribuir bem as chaves;
* a capacidade não deve ser muito pequena;
* o mapa deve ser redimensionado quando ficar cheio;
* as chaves devem permitir comparação;
* o valor usado como chave não deve mudar de forma que altere seu hash enquanto estiver armazenado.

No pior caso, muitas chaves podem acabar no mesmo balde. Nesse cenário, a busca precisa percorrer uma lista grande e perde parte da vantagem do Mapa. Uma boa implementação procura evitar essa situação por meio de uma função hash adequada e do redimensionamento.

## Implementação de `HashMap`

Um `Map` associa uma chave a um valor. Para contagem de palavras, a chave é a palavra e o valor é a quantidade de ocorrências.

```java
import java.util.HashMap;

public class Frequencia {
    public static HashMap<String, Integer> contar(String[] palavras) {
        HashMap<String, Integer> freq = new HashMap<>();

        for (String palavra : palavras) {
            String chave = palavra.toLowerCase();
            int atual = freq.getOrDefault(chave, 0);
            freq.put(chave, atual + 1);
        }

        return freq;
    }

    public static void main(String[] args) {
        String[] entrada = {"Java", "array", "java", "Hash"};
        HashMap<String, Integer> freq = contar(entrada);

        System.out.println(freq.get("java"));  // 2
        System.out.println(freq.get("array")); // 1
    }
}
```

Operações principais:

- `put(chave, valor)`: insere ou atualiza;
- `get(chave)`: consulta valor ou retorna `null` se a chave não existir;
- `getOrDefault(chave, padrao)`: consulta com valor padrão;
- `containsKey(chave)`: verifica se a chave existe;
- `remove(chave)`: remove associação.

## Normalização de chaves

Chaves precisam representar a ideia correta do problema. Em contagem de palavras, `"Java"` e `"java"` devem contar como a mesma palavra? Se sim, normalize com `toLowerCase()`. Pontuação deve ser removida? Espaços extras devem ser ignorados? Essas decisões fazem parte da modelagem.

```java
public static String normalizar(String palavra) {
    return palavra.toLowerCase().trim();
}
```

Uma estrutura de hash não corrige uma chave mal modelada. Ela apenas usa a chave que você entrega.

A implementação abaixo usa um **array de listas**, no qual cada posição é um balde responsável por armazenar parte dos elementos.

## Conjunto

Um **conjunto** é uma estrutura de dados que armazena elementos sem permitir repetições.

Por exemplo, considere um conjunto de linguagens de programação:

```text
{"Java", "Python", "C"}
```

Cada elemento aparece apenas uma vez. Se tentarmos inserir `"Java"` novamente, o conjunto permanece inalterado:

```text
ADICIONAR(C, "Java")
ADICIONAR(C, "Python")
ADICIONAR(C, "C")
ADICIONAR(C, "Java")
```

Ao final, o conjunto contém:

```text
{"Java", "Python", "C"}
```

Diferentemente de uma lista, um conjunto normalmente:

* não possui posições usadas diretamente pelo programador;
* não permite elementos repetidos;
* não garante que os elementos sejam percorridos na ordem de inserção;
* permite verificar rapidamente se um elemento está presente.

Conjuntos são úteis quando o importante é saber se um elemento pertence ou não a uma coleção.

Alguns exemplos de uso são:

* armazenar identificadores de usuários conectados;
* guardar palavras diferentes encontradas em um texto;
* eliminar valores repetidos;
* registrar disciplinas já concluídas por um aluno;
* controlar páginas já visitadas por um algoritmo;
* verificar rapidamente se um valor já foi processado.

### Comparação com uma lista

Uma lista pode conter elementos repetidos:

```text
["Java", "Python", "Java", "C", "Python"]
```

Um conjunto formado a partir desses elementos contém apenas os valores distintos:

```text
{"Java", "Python", "C"}
```

Também existe uma diferença importante na consulta.

Em uma lista comum, para verificar se `"C"` está presente, pode ser necessário percorrer vários elementos:

```text
"Java"
"Python"
"Java"
"C"
```

Um conjunto implementado com uma tabela de dispersão (hash) utiliza uma função que calcula em qual região da estrutura o elemento provavelmente está armazenado. Dessa forma, normalmente não é necessário percorrer todos os elementos.

### Por que essa estrutura é eficiente?

A estrutura utiliza uma **função hash** para transformar cada elemento em um número inteiro:

```text
HASH("Java")   -> 71825
HASH("Python") -> 46219
HASH("C")      -> 10342
```

Esse número é convertido em uma posição do array interno:

```text
posicao <- HASH(elemento) MOD capacidade
```

Se o array possuir capacidade `8`, por exemplo:

```text
HASH("Java") MOD 8 -> 1
```

Assim, o elemento `"Java"` será procurado diretamente no balde de posição `1`.

Em vez de percorrer todos os elementos do conjunto, a operação segue diretamente para uma pequena região na qual o elemento deve estar.

Essa é a principal razão de sua eficiência:

> A função hash permite localizar rapidamente o balde associado a um elemento.

Quando os elementos estão bem distribuídos, cada balde contém poucos valores. Assim, adicionar, consultar e remover normalmente exigem:

1. calcular o hash do elemento;
2. localizar o balde correspondente;
3. examinar poucos elementos dentro desse balde.

A quantidade total de elementos pode crescer bastante sem fazer com que toda consulta precise percorrer o conjunto inteiro.

### Colisões

Elementos diferentes podem produzir a mesma posição.

Por exemplo:

```text
HASH("Java") MOD 8 -> 1
HASH("Ruby") MOD 8 -> 1
```

Essa situação é chamada de **colisão**.

Uma colisão não significa que os elementos são iguais. Significa apenas que eles foram direcionados para o mesmo balde.

Uma forma de tratar colisões é fazer com que cada posição do array armazene uma lista:

```text
Posição 0 -> []
Posição 1 -> ["Java", "Ruby"]
Posição 2 -> []
Posição 3 -> ["Python"]
Posição 4 -> ["C"]
Posição 5 -> []
Posição 6 -> []
Posição 7 -> []
```

Ao consultar `"Ruby"`, o conjunto calcula a posição `1` e procura o elemento apenas na lista daquele balde.

## TAD Conjunto

```text
TAD Conjunto
  baldes: array de listas
  tamanho: number
  capacidade: number
```

* `baldes` é o array usado para distribuir os elementos;
* `tamanho` indica quantos elementos distintos estão armazenados;
* `capacidade` indica quantos baldes existem;
* cada balde contém uma lista de elementos.

### Criar um conjunto

```text
CRIAR-CONJUNTO()
  Input: none
  Output: Conjunto

  C <- novo Conjunto
  C.capacidade <- 8
  C.tamanho <- 0
  C.baldes <- novo array de tamanho C.capacidade

  FOR i <- 0 TO C.capacidade - 1 DO
    C.baldes[i] <- CRIAR-LISTA()

  RETURN C
```

O conjunto começa com oito baldes. Esse valor é apenas uma capacidade inicial e pode ser alterado.

### Calcular a posição de um elemento

```text
CALCULAR-POSICAO(elemento, capacidade)
  Input: elemento, number capacidade
  Output: number

  codigo <- HASH(elemento)
  posicao <- codigo MOD capacidade

  RETURN posicao
```

A função `HASH` deve sempre produzir o mesmo código quando recebe o mesmo elemento.

Também é desejável que elementos diferentes sejam bem distribuídos entre as posições disponíveis.

### Verificar se um elemento pertence ao conjunto

```text
CONTEM(C, elemento)
  Input: Conjunto C, elemento
  Output: boolean

  posicao <- CALCULAR-POSICAO(elemento, C.capacidade)
  balde <- C.baldes[posicao]

  FOR i <- 0 TO TAMANHO(balde) - 1 DO
    atual <- ACESSAR(balde, i)

    IF atual = elemento THEN
      RETURN true

  RETURN false
```

A operação retorna:

* `true` quando o elemento está presente;
* `false` quando o elemento não está presente.

A busca ocorre apenas no balde calculado para o elemento.

### Adicionar um elemento

A operação `ADICIONAR` insere um elemento somente quando ele ainda não pertence ao conjunto.

```text
ADICIONAR(C, elemento)
  Input: Conjunto C, elemento
  Output: boolean

  IF CONTEM(C, elemento) THEN
    RETURN false

  IF PRECISA-REDIMENSIONAR(C) THEN
    REDIMENSIONAR(C)

  posicao <- CALCULAR-POSICAO(elemento, C.capacidade)
  balde <- C.baldes[posicao]

  ADICIONAR-FIM(balde, elemento)
  C.tamanho <- C.tamanho + 1

  RETURN true
```

A operação retorna:

* `true` quando o elemento é inserido;
* `false` quando ele já estava presente.

Tentar inserir um elemento repetido não altera o conjunto.

Observe que a posição é calculada novamente depois do possível redimensionamento, pois a capacidade pode ter mudado.

### Remover um elemento

```text
REMOVER(C, elemento)
  Input: Conjunto C, elemento
  Output: boolean

  posicao <- CALCULAR-POSICAO(elemento, C.capacidade)
  balde <- C.baldes[posicao]

  FOR i <- 0 TO TAMANHO(balde) - 1 DO
    atual <- ACESSAR(balde, i)

    IF atual = elemento THEN
      REMOVER(balde, i)
      C.tamanho <- C.tamanho - 1

      RETURN true

  RETURN false
```

A operação retorna:

* `true` quando o elemento é encontrado e removido;
* `false` quando o elemento não pertence ao conjunto.

### Consultar o tamanho

```text
TAMANHO-CONJUNTO(C)
  Input: Conjunto C
  Output: number

  RETURN C.tamanho
```

O tamanho corresponde à quantidade de elementos distintos armazenados, e não à quantidade de baldes.

Por exemplo:

```text
ADICIONAR(C, "Java")
ADICIONAR(C, "Python")
ADICIONAR(C, "Java")
```

O tamanho do conjunto será `2`, pois a segunda inserção de `"Java"` não adiciona um novo elemento.

### Verificar se o conjunto está vazio

```text
VAZIO(C)
  Input: Conjunto C
  Output: boolean

  RETURN C.tamanho = 0
```

A operação retorna `true` quando não há elementos armazenados.

### Percorrer todos os elementos

Como os elementos estão distribuídos entre vários baldes, é necessário percorrer cada balde.

```text
PERCORRER(C)
  Input: Conjunto C
  Output: none

  FOR i <- 0 TO C.capacidade - 1 DO
    balde <- C.baldes[i]

    FOR j <- 0 TO TAMANHO(balde) - 1 DO
      elemento <- ACESSAR(balde, j)
      PROCESSAR(elemento)
```

`PROCESSAR` representa a ação realizada com cada elemento, como imprimir, copiar ou contar.

A ordem de percurso normalmente não corresponde à ordem em que os elementos foram inseridos.

### Redimensionamento

Se muitos elementos forem armazenados em poucos baldes, as colisões se tornam mais frequentes. Os baldes ficam maiores e as operações passam a exigir mais comparações.

Para evitar isso, o conjunto pode aumentar seu array interno quando a quantidade de elementos se aproxima da quantidade de baldes.

```text
PRECISA-REDIMENSIONAR(C)
  Input: Conjunto C
  Output: boolean

  RETURN C.tamanho >= C.capacidade * 0.75
```

Nesse exemplo, o conjunto é redimensionado quando a quantidade de elementos atinge pelo menos 75% da quantidade de baldes.

```text
REDIMENSIONAR(C)
  Input: Conjunto C
  Output: none

  baldesAntigos <- C.baldes
  capacidadeAntiga <- C.capacidade

  C.capacidade <- C.capacidade * 2
  C.baldes <- novo array de tamanho C.capacidade
  C.tamanho <- 0

  FOR i <- 0 TO C.capacidade - 1 DO
    C.baldes[i] <- CRIAR-LISTA()

  FOR i <- 0 TO capacidadeAntiga - 1 DO
    balde <- baldesAntigos[i]

    FOR j <- 0 TO TAMANHO(balde) - 1 DO
      elemento <- ACESSAR(balde, j)
      ADICIONAR(C, elemento)
```

Os elementos precisam ser redistribuídos porque a posição depende da capacidade:

```text
posicao <- HASH(elemento) MOD capacidade
```

Quando a capacidade muda, um elemento pode passar a pertencer a outro balde.

O redimensionamento precisa percorrer todos os elementos, mas ocorre apenas ocasionalmente.

### Exemplo de uso

```text
visitadas <- CRIAR-CONJUNTO()

ADICIONAR(visitadas, "pagina-inicial")
ADICIONAR(visitadas, "produtos")
ADICIONAR(visitadas, "contato")

IF CONTEM(visitadas, "produtos") THEN
  IMPRIMIR("A página de produtos já foi visitada")

ADICIONAR(visitadas, "produtos")

IMPRIMIR(TAMANHO-CONJUNTO(visitadas))

REMOVER(visitadas, "contato")
```

A segunda tentativa de adicionar `"produtos"` não altera o conjunto.

### Resumo das operações

| Operação                 | Comportamento                                          |
| ------------------------ | ------------------------------------------------------ |
| `CRIAR-CONJUNTO()`       | Cria um conjunto vazio                                 |
| `ADICIONAR(C, elemento)` | Adiciona um elemento se ele ainda não estiver presente |
| `CONTEM(C, elemento)`    | Informa se o elemento pertence ao conjunto             |
| `REMOVER(C, elemento)`   | Remove um elemento, caso ele esteja presente           |
| `TAMANHO-CONJUNTO(C)`    | Retorna a quantidade de elementos distintos            |
| `VAZIO(C)`               | Informa se o conjunto está vazio                       |
| `PERCORRER(C)`           | Percorre todos os elementos                            |
| `ESVAZIAR(C)`            | Remove todos os elementos                              |
| `REDIMENSIONAR(C)`       | Aumenta e reorganiza os baldes                         |

### Custos das operações

Quando a função hash distribui bem os elementos e a capacidade é ajustada adequadamente:

* `CONTEM` normalmente examina apenas um balde pequeno;
* `ADICIONAR` normalmente consulta um balde pequeno e insere o elemento;
* `REMOVER` normalmente examina apenas um balde pequeno;
* `TAMANHO-CONJUNTO` e `VAZIO` consultam diretamente informações armazenadas;
* `PERCORRER` precisa visitar todos os baldes e todos os elementos;
* `REDIMENSIONAR` precisa redistribuir todos os elementos, mas ocorre apenas ocasionalmente.

Por isso, verificar se um elemento pertence ao conjunto costuma ser muito mais eficiente do que procurar esse elemento percorrendo uma lista inteira.

Essa eficiência depende de alguns fatores:

* a função hash deve distribuir bem os elementos;
* a capacidade não deve ser muito pequena;
* o conjunto deve ser redimensionado quando necessário;
* os elementos precisam permitir comparação;
* um elemento não deve mudar de maneira que altere seu hash enquanto estiver armazenado.

No pior caso, muitos elementos podem ser enviados para o mesmo balde. Nesse cenário, a busca precisa percorrer uma lista grande e perde parte de sua eficiência. Uma boa implementação procura evitar isso com uma função hash adequada e redimensionamentos periódicos.


## Implementação de `HashSet`

Um `Set` representa um conjunto: cada elemento aparece no máximo uma vez. Se tentamos adicionar o mesmo elemento novamente, o conjunto continua com uma única ocorrência.

```java
import java.util.HashSet;

public class PalavrasUnicas {
    public static void main(String[] args) {
        HashSet<String> palavras = new HashSet<>();

        palavras.add("java");
        palavras.add("array");
        palavras.add("java");

        System.out.println(palavras.size());          // 2
        System.out.println(palavras.contains("java")); // true
    }
}
```

Operações principais:

- `add(x)`: adiciona se ainda não estiver presente;
- `contains(x)`: verifica presença;
- `remove(x)`: remove;
- `size()`: devolve quantidade de elementos únicos.

## Exemplo guiado: detectar duplicatas

```java
import java.util.HashSet;

public class Duplicatas {
    public static boolean temDuplicata(int[] valores) {
        HashSet<Integer> vistos = new HashSet<>();

        for (int valor : valores) {
            if (vistos.contains(valor)) {
                return true;
            }
            vistos.add(valor);
        }

        return false;
    }

    public static void main(String[] args) {
        System.out.println(temDuplicata(new int[] {4, 8, 2, 8})); // true
        System.out.println(temDuplicata(new int[] {4, 8, 2}));    // false
    }
}
```

Sem `HashSet`, poderíamos comparar cada par de elementos com dois laços. Isso teria custo quadrático no pior caso. Com conjunto, a ideia é registrar o que já apareceu e consultar rapidamente.

## Map ou Set?

Use `HashSet` quando basta saber se algo está presente:

- matrículas já processadas;
- palavras distintas;
- códigos bloqueados;
- posições visitadas.

Use `HashMap` quando cada chave tem informação associada:

- palavra para contagem;
- matrícula para nota;
- produto para estoque;
- cidade para lista de vizinhos.

Se você está usando `HashMap<String, Boolean>`, pergunte se um `HashSet<String>` não expressa melhor o problema.

## Análise informal de custo

Em média, operações de `HashMap` e `HashSet` como inserir, consultar e remover são eficientes e costumam ser tratadas como custo constante esperado. Isso não significa que são mágicas ou sempre constantes em qualquer circunstância. Colisões existem, e a qualidade das chaves importa. Para esta disciplina, o foco é a comparação prática: muitas consultas por chave costumam ser muito melhores com hash do que com busca em listas.

Compare:

- procurar cada palavra em uma `ArrayList` de palavras já vistas pode custar linear a cada consulta;
- procurar em um `HashSet` tende a ser muito mais direto.

## Iteração

Podemos percorrer chaves e entradas:

```java
for (String chave : freq.keySet()) {
    System.out.println(chave + ": " + freq.get(chave));
}

for (var entrada : freq.entrySet()) {
    System.out.println(entrada.getKey() + ": " + entrada.getValue());
}
```

A ordem de iteração de `HashMap` e `HashSet` não deve ser usada como parte da resposta. Se o problema exige ordem, precisamos pensar em outra estrutura ou ordenar depois.

## Erros comuns

- Usar `get(chave)` e somar `1` sem tratar `null`.
- Esperar que `HashMap` mantenha ordem de inserção.
- Usar chave sem normalizar quando o enunciado exige equivalência.
- Escolher `ArrayList` para muitas consultas de presença.
- Usar `HashSet` quando é necessário guardar contagem ou outro valor.
- Alterar campos usados em `equals`/`hashCode` de objetos usados como chave.

<!-- ## Exercícios de fixação

1. Implemente `palavrasUnicas(String[] palavras)` retornando um `HashSet<String>`.
2. Implemente `contarOcorrencias(int[] valores)` retornando `HashMap<Integer, Integer>`.
3. Dado um array de matrículas, verifique se existe matrícula repetida.
4. Explique a diferença entre `contains` em `ArrayList` e `contains` em `HashSet`.
5. Monte um mapa de produto para quantidade em estoque e atualize três produtos.
6. Explique por que a ordem impressa por um `HashSet` não deve ser usada em testes.

## Exercício integrador

Implemente `RelatorioTexto`, que recebe uma string com palavras separadas por espaço e imprime:

- quantidade total de palavras;
- quantidade de palavras distintas;
- frequência de cada palavra normalizada;
- a palavra mais frequente.

Use `HashMap` para frequências e `HashSet` se quiser guardar palavras distintas explicitamente. -->

## Checklist de aprendizagem

- [ ] Sei usar `HashSet` para presença.
- [ ] Sei usar `HashMap` para associação chave-valor.
- [ ] Sei implementar contagem com `getOrDefault`.
- [ ] Sei decidir entre mapa, conjunto e lista.
- [ ] Sei explicar custo esperado de consultas em hash.
- [ ] Sei identificar cuidados de normalização.
