// public/core.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when loading on the page, get all comp
	$http.get('/api/todo')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the comp to the node API
	$scope.createComp = function() {
		$scope.formData.g1X = "";
		try {$scope.formData.g1X = document.getElementById("g1X").value;
			console.log($scope.formData.g1X);} 
		catch(e) {alert(e.message);}

		$scope.formData.g1Y = "";
		try {$scope.formData.g1Y = document.getElementById("g1Y").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g1jX = "";
		try {$scope.formData.g1jX = document.getElementById("g1jX").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g1jY = "";
		try {$scope.formData.g1jY = document.getElementById("g1jY").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g1dirc = "";
		try {$scope.formData.g1dirc = document.getElementById("g1dirc").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g1Jradius = "";
		try {$scope.formData.g1Jradius = document.getElementById("g1Jradius").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g1outerR = "";
		try {$scope.formData.g1outerR = document.getElementById("g1outerR").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g2X = "";
		try {$scope.formData.g2X = document.getElementById("g2X").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g2Y = "";
		try {$scope.formData.g2Y = document.getElementById("g2Y").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g2jX = "";
		try {$scope.formData.g2jX = document.getElementById("g2jX").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g2jY = "";
		try {$scope.formData.g2jY = document.getElementById("g2jY").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g2dirc = "";
		try {$scope.formData.g2dirc = document.getElementById("g2dirc").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g2Jradius = "";
		try {$scope.formData.g2Jradius = document.getElementById("g2Jradius").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.g2outerR = "";
		try {$scope.formData.g2outerR = document.getElementById("g2outerR").value;} 
		catch(e) {alert(e.message);}

		$scope.formData.jX = "";
		try {$scope.formData.jX = document.getElementById("jX").value;} 
		catch(e) {alert(e.message);}
		
		$scope.formData.jY = "";
		try {$scope.formData.jY = document.getElementById("jY").value;} 
		catch(e) {alert(e.message);}

		$http.post('/api/todo', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete whole comp after checking it
	$scope.deleteComp = function(id) {
		$http.delete('/api/todo/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	
	$scope.selectComp = function(id) {
		$http.get('/api/todo/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};



}
