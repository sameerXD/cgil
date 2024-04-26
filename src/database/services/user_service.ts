import Sequelize from 'sequelize';

const Op = Sequelize.Op

import {acuRto} from '../models/User_sql';


export const create = async(data:any)=>{
    const postData = await acuRto.create(data);
    return postData
}

export const getById = async(id:string)=>{
    const getData = await acuRto.findByPk(id);

    return getData;
}

export const getByEmail = async(id:string)=>{
    const getData = await acuRto.findOne({
        where: {
            email: id
      }
    });

    return getData;
}