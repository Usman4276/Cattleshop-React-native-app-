// import Header from './Header';
// import { Container, Row, Col } from "react-bootstrap";
// import '../css_files/cows.css';
// import Footer from './Footer';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Card } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pic from "../pics/pic.jpg";
// import CardA from './Card';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Camels = ({navigation}) => {
  const [state, setstate] = useState([]);
  const UploadPath = "/upload/";
  let cattle_name1,
  
    cattle_type1,
    cattle_des1,
    cattle_city1,
    cattle_price1,
    supplier_email1,
    supplier_name1,
    supplier_phone1;
  const GetCattlesData = async () => {
    const Selection = "Camel";

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
  const ShowData = () => {
    return (
      <>
        {state.map((value) => {
          console.log(value.cattle_type);
          console.log(value.supplier_name);
          //   cattle_info = value.cattle_price;
          //   console.log(cattle_info);
          cattle_name1 = value.cattle_name;
          cattle_type1 = value.cattle_type;
          cattle_des1  = value.cattle_des;
          cattle_city1 = value.cattle_city;
          cattle_price1 = value.cattle_price;
          supplier_email1 = value.supplier_email;
          supplier_name1  = value.supplier_name;
          supplier_phone1 = value.supplier_phone;

          const arr = [
            {
              cattle_name1,
              cattle_type1,
              cattle_des1,
              cattle_city1,
              cattle_price1,
              supplier_email1,
              supplier_name1,
              supplier_phone1,
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
                        <Card style={styles.cards} >
                          {/* <Card.Title>{item.name}</Card.Title> */}
                          {/* <Card.Divider /> */}
                          <Card.Image
                            style={styles.img1}
                            source={item.pic_src}
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
                            onPress={() =>
                              navigation.navigate("Product_Page",{ 
                                name : cattle_name1,
                                type : cattle_type1,
                                des :cattle_des1,
                                city :cattle_city1,
                                price :cattle_price1,
                                email :supplier_email1,
                                sname :supplier_name1,
                                phone :supplier_phone1,
                                pic: pic,

                                
                                
                                
                                })                            }
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

  useEffect(() => {
    GetCattlesData();
  }, []);

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
export default Camels;
