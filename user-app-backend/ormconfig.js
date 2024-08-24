export const config = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [
       'src/entities/*.js',
    ],
    migrations: [
       'src/migration/**/*.js',
    ],
    subscribers: [
       'src/subscriber/**/*.js',
    ],
    // cli: {
    //    entitiesDir: 'src/app/models',
    //    migrationsDir: 'src/migration',
    //    subscribersDir: 'src/subscriber',
    // },
 };