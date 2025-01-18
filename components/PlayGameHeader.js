import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

export default function PlayGameHeader({ mistake, round }) {
    // Limit mistake count to a maximum of 3
    if (mistake > 3) {
        mistake = 3;
    }

    return (
        <View style={styles.header}>
            <View style={[styles.column, { flexDirection: 'row' }]}>
                <Image
                    style={{ width: 34, height: 34 }}
                    source={require('../assets/images/OBJECTS.png')}
                />
                <TouchableOpacity>
                    <Image
                        style={{
                            width: 16.31,
                            height: 16.31,
                            position: 'absolute',
                            bottom: 0,
                            left: -10
                        }}
                        source={require('../assets/images/plus.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.column}>
                <Text style={styles.headerText}>Mistakes</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '45%',
                        alignSelf: 'center',
                        marginTop: 5
                    }}
                >
                    {mistake > 0 ? (
                        <>
                            {Array(mistake).fill().map((_, index) => (
                                <Image
                                    key={`miss-${index}`}
                                    style={{ width: 13.54, height: 13.54 }}
                                    source={require('../assets/images/icons/miss-hint.png')}
                                />
                            ))}
                            {Array(3 - mistake).fill().map((_, index) => (
                                <Image
                                    key={`heart-${index}`}
                                    style={{ width: 14, height: 11.67 }}
                                    source={require('../assets/images/icons/heart.png')}
                                />
                            ))}
                        </>
                    ) : (
                        Array(3).fill().map((_, index) => (
                            <Image
                                key={`heart-${index}`}
                                style={{ width: 14, height: 11.67 }}
                                source={require('../assets/images/icons/heart.png')}
                            />
                        ))
                    )}
                </View>
            </View>
            <View style={styles.column}>
                <Text style={[styles.headerText, { textAlign: 'right' }]}>
                    Level {round.split("Round")[1]}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
});