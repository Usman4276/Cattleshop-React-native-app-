const bcrypt = require('bcrypt');
const express = require('express');
const router = new express.Router();
const path = require('path');
const multer = require('multer');
const stripe = require('stripe')('sk_test_51J9TBbLnZ7JeDDz1HZb4r5oHq5GQ1ClbRbpb3iZe8bu3JFdyxl76FTroPyBf1i3nliBpRkf7zr1TzYVzkuvfr6m400BxwsicSi');

const CustomerModel = require('../db/model/customer_models');
const SupplierModel = require('../db/model/supplier_models');
const ConsultantModel = require('../db/model/consultant_models');
const PickandDropModel = require('../db/model/pick&drop_models');
const MyCattle = require('../db/model/add_cattle_model');
const CustomerRequest = require('../db/model/customer_request');
const MyCart = require('../db/model/cart_model');
const OrderHistory = require('../db/model/order_history_model');
const SecondOrderHistory = require('../db/model/order_history_two_model');
const EventTicket = require('../db/model/event_ticket_model');
const Checkout = require('../db/model/checkout_model');
const Feedback = require('../db/model/feedback_model');
const Notification = require('../db/model/notification_model');
const StockStatus = require('../db/model/out_of_stock_model');
const EventDetail = require('../db/model/event-details_model');




//Golbal variable
let image = [];
let img = [];
let supplier_name, supplier_phone;


