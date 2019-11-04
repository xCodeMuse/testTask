import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import StyledInput from './StyledInput'
const HeaderComponent = (props) =>{
    const [txtValue,setTxtValue] = React.useState('')
    
    React.useEffect(() =>{
       props.getValue(txtValue)
    },[txtValue])

     return(
         <View style={styles.mainContainer}>
         <Text style={styles.headerTxt}>LASTBIT</Text>
         <StyledInput label={'Bitcoin Address'} placeHolder={'Enter Bitcoin address'} 
               value={txtValue} setInput={(e) => setTxtValue(e)} style={styles.TxtInput}/>
         </View>
     )
}

const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      justifyContent:'space-evenly',
      backgroundColor:'#6161A0',
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30,
      paddingTop:22
      
    },
    TxtInput:{
        alignSelf:'center',
        backgroundColor:'white'
    },
    headerTxt:{
        fontSize:28,
        color:'white',
        paddingLeft:'5%',
        fontWeight:'600',
        letterSpacing:1
    }
})

export default HeaderComponent;