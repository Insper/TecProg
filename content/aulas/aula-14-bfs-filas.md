# Aula 15 — BFS em matrizes e uso de filas

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar BFS como exploração por camadas em uma matriz;
- usar `ArrayDeque` como fila de coordenadas;
- calcular o menor número de movimentos em um labirinto sem pesos;
- marcar uma posição quando ela entra na fila;
- reconstruir um caminho usando predecessores;
- comparar DFS e BFS em problemas de matriz.

## Problema motivador

No labirinto abaixo, queremos ir de `S` até `D` usando o menor número possível de movimentos para cima, baixo, esquerda ou direita.

```text
S . . #
# # . #
. . . D
```

DFS pode encontrar um caminho, mas pode seguir primeiro uma rota longa. BFS, *breadth-first search* ou busca em largura, examina primeiro todas as posições a um movimento da origem, depois todas as posições a dois movimentos e assim por diante. Por isso é a técnica adequada para menor número de passos quando todos os movimentos têm o mesmo custo.

## DFS com pilha

Podemos implementar DFS com uma pilha de coordenadas ao invés de recursão. A cada passo, retiramos a posição do topo da pilha e empilhamos as posições vizinhas ainda não visitadas.

```text
DFS(lab, origem, destino)
    pilha <- PILHA-VAZIA()
    MARCAR(origem)
    EMPILHAR(pilha, origem)
    WHILE NOT VAZIA(pilha) DO
        atual <- DESEMPILHAR(pilha)
        IF atual = destino THEN
            RETURN

        PARA CADA vizinho nas quatro direções DE atual
            IF vizinho é válido, livre e não visitado THEN
                MARCAR(vizinho)
                EMPILHAR(pilha, vizinho)
```

## A fila organiza as camadas

E se usássemos uma fila em vez de uma pilha? A cada passo, retiramos a posição da frente da fila e enfileiramos as posições vizinhas ainda não visitadas.

A fila sempre remove a posição descoberta há mais tempo e adiciona novas posições no final. Assim, posições da distância `0` são processadas antes das de distância `1`, que são processadas antes das de distância `2`.

```text
MENOR-DISTANCIA(lab, origem, destino)
    dist <- matriz preenchida com -1
    fila <- FILA-VAZIA()
    dist[origem] <- 0
    ENFILEIRAR(fila, origem)

    WHILE NOT VAZIA(fila) DO
        atual <- DESENFILEIRAR(fila)
        IF atual = destino THEN
            RETURN dist[atual]

        PARA CADA vizinho nas quatro direções DE atual
            IF vizinho é válido, livre e dist[vizinho] = -1 THEN
                dist[vizinho] <- dist[atual] + 1
                ENFILEIRAR(fila, vizinho)

    RETURN -1
```

A primeira atribuição em `dist[vizinho]` é também a marcação de visitado. Ela ocorre antes de enfileirar a posição; desse modo, outro caminho da mesma camada não a coloca na fila novamente.

## Simulação da fila

Com origem em `(0, 0)`, uma execução possível começa assim:

```text
fila: [(0, 0)]                    dist(0, 0) = 0
remove (0, 0), entra (0, 1)       fila: [(0, 1)]
remove (0, 1), entra (0, 2)       fila: [(0, 2)]
remove (0, 2), entra (1, 2)       fila: [(1, 2)]
```

As paredes e posições já descobertas não entram na fila. A ordem dos quatro movimentos pode mudar o caminho reconstruído quando há empates, mas não muda a distância mínima encontrada.

## Implementação em Java

O exemplo usa uma matriz de distâncias. Cada elemento da fila guarda uma coordenada `int[]` com linha e coluna.

