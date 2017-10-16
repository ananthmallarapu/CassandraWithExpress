/*const dse = require('dse-driver');
const async=require('async');
const client = new dse.Client({ contactPoints: ['127.0.0.1'], protocolOptions: { maxVersion:4 }
});
const username="ananth";
const email="ananth.mallarapu@cgi.com";
const contact="7306117896";
const password=Buffer.from("0xffff","utf8");
const param=[username,email,contact,password];
const createKeyspaceQuery=`CREATE KEYSPACE user_database WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'}`
const createTable=`create table users("username" text primary key ,"email" text,"contact" text,"password" blob)`
const insertQuery = `insert into users ("username","email","contact","password") values(?,?,?,?)`;


const selectQuery=`select username,email,contact,password from users`;

async.waterfall([
    function(callback){
        client.connect(function(err,result){
            if(err){
                callback(err,"eroor in connect");
            }
        
            console.log('cassandra connected');
            console.log(Object.keys(client.metadata.keyspaces));
            console.log(Object.keys(client.metadata.keyspaces).includes('user_database'));
            callback(null,Object.keys(client.metadata.keyspaces).includes('user_database'));
        });
    },    
    
        function(check,callback) {

            if(check===false){
                client.execute(createKeyspaceQuery,function(err) {
                if (!err) {
                    console.log("new keyspace created");
                    console.log(Object.keys(client.metadata.keyspaces));
                    callback(null,false);
                }
                else{
                    console.log(err);
                    console.log("error in keyspace creation");
                    callback(err,"eror inkeyspace");
                }
          
            });
        }
        else{
            callback(null,false);
        }
        
        } ,
        function(check,callback) {
            if(check===false){
                client.execute("use user_database", (err,result) =>{
                    if(err){
                        console.log("err",err);
                        callback(err,"use datase error");
                    }

                    else {
                        callback(null,true);
                    }
                });
            }
            else{
                callback(null,true);
            }
        },
        function(check,callback){
            
            if(check===false){
            client.execute(createTable,(err,result) =>{
                        if(err){
                            console.log("err",err);
                            callback(err,"create table error");
                        }
                        else {
                        console.log("table created");
                        callback(null,true);
                        }
                
                    });
                }
                else{
                    callback(null,true);
                }        
        },
        function(check,callback){
            client.execute("use user_database", (err,result) =>{
                console.log("use database when database exists method");
                if(err){
        
                    console.log("err",err);
                    callback(err,"error");
                }
                else{
                console.log("using database");
                callback(null,'using database')
                }
            });
        
        },

],(err,result) =>{
    if(err){
        console.log("error in async series",err);
    }
    else {
        console.log("connection successfull");
        console.log(result);
        
    }

});*/

/*lient.execute("use user_database", (err,result) =>{
    console.log("use database when database exists method");
    if(err){

        console.log("err",err);
        callback(err,"error");
    }
    console.log("using database");
    callback(null,'using database')
});*/

 /*client.execute(insertQuery,param, function(err, result) {
    if(err){
        console.log("error");
        console.log(err);
    }
    console.log("inserted")
  });*/

  /*client.execute(selectQuery, function(err, result) {
    if(err){
        console.log("error");
        console.log(err);
    }
    console.log("display")
   console.log(result.rows.forEach(function(element) {
        console.log("username",element.username);
        console.log("email",element.email);
        console.log("contact",element.contact);
        console.log("password",(element.password.toString('utf8')));
        
    }));
  });*/

const createConnection=require('./users/users.schema.js');
const express = require('express');
const path = require('path');
createConnection();
function createApp() {
    const app = express();
    return app;
  }
  
  
  function setupMiddlewares(app) {
    const bodyParser = require('body-parser');
  
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false,
    }));
  
    return app;
  }
  function setupRestRoutes(app) {
    app.use('/', require(path.join(__dirname, './users')));
    app.use((req, res) => {
      const err = new Error('Resource not found');
      err.status = 404;
      return res.status(err.status).json({
        error: err.message,
      });
    });
    app.use((err, req, res) => {
      console.log('Internal error in watch processor: ', err);
      return res.status(err.status || 500).json({
        error: err.message,
      });
    });
    return app;
  }

  let app = createApp();
  app = setupMiddlewares(app);
  app = setupRestRoutes(app);
  app.listen(3000, () => {
    console.log('server running on port 3000');
  });
  module.exports=app;




      
    

          
