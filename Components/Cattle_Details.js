import React,{useCallback, useState} from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, Button,RefreshControl } from 'react-native';
import { FAB } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
// let refreshControl = {}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }



function Cattle_Details({ route, navigation }) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      navigation.navigate("Cows")
      wait(2000).then(() => setRefreshing(false));
    }, []);

    //Global variables
    let check_logout_status;

    //On Pressing buy now button
    const onPressBuyNow = async () => {

  


        check_logout_status = await AsyncStorage.getItem('logout_status');
        if (check_logout_status === 'true') {
            window.alert('Please login to continue');
            navigation.navigate('Login Form');
            // navigation.navigate("Optional")
        }
        else (

            navigation.navigate("Optional")
        )
        
    }


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
            <Image style={styles.img1} source={route.params.pic} />
            <Text style={styles.price}>Rs.{route.params.price}</Text>
           
            <Text style = {styles.des}>Name: {route.params.name}</Text>
            <Text style = {styles.des}>Type: {route.params.type}</Text>
            <Text style = {styles.des}>City: {route.params.city}</Text>
            {/* <Text >Price: {route.params.price}</Text> */}
            <Text style = {styles.des}>Supplier Email: {route.params.email}</Text>
            <Text style = {styles.des}>Supplier Name: {route.params.sname}</Text>
            <View style = {styles.parent}>

            <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="Buy Now" style={styles.btn1} onPress={onPressBuyNow} />
            <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="Add to Cart" style={styles.btn2} />
            </View>
        </ScrollView>
        
    );
}





const styles = StyleSheet.create({
    img1: {
        width: windowWidth,
        height: windowHeight-400,
        
    },
    price: {
        fontSize: 33,
        fontWeight: 'bold',
        marginTop: windowHeight / 70,
        marginLeft: windowWidth / 30

    },
    des: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: windowHeight / 250,
        marginLeft: windowWidth / 30
    },

    btn1: {
        marginTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 250
    },
    btn2: {
        marginTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 250
    },

    parent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }



})

export default Cattle_Details;
