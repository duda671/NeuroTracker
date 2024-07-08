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
        console.log(response);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
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
            <Text style={styles.reportText}>{item.report}</Text>
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
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  reportItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ReportsList;
