const {targets} = require('./target.js');

SendRequests();
function SendRequests()
{
    for(var i = 0; i < targets.length; i++) {
       for(var j = 0; j < targets[i].length; j++) {
          console.log(targets[i][j]);
         }
    }
}

