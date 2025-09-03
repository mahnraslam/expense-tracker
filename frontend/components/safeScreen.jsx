 import { View, Text } from 'react-native'
 import React from 'react';
 import {useSafeAreaInsets } from "react-native-safe-area-context"
import { COLORS } from '../contants/colors';
 
 const Screen = ({children}) => {
   const insects = useSafeAreaInsets () ;
   return (
     <View style= {{paddingTop:insects.top, flex:1, backgroundColor:COLORS.background}}>
        {children}
     </View>
   )
 }
 
 export default Screen