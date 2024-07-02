import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AnswerHistoryProps {
  answers: { [key: number]: string };
  questions: { id: number; text: string }[];
}

const AnswerHistory: React.FC<AnswerHistoryProps> = ({ answers, questions }) => {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>Answer History</Text>
      {questions.map((q) => (
        <View key={q.id} style={styles.answerItem}>
          <Text style={styles.answerText}>{q.text}: {answers[q.id] || 'Not answered'}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '100%',
    maxWidth: 600,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerItem: {
    marginBottom: 10,
  },
  answerText: {
    fontSize: 16,
  },
});

export default AnswerHistory;
