/*eslint-disable*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const FILTER_TITLES = {
	[SHOW_ALL]: '全部',
	[SHOW_ACTIVE]: '进行中',
	[SHOW_COMPLETED]: '完成'
}

export default class Footer extends Component {
	static propTypes = {
		completedCount: PropTypes.number.isRequired,
		activeCount: PropTypes.number.isRequired,
		filter: PropTypes.string.isRequired,
		clearCompleted: PropTypes.func.isRequired,
		onShow: PropTypes.func.isRequired
	}

	renderTodoCount() {
		const { activeCount } = this.props
		const itemWord = activeCount === 1 ? '个' : '项'

		return (
			<span className="todo-count">
				<strong>{activeCount || '0'}</strong> {itemWord} 剩余
      </span>
		)
	}

	renderFilterLink(filter) {
		const title = FILTER_TITLES[filter]
		const { filter: selectedFilter, onShow } = this.props

		return (
			<a className={classnames({ selected: filter === selectedFilter })}
				style={{ cursor: 'pointer' }}
				onClick={() => onShow(filter)}>
				{title}
			</a>
		)
	}

	renderClearButton() {
		const { completedCount, clearCompleted, visibilityFilter, } = this.props
		if (completedCount > 0) {
			return (
				<button className="clear-completed"
					onClick={clearCompleted} >
					清除已完成
        </button>
			)
		}
	}

	render() {
		return (
			<footer className="footer">
				{this.renderTodoCount()}
				<ul className="filters">
					{[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
						<li key={filter}>
							{this.renderFilterLink(filter)}
						</li>
					)}
				</ul>
				{this.renderClearButton()}
			</footer>
		)
	}
}
