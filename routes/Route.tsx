import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayGame from "../screens/PlayGame";
import Home from "../screens/Home";
import AppTour from "../screens/AppTour/AppTour";
const Stack = createNativeStackNavigator();

const Route = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
                <Stack.Screen name="AppTour" component={AppTour} options={{ headerShown: false}} />
                <Stack.Screen name="PlayGame" component={PlayGame} options={{headerTitle: ''}} />
            </Stack.Navigator>
        </>
    )
}
export default Route;