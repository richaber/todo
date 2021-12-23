import React, { useEffect, useRef, useState } from 'react'
import usePrevious from './usePrevious'
import { PencilIcon } from '@heroicons/react/solid'

export default function Todo (props) {

  /**
   * We are setting the initial isEditing value to false.
   * We are defining a function whose job is to modify isEditing, called setEditing().
   * useState() returns these two things,
   * so we are using array destructuring to capture them both in separate variables.
   */
  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')

  const editFieldRef = useRef(null)
  const editButtonRef = useRef(null)

  function handleChange (e) {
    setNewName(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.editTask(props.id, newName)
    setNewName('')
    setEditing(false)
  }

  const wasEditing = usePrevious(isEditing)

  const editingTemplate = (
    <form className="mt-8" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-2xl	font-semibold" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="h-12 px-2 mx-4 text-base placeholder-gray-400 border rounded-lg border-slate-500 focus:shadow-outline"
          type="text"
          placeholder={props.name}
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div>
        <button
          type="button"
          className="mx-2 px-2 inline-flex items-center text-orange-100 transition-colors duration-150 bg-orange-700 rounded-lg focus:shadow-outline hover:bg-orange-800"
          onClick={() => setEditing(false)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd"/>
          </svg>
          Cancel
          <span className="screen-reader-text">renaming {props.name}</span>
        </button>
        <button type="submit"
                className="mx-2 px-2 inline-flex items-center text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z"/>
          </svg>
          Save
          <span className="screen-reader-text">new name for {props.name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className="mt-8">
      <div className="">
        <input
          id={props.id}
          type="checkbox"
          className="checkbox checkbox-accent"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label mx-2" htmlFor={props.id}>
          <span className="text-2xl	font-semibold	">{props.name}</span>
        </label>
      </div>
      <div>

        <button
          type="button"
          className="mx-2 px-2 inline-flex items-center text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
          </svg>
          Edit <span className="screen-reader-text">{props.name}</span>

        </button>
        <button
          type="button"
          className="mx-2 px-2 inline-flex items-center text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800"
          onClick={() => props.deleteTask(props.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
          Delete <span className="screen-reader-text">{props.name}</span>
        </button>
      </div>
    </div>
  )

  /**
   * useEffect() takes a function as an argument;
   * this function is executed after the component renders.
   */
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus()
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus()
    }
  }, [wasEditing, isEditing])

  return (
    <li className="mt-4">{isEditing ? editingTemplate : viewTemplate}</li>
  )
}
