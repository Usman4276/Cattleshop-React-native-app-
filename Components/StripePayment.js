import React, { useEffect, useState } from 'react';
import { View,  Button } from 'react-native';
import StripeCheckout from 'react-stripe-checkout';
// import { FAB } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';

function StripePayment(props) {

    const [TotalState, setTotal] = useState(0);
    const getLocalData = async () => {
        let temp = await AsyncStorage.getItem('TotalState');
        setTotal(temp);
    }

    const makePayment = async token => {

        //Converting PKR amount to USD dollars
        let Amount = Math.floor(TotalState / 156);
        console.log(TotalState)
        await fetch('http://192.168.10.7:9000/stripe-pay', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token, Amount
            })
        }).then((res) => {
            console.log(res);
            //navigation

        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {

        getLocalData();

    }, [TotalState])

    return (
        <View>
            

            <StripeCheckout

                name='Buy Cattle'
                stripeKey="pk_test_51J9TBbLnZ7JeDDz1b6RVihAnnR4bco6qIBOTIEvdkqhq6C5DNt8A05dATlfA9I8FtcuLJt0qar2DmvynuOMsWMdp00Zlrc2kKg"
                token={makePayment}
            />


        </View>
    );
}


export default StripePayment;