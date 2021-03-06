//............................................maisaa..........
angular.module('myapp')
.component('entry',{
  controller:function($scope){
    this.exists = false;
    var session=undefined;
    this.favorite=function(id,title,poster_path,genre){
      //prepare object to send it to node server
      var obj={id:id,title:title,poster_path:poster_path,genre:genre};
      //checking for username
      $.ajax({
        async:false,
        url: "http://127.0.0.1:8080/session",
        cache: false,
        dataType: 'json',
        success: function(user){
          session=user;
        }
      });
       //--------------------- add new function toWatch to create new list
       this.toWatch=function(id,title,poster_path,genre){
      //prepare object to send it to node server
      var obj={id:id,title:title,poster_path:poster_path,genre:genre};
      //checking for username
      $.ajax({
        async:false,
        url: "http://127.0.0.1:8080/session",
        cache: false,
        dataType: 'json',
        success: function(user){
          session=user;

        }
      });
      console.log(session)
      if(session===undefined || session===null){
        alert('you are not allowed to add watch list')
      }else{
        //make ajax request to server to add it to database 
        $.ajax({
          url: "http://127.0.0.1:8080/add2", // <------------/add
          type: "POST",
          data: obj,
          dataType: "html"
        });
        alert('added to watch liset')
      }
    }

    // we need to move this inside success of previous ajax request
    console.log(session)
    if(session===undefined || session===null) {
      alert('you are not allowed to add favorite')
    }else{
        //make ajax request to server to add it to database 
        $.ajax({
          url: "http://127.0.0.1:8080/add",
          type: "POST",
          data: obj,
          error: (e) => {
            console.log('error in post to favourite ', e);
          },
          success: (data) => {
            if(data === 'exists') {
              alert('User already have this movie in favorites');
              this.exists = true;
              $scope.$apply();
            }
            else {
              alert('added to favorite');
              this.exists = true;
              $scope.$apply();              
            }
          }
        });
      }
    }
  },
  bindings:{
    movie:'<'
  },
  templateUrl:'public/templates/entry.html'
});
//............................................maisaa..........