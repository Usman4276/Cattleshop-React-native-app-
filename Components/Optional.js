import React, { useEffect, useState } from 'react';
import { FAB, ListItem } from "react-native-elements";
import { RadioButton } from 'react-native-paper';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Optional({ navigation }) {

  //Use States hooks

  const [PickDropState, setPickDrop] = useState([]);
  const [ConsultantState, setConsultantState] = useState([]);
  const [SelectedConsultantState, setSelectConsultantListState] = useState([]);
  const [SelectedPickDropState, setSelectPickDropListState] = useState([]);
  const [select1, set_select1] = useState("");
  const [select2, set_select2] = useState("");


  let fullname1, charges1, phone1, item1


  // const history = useHistory();

  //Global variables


  // localStorage.removeItem('ConsultantFeestate');
  // localStorage.removeItem('PickDropFeestate');

  // console.log(PreviousComponentStatusState);



  //Loading previous state
  // if (PreviousComponentStatusState === null) {
  //     myPrevState = localStorage.getItem('myPrevState');
  // } else {
  //     myPrevState = PreviousComponentStatusState;
  //     localStorage.setItem('myPrevState', PreviousComponentStatusState);
  // }


  const Fun = () => {
    return (
      <View style={{ backgroundColor: '#eee', flexDirection: 'row' }}>
        <Text style={styles.text1}>Name</Text>
        <Text style={styles.text1}>Phone</Text>
        <Text style={styles.text1}>Charges</Text>
      </View>)
  }











  const getConsultantData = async () => {


    // ConsultantFeedispatch({
    //     payload: 0
    // })

    // PickDropFeedispatch({
    //     payload: 0
    // })
    // //Setting values null after first use
    // ConsultantIddispatch({
    //     payload: ''
    // })
    // PickDropEmaildispatch({
    //     payload: ''
    // })

    await fetch('http://192.168.10.16:9000/optional-consultant', {
      method: 'GET',
    }).then((res) => {
      console.log(res);
      res.json().then((data) => {
        console.log(data);
        setConsultantState(data);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })

  }


  const getPickAndDropData = async () => {


    await fetch('http://192.168.10.16:9000/optional-pick-drop', {
      method: 'GET',

    }).then((res) => {
      console.log(res);
      res.json().then((data) => {
        console.log(data);
        setPickDrop(data);
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
    })

  }

  // const onSelectConsultantList = (email, name, charges, phone) => {

  //     console.log(email);
  //     setSelectConsultantListState([{ ['name']: name, charges, phone }]);

  //     ConsultantFeedispatch({
  //         payload: charges
  //     })

  //     ConsultantIddispatch({
  //         payload: email
  //     })


  // }

  // const onSelectPickDropList = (email, name, charges, phone) => {

  //     console.log(charges)
  //     setSelectPickDropListState([{ ['name']: name, charges, phone }]);
  //     PickDropFeedispatch({
  //         payload: charges
  //     })
  //     PickDropEmaildispatch({
  //         payload: email
  //     })

  // }
  console.log(select1)
  console.log(select2)

  //Storing data in localstorage
  const setLocalData = async () => {

    if (select1 != '' && select2 != '') {

      await AsyncStorage.setItem('selected_consul', select1);
      await AsyncStorage.setItem('selected_pdrop', select2);
    }

  }

  
  console.log(ConsultantState);
  console.log(PickDropState);

  const ShowConsultantList = () => {

    return (
      <>
        <Fun />
        {
          ConsultantState.map((value, index) => {

            fullname1 = value.fullname;
            charges1 = value.charges;
            phone1 = value.phone;
            const arr = [{
              fullname1,
              charges1,
              phone1
            }]

            return (
              <View>
                {
                  arr.map((item, i) => (

                    <ListItem key={i} bottomDivider>
                      <ListItem.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                          <Text style={styles.text2}>{item.fullname1}</Text>
                          <Text style={styles.text2}>{item.phone1}</Text>
                          <Text style={styles.text2}>{item.charges1}</Text>
                          <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="select"
                            onPress={() => set_select1(item.charges1)}
                          />
                        </View>
                      </ListItem.Content>
                    </ListItem>
                  ))
                }
              </View>
            )

          })
        }
      </>
    )
  }


  const ShowPickDropList = () => {

    return (
      <>
        <Fun />
        {
          PickDropState.map((value, index) => {


            fullname1 = value.fullname;
            charges1 = value.charges;
            phone1 = value.phone;
            const arr = [{
              fullname1,
              charges1,
              phone1
            }]


            return (
              <View>
                {
                  arr.map((item, i) => (
                    <ListItem key={i} bottomDivider>
                      <ListItem.Content>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                          <Text style={styles.text2}>{item.fullname1}</Text>
                          <Text style={styles.text2}>{item.phone1}</Text>
                          <Text style={styles.text2}>{item.charges1}</Text>
                          <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="select"
                            onPress={() => set_select2(item.charges1)}
                          />
                        </View>
                      </ListItem.Content>
                    </ListItem>
                  ))
                }
              </View>
            )

          })
        }
      </>
    )
  }

  // const Get_Cart_Customer_data = async () => {

  //     //Getting value from localstorage
  //     let CustomerEmail = localStorage.getItem('lstate');

  //     //Fetching data from add-to-cart and customer-details
  //     Promise.all([
  //         await fetch('/add-to-cart', { method: 'GET' }),
  //         await fetch('/customer-detail', {
  //             method: 'POST',
  //             headers: {

  //                 "Content-Type": "application/json"
  //             },
  //             body: JSON.stringify({
  //                 CustomerEmail
  //             })
  //         })
  //     ]).then((responses) => {
  //         return Promise.all(responses.map((res) => {
  //             return res.json();
  //         }))
  //     }).then((data) => {
  //         console.log(data);
  //         setCartData(data);
  //     }).catch((err) => {
  //         console.log(err);
  //     })
  // }

  // console.log(CartData);

  // const onClickHandler = async () => {

  //     let selected_consultant_email = ConsultantIdstate;
  //     let selected_pickdrop_email = PickDropEmailstate;
  //     // console.log(selected_consultant_email);

  //     if (myPrevState === 'cart') {

  //         if (CartData != '') {

  //             await fetch('/checkout', {
  //                 method: 'POST',
  //                 headers: {
  //                     "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify({
  //                     CartData, selected_consultant_email, selected_pickdrop_email
  //                 })
  //             }).then((res) => {
  //                 console.log(res);
  //                 res.json().then((data) => {
  //                     console.log(data);

  //                 }).catch((err) => {
  //                     console.log(err);
  //                 })
  //             }).catch((err) => {
  //                 console.log(err);
  //             })
  //         }


  //         //Setting the Previous state cart i.e (data is going from cart)
  //         PreviousComponentStatusDispatch({
  //             payload: ''
  //         })

  //         // window.alert('Data added successfully');
  //         localStorage.removeItem('myPrevState');

  //         history.push('/checkout');

  //     } else {

  //         history.push('/proceed-to-pay');

  //     }
  // }

  // const ShowSelected = () => {
  //     // console.log(state.name, state.charges, state.phone);

  //     return (

  //         <>
  //             {
  //                 SelectedConsultantState.map((value, index) => {

  //                     {/* setShippingFee(ConsultantCharges+PickDropCharges); */ }
  //                     return (
  //                         <div key={index}>
  //                             <ListGroup>
  //                                 <ListGroup.Item>
  //                                     <h4>Selected Consultant</h4>
  //                                     {value.name}--{value.charges}--{value.phone}
  //                                 </ListGroup.Item>
  //                             </ListGroup>

  //                         </div>
  //                     )
  //                 })
  //             }
  //             {
  //                 SelectedPickDropState.map((value, index) => {

  //                     {/* setShippingFee(ConsultantCharges+PickDropCharges); */ }

  //                     return (
  //                         <div key={index}>
  //                             <ListGroup>
  //                                 <ListGroup.Item>
  //                                     <h4>Selected Pick & Drop</h4>
  //                                     {value.name}--{value.charges}--{value.phone}
  //                                 </ListGroup.Item>
  //                             </ListGroup>

  //                         </div>
  //                     )
  //                 })
  //             }
  //         </>
  //     )
  // }


  useEffect(() => {
    getConsultantData();
    getPickAndDropData();
    setLocalData();
    // Get_Cart_Customer_data();
  }, [select1, select2]);

  


  return (
    <ScrollView>


      <View>
        <Text style={styles.heading}>Select Consultant (optional)</Text>
        <ShowConsultantList />
        <Text style={styles.heading}>Select Pick & Drop Service (optional)</Text>
        <ShowPickDropList />
        <FAB buttonStyle={{ borderRadius: 8, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#363636" }} title="Next" style={styles.btn2}
          onPress={() => navigation.navigate("Proceed to Pay")} />
        {/* <ShowSelected /> */}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text1: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
    width: windowWidth / 4,
    backgroundColor: '#aaa',
  },

  text2: {
    textAlign: 'center',

    fontSize: 16,

    width: windowWidth / 4.2,
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: windowHeight / 30,
    marginBottom: windowHeight / 30,
    marginLeft: windowWidth / 12
  }

})
