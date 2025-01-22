import React from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import {
  TaskContainer,
  CheckboxContainer,
  Checkbox,
  TaskContent,
  TaskTitle,
  TaskActions,
  StarButton,
  DeleteButton
} from '../styles/components/Task.styles';

const Task = ({ task, onToggleComplete, onToggleImportant, onDelete }) => {
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onToggleComplete(task._id);
  };

  const handleStarClick = (e) => {
    e.stopPropagation();
    onToggleImportant(task._id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task._id);
  };

  return (
    <TaskContainer priority={task.priority}>
      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleCheckboxChange}
        />
      </CheckboxContainer>
      <TaskContent>
        <TaskTitle completed={task.isCompleted}>{task.title}</TaskTitle>
      </TaskContent>
      <TaskActions>
        <StarButton
          important={task.isImportant}
          onClick={handleStarClick}
        >
          <FaStar />
        </StarButton>
        <DeleteButton onClick={handleDeleteClick}>
          <FaTrash />
        </DeleteButton>
      </TaskActions>
    </TaskContainer>
  );
};

export default Task; 