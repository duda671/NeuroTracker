import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: { userName: string, userId: string };
  // Adicione outros parâmetros de rota conforme necessário
  Assessment: undefined;
  History: undefined;
  Profile: undefined;
  Reports: { userId: string };
  Questionnaire: { userName: string };
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation, route }) => {
  const { userName, userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {userName}!</Text>
      <Button
        title="Iniciar Avaliação"
        onPress={() => navigation.navigate('Questionnaire', { userName })}
      />
      <Button
        title="Ver Relatórios"
        onPress={() => navigation.navigate('Reports', { userId })}
      />
      <Button
        title="Perfil"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
