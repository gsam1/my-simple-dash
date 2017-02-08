var app = new Vue({
  // Target id app
  el: '#todoApp',
  // Data stuff

  data: {
    todos: [],
    doneTodos: []
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
          self.todos = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
})
