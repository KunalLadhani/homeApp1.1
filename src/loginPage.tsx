import React from "react";
import { Input, Icon, Stack, Pressable, Center,show, setShow, NativeBaseProvider , Text,Box, Button,Heading,VStack,FormControl,Link,HStack, View} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const Example = () => {
  const [show, setShow] = React.useState(false);
  return <Stack space={4} w="100%" alignItems="center">
      <Input w={{
      base: "75%",
      md: "25%"
    }} InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="Name" />
      <Input w={{
      base: "75%",
      md: "25%"
    }} type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" />
    </Stack>;
};



const Login = () => {
  return <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading alignContent= 'center' alignItems= 'center' marginTop= '30'  fontSize= '3xl' fontWeight="900" color="black" _dark={{
        color: "black"
      }}>
          Hi!
        </Heading>
        <Heading fontSize='3xl' mt="1" _dark={{
        color: "black"
      }} color="black" fontWeight="900" size="3xl">
          Welcome Back
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            
            <Stack space={4} w="100%" alignItems="center">
      <Input borderBottomWidth='2' borderColor= 'black' marginTop='5' marginBottom='5' InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />} placeholder="Username" />
      <Input borderBottomWidth='2' borderColor= 'black' marginBottom='5' type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>} placeholder="Password" />
    </Stack >
            <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500",
           
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button borderRadius='lg' mt="2" colorScheme="indigo">
            Login
          </Button>
            <Button borderRadius='lg' mt="2" color = 'white'>
            New User
          </Button>
          <HStack mt="6" justifyContent="center">
          
            <Text fontSize="sm" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
            color: "indigo.500",
            fontWeight: "medium",
            fontSize: "sm"
          }} href="#">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>;
};



    export default function Loginpage() {
        return (
          <NativeBaseProvider>
            <View >
                <Box   rounded="lg">
                <Login />
               
            
            </Box>
            </View>
            
              
           
            
                
            
          </NativeBaseProvider>
        );
    };
    



