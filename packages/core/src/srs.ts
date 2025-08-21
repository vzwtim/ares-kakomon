import { ReviewItem } from './types';

export function schedule(
  item: ReviewItem,
  quality: 0 | 1 | 2 | 3 | 4 | 5,
  now = new Date(),
): ReviewItem {
  let { ease, interval, repetition } = item;
  if (quality < 3) {
    repetition = 0;
    interval = 1;
  } else {
    repetition += 1;
    if (repetition === 1) {
      interval = 1;
    } else if (repetition === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease);
    }
    ease = Math.max(
      1.3,
      ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02),
    );
  }
  const due = new Date(now.getTime() + interval * 86400000).toISOString();
  return { ...item, ease, interval, repetition, due };
}

export function dueToday(
  items: ReviewItem[],
  today = new Date(),
): ReviewItem[] {
  return items.filter((i) => new Date(i.due) <= today);
}
