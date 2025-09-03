import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
 import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native' 
import {styles} from '../../assets/styles/auth.styles'
import { KeyboardAvoidingView } from 'react-native'

export default function Page() {
 
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [error, setError] = React.useState("")
  
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      if (err.errors?.[0]?.code == "form_password_incorrect"){
        setError("Password is incorrect")

      }else{
        setError('An error occured')
      }
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <KeyboardAvoidingView style = {{flex:1, justifyContent:'center',alignItems:'center'}}>
    <View style={styles.verificationContainer} >
      <Text style = {styles.title}>Sign in</Text>
      {error? 
              <View> 
                <Ionicon name = 'alert-circle' size = {20} color={COLORS.expense} />
                <Test style = {styles.errorText}> error </Test>
                <TouchableOpacity>
                  <Ionicon name = "close" size={20} color={COLORS.textLight} /> 
                </TouchableOpacity>
              </View> :null }
            
      <TextInput    
      style = {[styles.input, error && styles.errorInput]}
      
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput    
      style = {[styles.input, error && styles.errorInput]}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <TouchableOpacity style = {styles.button} onPress={onSignInPress}>
        <Text> Sign in</Text>
      </TouchableOpacity>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        
      <Text>Don&apos;t have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  </KeyboardAvoidingView>
  )
}