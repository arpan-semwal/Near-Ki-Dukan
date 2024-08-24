import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import 'reflect-metadata'; 
import 'dotenv/config';
import { AppDataSource } from './src/config/data-source.js';
import routes from './src/routes/index.js';
const PORT = process.env.PORT || 3000;
const app = express();
 
app.use(cors({
  origin: '*',  // Allow requests from any origin
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully using App Data Source');
  })
  .catch((error) => console.log('Database connection error:', error));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage: storage });
 
app.use(bodyParser.json());  // To parse JSON bodies

app.use('/api', routes);

//// to check weather the number is present in the which database
///*****************************************To check whether the phonenumber exist in database if yes which************************************************************************************************************************ */
////app.post('/checkPhoneNumber', (req, res) => {
////  const { phoneNumber } = req.body;

////  // Check if the phone number exists in the shopkeepers table
////  db.query('SELECT * FROM shopkeepers WHERE phoneNumber = ?', [phoneNumber], (err, shopkeeperResults) => {
////      if (err) {
////          console.error('Error checking shopkeeper existence:', err);
////          return res.status(500).json({ message: 'Internal server error' });
////      }

////      // Check if the phone number exists in the newcustomers table
////      db.query('SELECT * FROM newcustomers WHERE phoneNumber = ?', [phoneNumber], (err, customerResults) => {
////          if (err) {
////              console.error('Error checking customer existence:', err);
////              return res.status(500).json({ message: 'Internal server error' });
////          }

////          if (shopkeeperResults.length > 0) {
////              // Phone number exists in shopkeepers database
////              return res.status(400).json({ message: 'Phone number already exists in shopkeepers database' });
////          } else if (customerResults.length > 0) {
////              // Phone number exists in newcustomers database
////              return res.status(400).json({ message: 'Phone number already exists in newcustomers database' });
////          } else {
////              // Phone number doesn't exist in either database
////              return res.status(200).json({ message: 'Phone number available' });
////          }
////      });
////  });
////});





/////**************************************************Customer Registeration*************************************************************************************************************** */
//app.post('/register', (req, res) => {
//  const { phoneNumber, name, pincode, state, city, address, shopID } = req.body;

//  // Check if user already exists
//  db.query('SELECT * FROM newcustomers WHERE phoneNumber = ?', [phoneNumber], (err, results) => {
//    if (err) {
//      console.error('Error checking user existence:', err);
//      return res.status(500).json({ message: 'Internal server error' });
//    }
//    if (results.length > 0) {
//      return res.status(400).json({ message: 'Phone number already registered' });
//    }

//    // If shopID is provided
//    if (shopID) {
//      // Check if shopID exists in the shopkeepers database as a phoneNumber
//      db.query('SELECT * FROM shopkeepers WHERE phoneNumber = ?', [shopID], (err, shopkeeperResults) => {
//        if (err) {
//          console.error('Error checking shopkeeper existence:', err);
//          return res.status(500).json({ message: 'Internal server error' });
//        }

//        if (shopkeeperResults.length > 0) {
//          // Shopkeeper exists with the provided shopID as phoneNumber
//          const shopkeeper = shopkeeperResults[0];

//          // Add the user to newcustomers database with shopID
//          db.query('INSERT INTO newcustomers (phoneNumber, name, shop_id, pincode, state, city, address) VALUES (?, ?, ?, ?, ?, ?, ?)', 
//          [phoneNumber, name, shopID, pincode, state, city, address], 
//          (err, result) => {
//            if (err) {
//              console.error('Error registering user:', err);
//              return res.status(500).json({ message: 'Internal server error' });
//            }
//            console.log('User registered successfully');
//            return res.status(200).json({ message: 'User registered successfully', shopType: shopkeeper.selectedCategory });
//          });
//        } else {
//          // Shopkeeper not found with the provided shopID
//          console.log('Shopkeeper not found');
//          return res.status(404).json({ message: 'ShopID not found' });
//        }
//      });
//    } else {
//      // If shopID is not provided, register the user without associating it with any shop
//      db.query('INSERT INTO newcustomers (phoneNumber, name, pincode, state, city, address) VALUES (?, ?, ?, ?, ?, ?)', 
//      [phoneNumber, name, pincode, state, city, address], 
//      (err, result) => {
//        if (err) {
//          console.error('Error registering user:', err);
//          return res.status(500).json({ message: 'Internal server error' });
//        }
//        console.log('User registered successfully');
//        return res.status(200).json({ message: 'User registered successfully', userId: result.insertId });
//      });
//    }
//  });
//});




/////********************************************Login both shopkeeper and customer******************************************************************************************** */

////app.post('/login', (req, res) => {
////  const { phoneNumber, userType } = req.body;

////  // Validate the input
////  if (!phoneNumber || !userType) {
////    return res.status(400).json({ error: 'Phone number and user type are required' });
////  }

////  // Get the current date and time for login in YYYY-MM-DD HH:MM:SS format
////  const loginTime = new Date().toISOString().replace('T', ' ').slice(0, 19);

////  if (userType === 'shopkeeper') {
////    // Fetch shopkeeper data
////    db.query(
////      'SELECT * FROM shopkeepers WHERE phoneNumber = ?',
////      [phoneNumber],
////      (err, results) => {
////        if (err) {
////          console.error('Error fetching shopkeeper data:', err);
////          return res.status(500).json({ error: 'Error fetching shopkeeper data' });
////        }
////        if (results.length === 0) {
////          return res.status(404).json({ error: 'Shopkeeper not found' });
////        }
////        const shopkeeperData = results[0];
////        const selectedCategory = shopkeeperData.selectedCategory;

////        // Fetch category data
////        db.query(
////          'SELECT * FROM category WHERE name = ?',
////          [selectedCategory],
////          (err, results) => {
////            if (err) {
////              console.error('Error fetching category data:', err);
////              return res.status(500).json({ error: 'Error fetching category data' });
////            }
////            if (results.length === 0) {
////              return res.status(404).json({ error: 'Category not found' });
////            }
////            const categoryData = results[0];
////            const shopkeeperType = categoryData.type;

////            // Log the login time for shopkeeper
////            db.query(
////              'INSERT INTO shopkeeper_login_history (phoneNumber, loginTime) VALUES (?, ?)',
////              [phoneNumber, loginTime],
////              (err) => {
////                if (err) {
////                  console.error('Error inserting shopkeeper login history:', err);
////                  return res.status(500).json({ error: 'Error inserting shopkeeper login history' });
////                }
////              }
////            );

////            res.json({ shopkeeperType, phoneNumber, userType });
////          }
////        );
////      }
////    );
////  } else if (userType === 'customer') {
////    // Fetch customer data
////    db.query(
////      'SELECT * FROM newcustomers WHERE phoneNumber = ?',
////      [phoneNumber],
////      (err, results) => {
////        if (err) {
////          console.error('Error fetching customer data:', err);
////          return res.status(500).json({ error: 'Error fetching customer data' });
////        }
////        if (results.length === 0) {
////          return res.status(404).json({ error: 'Customer not found' });
////        }

////        // Log the login time for customer
////        db.query(
////          'INSERT INTO customer_login_history (phoneNumber, loginTime) VALUES (?, ?)',
////          [phoneNumber, loginTime],
////          (err) => {
////            if (err) {
////              console.error('Error inserting customer login history:', err);
////              return res.status(500).json({ error: 'Error inserting customer login history' });
////            }
////          }
////        );

