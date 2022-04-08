import React,{useState, useEffect} from 'react';
import { Button, Text, View, Dimensions, StyleSheet } from 'react-native';
import { Input,Icon, ListItem, FAB } from "react-native-elements";
import { FontAwesome,MaterialIcons,AntDesign } from '@expo/vector-icons'; 


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let fullname, email, cnic;

const Events = ({navigation}) => {

    const [fullname1, setfullname] = useState();
    const [email1, set_email] = useState();
    const [cnic1, set_cnic] = useState();
    const [EventDetails, setEventDetails] = useState([]);


    const onSubmit = async () => {

     fullname = fullname1;
     email = email1;
     cnic = cnic1;
     const today = new Date()
     console.log(fullname,email,cnic,today)
     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();

     if(fullname == null || email == null || cnic == null ){
         alert("empty input fields...")
     }

     else {

        await fetch('http://192.168.10.16:9000/event-ticket', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname, email, cnic, date
            })
        }).then((res) => {

            res.json().then((data) => {
                window.alert('Ticket created successfully');
                // history.push('/home');
                alert(data)
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }
}

    const GetEventDetails = async () => {
        await fetch('http://192.168.10.16:9000/show-event', {
            method: 'GET',
        }).then((res) => {
            console.log(res);
            res.json().then((data) => {
                console.log(data);
                setEventDetails(data);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }


    // console.log(EventDetails)

    const ShowEventDetails = () => {

        return (
            <>
                {
                    EventDetails.map((value, index) => {
                        
                        return (
                            <View key={index}>
                                
                                {/* <img src={UploadPath + value.img_name} alt="img" /> */}

                                {
                                    
                                    value.event_detail.map((value, index) => {
                                        return (
                                            
                                            <ListItem key={index} bottomDivider style={{marginTop: 20}}>
                                            
                                            <ListItem.Content>
                                              {/* <ListItem.Title style={{justifyContent: 'space-evenly'}}>   {item.fullname1}                   {item.phone1}               {item.charges1}</ListItem.Title> */}
                                              
                                              <View>
                                              <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>Event Details</Text>    
                                              <ListItem.Title>Event Title: {value.title}</ListItem.Title>
                                              <ListItem.Title>Event Venue: {value.venue}</ListItem.Title>
                                              <ListItem.Title>Event Date : {value.date}</ListItem.Title>
                                              <ListItem.Title>Event Time : {value.time}</ListItem.Title>
                                              
                                                {/* <Text >{value.title}</Text>
                                                <Text >{value.venue}</Text>
                                                <Text >{value.date}</Text>
                                                <Text>{value.time}</Text> */}
                                                
                                              </View>
                                            </ListItem.Content>
                                          </ListItem>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </>
        )
    }
     
    useEffect(() => {
        GetEventDetails();
    }, [])    









    










    return (
        <View >
{/* <ScrollView> */}
      

<Input
        style={styles.input}
        style={{ marginTop: windowHeight/8, marginLeft: windowWidth/20 }}
        placeholder="Enter fullname here"
        textContentType="emailAddress"
        onChangeText={(text) => setfullname(text)}
        leftIcon={
          <FontAwesome
           
            style={{ marginTop: windowHeight/8, marginLeft: windowWidth/28 }}
            name="user"
            size={18}
            color="black"
          />
        }
      />
      <Input
        style={{ marginTop: windowHeight / 50, marginLeft: windowWidth / 22 }}
        name="email"
        onChangeText={(text) => set_email(text)}
        placeholder="Enter email address here"
        leftIcon={
          <MaterialIcons
            
            style={{
              marginTop: windowHeight / 50,
              marginLeft: windowWidth / 30,
            }}
            name="email"
            size={17}
            color="black"
          />
        }
      />

<Input
        style={{ marginTop: windowHeight / 50, marginLeft: windowWidth / 22 }}
        name="cnic"
        keyboardType='numeric'
        onChangeText={(text) => set_cnic(text)}
        placeholder="Enter cnic here"
        leftIcon={
          <AntDesign
            style
            style={{
              marginTop: windowHeight / 50,
              marginLeft: windowWidth / 30,
            }}
            name="idcard"
            size={15}
            color="black"
          />
        }
      />
        {/* </ScrollView> */}
        <FAB
        buttonStyle={{
          borderRadius: 8,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
          backgroundColor: "#363636",
        }}
        title="SUBMIT"
        
        onPress={onSubmit}
      />
        <ShowEventDetails/>
        </View>
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

export default Events;