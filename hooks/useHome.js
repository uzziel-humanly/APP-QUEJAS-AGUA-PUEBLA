import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'



export function useHome() {

    const [username, setUsername] = useState('');

    useEffect(() => {
       getUserData();
      }, []);

    const getUserData = async () => {
        let _username = await AsyncStorage.getItem('username');
        setUsername(_username);
    }

 

    return {
        username
    }
}