
const socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', onConnect);

function onConnect(){
  console.log('connect ' + socket.id);
			sendReq();	

}
function sendReq() {
			socket.emit("req", {});
			setTimeout(sendReq, 0.3);
}