//Multer storage
const Storage = multer.diskStorage({
    destination: './public/upload/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const poster_Storage = multer.diskStorage({
    destination: './public/events/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

//Multer upload middleware
const Upload = multer({
    storage: Storage,
}).array('files', 3);

//Multer upload middleware
const event_poster_Upload = multer({
    storage: poster_Storage,
}).single('file');



router.get('/', (req, res) => {
    res.send('Backend Home Page');
})

// For Registration

router.post('/customer-registration', async (req, res) => {

    const { fullname, email, password, address, phone } = req.body;

    try {
        if (fullname == '' || email == '' || password == '' || address == '' || phone == '') {

            console.log('Empty input fields');
            return res.json({
                empty: 'true'
            })
        }
        const valid = await CustomerModel.findOne({ email: email });
        if (valid) {
            // const flag=true;
            console.log('Email already exist');
            return res.json({
                flag: 'true'
            });
        } else {

            const finalData = new CustomerModel({ fullname, email, password, address, phone });
            const data = await finalData.save();
            if (data) {
                console.log('Data saved to db 💥');
                console.log(data.password);
                return res.json(data);
            }
            //return res.json({ok: false })
        }
    } catch (error) {
        console.log('Data not saved 😠');
        return res.status(400).end()
    }

})
router.post('/supplier-registration', async (req, res) => {

    const { fullname, email, password, address, cnic, phone } = req.body;

    try {
        if (fullname == '' || email == '' || password == '' || address == '' || cnic == '' || phone == '') {

            console.log('Empty input fields');
            return res.json({
                empty: 'true'
            })
        }
        const valid = await SupplierModel.findOne({ email: email });
        const validCnic = await SupplierModel.findOne({ cnic: cnic });

        if (valid && validCnic) {

            console.log('both exist');
            res.json({
                both: 'true'
            })
        } else if (valid && validCnic === null) {
            res.json({
                flag: 'true'
            })
        } else if (validCnic && valid === null) {
            return res.json({
                validCnic: 'true'
            });
        } else {

            const finalData = new SupplierModel({ fullname, email, password, address, cnic, phone });
            const data = await finalData.save();
            if (data) {
                console.log('Data saved to db 💥');
                console.log(data);
                return res.json(data);
            }
            //return res.json({ok: false })
        }
    } catch (error) {
        console.log('Data not saved 😠');
        return res.status(400).end()
    }

})
router.post('/consultant-registration', async (req, res) => {

    const { fullname, email, password, address, cnic, charges, phone } = req.body;

    try {
        if (fullname == '' || email == '' || password == '' || address == '' || cnic == '' || charges == '' || phone == '') {

            console.log('Empty input fields');
            return res.json({
                empty: 'true'
            })
        }
        const valid = await ConsultantModel.findOne({ email: email });
        const validCnic = await ConsultantModel.findOne({ cnic: cnic });

        if (valid && validCnic) {

            console.log('both exist');
            res.json({
                both: 'true'
            })
        } else if (valid && validCnic === null) {
            res.json({
                flag: 'true'
            })
        } else if (validCnic && valid === null) {
            return res.json({
                validCnic: 'true'
            });
        } else {

            const finalData = new ConsultantModel({ fullname, email, password, address, cnic, charges, phone });
            const data = await finalData.save();
            if (data) {
                console.log('Data saved to db 💥');
                console.log(data);
                return res.json(data);
            }
            //return res.json({ok: false })
        }
    } catch (error) {
        console.log('Data not saved 😠');
        return res.status(400).end()
    }

})
router.post('/pick-and-drop-registration', async (req, res) => {

    const { fullname, email, password, address, cnic, vehicle_no, charges, phone } = req.body;

    try {
        if (fullname == '' || email == '' || password == '' || address == '' || cnic == '' || vehicle_no == '' || charges == '' || phone == '') {

            console.log('Empty input fields');
            return res.json({
                empty: 'true'
            })
        }
        const valid = await PickandDropModel.findOne({ email: email });
        const validCnic = await PickandDropModel.findOne({ cnic: cnic });
        const validVehicleNumber = await PickandDropModel.findOne({ vehicle_no: vehicle_no });

        if (valid && validCnic && validVehicleNumber) {

            console.log('All exist');
            res.json({
                three: 'true'
            })
        } else if (valid && validCnic && validVehicleNumber === null) {
            res.json({
                valid: 'true',
                validCnic: 'true'

            })
        } else if (valid && validCnic === null && validVehicleNumber) {
            return res.json({
                valid: 'true',
                validVehicleNumber: 'true'
            });
        } else if (valid && validCnic === null && validVehicleNumber === null) {
            return res.json({
                valid: 'true'
            });

        } else if (valid === null && validCnic && validVehicleNumber) {
            return res.json({
                validCnic: 'true',
                validVehicleNumber: 'true'
            });

        } else if (valid === null && validCnic && validVehicleNumber === null) {
            return res.json({
                validCnic: 'true',

            });

        } else if (valid === null && validCnic === null && validVehicleNumber) {
            return res.json({
                validVehicleNumber: 'true',

            });

        }
        else {

            const finalData = new PickandDropModel({ fullname, email, password, address, cnic, vehicle_no, charges, phone });
            const data = await finalData.save();
            if (data) {
                console.log('Data saved to db 💥');
                console.log(data);
                return res.json(data);
            }
            //return res.json({ok: false })
        }
    } catch (error) {
        console.log('Data not saved 😠');
        return res.status(400).end()
    }

})


//For Login
router.post('/customer-login', async (req, res) => {

    const { email, password } = req.body;
    //console.log(req.body);

    try {
        if (email === '' || password === '') {

            console.log('Empty input fields');
            return res.json({
                empty: 'true'
            })
        }
        const valid = await CustomerModel.findOne({ email: email });
        //console.log(password,valid.password);
        const passValid = await bcrypt.compare(password, valid.password);
        if (valid && passValid) {
            //console.log(passValid);
            // const flag=true;
            console.log('Customer exist');
            return res.json({
                login: 'true'
            });
        } else {
            return res.json({
                login: 'false'
            })
        }
    } catch (error) {
        console.log('Login failed');
        return res.status(400).json({
            login: 'fail'
        });

    }

})
router.post('/supplier-login', async (req, res) => {

    const { email, password } = req.body;

    try {
        if (email == '' || password == '') {

            console.log('Empty input fields');
            return res.json({
                empty: 'true'
            })
        }
        const valid = await SupplierModel.findOne({ email: email });
        const passValid = await bcrypt.compare(password, valid.password);
        if (valid && passValid) {
            // const flag=true;
            console.log('Supplier exist');
            return res.json({
                login: 'true'
            });
        } else {
            return res.json({
                login: 'false'
            })
        }
    } catch (error) {
        console.log('Login failed');
        return res.status(400).json({
            login: 'fail'
        });
    }

})
router.post('/consultant-login', async (req, res) => {

    const { email, password } = req.body;

    try {
        if (email == '' || password == '') {

            console.log('Empty input fields');
            return res.json({
                empty: 'true'
            })
        }
        const valid = await ConsultantModel.findOne({ email: email });
        const passValid = await bcrypt.compare(password, valid.password);
        if (valid && passValid) {
            // const flag=true;
            console.log('Consultant exist');
            return res.json({
                login: 'true'
            });
        } else {
            return res.json({
                login: 'false'
            })
        }
    } catch (error) {
        console.log('Login failed');
        return res.status(400).json({
            login: 'fail'
        });
    }

})
router.post('/pick-&-drop-service-login', async (req, res) => {

    const { email, password } = req.body;

    try {
        if (email == '' || password == '') {

            console.log('Empty input fields');
            return res.json({
                empty: 'true'
            })
        }
        const valid = await PickandDropModel.findOne({ email: email });
        const passValid = await bcrypt.compare(password, valid.password);
        if (valid && passValid) {
            // const flag=true;
            console.log('Pick & drop service exist');
            return res.json({
                login: 'true'
            });
        } else {
            return res.json({
                login: 'false'
            })
        }
    } catch (error) {
        console.log('Login failed');
        return res.status(400).json({
            login: 'fail'
        });
    }

})

//For getting data from DB
router.post('/account', async (req, res) => {

    try {

        let data;
        const email = req.body.mylstate;
        const type = req.body.mytstate;

        console.log(`data from account ${email} 🥇 `);
        console.log(`Account type= ${type} 🥈 `);

        if (type === 'customer') {
            data = await CustomerModel.findOne({ email });
        }
        else if (type === 'supplier') {
            data = await SupplierModel.findOne({ email });
        }
        else if (type === 'consultant') {
            data = await ConsultantModel.findOne({ email });
        }
        else {
            data = await PickandDropModel.findOne({ email });
        }

        if (data) {
            supplier_name = data.fullname;
            supplier_phone = data.phone;
            console.log(`my data ${data} 🎧 `);
            return res.json(data);
        }

    } catch (error) {

        console.log(error);
    }

})

//For add Cattles
router.post('/add-cattle', async (req, res) => {

    const { cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_email } = req.body;
    console.log(` 🎱  add cattle data ${supplier_email}`);

    const finalimg = JSON.stringify(image);
    console.log(`finalimg = ${finalimg}`);
    console.log(` 🐕 supplier_name = ${supplier_name}`);
    console.log(` 🐕 supplier_name = ${supplier_phone}`);
    const finaldata = new MyCattle({
        image: image, cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_email, supplier_name, supplier_phone
    })

    await finaldata.save().then((data) => {
        return res.json(data);
    }).catch((err) => {
        console.log(`no saved data to db 😠 ${err}`);
        return res.json(err)
    })
})

router.put('/update-cattle/:Edit_CattleID_State', async (req, res) => {
    const id = req.params.Edit_CattleID_State;
    const { img_name, cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_email } = req.body;
    const image = img_name;

    console.log(` 🐫 cattle name = ${cattle_name}`);
    console.log(` 🐫 id = ${id}`);
    console.log(` 🐫 id = ${supplier_name}`);

    try {

        await MyCattle.updateOne({ _id: id }, {
            $set: {
                image: image,
                cattle_name: cattle_name,
                cattle_type: cattle_type,
                cattle_age: cattle_age,
                cattle_des: cattle_des,
                cattle_city: cattle_city,
                cattle_price: cattle_price,
                supplier_email: supplier_email,
                supplier_name: supplier_name,
                supplier_phone: supplier_phone,
            },

        }, (err, doc) => {
            if (err) {
                res.json(err)
            } else {
                res.json(doc);
            }
        })

    } catch (error) {
        res.json(error);
    }

})

//For upload image to public/upload
router.post('/upload', Upload, async (req, res) => {
    try {

        img = req.files;
        const data = JSON.stringify(img);
        const mydata = JSON.parse(data);

        console.log(`💯 myData=${data}`);
        console.log(` 🔢 myimg=${img}`);
        console.log(img.length);




        // for (let x = 0; x < img.length; x++) {
        //     image[x] = mydata[x].originalname;

        // }

        image = mydata.map((value) => {
            return value.originalname;
        })

        console.log(`my image array ${image}`);
        return res.json({ img: mydata });

    } catch (error) {
        console.log(`error of image 🌌 ${error}`);
        return res.json(error);

    }
})

router.post('/upload-poster', event_poster_Upload, async (req, res) => {
    let poster = [];
    poster = req.file;
    console.log(` 🐬 poster = ${poster}`);

    try {
        const data = JSON.stringify(poster);
        const mydata = JSON.parse(data);

        res.json(mydata);

    } catch (err) {
        res.json(err);
    }
})

//For Show Cattles
router.post('/show-cattles', async (req, res) => {
    const supplier_email = req.body.mylstate;
    console.log(`ShowCattles = ${supplier_email}`);
    try {
        const CattleData = await MyCattle.find({ supplier_email });
        if (CattleData) {
            console.log(`CattleData=${CattleData}`);
            return res.json(CattleData);
        }
    } catch (error) {
        console.log(`Error here = ${error}`);
    }


})

//For Deleting Cattle
router.post('/delete/:id', async (req, res) => {

    try {

        CattleId = req.params.id;
        console.log(`CattleId = ${CattleId}`);
        MyCattle.findByIdAndDelete(CattleId, (err, doc) => {
            if (err) {
                console.log(` 😈 ${err} `);
            } else {
                console.log(` 😄 ${doc} `);
                res.json({
                    delete: 'true'
                })
            }

        });
    } catch (error) {
        console.log(` 🐍 ${error} `);
    }
})

//For Showing Cows Data
router.post('/cattles', async (req, res) => {
    const cattle_type = req.body.Selection;
    try {
        const CattleData = await MyCattle.find({ cattle_type });
        console.log(`CattleType = ${CattleData}`);
        if (CattleData) {
            return res.json(CattleData);
        }
    } catch (error) {
        console.log(`Error here = ${error}`);
    }
})

router.post('/cattle-details/:id', async (req, res) => {

    const cattleId = req.params.id;
    console.log(` 🆔 cattleId = ${cattleId}`);
    await MyCattle.findById(cattleId, (err, doc) => {
        if (err) {
            console.log(` 🧝‍♂️ err = ${err} `);
            res.json({
                err: err,
            })
        } else {
            // console.log(doc);
            res.json(doc)
        }
    })
})


router.get('/optional-consultant', async (req, res) => {
    try {

        const ConsultantData = await ConsultantModel.find();
        if (ConsultantData) {
            res.json(ConsultantData);
        }

    } catch (error) {
        console.log(error);
    }
})

router.get('/optional-pick-drop', async (req, res) => {
    try {

        const PickDropData = await PickandDropModel.find();
        if (PickDropData) {
            res.json(PickDropData);
        }

    } catch (error) {
        console.log(error);
    }
})

router.post('/customer-detail', async (req, res) => {
    try {
        const email = req.body.CustomerEmail;
        const CutomerDetail = await CustomerModel.find({ email });
        console.log(CutomerDetail);
        if (CutomerDetail) {
            res.json(CutomerDetail);
        }

    } catch (error) {
        console.log(error);
    }
})

router.post('/customer/:id', async (req, res) => {
    try {
        const email = req.params.id;
        console.log(` 🆔 customerID = ${email}`);
        const data = await CustomerModel.find({ email });

        if (data) {
            res.json(data);
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/consultant/:id', async (req, res) => {
    try {
        const email = req.params.id;
        console.log(` 🆔 consultantID = ${email}`);
        const data = await ConsultantModel.find({ email });

        if (data) {
            res.json(data);
        }

    } catch (error) {
        console.log(error);
    }
})

router.post('/customer-request', async (req, res) => {

    const { imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone } = req.body;

    // For notification data
    const imageArray1 = imageArray;
    const selected_consultant_email1 = selected_consultant_email;
    const selected_pickdrop_email1 = selected_pickdrop_email;
    const cattle_name1 = cattle_name;
    const cattle_type1 = cattle_type;
    const cattle_age1 = cattle_age;
    const cattle_city1 = cattle_city;
    const cattle_price1 = cattle_price;
    const supplier_email1 = supplier_email;
    const supplier_name1 = supplier_name;
    const supplier_phone1 = supplier_phone;
    const customer_fullname1 = customer_fullname;
    const customer_email1 = customer_email;
    const customer_phone1 = customer_phone;

    // For Order history second
    const imageArray2 = imageArray;
    const selected_consultant_email2 = selected_consultant_email;
    const selected_pickdrop_email2 = selected_pickdrop_email;
    const cattle_name2 = cattle_name;
    const cattle_type2 = cattle_type;
    const cattle_age2 = cattle_age;
    const cattle_city2 = cattle_city;
    const cattle_price2 = cattle_price;
    const supplier_email2 = supplier_email;
    const supplier_name2 = supplier_name;
    const supplier_phone2 = supplier_phone;
    const customer_fullname2 = customer_fullname;
    const customer_email2 = customer_email;
    const customer_phone2 = customer_phone;


    console.log(` ✉️ consultant email = ${selected_consultant_email2}`);

    try {

        const CustomerReq = new CustomerRequest({ imageArray: imageArray, selected_consultant_email, selected_pickdrop_email, cattle_name, cattle_type, cattle_age, cattle_city, cattle_price, cattle_price, supplier_email, supplier_name, supplier_phone, customer_fullname, customer_email, customer_phone });

        const CustomerReq1 = new Notification({ imageArray1, selected_consultant_email1, selected_pickdrop_email1, cattle_name1, cattle_type1, cattle_age1, cattle_city1, cattle_price1, supplier_email1, supplier_name1, supplier_phone1, customer_fullname1, customer_email1, customer_phone1 });

        const CustomerReq2 = new SecondOrderHistory({ imageArray2, selected_consultant_email2, selected_pickdrop_email2, cattle_name2, cattle_type2, cattle_age2, cattle_city2, cattle_price2, cattle_price2, supplier_email2, supplier_name2, supplier_phone2, customer_fullname2, customer_email2, customer_phone2 });


        await CustomerReq.save().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })

        await CustomerReq1.save();

        await CustomerReq2.save();


    } catch (error) {
        res.json(error);
    }
})
router.get('/customer-request', async (req, res) => {

    try {

        const CustomerReq = await CustomerRequest.find();

        if (CustomerReq) {
            res.json(CustomerReq);
        }

    } catch (error) {
        res.json(error);
    }
})

router.post('/notificaton-data', async (req, res) => {

    try {

        const tstate = req.body.mytstate;
        let data;

        if (tstate === 'consultant' || tstate === 'Consultant') {

            const selected_consultant_email1 = req.body.mylstate;
            data = await Notification.find({ selected_consultant_email1 });

        } else {

            const selected_pickdrop_email1 = req.body.mylstate;
            data = await Notification.find({ selected_pickdrop_email1 });
        }

        if (data) {
            res.json(data);
        }
    } catch (error) {
        res.json(error);
    }
})
router.post('/get-notification-data', async (req, res) => {

    try {
        const customer_email1 = req.body.mylstate;

        const data = await Notification.find({ customer_email1 });

        if (data) {
            res.json(data);
        }
    } catch (error) {
        res.json(error);
    }
})

router.post('/add-to-cart', async (req, res) => {
    const { imgArray, cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_name, supplier_email, supplier_phone } = req.body;

    try {

        const CattleDetails = new MyCart({ imgArray: imgArray, cattle_name, cattle_type, cattle_age, cattle_des, cattle_city, cattle_price, supplier_name, supplier_email, supplier_phone });

        await CattleDetails.save().then((data) => {

            res.json(data);

        }).catch((err) => {

            console.log(err);
        })



    } catch (error) {
        res.json(error);
    }
})
router.get('/add-to-cart', async (req, res) => {

    try {

        await MyCart.find().then((data) => {

            res.json(data);

        }).catch((err) => {

            console.log(err);
        })
    } catch (error) {
        res.json(error);
    }
})
router.get('/order-history', async (req, res) => {

    try {

        const data = await OrderHistory.find();
        if (data) {
            res.json(data);
        }

    } catch (error) {
        res.json(error);
    }
})

router.post('/cart/:id', async (req, res) => {

    const id = req.params.id;

    try {
        await MyCart.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/remove-cart', async (req, res) => {

    const idArray = req.body.cart_id;

    console.log(` 🅰️ idArray = ${idArray}`);

    try {
        idArray.map((value) => {
            MyCart.findByIdAndDelete(value, (err, doc) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(doc);
                }
            })
        })

    } catch (error) {
        console.log(error);
    }
})

router.post('/remove-checkout/:id', async (req, res) => {

    const id = req.params.id;



    try {

        Checkout.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.json(err)
            } else {
                res.json(doc);
            }
        });

    } catch (error) {
        console.log(error);
    }
})

