import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image
} from 'react-native';
import { trigger } from "react-native-haptic-feedback";
import AlphabetKeyboard from '../components/AlphabetKeyboard';
import { puzzleData } from '../Helper/dataOriginal';
import PlayGameHeader from '../components/PlayGameHeader';
import ErrorModal from '../components/ErrorModal';
import { get_async_data, incrementValue, options, set_async_data } from '../Helper/AppHelper';
import PuzzleHeader from '../components/PuzzleHeader';
import Settings from '../components/Settings';
const intitialRows = [
    [
        { letter: 'Q', isActive: true, isRepeating: false },
        { letter: 'W', isActive: true, isRepeating: false },
        { letter: 'E', isActive: true, isRepeating: false },
        { letter: 'R', isActive: true, isRepeating: false },
        { letter: 'T', isActive: true, isRepeating: false },
        { letter: 'Y', isActive: true, isRepeating: false },
        { letter: 'U', isActive: true, isRepeating: false },
        { letter: 'I', isActive: true, isRepeating: false },
        { letter: 'O', isActive: true, isRepeating: false },
        { letter: 'P', isActive: true, isRepeating: false }
    ],
    [
        { letter: 'A', isActive: true, isRepeating: false },
        { letter: 'S', isActive: true, isRepeating: false },
        { letter: 'D', isActive: true, isRepeating: false },
        { letter: 'F', isActive: true, isRepeating: false },
        { letter: 'G', isActive: true, isRepeating: false },
        { letter: 'H', isActive: true, isRepeating: false },
        { letter: 'J', isActive: true, isRepeating: false },
        { letter: 'K', isActive: true, isRepeating: false },
        { letter: 'L', isActive: true, isRepeating: false }
    ],
    [
        { letter: 'Z', isActive: true, isRepeating: false },
        { letter: 'X', isActive: true, isRepeating: false },
        { letter: 'C', isActive: true, isRepeating: false },
        { letter: 'V', isActive: true, isRepeating: false },
        { letter: 'B', isActive: true, isRepeating: false },
        { letter: 'N', isActive: true, isRepeating: false },
        { letter: 'M', isActive: true, isRepeating: false }
    ]
];

