export type RootStackParamList = {
  Subjects: undefined;
  Units: { subjectId: string };
  Quiz: { unitId: string; questionIds?: string[] };
  Result: { score: number; total: number };
  Review: undefined;
  NotFound: undefined;
};

