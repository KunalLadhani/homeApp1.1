import { StyleSheet, Text, View, ScrollView, Image,KeyboardAvoidingView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Center, CheckIcon, Flex, FormControl, Input, Modal, Select, VStack, WarningOutlineIcon, Switch } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { ref, child, get, set, push, onValue, update, remove } from "firebase/database";
import { auth,db } from "../config";
import AddDevices from "./components/AddDevices";
import { signOut } from "firebase/auth";

export default function Dashboard( {navigation}: any ) {
  const userId = auth.currentUser?.uid;
  const dbRef = ref(db);
  const [showModal, setShowModal] = useState(false);
  const [room,setRoom] = useState<any[]>([]);
  const [name,setName] = useState('');
  const [id,setId] = useState('');
  const [device,setDevice] = useState<any[]>([]);
  const [isEnabled,setIsEnabled] = useState(false);
  const [roomType,setRoomType] = useState('');
  const [roomTitle,setRoomTitle] = useState<any>()
  const [roomSwitchId,setRoomSwitchId] = useState<any>()
  const [userName, setUserName] = useState('')

const allDeviceOn = ({roomSwitchId}) => {
  const deviceRef = ref(db, 'devices/' + roomSwitchId + '/peripherals');
  get(deviceRef).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      update(ref(db,'devices/' + roomSwitchId + '/peripherals/'+ childSnapshot.key),
      {
        status:true
      })
    });
  });
};

const allDeviceOff = ({roomSwitchId}) => {
  const deviceRef = ref(db, 'devices/' + roomSwitchId + '/peripherals');
  get(deviceRef).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      update(ref(db,'devices/' + roomSwitchId + '/peripherals/'+childSnapshot.key),
      {
        status:false
      })
    });
  });
};

  const fetchDevice = async ({device,name}) => {
    const deviceRef = ref(db, 'devices/' + device + '/peripherals');
      onValue(deviceRef, (snapshot) => {
        const data: any[] = [];
        snapshot.forEach((childSnapshot) => {
          const deviceName= childSnapshot.key;
          const deviceStatus: boolean = childSnapshot.val().status;
          const type = childSnapshot.val().type;
          data.push({
            ...childSnapshot.val(),deviceName,device,deviceStatus,type
          });
        });
        setDevice(data);
        setRoomTitle(name);
        setRoomSwitchId(device);
      });
  };

  const Dropdown = () => {
    return (
      <Center>
        <FormControl w="2xl" maxW="full" isRequired>
          <FormControl.Label>Choose Type</FormControl.Label>
          <Select
            selectedValue={roomType}
            minWidth="200"
            accessibilityLabel="Choose Type"
            placeholder="Choose Type"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
            onValueChange={itemValue => setRoomType(itemValue)}
          >
            <Select.Item label="Bedroom" value="bedroom" />
            <Select.Item label="Living Room" value="livingroom" />
            <Select.Item label="Kitchen" value="kitchen" />
            <Select.Item label="Dining Room" value="diningroom" />
            <Select.Item label="Bathroom" value="bathroom" />
          </Select>
          {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage> */}
        </FormControl>
      </Center>
    );
  };

  const deleteRoom = ({device}) => {
    Alert.alert("Alert","Are you sure you want to Delete ?",[
      {
        text: "Cancel"
      },
      {
        text: "Delete",
        onPress: async() => {
          let roomId :any= ""
          onValue(ref(db,'users/'+userId+'/rooms/'), (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              if(childSnapshot.val().id === device){
                roomId = childSnapshot.key
              }
            })
          })

          remove(ref(db,'devices/'+device+'/peripherals')).then(() => {
            remove(ref(db,'devices/'+device+'/userID'))}).then(() => {
              update(ref(db,'devices/'+device),{
                name:""
              })
            })
            .then(() =>{
              remove(ref(db, 'users/'+userId+'/rooms/'+roomId))
          })
          
        }
      }
    ],
    {
      cancelable: true
    })
  };

  const Cards = ({name,device,roomtype}) => {
    const fetchSource = ({roomtype}) => {
      switch (roomtype) {
        case 'bedroom':
          return(
            require("./assets/bedroom.png")
          );
          break;
        case 'diningroom':
          return(
            require("./assets/diningroom.png")
          );
          break;
        case 'livingroom':
          return(
            require("./assets/livingroom.png")
          );
          break;
        case 'kitchen':
          return(
            require("./assets/kitchen.png")
          );
          break;
        case 'bathroom':
          return(
            require("./assets/bathroom.png")
          );
          break;
        default:
          break;
      }
    }
    return(
      <TouchableOpacity 
      onPress={() => fetchDevice({device,name})}
      // onPress={() => combinedFunc({device})} 
      onLongPress={() => deleteRoom({device})}
      >
         <View style={[styles.cardelevated, styles.cards]}>
              <View style = {styles.cardimagebox}>
              <Image
                style={styles.addlogo}
                source={fetchSource({roomtype})}
              />
              </View>
              <Text style={styles.cardText}>{name}</Text>
         </View> 
      </TouchableOpacity>
    );
  };