////        res.json({ message: 'Login successful for customer', phoneNumber, userType });
////      }
////    );
////  } else if (userType === 'unregistered') {
////    // Log the login time for unregistered user
////    db.query(
////      'INSERT INTO login_history (phoneNumber, userType, loginTime) VALUES (?, ?, ?)',
////      [phoneNumber, userType, loginTime],
////      (err) => {
////        if (err) {
////          console.error('Error inserting login history for unregistered user:', err);
////          return res.status(500).json({ error: 'Error inserting login history for unregistered user' });
////        }
////      }
////    );
////    res.json({ message: 'Login successful for unregistered user', phoneNumber, userType });
////  } else {
////    res.status(400).json({ error: 'Invalid user type' });
////  }
////});


/////**************************************Shopkeeper Register with assign commission to sales executive if number entered***************************************************************************************/
//app.post('/shopkeeperRegister', upload.none(), async (req, res) => {
//  const {
//      phoneNumber,
//      shopkeeperName,
//      shopID,
//      pincode,
//      shopState,
//      city,
//      address,
//      salesAssociateNumber,
//      selectedCategory,
//      selectedSubCategory,
//      deliverToHome  // Get the new field from the request body
//  } = req.body;

//  try {
//      // Insert new shopkeeper into the database
//      await new Promise((resolve, reject) => {
//          db.query(
//              'INSERT INTO shopkeepers (phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory, deliverToHome) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//              [phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber || null, selectedCategory, selectedSubCategory, deliverToHome],
//              (err, result) => {
//                  if (err) {
//                      console.error('Error registering shopkeeper:', err);
//                      reject(err);
//                      return;
//                  }
//                  resolve(result);
//              }
//          );
//      });

//      // Check if the sales associate number is provided and valid
//      if (salesAssociateNumber) {
//          const isValidSalesAssociate = await checkSalesAssociateNumber(salesAssociateNumber);
//          if (isValidSalesAssociate) {
//              // Assign commission if the sales associate number is valid
//              await checkAndAssignCommission(salesAssociateNumber);
//          } else {
//              console.error('Invalid Sales Associate Number:', salesAssociateNumber);
//              return res.status(400).json({ message: 'Invalid Sales Associate Number' });
//          }
//      }

//      res.status(200).json({ message: 'Shopkeeper registered successfully' });
//  } catch (error) {
//      console.error('Error registering shopkeeper:', error);
//      res.status(500).json({ message: 'Internal server error' });
//  }
//});
 




/////********************************************Fetch Category and sub Category****************************************************************************** */

////app.get('/categories', (req, res) => {
////  db.query('SELECT * FROM nkd.category', (err, results) => {
////      if (err) {
////          console.error('Error fetching categories:', err);
////          return res.status(500).json({ message: 'Internal server error' });
////      }
////      res.status(200).json(results);
////  });
////});

////app.get('/subcategories/:categoryId', (req, res) => {
////  const categoryId = req.params.categoryId;
////  console.log('Category ID:', categoryId); // Log the categoryId

////  // Fetch sub-categories from the database based on the category ID
////  db.query('SELECT * FROM nkd.tbl_salon_subcategory WHERE category_id = ?', [categoryId], (err, results) => {
////      if (err) {
////          console.error('Error fetching sub-categories:', err);
////          return res.status(500).json({ message: 'Internal server error' });
////      }
////      console.log('Results:', results); // Log the results
////      res.status(200).json(results);
////  });
////});




/////*********************************Fetch shopkeeperdetails********************************************************************************************** */
////app.get('/shopkeeperProductHomeDetails/:phoneNumber', (req, res) => {
////  const phoneNumber = req.params.phoneNumber;

////  db.query(
////      'SELECT shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory FROM shopkeepers WHERE phoneNumber = ?',
////      [phoneNumber],
////      (err, results) => {
////          if (err) {
////              console.error('Error fetching shopkeeper details:', err);
////              return res.status(500).json({ message: 'Internal server error' });
////          }

////          if (results.length > 0) {
////              res.status(200).json(results[0]);
////          } else {
////              // If no results found by phone number, try fetching by shop ID
////              db.query(
////                  'SELECT shopkeeperName, pincode, shopState, city, address FROM shopkeepers WHERE shopID = ?',
////                  [phoneNumber],  // Assuming phoneNumber is actually shopID in this case
////                  (err, results) => {
////                      if (err) {
////                          console.error('Error fetching shopkeeper details:', err);
////                          return res.status(500).json({ message: 'Internal server error' });
////                      }

////                      if (results.length > 0) {
////                          res.status(200).json(results[0]);
////                      } else {
////                          // If no results found by shopID as well
////                          res.status(404).json({ message: 'Shopkeeper not found' });
////                      }
////                  }
////              );
////          }
////      }
////  );
////});


////app.get('/getShopkeeperDetails', (req, res) => {
////  const { phoneNumber } = req.query;

////  // Validate phoneNumber
////  if (!phoneNumber) {
////    return res.status(400).json({ message: 'Phone number is required' });
////  }

////  db.query(
////    'SELECT * FROM shopkeepers WHERE phoneNumber = ?',
////    [phoneNumber],
////    (err, result) => {
////      if (err) {
////        console.error('Error fetching shopkeeper details:', err);
////        return res.status(500).json({ message: 'Internal server error' });
////      }
////      if (result.length > 0) {
////        res.json(result[0]);
////      } else {
////        res.status(404).json({ message: 'Shopkeeper not found' });
////      }
////    }
////  );
////});


////app.get('/shopkeeperDetails', async (req, res) => {
////  const { phoneNumber, shopID } = req.query;

////  if (!phoneNumber && !shopID) {
////    return res.status(400).json({ message: 'Phone number or Shop ID is required' });
////  }

////  try {
////    let query = 'SELECT shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory FROM shopkeepers WHERE ';
////    const params = [];

////    if (phoneNumber) {
////      query += 'phoneNumber = ?';
////      params.push(phoneNumber);
////    } else if (shopID) {
////      query += 'shopID = ?';
////      params.push(shopID);
////    }

////    const [results] = await db.query(query, params);

////    if (results.length > 0) {
////      res.status(200).json(results[0]);
////    } else {
////      res.status(404).json({ message: 'Shopkeeper not found' });
////    }
////  } catch (error) {
////    console.error('Error fetching shopkeeper details:', error);
////    res.status(500).json({ message: 'Internal server error' });
////  }
////});


////app.get('/shopkeeperServiceDetails/:phoneNumber', (req, res) => {
////  const { phoneNumber } = req.params;
////  const query = 'SELECT shopID, shopkeeperName, selectedSubCategory FROM shopkeepers WHERE phoneNumber = ?';

////  db.query(query, [phoneNumber], (err, results) => {
////    if (err) {
////      console.error('Error fetching shopkeeper details:', err);
////      res.status(500).json({ error: 'Failed to fetch shopkeeper details' });
////    } else if (results.length === 0) {
////      res.status(404).json({ error: 'Shopkeeper not found' });
////    } else {
////      res.json(results[0]);
////    }
////  });
////});

app.get('/shopkeeper', (req, res) => {
  const phoneNumber = req.query.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  db.query(
    'SELECT * FROM shopkeepers WHERE phoneNumber = ?',
    [phoneNumber],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database query failed' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Shopkeeper not found' });
      }
      res.json(results[0]);
    }
  );
 });



///*******************************************Customer Details********************************************************************************************************************/
//// Get customer details by phone number
//app.get('/customerDetails/:phoneNumber', (req, res) => {
//  const phoneNumber = req.params.phoneNumber;

