const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove active class from all nav-links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to the clicked nav-link
      link.classList.add('active');
    });
  });

  
angular.module('myapp',["ngRoute"])
.run(function($rootScope, $timeout){
  $rootScope.$on('routeChangeStart' ,function(){
      $rootScope.loading=true;
  });
  $rootScope.$on('routeChangeSuccess', function(){
      $timeout(function(){
          $rootScope.loading=false;
      },10000);
  });
  $rootScope.$on('routeChangeError', function(){
      $rootScope.loading=false;
      alert('Lỗi không tải được trang!');
  });
})
.config(function ($routeProvider, $sceProvider) {
  $sceProvider.enabled(false);
  $routeProvider
      .when("/home", {
          templateUrl: "view/home.html",
          controller: "homeCtrl"
      })
      .when("/CD",{
        templateUrl: "view/CD.html",
        controller: "cdCtrl"
      })
      .when("/TAPE",{
        templateUrl: "view/TAPE.html",
        controller: "tapeCtrl"
      })
      .when("/VINYL",{
        templateUrl: "view/VINYL.html",
        controller: "vinylCtrl"
      })
      .when("/contact",{
        templateUrl: "view/contact.html"
      })
      .when('/detail/:id',{
        templateUrl: 'view/detail.html',
        controller: 'detailCtrl'
      })
      .when('/cart',{
        templateUrl: 'view/cart.html'
      })
      .when('/checkout',{
        templateUrl: 'view/checkout.html',
        controller: 'checkoutCtrl'
      })
      .otherwise({
          redirectTo: "/home"
      });
})
.filter('searchProduct', function() {
  return function(input, keyword, attr) {
      if(!keyword) return input;
      var output=[];
      for(var i=0 ; i<input.length; i++){
          for(var j=0; j<attr.length; j++){
              if(input[i][attr[j]].toString().toLowerCase().indexOf(keyword.toLowerCase())>=0){
                  output.push(input[i]);
              }
          }
      }
      return output;
  };
})
.controller('myCtrl',function($scope, $http, $rootScope){
  $scope.dsSP = [];
  $http.get('js/data.json').then(
    function(res){
      console.log(res);
      $scope.dsSP = res.data;
    },
    function(res){
      alert('Lỗi tải dữ liệu');
    }
  )
  $rootScope.cart = [];
    $rootScope.addCart = function(sp){
        //San pham chua co trong gio hang --> them vao gio hang
        let inCart =  false;
        for(i=0;i<$rootScope.cart.length;i++){
            if($rootScope.cart[i].id==sp.id){
        //San pham da co trong gio hang --> tang so luong san pham
                $rootScope.cart[i].quantity++;
                break;
            }
        }
        if( !inCart ){
            sp.quantity = 1;
            $rootScope.cart.push(sp);
        }
        console.log($rootScope.cart);
    }
    $rootScope.tongsoluong = function(){
      var tsl=0;
      for(i=0;i<$rootScope.cart.length;i++){
          tsl += $rootScope.cart[i].quantity;
      }
      return tsl;
    }
    $rootScope.xoa = function(index){
        $rootScope.cart.splice(index,1);
    }
    $rootScope.tongtien = function(){
        var tt=0;
        for(i=0;i<$rootScope.cart.length;i++){
            tt += $rootScope.cart[i].quantity * $rootScope.cart[i].price;
        }
        return tt;
    }
    $rootScope.applyCoupon = function() {
      var coupon = document.getElementById('coupon').value;
      var validCoupons = {
        'SUMMER2024': 0.2,
        'TANKIET': 0.1,
      };
  
      if (validCoupons[coupon]) {
        $rootScope.discountPercentage = validCoupons[coupon];
      } else {
        $rootScope.discountPercentage = 0;
        alert('Invalid coupon code');
      }
    };
})
.controller('homeCtrl', function($scope){
  $scope.sp = {
    id: "cd11",
    img: "img/rungthong.png",
    name: "Rừng thông",
    price: 350000,
    artist: "Tùng",
    spotify: "https://open.spotify.com/embed/track/4YESIJrMt6iMstJjNvJUQ7?utm_source=generator"
  }
})
.controller('cdCtrl', function($scope, $http) {
  $scope.limit = 9;
  $scope.page = 1;
  $scope.start = ($scope.page - 1) * $scope.limit;
  $scope.totalPage = Math.ceil($scope.dsSP.length / $scope.limit);
  $scope.pageList = [];
  for (i = 1; i <= $scope.totalPage; i++) {
      $scope.pageList.push(i);
  }

  $scope.changePage = function(trang) {
    $scope.page = trang;
    $scope.start = ($scope.page - 1) * $scope.limit;
  };

  $scope.goToPage = function(pageNumber) {
    $scope.page = pageNumber;
    $scope.start = ($scope.page - 1) * $scope.limit;
  };
})
.controller('tapeCtrl', function($scope) {
  $scope.dsSP= [{
      id: "tp1",
      img: "img/laufey1.png",
      name: "BEWITCHED",
      price: 450000,
      artist: "Laufer",
      spotify: "https://open.spotify.com/embed/track/0pfpeTGQOWlGp6YUUbBD42?utm_source=generator"
    },
    {
      id: "tp2",
      img: "img/hmhas.jpg",
      name: "Hit me Hard and Soft",
      price: 500000,
      artist: "Billie Eilish",
      spotify: "https://open.spotify.com/embed/album/7aJuG4TFXa2hmE4z1yxc3n?utm_source=generator"
    },
    {
      id: "tp3",
      img: "img/wtecs.jpg",
      name: "summer flows 0.02",
      price: 450000,
      artist: "Wave to earth",
      spotify: "https://open.spotify.com/embed/album/3NRNR4txhuRLhnQUUlqWXH?utm_source=generator"
    },
    {
      id: "tp4",
      img: "img/wtecs2.jpg",
      name: "wave 0.01",
      price: 490000,
      artist: "Wave to earth",
      spotify: "https://open.spotify.com/embed/album/3v2wQt26hJ3ricGPZ1kbld?utm_source=generator"
    },
    {
      id: "tp5",
      img: "img/citopiacs.jpg",
      name: "Citopia",
      price: 320000,
      artist: "Phùng Khánh Linh",
      spotify: "https://open.spotify.com/embed/album/4h8yUXtgFWfqMY7WdK1eIg?utm_source=generator"
    },
    {
      id: "tp6",
      img: "img/citopiacsv2.jpg",
      name: "Citopia valentine ver",
      price: 320000,
      artist: "Phùng Khánh Linh",
      spotify: "https://open.spotify.com/embed/album/4h8yUXtgFWfqMY7WdK1eIg?utm_source=generator"
    },
    {
      id: "tp7",
      img: "img/rungdomdomcs.jpg",
      name: "Rừng đom đóm",
      price: 490000,
      artist: "The Cassette",
      spotify: "https://open.spotify.com/embed/album/68bMwerbq9axDV5m1wZYAn?utm_source=generator"
    }
  ]
  $scope.limit = 9;
  $scope.page = 1;
  $scope.start = ($scope.page - 1) * $scope.limit;
  $scope.totalPage = Math.ceil($scope.dsSP.length / $scope.limit);
  $scope.pageList = [];
  for (i = 1; i <= $scope.totalPage; i++) {
    $scope.pageList.push(i);
  }
  $scope.changePage = function(trang) {
    $scope.page = trang;
    $scope.start = ($scope.page - 1) * $scope.limit;
  };

  $scope.goToPage = function(pageNumber) {
    $scope.page = pageNumber;
    $scope.start = ($scope.page - 1) * $scope.limit;
  };
})
.controller('detailCtrl', function($scope, $routeParams){
  $scope.id = $routeParams.id;
  var dsSP1 = $scope.$parent.dsSP || [];
  var sp = dsSP1.find(sp => sp.id == $scope.id);
  if(sp){
      $scope.sp = sp;
  }else{
      console.error('Product not found');
  }
})
.controller('checkoutCtrl', function($scope, $http){
  $scope.dsTINH=[];
    $http.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json?fbclid=IwZXh0bgNhZW0CMTAAAR1JpEi8wya2B7e6I9_xX0OechFxX5t1DHlH-Ec59_Chxy-AtVexsA1cYkE_aem_ZmFrZWR1bW15MTZieXRlcw')
    .then(function(res){
        console.log(res);
        $scope.dsTINH = res.data;
    },
    function(res){
        alert('Lỗi tải dữ liệu');
    })
})
.controller('vinylCtrl', function($scope){
  $scope.dsSP = [{
    id: "vi1",
    img: "img/bewitchedvin.jpg",
    name: "Bewitched",
    price: 1200000,
    artist: "Laufey",
    spotify: "https://open.spotify.com/embed/album/1rpCHilZQkw84A3Y9czvMO?utm_source=generator"
  },
  {
    id: "vi2",
    img: "img/buctuongvin.jpg",
    name: "Con duong khong ten",
    price: 1090000,
    artist: "Bức tường",
    spotify: "https://open.spotify.com/embed/album/2cBrhfguzyTEbWCm7kt1Jy?utm_source=generator"
  },
  {
    id: "vi3",
    img: "img/everythingaboutlovevin.jpg",
    name: "Every thing about love",
    price: 1290000,
    artist: "Laufey",
    spotify: "https://open.spotify.com/embed/album/777K2ytcKbDsX0AZ2y8CBS?utm_source=generator"
  },
  {
    id: "vi4",
    img: "img/hitmehardandsoftvin.jpg",
    name: "Hit me Hard and Soft",
    price: 1490000,
    artist: "Billie Eilish",
    spotify: "https://open.spotify.com/embed/album/7aJuG4TFXa2hmE4z1yxc3n?utm_source=generator"
  },{
    id: "vi5",
    img: "img/nothingvin.jpg",
    name: "Notthing",
    price: 990000,
    artist: "Bruno Major",
    spotify: "https://open.spotify.com/embed/album/4NWvFq8Cst2Y5iHOouXtMz?utm_source=generator"
  }]
})

