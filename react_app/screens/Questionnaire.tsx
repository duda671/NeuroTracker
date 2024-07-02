import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Question from '../components/Question';
import AnswerHistory from '../components/AnswerHistory';


interface QuestionnaireProps {
  navigation: any;
}

interface QuestionType {
  id: number;
  text: string;
  options: string[];
}

const questions: QuestionType[] = [
  { id: 1, text: 'Question 1?', options: ['Yes', 'No'] },
  { id: 2, text: 'Question 2?', options: ['Yes', 'No'] },
  // Adicione mais perguntas conforme necessário
];

const Questionnaire: React.FC<QuestionnaireProps> = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleSelectOption = (questionId: number, option: string) => {
    setAnswers({
      ...answers,
      [questionId]: option,
    });
  };

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    navigation.navigate('Report', { answers });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Questionnaire</Text>
        <Question
          question={questions[currentQuestion].text}
          options={questions[currentQuestion].options}
          onSelectOption={(option) => handleSelectOption(questions[currentQuestion].id, option)}
        />
        <View style={styles.navigation}>
          <TouchableOpacity style={[styles.button, styles.navButton]} onPress={handlePrevious} disabled={currentQuestion === 0}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          {currentQuestion < questions.length - 1 ? (
            <TouchableOpacity style={[styles.button, styles.navButton]} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.navButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <AnswerHistory answers={answers} questions={questions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6a11cb',
    padding: 20,
  },
  formWrapper: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 600,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  navButton: {
    backgroundColor: '#2575fc',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Questionnaire;