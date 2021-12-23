import React, { useState } from 'react'

function Form (props) {

  /**
   * We are setting the initial name value as an empty string "".
   * We are defining a function whose job is to modify name, called setName().
   * useState() returns these two things,
   * so we are using array destructuring to capture them both in separate variables.
   */
  const [name, setName] = useState('')

  function handleChange (e) {
    console.log(e.target.value)
    setName(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.addTask(name)
    setName('')
  }

  return (
    <form onSubmit={handleSubmit}>

      <h2 className="text-center text-xl font-bold mt-8">
        <label htmlFor="new-todo-input" className="block mb-1">
          <span className="text-gray-700">What needs to be done?</span>
        </label>
      </h2>

      <div className="mt-8 flex flex-wrap -mx-2 space-y-4 md:space-y-0 items-center content-center justify-center">

        <input
          type="text"
          id="new-todo-input"
          className="h-12 px-6 mx-4 text-base placeholder-gray-400 border rounded-lg border-slate-500 focus:shadow-outline"
          name="text"
          autoComplete="off"
          value={name}
          placeholder="Buy milk"
          onChange={handleChange}
        />

        <button type="submit"
                className="h-12 px-6 mx-4 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800">
          Add Task
        </button>
      </div>

    </form>
  )
}

export default Form
