import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { Subject, Unit, Question } from '@ares-kakomon/core';

type RawQuestion = Omit<Question, 'choices' | 'answer'> & {
  choices?: string;
  answer: string;
};

function loadCSV<T>(file: string): T[] {
  const text = fs.readFileSync(path.resolve(__dirname, file), 'utf8');
  return parse(text, { columns: true, skip_empty_lines: true }) as T[];
}

export const subjects: Subject[] = loadCSV<Subject>('../data/subjects.csv');

export const units: Unit[] = loadCSV<Unit>('../data/units.csv');

export const questions: Question[] = loadCSV<RawQuestion>(
  '../data/questions.csv'
).map((q) =>
  q.type === 'mc'
    ? { ...q, choices: q.choices?.split('|'), answer: Number(q.answer) }
    : { ...q, choices: undefined, answer: q.answer === 'true' }
);
