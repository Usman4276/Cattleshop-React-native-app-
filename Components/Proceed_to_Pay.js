import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Dimensions,ScrollView } from "react-native";
import { ListItem,FAB } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Proceed_to_Pay = ({ navigation }) => {

  //Global useStates


  const [AllInfo, setAllInfo] = useState([]);
  // const CattleId = localStorage.getItem('CattleId');
  const [TotalState, setTotal] = useState(0);
  const [CustomerEmail, set_CustomerEmail] = useState('')
  const [ConsultantFeestate, set_ConsultantFeestate] = useState('')
  const [PickDropFeestate, set_PickDropFeestate] = useState('')
  const [ID, set_ID] = useState('')


  const [Local, setLocal] = useState({

    selected_consultant_charges: '',
    selected_pickdrop_charges: '',

  });


  let UploadPath = "/upload/";
  let cattlePrice = 0, myConsultantFeestate = 0, myPickDropFeeState = 0;
  let sum = 0;


  const getLocalData = async () => {

    let s1 = await AsyncStorage.getItem('selected_consul');
    let s2 = await AsyncStorage.getItem('selected_pdrop');
    let s3 = await AsyncStorage.getItem('key1');
    let s4 = await AsyncStorage.getItem('ID');

    console.log(s3)

    let charges1 = parseInt(s1);
    let charges2 = parseInt(s2);

    set_CustomerEmail(s3)
    set_ID(s4);
    set_ConsultantFeestate(charges1);
    set_PickDropFeestate(charges2)
  }

  myConsultantFeestate = ConsultantFeestate;
  myPickDropFeeState = PickDropFeestate;

  console.log(ConsultantFeestate)
  console.log(PickDropFeestate)

  //Fetching data of selected Cattle & Customer from server
  const Get_Cattle_Customer_Details = async () => {

    console.log(ID)
    console.log(CustomerEmail)








    if (ID != '' && CustomerEmail != '') {

      console.log(ID);
      console.log(CustomerEmail);
      Promise.all([

        await fetch(`http://192.168.10.16:9000/cattle-details/${ID}`, { method: 'POST' }),
        await fetch('http://192.168.10.16:9000/customer-detail', {
          method: 'POST',
          headers: {

            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            CustomerEmail
          })
        })
      ]).then((responses) => {

        return Promise.all(responses.map((res) => {
          return res.json();
        }))
      }).then((data) => {
        console.log(data);
        setAllInfo(data);

      }).catch((err) => {
        console.log(err);
      })
    } else {
      return null;
    }
  }


  const Show_Package_And_Shipment_Details = () => {
    return (
      <>
        {
          AllInfo.map((value, index) => {
            if (index === 0) {
              console.log(value._id);
              return (
                <View key={index}>

                  <Text style={{ fontSize: 18, marginTop: 10, marginBottom: windowHeight / 1200, marginLeft: windowWidth / 22 }}>Package Details</Text>


                  <View>
                    {
                      value.image.map((value, index) => {
                        return (
                          <View key={index} >
                            <View>
                              <Image style={{ width: 20, height: 20 }} source={UploadPath + value} alt="img" />
                            </View>
                          </View>
                        )
                      })

                    }
                  </View>
                  <View >

                    <ListItem key={index} bottomDivider>
                      {/* <Avatar source={{uri: l.avatar_url}} /> */}
                      <ListItem.Content>
                        <ListItem.Title>Cattle Name: {value.cattle_name}</ListItem.Title>
                        <ListItem.Title>Cattle Age:  {value.cattle_age}</ListItem.Title>
                        <ListItem.Title>Cattle Type: {value.cattle_type}</ListItem.Title>
                        <ListItem.Title>Cattle City: {value.cattle_city}</ListItem.Title>

                      </ListItem.Content>
                    </ListItem>
                  </View>
                </View>
              )
            }
          })
        }

        {
          AllInfo.map((value, index) => {
            if (index === 1) {
              return (
                <View key={index}>


                  <Text style={{ fontSize: 18, marginTop: 10, marginBottom: windowHeight / 38, marginLeft: windowWidth / 22 }}>Shipment Details</Text>


                  {
                    value.map((value, index) => {
                      return (
                        <View key={index}>
                        
                            
                            <ListItem key={index} bottomDivider>
                      {/* <Avatar source={{uri: l.avatar_url}} /> */}
                      <ListItem.Content>
                        <ListItem.Title>Address: {value.address}</ListItem.Title>
                        <ListItem.Title>Supplier email:  {value.email}</ListItem.Title>
                        <ListItem.Title>Supplier Phone: {value.phone}</ListItem.Title>
                        {/* <ListItem.Title>Cattle City: {value.cattle_city}</ListItem.Title> */}

                      </ListItem.Content>
                    </ListItem>
                           
                      
                        </View>
                      )
                    })
                  }
                </View>
              )
            }
          })
        }
      </>
    )
  }




  const Show_SubTotal = () => {

    console.log(myConsultantFeestate);
    const flag1 = isNaN(myConsultantFeestate);
    const flag2 = isNaN(myPickDropFeeState);
    console.log(flag1);
    return (
      <>
        {
          AllInfo.map((value, index) => {

            if (flag1 == true && flag2 == true) {

              if (index === 0) {

                cattlePrice = value.cattle_price;
                setTotal(cattlePrice);

                return (
                  <View key={index}>
                    <View >
                    <ListItem key={index} bottomDivider>
                      {/* <Avatar source={{uri: l.avatar_url}} /> */}
                      <ListItem.Content>
                        <ListItem.Title>Subtotal {value.cattle_price}</ListItem.Title>
                        <ListItem.Title>Consultant fee: 0</ListItem.Title>
                        <ListItem.Title>Pick & Drop fee: 0</ListItem.Title>

                      <ListItem.Title>Total : {TotalState} /-PKR</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>


                    </View>
                  </View>
                )
              }
            } else {

              if (index === 0) {

                cattlePrice = value.cattle_price;

                setTotal(myConsultantFeestate + myPickDropFeeState + cattlePrice);
                return (
                  <View key={index}>
                    <View >
                      <View >
                        <Text>Subtotal : {value.cattle_price}</Text>
                        <Text>Consultant fee : {myConsultantFeestate}</Text>
                        <Text>Pick & Drop fee : {myPickDropFeeState}</Text>

                      </View>
                      <Text>Total : {TotalState} /-PKR</Text>

                    </View>
                  </View>
                )
              }
            }
          })
        }
      </>
    )
  }


  const OnLeavingPage = async () => {

    let cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone;
    let imageArray = [];
    let selected_consultant_email = ConsultantIdstate;
    let selected_pickdrop_email = PickDropEmailstate;



    // Passing all fetched Data
    AllInfo.map((value, index) => {
      console.log(value);

      if (index === 0) {

        value.image.map((value, index) => {

          imageArray[index] = value;
        })

        cattle_name = value.cattle_name;
        cattle_type = value.cattle_type;
        cattle_age = value.cattle_age;
        cattle_city = value.cattle_city;
        _cattle_price = value.cattle_price;
        supplier_email = value.supplier_email;
        supplier_name = value.supplier_name;
        supplier_phone = value.supplier_phone;
      }

      if (index === 1) {
        value.map((value) => {
          console.log(value);
          customer_fullname = value.fullname;
          customer_email = value.email;
          customer_phone = value.phone;
        })
      }
    })



    //Saving All Selected data to customer-request
    Promise.all([
      await fetch('http://192.168.10.16:9000/customer-request', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
        })
      }),
      await fetch('http://192.168.10.16:9000/consultant_notification-request', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
        })
      }),
      await fetch('http://192.168.10.16:9000/pick_drop_notification-request', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
        })
      }),
      await fetch('http://192.168.10.16:9000/second-order-history', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, _cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone
        })
      })
    ]).then((responses) => {
      console.log(responses);
      return Promise.all(responses.map((res) => {
        return res.json();
      }))
    }).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    })


    //Removing localstorage data
    await AsyncStorage.removeItem('selected_consul');
    await AsyncStorage.removeItem('selected_pdrop');
  }




  const setLocalstorageData = async () => {
    await AsyncStorage.setItem('TotalState', TotalState);
  }



  useEffect(() => {

    getLocalData();
    Show_SubTotal();
    Get_Cattle_Customer_Details();
    setLocalstorageData();

  }, [ID, CustomerEmail])

  return (

    <ScrollView>
      <Show_Package_And_Shipment_Details />


      <Show_SubTotal />

      <FAB
        buttonStyle={{
          borderRadius: 8,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          backgroundColor: "#363636",
        }}
        title="Proceed to Pay"
        
        onPress={()=>navigation.navigate("payment method")}
      />
    </ScrollView>
  )
}


export default Proceed_to_Pay;