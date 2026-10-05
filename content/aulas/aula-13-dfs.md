# Aula 14 — DFS em matrizes e exploração recursiva

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- interpretar uma matriz como um espaço de posições navegáveis;
- implementar DFS recursiva para explorar uma região;
- validar limites, paredes e posições já visitadas;
- usar uma matriz `visitado` para evitar repetições;
- resolver busca de caminho, flood fill e contagem de regiões;
- justificar custo `O(linhas * colunas)`.

## Problema motivador

Considere um labirinto: `S` é a origem, `D` é o destino, `#` é uma parede e `.` é uma posição livre.

```text
S . # .
# . # .
# . . D
```

Queremos descobrir se existe um caminho de `S` até `D`. De uma posição livre, podemos tentar caminhar para cima, baixo, esquerda ou direita. A estratégia DFS escolhe uma direção, segue por ela enquanto puder e volta quando encontra um beco sem saída.

## Posições e vizinhos

Uma posição é dada por `(linha, coluna)`. Para uma célula `(l, c)`, os quatro vizinhos possíveis são:

```text
(l - 1, c)    cima
(l + 1, c)    baixo
(l, c - 1)    esquerda
(l, c + 1)    direita
```

Antes de visitar um vizinho, devemos verificar se ele está dentro da matriz, se não é parede e se ainda não foi visitado. Essa sequência de validações aparece em praticamente todos os problemas desta aula.

## DFS: aprofundar e voltar

DFS significa *depth-first search*, ou busca em profundidade. Em uma matriz, a chamada recursiva recebe a posição atual. Ela valida a posição, marca a célula e tenta explorar os quatro vizinhos.

```text
EXISTE-CAMINHO(lab, l, c, destinoL, destinoC, visitado)
    IF (l, c) está fora da matriz THEN
        RETURN FALSE
    IF lab[l][c] é parede OR visitado[l][c] THEN
        RETURN FALSE
    IF (l, c) = (destinoL, destinoC) THEN
        RETURN TRUE

    visitado[l][c] <- TRUE

    RETURN EXISTE-CAMINHO na posição acima
        OR EXISTE-CAMINHO na posição abaixo
        OR EXISTE-CAMINHO na posição à esquerda
        OR EXISTE-CAMINHO na posição à direita
```

Marcar a posição antes das chamadas recursivas é essencial. Sem isso, duas posições vizinhas livres poderiam chamar uma à outra repetidamente.

```java
public class CaminhoDFS {
    public static boolean existeCaminho(char[][] lab, int l, int c,
            int destinoL, int destinoC, boolean[][] visitado) {
        if (l < 0 || l >= lab.length || c < 0 || c >= lab[0].length) {
            return false;
        }
        if (lab[l][c] == '#' || visitado[l][c]) {
            return false;
        }
        if (l == destinoL && c == destinoC) {
            return true;
        }

        visitado[l][c] = true;

        return existeCaminho(lab, l - 1, c, destinoL, destinoC, visitado)
            || existeCaminho(lab, l + 1, c, destinoL, destinoC, visitado)
            || existeCaminho(lab, l, c - 1, destinoL, destinoC, visitado)
            || existeCaminho(lab, l, c + 1, destinoL, destinoC, visitado);
    }
}
```

## Simulação curta

Suponha que a ordem de tentativa seja cima, baixo, esquerda e direita. A primeira chamada começa em `S`; cada linha abaixo mostra a posição que está sendo explorada.

Para o labirinto:

```text
S . # .
# . # .
# . . D
```

```text
(0, 0) marca S
    (-1, 0) está fora: volta
    (1, 0) é parede: volta
    (0, -1) está fora: volta
    (0, 1) marca posição livre
        (-1, 1) está fora: volta
        (1, 1) marca posição livre
            (0, 1) já visitado: volta
            (2, 1) marca posição livre
                (1, 1) já visitado: volta
                (3, 1) está fora: volta
                (2, 0) é parede: volta
                (2, 2) marca posição livre
                    (1, 2) é parede: volta
                    (3, 2) está fora: volta
                    (2, 1) já visitado: volta
                    (2, 3) é D: encontrou
```

O retorno `TRUE` sobe pela pilha de chamadas. Se nenhuma direção chegasse ao destino, todas retornariam `FALSE` e a chamada inicial também retornaria `FALSE`.

<div id="dfs-visualizer" class="dfs-visualizer" data-dfs-visualizer>
  <div class="dfs-visualizer__heading">
    <h3>Visualizador passo a passo</h3>
    <p>Edite a matriz e execute a busca para acompanhar cada chamada, retorno e mudança na pilha.</p>
  </div>

  <div class="dfs-visualizer__input">
    <label class="dfs-visualizer__label" for="dfs-maze-input">Matriz do labirinto</label>
    <textarea id="dfs-maze-input" class="dfs-visualizer__textarea" rows="3" spellcheck="false" aria-describedby="dfs-maze-help">S . # .