const handleSignOut = () => {
  Alert.alert("Sign Out","Are you sure you want to Sign Out ?",[
    {
      text: "Cancel"
    },
    {
      text: "Sign Out",
      onPress: () => {
        signOut(auth)
      }
    }
  ],
  {
    cancelable: true
  })
}

  const handleSwitch = ({deviceId,name}) => {
    const statusRef = ref(db, 'devices/'+deviceId+'/peripherals/'+name);
    if(isEnabled)
    {
      update(statusRef,{
        status:false
      })
      setIsEnabled(false);
    }
    else{
      update(statusRef,{
        status:true
      })
      setIsEnabled(true)
    }
  };

  const deleteDevice = ({deviceId,name}) => {
    Alert.alert("Alert","Are you sure you want to Delete ?",[
      {
        text: "Cancel"
      },
      {
        text: "Delete",
        onPress: async() => {
          remove(ref(db,'devices/'+deviceId+'/peripherals/'+name))
        }
      }
    ],
    {
      cancelable: true
    })
  };

  type deviceProps = {
    name: any;
    deviceId: any;
    deviceState: boolean;
    deviceType: any;
  }
  const DeviceCards = (props: deviceProps) => {
    const deviceId = props.deviceId
    const name = props.name
    const deviceState = props.deviceState
    const type = props.deviceType
    const fetchSource = ({type}) => {
      switch (type) {
        case 'bulb':
          return(
            require("../assets/images/bulb.png")
          );
          break;
        case 'ac':
          return(
            require("../assets/images/ac.png")
          );
          break;
        case 'cooler':
          return(
            require("../assets/images/cooler.png")
          );
          break;
        case 'fan':
          return(
            require("../assets/images/fan.png")
          );
          break;
        case 'tubelight':
          return(
            require("../assets/images/tubelight.png")
          );
          break;
        case 'other':
          return(
            require("../assets/images/ellipse.png")
          );
          break;
        default:
          break;
      }
    }
    return(
      <TouchableOpacity onLongPress={() => deleteDevice({deviceId,name})}>
      <View style={styles.cardDevices}>
      <Image
        style={styles.tinyLogo}
        source={fetchSource({type})}
        alt="Alternate Text"
      />
      
      <Text style={styles.deviceCardText}>{name}</Text>
      <Switch
        size="lg"
        onValueChange={() => handleSwitch({deviceId,name})}
        value={deviceState}
        style={styles.switches}
        thumbColor={isEnabled? "indigo.500" : "indigo.50"}
        trackColor={{false:"indigo.100",true:"indigo.200"}}
      />
    </View>
    </TouchableOpacity>
    );
  };

  useEffect(() => {
    const roomsRef = ref(db, 'users/' + userId + '/rooms');
    onValue(roomsRef, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach((childSnapshot) => {
        const deviceID = childSnapshot.val().id;
        const roomName = childSnapshot.val().name;
        const type = childSnapshot.val().type;
        // let roomName: any = ""
        // onValue(ref(db,'devices/'+deviceID), (nameSnapshot) => {
        //   roomName = nameSnapshot.val().name;
        // });
        data.push({
          ...childSnapshot.val(),roomName,deviceID,type
        });
      });
      setRoom(data);
      onValue(ref(db, '/users/' + userId), (snapshot) => {
        setUserName(snapshot.val().name);
      });
    });
  },[]);

  const handleAddRoom = () => {
    get(child(dbRef, 'devices/'+id)).then((snapshot) => {
      if (snapshot.exists()) {
        if (!snapshot.hasChild('userID')){
          set(child(dbRef,'devices/'+id),{
                  name:name,
                  userID:userId,
                  type:roomType,
          }).then(()=> set(push(child(dbRef, 'users/'+userId +'/rooms')), {
            id,name,type:roomType,
          }) ).then(() => setShowModal(false))
        }
        else{
          alert("This device is already configured")
        }
      } else {
        alert("Please enter valid Device ID");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
    <Modal
        style={styles.containerModal}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Content w="100%" maxWidth="360">
          <Modal.CloseButton />
          <Modal.Header>Add Room</Modal.Header>
          <Modal.Body>
            <VStack space={3} style={styles.modalContainer}>
              <Input
                onChangeText={(text) => setName(text)}
                style={styles.inputfeilds}
                mx="3"
                placeholder="Room Name"
                w="100%"
              />
              <Input
                onChangeText={(text) => setId(text)}
                style={styles.inputfeilds}
                mx="3"
                placeholder="Device ID"
                w="100%"
              />
              <Dropdown />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={styles.submitAddroom}
              flex="1"
              onPress={() => handleAddRoom()}
            >
              Add Room
            </Button>
          </Modal.Footer>
        </Modal.Content>
    </Modal>
    <View style={styles.container}>
      <View style={styles.contain}>
        <Text style={styles.headingText}>Rooms</Text>

        <Button
          onPress={() => handleSignOut()}
          style={styles.userButton}
          size="sm"
          variant="solid"
          colorScheme="primary"
        >
          {userName}
        </Button>
      </View>

      <View style={styles.cardcontainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.addroomButton]} onPress={() => setShowModal(true)}>
            <Image
              style={styles.addlogo}
              source={require("./assets/adddevice.png")}
            />

            <Text style={styles.addroomtext}>Add Room</Text>
          </TouchableOpacity>
          {
            room.map((item,index) => {
              return <Cards key={index} name={item.roomName} device={item.deviceID} roomtype={item.type}/>
            })
          }
        </ScrollView>
      </View>
    </View>

    <View style={styles.deviceContainer}>
      <Text style={styles.roomTitleText}>{roomTitle}</Text>
      <View style={styles.devicesHeadingandswitch}>
        <Text style={styles.deviceHeadingText}>Devices</Text>
        <View style={styles.buttonContainer}>
        <Button
          onPress={()=> allDeviceOn({roomSwitchId})}
          style={styles.button}
          size="sm"
          variant="solid"
          colorScheme="success"
        >
          ON
        </Button>
        <Button
          onPress={()=> allDeviceOff({roomSwitchId})}
          style={styles.button}
          size="sm"
          variant="solid"
          colorScheme="danger"
        >
          OFF
        </Button>
        </View>
      </View>
      <AddDevices />
    
      {/* <ScrollView style={{maxHeight: 350}}> */}
        <View style={{marginBottom:10}}>
          {
            device.map((item,index) => {
              return <DeviceCards key={index} name={item.deviceName} deviceId={item.device} deviceState={item.deviceStatus} deviceType={item.type}/>
            })
          }
          </View>
      {/* </ScrollView> */}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  cardimagebox:{
    marginTop:-20,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'

  },

  contain: {
    flexDirection: "row",
    // flex: 1,
    justifyContent: "space-between",
  },
  container: {
    marginTop: 20,
  },

  modalContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },

  cardcontainer: {
    marginTop: 10,
    marginLeft:5,
  },

  headingText: {
    flex: 3,
    color:'black',
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 15,
    marginBottom: 10,
  },

  userButton: {
    flex:1,
    width: 80,
    height: 40,
    borderRadius: 10,
    margin:5,
    marginRight:10,
  },

  cards: {
    borderRadius: 15,
    height: 130,
    width: 100,
    // margin: 5,
    marginVertical:5,
    marginHorizontal:3,
    backgroundColor: "#5B17EA",
    elevation: 3,

    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    paddingBottom: -20,
  },

  addroomButton: {
    backgroundColor: "black",
    borderRadius: 15,
    height: 130,
    width: 100,
    // margin: 5,
    marginVertical:5,
    marginHorizontal:3,
    elevation: 3,
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    paddingTop: 30,
    paddingBottom: -20,
  },
  addlogo: {
    marginBottom: -90,
    marginTop: -30,
  },

  cardText: {
    color: "#fff",
    alignContent: "center",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 40,
  },

  addroomtext: {
    color: "#fff",
    alignContent: "center",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 70,
  },

  cardelevated: {
    elevation: 5,
  },

  addRoom: {
    backgroundColor: "black",
    borderRadius: 15,
    height: 130,
    width: 100,
    margin: 5,
  },

  containerModal: {
    marginTop: 20,
  },

  inputfeilds: {},

  adddevice: {
    backgroundColor: "black",
    width: "100%",
    borderRadius: 15,
    height: 55,
    marginBottom: 5,
    elevation: 3,
  },

  submitAddroom: {
    backgroundColor: "#5B17EA",
  },

  devicesHeadingandswitch: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  roomTitleText:{
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginTop:-15,
    marginBottom:15,
  },

  cardDevices: {
    height: 70,
    backgroundColor:"#E1D3FF",
    borderRadius: 15,
    alignItems: 'center',
    margin: 5,
    marginHorizontal:20,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },

  deviceContainer: {
    marginTop: 30,
  },

  buttonContainer: {
    flex: 2,
    marginRight:20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    flex:1,
    width: 80,
    height: 40,
    borderRadius: 10,
    margin:2,
  },

  deviceHeadingText: {
    flex: 2,
    fontSize: 24,
    fontWeight: "900",
    marginLeft: 15,
    marginBottom: 10,
  },

  deviceCardText: {
    flex:3,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    marginLeft:15,
  },

  tinyLogo: {
    flex: 1,
    height: 45,
    width: 80,
    margin: 10,
  },

  switches: {
    flex:2,
    marginRight: 10,
  },
});