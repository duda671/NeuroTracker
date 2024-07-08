import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import ReportsList from './ReportsList';

type RootStackParamList = {
  Home: { userName: string, userId: string };
  Reports: { userId: string };
};

type ReportsScreenProps = StackScreenProps<RootStackParamList, 'Reports'>;

const ReportsScreen: React.FC<ReportsScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Relatórios</Text>
      <ReportsList userId={userId} />
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home', { userName: '', userId })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default ReportsScreen;
