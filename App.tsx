import React, {useEffect} from 'react';
import Route from './routes/Route';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { enableFreeze } from 'react-native-screens';

enableFreeze(true);

const App = () => {

  useEffect(()=>{
    console.log('App started')
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