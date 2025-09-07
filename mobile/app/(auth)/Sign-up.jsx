 import * as React from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {styles} from '../../assets/styles/auth.styles'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function SignUpScreen() {
 const [error, setError] = React.useState("")
   
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      if (err.errors?.[0]?.code == "form_identifier_exists"){
        setError("Email already exits")

      }else{
        setError('An error occured')
      }
      
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
       
      <View  style={styles.verificationContainer}>
        <Text style = {styles.Text}>Verify your email</Text>
        {error? 
        <View> 
          <Ionicon name = 'alert-circle' size = {20} color={COLORS.expense} />
          <Test style = {styles.errorText}> error </Test>
          <TouchableOpacity>
            <Ionicon name = "close" size={20} color={COLORS.textLight} /> 
          </TouchableOpacity>
        </View> :null }
        <TextInput    style = {[styles.input, error && styles.errorInput]}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </View>
    ) ;
  }

  return (
    <KeyboardAvoidingView style = {{flex:1, justifyContent:'center',alignItems:'center'}}> 
    <View  style={styles.verificationContainer} >
      <>
        <Text  style = {styles.title} >Sign up</Text>
        <TextInput    style = {[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
        />
        <TextInput    style = {[styles.input, error && styles.errorInput]}
         
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style = {styles.button}  onPress={onSignUpPress}>
          <Text>Sign up</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text>Sign in</Text>
          </Link>
        </View>
      </>
    </View>
  </KeyboardAvoidingView>
  )
}