```java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class LabirintoBFS {
    public static int menorDistancia(char[][] lab, int li, int ci, int lf, int cf) {
        if (lab == null || lab.length == 0 || lab[0].length == 0) {
            return -1;
        }

        int linhas = lab.length;
        int colunas = lab[0].length;
        if (!livre(lab, li, ci) || !livre(lab, lf, cf)) {
            return -1;
        }

        int[][] dist = new int[linhas][colunas];
        for (int[] linha : dist) {
            Arrays.fill(linha, -1);
        }

        int[] dl = {-1, 1, 0, 0};
        int[] dc = {0, 0, -1, 1};
        Deque<int[]> fila = new ArrayDeque<>();
        dist[li][ci] = 0;
        fila.addLast(new int[] {li, ci});

        while (!fila.isEmpty()) {
            int[] atual = fila.removeFirst();
            int l = atual[0];
            int c = atual[1];

            if (l == lf && c == cf) {
                return dist[l][c];
            }

            for (int k = 0; k < 4; k++) {
                int nl = l + dl[k];
                int nc = c + dc[k];
                if (livre(lab, nl, nc) && dist[nl][nc] == -1) {
                    dist[nl][nc] = dist[l][c] + 1;
                    fila.addLast(new int[] {nl, nc});
                }
            }
        }

        return -1;
    }

    private static boolean livre(char[][] lab, int l, int c) {
        return l >= 0 && l < lab.length && c >= 0 && c < lab[0].length
            && lab[l][c] != '#';
    }
}
```

## Reconstrução de caminho

Além da distância, podemos guardar de onde cada posição foi descoberta. Uma matriz `predL` guarda a linha anterior e `predC` guarda a coluna anterior. Quando descobrimos `(nl, nc)` a partir de `(l, c)`, registramos:

```text
predL[nl][nc] <- l
predC[nl][nc] <- c
```

Depois de chegar ao destino, começamos nele e seguimos os predecessores até a origem:

```text
(2, 3) <- (2, 2) <- (1, 2) <- (0, 2) <- (0, 1) <- (0, 0)
```

Esse trajeto está de trás para frente. Para apresentá-lo ao usuário, guardamos as coordenadas em uma lista ou pilha e invertemos a ordem no final.

## DFS ou BFS em uma matriz?

Use DFS quando a pergunta pede explorar uma região, encontrar algum caminho ou preencher posições conectadas. Use BFS quando a pergunta pede a menor quantidade de movimentos e todos os movimentos têm o mesmo custo.

```text
Existe um caminho?                 DFS ou BFS
Pintar a região conectada?         DFS ou BFS
Contar regiões livres?             DFS ou BFS
Menor número de movimentos?        BFS
Movimentos com custos diferentes?  BFS simples não basta
```

O ponto central não é que DFS seja incorreta para caminhos: ela só não oferece a garantia de encontrar primeiro o caminho mais curto.

## Análise informal de custo

Cada célula livre entra na fila no máximo uma vez e, quando é removida, examinamos no máximo quatro direções. Em uma matriz de `linhas` por `colunas`, o tempo é `O(linhas * colunas)`.

As matrizes `dist` e de predecessores, além da fila, podem ocupar `O(linhas * colunas)`.

## Erros comuns

- Usar pilha no lugar de fila.
- Marcar `dist` apenas ao remover da fila, permitindo duplicatas.
- Esquecer de validar origem, destino e limites.
- Tratar parede como posição navegável.
- Reconstruir caminho quando o destino tem distância `-1`.
- Usar BFS simples quando movimentos têm custos diferentes.

<!-- ## Exercícios de fixação

1. Simule a fila em um labirinto.
2. Complete uma matriz de distâncias.
3. Reconstrua um caminho por predecessores.
4. Escreva BFS para menor distância.
5. Explique a garantia de menor caminho.
6. Identifique limitações de BFS simples.

## Exercício integrador

Implemente um analisador de labirintos com menor distância e reconstrução de caminho. -->

## Checklist de aprendizagem

- [ ] Sei usar uma fila de coordenadas.
- [ ] Sei marcar uma posição ao enfileirá-la.
- [ ] Sei preencher distâncias por camadas.
- [ ] Sei justificar menor número de movimentos.
- [ ] Sei reconstruir caminho com predecessores.
- [ ] Sei escolher DFS ou BFS em uma matriz.
