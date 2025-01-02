import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayGame from "../screens/PlayGame";
import StartGame from "../screens/StartGame";
const Stack = createNativeStackNavigator();

const Route = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="StartGame" component={StartGame} />
                <Stack.Screen name="PlayGame" component={PlayGame} />
            </Stack.Navigator>
        </>
    )
}
export default Route;