//  // Query the database to fetch customer details based on phone number
//  db.query(
//      'SELECT name, pincode, shop_id  FROM newcustomers WHERE phoneNumber = ?',
//      [phoneNumber],
//      (err, result) => {
//          if (err) {
//              console.error('Error fetching customer details:', err);
//              return res.status(500).json({ message: 'Internal server error' });
//          }

//          if (result.length === 0) {
//              return res.status(404).json({ message: 'No customer found for this phone number' });
//          }

//          // Customer found
//          res.status(200).json(result[0]);
//      }
//  );
//});





/////****************************************Customer end : Customer Orders api************************************************************************************/
////app.post('/saveOrder', (req, res) => {
////  const { custName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, shopkeeperPhoneNumber } = req.body;
////  // Save order details to the database
////  db.query(
////    'INSERT INTO tbl_orders (customerName, custPhoneNumber, cartItems, totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, shopkeeperPhoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
////    [custName, custPhoneNumber, JSON.stringify(cartItems), totalPrice, selectedDate, selectedTime, shopID, shopkeeperName, shopkeeperPhoneNumber],
////    (err, result) => {
////      if (err) {
////        console.error('Error saving order:', err);
////        return res.status(500).json({ message: 'Internal server error' });
////      }
////      console.log('Order saved successfully');
////      res.status(200).json({ message: 'Order saved successfully' });
////    }
////  );
////});



////app.post('/placeOrder', (req, res) => {
////  const {
////    custPhoneNumber,
////    shopID,
////    cartItems,
////    totalPrice,
////    selectedDate,
////    selectedTime,
////    created_at,
////    customerName,
////  } = req.body;

////  const query = `
////    INSERT INTO tbl_orders (custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, created_at, customerName)
////    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
////  `;

////  db.query(query, [custPhoneNumber, shopID, cartItems, totalPrice, selectedDate, selectedTime, created_at, customerName], (error) => {
////    if (error) {
////      console.error('Error placing order:', error);
////      return res.status(500).send('Failed to place order.');
////    }
////    res.send('Order placed successfully.');
////  });
////});

////app.get('/getOrders', (req, res) => {
////const { custPhoneNumber } = req.query;

////db.query(
////  'SELECT * FROM tbl_orders WHERE custPhoneNumber = ?',
////  [custPhoneNumber],
////  (err, results) => {
////    if (err) {
////      console.error('Error fetching orders:', err);
////      return res.status(500).json({ message: 'Internal server error' });
////    }
////    res.status(200).json({ orders: results });
////  }
////);
////});


////app.get('/getCustomerOrders', (req, res) => {
////  const { custPhoneNumber } = req.query;

////  if (!custPhoneNumber) {
////    return res.status(400).send('Customer phone number is required.');
////  }

////  const query = 'SELECT * FROM tbl_orders WHERE custPhoneNumber = ? ORDER BY created_at DESC';

////  db.query(query, [custPhoneNumber], (error, results) => {
////    if (error) {
////      console.error('Error fetching customer orders:', error);
////      return res.status(500).send('Failed to fetch customer orders.');
////    }
////    res.json(results);
////  });
////});

////app.get('/getOrderDetails', (req, res) => {
////  const { shopID, custPhoneNumber } = req.query;

////  if (!shopID || !custPhoneNumber) {
////    return res.status(400).send('Shop ID and customer phone number are required.');
////  }

////  const query = `
////    SELECT cartItems, totalPrice
////    FROM tbl_orders
////    WHERE custPhoneNumber = ? AND shopID = ?
////    ORDER BY created_at DESC
////  `;

////  db.query(query, [custPhoneNumber, shopID], (error, results) => {
////    if (error) {
////      console.error('Error fetching order details:', error);
////      return res.status(500).send('Failed to fetch order details.');
////    }

////    console.log('Order Details from Database:', results);  // Log the results to see the cartItems format

////    // Flatten the JSON array from all results
////    const orders = results.map(row => ({
////      ...row,
////      cartItems: JSON.parse(row.cartItems)  // Ensure that cartItems is valid JSON
////    }));

////    res.json(orders);
////  });
////});



////app.get('/getCustomerStores', (req, res) => {
////  const { custPhoneNumber } = req.query;

////  if (!custPhoneNumber) {
////    return res.status(400).send('Customer phone number is required.');
////  }

////  const query = `
////    SELECT DISTINCT shopID
////    FROM tbl_orders
////    WHERE custPhoneNumber = ?
////    ORDER BY shopID
////  `;

////  db.query(query, [custPhoneNumber], (error, results) => {
////    if (error) {
////      console.error('Error fetching customer stores:', error);
////      return res.status(500).send('Failed to fetch customer stores.');
////    }
////    res.json(results);
////  });
////});



/////***************************************************Shopkeeper end :Shopkeeper orders fetch************************************************************************************* */

////app.get('/shopkeeperOrders/:shopkeeperPhoneNumber', (req, res) => {
////  const { shopkeeperPhoneNumber } = req.params;

////  // Query to fetch orders for the specific shopkeeper
////  const query = `
////    SELECT * FROM tbl_orders 
////    WHERE shopkeeperPhonenumber = ?
////    ORDER BY created_at DESC
////  `;

////  db.query(query, [shopkeeperPhoneNumber], (err, results) => {
////    if (err) {
////      console.error('Error fetching orders:', err);
////      return res.status(500).json({ error: 'Error fetching orders' });
////    }

////    res.json(results);
////  });
////});



/////****************************************************Shopkeeper end : Customer Who placed orders************************************************************************************** */
////app.get('/shopkeeperCustomerDetails/:shopkeeperPhoneNumber', (req, res) => {
////  const { shopkeeperPhoneNumber } = req.params;

////  const query = `
////    SELECT DISTINCT custPhoneNumber FROM tbl_orders 
////    WHERE shopkeeperPhonenumber = ?
////  `;

////  db.query(query, [shopkeeperPhoneNumber], (err, results) => {
////    if (err) {
////      console.error('Error fetching customer phone numbers:', err);
////      return res.status(500).json({ error: 'Error fetching customer phone numbers' });
////    }

////    res.json(results);
////  });
////});


/////****************************************Sales Executive module api ************************************************************************************************* */

const checkSalesAssociateNumber = async (number) => {
  try {
      // Replace the URL with the correct endpoint to check sales associate validity
      const response = await fetch(`http://192.168.29.67:3000/checkSalesAssociate/${number}`);
      if (response.ok) {
          const data = await response.json();
          return data.exists; // Assume the API returns { exists: true/false }
      } else {
          console.error('Failed to check sales associate');
          return false;
      }
  } catch (error) {
      console.error('Error checking sales associate:', error);
      return false;
  }
};


//function to fetch commissionRates form the comission_rates table
async function fetchCommissionRates() {
  try {
      const commissionRates = await new Promise((resolve, reject) => {
          db.query('SELECT * FROM commission_rates', (err, result) => {
              if (err) {
                  console.error('Error fetching commission rates:', err);
                  reject(err);
                  return;
              }
              resolve(result.reduce((acc, cur) => ({ ...acc, [cur.commissionType]: cur.amount }), {}));
          });
      });
      return commissionRates;
  } catch (error) {
      console.error('Error fetching commission rates:', error);
      throw new Error('Error fetching commission rates');
  }
}




