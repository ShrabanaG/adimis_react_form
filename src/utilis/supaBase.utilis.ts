import { useCallback } from "react";
import supabase from "../config/supabaseClient";
import { SignUp } from "../types/types";

const getSupabaseBucket = async () => {
	const { data, error } = await supabase.storage.getBucket("file_bucket");
	return data;
};

const getSupaBaseTableData = async () => {
	const { data, error } = await supabase.from("adimis_react_form").select();

	if (data) {
		console.log(data);
	}
	if (error) {
		console.log(error);
	}
};

const uploadToSupabaseBucket = async (uploadFile: File) => {
	const uploadResponse = await supabase.storage
		.from("file_bucket")
		.upload(`${uploadFile.name + Date.now() + ""}`, uploadFile, {
			cacheControl: "3600",
			upsert: false
		});
	const publicUrlResponse = supabase.storage.from("file_bucket").getPublicUrl(`${uploadFile.name}`);
	console.log("publicUrlResponse.data", publicUrlResponse.data);

	return publicUrlResponse.data.publicUrl;
};

const insertToSupabase = async (values: SignUp, fileUrl: string) => {
	const { username, email, address, password, phone_number, gender, expertise } = values;
	const { data, error } = await supabase
		.from("adimis_react_form")
		.insert([{ username, email, address, password, phone_number, gender, file: fileUrl, expertise }])
		.select();
	return data;
};

const updateToSupabase = async (values: SignUp, fileUrl: string, id: number) => {
	const { username, email, address, password, phone_number, gender, expertise } = values;
	const { data, error } = await supabase
		.from("adimis_react_form")
		.update([{ username, email, address, password, phone_number, gender, file: fileUrl, expertise }])
		.eq("id", id)
		.select();
	return data;
};

export { getSupabaseBucket, getSupaBaseTableData, uploadToSupabaseBucket, insertToSupabase, updateToSupabase };
