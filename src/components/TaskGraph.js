import React from 'react';
import styled from 'styled-components';

const TaskGraph = ({ tasks }) => {
  // Calculate completion statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const completionPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <GraphContainer>
      <GraphTitle>Today Tasks</GraphTitle>
      <TaskCount>{completedTasks} of {totalTasks} completed</TaskCount>
      <GraphWrapper>
        <GraphRing>
          <svg viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 45 * completionPercentage / 100} ${2 * Math.PI * 45}`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </GraphRing>
        <Legend>
          <LegendItem>
            <LegendDot color="#4CAF50" />
            <span>Pending</span>
          </LegendItem>
          <LegendItem>
            <LegendDot color="#e0e0e0" />
            <span>Done</span>
          </LegendItem>
        </Legend>
      </GraphWrapper>
    </GraphContainer>
  );
};

const GraphContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const GraphTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #333;
`;

const TaskCount = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
`;

const GraphWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const GraphRing = styled.div`
  width: 100px;
  height: 100px;

  svg {
    transform: rotate(-90deg);
    circle {
      transition: stroke-dasharray 0.3s ease;
    }
  }
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

const LegendDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

export default TaskGraph; 