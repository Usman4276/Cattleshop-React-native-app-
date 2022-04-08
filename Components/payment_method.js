import React from 'react';
import { View, Text } from "react-native";
import { Card, Button, FAB } from "react-native-elements";
function payment_method({ navigation }) {
    return (
        <View>
            <Card>


                <Card.Image source={require('../pics/stripe.jpg')}>

                </Card.Image>
                <View style={{ marginTop: 20 }}>

                    <FAB
                        buttonStyle={{
                            borderRadius: 8,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            backgroundColor: "#363636",
                        }}
                        title="Pay Now"

                        onPress={() => navigation.navigate("Stripe Payment")}
                    />
                </View>
            </Card>

            <Card>


                <Card.Image style={{height: 200}} source={require('../pics/COD.png')}>

                </Card.Image>
                <View style={{ marginTop: 20 }}>

                    <FAB
                        buttonStyle={{
                            borderRadius: 8,
                            marginLeft: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            backgroundColor: "#363636",
                        }}
                        title="Pay Now"

                        onPress={() => navigation.navigate("Order Placed")}
                    />
                </View>
            </Card>




        </View>
    );
}

export default payment_method;