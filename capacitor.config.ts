import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.twitter.ionic',
  appName: 'twitter',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