// Function to update commission amount for an existing entry
async function updateCommissionAmount(mobileNumber, commissionType, commissionAmount) {
  console.log('Updating commission for:', mobileNumber, commissionType, commissionAmount);

  if (!mobileNumber) {
      throw new Error('mobileNumber is null or undefined');
  }

  try {
      // Ensure commissionAmount is a valid number
      const formattedCommissionAmount = parseFloat(commissionAmount).toFixed(2);
      
      // Get the current commission amount for the specified mobile number and commission type
      const currentCommission = await new Promise((resolve, reject) => {
          db.query(
              'SELECT amount FROM tbl_commission WHERE mobileNumber = ? AND commissionType = ?',
              [mobileNumber, commissionType],
              (err, result) => {
                  if (err) {
                      console.error('Error fetching current commission amount:', err);
                      reject(err);
                      return;
                  }
                  console.log('Current commission:', result);
                  resolve(result && result.length > 0 ? parseFloat(result[0].amount) : 0);
              }
          );
      });

      // Calculate the new commission amount by adding the current commission amount and the new commission amount
      const newCommissionAmount = (currentCommission + parseFloat(formattedCommissionAmount)).toFixed(2);

      // Update the commission amount in the database
      await new Promise((resolve, reject) => {
          db.query(
              'UPDATE tbl_commission SET amount = ? WHERE mobileNumber = ? AND commissionType = ?',
              [newCommissionAmount, mobileNumber, commissionType],
              (err, result) => {
                  if (err) {
                      console.error('Error updating commission amount:', err);
                      reject(err);
                      return;
                  }
                  resolve(result);
              }
          );
      });

      console.log(`Updated commission for ${mobileNumber} of type ${commissionType} to ${newCommissionAmount}`);
  } catch (error) {
      console.error('Error updating commission amount:', error);
      throw new Error('Error updating commission amount');
  }
}




// Function to assign commission, either by updating an existing entry or inserting a new one
async function assignCommission(mobileNumber, commissionType, commissionAmount) {
  console.log('Assigning commission for:', mobileNumber, commissionType, commissionAmount);

  if (!mobileNumber) {
      throw new Error('mobileNumber is null or undefined');
  }

  try {
      // Ensure commissionAmount is a valid number
      const formattedCommissionAmount = parseFloat(commissionAmount).toFixed(2);
      
      // Check if the commission entry already exists
      const existingCommission = await new Promise((resolve, reject) => {
          db.query(
              'SELECT * FROM tbl_commission WHERE mobileNumber = ? AND commissionType = ?',
              [mobileNumber, commissionType],
              (err, result) => {
                  if (err) {
                      console.error('Error checking existing commission:', err);
                      reject(err);
                      return;
                  }
                  console.log('Existing commission:', result);
                  resolve(result);
              }
          );
      });

      // If the commission entry already exists, update the amount
      if (existingCommission && existingCommission.length > 0) {
          await updateCommissionAmount(mobileNumber, commissionType, formattedCommissionAmount);
      } else {
          // Insert commission details into the database
          await new Promise((resolve, reject) => {
              db.query(
                  'INSERT INTO tbl_commission (mobileNumber, commissionType, amount) VALUES (?, ?, ?)',
                  [mobileNumber, commissionType, formattedCommissionAmount],
                  (err, result) => {
                      if (err) {
                          console.error('Error assigning commission:', err);
                          reject(err);
                          return;
                      }
                      resolve(result);
                  }
              );
          });

          console.log(`Inserted new commission for ${mobileNumber} of type ${commissionType} with amount ${formattedCommissionAmount}`);
      }
  } catch (error) {
      console.error('Error assigning commission:', error);
      throw new Error('Error assigning commission');
  }
}
 

// Function to check and assign commission based on the sales associate number
async function checkAndAssignCommission(salesAssociateNumber) {
  console.log('Checking and assigning commission for sales associate:', salesAssociateNumber);

  if (!salesAssociateNumber) {
      console.log('No sales associate number provided, skipping commission assignment.');
      return;
  }

  try {
      // Check if the sales associate number exists in the database
      const salesAssociateResult = await new Promise((resolve, reject) => {
          db.query('SELECT * FROM tbl_salesexecutives WHERE mobileNo = ?', [salesAssociateNumber], (err, result) => {
              if (err) {
                  console.error('Error checking sales associate number:', err);
                  reject(err);
                  return;
              }
              resolve(result);
          });
      });

      if (salesAssociateResult.length === 0) {
          console.warn(`Sales associate number ${salesAssociateNumber} is not valid, no commission assigned.`);
          return { error: `Sales associate number ${salesAssociateNumber} is not valid, no commission assigned.` };
      }

      let addedBy = null;

      // Check if the sales associate was added by someone
      const addedByResult = await new Promise((resolve, reject) => {
          db.query('SELECT addedBy FROM tbl_salesexecutives WHERE mobileNo = ?', [salesAssociateNumber], (err, result) => {
              if (err) {
                  console.error('Error fetching addedBy data:', err);
                  reject(err);
                  return;
              }
              resolve(result);
          });
      });

      if (addedByResult && addedByResult.length > 0) {
          addedBy = addedByResult[0].addedBy;
      }

      // Fetch commission rates from the database
      const commissionRates = await fetchCommissionRates();

      // Assign commission to the sales associate
      const commissionAmountBase = commissionRates['Base'];
      await assignCommission(salesAssociateNumber, 'Base', commissionAmountBase);

      // If the sales associate was added by someone, assign additional commission
      if (addedBy) {
          const commissionAmountL1 = commissionRates['L1'];
          await assignCommission(addedBy, 'L1', commissionAmountL1);

          // Check if the person who added the sales associate was also added by someone
          const addedByAddedByResult = await new Promise((resolve, reject) => {
              db.query('SELECT addedBy FROM tbl_salesexecutives WHERE mobileNo = ?', [addedBy], (err, result) => {
                  if (err) {
                      console.error('Error fetching addedByAddedBy data:', err);
                      reject(err);
                      return;
                  }
                  resolve(result);
              });
          });

          if (addedByAddedByResult && addedByAddedByResult.length > 0) {
              const addedByAddedBy = addedByAddedByResult[0].addedBy;
              if (addedByAddedBy) {
                  const commissionAmountL2 = commissionRates['L2'];
                  await assignCommission(addedByAddedBy, 'L2', commissionAmountL2);
              } else {
                  console.warn(`No further addedBy found for ${addedBy}, skipping L2 commission assignment.`);
              }
          } else {
              console.warn(`No further addedBy found for ${addedBy}, skipping L2 commission assignment.`);
          }
      }

  } catch (error) {
      console.error('Error assigning commission:', error);
      throw new Error('Error assigning commission');
  }
}

//register sales executive
// app.post('/submit-form', (req, res) => {
//   const { firstName, lastName, mobileNumber, pincode } = req.body;
//   const commissionLevel = 'L0'; 
//   const sql = 'INSERT INTO tbl_salesexecutives (firstName, lastName, mobileNo, pincode, level) VALUES (?, ?, ?, ?, ?)';
//   db.query(sql, [firstName, lastName, mobileNumber, pincode, commissionLevel], (err, result) => {
//     if (err) {
//       console.error('Error saving data to database:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     console.log('Data saved to database');
//     res.json({ success: true });
//   });
// });


//team member add
// app.post('/submit-team-member', (req, res) => {
//   const { mobileNumber, firstName, lastName, pincode, aadhar, upi, pancard, addedBy } = req.body;
  
//   // New team members should be assigned level L0 by default
//   const level = 'L0';

//   const insertSql = 'INSERT INTO tbl_salesexecutives (mobileNo, firstName, lastName, pincode, aadhar, upi, pancard, addedBy, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//   db.query(insertSql, [mobileNumber, firstName, lastName, pincode, aadhar, upi, pancard, addedBy, level], (err, result) => {
//       if (err) {
//           console.error('Error saving data to database:', err);
//           res.status(500).json({ error: 'Internal server error' });
//           return;
//       }
//       console.log('Team member added successfully');
//       res.json({ success: true });
//   });
// })

