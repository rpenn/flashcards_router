app.directive('newFlashCard', function() {
  return {
    restrict: 'E',
    templateUrl: 'directives/newFlashCard/newFlashCard.html',
    scope: {},
    controller: function($scope, Categories, FlashCardFactory) {
      $scope.categories = Categories
      
      $scope.submit = function() {
        console.log('submit')
        FlashCardFactory.createFlashCard($scope.formData)
          .then(function(data) {
            console.log('data from server', data)
            $scope.reset();
          })
          .catch(function(e) { console.error(e) })
      }


      $scope.selectCorrectAnswer = function(answer) {
        $scope.formData.answers.forEach(function(a) {
          a.correct = false
        })
        answer.correct = true
      }



      $scope.reset = function() {
        $scope.formData = {
          answers: []
        }
      }
      $scope.addAnswer = function() {
        $scope.formData.answers.push({ correct: false, text: '' })
      }


      $scope.reset()
    }
  }
})