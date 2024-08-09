// import dotenv from 'dotenv';
// dotenv.config();
const config = require('./config/config');

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';


import routes from './routes';
import ErrorHandler from './middlewares/error.middleware';
import Logger from './config/logger';

import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from './swagger.json';




//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./doc/swagger-output.json');

class App {
  public app: Application;
  public host: string | number;
  public port: string | number;
  public api_version: string | number;
  public env: boolean;
  private logStream = Logger.logStream;
  private logger = Logger.logger;
  public errorHandler = new ErrorHandler();
  
  constructor() {
    this.app = express();
    this.host = config.development.host;
    this.port = config.development.app_port;
    this.api_version = config.development.version;

    this.initializeMiddleWares();
    this.initializeRoutes();
    this.initializeErrorHandlers();
    this.startApp();
  }

  public initializeMiddleWares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('combined', { stream: this.logStream }));
<<<<<<< HEAD
   
=======
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
>>>>>>> users
  }

  public initializeRoutes(): void {
    this.app.use(`/api/${this.api_version}`, routes());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.get('/test', (req, res) => {
      res.send('Test route is working');
    });
  }

  public initializeErrorHandlers(): void {
    this.app.use(this.errorHandler.appErrorHandler);
    this.app.use(this.errorHandler.genericErrorHandler);
    this.app.use(this.errorHandler.notFound);
  }

  public startApp(): void {
    this.app.listen(this.port, () => {
      this.logger.info(
        `Server started at ${this.host}:${this.port}/api/${this.api_version}/`
      );
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

const app = new App();

export default app;