//info about team member
// app.get('/my-team/:mobileNumber', (req, res) => {
//   const { mobileNumber } = req.params;
//   const sql = 'SELECT * FROM tbl_salesexecutives WHERE addedBy = ?';
//   db.query(sql, [mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error fetching data from database:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }
//     console.log('Data fetched successfully');
//     res.json(result);
//   });
// });

//profile
// app.get('/my-profile/:mobileNumber', (req, res) => {
//   const mobileNumber = req.params.mobileNumber;
//   const sql = 'SELECT * FROM tbl_salesexecutives WHERE mobileNo = ?';
//   db.query(sql, [mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error fetching profile:', err);
//       res.status(500).send('Error fetching profile');
//       return;
//     }
//     if (result.length === 0) {
//       res.status(404).send('Profile not found');
//       return;
//     }
//     res.status(200).json(result[0]);
//   });
// });

// Route to update user's profile
// app.post('/update-profile', (req, res) => {
//   const { mobileNumber, firstName, lastName, pincode, aadhar, upi, pancard } = req.body;
//   const sql = 'UPDATE tbl_salesexecutives SET firstName = ?, lastName = ?, pincode = ?, aadhar = ?, upi = ?, pancard = ? WHERE mobileNo = ?';
//   db.query(sql, [firstName, lastName, pincode, aadhar, upi, pancard, mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error updating profile:', err);
//       res.status(500).send('Error updating profile');
//       return;
//     }
//     console.log('Profile updated successfully');
//     res.status(200).send('Profile updated successfully');
//   });
// });


// app.get('/shops', (req, res) => {
//   const { salesAssociateNumber } = req.query;
//   const query = `
//       SELECT * 
//       FROM shopkeeper 
//       WHERE salesAssociateNumber = ?;
//   `;
//   db.query(query, [salesAssociateNumber], (error, results) => {
//       if (error) {
//           console.error('Error fetching shops:', error);
//           res.status(500).json({ error: 'Internal Server Error' });
//           return;
//       }
//       res.json(results);
//   });
// });

// app.post('/check-user', (req, res) => {
//   const { mobileNumber } = req.body;
//   const sql = 'SELECT * FROM tbl_salesexecutives WHERE mobileNo = ?';
//   db.query(sql, [mobileNumber], (err, results) => {
//     if (err) {
//       console.error('Error checking user:', err);
//       res.status(500).json({ error: 'Internal server error' });
//       return;
//     }

//     if (results.length > 0) {
//       res.json({ exists: true });
//     } else {
//       res.json({ exists: false });
//     }
//   });
// });

// Calculate total commission for a given sales associate
app.get('/total-commission/:mobileNumber', (req, res) => {
  const { mobileNumber } = req.params;

  // Fetch the level and addedBy of the user
  db.query('SELECT level, addedBy FROM nkd.tbl_salesexecutives WHERE mobileNo = ?', [mobileNumber], (err, result) => {
      if (err) {
          console.error('Error fetching user data:', err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'User not found' });
      }

      const { level, addedBy } = result[0];
      console.log(`User Level: ${level}, Added By: ${addedBy}`);

      // Fetch individual commission rate
      db.query('SELECT commission_amount FROM nkd.commission WHERE level = ?', [level], (err, result) => {
          if (err) {
              console.error('Error fetching individual commission:', err);
              return res.status(500).json({ error: 'Internal server error' });
          }

          if (result.length === 0) {
              return res.status(404).json({ error: 'Individual commission data not found' });
          }

          const individualCommission = result[0].commission_amount;
          console.log(`Individual Commission for ${level}: ${individualCommission}`);

          // Fetch commission adjustment based on who registered the shop
          db.query('SELECT commission_amount FROM nkd.commission_level WHERE from_level = ? AND to_level = ?', [addedBy, level], (err, result) => {
              if (err) {
                  console.error('Error fetching commission adjustment:', err);
                  return res.status(500).json({ error: 'Internal server error' });
              }

              const adjustment = result.length ? result[0].commission_amount : 0;
              console.log(`Commission Adjustment from ${addedBy} to ${level}: ${adjustment}`);

              // Calculate total commission
              db.query('SELECT COUNT(*) AS shopCount FROM shopkeepers WHERE salesAssociateNumber = ?', [mobileNumber], (err, result) => {
                  if (err) {
                      console.error('Error calculating total commission:', err);
                      return res.status(500).json({ error: 'Internal server error' });
                  }

                  const shopCount = result[0].shopCount;
                  console.log(`Shop Count for ${mobileNumber}: ${shopCount}`);

                  let totalCommission = 0;

                  if (level === 'L1') {
                      // For L1, no additional adjustments
                      totalCommission = individualCommission * shopCount;
                      console.log(`Total Commission for ${mobileNumber} (L1): ${totalCommission}`);
                      return res.json({ totalCommission });
                  } else if (level === 'L2') {
                      totalCommission = (individualCommission + adjustment) * shopCount;
                      console.log(`Total Commission for ${mobileNumber} (L2): ${totalCommission}`);
                      return res.json({ totalCommission });
                  } else if (level === 'L3') {
                      // Fetch commission adjustment for L3 to L2
                      db.query('SELECT commission_amount FROM nkd.commission_level WHERE from_level = ? AND to_level = ?', ['L3', 'L2'], (err, l3ToL2Result) => {
                          if (err) {
                              console.error('Error fetching commission adjustment for L3 to L2:', err);
                              return res.status(500).json({ error: 'Internal server error' });
                          }

                          const l3ToL2Adjustment = l3ToL2Result.length ? l3ToL2Result[0].commission_amount : 0;
                          console.log(`L3 to L2 Adjustment: ${l3ToL2Adjustment}`);

                          // Fetch commission adjustment for L2 to L1
                          db.query('SELECT commission_amount FROM nkd.commission_level WHERE from_level = ? AND to_level = ?', ['L2', 'L1'], (err, l2ToL1Result) => {
                              if (err) {
                                  console.error('Error fetching commission adjustment for L2 to L1:', err);
                                  return res.status(500).json({ error: 'Internal server error' });
                              }

                              const l2ToL1Adjustment = l2ToL1Result.length ? l2ToL1Result[0].commission_amount : 0;
                              console.log(`L2 to L1 Adjustment: ${l2ToL1Adjustment}`);

                              totalCommission = (individualCommission + adjustment) * shopCount;
                              const totalL2Commission = l3ToL2Adjustment * shopCount;
                              const totalL1Commission = l2ToL1Adjustment * shopCount;

                              console.log(`Total Commission for ${mobileNumber} (L3): ${totalCommission}`);
                              console.log(`Total L2 Commission due to ${mobileNumber} (L3): ${totalL2Commission}`);
                              console.log(`Total L1 Commission due to ${mobileNumber} (L3): ${totalL1Commission}`);

                              return res.json({ 
                                  totalCommission, 
                                  additionalCommissions: {
                                      totalL2Commission,
                                      totalL1Commission
                                  }
                              });
                          });
                      });
                  }
              });
          });
      });
  });
});


// app.get('/user-level/:mobileNumber', (req, res) => {
//   const { mobileNumber } = req.params;
//   const sql = 'SELECT level FROM nkd.tbl_salesexecutives WHERE mobileNo = ?';
//   db.query(sql, [mobileNumber], (err, result) => {
//       if (err) {
//           console.error('Error fetching user level:', err);
//           res.status(500).json({ error: 'Internal server error' });
//           return;
//       }
//       if (result.length === 0) {
//           res.status(404).json({ error: 'User not found' });
//           return;
//       }
//       res.json({ level: result[0].level });
//   });
// });


