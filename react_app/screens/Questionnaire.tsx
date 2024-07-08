import AnswerHistory from '@components/AnswerHistory';
import Question from '@components/Question';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

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
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p1/1427153-fundo-liquido-moderno-azul-vetor.jpg' }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.card}>
        <Text style={styles.title}>Questionário</Text>
        <Question
          question={questions[currentQuestion].text}
          options={questions[currentQuestion].options}
          onSelectOption={(option) => handleSelectOption(questions[currentQuestion].id, option)}
        />
        <View style={styles.navigation}>
          <TouchableOpacity style={[styles.button, styles.navButton]} onPress={handlePrevious} disabled={currentQuestion === 0}>
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
          {currentQuestion < questions.length - 1 ? (
            <TouchableOpacity style={[styles.button, styles.navButton]} onPress={handleNext}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.navButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <AnswerHistory answers={answers} questions={questions} />
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
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
    backgroundColor: '#457b9d',
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
