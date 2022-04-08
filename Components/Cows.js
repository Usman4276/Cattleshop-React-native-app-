// import Header from './Header';
// import { Container, Row, Col } from "react-bootstrap";
// import '../css_files/cows.css';
// import Footer from './Footer';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Card } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import pic from "../pics/cow.jpg";
import pic1 from "../pics/cow(1).jpg";








const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Cows = ({ navigation }) => {
  const [id, setID] = useState('');
  const [state, setstate] = useState([]);
  const UploadPath = '../Backend/public/upload/';
  let pic_src;



  const GetCattlesData = async () => {
    const Selection = "Cow";

    await fetch("http://192.168.10.16:9000/cattles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Selection,
      }),
    })
      .then((res) => {
        console.log(res);
        res
          .json()
          .then((data) => {
            console.log(data);
            setstate(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(state);

  const onPressHandler = (id, cattle_name, cattle_type, cattle_des, cattle_city, cattle_price, supplier_email, supplier_name, supplier_phone, pic_src) => {

    setID(id);

    navigation.navigate("Product_Page", {
      id: id,
      name: cattle_name,
      type: cattle_type,
      des: cattle_des,
      city: cattle_city,
      price: cattle_price,
      email: supplier_email,
      sname: supplier_name,
      phone: supplier_phone,
      pic: pic,

    })
  }

  const ShowData = () => {
    return (
      <>
        {state.map((value) => {
          console.log(value.cattle_type);
          console.log(value.supplier_name);

          console.log(pic_src)
          const arr = [
            {
              cattle_price1: value.cattle_price,
              pic_src: pic,
            },
          ];

          return (
            <>
              <View>
                <FlatList
                  data={arr}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        {/* <img style={{width: 50, height: 50}} src={UploadPath + value.image[0]}/> */}
                        <Card style={styles.cards} >

                          <Card.Image
                            style={styles.img1}
                            source={pic}
                          ></Card.Image>
                          <Text style={styles.des}>{item.cattle_name1}</Text>
                          <Text style={styles.price}>Rs.{item.cattle_price1}</Text>
                          {/* <Text style={styles.des}>{item.cattle_des1}</Text> */}

                          <Button
                            buttonStyle={{
                              borderRadius: 8,
                              marginLeft: 0,
                              marginRight: 0,
                              marginBottom: 0,
                              backgroundColor: "#363636",
                            }}
                            icon={
                              <MaterialCommunityIcons
                                name="shopping-outline"
                                size={15}
                                color="black"
                                color="#ffffff"
                              />
                            }
                            title=" Buy Now"
                            onPress={() => { onPressHandler(value._id, value.cattle_name, value.cattle_type, value.cattle_des, value.cattle_city, value.cattle_price, value.supplier_email, value.supplier_name, value.supplier_phone,pic) }
                            }

                          />
                        </Card>
                      </View>
                    );
                  }}
                  numColumns={1.5}
                  keyExtractor={(item) => item.id}
                />
              </View>

            </>
          );
        })}
      </>
    );
  };

  console.log(id)
  const SetLocalStorage = async () => {
    // console.log(login1);
    if (id != '') {

      await AsyncStorage.setItem("ID", id);
      await AsyncStorage.removeItem("selected_consul");
      await AsyncStorage.removeItem("selected_pdrop");
    }

  }

  useEffect(() => {
    GetCattlesData();
    SetLocalStorage();
  }, [id])



  return (
    <>
      <ScrollView>
        {/* <Header /> */}
        <ShowData />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  img1: {
    width: windowWidth / 1.2,
    height: windowHeight / 2.7,
    marginBottom: 10,
  },

  cards: {
    width: 50,
    display: "flex",
    flex: 1,
    backgroundColor: "#dddd",

  },

  des: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },

  price: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default Cows;