// app.get('/commission/:level', (req, res) => {
// const level = req.params.level;

// const sql = 'SELECT commission_amount FROM nkd.commission WHERE level = ?';
// db.query(sql, [level], (err, result) => {
//   if (err) {
//     console.error('Error fetching commission:', err);
//     res.status(500).json({ success: false, error: 'Internal server error' });
//     return;
//   }

//   if (result.length === 0) {
//     res.status(404).json({ success: false, error: 'Commission data not found' });
//   } else {
//     const commission = result[0].commission_amount;
//     res.json({ success: true, commission });
//   }
// });
// });





// // Example route for checking sales associate number
// app.get('/checkSalesAssociate/:number', (req, res) => {
//   const { number } = req.params;

//   // Check if the mobile number exists in the tbl_salesexecutives table
//   db.query('SELECT * FROM tbl_salesexecutives WHERE mobileNo = ?', [number], (err, results) => {
//       if (err) {
//           console.error('Error checking sales associate existence:', err);
//           return res.status(500).json({ message: 'Internal server error' });
//       }

//       if (results.length > 0) {
//           // Mobile number exists in the tbl_salesexecutives database
//           return res.status(200).json({ exists: true });
//       } else {
//           // Mobile number doesn't exist in the tbl_salesexecutives database
//           return res.status(200).json({ exists: false });
//       }
//   });
// });

//2587413690

// app.put('/updateProfile/:phoneNumber', (req, res) => {
//   const { phoneNumber } = req.params;
//   const {
//       shopkeeperName,
//       pincode,
//       shopState,
//       city,
//       address,
//       salesAssociateNumber,
//       selectedCategory
//   } = req.body;

//   const query = `
//       UPDATE nkd.shopkeepers
//       SET 
//           shopkeeperName = ?,
//           pincode = ?,
//           shopState = ?,
//           city = ?,
//           address = ?,
//           salesAssociateNumber = ?,
//           selectedCategory = ?
//       WHERE phoneNumber = ?
//   `;

//   db.query(
//       query,
//       [
//           shopkeeperName,
//           pincode,
//           shopState,
//           city,
//           address,
//           salesAssociateNumber,
//           selectedCategory,
//           phoneNumber
//       ],
//       (error, results) => {
//           if (error) {
//               console.error('Error executing query:', error);
//               return res.status(500).json({ error: 'Database query error' });
//           }
//           res.json({ message: 'Shopkeeper profile updated successfully' });
//       }
//   );
// });
// Endpoint to retrieve total commission for a specific mobile number
// app.get('/myTotalCommission', async (req, res) => {
//   const { mobileNumber } = req.query;

//   try {
//       // Retrieve total commission for the specified mobile number
//       const totalCommission = await new Promise((resolve, reject) => {
//           db.query(
//               'SELECT SUM(amount) AS totalCommission FROM tbl_commission WHERE mobileNumber = ?',
//               [mobileNumber],
//               (err, result) => {
//                   if (err) {
//                       console.error('Error fetching total commission:', err);
//                       reject(err);
//                       return;
//                   }
//                   resolve(result[0].totalCommission || 0);
//               }
//           );
//       });

//       res.status(200).json({ totalCommission });
//   } catch (error) {
//       console.error('Error retrieving total commission:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });



//Register Shopkeeper from sales executive module 
// app.post('/registerSales', upload.none(), async (req, res) => {
//   const {
//       phoneNumber,
//       shopkeeperName,
//       shopID,
//       pincode,
//       shopState,
//       city,
//       address,
//       salesAssociateNumber,
//       selectedCategory,
//       selectedSubCategory,
//   } = req.body;

//   try {
//       // Insert new shopkeeper into the database
//       await new Promise((resolve, reject) => {
//           db.query(
//               'INSERT INTO shopkeepers (phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//               [phoneNumber, shopkeeperName, shopID, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory],
//               (err, result) => {
//                   if (err) {
//                       console.error('Error registering shopkeeper:', err);
//                       reject(err);
//                       return;
//                   }
//                   resolve(result);
//               }
//           );
//       });

//       // Check if the sales associate was added by someone and assign commission
//       await checkAndAssignCommission(salesAssociateNumber);

//       res.status(200).json({ message: 'Shopkeeper registered successfully' });
//   } catch (error) {
//       console.error('Error registering shopkeeper:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });






/////***********************************************Preferred Shops api******************************************************************************************** */

////app.post('/addPreferredShop', (req, res) => {
////  const { customerPhoneNumber, shopID, shopkeeperName, phoneNumber, selectedCategory, shopType, pincode , deliverToHome } = req.body;

////  const sql = 'INSERT INTO preferred_shops (customerPhoneNumber, shopID, shopkeeperName, phoneNumber, selectedCategory, shopType, pincode ,  deliverToHome ) VALUES (?, ?, ?, ?, ?, ?, ?,?)';
////  db.query(sql, [customerPhoneNumber, shopID, shopkeeperName, phoneNumber, selectedCategory, shopType, pincode, deliverToHome, ], (err, result) => {
////      if (err) {
////          console.error('Error adding preferred shop:', err);
////          return res.status(500).json({ message: 'Failed to add preferred shop' });
////      }
////      res.status(200).json({ message: 'Preferred shop added successfully' });
////  });
////});



////app.delete('/removePreferredShop', (req, res) => {
////  const { customerPhoneNumber, shopID } = req.body;

////  const sql = 'DELETE FROM preferred_shops WHERE customerPhoneNumber = ? AND shopID = ?';
////  db.query(sql, [customerPhoneNumber, shopID], (err, result) => {
////    if (err) {
////      console.error('Error removing preferred shop:', err);
////      return res.status(500).json({ message: 'Failed to remove preferred shop' });
////    }
////    res.status(200).json({ message: 'Preferred shop removed successfully' });
////  });
////});


////app.get('/preferred_shops/:phoneNumber', (req, res) => {
////  const { phoneNumber } = req.params;
////  const sql = 'SELECT * FROM preferred_shops WHERE customerPhoneNumber = ?';
////  db.query(sql, [phoneNumber], (err, results) => {
////    if (err) {
////      console.error('Error fetching preferred shops:', err);
////      res.status(500).json({ error: 'Error fetching preferred shops' });
////      return;
////    }
////    res.json(results);
////  });
////});





/////*******************************************************Customer end :Customer Address fetch******************************************************************************** */

////app.get('/customer/address', (req, res) => {
////  const { phoneNumber } = req.query;
////  const query = `
////    SELECT 
////      address
////    FROM 
////      newcustomers 
////    WHERE 
////      phoneNumber = ?`;

////  db.query(query, [phoneNumber], (error, results) => {
////    if (error) {
////      console.error('Error executing query:', error);
////      return res.status(500).json({ error: 'Database query error' });
////    }
////    if (results.length === 0) {
////      return res.status(404).json({ error: 'Address not found for this phone number' });
////    }
////    res.json(results[0]); // Assuming phoneNumber is unique, return the first result
////  });
////});




/////****************************************************Shopkeeper end : Customer Details who ordered*********************************************************************************** */

////app.get('/shopkeeperCustomerDetails/:phoneNumber', (req, res) => {
////  const { phoneNumber } = req.params;

////  const query = `
////    SELECT * FROM newcustomers 
////    WHERE phoneNumber = ?
////  `;

////  db.query(query, [phoneNumber], (err, results) => {
////    if (err) {
////      console.error('Error fetching customer details:', err);
////      return res.status(500).json({ error: 'Error fetching customer details' });
////    }

