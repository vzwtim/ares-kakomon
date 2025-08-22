import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../src/screens/NotFoundScreen';
import SubjectsScreen from '../src/screens/SubjectsScreen';
import UnitsScreen from '../src/screens/UnitsScreen';
import QuizScreen from '../src/screens/QuizScreen';
import ResultScreen from '../src/screens/ResultScreen';
import ReviewScreen from '../src/screens/ReviewScreen';
import { RootStackParamList } from '../src/screens/types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Subjects" component={SubjectsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Units" component={UnitsScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
