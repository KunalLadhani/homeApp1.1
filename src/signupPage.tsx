import React from "react";
import { Input,styles, Icon, Stack, Pressable, Center,show, setShow, NativeBaseProvider , Text,Box, Button,Heading,VStack,FormControl,Link,HStack, View} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

const SignupPage = () => {
  return <Center w="100%" marginTop= '20'>
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
            
            <Input  placeholder="Name" />
          </FormControl>
          <FormControl>
            
            <Input  placeholder="Email"/>
          </FormControl>
          <FormControl>
            
            <Input  placeholder="Phone No"/>
          </FormControl>
          <FormControl>
            
            <Input placeholder="Password" type="password" />
          </FormControl>
          <FormControl>
            
            <Input placeholder="Confirm password" type="password" />
          </FormControl>
          <Button marginTop='10' mt="2" colorScheme="indigo">
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>;
};






    export default function Signup() {
        return (
          <NativeBaseProvider>
            <View >
                <Box   rounded="lg">
                <SignupPage />
               
            
            </Box>
            </View>
            
              
           
            
                
            
          </NativeBaseProvider>
        );
    };
    


// 
// const styles = StyleSheet.create({
//  inputboxes:{
//   borderWidth: 4,
//     borderColor: 'black',
//     borderRadius: 6,

  
//  }
// });

