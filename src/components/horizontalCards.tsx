import { StyleSheet, Text, View,ScrollView} from 'react-native'
import React from 'react'
import { Button } from 'native-base'


export default function HorizontalCards() {
  return (
   <View style = {styles.container}>
    <Text  style = {styles.headingTest}>Rooms</Text>
     {/* <Button size="sm" variant="outline">
            PRIMARY
          </Button>
     */}
    
    
     <ScrollView horizontal = {true}>
        <View style = {[styles.cards, styles.cardelevated]}>
      <Text >horizontalCards</Text>
    </View>
     <View style = {[styles.cards, styles.cardelevated]}>
      <Text >horizontalCards</Text>
    </View>
     <View style = {[styles.cards, styles.cardelevated]}>
      <Text >horizontalCards</Text>
    </View>
     <View style = {[styles.cards, styles.cardelevated]}>
      <Text >horizontalCards</Text>
    </View>
     </ScrollView>
     
  
   </View>
   
   
   
    )
}

const styles = StyleSheet.create({
container:{

    marginTop:20,
},
button:{width:80,
},

    headingTest:{
        fontSize:24,
        fontWeight:'bold',
        marginLeft:8


    },
     cards:{
        borderRadius:10,
        height:120,
        width: 100,
        margin:5,
        backgroundColor:'#000'

    },
    cardelevated:{
        elevation:5

    }
})