////    if (results.length === 0) {
////      return res.status(404).json({ error: 'Customer not found' });
////    }

////    res.json(results[0]);  // Return the first result from the query
////  });
////});




/////*************************************************Shops In Area********************************************************************************************************************/


////// Get shops in the area based on pincode
////app.get('/shopsInArea/:pincode', async (req, res) => {
////  const { pincode } = req.params;

////  try {
////    const result = await new Promise((resolve, reject) => {
////      db.query(
////        'SELECT * FROM shopkeepers WHERE pincode = ?',
////        [pincode],
////        (err, result) => {
////          if (err) {
////            console.error('Error fetching shops in area:', err);
////            reject(err);
////          } else {
////            resolve(result);
////          }
////        }
////      );
////    });

////    if (result.length === 0) {
////      return res.status(404).json({ message: 'No shops found for this pincode' });
////    }

////    const formattedShops = await Promise.all(result.map(async shop => {
////      const { id, shopkeeperName, phoneNumber, pincode, shopState, city, address, salesAssociateNumber, selectedCategory, selectedSubCategory, registrationDate, shopID, deliverToHome } = shop;

////      const shopTypeResult = await new Promise((resolve, reject) => {
////        db.query(
////          'SELECT type FROM category WHERE name = ?',
////          [selectedCategory],
////          (err, result) => {
////            if (err) {
////              reject(err);
////            } else {
////              resolve(result[0]?.type || 'unknown');
////            }
////          }
////        );
////      });

////      return {
////        id,
////        shopkeeperName,
////        phoneNumber,
////        pincode,
////        shopState,
////        city,
////        address,
////        salesAssociateNumber,
////        selectedCategory,
////        selectedSubCategory,
////        registrationDate,
////        shopID,
////        shopType: shopTypeResult,
////        deliverToHome: deliverToHome === "Yes" // Convert to boolean
////      };
////    }));

////    res.status(200).json(formattedShops);
////  } catch (error) {
////    console.error('Error fetching shops in area:', error);
////    res.status(500).json({ message: 'Internal server error' });
////  }
////});





/////********************************************Update Pincode********************************************************************************************************************/

////app.put('/updatePincode', (req, res) => {
////  const { phoneNumber, newPincode } = req.body;

////  // Update pincode in the database
////  const sql = `UPDATE newcustomers SET pincode = ? WHERE phoneNumber = ?`;
////  db.query(sql, [newPincode, phoneNumber], (err, result) => {
////      if (err) {
////          console.error('Error updating pincode:', err);
////          return res.status(500).json({ error: 'Error updating pincode' });
////      }
////      res.status(200).json({ message: 'Pincode updated successfully' });
////  });
////});


/////*************************************Fetch Shops in the pincode***********************************************************************************************8 */

////// Route to fetch shops in a specific pincode
////app.get('/shopsInPincode/:pincode', (req, res) => {
////  const { pincode } = req.params;

////  // Fetch shops from the database based on pincode
////  const sql = `SELECT * FROM shops WHERE pincode = ?`;
////  db.query(sql, [pincode], (err, results) => {
////      if (err) {
////          console.error('Error fetching shops in pincode:', err);
////          return res.status(500).json({ error: 'Error fetching shops in pincode' });
////      }
////      res.status(200).json(results);
////  });
////});

/////***********************************************Fetch CustomerPincode using*********************************************************************************** */

////app.get('/customerPincode/:phoneNumber', (req, res) => {
////  const phoneNumber = req.params.phoneNumber;

////  // Query the database to fetch customer's pincode based on phone number
////  db.query(
////      'SELECT pincode FROM newcustomers WHERE phoneNumber = ?',
////      [phoneNumber],
////      (err, result) => {
////          if (err) {
////              console.error('Error fetching customer pincode:', err);
////              return res.status(500).json({ message: 'Internal server error' });
////          }

////          if (result.length === 0) {
////              return res.status(404).json({ message: 'No customer found for this phone number' });
////          }

////          // Customer pincode found
////          const pincode = result[0].pincode;
////          res.status(200).json({ pincode });
////      }
////  );
////});







/////*******************************************************************Fetch Category data by name *********************************************************************/

 
////app.get('/category', (req, res) => {
////  const name = req.query.name;

////  if (!name) {
////    return res.status(400).json({ error: 'Category name is required' });
////  }

////  db.query(
////    'SELECT * FROM category WHERE name = ?',
////    [name],
////    (err, results) => {
////      if (err) {
////        return res.status(500).json({ error: 'Database query failed' });
////      }
////      if (results.length === 0) {
////        return res.status(404).json({ error: 'Category not found' });
////      }
////      res.json(results[0]);
////    }
////  );
////});
 

/////**************************************************Cartscreen : Add select Delete Products********************************************************************************** */


////app.post('/selectedProducts', (req, res) => {
////  const { phoneNumber, productId } = req.body;
////  const query = 'INSERT INTO tbl_my_products (phoneNumber, productId) VALUES (?, ?)';
////  db.query(query, [phoneNumber, productId], (error, results) => {
////      if (error) {
////          console.error('Error executing query:', error);
////          return res.status(500).json({ error: 'Database query error' });
////      }
////      res.json({ message: 'Product selected successfully' });
////  });
////});

 

/////***************************************************************Product Inventory******************************************************************************************************* */
////app.get('/products/:category', (req, res) => {
////  const { category } = req.params;
////  const query = 'SELECT id, main_category, product_name, brand_name, price, weight, picture_path FROM tbl_product_master WHERE type = ?';
////  db.query(query, [category], (error, results) => {
////      if (error) {
////          console.error('Error executing query:', error);
////          return res.status(500).json({ error: 'Database query error' });
////      }
////      res.json(results);
////  });
////});


 
////// Route to add product to shopkeeper's list
////app.post('/addProduct', (req, res) => {
////  const { shopkeeperPhoneNumber, productId } = req.body; // Ensure the correct variable name here
////  const query = 'INSERT INTO shopkeeper_products (phoneNumber, productId) VALUES (?, ?)';
  
////  db.query(query, [shopkeeperPhoneNumber, productId], (err, results) => {
////      if (err) {
////          console.error('Error adding product:', err);
////          res.status(500).json({ error: 'Internal server error' });
////          return;
////      }
////      res.status(200).json({ message: 'Product added successfully' });
////  });
////});

/////************************************************************************************************************************************************************************ */
//// Route to fetch shopkeeper's products
//app.get('/myProducts/:phoneNumber', (req, res) => {
//  const { phoneNumber } = req.params;
//  const query = `
//      SELECT pm.id, pm.main_category, pm.product_name, pm.brand_name, pm.price, pm.weight, pm.picture_path
//      FROM shopkeeper_products up
//      JOIN tbl_product_master pm ON up.productId = pm.id
//      WHERE up.phoneNumber = ?
//  `;
//  db.query(query, [phoneNumber], (err, results) => {
//      if (err) {
//          console.error('Error fetching selected products:', err);
//          res.status(500).json({ error: 'Internal server error' });
//          return;
//      }
//      res.json(results);
//  });
//});

//// Backend route to delete a selected product
//app.delete('/deleteProduct', (req, res) => {
//  const { phoneNumber, productId } = req.body;
//  const query = `
//      DELETE FROM shopkeeper_products
//      WHERE phoneNumber = ? AND productId = ?
//  `;
  
//  db.query(query, [phoneNumber, productId], (err, results) => {
//      if (err) {
//          console.error('Error deleting product:', err);
//          res.status(500).json({ error: 'Internal server error' });
//          return;
//      }
//      res.status(200).json({ message: 'Product deleted successfully' });
//  });
//});






