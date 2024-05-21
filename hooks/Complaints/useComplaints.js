import * as DocumentPicker from "expo-document-picker";

export function useComplaints () {

    const handleSelectDocument = async () => {
        let _doc = await DocumentPicker.getDocumentAsync({});
    }


    return {
        handleSelectDocument
    }
}