import React from 'react';
import { FlatList, Button } from 'react-native';
import { units } from '../data';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Units'>;

export default function UnitsScreen({ route, navigation }: Props) {
  const { subjectId } = route.params;
  const filtered = units.filter((u) => u.subjectId === subjectId);
  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Button
          title={item.title}
          onPress={() => navigation.navigate('Quiz', { unitId: item.id })}
        />
      )}
    />
  );
}
