import { Redirect, Route, Switch } from 'react-router';
import Home from './Home';
// import Admin from './Admin';
// import AdminDashboard from './AdminDashboard';
// import Optional from './Optional';
// import AboutUs from './AboutUs';
// import Account from './Account';
// import Cattles from './Cattles';
// import ContactUs from './ContactUs';
// import Events from './Events';
// import MyOrders from './MyOrders';
// import ErrorPage from './ErrorPage';
// import SellOnCattleShop from './SellOnCattleShop';
// import Goats from './Goats';
// import Cows from './Cows';
// import Sheeps from './Sheeps';
// import Camel from './Camel';
// import CattleDetail from './CattleDetails';
// import ProceedToPay from './ProceedToPay';
// import OrderRequest from './OrderRequest';
import Register from './Register';
import Login from './Login';
// import Logout from './Logout';
// import PrivacyPolicy from './PrivacyPolicy';
// import PaymentMethod from './PaymentMethod';
// import TermsConditions from './TermsConditions';
// import HelpCenter from './HelpCenter';
// import HowToBuy from './HowToBuy';
// import TrackYourOrder from './TrackYourOrder';
// import PurchaseProtection from './PurchaseProtection';
import CRegistration from '../UserRegistration/customerReg/CustomerRegistration'
import SRegistration from '../UserRegistration/supplierReg/SupplierRegistration';
import ConRegistration from '../UserRegistration/consultantReg/ConsultantRegistration';
import PickAndDropRegistration from '../UserRegistration/pick&dropReg/Pick&dropRegistration';
import React, { createContext, useReducer } from 'react';
import { initialvalue, initialState, logoutInitialstate, reducer, lreducer, treducer, logoutreducer, CattleIdreducer, ConsultantFeereducer, PickDropFeereducer, CustomerIdreducer, ConsultantIdreducer, PickDropEmailreducer, AddToCartStatusreducer, AdminDashboardValidationReducer } from '../Reducer/UseReducer';
import Cart from './Cart';
// import AddCattleForm from './AddCattle';
// import ShowCattle from './ShowCattles';
// import MyCart from './MyCart';


//Creating Context api
export const UserContext = createContext();
export const LoginContext = createContext();
export const TypeContext = createContext();
export const LogoutContext = createContext();
export const CattleIdContext = createContext();
export const ConsultantFeeContext = createContext();
export const PickDropFeeContext = createContext();
export const CustomerIdTransfer = createContext();
export const ConsultantIdTransfer = createContext();
export const PickDropEmailTransfer = createContext();
export const AddToCartStatus = createContext();
export const AdminDashboardValidation = createContext();


