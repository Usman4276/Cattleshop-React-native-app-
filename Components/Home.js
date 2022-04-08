import React, { useContext, useEffect } from 'react';
import { Text, View, StatusBar, Dimensions, Alert, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon, FAB } from 'react-native-elements'
// import { UserContext, LoginContext, LogoutContext, CustomerIdTransfer, ConsultantIdTransfer, CattleIdContext } from './App_react';
import pic from "../Backend/public/upload/camel.jpg";
import pic1 from "../pics/cow(1).jpg";
import pic2 from "../pics/Sheep.jpg";
import pic3 from "../pics/camel.jpg";
import pic4 from "../pics/goat.jpg";

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [{
  id: 1,
  pic_src: pic1,
  title: "Cow",
  screen_name: "Cows"

},
{
  id: 2,
  pic_src: pic2,
  title: "Sheep",
  screen_name: "Sheeps"
},

{
  id: 3,
  pic_src: pic3,
  title: "Camel",
  screen_name: "Camels"

},
{
  id: 4,
  pic_src: pic4,
  title: "Goat",
  screen_name: "Goats"

}]



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function Home({ navigation, route }) {

  // const value = useContext(UserContext);
  // const { lstate } = useContext(LoginContext);

  const RemoveLocalStorage = async () => {
    // console.log(login1);


    await AsyncStorage.removeItem("ID");
    await AsyncStorage.removeItem("selected_consul");
    await AsyncStorage.removeItem("selected_pdrop");


  }

  useEffect(() => {
    RemoveLocalStorage();
  }, [])


  return (

    <View>
      <StatusBar barStyle="dark-content" backgroundColor="#D9DDDC"></StatusBar>

      <ScrollView>

        {/* <Text>{route.params.paramKey}</Text> */}

        <FlatList
          data={DATA}
          renderItem={({ item }) => {
            return (
              <View>


                <Card style={styles.cards}>
                  {/* <Card.Title>{item.name}</Card.Title> */}

                  <Card.Image style={styles.img1} source={item.pic_src}>
                  </Card.Image>
                  {/* <Text style={styles.des}>
              {item.short_des}
            </Text>
            <Text style={styles.price}>Rs.{item.price}</Text> */}

                  <Button
                    buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }}
                    title={item.title} onPress={() => navigation.navigate(item.screen_name)} />


                </Card>

              </View>
            )
          }


          }
          numColumns='2'
          keyExtractor={item => item.id}
        />


        <Text style={{ fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginTop: windowHeight / 20 }}>About Us</Text>

        <View style={styles.card}>
          <View >
            <Text style={styles.para}>Cattle Shop provides you a platform available for sale & purchase of your cattles online throughout the year. This website has a very friendy interface and allows you to choose your cattle according to pricing and type. Our popular cattles includes Goat, Sheep, Dumba, Cow, Bull, Camel and Buffalo.</Text>
          </View>
        </View>


        <View style={styles.card}>
          <View >
            <Foundation name="clipboard-notes" size={80} color="black" style={styles.img} /><Text style={styles.text}>Sell On Cattle Shop</Text>
          </View >
          <View style={{ alignItems: 'center', marginTop: windowHeight / 90 }}>

            <Text>Upload your cattle within seconds.</Text>
            <Text>Sell your cattles at the best marketplace.</Text>
            <Text>Get genuine offers from verified suppliers.</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View >
            <Foundation name="clipboard-notes" size={80} color="black" style={styles.img} /><Text style={styles.text}>Earn from Cattle Shop</Text>
          </View>

          <View style={{ marginTop: windowHeight / 90 }}>

            <Text style={{ textAlign: 'center' }}>Our Consultants will help you to make decisions about cattles.</Text>
            <Text style={{ textAlign: 'center' }}>Consultant will receive the adequate salary for his work.</Text>
          </View>


        </View>

        <View style={styles.card1}>
          <View>
            <Foundation name="clipboard-notes" size={80} color="black" style={styles.img} /><Text style={styles.text}>Pick and Drop Service Providers</Text>
          </View>

          <View style={{ marginTop: windowHeight / 90 }}>

            <Text style={{ textAlign: 'center' }}>Pick & Drop Service Providers will deliver the cattle to the respected customer.</Text>
            <Text style={{ textAlign: 'center' }}>Pick & Drop Service Providers will get the proper salary for their work..</Text>
          </View>
        </View>


      </ScrollView>


    </View>

  )
}




const styles = StyleSheet.create({


  img1: {
    width: windowWidth / 3,
    height: windowHeight / 6,
    marginBottom: 10
  },


  cards: {
    display: 'flex',
    flex: 1,
    backgroundColor: "#dddd",
    // width: 500
  },

  des: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  price: {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  para: {
    fontSize: 15,
    textAlign: 'justify',


  },
  card: {
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 20,
    marginLeft: windowWidth / 12,
    marginTop: windowHeight / 35,
    marginRight: windowWidth / 12,
    padding: 17,

  },

  card1: {
    borderColor: '#fff',
    borderWidth: 5,
    borderRadius: 20,
    marginLeft: windowWidth / 12,
    marginTop: windowHeight / 35,
    marginRight: windowWidth / 12,
    padding: 15,
    marginBottom: windowHeight / 25

  },

  img: {
    textAlign: 'center'
  },

  text: {

    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  }


})





export default Home;