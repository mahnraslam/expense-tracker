import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'  

import { SignOutButton } from "@/components/SignOutButton";

import styles from '../../assets/styles/auth.styles'
import { TouchableOpacity } from 'react-native'

export default function Page() {
  const { user } = useUser()
  console.log(styles) ;
  return (
    <View >
      <SignedIn>
        <Text >Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton/>
           
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}