import store from '@/data/store';
import { Slot, Stack, Tabs } from 'expo-router';
import { PaperProvider, MD2LightTheme as DefaultTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
export default function RootLayout() {
  return (
    <StoreProvider store={store} >
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ headerTitle: 'Listings' }}>
        </Stack>
      </PaperProvider>
    </StoreProvider>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors
  },
};