import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';
import { Card, Button } from 'react-native-paper';


interface HomeProps {
  navigation: any;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.Text entering={BounceIn} style={styles.welcomeText}>
          Bem-vindo
        </Animated.Text>
      </View>
      <Card style={styles.card}>
        <Card.Content>
          <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => navigation.navigate('Screening')}
          >
            Iniciar triagem
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => navigation.navigate('Reports')}
          >
            Ver relatórios
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => navigation.navigate('Others')}
          >
            Outros
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 16,
  },
  header: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    width: '90%',
    borderRadius: 16,
    elevation: 4,
    padding: 16,
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonContent: {
    height: 60, 
    justifyContent: 'center',
    width: '100%',

  },
});


export default Home;
