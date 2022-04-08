import React from 'react';
import { View,Text, StyleSheet,Dimensions, ScrollView } from "react-native";
// import { borderRadius } from 'react-select/src/theme';
import { Foundation } from '@expo/vector-icons';


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function About_Us() {
    return (
        <ScrollView >
        <View style={styles.card}>
        <View >
            <Text style={styles.para}>Cattle Shop provides you a platform available for sale & purchase of your cattles online throughout the year. This website has a very friendy interface and allows you to choose your cattle according to pricing and type. Our popular cattles includes Goat, Sheep, Dumba, Cow, Bull, Camel and Buffalo.</Text>
        </View>
        </View>


        <View style={styles.card}>
            <View >
                <Foundation name="clipboard-notes" size={80} color="black" style={styles.img}/><Text style={styles.text}>Sell On Cattle Shop</Text>
            </View >
            <View style={{alignItems: 'center', marginTop: windowHeight/90}}>

            <Text>Upload your cattle within seconds.</Text>
            <Text>Sell your cattles at the best marketplace.</Text>
            <Text>Get genuine offers from verified suppliers.</Text>
            </View>
        </View>

        <View style={styles.card}>
            <View >
                <Foundation name="clipboard-notes" size={80} color="black" style={styles.img}/><Text style={styles.text}>Earn from Cattle Shop</Text>
            </View>
          
            <View style={{marginTop: windowHeight/90}}>

            <Text style={{textAlign: 'center'}}>Our Consultants will help you to make decisions about cattles.</Text>
            <Text style={{textAlign: 'center'}}>Consultant will receive the adequate salary for his work.</Text>
            </View>
            
          
        </View>

        <View style={styles.card1}>
            <View>
                <Foundation name="clipboard-notes" size={80} color="black" style={styles.img}/><Text style={styles.text}>Pick and Drp Service Providers</Text>
            </View>
            
            <View style={{marginTop: windowHeight/90}}>

            <Text style={{textAlign: 'center'}}>Pick & Drop Service Providers will deliver the cattle to the respected customer.</Text>
            <Text style={{textAlign: 'center'}}>Pick & Drop Service Providers will get the proper salary for their work..</Text>
            </View>
            </View>
      

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    para:{
        fontSize: 15,
        textAlign: 'justify',
        
        
    },
    card: {
        borderColor: '#fff',
        borderWidth: 5,
        borderRadius: 20,
        marginLeft: windowWidth/12,
        marginTop: windowHeight/35,
        marginRight: windowWidth/12,
        padding: 17,
    
    },

    card1: {
        borderColor: '#fff',
        borderWidth: 5,
        borderRadius: 20,
        marginLeft: windowWidth/12,
        marginTop: windowHeight/35,
        marginRight: windowWidth/12,
        padding: 15,
        marginBottom: windowHeight/25
    
    },

    img:{
        textAlign:'center'
    },

    text:{
 
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center'
    }
})



export default About_Us;