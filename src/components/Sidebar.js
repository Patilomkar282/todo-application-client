import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FaListUl, FaCalendarDay, FaStar, FaCalendarAlt, FaUserAlt, FaPlus, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { DEFAULT_AVATAR } from '../constants';
import {
  SidebarContainer,
  UserSection,
  UserAvatar,
  UserName,
  NavSection,
  NavItem,
  TodayTasksCard,
  TaskCount,
  PieChartContainer,
  LogoutButton,
  ThemeToggle
} from '../styles/components/Sidebar.styles';

const Sidebar = ({ user, tasks }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();

  const taskStats = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    const completionPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    return {
      total: totalTasks,
      completed: completedTasks,
      percentage: completionPercentage
    };
  }, [tasks]);

  return (
    <SidebarContainer>
      <UserSection>
        <UserAvatar 
          src={user?.profilePicture || DEFAULT_AVATAR} 
          alt={user?.name || 'User'} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_AVATAR;
          }}
        />
        <UserName>Hey, {user?.name || 'User'}</UserName>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </UserSection>

      <NavSection>
        <NavItem 
          active={location.pathname === '/all'} 
          onClick={() => navigate('/all')}
        >
          <FaListUl /> All Tasks
        </NavItem>
        <NavItem 
          active={location.pathname === '/today'} 
          onClick={() => navigate('/today')}
        >
          <FaCalendarDay /> Today
        </NavItem>
        <NavItem 
          active={location.pathname === '/important'} 
          onClick={() => navigate('/important')}
        >
          <FaStar /> Important
        </NavItem>
        <NavItem 
          active={location.pathname === '/planned'} 
          onClick={() => navigate('/planned')}
        >
          <FaCalendarAlt /> Planned
        </NavItem>
        <NavItem 
          active={location.pathname === '/assigned'} 
          onClick={() => navigate('/assigned')}
        >
          <FaUserAlt /> Assigned to me
        </NavItem>
        <NavItem>
          <FaPlus /> Add list
        </NavItem>
      </NavSection>

      <TodayTasksCard>
        <h3>Today Tasks</h3>
        <TaskCount>{taskStats.completed}</TaskCount>
        <PieChartContainer>
          <svg viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth="20"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#4CAF50"
              strokeWidth="20"
              strokeDasharray={`${2 * Math.PI * 40 * taskStats.percentage / 100} ${2 * Math.PI * 40}`}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dasharray 0.3s ease' }}
            />
          </svg>
        </PieChartContainer>
      </TodayTasksCard>

      <LogoutButton onClick={() => dispatch(logout())}>
        Logout
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar; 