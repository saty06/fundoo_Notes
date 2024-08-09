import sequelize, { DataTypes } from '../config/database';
import user from '../models/user';
<<<<<<< HEAD
import utils from '../utils/user.util';
const bcrypt = require('bcrypt');
=======
import bcrypt from 'bcrypt'
>>>>>>> users

class UserService {
  private User = user(sequelize, DataTypes);
  private Utils = new utils();

<<<<<<< HEAD
  public register = async (body) => {
    const data = await this.User.create(body);
    return data;
  };

  public login = async (email, password) => {
    let data = await this.User.findOne({ where: { email: email } });
    if (data && await bcrypt.compare(password, data.password)) {
      const token = await this.Utils.login(data.dataValues.id, data.dataValues.firstName);
      return token;
    } else {
      return 'Inavlid Credentials';
    }
  };

  public getUser = async (id) => {
    try {
      const data = await this.User.findByPk(id);
      return data.dataValues;
    }
    catch (error) {
      throw new Error('User not found');
    }

  };

=======
  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await this.User.findAll();
    console.log("accres all data ", Array.from(data))
    return data;
  };


 

  //create a new user and sign up
  public newUser = async (body) => {
    try {
      if(body.password){
        body.password = await this.hasPassword(body.password)
        
      }
      const data = await this.User.create(body);
      return data;
      
    } catch (error) {
      console.log(error)
       
    }
   
  };


  // check  user is exit or not 
  public loginUser=async(body)=>{
    
  }

  //update a user
>>>>>>> users
  public updateUser = async (id, body) => {
    await this.User.update(body, {
      where: { id: id },
      individualHooks: true,
    });
    return body;
  };


<<<<<<< HEAD
////////////////////////////////////////////////////////////////

  public forgetUser = async (email) => {
    const data = await this.User.findOne({ where: email });
    const token = await this.Utils.forgetUser(data.email);
    return token;
  }

  public reset = async (token, password) => {
    const email = await this.Utils.forgetUserVerify(token);
    if (email) {
      const data = await this.User.update({password:password}, { where: { email : email }, individualHooks: true });
      return data;
    }
    return 'Invalid Token';
  }
=======
  //get a single user
  public getUser = async (body) => {
    if(body.email&&body.password){
      const user = await this.User.findOne({ where: { email: body.email } });
           if(!user){
            return false
           }
           const isPasswordValid = await bcrypt.compare(body.password, user.password);
           if(isPasswordValid){
            return user
           }       
     
    }
    else{
      return false
    }
   
 
  };
  private  async hasPassword(password:any):Promise<any>{
    try {
      let hasPassword = await bcrypt.hash(password,10)
      return hasPassword
    } catch (error) {
      console.log(error)
      
    }
  
  }

 


>>>>>>> users
}




export default UserService;


