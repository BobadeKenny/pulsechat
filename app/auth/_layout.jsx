import React from 'react'
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

const AuthLayout = () => {
    const colorScheme = useColorScheme() 
  return (
        <Stack screenOptions={{
            headerStyle: {backgroundColor:"#ddd"},
            headerTintColor: "#333",
            headerShown: false,
            animation: "none",
            
        }}>

        </Stack>
  )
}

export default AuthLayout
