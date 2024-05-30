import * as DocumentPicker from "expo-document-picker";
import { useRef, useEffect, useState, createRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from "react-native-multiple-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";


export function useComplaints() {

  //New complaint
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const [enabledForm, setEnabledForm] = useState(false);
  

  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [niss, setNiss] = useState([]);
  const [nisSelected, setNissSelected] = useState();
  const [nisComplaint, setNisComplaint] = useState([]);

  

  const [requests, setRequests] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [selectedFiles, setSelectedFiles] = useState([]);


  //Status complaints
  const tableHead = ["Folio seguimiento", "Estatus"];
  const [reportes, setReportes] = useState([]);
  const tableData = reportes.map((item) => [item.id, item.tipo]);


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
    cursor: pointer; /* Ensure buttons are clickable */
  }
  `;
  const [isFormVisible, setIsFormVisible] = useState(false);

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
    setInputValue('');
    requests.splice(0, requests.length);
    selectedFiles.splice(0, selectedFiles.length);
    reset();
  };

  const getNisAccount = async () => {
    let _niss = [];
    let _nis = await AsyncStorage.getItem('nis');
     _nis = JSON.parse(_nis);

     if(_nis.length > 0)
      {
        _nis.map((item, index) => {
          _niss.push({
            id: item.nis,
            name: item.nis
          })
        })

        setNiss(_niss);
      } 
    }
  
  useEffect(() => {
    getNisAccount();
   }, []);

   
   const handleSelectNiss = (selectedItems) => {
    setNissSelected(selectedItems);
  }
  
  

  const handleFileSelect = async () => {
    let _selectedFiles = [...selectedFiles];
    let result = await DocumentPicker.getDocumentAsync({ multiple: true });
    
    if (result.canceled === false) {
          result.assets.map((_item, _index) => {
            _selectedFiles.push(_item);
          })

     
      setSelectedFiles(_selectedFiles);
      setValue("file", _selectedFiles);
    }
  };

  const handleFileRemove = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

 const handleGetComplaints = async () => {
 
 }
  

  const handleEmpty = () => {
    console.log("Empty");
  };

  const handleClear = () => {
    ref.current.clearSignature();
    console.log("clear success!");
  };

  const handleEnd = () => {
    ref.current.readSignature();
    setScrollEnabled(true);
  };


  const handleData = (data) => {
    handleShowModalSignature();
    console.log('entro??????????');
  };

  const handleBegin = () => {
    setScrollEnabled(false);
  };
 

  const handleAddRequest = () => {
    if (inputValue.trim()) {
      setRequests([...requests, inputValue.trim()]);
      setInputValue('');
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


  const onSubmit = (data) => {
    console.log(data);
  };

  return {

    //Complaints 
    tableHead, tableData,

    //Create complaint
    ref, webStyle, handleEmpty, handleClear, handleEnd, handleData, scrollEnabled, handleBegin,
    niss, handleSelectNiss, nisSelected, handleAddRequest, handleRemoveRequest, requests, inputValue, setInputValue,
    handleFileSelect, handleFileRemove, selectedFiles, isFormVisible, handleNewComplaint, setValue, handleSubmit, control, errors, onSubmit
   
  };
}
