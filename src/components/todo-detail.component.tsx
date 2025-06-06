// src/components/TodoDetail.tsx

import React from 'react';

interface TodoDetailProps {
  todoId: number;
}

interface TodoDetail {
  id: number;
  title: string;
  completed: boolean;
}

/**
 * TodoDetail component fetches and displays the details of a specific todo item based on the provided todoId.
 * It uses the useEffect hook to fetch the todo details from the API when the component mounts or when the todoId changes.
 * @param todoId - The ID of the todo item to fetch and display.
 */
export const TodoDetail: React.FC<TodoDetailProps> = ({ todoId }) => {
  const [todoDetail, setTodoDetail] = React.useState<TodoDetail | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchTodoDetail = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        );
        if (!response.ok) {
          throw new Error('Network bad');
        }
        setTodoDetail(await response.json());
      } catch {
        setError('error loading todo');
      }
    };

    fetchTodoDetail();
  }, [todoId]);

  console.log(todoDetail);

  return (
    <div className="todo-detail">
      <h2>Todo Details</h2>
      {error && <p className="error">{error}</p>}
      {todoDetail ? (
        <div>
          <h2>{todoDetail.title}</h2>
          <p>{todoDetail.completed ? 'Completed' : 'Open'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
