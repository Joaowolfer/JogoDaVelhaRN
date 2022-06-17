import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [tela, setTela] = useState('menu');
  const [jogadorAtual, setJogadorAtual] = useState('');
  const [tabuleiro, setTabuleiro] = useState([]);
  const [jogadasRestantes, setJogadasRestantes] = useState(0);
  const [ganhador, setGanhador] = useState('');

  switch (tela) {
    case 'menu':
      return getTelaMenu();
    case 'jogo':
      return getTelaJogo();
    case 'ganhador':
      return getTelaGanhador();
  }

  function iniciarJogo(jogador) {
    setJogadorAtual(jogador);

    setJogadasRestantes(9);
    setTabuleiro([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setTela('jogo');
  }

  function jogar(linha, coluna) {
    tabuleiro[linha][coluna] = jogadorAtual;
    setTabuleiro([...tabuleiro]);

    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');

    verificarGanhador(tabuleiro, linha, coluna);
  }
  function verificarGanhador(tabuleiro, linha, coluna) {
    if (tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]) {
      return finalizarJogo(tabuleiro[linha][0]);
    }
    if (tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]) {
      return finalizarJogo(tabuleiro[0][coluna]);
    }
    if (tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
      return finalizarJogo(tabuleiro[0][2]);
    }
    if (tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
      return finalizarJogo(tabuleiro[0][0]);
    }
    if (jogadasRestantes - 1 === 0) {
      return finalizarJogo('');
    }
    setJogadasRestantes((jogadasRestantes - 1));
  }

  function finalizarJogo(jogador) {
    setGanhador(jogador);
    setTela('ganhador');
  }

  function getTelaMenu() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        <Text style={styles.subTitulo}>Selecione com qual você quer começar</Text>

        <View style={styles.inlineItems}>
          <TouchableOpacity style={styles.boxJogador1}
            onPress={() => iniciarJogo('X')}>
            <Text style={styles.jogadorX}>X</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.boxJogador1}
            onPress={() => iniciarJogo('O')}>
            <Text style={styles.jogadorO}>O</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function getTelaJogo() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>Jogo da Velha</Text>
        {
          tabuleiro.map((linha, numeroLinha) => {
            return (
              <View key={numeroLinha} style={styles.inlineItems}>

                {
                  linha.map((coluna, numeroColuna) => {
                    return (
                      <TouchableOpacity style={styles.boxJogador}
                        onPress={() => jogar(numeroLinha, numeroColuna)}
                        disabled={coluna !== ''}>
                        <Text style={coluna === 'X' ? styles.jogadorX : styles.jogadorO}>{coluna}</Text>
                      </TouchableOpacity>
                    )
                  })
                }

              </View>
            )
          })
        }
        <TouchableOpacity style={styles.buttonMenu}
          onPress={() => setTela('menu')}>
          <Text style={styles.textoButtonMenu}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function getTelaGanhador() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}>FIM</Text>
        <Text style={styles.subTituloResultado}>Resultado Final</Text>

        {
          ganhador === '' &&
          <Text style={styles.empate}>Nenhum ganhador</Text>
        }

        {
          ganhador !== '' &&
          <>
            <Text style={styles.ganhador}>ganhador</Text>
            <View style={styles.boxJogador}>
              <Text style={ganhador === 'X' ? styles.jogadorX : styles.jogadorO}>{ganhador}</Text>
            </View>
          </>
        }

        <View style={styles.inlineItems}>
          <TouchableOpacity style={styles.buttonMenu}
            onPress={() => setTela('menu')}>
            <Text style={styles.textoButtonMenu}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: "#333"
  },
  subTitulo: {
    fontSize: 20,
    color: '#555',
    marginTop: 5,
    marginBottom: 10,
    width: 300,
    textAlign: 'center'
  },
  boxJogador: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  jogadorX: {
    fontSize: 40,
    color: 'black'
  },
  jogadorO: {
    fontSize: 40,
    color: 'red'
  },
  inlineItems: {
    flexDirection: 'row'
  },
  buttonMenu: {
    marginTop: 50
  },
  textoButtonMenu: {
    fontSize: 20,
    backgroundColor: 'black',
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  },
  ganhador: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 7,
    color: 'green'
  },
  subTituloResultado: {
    fontSize: 25,
  },
  empate: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 7,
    color: 'red'
  },
  boxJogador1: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  }
});
