import React from 'react'
import {View, Text} from 'react-native'

const NewAddComponent = ({data}) =>{
     return(
         <View style={{flex:1}}>
             <Text>New address: {data.data.data.address}</Text>
             <Text>Network: {data.data.data.network}</Text>
         </View>
     )
}
export default NewAddComponent