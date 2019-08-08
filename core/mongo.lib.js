const MongoClient = require('mongodb').MongoClient;

module.exports = class {
  constructor(){
      // Connection URL
         this.mongoUrl = 'mongodb+srv://sudhakar:HHFCt9lIxLLhIJ3Y@learning-hezf9.mongodb.net/test?retryWrites=true&w=majority'; 
        // Database Name
        this.dbName = 'sample_airbnb';
  }
  connect(){
      return new Promise( (resolve, reject) =>{
          // Use connect method to connect to the server
            MongoClient.connect( this.mongoUrl,  { useNewUrlParser: true }, (err, client) => {
                if(err) reject(err);
                // console.log("Connected successfully to server");
               resolve(client);
            });
      } );
  }
  insert(obj={},tableName){

    return new Promise( (resolve,reject) => {
        this.connect().then((client)=>{
            
            const db = client.db(this.dbName);
            const collection = db.collection(tableName);

            collection.insertOne(obj,(err,res)=>{
                if(err) reject(err);
                client.close();
                resolve(res);
            });
                   
        }).catch((err)=>{
            reject(err)
        });
    } );

      
  }

  find(query={},tableName,options={}){

  } 
  // this.db.find({name:'Arun','users',{projection:{name:1},limit:25,sort:{name:1}}})
}