import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Center,
  VStack,
  HStack,
  Radio,
  Button,
  Modal,
  Text,
  Box,
  Input,
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
  KeyboardAvoidingView,
} from "native-base";
import { get, ref, set } from "firebase/database";
import { auth, db } from "../../config";


const Adddevices = () => {
  const userId = auth.currentUser?.uid;
  const [showModal, setShowModal] = useState(false);
  const [id,setId] = useState('');
  const [pin,setPin] = useState('');
  const [deviceName,setDeviceName] = useState('');
  const [deviceType,setDeviceType] = useState('');

  const Dropdown = () => {
    return (
      <Center>
        <FormControl w="2xl" maxW="full" isRequired>
          <FormControl.Label>Choose Type</FormControl.Label>
          <Select
            selectedValue={deviceType}
            minWidth="200"
            accessibilityLabel="Choose Type"
            placeholder="Choose Type"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
            onValueChange={itemValue => setDeviceType(itemValue)}
          >
            <Select.Item label="Bulb" value="bulb" />
            <Select.Item label="Fan" value="fan" />
            <Select.Item label="AC" value="ac" />
            <Select.Item label="Tube Light" value="tubelight" />
            <Select.Item label="Cooler" value="cooler" />
            <Select.Item label="Other" value="other" />
          </Select>
          {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage> */}
        </FormControl>
      </Center>
    );
  };

const handleAddDevice = () => {
  get(ref(db,'devices/'+id)).then((snapshot) => {
    // console.log(snapshot.val())
    if(snapshot.val().userID === userId){
      set(ref(db,'devices/'+id+'/peripherals/'+deviceName),{
        pinNumber:pin,
        status:false,
        type:deviceType,
      }).then(() => setShowModal(false))
    }
    else{
      alert("This device is not configured for current user")
    }
  })
}


  return (
    <Center>
      <Button
        size="lg"
        style={styles.adddevice}
        onPress={() => setShowModal(true)}
      >
        Add Device
      </Button>
      <Modal
        style={styles.containerModal}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Content w="100%" maxWidth="360">
          <Modal.CloseButton />
          <Modal.Header>Add Device</Modal.Header>
          <Modal.Body>
          <KeyboardAvoidingView behavior="padding">
            <VStack space={3} style={styles.container}>
              <Input
                onChangeText={(text) => setId(text)}
                style={styles.inputfeilds}
                mx="3"
                placeholder="Device ID"
                w="100%"
              />
              <Input
                onChangeText={(text) => setPin(text)}
                style={styles.inputfeilds}
                mx="3"
                placeholder="Pin number"
                w="100%"
              />
              <Input
                onChangeText={(text) => setDeviceName(text)}
                style={styles.inputfeilds}
                mx="3"
                placeholder="Name"
                w="100%"
              />
              <Dropdown />
            </VStack>
            </KeyboardAvoidingView>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={styles.submitAddroom}
              flex="1"
              onPress={() => {
                handleAddDevice();
              }}
            >
              Add Device
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default function AddDevices() {
  return (
    <View>
      <Adddevices />
    </View>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    marginTop: 5,
  },

  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  inputfeilds: {},

  adddevice: {
    backgroundColor: "black",
    width: "90%",
    borderRadius: 15,
    height: 55,
    marginBottom: 5,
    elevation: 3,
  },

  submitAddroom: {
    backgroundColor: "#5B17EA",
  },
});
