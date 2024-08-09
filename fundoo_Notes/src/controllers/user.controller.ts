/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';

// const cookieParser = require('cookie-parser');

import { Request, Response, NextFunction } from 'express';
import { secret_key } from '../config/database';
import jwt from 'jsonwebtoken'


class UserController {
  public UserService = new userService();

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.register(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
<<<<<<< HEAD
  * Controller to get a single user
  * @param  {object} Request - request object
  * @param {object} Response - response object
  * @param {Function} NextFunction
  */
  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.login(req.body.email, req.body.password);
      // res.cookie('jwt', data, { httpOnly: true });
      res.header({ 'Authorization' : (`Bearer ${data}`) }); // header sent in Authentication
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: `${req.body.email}`
      });
    } catch (error) {
      next(error);
    }
  };

  /**
 * Controller to get a single user
 * @param  {object} Request - request object
 * @param {object} Response - response object
 * @param {Function} NextFunction
 */
=======
   * Controller to get a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  // login data 
>>>>>>> users
  public getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
<<<<<<< HEAD
      // const token = await req.cookies.jwt;
      // if (!token) {
      //   return res.status(HttpStatus.UNAUTHORIZED).json({
      //     code: HttpStatus.UNAUTHORIZED,
      //     message: 'No token provided'
      //   });
      // };
      
      const data = await this.UserService.getUser(parseInt((req as any).id));
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User fetched successfully'
      });
=======
      const data = await this.UserService.getUser(req.body);
      if(data){
        const token = await jwt.sign({userId:data}, secret_key, {expiresIn:'24h'})
        

        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          token:token,
          message: 'User fetched successfully'
        });

      }
      else{
        res.status(HttpStatus.BAD_REQUEST).json(
          {
            code:HttpStatus.BAD_REQUEST,
            data:data,
            message:"try again "
          }
        )
      }
      
      
>>>>>>> users
    } catch (error) {
      next(error);
    }
  };

  /**
<<<<<<< HEAD
=======
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public newUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
     

      const data = await this.UserService.newUser(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
>>>>>>> users
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.UserService.updateUser(parseInt((req as any).id), req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

    /**
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
<<<<<<< HEAD
    public updateUserPassword = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const data = await this.UserService.updateUser(parseInt((req as any).id), req.body);
        res.status(HttpStatus.ACCEPTED).json({
          code: HttpStatus.ACCEPTED,
          data: data,
          message: 'User updated successfully'
        });
      } catch (error) {
        next(error);
      }
    };

  
/**
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
public forgetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = await this.UserService.forgetUser(req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
   * Controller to update a user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
public reset = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const data = await this.UserService.reset(req.body.email, req.body.password);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
=======
  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      await this.UserService.deleteUser(req.params.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {},
        message: 'User deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
>>>>>>> users

}

export default UserController;
