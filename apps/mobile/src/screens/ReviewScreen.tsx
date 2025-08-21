import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReviewItem, dueToday } from '@ares-kakomon/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

export default function ReviewScreen({ navigation }: Props) {
  const [dueIds, setDueIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const keys = await AsyncStorage.getAllKeys();
      const items: ReviewItem[] = [];
      for (const key of keys) {
        if (key.startsWith('review-')) {
          const item = await AsyncStorage.getItem(key);
          if (item) items.push(JSON.parse(item));
        }
      }
      const due = dueToday(items).map((i) => i.questionId);
      setDueIds(due);
    })();
  }, []);

  if (dueIds.length === 0) {
    return (
      <View>
        <Text>今日の復習はありません</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{`今日の復習: ${dueIds.length}問`}</Text>
      <Button
        title="開始"
        onPress={() =>
          navigation.navigate('Quiz', { unitId: '', questionIds: dueIds })
        }
      />
    </View>
  );
}
