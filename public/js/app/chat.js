
let chatBoxHtml = (chats)=>{
    chats = chats ? chats : "";
   return `<div class="container">
    <div class="row chat-window col-xs-5 col-md-3" id="chat_window_1" style="margin-left:10px;">
        <div class="col-xs-12 col-md-12">
        	<div class="panel panel-default">
                <div class="panel-heading top-bar">
                    <div class="col-md-8 col-xs-8">
                        <h3 class="panel-title"><span class="glyphicon glyphicon-comment"></span> Chat - Miguel</h3>
                    </div>
                    <div class="col-md-4 col-xs-4" style="text-align: right;">
                        <a href="#"><span id="minim_chat_window" class="glyphicon glyphicon-minus icon_minim"></span></a>
                        <a href="#"><span class="glyphicon glyphicon-remove icon_close" data-id="chat_window_1"></span></a>
                    </div>
                </div>
                <div class="panel-body msg_container_base" id="displayChats">
                    ${chats}
                </div>
                <div class="panel-footer">
                <form id="frm_chat" method="post">
                    <div class="input-group">
                        <input id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Write your message here..." />
                        <input type="file" name="filebhandar" hidden style="display: none;" id="filebhandar" accept="image/*, video/*" multiple/>
                        <button id="send-file" type="button"><i class="fa fa-file" ></i></button>
                        <span class="input-group-btn">
                        <button type="submit" class="btn btn-primary btn-sm" id="btn-chat">Send</button>
                        </span>
                    </div>
                    </form> 
                </div>
    		</div>
        </div>
    </div>
    
    <div class="btn-group dropup">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
            <span class="glyphicon glyphicon-cog"></span>
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" role="menu">
            <li><a href="#" id="new_chat"><span class="glyphicon glyphicon-plus"></span> Novo</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-list"></span> Ver outras</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-remove"></span> Fechar Tudo</a></li>
            <li class="divider"></li>
            <li><a href="#"><span class="glyphicon glyphicon-eye-close"></span> Invisivel</a></li>
        </ul>
    </div>
</div>
<style>
body{
    height:400px;
    position: fixed;
    bottom: 0;
}
.col-md-2, .col-md-10{
    padding:0;
}
.panel{
    margin-bottom: 0px;
}
.chat-window{
    bottom:0;
    position:fixed;
    float:right;
    margin-left:10px;
}
.chat-window > div > .panel{
    border-radius: 5px 5px 0 0;
}
.icon_minim{
    padding:2px 10px;
}
.msg_container_base{
  background: #e5e5e5;
  margin: 0;
  padding: 0 10px 10px;
  max-height:300px;
  overflow-x:hidden;
}
.top-bar {
  background: #666;
  color: white;
  padding: 10px;
  position: relative;
  overflow: hidden;
}
.msg_receive{
    padding-left:0;
    margin-left:0;
}
.msg_sent{
    padding-bottom:20px !important;
    margin-right:0;
}
.messages {
  background: white;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  max-width:100%;
}
.messages > p {
    font-size: 13px;
    margin: 0 0 0.2rem 0;
  }
.messages > time {
    font-size: 11px;
    color: #ccc;
}
.msg_container {
    padding: 10px;
    overflow: hidden;
    display: flex;
}
img {
    display: block;
    width: 100%;
}
.avatar {
    position: relative;
}
.base_receive > .avatar:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border: 5px solid #FFF;
    border-left-color: rgba(0, 0, 0, 0);
    border-bottom-color: rgba(0, 0, 0, 0);
}

.base_sent {
  justify-content: flex-end;
  align-items: flex-end;
}
.base_sent > .avatar:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border: 5px solid white;
    border-right-color: transparent;
    border-top-color: transparent;
    box-shadow: 1px 1px 2px rgba(black, 0.2); // not quite perfect but close
}

.msg_sent > time{
    float: right;
}



.msg_container_base::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}

.msg_container_base::-webkit-scrollbar
{
    width: 12px;
    background-color: #F5F5F5;
}

.msg_container_base::-webkit-scrollbar-thumb
{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}

.btn-group.dropup{
    position:fixed;
    left:0px;
    bottom:0;
}
</style>
`;

};

$("body").html(chatBoxHtml());


let chatHtml = (to, message, file)=>{
  let result = "";
  if(to == "sent"){
      if(file){
         if(message = "image"){
            result = ` <div class="row msg_container base_sent">
        <div class="col-md-10 col-xs-10">
         <div class="messages msg_sent">
         <img src="${file}" class=" img-responsive " style="width: 300px; height: 300px; border-radius: 5%;">
         </div>
         </div>
        
      </div>`;
         } else if(message = "video") {
            result = ` <div class="row msg_container base_sent">
            <div class="col-md-10 col-xs-10">
             <div class="messages msg_sent">
             <video style="width: 300px; height: 300px; border-radius: 5%;" src="https://s3-ap-southeast-1.amazonaws.com/chat-s3-bucket/${file}" class="user_file user-msg" controls/>
             </div>
             </div>
            
          </div>`;
         }
      } else {
     result = ` <div class="row msg_container base_sent">
     <div class="col-md-10 col-xs-10">
         <div class="messages msg_sent">
             <p>${message}</p>
             <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
         </div>
     </div>
     <div class="col-md-2 col-xs-2 avatar">
         <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
     </div>
 </div>`;  
      }
  } else if(to = "receive"){
      if(file){
    if(message = "image"){
        result = `<div class="row msg_container base_receive">
        <div class="col-md-10 col-xs-10">
            <div class="messages msg_receive">
            <img src="${file}" class="img-responsive" style="width: 200px; height: 200px; border-radius: 5%;">
            </div>
        </div>
    </div>`;
     } else if(message = "video") {
        result = `<div class="row msg_container base_receive">
        <div class="col-md-10 col-xs-10">
            <div class="messages msg_receive">
            <video style="width: 300px; height: 300px; border-radius: 5%;" src="https://s3-ap-southeast-1.amazonaws.com/chat-s3-bucket/${file}" class="user_file user-msg" controls/>
            </div>
        </div>
    </div>`;
     }
    } else {

    result = ` <div class="row msg_container base_receive">
    <div class="col-md-2 col-xs-2 avatar">
        <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" class=" img-responsive ">
    </div>
    <div class="col-md-10 col-xs-10">
        <div class="messages msg_receive">
            <p>${message}</p>
            <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
        </div>
    </div>
</div>`

  } 
}
  return result;
}


