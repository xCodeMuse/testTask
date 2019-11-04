import * as React from 'react';
import {StyleSheet,Dimensions} from 'react-native'
import { TextInput } from 'react-native-paper';

const width = Math.round(Dimensions.get('window').width);
const StyledInput = (props) => {
   return (
      <TextInput
        label={props.label}
        value={props.value}
        onChangeText={text => props.setInput(text)}
        style={[styles.txtInput,props.style]}
        placeholder={props.placeHolder}
      />
    );
}

const styles = StyleSheet.create({
  txtInput:{
      width: '90%'
  }
})

export default StyledInput