import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity,Alert} from 'react-native'
import {HeaderComponent,BodyComponent} from '../../Components'
import dataContext from '../../Context/dataContext'
import axios from 'axios'
import {NavigationEvents} from 'react-navigation'

//API baseURL
const baseURL = 'https://testnet-api.smartbit.com.au';


// Home Screen
const HomeScreen = (props) =>{
   const [defaultAddress,setDefaultAddress] = React.useState('2NEf7g9Pi5fEbXKmN1EcHvT4Gn1A2ugK13u')
   const [address,setAddress] = React.useState(false)
   const [renderOnce,setRender] = React.useState(false)
   const [formData,setFormData] = React.useState({isValid:false,data:'',err:false,address:'',unspentData:''})
   
 
    React.useEffect(() =>{  
        
        fetchData() 
        
    },[address,formData,renderOnce])



    const fetchData = async() =>{

         if(!renderOnce){
         
        const firstCall =  await axios
        .get(`${baseURL}/v1/blockchain/address/${address ? address : defaultAddress}/limit=40`)
        
        const unspentCall = await axios.get(`${baseURL}/v1/blockchain/address/${firstCall.data.address.address}/unspent`)

        setFormData({...formData,unspentData:unspentCall.data.unspent,isValid:true,
                             data:firstCall.data.address.transactions,
                           address:firstCall.data.
                         address.address})
                        
                        
          
       }else if(!address){
        setRender(false)
       }else if(address){
        const firstCall =  await axios
        .get(`${baseURL}/v1/blockchain/address/${address ? address : defaultAddress}/limit=40`)
        
        const unspentCall = await axios.get(`${baseURL}/v1/blockchain/address/${firstCall.data.address.address}/unspent`)

        setFormData({...formData,unspentData:unspentCall.data.unspent,isValid:true,
                             data:firstCall.data.address.transactions,
                           address:firstCall.data.
                         address.address})
                         setRender(true)
       }
    }



    const onSubmit = () =>{  
     axios
      .get(`${baseURL}/v1/blockchain/address/${address ? address : defaultAddress}`)
      .then(response => {
        
        setFormData({...formData,isValid:true,data:response.data.address.transactions,address:response.data.address.address})
        
        
       })
       .catch(error => {
        
        setFormData({isValid:false,data:'',err:true,address:''})
        }); 
      }

        return(
            <View style={styles.mainContainer}>
            <NavigationEvents
                onDidFocus={() => console.log('Render')}
                />
               <View style={{flex:1.8}}><HeaderComponent getValue={(e) => setAddress(e)} nav={props.navigation} setFlag={(e) =>setRender(e)}/></View>
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