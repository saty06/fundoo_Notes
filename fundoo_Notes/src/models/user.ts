/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';
import { DateOnlyDataType, Model } from 'sequelize';
import { IUser } from '../interfaces/user.interface';
const bcrypt = require('bcrypt');

export default (sequelize, DataTypes) => {
  class User extends Model<IUser> implements IUser {
<<<<<<< HEAD
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public mobileNo!: string;
    public dob!: DateOnlyDataType;
    public gender;

=======
    public firstName;
    public lastName;
    public email;
    public password
>>>>>>> users
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
<<<<<<< HEAD
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      }
=======
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password:DataTypes.STRING
>>>>>>> users
    },
    {
      sequelize,
      modelName: 'user',
      schema: 'fundoonotes',
      timestamps: false,
      hooks: {
        beforeCreate: async (user: User, options: any) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user: User, options: any) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      }
      
    }
  );
  
  return User;
};

