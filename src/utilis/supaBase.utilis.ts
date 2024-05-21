import { useCallback } from "react";
import supabase from "../config/supabaseClient";
import { SignUp } from "../types/types";

const getSupabaseBucket = useCallback(async () => {
    const { data, error } = await supabase
      .storage
      .getBucket('file_bucket');
    return data;
}, []);

const getSupaBaseTableData = useCallback(async () => {
    const { data, error } = await supabase
      .from("adimis_react_form")
      .select();

    if (data) {
      console.log(data)
    }
    if (error) {
      console.log(error)
    }
},[])



const handleSupaBaseDataSubmit = useCallback(async(values : SignUp) => {
    console.log(
        "On Submit Example Form Response: ",
        JSON.stringify(values, null, 4)

      )
      const uploadFile = values.file;
      console.log("xxvalues", values);
      const uploadResponse = await supabase
        .storage
        .from('file_bucket')
        .upload(`${uploadFile.name}`, uploadFile, {
          cacheControl: '3600',
          upsert: false
        });

      const { username, email, address, password, phone_number, gender, file } = values;
      const { data, error } = await supabase
        .from("adimis_react_form")
        .insert([{ username, email, address, password, phone_number, gender, file: "qw" }])
      if (error) {
        console.log("Error: ", error)
      }
      if (data) {
        console.log("Data: ", data)
      }
},[])

export { getSupabaseBucket, getSupaBaseTableData, handleSupaBaseDataSubmit };


