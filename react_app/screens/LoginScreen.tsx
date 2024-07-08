import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';


type RootStackParamList = {
  Home: { userName: string, userId: string };
  Signup: undefined;
  Login: undefined;
};

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5004/api/login', { userName });
      const { userId } = response.data;
      navigation.navigate('Home', { userName, userId });
    } catch (error) {
      Alert.alert('Erro de login', 'Usuário não encontrado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={userName}
        onChangeText={setUserName}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Registrar" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default LoginScreen;