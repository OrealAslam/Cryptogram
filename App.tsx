import React, {useEffect} from 'react';
import Route from './routes/Route';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { enableFreeze } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

enableFreeze(true);

const App = () => {

  useEffect(()=>{
    setTimeout(() => {
      console.log('Hiding Splash Screen');
      SplashScreen.hide();
    }, 3000);
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