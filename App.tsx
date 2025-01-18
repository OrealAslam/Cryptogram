import React, {useEffect} from 'react';
import Route from './routes/Route';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { enableFreeze } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';

enableFreeze(true);

const App = () => {

  useEffect(()=>{
    StatusBar.setHidden(true);
    setTimeout(() => {
      console.log('Hiding Splash Screen');
      SplashScreen.hide();
    }, 2000);
  },[]);
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;