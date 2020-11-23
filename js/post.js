var URLactual = $(location).attr('href');
var u = URLactual.split('?')
console.log(URLactual)
var idProject = u[1].split('#')[0]
var post;
var comments = [];
var firebaseConfig = {
    apiKey: "AIzaSyCq14wJVKDkZvfva7FIBASPkRhgrprwEus",
    authDomain: "jimenezramirez-ef6d7.firebaseapp.com",
    databaseURL: "https://jimenezramirez-ef6d7.firebaseio.com",
    projectId: "jimenezramirez-ef6d7",
    storageBucket: "jimenezramirez-ef6d7.appspot.com",
    messagingSenderId: "510214931632",
    appId: "1:510214931632:web:529c0c8466932b18cca775",
    measurementId: "G-EF24GEW6VJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
if(idProject != ''){
    // $('#project-view .pd-header h2').remove();
    db.collection("posts").doc(idProject).get().then((querySnapshot) => {
        post = querySnapshot.data();
        console.log(post)
        var a = post.date;
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var date =  new Date(a.seconds * 1000).toLocaleDateString("es-MX", options);
        $('.post-data .custom-container-bg').append(post.description)
        $(".title-post").append('<a href="#" data-toggle="dropdown" class="date">'+date+'</a>\
            <h2 class="blog-title">'+post.title+'</h2>'
        );
        $(".img-og").attr("content",post.cover);
        var array = post.tags;
        for (let i = 0; i < array.length; i++) {
            if(i == array.length-1){
                $(".tags").append('<li><a href="#" data-toggle="dropdown">'+array[i]+'</a></li>');
            }else{
                $(".tags").append('<li><a href="#" data-toggle="dropdown">'+array[i]+',&nbsp;</a></li>');
            }
            
        }
    });

    db.collection("comments").where("accepted","==",true).where("ref","==",idProject).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            comments.push(doc.data())
        });
        if(comments.length == 0){
            var n = ' Sé el primero en comentar';
        }
        else if(comments.length == 1){
            var n = comments.length + ' Comentario';
        }else{
            var n = comments.length + ' Comentarios';
        }
        $(".user-comment-area h3").text(n)
        // <button class="reply">Reply</button>\
        comments.forEach(comment => {
            // var options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            // var dt = new Date(comment.date)
            // console.log(dt.format("dd-m-yy"))
            var date =  new Date(comment.date.seconds * 1000).toLocaleString("es-MX");
            $(".comment-wrapper").append('<div class="single-comment d-sm-flex align-items-top">\
                <img src="images/blog/user.jpg" alt="" class="user-img">\
                <div class="user-comment-data">\
                    <h6 class="name">'+comment.name+'</h6>\
                    <div class="date">'+date+'</div>\
                    <p>'+comment.comment+'</p>\
                </div>\
            </div>');
        });
    });

}
function newComment(){
    var name = $('#name_comment').val();
    var email = $('#email_comment').val();
    var comment = $('#comment').val();
    if(name == '' || comment == ''){
        alert('Favor de llenar los campos');
    }else{
        db.collection('comments').add({
            name: name,
            email:email,
            comment: comment,
            accepted:false,
            ref:post.id,
            post: post.title,
            date: new Date()
            }).then(res =>{
            db.collection('comments').doc(res.id).update({
                id: res.id
            })
        })
        alert("Comentario recibido. Gracias!")
        // $('#comments-modal').modal('toggle');
        // Swal.fire({
        // 	title: 'Thank you!',
        // 	text: 'You testimonial has been sent...',
        // 	showConfirmButton: false,
        // 	timer: 2000,
        // 	showClass: {
        // 		popup: 'animated fadeIn faster'
        // 	},
        // 	hideClass: {
        // 		popup: 'animated fadeOut faster'
        // 	}
        // })
        $('#name_comment, #comment, #email_comment').val('');
    }
}
$(document).ready(function(){
    var fb = 'https://www.facebook.com/sharer/sharer.php?u='+URLactual;
    var tw = 'https://twitter.com/intent/tweet?text=&url='+URLactual+'&hashtags=#Share'
    var wp = 'https://api.whatsapp.com/send?text='+URLactual;
    var lk = 'https://www.linkedin.com/sharing/share-offsite/?url='+URLactual;
    $(".link-share").click(function(){
        var url = $(this).attr("rel");
        switch(url){
            case 'fb':
                window.open(fb, "Facebook", "height=550,width=750,resizable=1");
            break;
            case 'tw':
                window.open(tw, "Twitter", "height=550,width=750,resizable=1");
            break;
            case 'wp':
                window.open(wp, "Whatsapp", "height=550,width=750,resizable=1");
            break;
            case 'lk':
                window.open(lk, "Linkedin", "height=550,width=750,resizable=1");
            break;
        }
    })
})