$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    //$(this).parent().parent().parent().parent().remove();
    $( "#chat_window_1" ).remove();
});




var socket = io(window.location.origin, {secure: true});

var paramsfade = window.location.pathname.trim();
var paramsv = paramsfade.split('/');
var parama = paramsv.pop();
var param1 = parama.split('.')[0];
var param2 = parama.split('.')[1];
var paramb = param2+'.'+param1;

var params = {parama, paramb};
console.log(params);
window.onbeforeunload = function() {
   this.alert('relly want to exit');
}

$("#send-input").focus();

let filebhandar = document.getElementById('filebhandar');
let filebtn = jQuery('#send-file');

filebtn.on('click', function(){
    $("#send-input").focus();
    filebhandar.click();
});

jQuery('#displayChats').on('click', function(){
    $("#send-input").focus();
});

window.addEventListener("click", function(){
    $("#send-input").focus();

});

socket.on('connect', function(){
  
socket.emit('join', params, function(err){
if(err){
    alert(err);
    window.location.href='/';
}
});

    socket.emit('callhell',{
        room1: parama,
        room2: paramb,
        user:param1,
        data: 'call that bitch'
    }, function(e){
        console.log(e);
    });
});


var msgbx=document.getElementById("displayChats");
function scrollt(){
msgbx.scrollTop=(msgbx.scrollHeight);
}
        


let user;
socket.on('from_server', function(data){
    jQuery('#displayChats').empty();
    
let chats = "";
for(let i = 0; i < data.chats.length ; i++){

        
console.log('not to show ',data.chats[i].notToShow[0]);
console.log(param2);

if(data.chats[i].notToShow == param2){
  console.log('luck');
} else{
  console.log('notluck');
  chats += chatHtml("sender", data.chats[i].message, data.chats[i].filename);
} 
}
$("#displayChats").html(chats);
scrollt();
});


jQuery('#frm_chat').on('submit', function(e){
 e.preventDefault();

    $("#send-input").focus();
    if(filebhandar.files.length > 0){

    console.log('file is present and is ',filebhandar.files.length);

    var context = filebhandar.files[0].type;
    var str = context.split("/");
    console.log('file is ', str[0]);

    if(str[0] == 'image' || str[0] == 'video'){
        document.getElementById("send-input").disabled = true;
        document.getElementById("send-file").disabled = true;
        const formData = new FormData();
         for(let i=0; i < filebhandar.files.length; i++){
            formData.append("files", filebhandar.files[i]);
         }

         console.log('parama ', parama);
         console.log('paramb ', paramb);

         formData.append("id",jQuery('#sender_grade').val().trim());
         formData.append("msg",str[0]);
         formData.append("param_",parama);
         formData.append("param__",paramb);
         
         const contenttype = {
             headers:{
                 'content-type':'multipart/form-data'
             }
         }

   axios({
    method: 'post',
    url: '/chatpost/file',
    data: formData,
    headers: contenttype
    
  }).then(function(res){
    document.getElementById("send-input").disabled = false;
    document.getElementById("send-file").disabled = false;

    console.log(res.data);
    socket.emit('callhell',{
        room1: parama,
        room2: paramb,
        data: 'call that bitch'
    }, function(e){
        filebhandar.value = null;
        jQuery('[name=message]').val('');
        if(e){
            return console.log('eknoeledge is ', e);
        }
    });
    filebhandar.value = null;
}).catch(function(err){
    console.log('eror is ', err);
});
    }
} else{
    console.log('on this fuck');


if(jQuery('[name=message]').val().trim() != ''){ 


    // console.log('message is ', msg);
socket.emit('hijabo1_m', {
    from: jQuery('#sender_name').val().trim(),
    room1: parama,
    room2: paramb,
    grade: jQuery('#sender_grade').val().trim(),
    message: jQuery('[name=message]').val().trim(),
}, function(e){
    jQuery('[name=message]').val('');
    if(e){
        return console.log('eknoeledge is ', e);
    }
});


axios({
    method: 'post',
    url: '/chatpost',
    data: {
    id: jQuery('#sender_grade').val().trim(),
    msg: jQuery('[name=message]').val().trim(),
    params: params
    }
  }).then(function(res){
    console.log(res.data);
    socket.emit('callhell',{
        room1: parama,
        room2: paramb,
        data: 'call that bitch'
    }, function(e){
        jQuery('[name=message]').val('');
        if(e){
            return console.log('eknoeledge is ', e);
        }
    });
}).catch(function(err){
    console.log('eror is ', err);
});



}
}
});



socket.on('disconnect', function(){

});


