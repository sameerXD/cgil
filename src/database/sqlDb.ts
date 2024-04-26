const Sequelize = require("sequelize");

export const sequelize = new Sequelize('cgil', "root", "password", {
    host: "localhost",
    dialect: 'mysql',
    port:3306,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

async function testConnection(){
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

testConnection();

