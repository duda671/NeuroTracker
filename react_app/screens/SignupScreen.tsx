import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import axios from 'axios';

type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5004/api/signup', {
        userName,
        userAge,
      });
      Alert.alert('Sucesso', 'Usuário registrado com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro de registro', 'Não foi possível registrar o usuário');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade do usuário"
        value={userAge}
        onChangeText={setUserAge}
        keyboardType="numeric"
      />
      <Button title="Registrar" onPress={handleSignup} />
      <Button title="Voltar ao Login" onPress={() => navigation.navigate('Login')} />
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

export default SignupScreen;
