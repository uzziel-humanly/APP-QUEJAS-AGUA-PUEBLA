import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";
import md5 from "js-md5";
import {API_URL, API_TOKEN,API_AUTH} from "@env"
import axios from "axios";

export function useHome() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [listNis, setListNis] = useState([]);

    const [welcomeMessage, setWelcomeMessage] = useState('');

    const navigation = useNavigation();
    
    

    const getUserData = async () => {
        let _listNis = [];
        let _username = await AsyncStorage.getItem('username');
        let _email = await AsyncStorage.getItem('email');
        let _nis = await AsyncStorage.getItem('nis');
        _nis = JSON.parse(_nis);

        _nis.map((_n, _i) => {
            _listNis.push({
                nis: _n.nis
            })
        })

        setUsername(_username);
        setEmail(_email);
        setListNis(_listNis);

    }


    const getUserService = async (_nis) => {
        let _id_user = await AsyncStorage.getItem('id');
    
        let pass = md5(API_TOKEN);
        let credentials = `${API_AUTH}:${pass}`;
        let encodedCredentials = btoa(credentials);
        let auth = "Basic " + encodedCredentials;
    
        let _body = {
            id_usuario_app: _id_user,
            nis: _nis
        };
    
        try {
            let response = await axios({
                method: "POST",
                url: `${API_URL}/api/getHorarios`,
                headers: { Authorization: auth, "Content-Type": "application/json" },
                data: _body,
            });
    
            return response.data.mensaje;
        } catch (error) {
            console.error(error);
            alert('Error en el servidor');
            return null;
        }
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

    const handleUserService = () => {
        navigation.navigate('Horarios de servicio');
    }

 

    return {
        username, email, welcomeMessage, viewProfile,getTransparencia, handleUserService,
        listNis, getUserService
    }
}