import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { TaskListContainer } from '../styles/components/TaskList.styles';

const TaskList = ({ tasks, onToggleComplete, onToggleImportant, onDelete }) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  const incompleteTasks = tasks.filter(task => !task.isCompleted);

  return (
    <TaskListContainer>
      <Section>
        <SectionTitle>Tasks</SectionTitle>
        {incompleteTasks.map(task => (
          <Task
            key={task._id}
            task={task}
            onToggleComplete={onToggleComplete}
            onToggleImportant={onToggleImportant}
            onDelete={onDelete}
          />
        ))}
      </Section>

      {completedTasks.length > 0 && (
        <Section>
          <SectionTitle>Completed</SectionTitle>
          {completedTasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onToggleComplete={onToggleComplete}
              onToggleImportant={onToggleImportant}
              onDelete={onDelete}
            />
          ))}
        </Section>
      )}
    </TaskListContainer>
  );
};

const Section = styled.div`
  padding: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0;
  font-weight: 500;
`;

// Add other styled components...

export default TaskList; 