/////*************************************************Shop Details : shop ID*******************************************************************************************************/

////app.get('/shopDetails/:shopID', (req, res) => {
////  const { shopID } = req.params;

////  // Query the database to fetch selected category from shopkeepers table
////  db.query(
////      'SELECT selectedCategory FROM shopkeepers WHERE phoneNumber = ?',
////      [shopID],
////      (err, result) => {
////          if (err) {
////              console.error('Error fetching selected category:', err);
////              return res.status(500).json({ message: 'Internal server error' });
////          }

////          if (result.length === 0) {
////              return res.status(404).json({ message: 'Shop not found' });
////          }

////          const selectedCategory = result[0].selectedCategory;

////          // Query the database to fetch type from category table based on selected category
////          db.query(
////              'SELECT type FROM category WHERE name = ?',
////              [selectedCategory],
////              (err, result) => {
////                  if (err) {
////                      console.error('Error fetching shop type:', err);
////                      return res.status(500).json({ message: 'Internal server error' });
////                  }

////                  if (result.length === 0) {
////                      return res.status(404).json({ message: 'Category not found' });
////                  }

////                  const shopType = result[0].type;

////                  // Query the database to fetch shop details based on shopID
////                  db.query(
////                      'SELECT * FROM shopkeepers WHERE phoneNumber = ?',
////                      [shopID],
////                      (err, result) => {
////                          if (err) {
////                              console.error('Error fetching shop details:', err);
////                              return res.status(500).json({ message: 'Internal server error' });
////                          }

////                          if (result.length === 0) {
////                              return res.status(404).json({ message: 'Shop not found' });
////                          }

////                          // Shop details found
////                          const shopDetails = { ...result[0], shopType };
////                          res.status(200).json(shopDetails);
////                      }
////                  );
////              }
////          );
////      }
////  );
////});






/////**************************************************Service Part************************************************************************************************************** */



app.get('/subservices/mainservice/:mainServiceId', (req, res) => {
  const mainServiceId = req.params.mainServiceId;

  // Query the database for sub-services based on main service ID
  db.query('SELECT * FROM nkd.tbl_salon_sub_sub_services WHERE main_service_id = ?', [mainServiceId], (err, results) => {
    if (err) {
      console.error('Error fetching sub-services:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      res.status(200).json(results);
    }
  });
});

 

app.get('/searchServices', (req, res) => {
  const { query } = req.query; // Get the search query from the request query parameters

  // Query the database for services matching the search query
  db.query(
      'SELECT * FROM nkd.tbl_salon_main_services WHERE name LIKE ? OR description LIKE ?',
      [`%${query}%`, `%${query}%`],
      (err, results) => {
          if (err) {
              console.error('Error fetching services:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }
          // Send the results back to the client
          res.status(200).json(results);
      }
  );
});



 

app.get('/mainService/:subServiceId', (req, res) => {
  const subServiceId = req.params.subServiceId;

  db.query(
      'SELECT m.name FROM nkd.tbl_salon_main_services m JOIN nkd.tbl_salon_sub_sub_services s ON m.id = s.main_service_id WHERE s.id = ?',
      [subServiceId],
      (err, results) => {
          if (err) {
              console.error('Error fetching main service name:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }
          if (results.length === 0) {
              return res.status(404).json({ message: 'Main service not found for the given sub-service ID' });
          }
          res.status(200).json(results[0]);
      }
  );
});


app.post('/saveSelectedServices', (req, res) => {
  const { phoneNumber, selectedServices } = req.body;

  // Using callback-based approach for all queries
  db.query('START TRANSACTION', (err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Use a counter to handle multiple queries
    let queriesRemaining = selectedServices.length;

    selectedServices.forEach(service => {
      db.query(
        'INSERT INTO tbl_selected_services (phoneNumber, mainServiceId, subServiceId, price) VALUES (?, ?, ?, ?)',
        [phoneNumber, service.mainServiceId, service.subServiceId, service.price],
        (err) => {
          if (err) {
            console.error('Error inserting selected service:', err);
            // Rollback transaction on error
            db.query('ROLLBACK', () => {
              res.status(500).json({ error: 'Internal server error' });
            });
            return;
          }

          queriesRemaining -= 1;

          // Commit transaction if all queries are done
          if (queriesRemaining === 0) {
            db.query('COMMIT', (err) => {
              if (err) {
                console.error('Error committing transaction:', err);
                res.status(500).json({ error: 'Internal server error' });
              } else {
                res.status(200).json({ message: 'Selected services saved successfully.' });
              }
            });
          }
        }
      );
    });
  });
});



app.get('/myServices/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  // Query to fetch services based on phoneNumber
  db.query(
    'SELECT m.id AS mainServiceId, m.name AS mainServiceName, null AS subServiceId, null AS subServiceName, null AS subServicePrice ' +
    'FROM tbl_selected_services s ' +
    'JOIN tbl_salon_main_services m ON s.mainServiceId = m.id ' +
    'WHERE s.phoneNumber = ? ' +
    'UNION ' +
    'SELECT s.mainServiceId, m.name AS mainServiceName, s.subServiceId, sub.name AS subServiceName, sub.price AS subServicePrice ' +
    'FROM tbl_selected_services s ' +
    'JOIN tbl_salon_sub_sub_services sub ON s.subServiceId = sub.id ' +
    'JOIN tbl_salon_main_services m ON s.mainServiceId = m.id ' +
    'WHERE s.phoneNumber = ?',
    [phoneNumber, phoneNumber],
    (err, results) => {
      if (err) {
        console.error('Error fetching selected services:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        console.error('No selected services found for this phone number:', phoneNumber);
        return res.status(404).json({ error: 'No selected services found for this phone number.' });
      }

      res.status(200).json(results);
    }
  );
});



app.get('/shopkeeper/selectedMainServices/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  db.query(
      'SELECT DISTINCT m.id AS mainServiceId, m.name AS mainServiceName ' +
      'FROM tbl_selected_services s ' +
      'JOIN tbl_salon_main_services m ON s.mainServiceId = m.id ' +
      'WHERE s.phoneNumber = ?',
      [phoneNumber],
      async (err, results) => {
          if (err) {
              console.error('Error fetching selected main services:', err);
              return res.status(500).json({ message: 'Internal server error' });
          }

          res.status(200).json(results);
      }
  );
});
 


//new api 

app.get('/mainServices/:selectedSubCategory', (req, res) => {
  const { selectedSubCategory } = req.params;
  const query = `
    SELECT msm.id, msm.name, msm.description 
    FROM tbl_salon_main_services msm
    JOIN tbl_salon_subcategory ssc ON msm.sub_category_id = ssc.id
    WHERE ssc.sub_category = ?
  `;

  db.query(query, [selectedSubCategory], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Failed to fetch main services' });
      } else {
          res.json(results);
      }
  });
});
app.get('/shopkeeper/selectedSubServices/:shopPhoneNumber/:mainServiceId', (req, res) => {
  const { shopPhoneNumber, mainServiceId } = req.params;
  const query = `
    SELECT ss.id, ss.name AS subServiceName, ts.price AS subServicePrice
    FROM tbl_selected_services ts
    JOIN tbl_salon_sub_sub_services ss ON ts.subServiceId = ss.id
    WHERE ts.phoneNumber = ? AND ts.mainServiceId = ?
  `;

  db.query(query, [shopPhoneNumber, mainServiceId], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Failed to fetch selected sub services' });
      } else {
          res.json(results);
      }
  });
});