router.post('/checkout', async (req, res) => {

    const cart_data = req.body.CartData;
    const cart_data1 = req.body.CartData;

    const { selected_consultant_email, selected_pickdrop_email } = req.body;

    selected_consultant_email1 = selected_consultant_email;
    selected_pickdrop_email1 = selected_pickdrop_email;


    const checkoutData = new Checkout({ cart_data, selected_consultant_email, selected_pickdrop_email })

    const checkoutData1 = new OrderHistory({ cart_data1, selected_consultant_email1, selected_pickdrop_email1 })

    await checkoutData.save().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })

    await checkoutData1.save().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
})

router.get('/checkout', async (req, res) => {

    try {

        const checkoutData = await Checkout.find();

        if (checkoutData) {
            res.json(checkoutData);
        }

    } catch (error) {
        res.json(error);
    }
})

router.get('/registered-suppliers', async (req, res) => {
    try {
        const data = await SupplierModel.find();
        if (data) {
            res.json(data);
        }
    } catch (error) {
        res.json(error);
    }
})

router.post('/registered-suppliers/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await SupplierModel.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        })

    } catch (error) {
        res.json(error);
    }
})

router.get('/registered-consultant', async (req, res) => {
    try {
        const data = await ConsultantModel.find();
        if (data) {
            res.json(data);
        }
    } catch (error) {
        res.json(error);
    }
})

