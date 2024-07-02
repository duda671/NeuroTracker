import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionProps {
  question: string;
  options: string[];
  onSelectOption: (option: string) => void;
}

const Question: React.FC<QuestionProps> = ({ question, options, onSelectOption }) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option) => (
        <TouchableOpacity key={option} style={styles.optionButton} onPress={() => onSelectOption(option)}>
          <Text style={styles.optionButtonText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    width: '100%',
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  optionButton: {
    width: '100%',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Question;
