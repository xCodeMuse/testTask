import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity,SafeAreaView} from 'react-native'
import {HeaderComponent,BodyComponent} from '../../Components'
import dataContext from '../../Context/dataContext'
import axios from 'axios'


//API baseURL
const baseURL = 'https://blockexplorer.com';


// Home Screen
const HomeScreen = () =>{
   const [address,setAddress] = React.useState('')
   const [formData,setFormData] = React.useState({isValid:false,data:'',err:false})

    React.useEffect(() =>{   
    },[address,formData])

    const onSubmit = () =>{
     axios
      .get(`${baseURL}/api/addr/${address}`)
      .then(response => {
        
        setFormData({...formData,isValid:true,data:response.data})
        
        
       })
       .catch(error => {
        
        setFormData({isValid:false,data:'',err:true})
        }); 
      }

        return(
            <View style={styles.mainContainer}>
               <View style={{flex:1.8}}><HeaderComponent getValue={(e) => setAddress(e)}/></View>
               <dataContext.Provider value={formData}>
              <View style={{flex:8.2}}><BodyComponent/></View> 
               </dataContext.Provider>
                <TouchableOpacity style={styles.submitBtn} onPress={() => onSubmit()}>
                    <Text style={styles.submitTxt}>SUBMIT</Text>
                </TouchableOpacity>
                
            </View>
            
        )
    
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:'rgba(10,10,10,0.8)'
    },
    submitBtn:{
        height:'7%',
        width:'85%',
        borderRadius:10,
        backgroundColor:'white',
        position:'absolute',
        shadowColor: 'white',
        shadowOffset: { width: 0.5, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 1,
        justifyContent:'center',
        bottom:20,
        alignSelf:'center'

    },
    submitTxt:{
        color:'#6161A0',
        textAlign:'center',
        fontSize:24,
        fontWeight:'500',
        letterSpacing:1,
    }
})

export default HomeScreen