const bcrypt = require('bcrypt');
//const { TokenCtrl, UserCtrl } = require('../controllers');
const { UserRole, RoleAllow, Allow, Token } = require('../models');

class Permission {

  constructor(){

    this.check = async (req,res,next) => {
      try{
        const aliasUser = (await Token.get(req.headers.token)).aliasUser;
        if(req.params.userAlias !== undefined && aliasUser !== req.params.userAlias){ // Checks permission for user update or delete
          res.status(401).send({ error: 'You only have permission over your own profile' });
        }
        let allowId = await Allow.findId(req.body.allowQuery);
        //console.log(allowId);
        if(allowId !== undefined && allowId.length !== 0){
          allowId = allowId[0].id;
        }else{
          res.status(401).send({ error: 'Requested permission does not exist' });
        }
        //console.log(allowId);
        //console.log(aliasUser);
        const data = await UserRole.get(aliasUser);
        //console.log(data);
        let encontrado = false;
        if(data !== undefined && data.length !== 0){
          for (const elem of data){
            const dataAllow = await RoleAllow.get(elem.idRole);
            //console.log(dataAllow);
            if(dataAllow !== undefined && dataAllow.length !== 0){
              dataAllow.forEach(function(elemA) {
                if(elemA.idAllow === allowId && elemA.status === 1){
                  next();
                  encontrado = true;
                }
              });
            }
          }
        }else{
          res.status(401).send({ error: 'Something has gone wrong' });
        }
        if(!encontrado){
          res.status(400).send({ error: 'User does not have permission' });
        }
      }catch(e){
        throw(e);
      }
    }

  }

}

module.exports = new Permission();
