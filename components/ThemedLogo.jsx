import { Image} from 'react-native'

const Icon = require('../assets/icon.png');

const ThemedLogo = ({...props}) => {

    return (
        <Image source={Icon} {...props}/>
    )

}

export  default ThemedLogo