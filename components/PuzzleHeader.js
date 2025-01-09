import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function PuzzleHeader() {
    return (
        <View style={style.container}>
            <TouchableOpacity>
                <Image style={style.icon} source={require('../assets/images/setting.png')} />
            </TouchableOpacity>

            <TouchableOpacity>
                <Image style={style.icon} source={require('../assets/images/i-button.png')} />
            </TouchableOpacity>
        </View>
    );
}
const style = StyleSheet.create({
    container: {
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingBottom: 15
    },
    icon: {
        width: 30,
        height: 30
    }
});