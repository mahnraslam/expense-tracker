 import { ClerkProvider } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import SafeScreen from '../components/safeScreen';
export default function RootLayout() {
  return(
      <ClerkProvider>
      <SafeScreen>
      <Slot />
      </SafeScreen>
    </ClerkProvider>
   );
}
