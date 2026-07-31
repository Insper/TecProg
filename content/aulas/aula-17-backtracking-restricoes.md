# Aula 19 — Backtracking com restrições

## Objetivos de aprendizagem

Ao final desta aula, você deve ser capaz de:

- modelar restrições em backtracking;
- identificar soluções parciais inviáveis;
- aplicar podas simples corretamente;
- resolver soma-alvo e mochila 0/1 em versão básica;
- diferenciar poda de heurística;
- justificar impacto da poda sem prometer mudança no pior caso.

<!-- ## Pré-requisitos

Você deve conhecer geração de subconjuntos, combinações, permutações e custo exponencial. Agora vamos usar restrições para evitar explorar ramos que não podem levar a uma solução útil. -->

## Problema motivador

Dado um conjunto de valores positivos, queremos saber se existe um subconjunto com soma igual a um alvo. Sem restrições, poderíamos gerar todos os subconjuntos. Mas, se a soma parcial já passou do alvo, continuar adicionando valores positivos não ajudará.

Essa observação permite poda.

## Restrição e poda

Restrição é uma regra que define o que é permitido. Poda é quando deixamos de explorar um ramo porque sabemos que ele não pode gerar resposta válida ou melhor.

Exemplo:

Suponha que queremos saber se existe um subconjunto de `valores = {4, 7, 9}` que soma `alvo = 10`. 

```text
valores = {4, 7, 9}
alvo = 10
soma parcial = 11
```

Se estamos em um ramo onde a soma parcial já é maior que o alvo (como no caso onde selecionamos `4` e `7`, resultando em `11`), e todos os valores restantes são positivos, essa soma parcial nunca voltará para `10`. Podemos então parar esse ramo.

## Soma-alvo com poda

```text
EXISTE-SOMA(v, i, soma, alvo)
    IF soma = alvo THEN
        RETURN TRUE
    IF soma > alvo THEN
        RETURN FALSE
    IF i = TAMANHO(v) THEN
        RETURN FALSE

    IF EXISTE-SOMA(v, i + 1, soma + v[i], alvo) THEN
        RETURN TRUE
    RETURN EXISTE-SOMA(v, i + 1, soma, alvo)
```

O estado parcial é a soma já escolhida. A poda `soma > alvo` vem antes das novas escolhas e só é válida porque os valores restantes são positivos.

<!-- ```java
public class SomaAlvo {
    public static boolean existeSoma(int[] v, int alvo) {
        return buscar(v, 0, 0, alvo);
    }

    private static boolean buscar(int[] v, int i, int soma, int alvo) {
        if (soma == alvo) {
            return true;
        }

        if (soma > alvo) {
            return false;
        }

        if (i == v.length) {
            return false;
        }

        if (buscar(v, i + 1, soma + v[i], alvo)) {
            return true;
        }

        return buscar(v, i + 1, soma, alvo);
    }
}
``` -->

A poda `soma > alvo` só é correta porque estamos assumindo valores positivos. Se valores negativos fossem permitidos, passar do alvo não impediria voltar depois.

## Mochila 0/1

Um problema clássico de backtracking com restrições é a mochila 0/1. Nesse problema, cada item tem peso e valor. Queremos escolher um subconjunto com maior valor sem ultrapassar o peso máximo da mochila.

Cada item gera duas decisões:

- incluir;
- não incluir.

O estado precisa guardar índice, peso atual, valor atual e melhor valor encontrado.

```text
MOCHILA(pesos, valores, capacidade, i, pesoAtual, valorAtual)
    IF pesoAtual > capacidade THEN
        RETURN
    IF i = TAMANHO(pesos) THEN
        melhor <- MAXIMO(melhor, valorAtual)
        RETURN

    MOCHILA incluindo item i
    MOCHILA sem incluir item i
```

As duas chamadas representam todos os subconjuntos de itens. A restrição de capacidade corta cedo o ramo que já não pode ser uma solução válida.

