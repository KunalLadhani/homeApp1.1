import React,{ useState } from "react";
import {
  Input,
  Icon,
  Stack,
  Pressable,
  Center,
  NativeBaseProvider,
  Text,
  Box,
  Button,
  Heading,
  VStack,
  FormControl,
  Link,
  HStack,
  View,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

function Loginpage( {navigation}: any ) {
  const [show, setShow] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const loginUser = async (email, password) => {
    try{
      await signInWithEmailAndPassword(auth, email,password)
    } catch (error){
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(error);
      }
    }
  };

  const forgetPassword = () => {
    sendPasswordResetEmail(auth,email)
    .then(() => {
      alert("Password reset email sent")
    }).catch((error) => {
      alert(error)
    })
  }

  return (
    <NativeBaseProvider>
    <View>
    <Box rounded="lg">
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          alignContent="center"
          alignItems="center"
          marginTop="30"
          fontSize="3xl"
          fontWeight="900"
          color="black"
          _dark={{
            color: "black",
          }}
        >
          Hi!
        </Heading>
        <Heading
          fontSize="3xl"
          mt="1"
          _dark={{
            color: "black",
          }}
          color="black"
          fontWeight="900"
          size="3xl"
        >
          Welcome Back
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <Stack space={4} w="100%" alignItems="center">
              <Input
                onChangeText={(email)=>setEmail(email)}
                borderBottomWidth="2"
                borderColor="black" 
                marginTop="5"
                marginBottom="5"
                InputLeftElement={
                  <Icon
                    as={<MaterialIcons name="person" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder="Username"
              />
              <Input
                onChangeText={(password)=>setPassword(password)}
                borderBottomWidth="2"
                borderColor="black"
                marginBottom="5"
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? "visibility" : "visibility-off"}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  </Pressable>
                }
                placeholder="Password"
              />
            </Stack>
            <Link
            onPress={() => {forgetPassword()}}
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button borderRadius="lg" mt="2" colorScheme="indigo" onPress={() => {loginUser(email,password)}}>
            Login
          </Button>
          <Button borderRadius="lg" mt="2" color="white" onPress={() => {navigation.navigate("SignUp")}}>
            New User
          </Button>
        </VStack>
      </Box>
    </Center>
    </Box>
    </View>
    </NativeBaseProvider>
  );
};

export default Loginpage; 