 import { DataTypes } from "sequelize";
 import sequelize from "../db/db.js";

 const Todo= sequelize.define("todo",{
    name: DataTypes.STRING,
    task_status: DataTypes.STRING,
 })

 export default Todo;

