app.controller('MainCtrl', function ($scope, FlashCardFactory, Categories, flashCards) {
    $scope.flashCards = flashCards;

    $scope.categories = [
        'MongoDB',
        'Express',
        'Angular',
        'Node'
    ];

    $scope.activeCat = null;

    $scope.filterByCategory = function (cat) {
      $scope.activeCat = cat;
      $scope.flashCards = null;
      FlashCardFactory.getFlashCards(cat)
      .then(function (cards) {
        $scope.flashCards = cards;
      });
    };
  })