const app = require('./app');
const {sequelize} = require('./models');
require('dotenv').config();
const {Product,User} = require("./models")
const PORT = process.env.APP_PORT || 7070

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    await sequelize.createSchema('public');
    await sequelize.sync();
}
async function association(){
  Product.belongsTo(User, {foreignKey: 'owner_user_id'});
}

app.listen(PORT,async()=>{
    console.log("App started on: " + PORT)
    main();
    association();
  })