import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";



export function useHome() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const [welcomeMessage, setWelcomeMessage] = useState('');

    const navigation = useNavigation();
    
    

    const getUserData = async () => {
        let _username = await AsyncStorage.getItem('username');
        let _email = await AsyncStorage.getItem('email');
        setUsername(_username);
        setEmail(_email);
    }

    const getMessageUser = async () => {
        let today = new Date();
        let hour = today.getHours();
        let _welcomeMessage = '';
        let _username = await AsyncStorage.getItem('username');

            if(hour > 5 && hour < 12)
            {
                _welcomeMessage = `¡Buenos días, ${_username}!`
            }
            else if (hour >= 12 && hour <18)
            {
                _welcomeMessage = `¡Buenas tardes, ${_username}!`
            }
            else
            {
                _welcomeMessage = `¡Buenas noches, ${_username}!`
            }

            console.log(_username);

        setWelcomeMessage(_welcomeMessage);

    }

    useEffect(() => {
        getUserData();
        getMessageUser();
       }, []);


    const viewProfile = () => {
        navigation.navigate('Mi perfil');
    }

    const getTransparencia = () => {
        navigation.navigate('Transparencia');
    }

 

    return {
        username, email, welcomeMessage, viewProfile,getTransparencia
    }
}