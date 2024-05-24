import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'



export function useHome() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    

    const getUserData = async () => {
        let _username = await AsyncStorage.getItem('username');
        let _email = await AsyncStorage.getItem('email');
        setUsername(_username);
        setEmail(_email);
    }

    useEffect(() => {
        getUserData();
       }, []);

 

    return {
        username, email
    }
}