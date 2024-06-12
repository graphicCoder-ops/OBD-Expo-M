import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function login() {
  return (
    <View>
      <Text style={styles.test} >login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    test:{
        color:'white'
    }
})