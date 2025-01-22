import styled from 'styled-components';

export const TaskListContainer = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  margin-top: 20px;
  overflow: hidden;
`;

export const TaskListHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
`;

export const TaskListTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
`; 