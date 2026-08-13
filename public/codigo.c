#include <stdio.h>
#include <stdlib.h>
#include <time.h> 
#include <string.h> 

// Escolhi o conceito de struct, arquivos, e funcoes para fazer o meu jogo para armazenar dados de um jogador no ranking

typedef struct {
    char nome[50];      // Nome do jogador
    int pontos;         // Pontuação total do jogador
    int nivel;          // Nível de dificuldade jogado
    int modo;           // Modo de jogo escolhido
    int rodadas;        // Número de rodadas jogadas
} Ranking;

// Estrutura para treino
typedef struct {
    int total_rodadas;
    int erros_por_posicao[20];  
    int maior_sequencia_acertada;
} EstatisticasTreino;

// Funçãozinha para limpar tela do console
void limpar_tela() {
    int i;
    for(i = 0; i < 50; i++) {
        printf("\n");
    }
}

// Função para pausar a execução e aguardar dar enter
void pausar() {
    printf("\nPressione Enter para continuar...");
    getchar();
    getchar();
}

// Função para ler um número com validação  (foi parar no modo matematica )
int ler_numero(int numero_posicao, int modo_matematica) {
    int numero;
    int tentativas = 0;

    while(1) {
        printf("Numero %d: ", numero_posicao);

        if(scanf("%d", &numero) != 1) {
            int c;
            while ((c = getchar()) != '\n' && c != EOF);
            printf("Erro: Digite apenas UM numero. Tente novamente.\n");
            tentativas++;
        } 
        else if(modo_matematica == 0 && (numero < 0 || numero > 9)) {
            printf("Erro: Digite apenas UM numero entre 0 e 9. Tente novamente.\n");
            tentativas++;
        }
        else if(modo_matematica == 0 && numero >= 10) {
            printf("Erro: Digite apenas UM digito (0-9), nao %d. Tente novamente.\n", numero);
            tentativas++;
        }
        else {
            if(tentativas > 0) {
                printf("Correto! Voce digitou: %d\n", numero);
            }
            return numero;
        }

        if(tentativas >= 3) {
            if(modo_matematica == 0) {
                printf("Dica: Digite apenas UM numero por vez. Exemplo: para '5', digite: 5\n");
            } else {
                printf("Dica: No modo matematico pode haver numeros maiores, mas digite um por vez.\n");
            }
        }
    }
}

// adivinhação de sequência podendo jogar em com um concorrente ou sozinho 
void exibir_cabecalho() {
    limpar_tela();
    printf("========================================\n");
    printf("          JOGO ADVINHE A SEQUÊNCIA\n");
    printf("========================================\n\n");
}

void exibir_cabecalho_novo_jogo() {
    limpar_tela();
    printf("========================================\n");
    printf("          NOVO JOGO\n");
    printf("========================================\n\n");
}


void exibir_cabecalho_ranking() {
    limpar_tela();
    printf("========================================\n");
    printf("          RANKING\n");
    printf("========================================\n\n");
}

void exibir_cabecalho_rodada() {
    limpar_tela();
    printf("========================================\n");
    printf("          RODADA ATUAL\n");
    printf("========================================\n\n");
}

// Exibe cabeçalho para modo versus
void exibir_cabecalho_versus() {
    limpar_tela();
    printf("========================================\n");
    printf("          MODO VS - 2 JOGADORES\n");
    printf("========================================\n\n");
}


void exibir_cabecalho_treino() {
    limpar_tela();
    printf("========================================\n");
    printf("          MODO TREINO PERSONALIZADO\n");
    printf("========================================\n\n");
}

// salva os dados de um jogador no arquivo de ranking
void salvar_ranking(Ranking r) {
    FILE *arquivo = fopen("ranking.txt", "a");
    if(arquivo != NULL) {
        fprintf(arquivo, "%s;%d;%d\n", r.nome, r.pontos, r.rodadas);
        fclose(arquivo);
    }
}

