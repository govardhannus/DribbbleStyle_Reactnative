import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DribbbleList from './Components/DribbbleList'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Dribbble Style app:</Text>
      <DribbbleList></DribbbleList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom:20,
    marginLeft:5,
    marginRight:5
  
    
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
});
