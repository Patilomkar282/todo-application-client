import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import axios from 'axios';
import TaskInput from './components/TaskInput';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

function AppContent() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const getTodayTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      const taskDate = new Date(task.createdAt || Date.now());
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  };

  const handleAddTask = (newTask) => {
    const taskToAdd = {
      _id: Date.now().toString(),
      ...newTask,
      isCompleted: false,
      isImportant: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, taskToAdd]);
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  const handleToggleImportant = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task._id === taskId
          ? { ...task, isImportant: !task.isImportant }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  };

  const getFilteredTasks = (pathname) => {
    switch (pathname) {
      case '/today':
        return tasks.filter(task => {
          const today = new Date();
          const taskDate = new Date(task.dueDate);
          return taskDate.toDateString() === today.toDateString();
        });
      case '/important':
        return tasks.filter(task => task.isImportant);
      case '/planned':
        return tasks.filter(task => task.dueDate);
      case '/assigned':
        return tasks.filter(task => task.assignedTo === user?.id);
      default:
        return tasks;
    }
  };

  const MainContent = () => {
    const location = useLocation();
    const filteredTasks = getFilteredTasks(location.pathname);

    return (
      <MainContainer>
        <ContentHeader>
          <PageTitle>
            {location.pathname.substring(1).charAt(0).toUpperCase() + 
             location.pathname.slice(2)} Tasks
          </PageTitle>
        </ContentHeader>
        <ContentBody>
          <TaskInput onAddTask={handleAddTask} />
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant}
            onDelete={handleDeleteTask}
          />
        </ContentBody>
      </MainContainer>
    );
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <SidebarWrapper>
                      <Sidebar user={user} tasks={getTodayTasks()} />
                    </SidebarWrapper>
                    <MainWrapper>
                      <MainContent />
                    </MainWrapper>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AppContainer>
      </Router>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const AppLayout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
`;

const SidebarWrapper = styled.div`
  width: 280px;
  min-width: 280px;
  height: 100%;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
`;

const MainWrapper = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

const ContentHeader = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const ContentBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  font-weight: 500;
`;

export default App;
