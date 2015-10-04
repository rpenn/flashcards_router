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

    .state('score', {
      url: '/score',
      template: `<div id="statistics">
                     <div id="scoreboard">
                         <h3>Correct: <span>{{ scores.correct }}</span></h3>
                         <h3>Incorrect: <span>{{ scores.incorrect }}</span></h3>
                     </div>
                 </div>`,
      controller: 'StatsController'
    })

    .state('home.newCard', {
      url: '/new_card',
      template: '<new-flash-card></new-flash-card>'
    })

});