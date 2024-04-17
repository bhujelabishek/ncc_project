import { Sequelize } from "sequelize";

const sequelize= new Sequelize("todo_db", "root", "admin",{ 
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    logging: console.log,
});
 export default sequelize;
