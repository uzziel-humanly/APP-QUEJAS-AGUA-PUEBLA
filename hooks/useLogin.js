import { useState, useCallback } from "react";
import { Alert } from "react-native";
import Home from "../pages/indexHome";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import md5 from "js-md5";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //userdata
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //login validation
  const [failedLogin, setFailedLogin] = useState(0);
  const [messageEror, setMessageError] = useState("");

  //recover password
  const [emailRecover, setEmailRecover] = useState("");
  const [messageRecoverPassword, setMessageRecoverPassword] = useState("");

  const handleChangeUsername = (Text) => {
    setUsername(Text);
  };

  const handleChangePassword = (Text) => {
    setPassword(Text);
  };

  const handleForgetPassword = () => {
    navigation.navigate("Forget Password");
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      setUsername('');
      setPassword('');
    }, [])
  );

  const validateSession = async () => {
    //setLoading(true);
    let _username = username;
    let _password = password;
    if (_username.trim() === "" || _password.trim() === "") {
      Alert.alert("Por favor, llena todos los campos");
      setLoading(false);
    } else {
      setLoading(true);
      let pass = md5(API_TOKEN);

      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let _body = {
        correo: _username,
        pass: md5(_password),
      };
      let body = JSON.stringify(_body);

      try {
        let response = await axios({
          method: "post",
          url: `${API_URL}/api/login`,
          headers: { Authorization: auth, "Content-Type": "application/json" },
          data: body,
        });

        console.log(response.data.mensaje);
            if(response.data.estatus === "ok")
                {
                    


                    let _userdata = response.data.mensaje[0];

                    let today = new Date();
                    let fechaPass = new Date(_userdata.fechaPass);


                    function getMonthDifference(date1, date2) {
                        let years = date2.getFullYear() - date1.getFullYear();
                        let months = date2.getMonth() - date1.getMonth();
                        return years * 12 + months;
                    }

                    let monthDifference = getMonthDifference(fechaPass, today);

              
                  
                    let nis = _userdata.nis;
                    let _nis = [];

                    nis.map((item, index) => {
                      _nis.push({
                          nis: item.nis,
                          direction: item.direccion,
                          colony: item.colonia,
                          account_number: item.cuenta,
                          account_status: item.estado_cuenta,
                          manager: item.gestor,
                          line: item.giro

                      })

                  })

                  // console.log(_nis);

            
                  AsyncStorage.setItem('username', _userdata.nombre)
                  AsyncStorage.setItem('id', _userdata.id)
                  // AsyncStorage.setItem('numberphone', _userdata.cel)
                  AsyncStorage.setItem('email', _userdata.correo)
                  AsyncStorage.setItem('nis', JSON.stringify(_nis))
                  AsyncStorage.setItem('name', _userdata.nombre + ' ' + _userdata.ap + ' ' + _userdata.am)
                  AsyncStorage.setItem('rol', _userdata.tipo_usuario)

                  
                 if(_userdata.reset == 1 || monthDifference === 11)
                  {
                      navigation.navigate('Inicio temporal')
                  }
                  else
                  {
                      navigation.navigate('IndexScreen')
                  }
                  

              }
              else
              {
                 setLoading(false);
                  let _messageError = response.data.mensaje;
                  setMessageError(_messageError);
                  setFailedLogin(1);
                  
              }
              }          
         catch (error) {
            console.error(error);
            setLoading(false);
            Alert.alert('Ocurrió un error en el servidor');;
        } 
    }
  }
  

  //#REGION SIGN UP
  //Esta funcion redirige a la parte donde se crea una cuenta nueva
  const handleCreateAccount = async () => {
    navigation.navigate("Register");
  };

  //#REGION RECOVER PASSWORD
  const handleChangeEmail = (Text) => {
    setEmailRecover(Text);
  };

  const handleRecoverPassword = async () => {
    if (emailRecover.trim() === "") {
      alert("Introduce un correo");
    } else {
      let _body = [
        {
          correo: emailRecover,
        },
      ];

      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      try {
        let response = await axios({
          method: "post",
          url: `${API_URL}/api/resetPasswd`,
          headers: { Authorization: auth, "Content-Type": "application/json" },
          data: _body[0],
        });

        if (response.data.estatus === "ok") {
     

          navigation.navigate("New Password");
        } else {
          let _messageRecover = response.data.mensaje;
          setMessageRecoverPassword(_messageRecover);
        }
      } catch {
        alert("Ocurrió un error en el servidor");
      }
    }
  }


  return {
    //Log in
    handleChangeUsername,
    handleChangePassword,
    validateSession,
    username,
    password,
    messageEror,
    failedLogin,
    handleForgetPassword,

    //Sign up
    handleCreateAccount,

    //Recover password
    emailRecover,
    handleChangeEmail,
    handleRecoverPassword,
    messageRecoverPassword,
    loading,
    setLoading,setUsername,setPassword
  };
}

