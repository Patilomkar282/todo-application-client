import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 280px;
  height: 100vh;
  background: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
`;

export const UserSection = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserName = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const NavSection = styled.nav`
  padding: 20px 0;
`;

export const NavItem = styled.div`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${props => props.active ? props.theme.primary : props.theme.textSecondary};
  background: ${props => props.active ? props.theme.activeNav : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.hover};
  }

  svg {
    font-size: 18px;
  }
`;

export const TodayTasksCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
  box-shadow: ${({ theme }) => theme.shadow};

  h3 {
    margin: 0;
    color: ${({ theme }) => theme.text};
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

export const TaskCount = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin: 10px 0;
`;

export const PieChartContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
    
    circle {
      transition: stroke-dasharray 0.3s ease;
    }
  }
`;

export const LogoutButton = styled.button`
  margin: 20px;
  margin-top: auto;
  padding: 12px;
  background: ${({ theme }) => theme.error};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.error}dd;
  }
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  padding: 8px;
  font-size: 20px;
  transition: color 0.2s ease;
  margin-left: auto;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`; 