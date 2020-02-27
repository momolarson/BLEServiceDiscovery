const INITIAL_STATE = {
  BLEList: [],
  connectedDevice: {},
  connectedDeviceServices: [],
  connectedServiceCharacteristics: [],
  selectedService: {},
  selectedCharacteristic: {},
  status: 'disconnected'
};

const BLEReducer = (state =INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_BLE':
      if(state.BLEList.some(device => device.id === action.device.id) || !action.device.isConnectable || action.device.name === null){
        return state;
      } else {
        const newBLE = [
              ...state.BLEList,
              action.device
            ]
         return {
           BLEList: newBLE,
           connectedDevice: state.connectedDevice,
           connectedDeviceServices: state.connectedDeviceServices,
           connectedServiceCharacteristics: state.connectedServiceCharacteristics,
           selectedService: state.selectedService,
           selectedCharacteristic: state.selectedCharacteristic,
           status: state.status
          };
      }
    case 'CONNECTED_DEVICE':
      return {
        BLEList: state.BLEList,
        connectedDevice: action.connectedDevice,
        connectedDeviceServices: state.connectedDeviceServices,
        connectedServiceCharacteristics: state.connectedServiceCharacteristics,
        selectedService: state.selectedService,
        selectedCharacteristic: state.selectedCharacteristic,
        status: state.status
       };
    case 'CONNECTED_CHARACTERISTICS':
      console.log("connected characteristics:",action)
      return {
        BLEList: state.BLEList,
        connectedDevice: state.connectedDevice,
        connectedDeviceServices: state.connectedDeviceServices,
        connectedServiceCharacteristics: action.connectedServiceCharacteristics,
        selectedService: state.selectedService,
        selectedCharacteristic: state.selectedCharacteristic,
        status: state.status
       };
    case 'CONNECTED_SERVICES':
       console.log("connected_services", action)
        return {
          BLEList: state.BLEList,
          connectedDevice: state.connectedDevice,
          connectedDeviceServices: action.connectedDeviceServices,
          connectedServiceCharacteristics: state.connectedServiceCharacteristics,
          selectedService: state.selectedService,
          selectedCharacteristic: state.selectedCharacteristic,
          status: state.status
         };
    case 'CHANGE_STATUS':
      return {
          BLEList: state.BLEList,
          connectedDevice: state.connectedDevice,
          connectedDeviceServices: state.connectedDeviceServices,
          connectedServiceCharacteristics: state.connectedServiceCharacteristics,
          selectedService: state.selectedService,
          selectedCharacteristic: state.selectedCharacteristic,
          status: action.status
         };
    case 'SELECTED_SERVICE':
      return {
        BLEList: state.BLEList,
        connectedDevice: state.connectedDevice,
        connectedDeviceServices: state.connectedDeviceServices,
        connectedServiceCharacteristics: state.connectedServiceCharacteristics,
        selectedService: action.selectedService,
        selectedCharacteristic: state.selectedCharacteristic,
        status: state.status
       };
       case 'SELECTED_CHARACTERISTIC':
        return {
          BLEList: state.BLEList,
          connectedDevice: state.connectedDevice,
          connectedDeviceServices: state.connectedDeviceServices,
          connectedServiceCharacteristics: state.connectedServiceCharacteristics,
          selectedService: state.selectedService,
          selectedCharacteristic: action.selectedCharacteristic,
          status: state.status
         };
    default:
      return state;
  }
};

export default BLEReducer;