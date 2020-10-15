import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import { Container, Header, Content, Footer } from 'native-base';
import BLE from './BLE';
import {connect} from 'react-redux';
import {connectDevice,startScan} from './actions';
import DataActivityIndicator from './DataActivityIndicator';


class BLEList extends Component {

  constructor(props){
    super(props);
    this.props.startScan();
  }

  handleClick = device => {
    this.props.connectDevice(device);
    this.props.navigation.navigate('BLEServices');
  }

  connectableString = item => {
    if (item.isConnectable) {
      return 'Tap to connect to: ' + item.name;
    } else {
      return item.name + ' is not connectable';
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <FlatList
          data={this.props.BLEList}
                renderItem={({ item }) => 
                <>
                <TouchableHighlight
                    onPress={() => this.handleClick(item)}
                    style={item.isConnectable ? styles.rowFront : styles.rowBack}
                    underlayColor={'#AAA'}
                >
                    <View>
                        <Text>
                            {this.connectableString(item)}
                        </Text>
                    </View>
                </TouchableHighlight>
                </>
                }
                keyExtractor={item => item.id.toString()}
                ListEmptyComponent={DataActivityIndicator}
            />
        

        <Footer>
          <BLE></BLE>
        </Footer>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
    BLEList : state.BLEs['BLEList']
  };
}

const mapDispatchToProps = dispatch => ({
  connectDevice: device => dispatch(connectDevice(device)),
  startScan: () => dispatch(startScan())
})

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'white',
      flex: 1,
  },
  standalone: {
      marginTop: 30,
      marginBottom: 30,
  },
  standaloneRowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      justifyContent: 'center',
      height: 50,
  },
  standaloneRowBack: {
      alignItems: 'center',
      backgroundColor: '#8BC645',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
  },
  backTextWhite: {
      color: '#FFF',
  },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#F00',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
  },
  backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },
  controls: {
      alignItems: 'center',
      marginBottom: 30,
  },
  switchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 5,
  },
  switch: {
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      paddingVertical: 10,
      width: Dimensions.get('window').width / 4,
  },
  trash: {
      height: 25,
      width: 25,
  },
});

export default connect(mapStateToProps,mapDispatchToProps)(BLEList);