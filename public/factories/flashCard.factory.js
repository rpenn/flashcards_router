app.factory('FlashCardFactory', function ($http) {
    return {
      flashCards: [],
      getFlashCards: function (cat) {
        var self = this
        var config = {};
        if (cat) config.params = {category: cat};
        return $http.get('/cards', config)
        .then(function (res) {
          self.flashCards = res.data
          return res.data;
        });
      },
      createFlashCard: function(obj) {
        var self = this
        return $http.post('/cards', obj)
          .then(function(resp) {
            self.flashCards.push(resp.data)
            return resp.data
          })
      },
      updateFlashCard: function(obj) {
        var self = this;
        return $http.put('/cards/' + obj._id, obj);
      },
      deleteFlashCard: function(id) {
        return $http.delete('/cards/' + id);
      }
    }
  })