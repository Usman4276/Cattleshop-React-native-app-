import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import Register from './Register';

import Reg_Cus_Form from './Reg_Cus_Form';
import Reg_Sup_Form from './Reg_Sup_Form';
import Reg_Cons_Form from "./Reg_Cons_Form";
import Reg_P_and_D_pro_Form from './Reg_P_and_D_pro_Form';
import Add_to_Cart from './Cattle_Details';
import Cattle_Details from './Cattle_Details';
import Home from "./Home";
import Login from './Login';
import Sheeps from './Sheeps';
import Cows from './Cows';
import Camels from "./Camels";
import Goats from './Goats';
import Account from './Account';
import Optional from "./Optional";
import Proceed_to_Pay from "./Proceed_to_Pay";
import About_Us from './About_Us';
import StripePayment from './StripePayment';
import payment_method from './payment_method';
import OrderPlaced from "./OrderPlaced";
import Accounts from './Account';


const stack = createStackNavigator()

const Home1=() => {
    return(
        <stack.Navigator>
            
            <stack.Screen 
                name = "Home"
                component = {Home}>
            </stack.Screen>

            <stack.Screen 
                name = "Login Form"
                component = {Login}>
            </stack.Screen>

          
            <stack.Screen
                name = "Sheeps"
                component = {Sheeps}>
            </stack.Screen>

            <stack.Screen
                name = "Cows"
                component = {Cows}>
            </stack.Screen>

            <stack.Screen
                name = "Camels"
                component = {Camels}>
            </stack.Screen>

            <stack.Screen
                name = "Goats"
                component = {Goats}>
            </stack.Screen>

            <stack.Screen 
                name = "Product_Page"
                component = {Cattle_Details}>
            </stack.Screen>

            <stack.Screen 
                name = "Optional"
                component = {Optional}>
            </stack.Screen>

            <stack.Screen 
                name = "Proceed to Pay"
                component = {Proceed_to_Pay}>
            </stack.Screen>
            <stack.Screen 
                name = "About Us"
                component = {About_Us}>
            </stack.Screen>

            <stack.Screen 
                name = "Stripe Payment"
                component = {StripePayment}>
            </stack.Screen>

            <stack.Screen 
                name = "payment method"
                component = {payment_method}>
            </stack.Screen>

            <stack.Screen 
                name = "Order Placed"
                component = {OrderPlaced}>
            </stack.Screen>



            
        </stack.Navigator>
    )


}

const Sheeps1 = () => {
    return(
    <stack.Navigator>
            
            <stack.Screen
                name = "Sheeps"
                component = {Sheeps}>
            </stack.Screen>

            <stack.Screen 
                name = "Proceed_to_checkout"
                component = {Proceed_to_Pay}>
            </stack.Screen>

            <stack.Screen 
                name = "Product_Page"
                component = {Cattle_Details}>
            </stack.Screen>
   


    </stack.Navigator>
    )
}

const Register1 = () => {
    return(
        <stack.Navigator>
            
            <stack.Screen
                name = "Register"
                component = {Register}>
            </stack.Screen>

            <stack.Screen
                name = "My Account"
                component = {Account}>
            </stack.Screen>

        

            <stack.Screen 
                name = "Registration Form Customer"
                component = {Reg_Cus_Form}>
            </stack.Screen>

            <stack.Screen 
                name = "Registration Form Supplier"
                component = {Reg_Sup_Form}>
            </stack.Screen>

            <stack.Screen 
                name = "Registration Form Consultant"
                component = {Reg_Cons_Form}>
            </stack.Screen>


            <stack.Screen 
                name = "Registration Form P&D"
                component = {Reg_P_and_D_pro_Form}>
            </stack.Screen>

            <stack.Screen 
                name = "Login Form"
                component = {Login}>
            </stack.Screen>

        </stack.Navigator>



    )
}


export { Home1, Register1, Sheeps1}