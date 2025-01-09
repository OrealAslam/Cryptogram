import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    SafeAreaView,
    Pressable
} from 'react-native';

export default function ErrorModal({ navigation, seterrorModal }) {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <SafeAreaView style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                // backdropColor={`rgba(0,0,0,0.7)`}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>3 Mistakes restart Game</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => { seterrorModal(false); navigation.navigate('Home'); }}>
                            {/* onPress={() => setModalVisible(!modalVisible)}> */}
                            <Text style={styles.textStyle}>Restart Game</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `rgba(0,0,0,0.5)`
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});