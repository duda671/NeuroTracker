import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Report: { report: string, userName: string };
  Home: { userName: string };
  // Adicione outros parâmetros de rota conforme necessário
};

type ReportScreenProps = StackScreenProps<RootStackParamList, 'Report'>;

const ReportScreen: React.FC<ReportScreenProps> = ({ navigation, route }) => {
  const { report, userName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório</Text>
      <Text style={styles.reportText}>{report}</Text>
      <Button title="Voltar para o Início" onPress={() => navigation.navigate('Home', { userName })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reportText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ReportScreen;
