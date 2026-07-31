# Aula 16 — Introdução a grafos: representação, DFS e BFS

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar vértices, arestas, vizinhos, caminhos e componentes;
- representar um grafo por lista de adjacência;
- distinguir grafos direcionados e não direcionados;
- aplicar DFS para alcance e componentes conectadas;
- aplicar BFS para distâncias mínimas em grafo sem pesos;
- relacionar listas de adjacência com as matrizes das aulas anteriores.

## Problema motivador

Nas aulas anteriores, exploramos posições de um labirinto. Agora imagine salas conectadas por portas, pessoas ligadas por amizades ou tarefas ligadas por dependências. Em todos esses casos há itens e conexões entre itens.

Um **grafo** é uma forma de modelar esse tipo de situação:

- cada item é um **vértice**;
- cada conexão é uma **aresta**;
- os itens diretamente conectados são **vizinhos**;
- uma sequência de conexões forma um **caminho**.

As estratégias DFS e BFS não mudam. A mudança é como obtemos os vizinhos: no labirinto, calculávamos quatro coordenadas; agora vamos consultar uma lista pronta.

## Lista de adjacência

Uma lista de adjacência guarda, para cada vértice, a lista de seus vizinhos. O grafo não direcionado abaixo possui uma aresta entre `0` e `1`, outra entre `0` e `2` e assim por diante.

```text
0: [1, 2]
1: [0, 3]
2: [0, 3]
3: [1, 2, 4]
4: [3]
```

Em um grafo não direcionado, uma conexão `a - b` aparece nas duas listas. Em um grafo direcionado, uma conexão `a -> b` aparece apenas em `adj[a]`.

```text
CRIAR-GRAFO(n)
    adj <- lista com n listas vazias
    RETURN adj

ADICIONAR-ARESTA-NAO-DIRECIONADA(adj, a, b)
    ADICIONAR adj[a], b
    ADICIONAR adj[b], a

ADICIONAR-ARESTA-DIRECIONADA(adj, a, b)
    ADICIONAR adj[a], b
```

```java
import java.util.ArrayList;

public class Grafo {
    private final ArrayList<ArrayList<Integer>> adj;

    public Grafo(int n) {
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
    }

    public void adicionarAresta(int a, int b) {
        adj.get(a).add(b);
        adj.get(b).add(a);
    }

    public ArrayList<Integer> vizinhosDe(int v) {
        return adj.get(v);
    }
}
```

## DFS em lista de adjacência

Para saber se há caminho entre dois vértices, DFS recebe o vértice atual, o destino e o vetor `visitado`. A marcação evita voltar indefinidamente por uma aresta já usada no sentido contrário.

```text
EXISTE-CAMINHO(adj, atual, destino, visitado)
    IF atual = destino THEN
        RETURN TRUE

    visitado[atual] <- TRUE
    FOR CADA vizinho EM adj[atual]
        IF NOT visitado[vizinho] THEN
            IF EXISTE-CAMINHO(adj, vizinho, destino, visitado) THEN
                RETURN TRUE

    RETURN FALSE
```

```java
public static boolean existeCaminho(ArrayList<ArrayList<Integer>> adj,
        int atual, int destino, boolean[] visitado) {
    if (atual == destino) {
        return true;
    }

    visitado[atual] = true;
    for (int vizinho : adj.get(atual)) {
        if (!visitado[vizinho]
                && existeCaminho(adj, vizinho, destino, visitado)) {
            return true;
        }
    }
    return false;
}
```

## Componentes conectadas

Uma componente conectada é um grupo de vértices entre os quais há caminhos. Para contá-las, percorremos todos os vértices. Sempre que encontramos um ainda não visitado, uma DFS marca toda a sua componente e o contador aumenta uma vez.

