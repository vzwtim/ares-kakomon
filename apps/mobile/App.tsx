import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SubjectsScreen from './src/screens/SubjectsScreen';
import UnitsScreen from './src/screens/UnitsScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultScreen from './src/screens/ResultScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import { RootStackParamList } from './src/screens/types';
import { initRevenueCat } from './src/lib/revenuecat';
import { scheduleDailyReviewNotification } from './src/lib/notifications';
import './src/lib/supabase';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    initRevenueCat(process.env.EXPO_PUBLIC_REVENUECAT_KEY || '');
    scheduleDailyReviewNotification();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Subjects">
        <Stack.Screen name="Subjects" component={SubjectsScreen} />
        <Stack.Screen name="Units" component={UnitsScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
