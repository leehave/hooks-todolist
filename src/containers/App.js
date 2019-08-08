/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import useTodos from '../hooks/index';


function App() {
	const [
		todos,
		{ addTodo, deleteTodo, editTodo, toggleTodo, toggleAllTodo, clearCompleted }
	] = useTodos();
  return (
		<div className="todoapp">
      <Header addTodo={addTodo} />
			<MainSection 
			todos={todos} 
			deleteTodo={deleteTodo}
			editTodo={editTodo}
			toggleTodo={toggleTodo}
			toggleAllTodo={toggleAllTodo}
			clearCompleted={clearCompleted}
			 />
    </div>
  );
}

export default App;