# . # .
# . . D</textarea>
    <p id="dfs-maze-help" class="dfs-visualizer__help">Use S, D, # e .; os espaços são opcionais e todas as linhas devem ter o mesmo tamanho.</p>
    <p class="dfs-visualizer__error" data-dfs-role="error" role="alert" hidden></p>
  </div>

  <div class="dfs-visualizer__controls" role="group" aria-label="Controles do visualizador">
    <button type="button" class="button is-primary" data-dfs-action="execute">Executar</button>
    <button type="button" class="button" data-dfs-action="previous">Anterior</button>
    <button type="button" class="button" data-dfs-action="next">Próximo passo</button>
    <button type="button" class="button" data-dfs-action="play">Reproduzir</button>
    <button type="button" class="button" data-dfs-action="reset">Reiniciar</button>
  </div>

  <div class="dfs-visualizer__progress" aria-live="polite">
    <div class="dfs-visualizer__progress-heading">
      <span data-dfs-role="step-label">Antes do primeiro passo</span>
      <span data-dfs-role="status">Pronto para executar.</span>
    </div>
    <div class="dfs-visualizer__progress-track" role="progressbar" aria-label="Progresso da execução" aria-valuemin="0" aria-valuemax="0" aria-valuenow="0">
      <div class="dfs-visualizer__progress-bar" data-dfs-role="progress-bar"></div>
    </div>
  </div>

  <div class="dfs-visualizer__workspace">
    <section class="dfs-visualizer__panel" aria-labelledby="dfs-maze-heading">
      <div class="dfs-visualizer__panel-heading">
        <h4 id="dfs-maze-heading">Labirinto</h4>
        <span class="dfs-visualizer__counter" data-dfs-role="visited-counter">0 visitadas</span>
      </div>
      <div class="dfs-visualizer__grid" data-dfs-role="grid" role="grid" aria-label="Estado atual do labirinto"></div>
      <div class="dfs-visualizer__legend" aria-label="Legenda do labirinto">
        <span><i class="dfs-visualizer__legend-swatch is-start">S</i> origem</span>
        <span><i class="dfs-visualizer__legend-swatch is-destination">D</i> destino</span>
        <span><i class="dfs-visualizer__legend-swatch is-visited"></i> visitada</span>
        <span><i class="dfs-visualizer__legend-swatch is-current"></i> atual</span>
        <span><i class="dfs-visualizer__legend-swatch is-path"></i> caminho</span>
      </div>
    </section>

    <section class="dfs-visualizer__panel" aria-labelledby="dfs-stack-heading">
      <div class="dfs-visualizer__panel-heading">
        <h4 id="dfs-stack-heading">Pilha de chamadas</h4>
        <span class="dfs-visualizer__counter" data-dfs-role="stack-counter">0 chamadas</span>
      </div>
      <div class="dfs-visualizer__stack" data-dfs-role="stack" role="list" aria-label="Pilha de chamadas atual"></div>
      <p class="dfs-visualizer__empty" data-dfs-role="stack-empty">A pilha está vazia antes da execução.</p>
    </section>
  </div>

  <div class="dfs-visualizer__details">
    <section class="dfs-visualizer__panel" aria-labelledby="dfs-action-heading">
      <h4 id="dfs-action-heading">O que acontece agora?</h4>
      <p class="dfs-visualizer__action" data-dfs-role="action">Clique em “Próximo passo” para iniciar.</p>
      <p class="dfs-visualizer__code-line" data-dfs-role="code-line">Nenhuma linha executada.</p>
    </section>

    <section class="dfs-visualizer__panel dfs-visualizer__code-panel" aria-labelledby="dfs-code-heading">
      <h4 id="dfs-code-heading">Pseudocódigo em execução</h4>
      <ol class="dfs-visualizer__code" aria-label="Pseudocódigo da busca DFS">
        <li data-dfs-code-line="1">Se estiver fora da matriz, retorna FALSE</li>
        <li data-dfs-code-line="2">Se for parede ou já visitada, retorna FALSE</li>
        <li data-dfs-code-line="3">Se for o destino, retorna TRUE</li>
        <li data-dfs-code-line="4">Marca a posição como visitada</li>
        <li data-dfs-code-line="5">Tenta o vizinho de cima</li>
        <li data-dfs-code-line="6">Tenta o vizinho de baixo</li>
        <li data-dfs-code-line="7">Tenta o vizinho da esquerda</li>
        <li data-dfs-code-line="8">Tenta o vizinho da direita</li>
        <li data-dfs-code-line="9">Retorna FALSE</li>
        <li data-dfs-code-line="10">Retorna TRUE</li>
      </ol>
    </section>
  </div>

  <p class="dfs-visualizer__result" data-dfs-role="result" aria-live="polite">Ainda não há resultado.</p>
