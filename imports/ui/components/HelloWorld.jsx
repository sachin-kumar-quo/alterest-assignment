import React, { Component } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Tasks } from "../../api/tasks";
// React function component.
function HelloWorld() {
  // This computation uses no value from the outer scope,
  // and thus does not needs to pass a 'deps' argument.
  // However, we can optimize the use of the computation
  // by providing an empty deps array. With it, the
  // computation will be retained instead of torn down and
  // rebuilt on every render. useTracker will produce the
  // same results either way.
  const currentUser = useTracker(() => Meteor.user(), []);

  // The following two computations both depend on the
  // listId prop. When deps are specified, the computation
  // will be retained.
  const listLoading = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const handle = Meteor.subscribe("tasks");
    return !handle.ready();
  }, []);
  const tasks = useTracker(() => Tasks.find({}).fetch(), []);

  return (
    <>
      {listLoading ? (
        <div>Loading</div>
      ) : (
        <div>
          Here is the Todo list :
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>{task.label}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default HelloWorld;
