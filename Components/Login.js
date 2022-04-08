import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,

} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { FAB } from "react-native-elements";

import { useEffect } from "react";
export const loginStatContext = React.createContext();


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const Login = ({ navigation }) => {
  
  //Global variables
  let email, password, loginAs = "Customer";

  //Declaring useStates
  const [email1, set_email] = useState();
  const [password1, set_password] = useState();
  const [login1, setlogin1] = useState(null);


  const onSubmit = async (e) => {
    console.log(email1, password1, loginAs);
    e.preventDefault();
    email = email1;
    password = password1;

    // setlogin1('true');

    console.log(email, password);
    if (email == null || password == null) {
      window.alert("empty input fields");
    } else if (loginAs == null) {
      window.alert("Empty input fieldss");
    } else {
      console.log(email, password);
      if (loginAs == "Customer") {
        console.log("i am in customer" + loginAs);
        console.log(loginAs);
        await fetch("http://192.168.10.16:9000/customer-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => {
            res
              .json()
              .then((data) => {
                console.log(data);
                if (data.empty == "true") {
                  window.alert("Empty input fields");
                } else if (data.login == "false") {
                  window.alert("Invalid credentials");
                } else if (data.login == "fail") {
                  window.alert("Login failed");
                } else {

                  //setting login status true
                  setlogin1('true');

                  Alert.alert("Alert", "Login Successfull", [
                    { text: "OK", onPress: () => navigation.navigate("Home") },
                  ]);

                  navigation.navigate("Home");
                }
              })
              .catch((error) => {
                console.log(`my error 1 ${error}`);
              });
          })
          .catch((error) => {
            console.log(`my error ${error}`);
            window.alert("Login failed");
          });
      }
    }


  };



  //Setting data in localstorage
  const SetLocalStorage = async () => {
    // console.log(login1);
    if (login1 === 'true') {

      await AsyncStorage.setItem("login_status", login1);
      await AsyncStorage.setItem("key1", email1);
      await AsyncStorage.removeItem('logout_status');
    }
   
  }

  useEffect(() => {

    SetLocalStorage();
  }, [login1,email1])

  return (
    <ScrollView>
      <Input
        style={{ marginTop: windowHeight / 4.5, marginLeft: windowWidth / 22 }}
        name="email"
        onChangeText={(text) => set_email(text)}
        placeholder="Enter email address here"
        leftIcon={
          <Icon
            style
            style={{
              marginTop: windowHeight / 4.5,
              marginLeft: windowWidth / 30,
            }}
            name="envelope"
            size={17}
            color="black"
          />
        }
      />

      <Input
        style={{ marginLeft: windowWidth / 17 }}
        textContentType="password"
        onChangeText={(text) => set_password(text)}
        placeholder="Enter password"
        name="password"
        secureTextEntry={true}
        leftIcon={
          <Icon
            style
            style={{ marginLeft: windowWidth / 25 }}
            name="lock"
            size={19}
            color="black"
          />
        }
      />

      {/* <Select options={select} onChange={getOptionValue} /> */}
      <FAB
        buttonStyle={{
          borderRadius: 8,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          backgroundColor: "#363636",
        }}
        title="Login"
        style={styles.btn2}
        onPress={onSubmit}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 15,
  },
  btn2: {
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
    width: 250,
  },
});

export default Login;