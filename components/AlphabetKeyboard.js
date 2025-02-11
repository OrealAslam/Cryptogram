import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

// Get screen dimensions
const { width } = Dimensions.get('window');

// QWERTY keyboard layout with isActive and isRepeating properties

const AlphabetKeyboard = ({ activeLetters, setletterpressed, changeIndex, rows }) => {
  const handleKeyPress = (key) => {
    setletterpressed(key);
  };

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((keyObj, keyIndex) => {
            const { letter, isActive, isRepeating } = keyObj;
            // console.log(letter, isActive, isRepeating)
            return (
              <TouchableOpacity
                key={keyIndex}
                disabled={!isActive}
                style={[
                  styles.key,
                  isActive && isRepeating
                    ? { backgroundColor: '#01A56B' }
                    : { backgroundColor: '#B0B0B0' },

                ]}
                onPress={() => handleKeyPress(letter)}
              >
                <Text
                  style={[
                    styles.keyText,
                    !isRepeating ? { color: '#000' } : { color: '#fff' },
                  ]}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <View style={[styles.row, { justifyContent: 'space-between' }]}>
        <TouchableOpacity onPress={() => changeIndex('prev')} style={styles.arrowBtn}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/images/icons/arrow.png')} />
        </TouchableOpacity>
        <View style={styles.spacebar}></View>
        <TouchableOpacity style={[styles.arrowBtn, { transform: [{ scaleX: -1 }] }]} onPress={() => changeIndex('next')}>
          <Image style={{ width: 24, height: 24 }} source={require('../assets/images/icons/arrow.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2
  },
  key: {
    width: width * 0.08, // Responsive key width
    height: width * 0.12, // Height for keys
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    borderRadius: 5,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
  },
  keyText: {
    fontSize: 18,
    fontWeight: '600',
  },
  arrowBtn: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#AEAEAE', alignItems: 'center', justifyContent: 'center' },
  spacebar: {
    width: '55%',
    height: 50,
    backgroundColor: '#DDDBDE'
  }
});
export default AlphabetKeyboard;