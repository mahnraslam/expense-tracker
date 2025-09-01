 import { View, Text } from 'react-native'
 import React from 'react';
 import {useSafeAreaInsets } from "react-native-safe-area-context"
import { COLORS } from '../contants/colors';
 
 const SafeScreen = ({children}) => {
   const insects = useSafeAreaInsets () ;
   return (
     <View style= {{paddingTop:insects.top, flex:1, backgroundColor:COLORS.coffee.background}}>
        {children}
     </View>
   )
 }
 
 export default SafeScreen