// carrega e exibe o ranking de jogadores 
void carregar_ranking() {
    FILE *arquivo = fopen("ranking.txt", "r");
    if(arquivo != NULL) {
        printf("\nHISTORICO DE PARTIDAS\n");
        printf("----------------------------------------\n");

        char nome[50];
        int pontos, rodadas;
        int posicao = 1;

        while(fscanf(arquivo, "%[^;];%d;%d\n", nome, &pontos, &rodadas) == 3) {
            printf("%2d. %-15s | Pontos: %3d | Rodadas: %2d\n", 
                   posicao, nome, pontos, rodadas);
            posicao++;
        }
        fclose(arquivo);
    } else {
        printf("\nNenhum registro de ranking encontrado.\n");
    }
}

// simula contagem regressiva sem funções de sistema
void animacao_contagem_regressiva(int segundos) {
    int i, j;
    printf("\nMemorizando");
    for(i = 0; i < segundos; i++) {
        printf(".");
        for(j = 0; j < 300000000; j++) {}
    }
    printf("\n");
}

// Exibe os resultados de uma rodada
void exibir_resultado_rodada(int sequencia[], int palpite[], int tamanho, int acertos) {
    int i;
    printf("\nRESULTADO DA RODADA:\n");
    printf("> Sequencia original: ");
    for(i = 0; i < tamanho; i++) {
        printf("%d ", sequencia[i]);
    }

    printf("\n> Seus palpites:      ");
    for(i = 0; i < tamanho; i++) {
        if(palpite[i] == sequencia[i]) {
            printf("[%d] ", palpite[i]);
        } else {
            printf("(%d) ", palpite[i]);
        }
    }

    printf("\nAcertos: %d/%d\n", acertos, tamanho);
}

// Gera sequência do tipo Fibonacci  ONDE O 
//termo é a soma dos dois anteriores, começando geralmente com 0 e 1 
void gerar_fibonacci(int sequencia[], int tamanho) {
    int i;
    if(tamanho >= 1) sequencia[0] = rand() % 3 + 1;
    if(tamanho >= 2) sequencia[1] = rand() % 3 + 1;
    for(i = 2; i < tamanho; i++) {
        sequencia[i] = sequencia[i-1] + sequencia[i-2];
    }
}

// Gera sequência de progressão aritmética
// cada termo, a partir do segundo, é igual ao anterior
// somado com um número fixo, chamado razão da progressão
void gerar_progressao_aritmetica(int sequencia[], int tamanho) {
    int i;
    int razao = (rand() % 3) + 1;
    int primeiro_termo = rand() % 5 + 1;

    sequencia[0] = primeiro_termo;
    for(i = 1; i < tamanho; i++) {
        sequencia[i] = sequencia[i-1] + razao;
    }
}

// Gera sequência de números primos
//rand aleatorio
void gerar_primos(int sequencia[], int tamanho) {
    int i;
    int primos[] = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71};
    int total_primos = 20;

    int inicio = rand() % (total_primos - tamanho + 1);
    for(i = 0; i < tamanho; i++) {
        sequencia[i] = primos[inicio + i];
    }
}

// Gera sequência de progressão geométrica
void gerar_progressao_geometrica(int sequencia[], int tamanho) {
    int i;
    int razao = (rand() % 2) + 2;
    int primeiro_termo = rand() % 3 + 1;

    sequencia[0] = primeiro_termo;
    for(i = 1; i < tamanho; i++) {
        sequencia[i] = sequencia[i-1] * razao;
    }
}

// Gera sequências matemáticas switch
void gerar_sequencia_matematica(int sequencia[], int tamanho, int tipo) {
    switch(tipo) {
        case 1: gerar_fibonacci(sequencia, tamanho); break;
        case 2: gerar_progressao_aritmetica(sequencia, tamanho); break;
        case 3: gerar_primos(sequencia, tamanho); break;
        case 4: gerar_progressao_geometrica(sequencia, tamanho); break;
    }
}

