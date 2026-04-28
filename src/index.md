---
title: Técnicas de Programação
subtitle: 2026.2
...

# Avisos

- **Nesta disciplina, é proibida a utilização de ferramentas e plugins de IA generativa (IAg) em todas as atividades, pois a avaliação dos objetivos de aprendizagem é baseada no raciocínio lógico do próprio aluno.**

**Links importantes**:

<!-- - [Avisos (blackboard)](https://insper.blackboard.com/ultra/courses/_52842_1/announcements) -->
- [Exercícios (prairie learn)](https://us.prairielearn.com/pl/course_instance/210064)
- [Plano de aulas](./plano-de-aulas.xlsx)
<!-- - [Grupos do quiz1](./grupos-quiz1.csv) -->

# Equipe

::: equipe :::
- ![Marcio](css/marcio.jpeg) **Marcio F. Stabile Jr.**
- ![Igor](css/igor.png) **Igor Montagner**  (~2026/1)
- ![Cynthia](css/cynthia.jpeg) **Cynthia Naoko Yasutake** (2025/2)
- ![Artur](css/artur.jpeg) **Artur Alvares Cruz Lopes** (2025/2)
- ![Pertusi](css/pertusi.png) **Pedro Vaz Pertusi** (2025/1)
- ![Luca](css/luca.jpg) **Luca Feltrin** (2025/1)
- ![Maciel](css/maciel.jpg) **Maciel Vidal** (2023/2) 
- ![Vaz](css/vaz.jpg) **Eduardo Vaz** (2024/1)
- ![Ale](css/ale.jpeg)**Alexandre Magno** (2024/1)
- ![Jlucas](css/jlucas.jpg) **João Lucas Cadorniga** (2024/2)
:::

# Avaliações

Teremos os seguinte itens de avaliação

- $PL$ - média de todos os exercícios no PrairieLearn
- $QG$ - média dos quizzes
- $P1$ - prova intermediária 
- $P2$ - prova final

A nota final $NF$ é calculada da seguinte maneira. 

$$
NF = 0.3 \times PL + P1 \times 0.2 + P2 \times 0.4 + QG \times 0.1
$$

Com a condição de que $(2 \times P1 + 4 \times P2)/6 \geq 4.5$. 

# Como usar o material

Nossas aulas estão divididas em 3 materiais principais:

1. **slides** usados nas partes expositivas das aulas. 
2. **handouts** contendo atividades feitas em aula e explicações adicionais. Estão em formato PDF. É possível usar tanto impresso quanto anotando o PDF digitalmente.
3. **exercícios práticos** no PrairieLearn específicos para cada aula.  

Veja os vídeos abaixo para entender um pouco melhor a mudança para material impresso e também algumas dicas de como aproveitar melhor esse tipo de material. Temos tanto para uso em papel como digital via anotações no PDF. 

<a class="button" href="https://youtu.be/8eoDvbbxYhE">Uso do material em Papel</a> <!-- <a class="button" href="#">Uso do material em PDF</a> -->

Além disso, também teremos exercícios de implementação gerais de cada assunto. Eles são listados no início de cada assunto.

1. **implementação** dos algoritmos no PrairieLearn. Objetivo é traduzir os algoritmos vistos em sala para *Java*.
2. **exercícios extras** em sites como LeetCode, hackerrank e etc. Úteis para praticar para prova e ter mais exemplos dos algoritmos e estruturas de dados sendo usados. 


# Aulas

Atividades de aula estão organizadas em grandes tópicos que serão abordados em mais de uma aula. As atividades esperadas de cada dia estão listadas dentro de cada tópico.


## Apresentação da disciplina

<object data="slides-inicio.pdf" width="400" height="400"></object>


## 00 - Pseudo código e Java

[Acessar exercícios](https://us.prairielearn.com/pl/course_instance/210064/assessment/2644446){ .button }



**Cheat Sheets Java**:

- [Parte 1][pseudo-cheatsheet1]: Variáveis e Controle de fluxo



| Aula              | Slides                       | Handout                    |
|-------------------|------------------------------|----------------------------|
| Controle de Fluxo | [Expositiva][pseudo-slides1] | [Handout][pseudo-handout1] |
| Arrays            | [Expositiva][pseudo-slides2] | [Handout][pseudo-handout2] |
| Strings           | .                            | [Handout][pseudo-handout3] |

[pseudo-slides1]: 00-java/slides-dia1.pdf
[pseudo-slides2]: 00-java/slides-dia2.pdf
[pseudo-cheatsheet1]: 00-java/cheat1-handout.pdf
[pseudo-handout1]: 00-java/handout-dia1.pdf
[pseudo-handout2]: 00-java/handout-dia2.pdf
[pseudo-handout3]: 00-java/handout-dia3.pdf

## 01 - Buscas em Arrays

[Exercícios de simulação](https://us.prairielearn.com/pl/course_instance/210064/assessment/2644448){ .button }

[Exercícios de código](https://us.prairielearn.com/pl/course_instance/210064/assessment/2644447){ .button }

| Aula                  | Slides                          | Handout                       |
|-----------------------|---------------------------------|-------------------------------|
| Busca Binária         | [Expositiva][binsearch-slides1] | [Handout][binsearch-handout1] |
| Análise de Desempenho | [Expositiva][binsearch-slides2] | [Handout][binsearch-handout2] |
|                       |                                 |                               |

[binsearch-slides1]: 01-busca-binaria/slides-inicio.pdf
[binsearch-handout1]: 01-busca-binaria/handout-dia1.pdf
[binsearch-slides2]: 01-busca-binaria/slides-desempenho.pdf
[binsearch-handout2]: 01-busca-binaria/handout-dia2.pdf

## 02 - Ordenação

| Aula                   | Slides                     | Handout                 | Exercício                      |
|----------------        |----------------------------|-------------------------|--------------------------------|
| Bubble Sort            | [Expositiva][sort-slides1] | [Baixar][sort-handout1] | [Acessar exercícios][sort-ex1] |
| Selection Sort         |                            | [Baixar][sort-handout1] | (igual acima)                  |
| Quick Sort (I)         | [Expositiva][sort-slides3] | [Baixar][sort-handout3] | [Acessar exercícios][sort-ex3] |
| Recursão               | [Expositiva][sort-slides4] | [Baixar][sort-handout4] | [Acessar exercícios][sort-ex4] |
| Merge Sort (I)         | [Expositiva][sort-slides5] | [Baixar][sort-handout5] | [Acessar exercícios][sort-ex5] |
| Ordenação rápida       | [Expositiva][sort-slides6] |                         |  [Acessar exercícios][sort-ex6]|


[sort-slides1]: 02-ordenacao/slides-dia1.pdf
[sort-slides3]: 02-ordenacao/slides-dia3.pdf
[sort-slides4]: 02-ordenacao/slides-dia4.pdf
[sort-slides5]: 02-ordenacao/slides-dia5.pdf
[sort-slides6]: 02-ordenacao/slides-dia6.pdf

[sort-handout1]: 02-ordenacao/handout-dia1.pdf
[sort-handout2]: 02-ordenacao/handout-dia2.pdf
[sort-handout3]: 02-ordenacao/handout-dia3.pdf
[sort-handout4]: 02-ordenacao/handout-dia4.pdf
[sort-handout5]: 02-ordenacao/slides-dia5.pdf

[sort-ex1]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644449
[sort-ex3]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644450
[sort-ex4]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2656551
[sort-ex5]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644445
[sort-ex6]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644453

## 03 - Backtracking e enumeração exaustiva

| Aula                      | Slides                     | Handout                       | Exercício                      |
|----------------           |----------------------------|-------------------------      |--------------------------------|
| Sequências de DNA         | [Expositiva][back-slides1] |                               | [Acessar exercícios][back-ex1] |
| Mochila Binária           | [Expositiva][back-slides2] |   [Handout][back-handout2]    | [Acessar exercícios][back-ex2] |
| Mochila Binária II        | [Expositiva][back-slides3] | [Handout][back-handout3]      | [Acessar exercícios][back-ex3] |
| Mochila Binária III       |                            |                               | [Exercício extra][back-extra1] |

[back-slides1]: 03-backtracking/slides-dia1.pdf
[back-slides2]: 03-backtracking/slides-inicio.pdf
[back-slides3]: 03-backtracking/slides-backtracking.pdf
[back-handout2]: 03-backtracking/handout-dia2.pdf
[back-handout3]: 03-backtracking/handout-dia3.pdf
[back-ex1]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644439
[back-ex2]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644440
[back-ex3]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644441
[back-extra1]: https://leetcode.com/problems/n-queens-ii/

## 04 - Caminhos

| Aula                      | Slides                     | Handout                       | Exercício                      |
|----------------           |----------------------------|-------------------------      |--------------------------------|
| Heurística da mão direita | [Expositiva][lab-slides1]  | [Handout][lab-handout1] / [Mão direita](04-caminhos/mao-direita_1.png)       | [Acessar exercícios][lab-ex1] |
| Backtracking | [Expositiva][lab-slides2] /[Anotações][lab-slides2-anotado]  | [Handout][lab-handout2] / [Anotações][lab-handout2-anotado]      | [Acessar exercícios][lab-ex2] |
| Backtracking II | [Expositiva][lab-slides4] /[Anotações][lab-slides4-anotado]  |      | [Acessar exercícios][lab-ex4] |



[lab-ex1]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644442
[lab-handout1]: 04-caminhos/handout-dia1.pdf
[lab-slides1]: 04-caminhos/slides-dia1.html
[lab-ex2]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644443
[lab-handout2]: 04-caminhos/handout-dia2.pdf
[lab-handout2-anotado]: 04-caminhos/handout-dia2-anotado.pdf
[lab-slides2-anotado]: 04-caminhos/slides-dia2-anotado.pdf
[lab-slides2]: 04-caminhos/slides-dia2.pdf
[lab-slides4]: 04-caminhos/slides-dia4.pdf
[lab-slides4-anotado]: 04-caminhos/slides-dia4-anotado.pdf
[lab-ex4]: https://us.prairielearn.com/pl/course_instance/210064/assessment/2644444


# Exercícios extras

**Busca binária**:

- [Insert position](https://leetcode.com/problems/search-insert-position/description/)
- [Smallest letter greater than target](https://leetcode.com/problems/find-smallest-letter-greater-than-target/description/)
- [Find peak element](https://leetcode.com/problems/find-peak-element/description/)

**Ordenação**:

- [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/description/)
- [Missing Number](https://leetcode.com/problems/missing-number/description/)
- [Majority Element](https://leetcode.com/problems/majority-element/description/)

**Recursão**:

- [Find unique string](https://leetcode.com/problems/find-unique-binary-string/description/)

**Labirinto e caminhos**:

- [Number of Islands](https://leetcode.com/problems/number-of-islands/)
- [Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)
- [Max Area of Island](https://leetcode.com/problems/max-area-of-island/)

# Materiais antigos

1. [2025-2](./2025-2.zip)
2. Materiais anteriores estão disponíveis [neste link](https://insper.github.io/tecnicas-de-programacao/).
