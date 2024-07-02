import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);


  useEffect(() => {
    setIsButtonEnabled(email.length > 0 && password.length > 0);
  }, [email, password]);

  const handleSubmit = () => {
    if (isButtonEnabled) {
      navigation.navigate('Home');
    }
  };


  return (
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p1/1427153-fundo-liquido-moderno-azul-vetor.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.card}>
        <Text style={styles.logoText}>Neuro Tracker</Text>
        <Text style={styles.welcomeText}>Olá, bem-vindo(a) ao Neuro Tracker!</Text>
        <Text style={styles.signupText}>Entrar</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <Button
          mode="contained"
          style={[
            styles.button,
            { backgroundColor: isButtonEnabled ? '#457b9d' : '#bde0fe' },
          ]}
          onPress={handleSubmit}
          disabled={!isButtonEnabled}
          contentStyle={styles.buttonContent}
        >
          Concluir
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    width: 335,
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
  signupText: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 20,
    textAlign: 'left',
    color: '#000',
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 53,
    backgroundColor: '#fff',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    fontWeight: '300',
    color: '#727272',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    borderRadius: 8,
  },
  buttonContent: {
    height: 60,
    justifyContent: 'center',
  },
});

export default Login;
