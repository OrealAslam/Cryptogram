import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import OutlinedText from '@kdn0325/react-native-outlined-text';
import AlphabetKeyboard from '../components/AlphabetKeyboard';

const { width, height } = Dimensions.get('screen');

export default function PlayGame(navigation) {
    const [orignalstr, setorignalstr] = useState('I am a software engineer in PlanCare');
    const [str, setstr] = useState([]);
    const [puzzlestr, setpuzzlestr] = useState([]); // HOLDING PUZZLE STRING

    const markPuzzleArea = (index, string) => {
        const strArray = string.split('');
        strArray[index] = '_';
        return strArray.join('');
    }

    const generate_puzzle = () => {
        let puzzleArray = [];
        str.map((element) => {
            if (element.length > 1) {
                let randamIndex = Math.round(Math.random() * (element.length - 1));
                // OVER-WRITE ELEMENT INDEX HERE
                puzzleArray.push(markPuzzleArea(randamIndex, element));
            }
        });
        setpuzzlestr(puzzleArray);
        return puzzleArray;
    }

    useEffect(() => {
        let string = orignalstr.toUpperCase().split(' ');
        setstr(string);
        generate_puzzle();
      }, [orignalstr]);

    return (
        <SafeAreaView style={style.container}>
            <View style={style.header}>
                <View style={[style.column, { flexDirection: 'row' }]}>
                    <Image style={{ width: 34, height: 34 }} source={require('../assets/images/OBJECTS.png')} />
                    <TouchableOpacity>
                        <Image style={{ width: 16.31, height: 16.31, position: 'absolute', bottom: 0, left: -10 }} source={require('../assets/images/plus.png')} />
                    </TouchableOpacity>
                </View>

                <View style={style.column}>
                    <Text style={style.headerText}>Mistakes</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '45%', alignSelf: 'center', marginTop: 5 }}>
                        <Image style={{ width: 13.54, height: 13.54 }} source={require('../assets/images/icons/miss-hint.png')} />
                        <Image style={{ width: 14, height: 11.67 }} source={require('../assets/images/icons/heart.png')} />
                        <Image style={{ width: 14, height: 11.67 }} source={require('../assets/images/icons/heart.png')} />
                    </View>
                </View>

                <View style={style.column}>
                    <Text style={[style.headerText, { textAlign: 'right' }]}>Level 5</Text>
                </View>
            </View>
            <View style={style.content}>
                <TouchableOpacity>
                    <Image style={{ width: 28, height: 28 }} source={require('../assets/images/setting.png')} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image style={{ width: 28.36, height: 28.36 }} source={require('../assets/images/i-button.png')} />
                </TouchableOpacity>

            </View>


            <View style={style.puzzleArea}>
                <Text style={style.puzzleText}>{puzzlestr.join('  ')}</Text>
            </View>

            <View style={style.keyboardArea}>
                <AlphabetKeyboard />
            </View>
        </SafeAreaView>
    )
}
const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#B0B0B0',
        padding: 10
    },
    header: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    column: {
        width: '33%',
        flexDirection: 'column'
    },
    headerText: {
        fontSize: 14,
        color: '#D7AD94',
        fontWeight: '700',
        textAlign: 'center'
    },
    content: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    puzzleArea: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    puzzleText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    keyboardArea: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: '#F6E3DD',
        verticalAlign: 'bottom',
        marginTop: 'auto'
    }
});