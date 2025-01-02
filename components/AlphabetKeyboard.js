import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// Get screen dimensions
const { width } = Dimensions.get('window');

// QWERTY keyboard layout
const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const AlphabetKeyboard = () => {

  const handleKeyPress = (key) => {
    console.log(`Pressed: ${key}`);
  };

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, keyIndex) => (
  
            <TouchableOpacity
              key={keyIndex}
              style={[styles.key, keyIndex%4 == 0 ? {backgroundColor: '#DDDBDE'} : {backgroundColor: '#01A56B'}]}
              onPress={() => handleKeyPress(key)}
            >
              <Text style={[styles.keyText, keyIndex%4 == 0 ? {color: '#B0B0B0'} : {color: '#fff'}]}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  key: {
    width: width * 0.08, // Responsive key width
    height: width * 0.12, // Height for keys
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 5,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow || iOS shadow
    // shadowOpacity: 0.2,
    // shadowOffset: { width: 2, height: 2 },
  },
  keyText: {
    fontSize: 18,
    fontWeight: '600'
  },
});

export default AlphabetKeyboard;
