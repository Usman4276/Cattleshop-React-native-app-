import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Button,
    StatusBar,
    ScrollView
  } from "react-native";
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { Input } from 'react-native-elements';
  import { FAB } from 'react-native-elements';
  import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
  
  import React, { useState } from "react";
  function Registeration_Form() {
    const [fullname1, set_fullname] = useState();
    const [email1, set_email] = useState();
    const [password1, set_password] = useState();
    const [address1, set_address] = useState();
    const [cnic1, set_cnic] = useState();
    const [vehicle_no1, set_vehicle_no] = useState();
    const [charges1, set_charges] = useState();
    const [phone1, set_phone] = useState();
  
  
  
    const onSubmit = async (e) => {
      e.preventDefault();
      // const { fullname, email, password, address } = state;
      console.log(fullname1, email1, password1, address1);
      let fullname, email, password, address, cnic, vehicle_no, charges, phone;
      fullname = fullname1;
      email = email1;
      password = password1;
      address = address1;
      cnic = cnic1;
      vehicle_no = vehicle_no1;
      charges = charges1;
      phone = phone1
  
      if (
        fullname == null ||
        email == null ||
        password == null ||
        address == null || 
        cnic == null || 
        vehicle_no == null || 
        charges == null || 
        phone == null
      ) {
        window.alert("error");
      } else {
        await fetch("http://localhost:9000/pick-and-drop-registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname,
            email,
            password,
            address,
            cnic,
            vehicle_no,
            charges,
            phone
          }),
        })
          .then((res) => {
            res.json().then((data) => {
              console.log(data);
              if (data.empty === "true") {
                alert("Empty input fields");
              } else if (data.flag === "true") {
                window.alert("Email already exist");
              } else {
                window.alert("P&D Resgistered successfully");
              }
            });
          })
          .catch((error) => {
            window.alert("Registration failed");
            console.log(error);
          });
      }
    };
  
    return(
      <View>
  <Input style={styles.input} style={{marginTop: 120,marginLeft: 20}} onChangeText={(text)=> set_fullname(text)}
  placeholder='Enter full name here'
  leftIcon={
    <Icon style={{marginTop: 120,marginLeft: 12}}
      name='user'
      size={18}
      color='black'
    />
  }
  />
  
  <Input style={{marginLeft: 15}}  placeholder="Enter email address here" onChangeText={(text)=> set_email(text)}
  leftIcon={
    <Icon style style={{marginLeft: 12}}
      name='envelope'
      size={17}
      color='black'
    />
  }/>
  
  
  
  
  <Input style={{marginLeft: 20}}  placeholder="Enter password" secureTextEntry={true} onChangeText={(text)=> set_password(text)}
  leftIcon={
    <Icon style style={{marginLeft: 12}}
      name='lock'
      size={19}
      color='black'
    />
  }/>
  
  <Input style={{marginLeft: 10}}  placeholder="Enter address" on onChangeText={(text)=> set_address(text)}
  leftIcon={
    <Icon style style={{marginLeft: 10}}
      name='address-card'
      size={16}
      color='black'
    />
  }/> 
  
  <Input style={{marginLeft: 15}}  placeholder="Enter CNIC" onChangeText={(text)=> set_cnic(text)}
  leftIcon={
    <FontAwesome name="id-card-o" size={16} style={{marginLeft:10}} color="black" />
  }/> 
  
  <Input style={{marginLeft: 15}}  placeholder="Enter Vehicle Number" onChangeText={(text) => set_vehicle_no(text)}
  leftIcon={
    <FontAwesome5 style={{marginLeft: 10}} name="truck-pickup" size={16} color="black" />
  }/> 
  
  <Input style={{marginLeft: 15}}  placeholder="Enter Charges" onChangeText={(text) => set_charges(text)}
  leftIcon={
    <MaterialCommunityIcons style={{marginLeft: 8}} name="cash" size={24} color="black" />
  }/> 
  
  <Input style={{marginLeft: 15}}  placeholder="Enter Phone Number" onChangeText={(text) => set_phone(text)}
  leftIcon={
    <FontAwesome name="phone-square" style={{marginLeft: 12}} size={19} color="black" />
    }/>
  
  <FAB title="Submit Button" onPress={onSubmit} color="#363636" style={{marginTop: 20}}/>
    </View>
    )}
  
  
  const styles = StyleSheet.create({
  icon:{
    marginLeft: 10
  },
  input:{
    marginLeft: 15,
  }
  })   
  
  export default Registeration_Form;