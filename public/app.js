var app = new Vue({
  // Target id app
  el: '#app',
  // Data stuff
  data: {
    todo: {text:'', done:''},
    todos: []
  },
  // onReady
  ready: function() {
    this.getTodos();
  },
  // Connected Methods
  methods: {
    getTodos: function () {
      var todos = [];
      this.$http.get('/api/todos')
        .success( function(todos) {
          this.$set('todos', todos)
          console.log(todos);
        })
        .error( function(err) {
          console.log(err);
        })
    }
  }
})
