import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: { userName: string, userId: string };
  Assessment: undefined;
  History: undefined;
  Profile: undefined;
  Reports: { userId: string };
  Questionnaire: { userName: string };
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { userName, userId } = route.params;
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {userName}!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Questionnaire', { userName })}>
        <MaterialIcons name="playlist-add-check" size={24} color="#fff" style={styles.icon}/>
        <Text style={styles.buttonText}>Iniciar Avaliação</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reports', { userId })}>
        <MaterialIcons name="bar-chart" size={24} color="#fff" style={styles.icon}/>
        <Text style={styles.buttonText}>Ver Relatórios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#9c4dcc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '80%',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginLeft: -10,
  },
});

export default HomeScreen;
