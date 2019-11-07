import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import StyledInput from './StyledInput'

const HeaderComponent = (props) =>{
    const [txtValue,setTxtValue] = React.useState('')
    const {navigate} = props.nav
    React.useEffect(() =>{
       props.getValue(txtValue)
    },[txtValue])

     return(
         <View style={styles.mainContainer}>
         <View style={styles.topContainer}>
            <Text style={styles.headerTxt}>LASTBIT</Text>
            <TouchableOpacity style={styles.sendBtn} onPress={() => { props.setFlag(false); navigate('SendScreen')}}><Text style={styles.sendTxt}>Send</Text></TouchableOpacity>
            </View>
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
      paddingTop:28 
    },
    topContainer:{
     flex:0.7,
     flexDirection:'row',
     justifyContent:'space-between'
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
    },
    sendBtn:{
        height: 40,
        width:'25%',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:20,
        marginRight:'5%'
    },
    sendTxt:{
        textAlign:'center',
        fontSize:16
    }
})

export default HeaderComponent;