export default function PlayGame({ navigation }) {
    const [round, setRound] = useState('Round1'); // game round
    const [data, setData] = useState(puzzleData[round]); // puzzle sentence
    const [phrase, setPhrase] = useState(data); // puzzle sentence
    const [mistake, setmistake] = useState(0); // mistake count
    const [activeLetters, setActiveLetters] = useState([]); // contain all the missing letters of sentence
    const [letterpressed, setletterpressed] = useState(null); // pressed from keyboard
    const [correctletter, setcorrectletter] = useState(null); // correct letter for focused item
    const [focusId, setfocusId] = useState(null); // contains missing letter id/index to highlight it's BG
    const [errorModal, seterrorModal] = useState(false);
    const [settings, setsettings] = useState(false);
    const [letterOccur, seteletterOccur] = useState(null);
    const [rows, setRows] = useState(intitialRows);

    const filterKeyboardKeys = () => {
        const letters = phrase.filter((item) => item.isHidden).map((item) => item.alphabet); // all letters that are missing in phrase
        setActiveLetters([...new Set(letters)]);
    };

    useEffect(() => {
        filterKeyboardKeys();
    }, [round, phrase]);

    useEffect(() => {
        (async () => {
            if (letterpressed) {
                if (letterpressed === correctletter.alphabet) {
                    // locker logic start



                    // locker logic end

                    let updatedData = phrase.map(item =>
                        item.id === focusId ? { ...item, isHidden: false, isKey: false } : item
                    );
                    let prev_id = correctletter.id - 1;
                    let next_id = correctletter.id + 1;

                    if (prev_id >= 0 && prev_id < phrase.length) {
                        if (phrase[prev_id].isDoubleLocked) {
                            // Set isSingleLocked to false for the next item
                            updatedData = updatedData.map(item =>
                                item.id === next_id ? { ...item, isDoubleLocked: false } : item);
                        } else if (phrase[prev_id].isSingleLocked) {
                            // Set isSingleLocked to false for the previous item
                            updatedData = updatedData.map(item =>
                                item.id === prev_id ? { ...item, isSingleLocked: false } : item);
                        }

                    }

                    if (next_id < phrase.length) {
                        if (phrase[next_id].isDoubleLocked) {
                            // Set isSingleLocked to false for the next item
                            updatedData = updatedData.map(item =>
                                item.id === next_id ? { ...item, isDoubleLocked: false } : item);
                        } else if (phrase[next_id].isSingleLocked) {
                            // Set isSingleLocked to false for the next item
                            updatedData = updatedData.map(item =>
                                item.id === next_id ? { ...item, isSingleLocked: false } : item);
                        }

                    }



                    if (correctletter.isKey) {
                        await incrementValue()
                    }
                    // getting all the remaining occurences of letter pressed
                    var occurCount = updatedData.filter((item) => item.alphabet === letterpressed && item.isHidden).length;
                    if (occurCount > 0) {
                        // Check if letterpressed exists in rows

                        const updatedRows = rows.map(row =>
                            row.map(keyObj =>
                                keyObj.letter === letterpressed ? { ...keyObj, isRepeating: true } : keyObj
                            )
                        );

                        // Use `setRows` to update the state with the new `updatedRows`
                        setRows(updatedRows);

                    } else if (occurCount == 0) {
                        const updatedRows = rows.map(row =>
                            row.map(keyObj =>
                                keyObj.letter === letterpressed ? { ...keyObj, isRepeating: false, isActive: false } : keyObj
                            )
                        );
                        // Use `setRows` to update the state with the new `updatedRows`
                        setRows(updatedRows);

                        updatedData = phrase.map(item =>
                            item.alphabet === correctletter.alphabet ? { ...item, number: -3 } : item
                        );

                    }




                    setPhrase(updatedData);
                    seteletterOccur(occurCount);

                    setletterpressed(null);
                    setfocusId(null);
                    setcorrectletter(null);
                    filterKeyboardKeys();
                    changeIndex('next');


                } else {
                    if (mistake === 3) {
                        seterrorModal(true);
                    } else {
                        setmistake(mistake + 1);
                        trigger("notificationError", options);
                        setletterpressed(null);
                    }

                }

            }

        })()

    }, [letterpressed, phrase]);

    const changeIndex = (index) => {
        const currentIndex = phrase.findIndex(item => item.id === focusId);
        let newIndex = currentIndex;

        if (index === 'prev' && currentIndex > 0) {
            newIndex = currentIndex - 1;
        } else if (index === 'next' && currentIndex < data.length - 1) {
            newIndex = currentIndex + 1;
        }

        // Set focus to the next or previous item that is not shown
        while (newIndex >= 0 && newIndex < phrase.length && !phrase[newIndex].isHidden && !phrase[newIndex].isSingleLocked) {
            newIndex += (index === 'next' ? 1 : -1);
        }

        if (newIndex >= 0 && newIndex < phrase.length && phrase[newIndex].isHidden && !phrase[newIndex].isSingleLocked) {
            setfocusId(phrase[newIndex].id);
            setcorrectletter(phrase[newIndex]);
        }
    };

    const handlePress = (item) => {
        if (item.isHidden && !item.isSingleLocked && !item.isDoubleLocked) { // Only handle press if the item is not already shown
            setfocusId(item.id);
            setcorrectletter(item);
        }
    };

    const handleLocks = (item) => {
        if (item.isDoubleLocked) {
            return <Image style={{ width: 15, height: 24, position: 'absolute', zIndex: 3, top: '-60%', alignSelf: 'center' }} source={require('../assets/images/icons/lock.png')} />
        } else if (item.isSingleLocked) {
            return <Image style={{ width: 15, height: 24, position: 'absolute', zIndex: 3, top: '-60%', alignSelf: 'center' }} source={require('../assets/images/icons/lock.png')} />
        } else {
            return null;
        }
    }

    const renderPuzzle = () => {
        let content = [];
        let currentWord = [];

        phrase.forEach((item, index) => {
            if (item.alphabet === ' ' || item.number === 0) { // Handle space or special character as word separator
                if (currentWord.length > 0) {
                    content.push(
                        <View style={styles.wordContainer} key={`word-${index}`}>
                            {currentWord}
                        </View>
                    );
                    currentWord = [];
                }
                if (item.alphabet === ' ') {
                    content.push(<View style={styles.blankSpace} key={`space-${index}`} />);
                }
            } else {
                let letterElement = <></>
                if (item.number == -1) {
                    letterElement = (
                        <View key={`letter-${index}`}>
                            <Text>
                                {item.alphabet}
                            </Text>
                            <Text style={styles.number}></Text>
                        </View>
                    );
                } else if (item.number == -3) {
                    letterElement = (
                        <View style={{ width: 35, height: 50 }} key={`letter-${index}`}>
                            <Text style={[getLetterStyle, styles.textInput, { backgroundColor: 'transparent' }]}>
                                {item.alphabet}
                            </Text>
                            <Text style={styles.number}></Text>
                        </View>
                    );
                } else {
                    letterElement = (
                        <View style={{ width: 35, height: 50 }} key={`letter-${index}`}>
                            {handleLocks(item)}
                            {item.isKey && (<Image style={{ width: 21, height: 30, position: 'absolute', zIndex: 3, top: '-60%', alignSelf: 'center' }} source={require('../assets/images/icons/star.png')} />)}
                            <Text onPress={() => handlePress(item)} style={[getLetterStyle(item), { alignSelf: 'center' }]}>
                                {!item.isHidden || (focusId === item.id && letterpressed) ? item.alphabet : ''}
                            </Text>
                            {(item.isDoubleLocked || item.isSingleLocked ) ? (<Text style={{ fontSize: 13, textAlign: 'center', marginTop: 5 }}></Text>) : (<Text style={{ fontSize: 13, textAlign: 'center', marginTop: 5 }}>{item.number}</Text>)}
                        </View>
                    );
                }
                currentWord.push(letterElement);
            }
        });

        if (currentWord.length > 0) {
            content.push(
                <View style={styles.wordContainer} key="word-last">
                    {currentWord}
                </View>
            );
        }

        return content;
    };

    const getLetterStyle = (item) => ({
        ...styles.textInput,
        backgroundColor: item.isHidden && focusId === item.id ? '#FFB002' : !item.isHidden ? 'transparent' : '#fff',
        textAlign: 'center',
    });

    return (
        <>
            <SafeAreaView style={styles.container}>
                <PlayGameHeader mistake={mistake} round={round} />
                <View style={styles.puzzleArea}>
                    <PuzzleHeader />
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        {renderPuzzle()}
                    </ScrollView>
                </View>

                <View style={styles.keyboardArea}>
                    <AlphabetKeyboard activeLetters={activeLetters} setletterpressed={setletterpressed} changeIndex={changeIndex} rows={rows} />
                </View>


                {errorModal && <ErrorModal navigation={navigation} seterrorModal={seterrorModal} />}
                {settings && <Settings setsettings={setsettings}/>}
            </SafeAreaView>
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B5C6CE'
    },
    puzzleArea: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    scrollContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 30
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginRight: 20,
        marginBottom: 40, // Added margin to the bottom of each row
    },
    textInput: {
        height: 40,
        width: 30,
        fontSize: 23,
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 6,
        lineHeight: 40
    },
    blankSpace: {
        width: 10,
        height: 30,
    },
    keyboardArea: {
        width: '100%',
        backgroundColor: '#F6E3DD',
        paddingVertical: 12,
    },
});