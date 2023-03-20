const app = require('./app');
const {sequelize} = require('./models');
require('dotenv').config();
const PORT = process.env.APP_PORT || 7070
const logger = require('./logger')
async function db_main() {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.')
      } catch (error) {
        logger.error({msg:'Unable to connect to the database:', error:error})
        console.error('Unable to connect to the database:', error);
      }
      await sequelize.query("CREATE SCHEMA IF NOT EXISTS public;");
      await sequelize.sync({alter:true});
}

app.listen(PORT,async()=>{
  logger.info("App started on: " + PORT)
    console.log("App started on: " + PORT)
    db_main();
  })