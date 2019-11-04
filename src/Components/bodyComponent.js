import React from 'react'
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity,SafeAreaView} from 'react-native'
import { ActivityIndicator, Colors, List } from 'react-native-paper';
import dataContext from '../Context/dataContext'
import axios from 'axios'

//API baseURL
const baseURL = 'https://blockexplorer.com';

const BodyComponent = (props) =>{
    const [Transdata,setData] = React.useState('')
    const [unspentOutput,setunSpenOutput] = React.useState('')
    const [flag,setFlag] = React.useState(false)

    React.useEffect(()=>{
       if(Transdata.isValid && !flag){
         checkunSpentOutput()
         setFlag(true)
       }
      
    },[Transdata,unspentOutput,flag])

    //render the list of bitcoin address transactions
   const renderTransactionList = () =>{
       if(Transdata.isValid){
        return Transdata.data.transactions.map((li,index) =>{
            return( <List.Item
              key={index+1}
              title={`Transaction ${index+1}`}
              description={`${li}`}
              titleStyle={{color:'white'}}
              descriptionStyle={{color:'white'}}
              style={styles.listStyle}
              left={props => <List.Icon {...props} icon="home-lock-open" />}
                />)
           }
       )
       } 
    }
    
    //Api call to fetch unspentOutput
    const checkunSpentOutput = () =>{
        if(Transdata.isValid){
            axios.get(`${baseURL}/api/addr/${Transdata.data.addrStr}/utxo`).then(
                res =>{
                    setunSpenOutput(res.data)
                }
            ).catch(err =>{
                console.warn('No data found')
            })
        }
      }

      //unspendList items
      const Item = (item) => {
          
        return (
          <View style={{flex:1,width: 300,backgroundColor:'#6161A0',
          marginHorizontal:10,
          justifyContent:'center',
          padding:20,
          borderRadius:10}}>
            <Text numberOfLines={6} style={{color:'white'}}>TransactionID: {item.title.item.txid}{'\n'}</Text>
            <Text style={{color:'white',textAlign:'left'}}>Amount: {item.title.item.amount}</Text>
          </View>
        );
      }
      
      //horizontal flatList view for unspentData
      const renderUnspendData = () =>{
          if(unspentOutput.length > 0){
              return(
            <FlatList
              data={unspentOutput}
              renderItem={(item) => <Item title={item} />}
              keyExtractor={item => item.txid}
              horizontal={true}
            />
          )}
      }
    
        
     return(
         <View style={styles.mainContainer}>
         {/* Context To Fetch datafrom Parent homescreen */}
         <dataContext.Consumer>
             {(value) => setData(value)}
         </dataContext.Consumer> 
       
         <View style={{flex:0.3}}>{!Transdata.isValid && Transdata.err ? 
            <Text style={styles.headerTxt}>Not Valid Address</Text>:
               <></>}
               </View> 
         {/* UnspendData Flatlist View */}
         <View style={{flex:2,alignItems:'center'}}>
         {Transdata.isValid ? 
           <Text style={[styles.headerTxt,{color: !Transdata.err ? 
            'transparent':'white',padding:2}]}>Unspent Outputs</Text>:
               <></>}
          {flag && Transdata.isValid  ? renderUnspendData() : <></>}

          </View>

         
          <View style={{flex:0.3}}>
          {Transdata.isValid ? 
           <Text style={[styles.headerTxt,{color: !Transdata.err ? 
            'transparent':'white'}]}>TransactionList</Text>:
                 <></>}
            </View>

            {/* ListView to showcase the bitcoin address transactions */}
            <View style={{flex:7.4}}>
            
                <ScrollView style={{flex: 1}}>
                  {Transdata.isValid ? renderTransactionList() : <></>}
                 </ScrollView>
                 </View>
         
         </View>
     )
}



const styles = StyleSheet.create({
    mainContainer:{
     flex:1   
    },
    headerTxt:{
        fontSize:12,
        color:'red',
        paddingLeft:'5%'
    },
    listStyle:{
        borderBottomEndRadius:30,
        borderTopLeftRadius:30,
        padding:10,
        marginTop:5,
        width:'95%',
        alignSelf:'center',
        backgroundColor:'#6161A0',
        shadowColor: 'black',
        shadowOffset: { width: 0.5, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 1,

    }
})

export default BodyComponent;