router.post('/registered-consultant/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await ConsultantModel.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        })

    } catch (error) {
        res.json(error);
    }
})

router.get('/registered-pickdrop', async (req, res) => {
    try {
        const data = await PickandDropModel.find();
        if (data) {
            res.json(data);
        }
    } catch (error) {
        res.json(error);
    }
})

router.post('/registered-pickdrop/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await PickandDropModel.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        })

    } catch (error) {
        res.json(error);
    }
})

router.post('/event-ticket', async (req, res) => {
    try {
        const { fullname, email, cnic, date } = req.body;
        const finaldata = new EventTicket({ fullname, email, cnic, date });
        await finaldata.save().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/event-ticket', async (req, res) => {
    try {

        await EventTicket.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/event-ticket/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await EventTicket.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/feedback', async (req, res) => {

    try {

        const comment = req.body.CommentState;
        const customer_name = req.body.customer_name;
        const cattle_id = req.body.cattle_id;

        const data = new Feedback({ comment, customer_name, cattle_id });
        data.save().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })

    } catch (error) {
        res.json(error);
    }
})

router.post('/feedback-data', async (req, res) => {

    try {

        await Feedback.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })

    } catch (error) {
        res.json(error);
    }
})

router.get('/get-customer-req-data', async (req, res) => {

    try {

        await CustomerRequest.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })

    } catch (error) {
        res.json(error);
    }
})

