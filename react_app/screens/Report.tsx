import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ReportProps {
  route: any;
}

const Report: React.FC<ReportProps> = ({ route }) => {
  const { answers } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report</Text>
      {Object.keys(answers).map((key) => (
        <View key={key} style={styles.answerItem}>
          <Text style={styles.answerText}>Question {key}: {answers[key]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  answerItem: {
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
  },
});

export default Report;
