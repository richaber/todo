import React, { useState, useRef, useEffect } from 'react'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import Todo from './components/Todo'
import { nanoid } from 'nanoid'
import { v4 as uuidv4 } from 'uuid'
import usePrevious from './components/usePrevious'
import useLocalStorageState from 'use-local-storage-state'

/**
 * The values of FILTER_MAP are functions that we will use to filter the tasks data array:
 *
 * The All filter shows all tasks, so we return true for all tasks.
 * The Active filter shows tasks whose completed prop is false.
 * The Completed filter shows tasks whose completed prop is true.
 *
 * Note: We are defining these constants outside our App() function
 * because if they were defined inside it,
 * they would be recalculated every time the <App /> component re-renders,
 * and we don’t want that.
 * This information will never change no matter what our application does.
 *
 * @type {{All: (function(): boolean), Active: (function(*): boolean), Completed: (function(*): boolean|*)}}
 */
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

/**
 * The values of FILTER_MAP are functions that we will use to filter the tasks data array:
 *
 * The All filter shows all tasks, so we return true for all tasks.
 * The Active filter shows tasks whose completed prop is false.
 * The Completed filter shows tasks whose completed prop is true.
 *
 * Note: We are defining these constants outside our App() function
 * because if they were defined inside it,
 * they would be recalculated every time the <App /> component re-renders,
 * and we don’t want that.
 * This information will never change no matter what our application does.
 *
 * @type {string[]}
 */
const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function App (props) {

  function addTask (name) {

    const newTask = { id: uuidv4(), name: name, completed: false }

    setTasks([...tasks, newTask])
  }

  function deleteTask (id) {
    console.log({ id })
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
  }

  function editTask (id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(editedTaskList)
  }

  function toggleTaskCompleted (id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  /**
   * We are setting the initial tasks value as the value of props.tasks.
   * We are defining a function whose job is to modify tasks, called setTasks().
   * useState() returns these two things,
   * so we are using array destructuring to capture them both in separate variables.
   */
  const [tasks, setTasks] = useLocalStorageState('tasks', [])

  // const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All')

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ))

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const listHeadingRef = useRef(null)
  const prevTaskLength = usePrevious(tasks.length)

  /**
   * useEffect() takes a function as an argument;
   * this function is executed after the component renders.
   */
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength])

  return (
    <section className="flex justify-center">
      <div className="container mx-auto">

        <h1 className="mt-8 text-center text-3xl font-bold">
          Local Storage Task List
        </h1>

        <Form addTask={addTask}/>

        <div className="mt-8 flex justify-center">
          {filterList}
        </div>

        <h2 id="list-heading" className="mt-8 text-center text-3xl font-bold" tabIndex="-1" ref={listHeadingRef}>
          {headingText}
        </h2>

        <div className="flex justify-center items-center">
          <div className="flex flex-col pt-8 lg:w-2/5 sm:w-3/5 w-11/12 gap-4">

            <ul
              role="list"
              className="list-none"
              aria-labelledby="list-heading"
            >
              {taskList}
            </ul>

          </div>
        </div>
      </div>
    </section>
  )
}
