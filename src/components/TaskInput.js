import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBell, FaSync, FaCalendar } from 'react-icons/fa';

const TaskInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [priority, setPriority] = useState('medium');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      try {
        await onAddTask({
          title: taskText,
          isCompleted: false,
          isImportant: false,
          dueDate: new Date(),
          priority: priority
        });
        setTaskText('');
        setIsInputVisible(false);
      } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <TaskInputContainer>
      {!isInputVisible ? (
        <AddTaskButton onClick={() => setIsInputVisible(true)}>
          Add A Task
        </AddTaskButton>
      ) : (
        <TaskInputForm onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Add A Task"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <TaskActions>
              <ActionButtons>
                <ActionButton type="button">
                  <FaBell />
                </ActionButton>
                <ActionButton type="button">
                  <FaCalendar />
                </ActionButton>
                <ActionButton type="button">
                  <FaSync />
                </ActionButton>
              </ActionButtons>
              <RightActions>
                <PrioritySelect value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </PrioritySelect>
                <AddButton type="submit">ADD TASK</AddButton>
              </RightActions>
            </TaskActions>
          </InputWrapper>
        </TaskInputForm>
      )}
    </TaskInputContainer>
  );
};

const TaskInputContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const AddTaskButton = styled.button`
  width: 100%;
  padding: 12px;
  text-align: left;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: #4CAF50;
  }
`;

const TaskInputForm = styled.form`
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const TaskActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #757575;
  font-size: 16px;

  &:hover {
    color: #4CAF50;
  }
`;

const RightActions = styled.div`
  display: flex;
  gap: 12px;
`;

const PrioritySelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const AddButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #43a047;
  }
`;

export default TaskInput; 