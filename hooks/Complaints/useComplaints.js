import * as DocumentPicker from "expo-document-picker";
import { useRef, useEffect, useState, createRef } from "react";


export function useComplaints() {

  const [scrollEnabled, setScrollEnabled] = useState(true);


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

  const handleSelectDocument = async () => {
    let _doc = await DocumentPicker.getDocumentAsync({});

  };

 
  

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
 


  return {

    //Signature
    handleSelectDocument, ref, webStyle, handleEmpty, handleClear, handleEnd, handleData, scrollEnabled, handleBegin
   
  };
}