function App() {

    //Creating useReducer state
    const [mstate, dispatch] = useReducer(reducer, initialState);
    const [lstate, ldispatch] = useReducer(lreducer, initialState);
    const [tstate, tdispatch] = useReducer(treducer, initialState);
    const [logoutstate, logoutdispatch] = useReducer(logoutreducer, logoutInitialstate);
    const [CattleIdstate, CattleIddispatch] = useReducer(CattleIdreducer, initialState);
    const [ConsultantFeestate, ConsultantFeedispatch] = useReducer(ConsultantFeereducer, initialvalue);
    const [PickDropFeestate, PickDropFeedispatch] = useReducer(PickDropFeereducer, initialvalue);
    const [CustomerIDstate, CustomerIDdispatch] = useReducer(CustomerIdreducer, initialState);
    const [ConsultantIdstate, ConsultantIddispatch] = useReducer(ConsultantIdreducer, initialState);
    const [PickDropEmailstate, PickDropEmaildispatch] = useReducer(PickDropEmailreducer, initialState);
    const [AddToCartStatusstate, AddToCartStatusdispatch] = useReducer(AddToCartStatusreducer, initialState);
    const [AdminDashboardValidationState, AdminDashboardValidationDispatch] = useReducer(AdminDashboardValidationReducer, initialState);


    return (
        <>

            <UserContext.Provider value={{ mstate, dispatch }}>
                <LoginContext.Provider value={{ lstate, ldispatch }}>
                    <TypeContext.Provider value={{ tstate, tdispatch }}>
                        <LogoutContext.Provider value={{ logoutstate, logoutdispatch }}>
                            <CattleIdContext.Provider value={{ CattleIdstate, CattleIddispatch }}>
                                <ConsultantFeeContext.Provider value={{ ConsultantFeestate, ConsultantFeedispatch }}>
                                    <PickDropFeeContext.Provider value={{ PickDropFeestate, PickDropFeedispatch }}>
                                        <CustomerIdTransfer.Provider value={{ CustomerIDstate, CustomerIDdispatch }} >
                                            <ConsultantIdTransfer.Provider value={{ ConsultantIdstate, ConsultantIddispatch }}>
                                                <PickDropEmailTransfer.Provider value={{ PickDropEmailstate, PickDropEmaildispatch }}>
                                                    <AddToCartStatus.Provider value={{ AddToCartStatusstate, AddToCartStatusdispatch }}>
                                                        <AdminDashboardValidation.Provider value={{ AdminDashboardValidationState, AdminDashboardValidationDispatch }}>
                                                            <Switch>
                                                                <Route exact path='/home' component={Home} />
                                                                {/* <Route exact path='/admin' component={Admin} /> */}
                                                                {/* <Route exact path='/admin-dashboard' component={AdminDashboard} /> */}
                                                                {/* <Route exact path='/cattle-details' component={CattleDetail} /> */}
                                                                {/* <Route exact path='/optional' component={Optional} /> */}
                                                                {/* <Route exact path='/proceed-to-pay' component={ProceedToPay} /> */}
                                                                {/* <Route exact path='/customer-requests' component={OrderRequest} /> */}
                                                                {/* <Route exact path='/cattle' component={Cattles} /> */}
                                                                {/* <Route exact path='/aboutus' component={AboutUs} /> */}
                                                                {/* <Route exact path='/customer-orders' component={MyOrders} /> */}
                                                                {/* <Route exact path='/add-cattle' component={AddCattleForm} /> */}
                                                                <Route exact path='/cart' component={Cart} />
                                                                {/* <Route exact path='/show-cattles' component={ShowCattle} /> */}
                                                                {/* <Route exact path='/account' component={Account} /> */}
                                                                {/* <Route exact path='/contactus' component={ContactUs} /> */}
                                                                <Route exact path='/event' component={Events} />
                                                                {/* <Route exact path='/error' component={ErrorPage} /> */}
                                                                {/* <Route exact path='/selloncattleshop' component={SellOnCattleShop} /> */}
                                                                {/* <Route exact path='/goat' component={Goats} /> */}
                                                                {/* <Route exact path='/cow' component={Cows} /> */}
                                                                {/* <Route exact path='/sheep' component={Sheeps} /> */}
                                                                {/* <Route exact path='/camel' component={Camel} /> */}
                                                                <Route exact path='/register' component={Register} />
                                                                {/* <Route exact path='/privacy&policy' component={PrivacyPolicy} /> */}
                                                                {/* <Route exact path='/payment-method' component={PaymentMethod} /> */}
                                                                {/* <Route exact path='/termsconditions' component={TermsConditions} /> */}
                                                                {/* <Route exact path='/help' component={HelpCenter} /> */}
                                                                {/* <Route exact path='/howtobuy' component={HowToBuy} /> */}
                                                                {/* <Route exact path='/trackyourorder' component={TrackYourOrder} /> */}
                                                                {/* <Route exact path='/purchaseprotection' component={PurchaseProtection} /> */}
                                                                {/* <Route exact path='/login' component={Login} /> */}
                                                                {/* <Route exact path='/logout' component={Logout} /> */}
                                                                <Route exact path='/customer-registration' component={CRegistration} />
                                                                <Route exact path='/supplier-registration' component={SRegistration} />
                                                                <Route exact path='/consultant-registration' component={ConRegistration} />
                                                                <Route exact path='/pick-and-drop-registration' component={PickAndDropRegistration} />
                                                                <Redirect to='/home' />
                                                            </Switch>
                                                        </AdminDashboardValidation.Provider>
                                                    </AddToCartStatus.Provider>
                                                </PickDropEmailTransfer.Provider>
                                            </ConsultantIdTransfer.Provider>
                                        </CustomerIdTransfer.Provider>
                                    </PickDropFeeContext.Provider>
                                </ConsultantFeeContext.Provider>
                            </CattleIdContext.Provider>
                        </LogoutContext.Provider>
                    </TypeContext.Provider>
                </LoginContext.Provider>
            </UserContext.Provider>

        </>
    );
}

export default App;