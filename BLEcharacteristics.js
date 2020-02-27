import React, {useState} from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, FlatList, StyleSheet, Text , TextInput,Button} from 'react-native';
import { writeCharacteristic} from './actions';
import DataActivityIndicator from './DataActivityIndicator';

function Item({ characteristic }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{characteristic.uuid}</Text>
        <Text style={styles.subtext}>Notifiable: {characteristic.isNotifiable.toString()}</Text>
        <Text style={styles.subtext}>Notifying: {characteristic.isNotifying.toString()}</Text>
        <Text style={styles.subtext}>Readable: {characteristic.isReadable.toString()}</Text>
        <Text style={styles.subtext}>Indicatable: {characteristic.isIndicatable.toString()}</Text>
        <Text style={styles.subtext}>Writeable with Response: {characteristic.isWritableWithResponse.toString()}</Text>
        <Text style={styles.subtext}>Writeable without Response: {characteristic.isWritableWithoutResponse.toString()}</Text>
        
      </View>
    );
  }

function handleClick (ReduxStore,text){
    ReduxStore.writeCharacteristic(text + '\n');
}

function BLEcharacteristic(ReduxStore) {

  const [text,setText] = useState({'text':'write something to device'});

    return(
        <SafeAreaView style={styles.container}>
          <Text>{ReduxStore.selectedCharacteristic.uuid}</Text>
            <FlatList
                data={[ReduxStore.selectedCharacteristic]}
                renderItem={({ item }) => 
                <>
                <Item characteristic={item} />
                <TextInput
                 onChangeText={(text) => setText({text})}
                  style={{ height: 40, color: 'black', borderColor: 'gray', borderWidth: 1 }}
                  value={text.text}
                />
                <Button
                  title="Write"
                  onPress={() => handleClick(ReduxStore,text.text)}
                ></Button>
                </>
                }
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={DataActivityIndicator}
            />
        </SafeAreaView>
    );
    }
//}

function mapStateToProps(state){
  return{
    selectedCharacteristic: state.BLEs.selectedCharacteristic,
  };
}

const mapDispatchToProps = dispatch => ({
  writeCharacteristic: text => dispatch(writeCharacteristic(text))
})

export default connect(mapStateToProps,mapDispatchToProps,null,{ forwardRef: true })(BLEcharacteristic);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 2,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 14,
    },
    subtext: {
        fontSize: 10,
      }
  });