//modo trino e foca nas dificuldades
void modo_treino_personalizado() {
    EstatisticasTreino stats;
    int sequencia[20];
    int palpite[20];
    int i, tamanho, acertos, posicao_mais_erros;
    char continuar;

    exibir_cabecalho_treino();

    printf("Bem-vindo ao Modo Treino!\n");
    printf("Vamos comecar com sequencias basicas.\n\n");

    do {
        printf("Escolha o tamanho da sequencia (4-20): ");
        scanf("%d", &tamanho);
        if(tamanho < 4) tamanho = 4;
        if(tamanho > 20) tamanho = 20;

        printf("Sequencia de %d numeros:\n", tamanho);

        for(i = 0; i < tamanho; i++) {
            sequencia[i] = rand() % 10;
        }

        printf("MEMORIZE: ");
        for(i = 0; i < tamanho; i++) {
            printf("%d ", sequencia[i]);
        }
        printf("\n");

        animacao_contagem_regressiva(3);
        limpar_tela();

        printf("REPITA A SEQUENCIA (%d numeros):\n", tamanho);
        for(i = 0; i < tamanho; i++) {
            palpite[i] = ler_numero(i + 1, 0);
        }

        acertos = 0;
        for(i = 0; i < tamanho; i++) {
            if(palpite[i] == sequencia[i]) acertos++;
        }

        printf("\nAcertos: %d/%d\n", acertos, tamanho);
        printf("\nDeseja continuar treinando? (s/n): ");
        scanf(" %c", &continuar);

    } while(continuar == 's' || continuar == 'S');

    printf("\nTreino finalizado!\n");
    pausar();
}

// Modo  2 jogadors
void modo_versus() {
    char jogador1[50], jogador2[50];
    int sequencia[20];
    int palpite1[20], palpite2[20];
    int tamanho, i;
    int acertos1, acertos2;
    int pontuacao1 = 0, pontuacao2 = 0;
    int rodada = 1;
    int vez_primeiro;
    char continuar;

    exibir_cabecalho_versus();

    printf("Digite o nome do Jogador 1: ");
    scanf("%s", jogador1);
    printf("Digite o nome do Jogador 2: ");
    scanf("%s", jogador2);

    printf("\nMODO VS - %s vs %s\n", jogador1, jogador2);
    printf("A cada rodada, alterna quem joga primeiro!\n\n");

    // USANDO O RAND PRA ESCOLHER NO ALEATORIO QUEM COMEÇA A PARTIDA

    vez_primeiro = (rand() % 2) + 1;
    if(vez_primeiro == 1) {
        printf("SORTEIO: %s comeca primeiro!\n\n", jogador1);
    } else {
        printf("SORTEIO: %s comeca primeiro!\n\n", jogador2);
    }

    pausar();

    do {
        printf("\n--- RODADA %d ---\n", rodada);

        if(rodada > 1) {
            vez_primeiro = (vez_primeiro == 1) ? 2 : 1;
            if(vez_primeiro == 1) {
                printf("ALTERNANCIA: %s comeca primeiro!\n", jogador1);
            } else {
                printf("ALTERNANCIA: %s comeca primeiro!\n", jogador2);
            }
        }

        // ALTERADO: 4-20 números nao ´e mais 3-10
        printf("Escolha o tamanho da sequencia (4-20): ");
        scanf("%d", &tamanho);
        if(tamanho < 4) tamanho = 4;
        if(tamanho > 20) tamanho = 20;

        for(i = 0; i < tamanho; i++) {
            sequencia[i] = rand() % 10;
        }

        printf("\nSEQUENCIA PARA AMBOS:\n");
        printf(">>> ");
        for(i = 0; i < tamanho; i++) {
            printf("%d ", sequencia[i]);
        }
        printf("<<<\n");

        animacao_contagem_regressiva(3);
        limpar_tela();

        if(vez_primeiro == 1) {
            printf("=== PRIMEIRO: %s ===\n", jogador1);
            printf("Digite a sequencia (%d numeros):\n", tamanho);
            for(i = 0; i < tamanho; i++) {
                palpite1[i] = ler_numero(i + 1, 0);
            }

            limpar_tela();

            printf("=== SEGUNDO: %s ===\n", jogador2);
            printf("Digite a sequencia (%d numeros):\n", tamanho);
            for(i = 0; i < tamanho; i++) {
                palpite2[i] = ler_numero(i + 1, 0);
            }
        } else {
            printf("=== PRIMEIRO: %s ===\n", jogador2);
            printf("Digite a sequencia (%d numeros):\n", tamanho);
            for(i = 0; i < tamanho; i++) {
                palpite2[i] = ler_numero(i + 1, 0);
            }

            limpar_tela();

            printf("=== SEGUNDO: %s ===\n", jogador1);
            printf("Digite a sequencia (%d numeros):\n", tamanho);
            for(i = 0; i < tamanho; i++) {
                palpite1[i] = ler_numero(i + 1, 0);
            }
        }

        acertos1 = 0;
        acertos2 = 0;
        for(i = 0; i < tamanho; i++) {
            if(palpite1[i] == sequencia[i]) acertos1++;
            if(palpite2[i] == sequencia[i]) acertos2++;
        }

        pontuacao1 += acertos1;
        pontuacao2 += acertos2;

        printf("\n=== RESULTADO RODADA %d ===\n", rodada);
        printf("Sequencia: ");
        for(i = 0; i < tamanho; i++) printf("%d ", sequencia[i]);
        printf("\n\n%s: %d acertos (Total: %d)\n", jogador1, acertos1, pontuacao1);
        printf("%s: %d acertos (Total: %d)\n", jogador2, acertos2, pontuacao2);

        if(acertos1 > acertos2) printf(":D %s venceu!\n", jogador1);
        else if(acertos2 > acertos1) printf(":D %s venceu!\n", jogador2);
        else printf(":o Empate!\n");

        rodada++;
        printf("\nDeseja jogar outra rodada? (s/n): ");
        scanf(" %c", &continuar);

    } while(continuar == 's' || continuar == 'S');

    printf("\n=== RESULTADO FINAL ===\n");
    printf("%s: %d pontos\n", jogador1, pontuacao1);
    printf("%s: %d pontos\n", jogador2, pontuacao2);

    if(pontuacao1 > pontuacao2) {
        printf("PARABENS! %s E O VENCEDOR! :D\n", jogador1);
        Ranking novo;
        strcpy(novo.nome, jogador1);
        novo.pontos = pontuacao1;
        novo.rodadas = rodada - 1;
        salvar_ranking(novo);
    } else if(pontuacao2 > pontuacao1) {
        printf("PARABENS! %s E O VENCEDOR! :D\n", jogador2);
        Ranking novo;
        strcpy(novo.nome, jogador2);
        novo.pontos = pontuacao2;
        novo.rodadas = rodada - 1;
        salvar_ranking(novo);
    } else {
        printf("EMPATE! :o\n");
    }

    pausar();
}

