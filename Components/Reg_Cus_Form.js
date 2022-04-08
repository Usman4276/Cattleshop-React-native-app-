import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  StatusBar,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { FAB } from "react-native-elements";
import React, { useState } from "react";
import {FontAwesome} from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
// ---------------------------------------------------------------------------
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CustomerRegistration = ({navigation}) => {
  // const history = useHistory();
  
  const [fullname1, set_fullname] = useState();
  const [email1, set_email] = useState();
  const [password1, set_pass] = useState();
  const [address1, set_address] = useState();
  const [phone1, set_phone] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    // const { fullname, email, password, address } = state;
    console.log(fullname1, email1, password1, address1, phone1);

    let fullname, email, password, address, phone;

    fullname = fullname1;
    email = email1;
    password = password1;
    address = address1;
    phone = phone1;

    if (
      fullname == null ||
      email == null ||
      password == null ||
      address == null ||
      phone == null
    ) {
      window.alert("empty input fields");
    } else {
      await fetch("http://192.168.10.16:9000/customer-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          address,
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
              Alert.alert(
                "Alert",
                "Customer Registered Successfully",
                [
                  
                  { text: "OK", onPress: () => navigation.navigate("Home") }
                ]
              );
            }
          });
        })
        .catch((error) => {
          window.alert("Registration failed");
          console.log(error);
        });
    }
  };

  // -------------------------------------------------------------------------

  // function Registeration_Form() {
  return (
    <ScrollView>
      <Input
        style={styles.input}
        style={{ marginTop: windowHeight/18, marginLeft: windowWidth/18 }}
        placeholder="Enter fullname here"
        textContentType="emailAddress"
        onChangeText={(text) => set_fullname(text)}
        leftIcon={
          <Icon
            style
            style={{ marginTop: windowHeight/20, marginLeft: windowWidth/25 }}
            name="user"
            size={18}
            color="black"
          />
        }
      />

      <Input
        style={{ marginLeft: 15 }}
        name="email"
        onChangeText={(text) => set_email(text)} keyboardType= "email-address"
        placeholder="Enter email address here"
        leftIcon={
          <Icon
            style
            style={{ marginLeft: 12 }}
            name="envelope"
            size={17}
            color="black"
          />
        }
      />

      <Input
        style={{ marginLeft: 20 }}
        textContentType="password"
        onChangeText={(text) => set_pass(text)}
        placeholder="Enter password"
        name="password"
        secureTextEntry={true}
        leftIcon={
          <Icon
            style
            style={{ marginLeft: 12 }}
            name="lock"
            size={19}
            color="black"
          />
        }
      />

      <Input
        style={{ marginLeft: 15 }}
        placeholder="Enter address"
        onChangeText={(text) => set_address(text)}
        leftIcon={
          <Icon
            style
            style={{ marginLeft: 15 }}
            name="address-card"
            size={15}
            color="black"
          />
        }
      />
      
      <Input
        style={{ marginLeft: 15 }}
        placeholder="Enter Phone Number"
        onChangeText={(text) => set_phone(text)} keyboardType = "numeric"
        leftIcon={
          <FontAwesome
            name="phone-square"
            style={{ marginLeft: 12 }}
            size={19}
            color="black"
          />
        }
      />

      <FAB
      buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }}
        title="Submit Button"
        color="#363636"
        style={{ marginTop: 20 }}
        onPress={onSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
  input: {
    marginLeft: 15,
  },
});

export default CustomerRegistration;
