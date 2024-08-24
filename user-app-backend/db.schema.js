export const createTables = [
  `CREATE TABLE IF NOT EXISTS category (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS shopkeepers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      phoneNumber VARCHAR(15) NOT NULL,
      shopkeeperName VARCHAR(255) NOT NULL,
      shopID VARCHAR(50),
      pincode VARCHAR(10),
      shopState VARCHAR(50),
      city VARCHAR(50),
      address TEXT,
      salesAssociateNumber VARCHAR(15),
      selectedCategory VARCHAR(255),
      selectedSubCategory VARCHAR(255)
    );`,
  `CREATE TABLE IF NOT EXISTS newcustomers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      phoneNumber VARCHAR(15) NOT NULL,
      name VARCHAR(255) NOT NULL,
      pincode VARCHAR(10),
      state VARCHAR(50),
      city VARCHAR(50),
      address TEXT,
      shop_id VARCHAR(50),
      selectedCategory VARCHAR(255),
      selectedSubCategory VARCHAR(255),
      selectedCategoryType VARCHAR(255)
    );`,
  `CREATE TABLE IF NOT EXISTS sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      session_token VARCHAR(255) NOT NULL,
      login_time DATETIME NOT NULL,
      expiration_time DATETIME NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_salon_main_services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(255)
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_salon_subcategory (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category_id INT NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_salon_sub_sub_services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2),
      main_service_id INT NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customerName VARCHAR(255) NOT NULL,
      custPhoneNumber VARCHAR(15) NOT NULL,
      cartItems TEXT,
      totalPrice DECIMAL(10, 2),
      selectedDate DATE,
      selectedTime TIME,
      shopID VARCHAR(50),
      shopkeeperName VARCHAR(255),
      shopkeeperPhonenumber VARCHAR(15),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_salesexecutives (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      mobileNo VARCHAR(15) NOT NULL,
      pincode VARCHAR(10),
      level VARCHAR(10),
      aadhar VARCHAR(20),
      upi VARCHAR(50),
      pancard VARCHAR(20),
      addedBy VARCHAR(15)
    );`,
  `CREATE TABLE IF NOT EXISTS commission (
      id INT AUTO_INCREMENT PRIMARY KEY,
      level VARCHAR(10),
      commission_amount DECIMAL(10, 2)
    );`,
  `CREATE TABLE IF NOT EXISTS commission_level (
      id INT AUTO_INCREMENT PRIMARY KEY,
      from_level VARCHAR(10),
      to_level VARCHAR(10),
      commission_amount DECIMAL(10, 2)
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_commission (
      id INT AUTO_INCREMENT PRIMARY KEY,
      mobileNumber VARCHAR(15) NOT NULL,
      commissionType VARCHAR(50),
      amount DECIMAL(10, 2)
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_product_master (
      id INT AUTO_INCREMENT PRIMARY KEY,
      main_category VARCHAR(255),
      product_name VARCHAR(255),
      brand_name VARCHAR(255),
      price DECIMAL(10, 2),
      weight VARCHAR(50),
      picture_path VARCHAR(255)
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_my_products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      phoneNumber VARCHAR(15) NOT NULL,
      productId INT NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS shopkeeper_products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      phoneNumber VARCHAR(15) NOT NULL,
      productId INT NOT NULL
    );`,
  `CREATE TABLE IF NOT EXISTS preferred_shops (
      id INT AUTO_INCREMENT PRIMARY KEY,
      customerPhoneNumber VARCHAR(15) NOT NULL,
      shopID VARCHAR(50),
      shopkeeperName VARCHAR(255),
      phoneNumber VARCHAR(15),
      selectedCategory VARCHAR(255),
      shopType VARCHAR(255),
      pincode VARCHAR(10)
    );`,
  `CREATE TABLE IF NOT EXISTS tbl_selected_services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      phoneNumber VARCHAR(15) NOT NULL,
      mainServiceName VARCHAR(255),
      subServiceName VARCHAR(255)
    );`,
];

