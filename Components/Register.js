import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  StatusBar,
  ScrollView,
  Dimensions,
  RefreshControl
} from "react-native";
import { FAB } from "react-native-elements";
import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



const Register = ({ navigation }) => {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const [Local, setLocal] = useState(null);

  //Getting localStorage data
  const getLocalStorage = async () => {

    let login_status;
    login_status = await AsyncStorage.getItem("login_status");
    setLocal(login_status);
  }

  // console.log(Local);


  const onLogout = async () => {

    await AsyncStorage.removeItem('login_status');   
    await AsyncStorage.setItem('logout_status','true');
    window.alert('Logout successfully');
    navigation.navigate('Home');
  }



  useEffect(() => {

    getLocalStorage();
  }, [])

  //Conditional rendering
  if (Local === 'true') {
    return (
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="Accounts" style={styles.btn2} onPress={() => navigation.navigate("My Account")} />

        <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="Logout" style={styles.btn2} onPress={onLogout} />

      </ScrollView>
    );
  } else {
    return (
      <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >


        <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="Register" style={styles.btn} onPress={() => navigation.navigate("Registration Form Customer")} />



        <Text style={styles.txt}>OR</Text>

        <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="Login" style={styles.btn2} onPress={() => navigation.navigate("Login Form")} />

      </ScrollView>
    );
  }

};

const styles = StyleSheet.create({
  btn: {
    // marginTop: windowHeight / 4.75,
    marginRight: 'auto',
    marginLeft: 'auto',
    // width: windowWidth / 1

  },

  btn1: {
    // marginTop: windowHeight / 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    // width: windowWidth / 1.5

  },

  btn2: {
    marginTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 250
  },

  txt: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 18
  }

});

export default Register;