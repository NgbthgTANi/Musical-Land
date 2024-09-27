angular.module('myApp', [])
.controller('AuthController', function($scope, $http,$window) {
  $scope.users = [
    {
      username: 'kietdt',
      password: '123'
    },
    {
      username: 'myduyen',
      password: '1510'
    },
    {
      username: 'maianh',
      password: '321'
    }
  ];

  $scope.registerUser = function() {
    // Kiểm tra xem tài khoản đã tồn tại chưa
    var existingUser = $scope.users.find(function(user) {
      return user.username === $scope.username;
    });
    if (existingUser) {
      // Hiển thị thông báo lỗi nếu tài khoản đã tồn tại
      alert('Tài khoản đã tồn tại');
      return;
    }

    // Thêm tài khoản mới vào mảng users
    $scope.users.push({
      username: $scope.username,
      password: $scope.password
    });

    // Xử lý phản hồi từ server
    alert('Đăng ký thành công');
  };

  $scope.loginUser = function() {
    // Tìm tài khoản trong mảng users
    var user = $scope.users.find(function(user) {
      return user.username === $scope.username && user.password === $scope.password;
    });
    if (user) {
      // Xử lý phản hồi từ server (ví dụ: chuyển hướng đến trang khác)
      $window.location.href = 'index.html';
    } else {
      // Hiển thị thông báo lỗi nếu tài khoản hoặc mật khẩu không đúng
      alert('Tài khoản hoặc mật khẩu không đúng');
    }
  };
});
