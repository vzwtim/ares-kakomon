import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { questions } from '../data';
import { schedule, ReviewItem } from '@ares-kakomon/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Quiz'>;

export default function QuizScreen({ route, navigation }: Props) {
  const { unitId, questionIds } = route.params;
  const qlist = questionIds
    ? questions.filter((q) => questionIds.includes(q.id))
    : questions.filter((q) => q.unitId === unitId);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const current = qlist[index];

  const handleAnswer = async (answer: number | boolean) => {
    const correct = answer === current.answer;
    if (correct) setScore((s) => s + 1);
    const key = `review-${current.id}`;
    const json = await AsyncStorage.getItem(key);
    const item: ReviewItem = json
      ? JSON.parse(json)
      : {
          questionId: current.id,
          ease: 2.5,
          interval: 0,
          repetition: 0,
          due: new Date().toISOString(),
        };
    const updated = schedule(item, correct ? 5 : 2);
    await AsyncStorage.setItem(key, JSON.stringify(updated));
    setShowAnswer(true);
  };

  const next = () => {
    if (index + 1 < qlist.length) {
      setIndex(index + 1);
      setShowAnswer(false);
    } else {
      navigation.replace('Result', { score, total: qlist.length });
    }
  };

  return (
    <View>
      <Text>{current.prompt}</Text>
      {current.type === 'mc' ? (
        current.choices?.map((c, i) => (
          <Button
            key={i}
            title={c}
            onPress={() => handleAnswer(i)}
            disabled={showAnswer}
          />
        ))
      ) : (
        <>
          <Button
            title="○"
            onPress={() => handleAnswer(true)}
            disabled={showAnswer}
          />
          <Button
            title="×"
            onPress={() => handleAnswer(false)}
            disabled={showAnswer}
          />
        </>
      )}
      {showAnswer && (
        <View>
          <Text>
            {`正解: ${
              current.type === 'mc'
                ? current.choices?.[current.answer as number]
                : current.answer
                  ? '○'
                  : '×'
            }`}
          </Text>
          <Text>{current.explanation}</Text>
          <Button title="次へ" onPress={next} />
        </View>
      )}
    </View>
  );
}
