const Chat = require("./chat.schema");


module.exports = {
    
delete: async({id})=>{     
     const un = await Chat.findById(id);
     const query = `info.${index}.msg.0.notShowTo`;
     return un.update(
 { '$addToSet': 
     {
        [query] : user
         }
     }
 );
},


plainMessage: async({id})=>{
    const info = {
        sender: id,
        msg:{ value: req.body.msg,},
        isRead: false,
    };
   
 return Chat.findOneAndUpdate({$or:  [{'chatname1': req.body.params.parama}, {'chatname1': req.body.params.paramb}]},{
 $push:{
     info: info
 }  
},{'new': true });
},

fileMessage: async({files})=>{
    var filename = [];
        if(files){
            for(let i=0; i < files.length; i++){
                filename.push(files[i].key);
            }
        }
    const info = {
           sender: req.body.id,
           msg:{ value: req.body.msg,
                filename: filename},
           isRead: false,
       };
         
   return Chat.findOneAndUpdate({$or:  [{'chatname1': req.body.param_}, {'chatname1': req.body.param__}]}
   ,{
    $push:{
        info: info
    }  
   },{'new': true }
);
}
}