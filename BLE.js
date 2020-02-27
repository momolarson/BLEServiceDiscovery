import React from 'react';
import { connect } from 'react-redux';
import { Container, Text} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SegmentedControlIOSComponent } from 'react-native';

class BLE extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return ( 
            <Container>
                <Text>
                    Status: {this.props.status} 
                </Text>
                {this.props.connectedDevice && <Text>Device: {this.props.connectedDevice.name}</Text>}
            </Container>
        );
    }
}

function mapStateToProps(state){
  return{
    BLEList : state.BLEs.BLEList,
    connectedDevice: state.BLEs.connectedDevice,
    status: state.BLEs.status
  };
}

const mapDispatchToProps = dispatch => ({
  addBLE: device => dispatch(addBLE(device))
})

export default connect(mapStateToProps,mapDispatchToProps,null,{ forwardRef: true })(BLE);