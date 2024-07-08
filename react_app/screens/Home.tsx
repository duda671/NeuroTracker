import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useAuth } from '../util/auth';

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p1/1427153-fundo-liquido-moderno-azul-vetor.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.card}>
        <Text style={styles.logoText}>Neuro Tracker</Text>
        <Text style={styles.welcomeText}>Bem-vindo(a), {user?.name}!</Text>
        <Button
          title="Iniciar Nova Triagem"
          onPress={() => navigation.navigate('Questionnaire')}
          color="#457b9d"
        />
        <Button
          title="Ver Relatórios"
          onPress={() => navigation.navigate('Report')}
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
  button: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default Home;
