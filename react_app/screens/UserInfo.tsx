import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../util/auth';

const UserInfo: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, login } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age.toString() || '');
  const [gender, setGender] = useState('');
  const [previousDiagnosis, setPreviousDiagnosis] = useState('');

  const handleSave = () => {
    if (user) {
      login({ ...user, name, age: parseInt(age), gender, previousDiagnosis });
    }
    navigation.navigate('Home');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p1/1427153-fundo-liquido-moderno-azul-vetor.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.card}>
        <Text style={styles.logoText}>Neuro Tracker</Text>
        <Text style={styles.welcomeText}>Por favor, insira suas informações</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Idade"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={gender}
            style={styles.input}
            onValueChange={(itemValue: any) => setGender(itemValue)}
          >
            <Picker.Item label="Selecione o gênero" value="" />
            <Picker.Item label="Masculino" value="masculino" />
            <Picker.Item label="Feminino" value="feminino" />
            <Picker.Item label="Outro" value="outro" />
          </Picker>
          <Picker
            selectedValue={previousDiagnosis}
            style={styles.input}
            onValueChange={(itemValue: any) => setPreviousDiagnosis(itemValue)}
          >
            <Picker.Item label="Diagnóstico anterior?" value="" />
            <Picker.Item label="Sim" value="sim" />
            <Picker.Item label="Não" value="não" />
          </Picker>
        </View>
        <Button
          title="Salvar"
          onPress={handleSave}
          color="#457b9d"
        />
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

export default UserInfo;
