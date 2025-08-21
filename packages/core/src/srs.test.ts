import { schedule } from './srs';
import { ReviewItem } from './types';

test('schedule increases interval on correct answers', () => {
  const base: ReviewItem = {
    questionId: '1',
    ease: 2.5,
    interval: 0,
    repetition: 0,
    due: new Date('2024-01-01').toISOString(),
  };
  const first = schedule(base, 5, new Date('2024-01-01'));
  expect(first.interval).toBe(1);
  const second = schedule(first, 5, new Date('2024-01-02'));
  expect(second.interval).toBe(6);
});
