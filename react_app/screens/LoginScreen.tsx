import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: { userName: string, userId: string };
  Signup: undefined;
  Login: undefined;
};

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5004/api/login', { userName });
      if (response.data && response.data.userId) {
        const { userId } = response.data;
        navigation.navigate('Home', { userName, userId });
      } else {
        setError('Nome de usuário ou senha incorretos.');
      }
    } catch (error:any) {
      console.error('Erro ao tentar login:', error);
  
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('Requisição mal formada. Por favor, verifique os dados enviados.');
            break;
          case 401:
            setError('Usuário não encontrado.');
            break;
          case 403:
            setError('Acesso negado.');
            break;
          case 500:
            setError('Problema interno do servidor. Tente novamente mais tarde.');
            break;
          default:
            setError('Erro de conexão. Verifique sua rede.');
            break;
        }
      } else if (error.request) {
        setError('Nenhuma resposta do servidor. Verifique sua conexão de rede.');
      } else {
        setError('Erro ao realizar o pedido. Tente novamente.');
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={userName}
        onChangeText={setUserName}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Text style={styles.subtitle}>Primeiro acesso?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.registerText}>Clique aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  button: {
    backgroundColor: '#6a11cb',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#6a11cb',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
