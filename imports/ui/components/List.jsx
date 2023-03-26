import React from 'react'
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Blaze from "meteor/gadicc:blaze-react-component";

const List = ({lists}) => {
  const isLoading = useTracker(() => {
    const handle = Meteor.subscribe('tasks');
    return !handle.ready();
  }, [])

  function distinctValues(arr, fieldName) {
    const uniqueValues = new Set();
    for (const obj of arr) {
      const fieldValue = obj[fieldName];
      uniqueValues.add(fieldValue);
    }
    return Array.from(uniqueValues);
  }

  const projects = useTracker(() => distinctValues(lists.fetch(),'project'),[lists])
  return (
    <div>
      {!isLoading ? (
        <>
          {projects.sort().map((project, index) => <div key={project + index}>
            <p className='project'><strong>{project}</strong></p>
            {lists && lists.fetch().filter(list => list.project === project).map((list, index) => <Blaze key={list._id} template="task" item={list} />)}
          </div>)}
        </>
      ) : null}
    </div>
  );
}

export default List;