app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('home', {
      resolve: {
        flashCards: function(FlashCardFactory) {
          return FlashCardFactory.getFlashCards();
        } 
      },
      url: '/',
      templateUrl: '/routes/templates/home.html',
      controller: 'MainCtrl'
    })

    .state('manageCard', {
      url: 'manageCard/:_id',
      templateUrl: '/routes/templates/manage.html',
      controller: function($scope, $stateParams, FlashCardFactory) {
        $scope._id  = $stateParams._id;

        // $scope.$watch(
        //   function(){ return FlashCardFactory.flashCards },
        //   function(newVal){
        //     $scope.card = newVal[0];
        //   }
        // );

        $scope.formData = FlashCardFactory.flashCards.filter(function(card) {
          return card._id === $scope._id;
        })[0];

      }
    })

    .state('manageCard.edit', {
      url: '/edit',
      templateUrl: '/routes/templates/edit.html',
      controller: function($scope, $state, Categories, FlashCardFactory) {
        $scope.categories = Categories;

        $scope.submit = function() {
          FlashCardFactory.updateFlashCard($scope.formData)
            .then(function() {
              $state.go('home');
            });
        }
      }
    })

    .state('manageCard.delete', {
      url: '/delete',
      templateUrl: '/routes/templates/delete.html',
      controller: function($scope, $state, FlashCardFactory) {
        $scope.delete = function() {
          FlashCardFactory.deleteFlashCard($scope.formData._id)
            .then(function() {
              $state.go('home');
            });
        }
      }
    })

});