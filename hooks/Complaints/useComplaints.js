import * as DocumentPicker from "expo-document-picker";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import md5 from "js-md5";
import { API_URL, API_TOKEN, API_AUTH } from "@env";

export function useComplaints() {
  // Complaints
  const tableHead = ["Folio seguimiento", "Estatus"];
  const [tableData, setTableData] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [statusComplaints, setStatusComplaints] = useState([]);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalComplaint, setModalComplaint] = useState(false);

  const [loadingComplaints, setLoadingComplaints] = useState(false);

  const [modules, setModules] = useState([]);

  //New complaint
  const [processComplaint, setProcessComplaint] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();
  const [enabledForm, setEnabledForm] = useState(false);

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [niss, setNiss] = useState([]);
  const [niss2, setNiss2] = useState([]);
  const [nisSelected, setNissSelected] = useState();
  const [nisComplaint, setNisComplaint] = useState([]);

  const [colony, setColony] = useState([]);

  const [requests, setRequests] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [selectedFiles, setSelectedFiles] = useState([]);

  const ref = useRef();

  const webStyle = `
  .m-signature-pad {
    box-shadow: none; 
    border: none; 
    margin: 0;
    padding: 0;
  }
  .m-signature-pad--body {
    
  }
  .m-signature-pad--footer {
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .m-signature-pad--footer .button {
    background-color: #f0f0f0;
    border-radius: 5px;
    color: #000;
    font-size: 16px;
    padding: 10px;
    margin: 5px;
    flex: 1;
    text-align: center;
    cursor: pointer; 
  }
  `;
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [idGender, setIdGender] = useState(0);

  const gender = useMemo(() => [
    {
      id: "F",
      label: "F",
      value: "F",
    },
    {
      id: "M",
      label: "M",
      value: "M",
    },
  ]);

  const [telefonoError, setTelefonoError] = useState("");
  const telefonoValue = watch("telefono");

  useEffect(() => {
    if (!telefonoValue) {
      setTelefonoError("");
    } else if (!/^\d{10}$/.test(telefonoValue)) {
      setTelefonoError(
        "El número de teléfono debe tener exactamente 10 dígitos."
      );
    } else {
      setTelefonoError("");
    }
  }, [telefonoValue]);

  const handleSelectgender = (id_gender) => {
    setIdGender(id_gender);
  };

  useFocusEffect(
    useCallback(() => {
      setIsFormVisible(false);
      return () => {
        handleClearForm();
      };
    }, [])
  );

  useEffect(() => {
    if (isFormVisible) {
      handleClearForm();
    }
  }, [isFormVisible]);

  const handleNewComplaint = () => {
    setIsFormVisible(true);
  };

  const handleClearForm = () => {
    handleSelectNiss([]);
    setInputValue("");
    requests.splice(0, requests.length);
    selectedFiles.splice(0, selectedFiles.length);
    reset();
  };

  const getColony = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getColonias`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        let _colony = [];

        if (_data.length > 0) {
          _data.map((_c, _i) => {
            _colony.push({
              id: _c.id,
              name: _c.nombre,
            });
          });
        }
        setColony(_colony);
      } else {
        alert("Ocurrió un error en el servidor");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const getModules = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getModulos`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        let _modules = [];

        if (_data.length > 0) {
          _data.map((_m, _i) => {
            _modules.push({
              id: _m.id,
              title: _m.modulo,
            });
          });
        }
        setModules(_modules);
      } else {
        alert("Ocurrió un error en el servidor");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const getNisAccount = async () => {
    let _niss = [];
    let _nissComplaint = [];
    let _nis = await AsyncStorage.getItem("nis");
    let _nis2 = await AsyncStorage.getItem("nis");
    _nis = JSON.parse(_nis);
    _nis2 = JSON.parse(_nis2);

    if (_nis.length > 0) {
      _nis.map((item, index) => {
        _niss.push({
          id: item.nis,
          name: item.nis,
        });
      });

      setNiss(_niss);
    }

    if (_nis2.length > 0) {
      _nis2.map((_nis, _i) => {
        _nissComplaint.push({
          title: _nis.nis,
        });
      });

      setNiss2(_nissComplaint);
    }
  };

  useEffect(() => {
    getModules();
    getNisAccount();
    getColony();
  }, []);

  const handleSelectNiss = (selectedItems) => {
    setNissSelected(selectedItems);
  };

  const handleFileSelect = async () => {
    let _selectedFiles = [...selectedFiles];
    if (_selectedFiles.length < 1) {
      let result = await DocumentPicker.getDocumentAsync();
      console.log(result);

      if (result.canceled === false) {
        result.assets.map((_item, _index) => {
          _selectedFiles.push(_item);
        });

        setSelectedFiles(_selectedFiles);
        setValue("file", _selectedFiles);
      }
    }
  };

  const handleFileRemove = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleClear = () => {
    ref.current.clearSignature();
    // console.log("clear success!");
  };

  const handleEnd = () => {
    ref.current.readSignature();
    setScrollEnabled(true);
  };

  const handleData = (data) => {
    handleShowModalSignature();
  };

  const handleBegin = () => {
    setScrollEnabled(false);
  };

  const handleAddRequest = () => {
    setValue("folio", 1);
    setValue("id_clasificacion", 1);
    let _request = [...requests];
    if (_request.length < 6) {
      if (inputValue.trim()) {
        setRequests([...requests, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveRequest = (index) => {
    setRequests(requests.filter((_, i) => i !== index));
  };

  useFocusEffect(
    useCallback(() => {
      setEnabledForm(false);
    }, [])
  );

  const onSubmit = async (data) => {
    

    let _id_user = await AsyncStorage.getItem("id");

    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, "0");
    let day = String(today.getDate()).padStart(2, "0");

    let dateComplaint = `${year}-${month}-${day}`;

    let formData = new FormData();

    formData.append("id_usuario_app", _id_user);
    formData.append("nis", data.nis.title);
    formData.append("fecha", dateComplaint);
    formData.append("folio", "SOAPAP-Q-1");
    formData.append("telefono", data.telefono);
    formData.append("sexo", data.sexo);
    formData.append("descripcion", data.descripcion);
    formData.append("firma", data.firma);
    formData.append("domicilio", data.domicilio);
    formData.append("id_colonia", data.colonia[0]);
    formData.append("id_clasificacion", 1);

    if (data.hasOwnProperty("modulo") == true) {
      formData.append("id_modulo", "");
    }else{
      formData.append("id_modulo", data.modulo.id);
    }
    formData.append("atendio", data.atendio == undefined ? data.atendio : "");
    if(data.file !== null && data.file !== undefined)
      {
        formData.append("archivo", {
          uri: data.file[0].uri,
          type: data.file[0].mimeType,
          name: data.file[0].name,
        });
      }
      else
      {
        formData.append("archivo", []);
      }
    //formData.append('archivo', data.file[0]);
    formData.append("estado", "PUEBLA");

    if(data.hasOwnProperty("nis_extra"))
      {
        data.nis_extra.forEach((item, index) => {
          formData.append(`nis_extra[${index}]`, item);
        });
      }
      else
      {
        //["nis_extra[0]", "3074856"]
        formData.append('nis_extra[0]', "NA");
      }



    data.expresa.forEach((item, index) => {
      formData.append(`expresa[${index}]`, item);
    });

  
console.log(formData);

    let pass = md5(API_TOKEN);
    let credentials = `${API_AUTH}:${pass}`;
    let encodedCredentials = btoa(credentials);
    let auth = "Basic " + encodedCredentials;

    try {

      setProcessComplaint(true);
      let response = await axios({
        method: "POST",
        url: `${API_URL}/api/setQUejas`,
        headers: { Authorization: auth, "Content-Type": "multipart/form-data" },
        data: formData,
      });
      console.log(response.data);
      if (response.data.estatus === "ok") {
        console.log(message);

        let message = response.data.mensaje;
        alert(message);
        handleClearForm();
        setProcessComplaint(false);
        setIsFormVisible(false);
      }
    } catch (error) {
      setProcessComplaint(false);
      setProcessComplaint(false);
      alert("Hubo un error en el servidor");
    }
  };

  //#REGION Complaints

  const getEstatus = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      const data = {
        id_usuario_app: "1",
      };
      let body = JSON.stringify(data);

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getEstatus`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
        data: body,
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        setStatusComplaints(_data);
        return _data;
      } else {
        throw new Error("Failed to get status");
      }
    } catch (error) {
      alert("Ocurrió un error en el servidor");
      throw error;
    }
  };

  const viewDetailComplaint = (index) => {
    setSelectedComplaint(complaints[index]);
    setModalComplaint(true);
  };

  const toggleModalComplaint = () => {
    setModalComplaint(false);
    setSelectedComplaint(null);
  };

  const handleGetComplaints = async () => {
    try {
      setLoadingComplaints(true);
      let statusComplaints = await getEstatus();

      let _id_user = await AsyncStorage.getItem("id");
      let _body = [
        {
          id_usuario_app: _id_user,
        },
      ];

      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getQuejas`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
        data: _body[0],
      });
      console.log(response.data.estatus);

      if (response.data.estatus === "ok") {
        setLoadingComplaints(false);
        let _complaints = response.data.mensaje;
        if (_complaints.length > 0) {
          let updatedComplaints = _complaints.map((item) => {
            let _statusComplaint = statusComplaints.find(
              (x) => x.id === item.estatus
            );
            return {
              ...item,
              estatus: _statusComplaint
                ? _statusComplaint.estatus
                : "Desconocido",
            };
          });

          _complaints = updatedComplaints;
        }

        setComplaints(_complaints);

        let _tableData =
          _complaints.length > 0
            ? _complaints.map((item) => {
                return [item.folio, item.estatus];
              })
            : [];

        setTableData(_tableData);
      } else if (response.data.estatus === "error") {
        setLoadingComplaints(false);
      }
    } catch (error) {
      setLoadingComplaints(false);
      alert("Ocurrió un error en el servidor");
    }
  };

  useEffect(() => {
    handleGetComplaints();
  }, []);

  return {
    //Complaints
    tableHead,
    complaints,
    handleGetComplaints,
    tableData,
    selectedComplaint,
    modalComplaint,
    viewDetailComplaint,
    toggleModalComplaint,
    setModalComplaint,
    loadingComplaints,

    //Create complaint
    processComplaint,
    ref,
    webStyle,
    handleEmpty,
    handleClear,
    handleEnd,
    handleData,
    scrollEnabled,
    handleBegin,
    niss,
    handleSelectNiss,
    nisSelected,
    handleAddRequest,
    handleRemoveRequest,
    requests,
    inputValue,
    setInputValue,
    handleFileSelect,
    handleFileRemove,
    selectedFiles,
    isFormVisible,
    handleNewComplaint,
    setValue,
    handleSubmit,
    control,
    errors,
    onSubmit,
    gender,
    handleSelectgender,
    idGender,
    nisComplaint,
    niss2,
    colony,
    getNisAccount,
    telefonoError,
    modules,
  };
}
