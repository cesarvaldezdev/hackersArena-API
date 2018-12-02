const bcrypt = require('bcrypt');
const { TokenCtrl, UserCtrl } = require('../controllers');
const { User, Token, UserRole } = require('../models');
const mailer = require('../mail');

/**
 * Class for all the Authentication methods :
 * - login
 * - logout
 * - Registrer
 *
 * This class also creates the tokens if needed.
 */
class Auth {
  /**
   * This metod confirms a registration process.
   * If the token is still active, the user registration process continue.
   * @param  {object}   req body of the request
   * @param  {object}   res body of the response
   * @param  {Function} next next funtion to execute next
   * @return {Promise}       returns a created user
   */
   constructor() {


     this.registerUser = async (req, res) => {
       try{
         if((await User.get(req.body.alias)).length !== 0){
           res.status(401).send({ error: 'This alias is already in use' });
         }else{
           if((await User.getByEmail(req.body.email)).length !== 0){
             res.status(401).send({ error: 'This email is already in use' });
           }else{
             var salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
             const passhash = bcrypt.hashSync(req.body.password, salt);
             const user = new User({
               alias: req.body.alias,
               name: req.body.name,
               lastName: req.body.lastName,
               score: req.body.score,
               email: req.body.email,
               password: passhash,
               idUniversity: req.body.idUniversity,
               idCountry: req.body.idCountry,
               status: 0,
             });
             const data = await user.save();
             if(data === 0){
               const hash = bcrypt.hashSync(`${user.alias}${new Date()}`, salt);
               var dateNow = new Date();
               var dateThen = new Date();
               dateThen.setHours(dateThen.getHours() + 12); //12 HRS (4 - 23 only)
               const tok = new Token({
                 token: hash,
                 createdAt: dateNow,
                 expires: dateThen,
                 type: 'Email',
                 status: 1,
                 aliasUser: user.alias,
               });
               const dataToken = await tok.save();

               if (dataToken === 0) {
                 let newHash = hash.replace("/","!");
                 let str = `${newHash}`;
                 let mailOptions = {
                   to: user.email,
                   subject: 'Confirm Account',
                   text: `http://hackersarena00.appspot.com/register/${newHash}`,
                   html: '<a href="http://hackersarena00.appspot.com/register/'+str+'"> Click Aqui para verificar tu cuenta :D !! </a>',
                 };
                 mailer.sendMail(mailOptions);

                 const userRoleData = await new UserRole({
                   aliasUser: user.alias,
                   idRole: 1,
                 }).save;

                 if(userRoleData === 0){
                  res.status(201).send({data: {token:newHash,}, message: "Sucesfully created"});
                }else{
                  res.status(401).send({ error: 'Something has gone wrong with your Role' }); //Can't save UserRole
                }
               }else {
                 res.status(401).send({ error: 'Something has gone wrong' }); //Can't save token
               }
             } else {
               res.status(401).send({ error: 'Invalid user' });
             }
           }
         }
       } catch(e){
         throw e;
       }
     }

     this.confirmUser = async (req, res) =>{
       try{
         let hash = req.params.token.replace("!","/");
         const data = await Token.get(hash);
         if (data.length !== 0) {
           const user = await User.get(data.aliasUser);
           if(user.length === 0){
             res.status(401).send({ message: 'User not found' });
           }else{
             user.status = 1;
             const dataUser = await user.save();
             if(dataUser === 0){
                 res.status(201).send({ message: 'User created!' });
             }else{
               res.status(401).send({ error: 'Something has gone wrong' });
             }
           }
         } else {
           res.status(401).send({ error: 'Invalid or inactive token' });
         }
       }catch(e){
         throw e;
       }
     }

     this.login = async (req, res) =>{
       try{
         const user = await User.get(req.body.alias);
         var salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
         // if(req.body.token !== undefined){
         //   const token = await Token.get(req.body.token);
         //   if (token.length !== 0 && token.status === 1) {
         //     // go to home page, alredy logged
         //     res.status(200).send({ message: "You're already logged!" });
         //   }else{
         //     // go to loggin page
         //     res.status(400).send({ message: "The session has expired!" });
         //   }
         // }
         if (user.length === 0) {
           res.status(400).send({ message: 'User doesnt exist' });
         } else if (user.status === 1) {
           if (await bcrypt.compareSync(req.body.password, user.password)) {
             const hash = bcrypt.hashSync(`${user.alias}${new Date()}`, salt);
             var dateNow = new Date();
             var dateThen = new Date();
             dateThen.setHours(dateThen.getHours() + 12); //12 HRS (4 - 23 only)
             const tok = new Token({
               token: hash,
               createdAt: dateNow,
               expires: dateThen,
               type: 'Session',
               status: 1,
               aliasUser: user.alias,
             });
             const dataToken = await tok.save();
             if(dataToken === 0){
               res.status(200).send({data: {token:hash,}, message: 'Session started'});
             }else{
               res.status(401).send({ error: 'Something has gone wrong' }); //Can't save token
             }
           } else {
             // Passwords dont match
             res.status(400).send({ message: 'Incorrect password' });
           }
         } else{
           const hash = bcrypt.hashSync(`${user.alias}${new Date()}`, salt);
           var dateNow = new Date();
           var dateThen = new Date();
           dateThen.setHours(dateThen.getHours() + 12); //12 HRS (4 - 23 only)
           const tok = new Token({
             token: hash,
             createdAt: dateNow,
             expires: dateThen,
             type: 'Email',
             status: 1,
             aliasUser: user.alias,
           });
           const dataToken = await tok.save();

           if (dataToken === 0) {
             let newHash = hash.replace("/","!");
             let str = `${newHash}`;
             let mailOptions = {
               to: user.email,
               subject: 'Confirm Account',
               text: `http://hackersarena00.appspot.com/register/${newHash}`,
               html: '<a href="http://hackersarena00.appspot.com/register/'+str+'"> Click Aqui para verificar tu cuenta :D !! </a>',
             };
             mailer.sendMail(mailOptions);
             res.status(201).send({data: {token:newHash,}, message: "Activate your account first, an email has been sent to you"});
           }else {
             res.status(401).send({ error: 'Something has gone wrong' }); //Can't save token
           }
         }
       }catch(e){
         //return error(e);
         throw e;
       }
     }

      this.logout = async (req, res) =>{
        const token = await Token.get(req.body.token);
        if (token.length !== 0 && token.status === 1) {
          // Change status to 0
          token.status = 0;
          const dataToken = await token.save();
          console.log(dataToken);
          if(dataToken === 0){
            res.status(200).send({ message: 'Correct Logout' });
          }else{
            res.status(401).send({ error: 'Something has gone wrong' });
          }
        }else{
          res.status(200).send({ message: 'You need to loggin first' });
        }
        next();
      }

      this.session = async (req, res, next) =>{
       const token = await Token.get(req.body.token);
       if (token.length === 0 || (token.length !== 0 && token.status === 0)) { // Verification of status token is made in model
         // Status is inactive
         res.status(401).send({ error: 'Inactive token' }); // Loggin needed
       }else{
         next();
       }
     }

     this.extraConfirm = async (req, res) => {
       res.status(200).send({ message: 'Active Session' });
     }

     this.recover = async (req, res) =>{
       try{
         const user = await User.get(req.body.alias);
         if(user.length === 0){
           res.status(400).send({ message: 'User doesnt exist' });
         }else{
           //Pos aqui hace algo
         }
       }catch(e){
         throw(e);
       }
     }
   }

}

module.exports = new Auth();
