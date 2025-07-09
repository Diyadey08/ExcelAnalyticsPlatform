import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const uploadFileToPinata = async (filePath) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const metadata = JSON.stringify({
    name: "excel_upload"
  });
  formData.append("pinataMetadata", metadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 1
  });
  formData.append("pinataOptions", pinataOptions);

  const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
      "pinata_api_key": process.env.PINATA_API_KEY,
      "pinata_secret_api_key": process.env.PINATA_SECRET_API_KEY,
    },
  });

  return res.data;
};
