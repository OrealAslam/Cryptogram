import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Vibration,
    SafeAreaView,
} from 'react-native';
import { trigger } from "react-native-haptic-feedback";
import AlphabetKeyboard from '../components/AlphabetKeyboard';
import { puzzleData } from '../Helper/data';
import PlayGameHeader from '../components/PlayGameHeader';
import ErrorModal from '../components/ErrorModal';
import { options, playSound } from '../Helper/AppHelper';
import PuzzleHeader from '../components/PuzzleHeader';


export default function PlayGame({ navigation }) {
    const [round, setRound] = useState('Round1'); // game round
    const [data, setData] = useState(puzzleData[round]); // puzzle sentence
    const [mistake, setmistake] = useState(0); // mistake count
    const [activeLetters, setActiveLetters] = useState([]); // contain all the missing letters of sentence
    const [letterpressed, setletterpressed] = useState(null); // pressed from keyboard
    const [correctletter, setcorrectletter] = useState(null); // pressed from keyboard
    const [focusId, setfocusId] = useState(null); // contains missing letter id/index to highlight it's BG
    const [errorModal, seterrorModal] = useState(false);

    const renderItem = ({ item }) => {
        if (item.letter === '*') {
            // Skip rendering for blank spaces
            return <View style={{ width: 50, height: 30 }}></View>;
        }

        return (
            <View style={styles.itemContainer}>
                {item.show ? (
                    <Text style={styles.letter}>{item.letter}</Text>
                ) : (
                    <Text
                        onPress={() => {
                            setfocusId(item.id);
                            setcorrectletter(item.letter);
                        }}
                        style={[
                            styles.textInput,
                            focusId == item.id ? { backgroundColor: '#FFB002' } : {}
                        ]}
                    >
                        {letterpressed != null && focusId == item.id ? letterpressed : null}
                    </Text>
                )}
                <Text style={styles.number}>{item.number}</Text>
            </View>
        );
    };

    const filterKeyboardKeys = () => {
        const letters = data
            .filter((item) => !item.show)
            .map((item) => item.letter);
        const uniqueLetters = [...new Set(letters)];
        setActiveLetters(uniqueLetters);
    };

    useEffect(() => {
        filterKeyboardKeys();
    }, [round]);

    useEffect(() => {
        // check weather letterpressed is correct or not
        // if letterpressed is correct next index / next level
        // if letterpressed is incorrect increment mistake count
        if (letterpressed != null) {
            if (letterpressed === correctletter) {
                // Find the index of the object to update
                const updatedData = data.map(item => {
                    if (item.id === focusId) {
                        return { ...item, show: true }; // Update the `show` key
                    }
                    return item;
                });
                // Update the puzzle data for the current round
                setData(updatedData);

                // Reset necessary states for the next step
                setletterpressed(null);
                setfocusId(null);
                setcorrectletter(null);

                // Optionally refresh the active letters for the keyboard
                filterKeyboardKeys();
            } else {
                if (mistake === 3) {
                    seterrorModal(true);
                    // playSound('tu-mera-putr-choti-kr.mp3');
                } else {
                    setmistake(mistake + 1);
                    trigger("notificationError", options)
                    setletterpressed(null);
                    // playSound('a-tere-mun-vich-lul.mp3');
                }
            }
        }
    }, [letterpressed]);

    const changeIndex = (index) => {
        const currentIndex = data.findIndex(item => item.id === focusId);

        if (index === 'prev') {
            // Find the previous unsolved item
            for (let i = currentIndex - 1; i >= 0; i--) {
                if (!data[i].show) {
                    setfocusId(data[i].id);
                    setcorrectletter(data[i].letter);
                    return;
                }
            }
            console.log('No previous unsolved items.');
        }

        if (index === 'next') {
            // Find the next unsolved item
            for (let i = currentIndex + 1; i < data.length; i++) {
                if (!data[i].show) {
                    setfocusId(data[i].id);
                    setcorrectletter(data[i].letter);
                    return;
                }
            }
            console.log('No next unsolved items.');
        }
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <PlayGameHeader mistake={mistake} round={round} />

                {/* Puzzle Area */}
                <View style={styles.puzzleArea}>
                    <PuzzleHeader />
                    
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        contentContainerStyle={styles.container}
                        numColumns={5}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                {/* Keyboard Area */}
                <View style={styles.keyboardArea}>
                    <AlphabetKeyboard activeLetters={activeLetters} setletterpressed={setletterpressed} changeIndex={changeIndex} />
                </View>
            </SafeAreaView>

            {errorModal && (<ErrorModal navigation={navigation} seterrorModal={seterrorModal} />)}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#B5C6CE',
        padding: 10
    },
    puzzleArea: {
        flex: 1,
        backgroundColor: '#B5C6CE',
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemContainer: {
        alignItems: 'center',
        margin: 5,
        width: 50
    },
    letter: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    number: {
        fontSize: 14,
        textAlign: 'center'
    },
    textInput: {
        height: 30,
        width: 30,
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#fff',
        borderRadius: 8
    },
    blankSpace: {
        height: 30,
        width: 30
    },
    keyboardArea: {
        width: '100%',
        paddingVertical: 12,
        backgroundColor: '#F6E3DD',
        marginTop: 'auto'
    }
});