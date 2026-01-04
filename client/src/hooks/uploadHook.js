import axios from "axios";
import { useQuery } from "@tanstack/react-query"


const useUploaded = () => {

  const getUploadedFiles = async () => {
    try {
      const uploads = await axios.get(`${import.meta.env.VITE_API_URL}/api/upload`)
      console.log(uploads)
      return uploads.data
    } catch (err) {
      console.log(err);
      throw err
    }
  };
  
  const query = useQuery({
    queryKey: ["uploaded"],
    queryFn: ()=>getUploadedFiles(),
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return query
};



export {useUploaded}