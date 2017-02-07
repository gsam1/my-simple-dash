var app = new Vue({
  // Target id app
  el: '#app',
  // Data stuff

  data: {
    todos: []
  },

  // onReady
  created: function() {
    // this.testTest();
    this.getTodos();
  },

  // Connected Methods
  methods: {
    getTodos: function () {
      var self = this;
      axios.get('/api/todos')
        .then(function(response) {
          console.log('before ' + this.todos);
          self.todos = response.data;
          console.log('after ' + this.todos);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
})
