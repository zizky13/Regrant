import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import LandingPage from './screens/LandingPage';
import SingIn from './screens/auth/SignIn';
import SignUp from './screens/auth/SignUp';
import LocationPermission from './screens/auth/LocationPermission';
import MainLayout from './screens/tabs/MainLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
  })

  useEffect(() => {
    async function hideSplashScreen() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    if (error) {
      throw error;
    }

    hideSplashScreen();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error ) return null;

  return (
    <QueryClientProvider client={new QueryClient()}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MainLayout' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="SignIn" component={SingIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LocationPermission" component={LocationPermission} />
          <Stack.Screen name="MainLayout" component={MainLayout} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor='#F1F1F1' style='dark'/>
    </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
