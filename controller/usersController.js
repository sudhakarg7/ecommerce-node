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
            console.log(post);
        //    if(post.email == 'admin' && post.password == '123'){

            this.db.find({
                email: post.email, pass:post.pass
            },'users', { projection: {pass:0, cpass:0}}).then( (res)=>{

                const result = res;
                this.res.write(JSON.stringify(result) );
                this.res.end();

            } ).catch( (err)=>{
                console.log(err)
                this.res.end();
            } );

                
        //    }else{
        //     const result = {
        //         status : 'failure',
        //         message : 'Invalid User'
        //     }
        //     this.res.write(JSON.stringify(result) );
        //     this.res.end();
        //    }
          
        })
        .catch((e)=>{
            console.log(e);
            this.res.end();
        });
        
    }

    login(){
        this.loginVerify();
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

    getusers(){
        this.res.writeHead(200,{'Content-Type':'application/json'});
        this.lib.postData(this.req)
        .then( (post) => { 
            console.log(post);
         
            this.db.find({},'users').then( (res)=>{
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