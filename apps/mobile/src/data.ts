import { Subject, Unit, Question } from '@ares-kakomon/core';

export const subjects: Subject[] = [{ id: 's1', title: 'ダミー科目' }];

export const units: Unit[] = Array.from({ length: 5 }, (_, i) => ({
  id: `u${i + 1}`,
  subjectId: 's1',
  title: `ダミー単元${i + 1}`,
}));

export const questions: Question[] = Array.from({ length: 50 }, (_, i) => ({
  id: `q${i + 1}`,
  subjectId: 's1',
  unitId: `u${Math.floor(i / 10) + 1}`,
  type: i % 2 === 0 ? 'mc' : 'tf',
  prompt: `ダミー問題${i + 1}の本文`,
  choices:
    i % 2 === 0 ? ['選択肢A', '選択肢B', '選択肢C', '選択肢D'] : undefined,
  answer: i % 2 === 0 ? 0 : true,
  explanation: `ダミー問題${i + 1}の解説`,
}));
