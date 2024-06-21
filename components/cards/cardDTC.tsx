import { View, Text } from '../Themed';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const CardDTC = () => {
    const [dtcError , setDTCError] = useState(0);
    const [strong,setString]=useState("w")
  return (
    <View style={{flex:1, flexDirection:'row'}}>
        <LinearGradient  style={dtcError==0?styles.container:styles.containerRED} colors={dtcError==0?['rgba(0,255,0,0.5)','rgba(0,255,0,0.1)']:['rgba(255,0,0,0.5)','rgba(255,0,0,0.1)']}>
      <Text style={styles.title}>{dtcError==0?'Your Car is Safe :)':'Your Car is UNSAFE!! D:'}</Text>
      <Text style={styles.info}>{'DTC Errors : ' + dtcError}</Text>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        shadowColor: "#000",
        height:120,
        margin:9,
        borderColor:'rgb(0,128,0)',
        borderStyle:'solid',
        borderWidth:2,
        flex:1
    },
    containerRED:{
        borderRadius:10,
        shadowColor: "#000",
        height:120,
        margin:9,
        borderColor:'rgb(128,0,0)',
        borderStyle:'solid',
        borderWidth:2,
        flex:1
    },
    title:{
        padding:10,
        fontSize:30
    },
    info:{
        padding:10,
        fontSize:18
    }
});

export default CardDTC