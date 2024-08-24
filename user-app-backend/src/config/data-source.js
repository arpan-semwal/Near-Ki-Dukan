import { DataSource } from 'typeorm';
import fs from 'fs';
import { Category } from '../entities/Category.js';
import { Shopkeeper } from '../entities/Shopkeeper.js';
import { NewCustomer } from '../entities/NewCustomer.js';
import { Session } from '../entities/Session.js';
import { TblSalonSubcategory } from '../entities/TblSalonSubcategory.js';
import { TblOrders } from '../entities/TblOrders.js';
import { TblSalesExecutives } from '../entities/TblSalesExecutives.js';
import { Commission } from '../entities/Commission.js';
import { CommissionLevel } from '../entities/CommissionLevel.js';
import { TblCommission } from '../entities/TblCommission.js';
import { TblProductMaster } from '../entities/TblProductMaster.js';
import { TblMyProducts } from '../entities/TblMyProducts.js';
import { ShopkeeperProducts } from '../entities/ShopkeeperProducts.js';
import { PreferredShops } from '../entities/PreferredShops.js';
import { TblSelectedServices } from '../entities/TblSelectedServices.js';
import { Otp } from '../entities/Otp.js';
import { Payment } from '../entities/Payment.js';
import { PaymentDetail } from '../entities/PaymentDetail.js';
import {TblSalonMainServices} from '../entities/TblSalonMainServices.js';
import {TblSalonSubSubServices} from '../entities/TblSalonSubSubServices.js';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "nkd",
    synchronize: false,
    logging: false,
    entities: [
        Category,
        Shopkeeper,
        NewCustomer,
        Session,
        TblSalonMainServices,
        TblSelectedServices,
        TblSalonSubcategory,
        TblSalonSubSubServices,
        TblOrders,
        TblSalesExecutives,
        Commission,
        CommissionLevel,
        TblCommission,
        TblProductMaster,
        TblMyProducts,
        ShopkeeperProducts,
        PreferredShops,
        Otp,
        Payment,
        PaymentDetail,
    ],
    migrations: [],
    subscribers: [],
   
});