</div>

## Flood fill

Flood fill substitui uma região inteira de uma cor por outra. A estrutura é a mesma da DFS: validar, modificar a posição atual e explorar os quatro vizinhos.

```text
PREENCHER(tela, l, c, original, nova)
    IF original = nova OR (l, c) está fora da matriz THEN
        RETURN
    IF tela[l][c] != original THEN
        RETURN

    tela[l][c] <- nova
    PREENCHER(tela, l - 1, c, original, nova)
    PREENCHER(tela, l + 1, c, original, nova)
    PREENCHER(tela, l, c - 1, original, nova)
    PREENCHER(tela, l, c + 1, original, nova)
```

```java
public static void preencher(char[][] tela, int l, int c,
        char original, char nova) {
    if (original == nova || l < 0 || l >= tela.length
            || c < 0 || c >= tela[0].length || tela[l][c] != original) {
        return;
    }

    tela[l][c] = nova;
    preencher(tela, l - 1, c, original, nova);
    preencher(tela, l + 1, c, original, nova);
    preencher(tela, l, c - 1, original, nova);
    preencher(tela, l, c + 1, original, nova);
}
```

Neste caso, a própria troca de cor impede visitas repetidas. A condição `original == nova` evita uma recursão inútil: depois de trocar a primeira célula, ela continuaria tendo a mesma cor procurada.

Esse é o mesmo padrão usado em programas de pintura: a cor da célula inicial é a que será substituída, e a cor nova é a que será aplicada.

## Contagem de regiões

Uma região é um conjunto de células livres conectadas pelas quatro direções. Para contar regiões, percorremos toda a matriz. Sempre que encontramos uma célula livre ainda não visitada, iniciamos uma DFS e aumentamos o contador uma vez.

```text
CONTAR-REGIOES(mapa)
    visitado <- matriz de FALSE
    total <- 0

    PARA CADA posição (l, c) DA matriz
        IF mapa[l][c] é livre AND NOT visitado[l][c] THEN
            MARCAR-REGIAO(mapa, l, c, visitado)
            total <- total + 1

    RETURN total
```

`MARCAR-REGIAO` usa o mesmo padrão de validação da busca de caminho, mas não precisa retornar `TRUE` ou `FALSE`: seu objetivo é apenas marcar todas as células alcançáveis.

## DFS e pilha de chamadas

A recursão usa a pilha de chamadas da linguagem. Enquanto uma direção está sendo explorada, as posições anteriores ficam pendentes. Quando a exploração termina, a execução volta à última posição que ainda tinha outra direção para tentar.

Essa é a razão do nome “em profundidade”: uma sequência de chamadas avança por um caminho antes de voltar para tentar alternativas.

## Análise informal de custo

Com uma matriz `visitado`, cada célula livre é processada no máximo uma vez. Para cada célula, examinamos no máximo quatro direções. Portanto, para uma matriz com `linhas` e `colunas`, o tempo é `O(linhas * colunas)`.

A matriz `visitado` também ocupa `O(linhas * colunas)`. A pilha de chamadas pode crescer conforme o tamanho de uma região explorada.

## Erros comuns

- Acessar a matriz antes de conferir limites.
- Marcar `visitado` depois das chamadas recursivas.
- Confundir linha e coluna ao gerar vizinhos.
- Permitir movimentos diagonais quando o contrato permite apenas quatro direções.
- Esquecer de tratar parede, origem inválida ou destino inválido.
- No flood fill, iniciar quando `original` e `nova` são iguais.

<!-- ## Exercícios de fixação

1. Simule DFS em uma matriz pequena.
2. Liste os vizinhos válidos de uma posição próxima a uma borda.
3. Implemente existência de caminho.
4. Implemente flood fill.
5. Conte regiões livres.
6. Teste matriz vazia e origem igual ao destino.

## Exercício integrador

Implemente uma classe `ExploracaoMatriz` com métodos para caminho, preenchimento e contagem de regiões. -->

## Checklist de aprendizagem

- [ ] Sei gerar os quatro vizinhos de uma posição.
- [ ] Sei validar limites, parede e visitado.
- [ ] Sei implementar DFS recursiva em matriz.
- [ ] Sei explicar o papel de `visitado`.
- [ ] Sei aplicar DFS a caminho, preenchimento e regiões.
- [ ] Sei justificar custo `O(linhas * colunas)`.
