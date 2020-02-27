import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, FlatList, StyleSheet, Text,TouchableHighlight } from 'react-native';
import {selectedService,getServiceCharacteristics} from './actions';
import DataActivityIndicator from './DataActivityIndicator';

function Item({ service }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{service.uuid}</Text>
        <Text style={styles.subtextss}>Primary: {service.isPrimary.toString()}</Text>
      </View>
    );
  }

function handleClick (BLEServices,serviceId){
    BLEServices.selectedService(serviceId);
    BLEServices.navigation.navigate('BLECharacteristics');
}

function BLEservices(BLEServices) {
    return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={BLEServices.connectedDeviceServices}
                renderItem={({ item }) => 
                <TouchableHighlight
                    onPress={() => handleClick(BLEServices,item)}
                    style={styles.rowFront}
                    underlayColor={'#AAA'}
                >
                    <Item service={item} />
                    </TouchableHighlight>
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
    connectedDeviceServices:state.BLEs.connectedDeviceServices
  };
}

const mapDispatchToProps = dispatch => ({
    selectedService: service => dispatch(selectedService(service))
})

export default connect(mapStateToProps,mapDispatchToProps,null,{ forwardRef: true })(BLEservices);

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
      },
  });