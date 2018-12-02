const HackersArena=require('hackerearth-node'); //require the Library

class Judge{
  constructor(){
    this.hackersArena = new HackersArena(
        'c0a82b09338ad9bde9cfe097b9b20671ca08b5ae', //client secret key
        '',
      );
    this.config = {};
    this.config.time_limit=1;  //your time limit in integer
    this.config.memory_limit=323244;  //your memory limit in integer
    this.config.source='';  //your source code for which you want to use hackerearth api
    //this.input = input;
    this.config.input="";  //input against which you have to test your source code
    //this.config.language=language;
    this.config.language="C/C++/Py/C#"; //optional choose any one of them or none
  }

  async test(source, input, time, memory, language) {
    this.config.source=source;
    this.config.input=input;
    this.config.time_limit=time;
    this.memory_limit=memory;
    this.config.language=language;
    const data = this.compile();
    if( data !== 0 ){
      const ans =  this.run();
      if( ans !== 0){
        return ans;
      }else{
        return 0;
      }
    }
  }

  compile(){
    this.hackersArena.compile(this.config, (err, res) => {
      if (err) {
        //console.log(err);
        //res.status(401).send({message: 'Something has gone wrong', error: err });
        return 0;
      }else{
        return res;
      }
      //res.status(200).send({ message: JSON.parse(res) });
    });
  }

  run(){
    this.hackersArena.run(this.config, (err, res) => {
      if (err) {
        //res.status(401).send({message: 'Something has gone wrong', error: err });
        return 0;
      }else{
        return res;
      }
      //console.log(JSON.parse(res));
    });
  }

}
module.exports = new Judge();

// //Now set your application
// var hackersArena=new hackersArena(
//   '**********',  //Your Client Secret Key here this is mandatory
//   '',  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
