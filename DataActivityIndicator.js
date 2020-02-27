import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

DataActivityIndicator = () => {
    return(
    <View style={[styles.container]}>
        <View style={[styles.horizontal]}>
            <Text>Loading Data...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'column',
      alignItems: 'center'
    }
  })

export default DataActivityIndicator;