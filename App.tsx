import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </SafeAreaProvider>
  );
}

