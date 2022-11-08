import {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import bg from './assets/bg.jpeg';

export default function App() {
  const [map, setMap]= useState([
    ['', '', ''], // 1st row
    ['', '', ''], // 2nd row
    ['', '', ''], // 3rd row
  ]);

  const [currentTurn, setCurrentTurn] = useState('x');

  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== "") {
      Alert.alert("Position already occupied");
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap]
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');
  };


  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.bg} resizeMode='contain'>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable onPress={() => onPress(rowIndex, columnIndex)} style={styles.cell}>
                  {cell === 'o' && <View style={styles.circle} />}
                  {cell === 'x' && (
                  <View style={styles.cross}>
                    <View style={styles.crossLine} />
                      <View 
                        style={[styles.crossLine, styles.crossLineReversed]} 
                      />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#242D34"
  },
  bg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    paddingTop: 15,
  },
  map: {
    width: '80%',
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    width: 100,
    height: 100,
    flex: 1,
  },
  circle: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

    borderWidth: 10,
    borderColor: "white",
  },
  cross: {
    flex: 1,
  },
  crossLine: {
    position: 'absolute',
    left: '48%',
    width: 10,
    height: "100%",
    backgroundColor: 'white',
    borderRadius: 5,
    transform: [{rotate: '45deg' }],
  },
  crossLineReversed: {
    transform: [{rotate: '-45deg' }],
  },
});
