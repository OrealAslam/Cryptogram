import OutlinedText from "@kdn0325/react-native-outlined-text";
import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
const { width, height } = Dimensions.get('screen');

export default function Statistics(props) {
    return (
        <View style={style.container}>
            <View style={style.mainContainer} showsVerticalScrollIndicator={false} scrollsToTop>
                <View style={style.header}>
                    <View style={{ width: '29%', backgroundColor: '#F0E6DF', top: '-50%', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 6, marginLeft: '35%', borderColor: '#000', borderWidth: 1 }}>
                        <OutlinedText
                            text={'Statistics'}
                            fontSize={14}
                            fontWeight={'500'}
                            outlineColor={'#000'}
                            shadowLine={1}
                            fontFamily='Supercell-Magic Regular'
                            customStyle={{ color: '#FFB002' }}
                        />
                    </View>

                    <TouchableOpacity onPress={()=>props.setshowstats(false)} style={style.closeBtn}>
                        <Image style={style.close} source={require('../assets/images/close.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={style.mainArea}>
                        <Text style={style.heading}>Summary</Text>
                        <View style={style.optionContainer}>
                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/iq-level.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>IQ Level</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>101</Text>
                                </View>
                            </View>

                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/level-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Level Completed</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>8</Text>
                                </View>
                            </View>

                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/first-try-win.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>First Try Win</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>4</Text>
                                </View>
                            </View>

                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/word-solved.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Word Solved</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>60</Text>
                                </View>
                            </View>

                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/letter-solved.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Letters Solved</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>190</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={style.mainArea}>
                        <Text style={style.heading}>Classic Mode</Text>
                        <View style={style.optionContainer}>
                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/level-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Levels Completed</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>8</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={style.mainArea}>
                        <Text style={style.heading}>Daily Challenges</Text>
                        <View style={style.optionContainer}>
                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/days-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Days Completed</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>0</Text>
                                </View>
                            </View>

                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/month-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Months Completed</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>0</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={style.mainArea}>
                        <Text style={style.heading}>Events</Text>
                        <View style={style.optionContainer}>
                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/event-level-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Event levels Completed</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>0</Text>
                                </View>
                            </View>

                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/chapter-completed.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Chapter Completed</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>0</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={style.mainArea}>
                        <Text style={style.heading}>Time</Text>
                        <View style={style.optionContainer}>
                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/best-time.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Best Time</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>01:52</Text>
                                </View>
                            </View>

                            <View style={style.optionRow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={style.icon} source={require('../assets/images/icons/average-time.png')} />
                                    <Text style={[style.optText, { fontSize: 14, marginLeft: 5 }]}>Average Time</Text>
                                </View>
                                <View>
                                    <Text style={style.optText}>05:54</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </View>
    )
}
const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: `rgba(0,0,0,0.5)`,
        position: 'absolute',
        zIndex: 1
    },
    mainContainer: {
        width: '100%',
        maxHeight: '90%',
        backgroundColor: '#F7F2EF',
        borderTopLeftRadius: 40,
        borderTopEndRadius: 40,
        flexDirection: 'column',
        marginTop: 'auto',
        paddingBottom: 20
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    close: {
        width: 33.4,
        height: 33.4
    },
    closeBtn: {
        marginLeft: 'auto',
        marginRight: '10%',
        top: '-50%'
    },
    mainArea: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 15
    },
    heading: {
        color: '#9E7285',
        fontSize: 16,
        fontWeight: '700'
    },
    optionContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginTop: 10
    },
    optionRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        width: 24,
        height: 24
    },
    optText: {
        color: '#9E7285',
        fontSize: 16,
        fontWeight: '700'
    }
});