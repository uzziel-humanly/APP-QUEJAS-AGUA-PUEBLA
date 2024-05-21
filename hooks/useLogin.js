import { useState } from "react"
import { Alert } from "react-native";
import Home from "../pages/indexHome"; 
import { useNavigation } from "@react-navigation/native";



export const useLogin = () => {

    const navigation = useNavigation();

    //userdata
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');





    const handleChangeUsername = (Text) => {
        setUsername(Text);
    }

    const handleChangePassword = (Text) => {
        setPassword(Text);
    }
    

    const validateSession = async () => {
        let _username = username;
        let _password = password;
        if(_username.trim() === '' || _password.trim() === '')
        {
           Alert.alert('Por favor, llena todos los campos');
        }
        else
        {
         
            navigation.navigate('IndexScreen')
        }
    }


    //#REGION SIGN UP

    const handleCreateAccount =  async () => {

    }


    return {
        //Log in
        handleChangeUsername, handleChangePassword, validateSession, username, password,


        //Sign up
        handleCreateAccount
    }
}