router.post(`/remove-customer-request/:Buy_now_cattle_id`, async (req, res) => {

    const id = req.params.Buy_now_cattle_id;

    try {

        await CustomerRequest.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/order-history-two', async (req, res) => {

    try {

        await SecondOrderHistory.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })

    } catch (error) {
        res.json(error);
    }
})

router.post('/stock', async (req, res) => {

    const { cattle_id, cattle_status } = req.body;
    try {

        const finaldata = new StockStatus({ cattle_id, cattle_status });
        await finaldata.save().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })

    } catch (error) {
        console.log(error);
    }
})

router.get('/stock', async (req, res) => {

    await StockStatus.find().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
})

router.post('/event-detail', async (req, res) => {

    try {
        const event_detail = req.body.Input
        const img_name = req.body.img_name
        const finaldata = new EventDetail({ event_detail, img_name });
        await finaldata.save().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })

    } catch (error) {
        res.json(error);
    }
})

router.get('/show-event', async (req, res) => {
    try {

        await EventDetail.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err);
        })

    } catch (error) {
        res.json(error);
    }
})

router.post('/remove-event/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await EventDetail.findByIdAndDelete(id, (err, doc) => {
            if (err) {
                res.json(err);
            } else {
                res.json(doc);
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//Stripe payment integration
router.post('/stripe-pay', async (req, res) => {

    const { Amount, token } = req.body;

    stripe.customers.create({
        email: token.email,
        source: token.id
    })
        .then(customer => {
            stripe.charges.create({
                amount: Amount * 100,
                currency: 'PKR',
                customer: customer.id,
                receipt_email: token.email,

            })
        })
        .then((result) => {
            res.json(result);
        })
        .catch(error => console.error(error));

})

module.exports = router;
