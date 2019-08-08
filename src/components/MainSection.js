/*eslint-disable*/
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
	[SHOW_ALL]: () => true,
	[SHOW_ACTIVE]: todo => !todo.completed,
	[SHOW_COMPLETED]: todo => todo.completed
}

export default class MainSection extends Component {
	static propTypes = {
		todos: PropTypes.array.isRequired,
		editTodo: PropTypes.func.isRequired,
		deleteTodo: PropTypes.func.isRequired,
		toggleTodo: PropTypes.func.isRequired
	}

	state = { filter: SHOW_ALL }

	handleClearCompleted = () => {
		this.props.clearCompleted()
	}

	handleShow = filter => {
		this.setState({ filter })
	}

	renderToggleAll(completedCount) {
		const { todos, toggleAllTodo } = this.props
		if (todos.length > 0) {
			return (
				<span>
					<input className="toggle-all"
						type="checkbox"
						checked={completedCount === todos.length}
						onChange={toggleAllTodo}
						/>
				</span>
			)
		}
	}

	renderFooter(completedCount) {
		const { todos } = this.props
		const { filter } = this.state
		const activeCount = todos.length - completedCount

		if (todos.length) {
			return (
				<Footer completedCount={completedCount}
					activeCount={activeCount}
					filter={filter}
					clearCompleted={this.handleClearCompleted}
					onShow={this.handleShow} />
			)
		}
	}

	render() {
		const { todos, editTodo, toggleTodo,deleteTodo } = this.props
		const { filter } = this.state

		const filteredTodos = todos.filter(TODO_FILTERS[filter])
		const completedCount = todos.reduce((count, todo) =>
			todo.completed ? count + 1 : count,
			0
		)

		return (
			<section className="main">
				{this.renderToggleAll(completedCount)}
				<ul className="todo-list">
					{filteredTodos.map(todo =>
						<TodoItem 
							key={todo.id} 
							todo={todo} 
							editTodo={editTodo}
							toggleTodo={toggleTodo}
							deleteTodo={deleteTodo}
						/>
					)}
				</ul>
				{this.renderFooter(completedCount)}
			</section>
		)
	}
}
