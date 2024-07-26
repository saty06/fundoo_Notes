import sequelize, { DataTypes } from '../config/database';
import { IUser } from '../interfaces/user.interface';

import user from '../models/user';
import bcrypt from 'bcrypt'

class UserService {
  private User = user(sequelize, DataTypes);

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
  public updateUser = async (id, body) => {
    await this.User.update(body, {
      where: { id: id }
    });
    return body;
  };

  //delete a user
  public deleteUser = async (id) => {
    await this.User.destroy({ where: { id: id } });
    return '';
  };

  //get a single user
  public getUser = async (body) => {
    if(body.email&&body.password){
      const user = await this.User.findOne({ where: { email: body.email } });
           if(!user){
            return false
           }
           const isPasswordValid = await bcrypt.compare(body.password, user.password);
           if(isPasswordValid){
            return "user successful"
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

 


}




export default UserService;
