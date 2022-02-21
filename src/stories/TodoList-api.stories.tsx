import React, {useEffect, useState} from "react";

export default {
  title: "Project/API's",
}

export const GetTodoLists = () => {
  const [state, setState] = useState(null);
  useEffect(() => {

  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
};

export const CreateTodoLists = () => {
  const [state, setState] = useState(null);
  useEffect(() => {

  }, [])

  return (
    <div>
      {JSON.stringify(state)}
    </div>
  )
}