```java
public class MochilaBacktracking {
    private static int melhor;

    public static int resolver(int[] pesos, int[] valores, int capacidade) {
        melhor = 0;
        buscar(pesos, valores, capacidade, 0, 0, 0);
        return melhor;
    }

    private static void buscar(int[] pesos, int[] valores, int capacidade,
            int i, int pesoAtual, int valorAtual) {
        if (pesoAtual > capacidade) {
            return;
        }

        if (i == pesos.length) {
            if (valorAtual > melhor) {
                melhor = valorAtual;
            }
            return;
        }

        buscar(pesos, valores, capacidade, i + 1,
                pesoAtual + pesos[i], valorAtual + valores[i]);

        buscar(pesos, valores, capacidade, i + 1,
                pesoAtual, valorAtual);
    }
}
```

A poda por capacidade impede continuar com uma solução parcial inválida.

## Poda por limite superior simples

Podemos podar também quando nem o melhor cenário restante supera a melhor solução atual. Suponha que calculamos a soma dos valores restantes. Se:

```text
valorAtual + somaValoresRestantes <= melhor
```

então mesmo pegando todos os itens restantes não superamos a melhor resposta. Esse ramo pode ser cortado.

Essa poda exige cuidado: o limite precisa ser otimista. Ele pode superestimar o que ainda é possível, mas não pode subestimar, ou poderíamos cortar uma solução ótima.

```text
IF valorAtual + somaValoresRestantes <= melhor THEN
    RETURN
```

Nesse caso, nenhum ramo abaixo consegue melhorar a melhor resposta conhecida.

## Heurística não é garantia

Uma heurística escolhe uma estratégia que parece boa, como pegar itens por maior valor ou maior razão valor/peso. Ela pode encontrar uma solução boa rapidamente, mas não garante ótimo em geral.

Backtracking com poda ainda explora possibilidades suficientes para preservar corretude. A poda só é válida quando temos uma justificativa lógica para descartar o ramo.

## Como justificar uma poda

Uma boa justificativa de poda deve dizer qual hipótese ela usa. Por exemplo:

- "Posso cortar quando `soma > alvo` porque todos os valores restantes são positivos."
- "Posso cortar quando `pesoAtual > capacidade` porque adicionar mais itens nunca reduz o peso."
- "Posso cortar quando `valorAtual + somaRestante <= melhor` porque mesmo no cenário mais otimista não supero a melhor solução."

Sem essa hipótese, a poda pode estar errada. Em backtracking, uma poda errada é pior que um algoritmo lento: ela pode remover exatamente a solução correta.

## Medindo efeito da poda

Uma prática útil é contar chamadas recursivas. Comece com uma versão sem poda, depois acrescente uma poda e compare:

```java
private static int chamadas;
```

Incrementar `chamadas` no início do método recursivo ajuda a observar o efeito. A análise teórica continua importante, mas a medição mostra em quais entradas a poda realmente economiza trabalho.

## Análise informal de custo

Sem poda, mochila e soma-alvo exploram até `2^n` subconjuntos. Podas podem reduzir muito o número de ramos na prática, mas o pior caso ainda pode ser exponencial.

Por isso, ao analisar, diga:

- árvore completa tem tamanho exponencial;
- poda reduz ramos inviáveis;
- a corretude depende da justificativa da poda.

## Erros comuns

- Podar `soma > alvo` quando há números negativos.
- Tratar heurística como garantia de ótimo.
- Atualizar melhor solução sem verificar restrição.
- Esquecer de explorar o ramo "não incluir".
- Usar variável global sem reinicializar.
- Cortar ramo com limite superior calculado errado.

<!-- ## Exercícios de fixação

1. Implemente soma-alvo com valores positivos.
2. Mostre um caso em que a poda `soma > alvo` seria incorreta com negativos.
3. Implemente mochila básica.
4. Conte quantos nós foram visitados com e sem poda por capacidade.
5. Explique a diferença entre poda e heurística.
6. Proponha um limite superior simples para mochila.

## Exercício integrador

Implemente mochila 0/1 retornando o melhor valor e a lista de itens escolhidos. Inclua uma contagem de chamadas recursivas e compare duas versões: sem poda por limite superior e com uma poda simples baseada nos valores restantes. -->

## Checklist de aprendizagem

- [ ] Sei modelar restrições.
- [ ] Sei aplicar poda por inviabilidade.
- [ ] Sei resolver soma-alvo.
- [ ] Sei resolver mochila básica.
- [ ] Sei diferenciar poda e heurística.
- [ ] Sei explicar que o pior caso pode continuar exponencial.
