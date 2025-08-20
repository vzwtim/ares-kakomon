import React from 'react';
import { View, Button, FlatList } from 'react-native';
import { subjects } from '../data';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Subjects'>;
};

export default function SubjectsScreen({ navigation }: Props) {
  return (
    <View>
      <Button
        title="今日の復習"
        onPress={() => navigation.navigate('Review')}
      />
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => navigation.navigate('Units', { subjectId: item.id })}
          />
        )}
      />
    </View>
  );
}
