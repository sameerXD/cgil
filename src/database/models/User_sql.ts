import {sequelize} from '../sqlDb';
import Sequelize from 'sequelize';

export const acuRto = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email:{
        type: Sequelize.STRING,
        require:true,
        allowNull: false,
        unique:true
     },
     password:{
        type: Sequelize.STRING,
        require:true,
        allowNull: false,
     }
});


