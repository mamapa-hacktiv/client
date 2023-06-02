import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './Screen/MainStack';
import SearchPage from './Screen/SearchPage';
import DetailPage from './Screen/DetailPage';

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
