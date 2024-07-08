import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { ProgressBar } from 'react-native-paper';
import axios from 'axios';

type RootStackParamList = {
  Report: { report: string, userName: string };
  Home: { userName: string };
  Questionnaire: { userName: string, userAge: string };
};

type QuestionnaireScreenProps = StackScreenProps<RootStackParamList, 'Questionnaire'>;

const questions = [
  { question: "A criança desfruta de ser balançada, saltar no joelho, etc.?", options: ["Sim", "Não"] },
  { question: "A criança interessa-se por outras crianças?", options: ["Sim", "Não"] },
  { question: "A criança gosta de subir em coisas, como escadas?", options: ["Sim", "Não"] },
  { question: "A criança gosta de brincar de esconde-esconde ou pega-pega?", options: ["Sim", "Não"] },
  { question: "A criança já fingiu, por exemplo, falar ao telefone ou cuidar de bonecas, fazer de conta?", options: ["Sim", "Não"] },
  { question: "A criança usa o dedo indicador para apontar, para pedir algo?", options: ["Sim", "Não"] },
  { question: "A criança usa o dedo indicador para apontar, para indicar interesse em algo?", options: ["Sim", "Não"] },
  { question: "A criança brinca com pequenos brinquedos (carros ou blocos) sem apenas colocá-los na boca?", options: ["Sim", "Não"] },
  { question: "A criança traz objetos para você mostrar a você?", options: ["Sim", "Não"] },
  { question: "A criança olha você nos olhos por mais de alguns segundos?", options: ["Sim", "Não"] },
  { question: "A criança já pareceu sensível a ruídos (por exemplo, cobrindo os ouvidos)?", options: ["Sim", "Não"] },
  { question: "A criança sorri em resposta ao seu rosto ou ao seu sorriso?", options: ["Sim", "Não"] },
  { question: "A criança imita você? (por exemplo, você faz uma cara, ela tenta imitar)", options: ["Sim", "Não"] },
  { question: "A criança responde quando você chama seu nome?", options: ["Sim", "Não"] },
  { question: "A criança olha para coisas que você está olhando?", options: ["Sim", "Não"] },
  { question: "A criança faz movimentos incomuns com os dedos perto dos olhos?", options: ["Sim", "Não"] },
  { question: "A criança caminha?", options: ["Sim", "Não"] },
  { question: "A criança olha para o rosto de outras pessoas?", options: ["Sim", "Não"] },
  { question: "A criança faz movimentos incomuns com os braços ou pernas?", options: ["Sim", "Não"] },
  { question: "A criança mostra interesse em brincadeiras de faz de conta ou sociais?", options: ["Sim", "Não"] },
  { question: "A criança usa palavras para se comunicar?", options: ["Sim", "Não"] },
  { question: "A criança usa gestos comuns como acenar ou balançar a cabeça?", options: ["Sim", "Não"] },
  { question: "A criança busca atenção de forma apropriada?", options: ["Sim", "Não"] },
  { question: "A criança parece hiperativo, muito ativo?", options: ["Sim", "Não"] },
  { question: "A criança mostra medo ou ansiedade de maneira excessiva?", options: ["Sim", "Não"] },
];

const sendResponsesToApi = async (userName: string, userAge: string, responses: number[]) => {
  try {
    const response = await axios.post('http://localhost:5004/api/responses', {
      userName,
      userAge,
      responses,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar respostas:', error);
    throw error;
  }
};

const QuestionnaireScreen: React.FC<QuestionnaireScreenProps> = ({ navigation, route }) => {
  const { userName, userAge } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [responses, setResponses] = useState<number[]>([]);

  const handleNext = async () => {
    if (selectedOption) {
      const responseValue = selectedOption === "Sim" ? 1 : 0;
      const updatedResponses = [...responses, responseValue];
      setResponses(updatedResponses);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null); // Reseta a opção selecionada para a próxima pergunta
      } else {
        // Enviar respostas para a API e receber o relatório
        const report = await sendResponsesToApi(userName, userAge, updatedResponses);
        navigation.navigate('Report', { report, userName });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null); // Reseta a opção selecionada para a pergunta anterior
      setResponses(responses.slice(0, -1)); // Remove a última resposta
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questionário</Text>
      <View style={styles.progressBarContainer}>
        <ProgressBar progress={progress} style={styles.progressBar} />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
        {questions[currentQuestionIndex].options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selectedOption === option && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.navigation}>
        <Button title="Anterior" onPress={handlePrevious} disabled={currentQuestionIndex === 0} />
        <Button title="Próxima" onPress={handleNext} disabled={!selectedOption} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 20,
  },
  progressBar: {
    height: 8, // Ajuste a altura aqui
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  option: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '80%', // Ajuste a largura conforme necessário
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#c0c0c0',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default QuestionnaireScreen;
