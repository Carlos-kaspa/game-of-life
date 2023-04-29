### Sobre o repositório
Este repositório possui estudos em diversas linguagens, replicando o mesmo mini projeto, o Game of Life de John Horton Conway.

### Conway's Game of Life
O jogo da vida é um autómato celular desenvolvido pelo matemático britânico John Horton Conway em 1970. É o exemplo mais bem conhecido de autômato celular.

O jogo foi criado de modo a reproduzir, através de regras simples, as alterações e mudanças em grupos de seres vivos, tendo aplicações em diversas áreas da ciência.

As regras definidas são aplicadas a cada nova "geração"; assim, a partir de uma imagem em um tabuleiro bi-dimensional definida pelo jogador, percebem-se mudanças muitas vezes inesperadas e belas a cada nova geração, variando de padrões fixos a caóticos.

### Regras
O jogo da vida se passa em um arranjo bidimensional infinito de células que podem estar em um de dois estados, vivo ou morto. Cada célula interage com suas oito vizinhas, as células adjacentes horizontal, vertical e diagonalmente. O jogo evolui em unidades de tempo discretas chamadas de gerações. A cada nova geração, o estado do jogo é atualizado pela aplicação das seguintes regras:

Toda célula morta com exatamente três vizinhos vivos torna-se viva (nascimento).
Toda célula viva com menos de dois vizinhos vivos morre por isolamento.
Toda célula viva com mais de três vizinhos vivos morre por superpopulação.
Toda célula viva com dois ou três vizinhos vivos permanece viva.[3]
As regras são aplicadas simultaneamente em todas as células para chegar ao estado da próxima geração.