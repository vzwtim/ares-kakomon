import * as Notifications from 'expo-notifications';

export async function scheduleDailyReviewNotification() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;
  await Notifications.scheduleNotificationAsync({
    content: { title: '復習の時間です' },
    trigger: { seconds: 24 * 60 * 60, repeats: true },
  });
}
