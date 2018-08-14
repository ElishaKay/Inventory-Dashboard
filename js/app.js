angular.module('myApp', ["ngStorage"]);

angular.module('myApp').controller('main', function ($scope,  $localStorage) {

    if(typeof $localStorage.productList != 'undefined'){
        console.log('found productList in localStorage');
        $scope.productList = $localStorage.productList;
        console.log('here is the productList',$scope.productList);

    } else {
        
        
        console.log('couldnt find productList in localStorage');
        $scope.productList = [{id: 1, name: "coffee", description: " tasty coffee", price: 6, image_src: "img/coffee.jpg"},
                            {id: 2, name: "chocolate", description: " tasty chocolate", price: 12, image_src: "img/chocolate.jpeg"},
                            {id: 3, name: "sugar", description: "tasty sugar", price: 18, image_src: "img/sugar.jpg"}]
        console.log('here is the productList',$scope.productList);
    }



    $scope.updateProductMode = false;
    $scope.addProductMode = false;

    //Mark selected div
    $scope.idSelectedProduct = null;
    $scope.setSelected = function (idSelectedProduct) {
        $scope.updateProductMode = true;
        $scope.idSelectedProduct = idSelectedProduct;

        //remove update product view if there is any
        $scope.addProductMode = false;
        
        // set the product as selectedProduct for updating product view
        for (i = 0; i < $scope.productList.length; i++) { 
            if($scope.productList[i].id === idSelectedProduct) {
                $scope.selectedProduct = angular.copy($scope.productList[i]);
            }
        }
    };

    $scope.addProduct = function(newProduct) {
        newProduct.id = $scope.productList.length+1;
        $scope.productList.push(newProduct);
        console.log('products after adding:', $scope.productList);
        $localStorage.productList = $scope.productList;
        $scope.formData = {};
    }

    $scope.removeProduct = function(productId){
        var removeIndex = $scope.productList.map(function(item) { return item.id; }).indexOf(productId);
        // remove object
        $scope.productList.splice(removeIndex, 1);
        console.log(productId);
        //update ids of objects in array - for maintaining selected product feature
        for (i = 0; i < $scope.productList.length; i++) { 
            $scope.productList[i].id = i+1;
        }
    }
    
    $scope.saveProductChanges = function(editedProduct){
        console.log('editedProduct: ', editedProduct);
        for (i = 0; i < $scope.productList.length; i++) { 
            if($scope.productList[i].id === editedProduct.id) {
                $scope.productList[i] = editedProduct;
            }
        }
    }

       console.log('log this');
});