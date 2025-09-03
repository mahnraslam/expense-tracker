 import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import Screen from '../components/SafeScreen';
export default function RootLayout() {
  return(
      <ClerkProvider>
      <Screen>
      <Slot />
      </Screen>
    </ClerkProvider>
   );
}
