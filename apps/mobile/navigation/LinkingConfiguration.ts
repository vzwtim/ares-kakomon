import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../src/screens/types';

const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          // Define your tab screens here if you have bottom tabs
        },
      },
      NotFound: '*',
    },
  },
};

export default LinkingConfiguration;
