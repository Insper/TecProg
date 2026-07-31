# Aula 17 — Introdução ao backtracking

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- explicar backtracking como exploração de árvore de decisões;
- identificar estado parcial, candidatos, caso base e resposta;
- implementar geração de subconjuntos;
- usar o padrão escolher, avançar e desfazer;
- diferenciar backtracking de DFS em grafos;
- justificar custo exponencial em exemplos simples.

<!-- ## Pré-requisitos

Você deve conhecer recursão, listas, arrays e DFS. Backtracking se parece com DFS porque explora profundamente, mas o grafo agora é uma árvore de escolhas construída pelo próprio algoritmo. -->

## Problema motivador

Dado o vetor `{1, 2, 3}`, queremos gerar todos os subconjuntos:

```text
{}
{1}
{2}
{3}
{1, 2}
{1, 3}
{2, 3}
{1, 2, 3}
```

Para cada elemento, há duas decisões: incluir ou não incluir. O algoritmo percorre essa árvore de decisões e registra cada solução completa.

## Componentes do backtracking

Um algoritmo de backtracking normalmente tem:

- estado parcial: escolhas feitas até agora;
- posição ou etapa: qual decisão está sendo tomada;
- candidatos: escolhas possíveis neste ponto;
- caso base: quando a solução está completa;
- resposta: onde armazenar ou contar soluções;
- desfazer: remover a escolha antes de tentar outra.

O desfazer é o detalhe que mais causa bugs. Ele garante que uma escolha feita em um ramo não vaze para o próximo.

```text
BUSCAR(estado)
    IF estado é uma solução completa THEN
        REGISTRAR uma cópia da solução
        RETURN

    FOR CADA candidato válido DO
        FAZER a escolha no estado
        BUSCAR(estado)
        DESFAZER a escolha no estado
```

O estado é compartilhado entre chamadas de um mesmo caminho. Por isso registrar a resposta e desfazer a escolha são etapas diferentes: a resposta precisa ser uma cópia; o estado parcial continua mutável.

## Exemplo: subconjuntos

```text
GERAR-SUBCONJUNTOS(v, i, atual, respostas)
    IF i = TAMANHO(v) THEN
        ADICIONAR-COPIA(respostas, atual)
        RETURN

    GERAR-SUBCONJUNTOS(v, i + 1, atual, respostas)

    ADICIONAR(atual, v[i])
    GERAR-SUBCONJUNTOS(v, i + 1, atual, respostas)
    REMOVER-ULTIMO(atual)
```

O primeiro ramo decide não incluir `v[i]`; o segundo inclui. Apenas o segundo precisa desfazer uma alteração, pois o primeiro não modificou `atual`.

```java
import java.util.ArrayList;
import java.util.List;

public class Subconjuntos {
    public static List<List<Integer>> gerar(int[] v) {
        List<List<Integer>> respostas = new ArrayList<>();
        gerar(v, 0, new ArrayList<>(), respostas);
        return respostas;
    }

    private static void gerar(int[] v, int i, List<Integer> atual,
            List<List<Integer>> respostas) {
        if (i == v.length) {
            respostas.add(new ArrayList<>(atual));
            return;
        }

        gerar(v, i + 1, atual, respostas);

        atual.add(v[i]);
        gerar(v, i + 1, atual, respostas);
        atual.remove(atual.size() - 1);
    }

    public static void main(String[] args) {
        System.out.println(gerar(new int[] {1, 2, 3}));
    }
}
```

No caso base, usamos `new ArrayList<>(atual)`. Isso cria uma cópia da solução. Se adicionássemos `atual` diretamente, todas as respostas apontariam para a mesma lista mutável.

## Simulação da árvore

Para cada índice, temos duas escolhas:

```text
i = 0: não incluir 1 / incluir 1
i = 1: não incluir 2 / incluir 2
i = 2: não incluir 3 / incluir 3
```

Com três elementos, existem `2 * 2 * 2 = 8` folhas. Cada folha corresponde a um subconjunto.

## Escolher, avançar, desfazer

O padrão aparece nesta parte:

