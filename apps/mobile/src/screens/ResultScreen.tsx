import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route, navigation }: Props) {
  const { score, total } = route.params;
  return (
    <View>
      <Text>{`成績: ${score}/${total}`}</Text>
      <Button title="戻る" onPress={() => navigation.navigate('Subjects')} />
    </View>
  );
}
