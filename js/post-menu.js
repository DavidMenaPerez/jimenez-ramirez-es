var URLactual = $(location).attr('href');
var u = URLactual.split('#')
console.log(u[1]);
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
var projects = [];
var source = [];
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
db.collection("posts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(doc.data().title != undefined){
            projects.push(doc.data())
        }
    })
    console.log(projects);
    var $grid = $('.masnory-blog-wrapper').isotope({
        itemSelector: '.isotop-item',
        isOriginLeft: true,
    });
    // $grid.isotope({ isOriginLeft: true });
    projects.forEach(elem => {
        var a = elem.date;
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var date =  new Date(a.seconds * 1000).toLocaleDateString("es-MX", options);
        var desc = elem.description.split("p>")[1]
        var item = $('<div class="isotop-item economy marketing">\
            <div class="single-blog-post">\
                <div class="img-holder"><img src="'+elem.cover+'" alt=""></div>\
                <div class="post-data">\
                    <a href="post.html?'+elem.id+'" class="date">'+date+'</a>\
                    <h5 class="blog-title-one title"><a href="post.html?'+elem.id+'">'+elem.title+'.</a></h5>\
                    <p>'+desc+'</p>\
                    <a href="post.html?'+elem.id+'" class="read-more"><i class="flaticon-back-1"></i></a>\
                </div> \
        </div>');
        setTimeout(() => {
            $grid.append(item).isotope('appended', item);
        }, 500);
    });
});