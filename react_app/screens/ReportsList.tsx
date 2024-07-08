import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import axios from 'axios';

interface Report {
  id: string;
  report: string;
}

interface ReportsListProps {
  userId: string;
}

const ReportsList: React.FC<ReportsListProps> = ({ userId }) => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`http://localhost:5004/api/reports/${userId}`);
        console.log(response)
        setReports(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os relatórios.');
      }
    };

    fetchReports();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatórios</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportItem}>
            <Text>{item.report}</Text>
          </View>
        )}
      />
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
  reportItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default ReportsList;
