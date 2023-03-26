import React, { useState } from 'react';
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

const InputComponent = () => {
  const [task, setTask] = useState('');
  const [project, setProject] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (!task || !project) {
      setError(true);
      return;
    }
    Meteor.call('tasks.insert', task, project);
    reset();
  }

  const reset = () => {
    setError(false);
    setProject('');
    setTask('');
  }

  return (
    <>
      {error && <p className='error'>Please complete form inputs</p>}
      <form className="new-task" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Type to add new tasks"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="text"
          name="project"
          placeholder="Type Name of Project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default InputComponent;