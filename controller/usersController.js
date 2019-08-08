module.exports = class {
    constructor(obj){
      this.res = obj.res;
      this.req = obj.req;
      this.lib = obj.lib;
      this.db = obj.db;
    }
    loginVerify(){
        this.res.writeHead(200,{'Content-Type':'application/json'});
        // this.lib.formData(this.req)
        // .then( (obj) => {
        //     // console.log('@@@',obj);
        //     const post = obj.fields;
        //    if(post.name == 'admin' && post.password == '123'){
        //         const result = {
        //             status : 'success',
        //             token : '4456GFRSBHfyfgh'
        //         }
        //         this.res.write(JSON.stringify(result) );
        //         this.res.end();
        //    }else{
        //     const result = {
        //         status : 'failure',
        //         message : 'Invalid User'
        //     }
        //     this.res.write(JSON.stringify(result) );
        //     this.res.end();
        //    }
          

        // } )
        // .catch(()=>{
        //     this.res.end();
        // });

        this.lib.postData(this.req)
        .then( (post) => { 
           if(post.name == 'admin' && post.password == '123'){

            this.db.insert({
                name : 'Arun',
                mobile : parseInt(Math.random()*1000000000, 10)
            },'users').then( (res)=>{

                const result = {
                    status : 'success',
                    token : '4456GFRSBHfyfgh'
                }
                this.res.write(JSON.stringify(result) );
                this.res.end();

            } ).catch( (err)=>{
                console.log(err)
                this.res.end();
            } );

                
           }else{
            const result = {
                status : 'failure',
                message : 'Invalid User'
            }
            this.res.write(JSON.stringify(result) );
            this.res.end();
           }
          

        } )
        .catch((e)=>{
            this.res.end(e);
        });
        
    }

    login(){
        this.lib.html('./templates/users/login.ejs',{  },this.res);
    }

    register(){
        this.res.writeHead(200,{'Content-Type':'application/json'});
        this.lib.postData(this.req)
        .then( (post) => { 
            console.log(post);
         
            this.db.insert({
                name : post.uname,
                email : post.email,
                pass:post.pass,
                cpass:post.cpass
            },'users').then( (res)=>{
                this.res.write(JSON.stringify(res) );
                console.log(res);   
                this.res.end();

            } ).catch( (err)=>{
                console.log(err);
                this.res.end();
            } );

          

        } )
        .catch((e)=>{
            console.log(e);
            this.res.end();
        });
        
    }

    // register(){
    //     this.lib.html('./templates/users/register.ejs',{  },this.res);
    // }
}
/*
www.abc.com/users/login
www.abc.com/users/register
*/