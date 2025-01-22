import styled from 'styled-components';

export const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const AppLayout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f8f9fa;
`;

export const SidebarWrapper = styled.div`
  width: 280px;
  min-width: 280px;
  height: 100%;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
`;

export const MainWrapper = styled.div`
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

export const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
`;

export const ContentHeader = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
`;

export const ContentBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  font-weight: 500;
`; 