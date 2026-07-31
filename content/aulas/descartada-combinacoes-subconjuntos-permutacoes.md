# Aula 18 — Combinações, subconjuntos e permutações

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- diferenciar subconjuntos, combinações e permutações;
- implementar subconjuntos de tamanho `k`;
- implementar combinações usando índice inicial;
- implementar permutações usando vetor `usado`;
- decidir quando usar índice `i` e quando usar `usado[]`;
- evitar erros com estruturas mutáveis em respostas.

<!-- ## Pré-requisitos

Você deve conhecer o template básico de backtracking: caso base, estado parcial, candidatos, escolher, avançar e desfazer. -->

## Problema motivador

Em uma feira de projetos, precisamos montar grupos e ordens de apresentação:

- todos os subconjuntos de alunos representam qualquer grupo possível;
- combinações de tamanho `k` representam grupos com exatamente `k` alunos;
- permutações representam ordens possíveis de apresentação.

As três tarefas usam backtracking, mas o estado e os candidatos mudam.

## Subconjuntos

No padrão de subconjuntos, cada elemento tem duas decisões: entra ou não entra.

```text
SUBCONJUNTOS(v, i, atual)
    IF i = TAMANHO(v) THEN
        IMPRIMIR atual
        RETURN

    SUBCONJUNTOS(v, i + 1, atual)
    ADICIONAR(atual, v[i])
    SUBCONJUNTOS(v, i + 1, atual)
    REMOVER-ULTIMO(atual)
```

```java
private static void subconjuntos(int[] v, int i, List<Integer> atual) {
    if (i == v.length) {
        System.out.println(atual);
        return;
    }

    subconjuntos(v, i + 1, atual);

    atual.add(v[i]);
    subconjuntos(v, i + 1, atual);
    atual.remove(atual.size() - 1);
}
```

O índice `i` anda uma posição por vez. Cada elemento é considerado uma única vez.

## Subconjuntos de tamanho k

Para gerar apenas soluções com `k` elementos, filtramos no caso base:

```text
SUBCONJUNTOS-K(v, i, k, atual)
    IF TAMANHO(atual) > k THEN
        RETURN
    IF i = TAMANHO(v) THEN
        IF TAMANHO(atual) = k THEN
            IMPRIMIR atual
        RETURN

    NÃO incluir v[i]
    incluir v[i], avançar e desfazer
```

```java
private static void subconjuntosK(int[] v, int i, int k, List<Integer> atual) {
    if (i == v.length) {
        if (atual.size() == k) {
            System.out.println(atual);
        }
        return;
    }

    subconjuntosK(v, i + 1, k, atual);

    atual.add(v[i]);
    subconjuntosK(v, i + 1, k, atual);
    atual.remove(atual.size() - 1);
}
```

Uma melhoria simples é parar quando `atual.size() > k`, pois essa solução parcial já não pode voltar a ter tamanho `k`.

## Combinações

Combinações de tamanho `k` podem ser geradas escolhendo próximos candidatos a partir de uma posição inicial:

```text
COMBINAR(v, k, inicio, atual)
    IF TAMANHO(atual) = k THEN
        IMPRIMIR atual
        RETURN

    FOR i <- inicio TO TAMANHO(v) - 1
        ADICIONAR(atual, v[i])
        COMBINAR(v, k, i + 1, atual)
        REMOVER-ULTIMO(atual)
```

O próximo chamado começa em `i + 1`. Essa regra impede que a mesma seleção apareça em outra ordem.

```java
import java.util.ArrayList;
import java.util.List;

public class Combinacoes {
    public static void combinar(int[] v, int k) {
        combinar(v, k, 0, new ArrayList<>());
    }

    private static void combinar(int[] v, int k, int inicio, List<Integer> atual) {
        if (atual.size() == k) {
            System.out.println(atual);
            return;
        }

        for (int i = inicio; i < v.length; i++) {
            atual.add(v[i]);
            combinar(v, k, i + 1, atual);
            atual.remove(atual.size() - 1);
        }
    }
}
```

O parâmetro `inicio` evita repetir combinações em ordens diferentes. `{1, 2}` aparece, mas `{2, 1}` não.

## Permutações

Em permutações, a ordem importa. A cada posição da resposta, podemos escolher qualquer elemento ainda não usado.

