const app = require('./app');
const {sequelize} = require('./models');
require('dotenv').config();
const PORT = process.env.APP_PORT || 7070

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    await sequelize.sync({force:true});
    
}

app.listen(PORT,async()=>{
    console.log("App started on: " + PORT)
    main();
  })