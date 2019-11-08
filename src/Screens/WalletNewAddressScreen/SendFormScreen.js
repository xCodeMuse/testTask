import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native'
import {StyledInput} from '../../Components'
import axios from 'axios'
import createAnAddress from './createAnAddress';
import {NavigationEvents} from 'react-navigation'
const SendFormScreen = (props) =>{

    const [newTransData,setNewTransData] = React.useState({tid:[],amtWth:[],amtSnt:[],fee:[]})
    const [newaddData,setnewAddData] = React.useState([])
    const [form,setForm] = React.useState({receiverAdd:'2NGQhtezbxdgDGuGu8Zs418VSAihM9dP9Yf',amount:'0.00025'})

    React.useEffect(() =>{
        return function cleanup(){
            newTransData
        }
    },[newTransData,newaddData])

    const bitsSend = async () =>{
            const transFetchData =  await axios
            .get(`https://us-central1-thedamnthing-d02ca.cloudfunctions.net/sendBits?toAddress=${form.receiverAdd}&amount=${form.amount}`)
            console.warn(transFetchData.data.data);
            await setNewTransData({tid:transFetchData.data.data.txid,
                amtSnt:transFetchData.data.data.amount_sent,
                amtWth:transFetchData.data.data.amount_withdrawn,
                fee:transFetchData.data.data.network_fee})
            
    }

    const newAddress = async() =>{
       const newAddData =  await createAnAddress()
       console.warn('New Address Created: ',newAddData.data.data.address)
       await setnewAddData(newAddData.data.data.address)
       
    }


    return(
        <View style={styles.mainContainer}>
            <View style={styles.CardContainer}>
            <View style={styles.formContainer}> 
           
            <StyledInput label={'Enter Receiver Address'} placeHolder={'Enter Bitcoin address'} 
               value={form.receiverAdd} setInput={(e) => setForm({...form,receiverAdd:e})} style={styles.TxtInput}/>
            <StyledInput label={'Enter Amount To Send'} placeHolder={'eg. 0.0003'} 
               value={form.amount} setInput={(e) => setForm({...form,amount:e})} style={styles.TxtInput}/>
               {newaddData.length > 0? <Text style={{padding:5}}>New Address: {newaddData}</Text> : <></>}
               {newTransData.tid.length > 0 ? 
               <View>
                   <Text style={{paddingTop:15,padding:5}}>TransactionID: {newTransData.tid}</Text>
                   <Text style={{padding:5}}>Amount Sent: {newTransData.amtSnt}</Text>
                   <Text style={{padding:5}}>Amount Withdrawn: {newTransData.amtWth}</Text>
                   <Text style={{padding:5}}>Network fee: {newTransData.fee}</Text>
                   <TouchableOpacity style={styles.newAddBtn} onPress={() => props.navigation.navigate('Home')}>
                   <Text style={{color:'white'}}>Back ? Check All Transactions</Text>
                   </TouchableOpacity>
               </View> :
               <></>}
            </View>
            
            
            <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.newAddBtn}>
                <Text style={styles.newAddTxt} onPress={() => newAddress()}>Create A New Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newAddBtn}>
                <Text style={styles.newAddTxt} onPress={() => bitsSend()}>Send BitCoin</Text>
            </TouchableOpacity>
            </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   mainContainer:{
       flex:1,
       alignItems:'center',
       justifyContent:'center'
   },
   newAddBtn:{
       width:'80%',
       height: 50,
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:'black',
       borderRadius: 10
   },
   newAddTxt:{
       color:'white',
       fontSize:18,
       letterSpacing:1
   },
   CardContainer:{
       height:'75%',
       width:'90%',
       alignItems:'center',
       justifyContent:'space-evenly',
    
   },
   btnContainer:{
       height:'35%',
       width:'100%',
       alignItems:'center',
       justifyContent:'space-evenly',
   },
   formContainer:{
       height:'65%',
       width:'100%'
   }
})

export default SendFormScreen