const app = require('./app');
const {sequelize} = require('./models');

const PORT = process.env.PORT || 3000

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    await sequelize.sync()
    
}

app.listen(PORT,async()=>{
    main();
  })