```java
atual.add(v[i]);
gerar(v, i + 1, atual, respostas);
atual.remove(atual.size() - 1);
```

Em uma execução para `{1, 2}`, o estado muda e volta assim:

```text
[] -> escolhe 1 -> [1] -> escolhe 2 -> [1, 2]
[] <- desfaz 1   <- [1]  <- desfaz 2
```

A escolha é adicionar `v[i]`. Avançar é chamar a recursão para `i + 1`. Desfazer é remover o último elemento. Sem essa remoção, o próximo ramo começaria com elementos indevidos.

## Backtracking e DFS

DFS em grafos percorre estados já definidos: vértices e arestas existem antes do algoritmo. Backtracking gera estados a partir de decisões. O estado parcial pode ser uma lista, um vetor booleano, uma soma acumulada, uma configuração de tabuleiro ou qualquer estrutura que represente escolhas feitas.

Ambos usam exploração profunda, mas backtracking costuma estar associado a problemas combinatórios: subconjuntos, permutações, combinações, escalas, caminhos simples e escolhas sob restrições.

## Perguntas de modelagem

Antes de programar, responda:

1. Qual é a unidade de decisão?
2. O que representa uma solução parcial?
3. Quando a solução está completa?
4. Quais escolhas são possíveis em cada etapa?
5. Preciso guardar todas as soluções ou apenas contar/encontrar uma?
6. Há restrições que posso verificar antes de continuar?

No exemplo de subconjuntos, a unidade de decisão é o elemento na posição `i`. A solução parcial é a lista `atual`. A solução está completa quando todos os elementos foram considerados. As escolhas são incluir ou não incluir.

Em problemas futuros, essas respostas mudam. Em permutações, a unidade de decisão é a próxima posição da resposta. Em mochila, a unidade é decidir se um item entra ou não, mas existe uma restrição de capacidade.

## Encontrar uma solução ou todas?

O código de subconjuntos guarda todas as respostas. Mas nem todo problema precisa disso. Se o enunciado pede "existe uma solução?", o método pode retornar `boolean` e parar quando encontra a primeira solução válida. Se pede "qual é a melhor?", talvez seja necessário manter uma melhor resposta global ou retornada pelas chamadas.

Essa decisão afeta custo e implementação. Gerar todas as soluções pode ser inevitavelmente caro. Parar cedo pode economizar muito em algumas entradas, embora o pior caso ainda possa ser grande.

## Análise informal de custo

Para subconjuntos de `n` elementos, cada elemento gera duas escolhas. O número de soluções é `2^n`. Só imprimir todas as soluções já custa exponencial. Portanto, o tempo é pelo menos proporcional ao número de soluções geradas.

A profundidade da recursão é `n`, e a lista parcial pode ter até `n` elementos.

## Erros comuns

- Esquecer de desfazer a escolha.
- Guardar a lista parcial sem copiar.
- Confundir índice atual com valor do elemento.
- Criar caso base que registra solução cedo demais.
- Usar backtracking para problema que BFS ou hash resolveria melhor.
- Não perceber crescimento exponencial.

<!-- ## Exercícios de fixação

1. Simule a árvore de subconjuntos para `{4, 5}`.
2. Modifique o código para imprimir em vez de retornar lista.
3. Gere apenas subconjuntos não vazios.
4. Conte quantos subconjuntos foram gerados.
5. Explique por que a cópia da lista é necessária.
6. Identifique o estado parcial e o caso base do exemplo.

## Exercício integrador

Implemente um método que gera todos os subconjuntos de um vetor e retorna apenas aqueles cuja soma é par. Primeiro gere todos e filtre no caso base; depois explique que tipo de poda poderia evitar parte do trabalho. -->

## Checklist de aprendizagem

- [ ] Sei explicar árvore de decisões.
- [ ] Sei implementar subconjuntos.
- [ ] Sei aplicar escolher, avançar e desfazer.
- [ ] Sei copiar soluções mutáveis.
- [ ] Sei diferenciar DFS e backtracking.
- [ ] Sei reconhecer custo exponencial.
