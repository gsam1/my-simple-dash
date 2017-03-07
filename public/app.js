var app = new Vue({
  // Target id app
  el: '#todoApp',
  // Data stuff

  data: {
    todos: [],
    // todosDone: []
    newTodo: ""
  },

  // onReady
  created: function () {
    // this.testTest();
    this.getTodos();
  },
  // Computed properties
  computed: {
    unfinishedTodos: function() {
      var count = 0;
      this.todos.forEach(function(todo){
        if (todo.done == false) {
          count += 1;
        }
      })
      return count;
    }
  },
  // Connected Methods
  methods: {
    getTodos: function () {
      var self = this;
      // The get all todos.
      axios.get('/api/todos')
        .then( function (response) {
          self.todos = response.data;
        })
        .catch( function (error) {
          console.log(error);
        });
    },
    changeStateTodo: function (todo) {
      // A little bit clunky but it works.
      if ( todo.done == false ) {
        todo.done = true;
      } else if ( todo.done == true ){
        todo.done = false;
      } else {
        console.log('errror');
      }
      // Uncomment bellow for debugging
      // console.log(todo._id + " changed with state: " + todo.done);
      axios.put('/api/todos/' + todo._id, { done: todo.done })
        .then ( function (response) {
          console.log(response);
        })
        .catch( function (error) {
          console.log(error);
        })
    },
    addNewTodo: function () {
      var self = this;
      var input = {
        text: self.newTodo,
        done: false
      };
      axios.post('/api/todos', input)
        .then( function (response) {
          console.log(response);
          self.netTodo = '';
          self.todos = response.data;
        })
        .catch( function (error) {
          console.log(error);
        })
    }
  }
})