// Função principal
 main() {
    int sequencia[20];
    int palpite[20];
    int nivel, modo_jogo;
    int pontos = 0;
    int rodada = 1;
    char jogar_novamente;
    char nome_jogador[50];
    int sequencias_predefinidas[20][20];
    int total_sequencias = 0;
    int opcao;
    int i, tamanho, usar_predefinida, seq_escolhida, acertos, pontos_rodada, tipo_matematica;
    Ranking novo;

    srand(time(NULL));
//    carregar_sequencias_predefinidas(sequencias_predefinidas, &total_sequencias);

    do {
        exibir_cabecalho();
        printf("1. Iniciar Novo Jogo\n");
        printf("2. Modo Treino Personalizado\n");
        printf("3. Modo Versus (2 jogadores)\n");
        printf("4. Ver Ranking\n");
        printf("5. Sair\n");
        printf("\nEscolha uma opcao: ");
        scanf("%d", &opcao);

        switch(opcao) {
            case 1:
                exibir_cabecalho_novo_jogo();
                printf("Digite seu nome: ");
                scanf("%s", nome_jogador);

                printf("\nEscolha o modo de jogo:\n");
                printf("1. Classico (sequencias aleatorias)\n");
                printf("2. Sequencia Crescente (aumenta automaticamente)\n");
                printf("3. Desafio Matematico (sequencias com padroes)\n");
                printf("\nOpcao: ");
                scanf("%d", &modo_jogo);

                pontos = 0;
                rodada = 1;

                do {
                    exibir_cabecalho_rodada();
                    printf("Rodada: %d | Pontuacao: %d\n", rodada, pontos);
                    printf("Modo: ");
                    if(modo_jogo == 1) printf("Classico\n\n");
                    else if(modo_jogo == 2) printf("Sequencia Crescente\n\n");
                    else if(modo_jogo == 3) printf("Desafio Matematico\n\n");

                    if(modo_jogo != 2) {
                        // ESCOLHER ENTRE 4 Á 20 números 
                        printf("Escolha o tamanho da sequencia (4-20): ");
                        scanf("%d", &tamanho);
                        if(tamanho < 4) tamanho = 4;
                        if(tamanho > 20) tamanho = 20;
                        nivel = tamanho; // Usa tamanho como nível
                    } else {
                        nivel = 2;
                        tamanho = 3 + rodada;
                        if(tamanho > 20) tamanho = 20;
                        printf("Dificuldade automatica: %d numeros\n\n", tamanho);
                    }

                    if(modo_jogo == 1) {
                        usar_predefinida = 0;
                        if(total_sequencias > 0 && rand() % 2 == 0) {
                            usar_predefinida = 1;
                            seq_escolhida = rand() % total_sequencias;
                            for(i = 0; i < tamanho; i++) {
                                sequencia[i] = sequencias_predefinidas[seq_escolhida][i];
                            }
                        } else {
                            for(i = 0; i < tamanho; i++) {
                                sequencia[i] = rand() % 10;
                            }
                        }
                    }
                    else if(modo_jogo == 2) {
                        for(i = 0; i < tamanho; i++) {
                            sequencia[i] = rand() % 10;
                        }
                    }
                    else if(modo_jogo == 3) {
                        tipo_matematica = (rand() % 4) + 1;
                        gerar_sequencia_matematica(sequencia, tamanho, tipo_matematica);

                        printf("Tipo de sequencia: ");
                        if(tipo_matematica == 1) printf("Fibonacci\n");
                        else if(tipo_matematica == 2) printf("Progressao Aritmetica\n");
                        else if(tipo_matematica == 3) printf("Numeros Primos\n");
                        else if(tipo_matematica == 4) printf("Progressao Geometrica\n");
                    }

                    printf("\nMEMORIZE ESTA SEQUENCIA:\n");
                    printf(">>> ");
                    for(i = 0; i < tamanho; i++) {
                        printf("%d ", sequencia[i]);
                    }
                    printf("<<<\n");

                    animacao_contagem_regressiva(3);
                    limpar_tela();

                    printf("AGORA REPITA A SEQUENCIA (%d numeros):\n", tamanho);
                    int modo_matematico = (modo_jogo == 3) ? 1 : 0;
                    for(i = 0; i < tamanho; i++) {
                        palpite[i] = ler_numero(i + 1, modo_matematico);
                    }

                    acertos = 0;
                    for(i = 0; i < tamanho; i++) {
                        if(palpite[i] == sequencia[i]) acertos++;
                    }

                    exibir_resultado_rodada(sequencia, palpite, tamanho, acertos);

                    if(modo_jogo == 2) {
                        pontos_rodada = acertos * (rodada + 1);
                    } else {
                        pontos_rodada = acertos * nivel;
                    }
                    pontos += pontos_rodada;
                    printf("Pontos desta rodada: %d\n", pontos_rodada);
                    printf("Pontuacao total: %d\n", pontos);

                    rodada++;

                    if(rodada <= 20) {
                        printf("\nDeseja jogar outra rodada? (s/n): ");
                        scanf(" %c", &jogar_novamente);
                    } else {
                        printf("\nVoce completou todas as 20 rodadas!\n");
                        jogar_novamente = 'n';
                    }

                } while(jogar_novamente == 's' || jogar_novamente == 'S');

                strcpy(novo.nome, nome_jogador);
                novo.pontos = pontos;
                novo.rodadas = rodada - 1;
                salvar_ranking(novo);

                printf("\nPontuacao salva no ranking!\n");
                pausar();
                break;

            case 2:
                modo_treino_personalizado();
                break;

            case 3:
                modo_versus();
                break;

            case 4:
                exibir_cabecalho_ranking();
                carregar_ranking();
                pausar();
                break;

            case 5:
                printf("\nObrigado por jogar! Ate mais!\n");
                break;

            default:
                printf("\nOpcao invalida! Tente novamente.\n");
                pausar();
        }

    } while(opcao != 5);

}