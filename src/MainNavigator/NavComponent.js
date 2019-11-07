import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import {HomeScreen} from '../Screens/HomeScreen';
import {SendFormScreen} from '../Screens/WalletNewAddressScreen'

const NavComponent = createStackNavigator({
    
    Home:{
        screen: HomeScreen
     },
     SendScreen:{
        screen: SendFormScreen
     },
},{
    headerMode: "none"
})


export default createAppContainer(NavComponent)