```text
CONTAR-COMPONENTES(adj)
    visitado <- vetor de FALSE
    componentes <- 0

    FOR v <- 0 TO TAMANHO(adj) - 1
        IF NOT visitado[v] THEN
            MARCAR-COMPONENTE(adj, v, visitado)
            componentes <- componentes + 1

    RETURN componentes
```

## BFS em lista de adjacência

BFS também funciona sem mudança de ideia. A fila guarda vértices em vez de coordenadas; `dist[v]` registra a menor quantidade de arestas da origem até `v`.

```text
DISTANCIAS-BFS(adj, origem)
    dist <- vetor preenchido com -1
    fila <- FILA-VAZIA()
    dist[origem] <- 0
    ENFILEIRAR(fila, origem)

    WHILE NOT VAZIA(fila) DO
        atual <- DESENFILEIRAR(fila)
        FOR CADA vizinho EM adj[atual]
            IF dist[vizinho] = -1 THEN
                dist[vizinho] <- dist[atual] + 1
                ENFILEIRAR(fila, vizinho)

    RETURN dist
```

```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public static int[] distanciasBfs(ArrayList<ArrayList<Integer>> adj, int origem) {
    int[] dist = new int[adj.size()];
    Arrays.fill(dist, -1);
    Deque<Integer> fila = new ArrayDeque<>();

    dist[origem] = 0;
    fila.addLast(origem);

    while (!fila.isEmpty()) {
        int atual = fila.removeFirst();
        for (int vizinho : adj.get(atual)) {
            if (dist[vizinho] == -1) {
                dist[vizinho] = dist[atual] + 1;
                fila.addLast(vizinho);
            }
        }
    }
    return dist;
}
```

Em um grafo sem pesos, a primeira distância registrada para um vértice é mínima pelo mesmo motivo que no labirinto: a fila processa uma camada inteira antes da próxima.

## Matrizes e grafos: a mesma abstração

Agora podemos nomear o que já fazíamos:

| Situação | Vértice | Como obter vizinhos |
| --- | --- | --- |
| Labirinto | uma célula livre | quatro coordenadas adjacentes válidas |
| Mapa de salas | uma sala | lista de portas da sala |
| Rede de pessoas | uma pessoa | lista de conexões da pessoa |

No labirinto, as conexões são calculadas quando necessárias; por isso dizemos que a representação é implícita. Na lista de adjacência, as conexões já estão guardadas de forma explícita.

## Análise informal de custo

Com lista de adjacência, DFS e BFS visitam cada vértice no máximo uma vez e examinam as conexões presentes nas listas. O custo é `O(V + E)`, em que `V` é o número de vértices e `E` o número de arestas.

A memória adicional inclui `visitado` ou `dist` e a fila da BFS, todos proporcionais ao número de vértices.

## Erros comuns

- Em grafo não direcionado, adicionar a conexão em apenas uma das listas.
- Esquecer `visitado` na DFS.
- Marcar um vértice depois de enfileirá-lo, permitindo duplicatas na BFS.
- Confundir identificador de vértice com um valor guardado nele.
- Esperar que DFS encontre o menor caminho.
- Usar BFS simples quando as arestas têm custos diferentes.

<!-- ## Exercícios de fixação

1. Simule DFS em uma lista de adjacência.
2. Monte listas para grafos direcionados e não direcionados.
3. Escreva alcance com DFS.
4. Conte componentes.
5. Simule BFS e distâncias.
6. Compare lista explícita e matriz implícita.

## Exercício integrador

Implemente uma classe de grafo com alcance, componentes e distâncias BFS. -->

## Checklist de aprendizagem

- [ ] Sei explicar vértices, arestas e vizinhos.
- [ ] Sei montar uma lista de adjacência.
- [ ] Sei diferenciar grafo direcionado e não direcionado.
- [ ] Sei aplicar DFS para alcance e componentes.
- [ ] Sei aplicar BFS para distâncias mínimas sem pesos.
- [ ] Sei relacionar matriz e lista de adjacência.
