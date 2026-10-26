import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { I18nManager, useColorScheme } from 'react-native';
import { RecentToolsProvider } from '@/context/recent-tools';
import AppLaunchScreen from '@/components/AppLaunchScreen';
import { SettingsProvider, useSettings } from '@/context/settings';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = { initialRouteName: '(tabs)' };

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const [loaded, error] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });

  useEffect(()=>{ if(error) throw error; },[error]);
  useEffect(()=>{ if(loaded) SplashScreen.hideAsync(); },[loaded]);

  if(!loaded) return null;

  return <ThemeProvider value={scheme==='dark'?DarkTheme:DefaultTheme}>
    <SettingsProvider>
      <AppNavigator />
    </SettingsProvider>
  </ThemeProvider>;
}

function AppNavigator() {
  const { launchScreen } = useSettings();
  const [launchVisible, setLaunchVisible] = useState(launchScreen);

  useEffect(() => {
    if (launchScreen) setLaunchVisible(true);
    else setLaunchVisible(false);
  }, [launchScreen]);

  return (
    <RecentToolsProvider>
      <Stack screenOptions={{headerShown:false, gestureEnabled:true}}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="search" options={{presentation:'card'}} />
        <Stack.Screen name="settings" options={{presentation:'card'}} />
        <Stack.Screen name="services" options={{presentation:'card'}} />
        <Stack.Screen name="about" options={{presentation:'card'}} />
        <Stack.Screen name="tool/[id]" />
      </Stack>
      {launchVisible && <AppLaunchScreen onFinish={()=>setLaunchVisible(false)} />}
    </RecentToolsProvider>
  );
}
