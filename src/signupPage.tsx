import React,{ useState} from "react";
import { Input, Icon, Stack, Pressable, Center, NativeBaseProvider , Text,Box, Button,Heading,VStack,FormControl,Link,HStack, View} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { auth,db } from "../config";
import { ref, set } from 'firebase/database'
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


function SignUp( {navigation} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] =useState('');
  const [phone, setPhone] = useState('');

  const registerUser = async (email, password, name, phone) => {
    await createUserWithEmailAndPassword(auth, email,password)
    .then(() => {
      if(auth.currentUser !==null){
      sendEmailVerification(auth.currentUser)
      .then(() => {
        alert('Verification email sent')
      }).catch((error) =>{
        alert(error.message)
      })
      .then(() => {
        set(ref(db,'users/'+ auth.currentUser?.uid), {
          name: name,
          email: email,
          phone: phone,
        })
      }).then(()=>navigation.navigate("Login"))
      .catch((error) => {
        alert(error.message)
      })
    }
    })
    .catch((error) => {
      alert(error.message)
    })
  }


  return (
    <NativeBaseProvider>
    <View >
    <Box   rounded="lg">
  <Center w="100%" marginTop= '20'>
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading size="2xl" color="coolGray.800" _dark={{
        color: "warmGray.50"
      }} fontWeight="black">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
        color: "warmGray.200"
      }} fontWeight="medium" size="lg">
          Sign up to continue!
        </Heading>
        <VStack marginTop='16' space={3} mt="5">
          <FormControl>
            
            <Input  placeholder="Name"
            onChangeText={(name) => setName(name)} />
          </FormControl>
          <FormControl>
            
            <Input  placeholder="Email"
            onChangeText={(email) => setEmail(email)}/>
          </FormControl>
          <FormControl>
            
            <Input  placeholder="Phone No"
            onChangeText={(phone) => setPhone(phone)}/>
          </FormControl>
          <FormControl>
            
            <Input placeholder="Password" type="password"
            onChangeText={(password) => setPassword(password)} />
          </FormControl>
          {/* <FormControl>
            
            <Input placeholder="Confirm password" type="password" />
          </FormControl> */}
          <Button marginTop='10' mt="2" colorScheme="indigo" onPress={() => registerUser(email,password,name,phone)}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
    </Box>
    </View>
    </NativeBaseProvider>
  );
};


export default SignUp;