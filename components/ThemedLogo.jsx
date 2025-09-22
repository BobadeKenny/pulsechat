import { Image, useColorScheme } from 'react-native'

import DarkIcon from '../assets/img/splash-icon.png'
import LightIcon from '../assets/img/icon.png'

const ThemedLogo = ({...props}) => {
    const colorScheme = useColorScheme()

    const logo = colorScheme === 'dark' ? DarkIcon : LightIcon

    return (
        <Image source={logo} {...props}/>
    )

}

export  default ThemedLogo