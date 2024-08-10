const { exec } = require('child_process');


/**
 * @example 
 * 
 * await execut('sudo snap install altaqwaa', e => {
 *    console.log(e);
 * })
 * 
 * or 
 * 
 * const output = await execut('sudo snap install altaqwaa');
 * console.log(output);
 *
 * @param {string} command_line - command line
 * @callback return Output
**/


module.exports = async function execut(command_line, callback) {

   return new Promise((resolve, reject) => {
      try {


         exec(command_line, (err, stdout, stderr) => {
            if (err) callback ? callback(err) : resolve(err)
            else if (stderr) callback ? callback(stderr) : resolve(stderr)
            else callback ? callback(stdout ? stdout : true) : resolve(stdout ? stdout : true)
         });


      } catch (error) {

         if (callback) {

            callback(error)
         }

         else reject(error);

      }

   });

}