```text
PERMUTAR(v, usado, atual)
    IF TAMANHO(atual) = TAMANHO(v) THEN
        IMPRIMIR atual
        RETURN

    FOR i <- 0 TO TAMANHO(v) - 1
        IF NOT usado[i] THEN
            usado[i] <- TRUE
            ADICIONAR(atual, v[i])
            PERMUTAR(v, usado, atual)
            REMOVER-ULTIMO(atual)
            usado[i] <- FALSE
```

Enquanto combinações avançam um índice, permutações voltam a oferecer todos os índices ainda livres em cada nível da árvore.

```java
public static void permutar(int[] v) {
    permutar(v, new boolean[v.length], new ArrayList<>());
}

private static void permutar(int[] v, boolean[] usado, List<Integer> atual) {
    if (atual.size() == v.length) {
        System.out.println(atual);
        return;
    }

    for (int i = 0; i < v.length; i++) {
        if (!usado[i]) {
            usado[i] = true;
            atual.add(v[i]);

            permutar(v, usado, atual);

            atual.remove(atual.size() - 1);
            usado[i] = false;
        }
    }
}
```

Aqui não usamos `inicio`, porque um elemento de índice maior pode aparecer antes de um elemento de índice menor. O controle é feito por `usado[]`.

## Quando usar cada estado?

Use índice `i` quando cada elemento é considerado uma vez em ordem fixa: incluir ou não incluir.

Use `inicio` quando deseja combinações sem repetir ordem.

Use `usado[]` quando a posição da solução importa e os elementos podem aparecer em várias ordens.

## Copiando respostas

Quando o objetivo é retornar uma lista de soluções, não armazene `atual` diretamente. A lista parcial será modificada pelo desfazer. O correto é copiar:

```java
respostas.add(new ArrayList<>(atual));
```

Esse detalhe vale para subconjuntos, combinações e permutações. O estado parcial é uma ferramenta de exploração; a resposta registrada precisa ser uma fotografia daquele momento.

## Podas simples

Mesmo em geração combinatória, algumas podas são naturais. Para combinações de tamanho `k`, se `atual.size() == k`, registramos e paramos. Se faltam poucos elementos e não há como completar `k`, também podemos parar:

```java
int restantes = v.length - inicio;
int faltam = k - atual.size();
if (restantes < faltam) {
    return;
}
```

Essa poda não muda o conjunto de respostas. Ela apenas evita chamadas que não poderiam completar uma combinação válida.

## Duplicatas na entrada

Os exemplos desta aula assumem elementos distintos. Se a entrada tiver repetidos, como `{1, 1, 2}`, é preciso definir o contrato: os dois `1` representam itens diferentes ou valores iguais que não devem gerar respostas duplicadas? Essa decisão muda o algoritmo. Uma estratégia comum é ordenar a entrada e pular candidatos repetidos no mesmo nível da árvore, mas isso fica como extensão.

## Análise informal de custo

Subconjuntos: `2^n` possibilidades.

Combinações de tamanho `k`: menos que `2^n`, mas ainda pode ser grande. O número depende de `n` e `k`.

Permutações: `n!` possibilidades. Cresce muito rápido. Para `n = 5`, são `120`; para `n = 10`, são `3.628.800`.

Gerar todas as respostas já domina o custo.

## Erros comuns

- Usar `inicio` em permutação e perder ordens válidas.
- Esquecer de voltar `usado[i] = false`.
- Remover o elemento errado da lista parcial.
- Adicionar `atual` à resposta sem copiar.
- Gerar combinações duplicadas.
- Subestimar o custo de `n!`.

<!-- ## Exercícios de fixação

1. Liste todas as combinações de tamanho 2 de `{1, 2, 3}`.
2. Liste todas as permutações de `{1, 2, 3}`.
3. Implemente subconjuntos de tamanho `k`.
4. Modifique combinações para guardar respostas em uma lista.
5. Explique por que permutação usa `usado[]`.
6. Compare quantidade de respostas entre subconjuntos e permutações.

## Exercício integrador

Implemente uma classe `GeradorCombinatorio` com três métodos públicos: `subconjuntos`, `combinacoesK` e `permutacoes`. Todos devem retornar listas de listas e copiar a solução no caso base. -->

## Checklist de aprendizagem

- [ ] Sei diferenciar subconjuntos, combinações e permutações.
- [ ] Sei usar índice `i`.
- [ ] Sei usar parâmetro `inicio`.
- [ ] Sei usar vetor `usado`.
- [ ] Sei copiar soluções mutáveis.
- [ ] Sei comparar custos exponencial e fatorial.
