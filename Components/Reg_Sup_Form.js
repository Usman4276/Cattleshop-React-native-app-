import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  StatusBar,
  ScrollView,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { FAB } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function Registeration_Form() {
  const [fullname1, set_fullname] = useState();
  const [email1, set_email] = useState();
  const [password1, set_password] = useState();
  const [address1, set_address] = useState();
  const [cnic1, set_cnic] = useState();
  const [phone1, set_phone] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    // const { fullname, email, password, address } = state;
    console.log(fullname1, email1, password1, address1, phone1);
    let fullname, email, password, address, cnic, phone;
    fullname = fullname1;
    email = email1;
    password = password1;
    address = address1;
    cnic = cnic1;
    phone = phone1;

    if (
      fullname == null ||
      email == null ||
      password == null ||
      address == null ||
      cnic == null ||
      phone == null
    ) {
      window.alert("empty input fields");
    } else {
      await fetch("http://192.168.10.5:9000/supplier-registration", {
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
              window.alert("Supplier Resgistered successfully");
            }
          });
        })
        .catch((error) => {
          window.alert("Registration failed");
          console.log(error);
        });
    }
  };

  return (
    <ScrollView>
      <Input
        style={styles.input}
        style={{ marginTop: windowHeight/18, marginLeft: windowWidth/18 }}
        onChangeText={(text) => set_fullname(text)}
        placeholder="Enter full name here"
        leftIcon={
          <Icon
            style={{ marginTop: windowHeight/18, marginLeft: windowWidth/25 }}
            name="user"
            size={18}
            color="black"
          />
        }
      />

      <Input
        style={{ marginLeft: 15 }}
        placeholder="Enter email address here"
        onChangeText={(text) => set_email(text)}
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
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(text) => set_password(text)}
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
        secureTextEntry={true}
        onChangeText={(text) => set_address(text)}
        leftIcon={
          <Icon
            style
            style={{ marginLeft: 10 }}
            name="address-card"
            size={16}
            color="black"
          />
        }
      />

      <Input
        style={{ marginLeft: 15 }}
        placeholder="Enter CNIC"
        onChangeText={(text) => set_cnic(text)}
        leftIcon={
          <FontAwesome
            name="id-card-o"
            size={16}
            style={{ marginLeft: 10 }}
            color="black"
          />
        }
      />

      <Input
        style={{ marginLeft: 15 }}
        placeholder="Enter Phone Number"
        onChangeText={(text) => set_phone(text)}
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
        onPress={onSubmit}
        color="#363636"
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
  input: {
    marginLeft: 15,
  },
});

export default Registeration_Form;
