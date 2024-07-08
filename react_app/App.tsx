import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '@screens/WelcomeScreen';
import LoginScreen from '@screens/LoginScreen';
import SignupScreen from '@screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import QuestionnaireScreen from '@screens/QuestionnaireScreen';
import ReportScreen from './screens/ReportScreen';
import ReportsList from '@screens/ReportsList';
import ReportsScreen from '@screens/ReportsScreen';

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Home: { userName: string, userId: string };
  Assessment: undefined;
  History: undefined;
  Profile: undefined;
  Questionnaire: { userName: string, userAge: string };
  Report: { report: string, userName: string };
  Reports: { userId: string }; 
};


const Stack = createStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
