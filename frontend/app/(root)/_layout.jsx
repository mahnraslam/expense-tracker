import { View, Text } from 'react-native'
import React from 'react'
import {useUser} from '@clerk/clerk-expo'
import { Redirect } from "expo-router"
import {Stack} from "expo-router/stack"

const _layout = () => {
const isSignedIn = useUser();
if (!isSignedIn) return <Redirect href={'/Sign-in'}/>
  return (
   <Stack screenOptions={{headerShown:false}} /> 
  )
}

export default _layout