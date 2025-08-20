import Purchases from 'react-native-purchases';

export function initRevenueCat(apiKey: string) {
  if (apiKey) {
    Purchases.configure({ apiKey });
  }
}
