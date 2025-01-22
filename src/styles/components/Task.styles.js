import styled from 'styled-components';

export const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  background-color: ${props => {
    switch (props.priority) {
      case 'high': return '#fff8f8';
      case 'medium': return '#fff';
      case 'low': return '#f8fff8';
      default: return '#fff';
    }
  }};
`;

export const CheckboxContainer = styled.div`
  margin-right: 12px;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: 2px solid #ddd;
  border-radius: 3px;
`;

export const TaskContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TaskTitle = styled.span`
  flex: 1;
  font-size: 16px;
  color: ${props => props.completed ? '#888' : '#333'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #ddd;
  font-size: 16px;

  &:hover {
    color: #4CAF50;
  }
`;

export const StarButton = styled(ActionButton)`
  color: ${props => props.important ? '#ffd700' : '#ddd'};
  
  &:hover {
    color: #ffd700;
  }
`;

export const DeleteButton = styled(ActionButton)`
  &:hover {
    color: #f44336;
  }
`; 