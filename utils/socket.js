const socket_io = require("socket.io");
const io = socket_io();
const Chat = require("../modules/general/chat.schema");

var Socket = {
  emit: function(event, data) {
    io.sockets.emit(event, data);
  }
};

io.on('connection', function(socket){


  socket.on('join', function(params, callback){
    if(params === null){
      callback('your not valid go fuck your self');
    }

    socket.join(params.parama);
    socket.join(params.paramb);
    callback();
  });


  socket.on('from_server', async function(data, callback){ //get chats
    try{

    const chat = await Chat.findOne({$or: [{'chatname1': data.room1}, {'chatname1': data.room2}]});
    if(!chat){
     callback('no messages of you');
    };

 const chatinfos = [];
   
for(let i = 0; i < chat.info.length; i++){
const user = await User.findById(chat.info[i].sender);
if(!user){
callback('user not found');
}

  const chats = {
  
     from: user.username,
     grade: user.id,
     profile: user.profileimg,
     message: chat.info[i].msg[0].value,
     notToShow: chat.info[i].msg[0].notShowTo,
     filename: chat.info[i].msg[0].filename,
     chatid: chat.id,
     chatinfoid: chat.info[i].id
     
   }

   chatinfos.push(chats);

 }

 io.to(data.room1 || data.room2).emit('servo1_d', {
  chats: chatinfos
});


}catch(err){ console.log(err)}
callback()
 });


   socket.on('typing', function(data, callback){
    console.log('data inside typing is ', data.user);
        io.to(data.room1 || data.room2).emit('typing_server',{
             user: data.user,
             id: data.id,
             length: data.length,
             submit: data.submit,
             msg: data.typmsg
        });

        callback();
  });


  socket.on('disconnect', function(){
   console.log('a client disconnected');
  });
});

module.exports = {
  Socket,
  io
};
