import { useQuery } from "@tanstack/react-query";
import axios from "axios";


/**
 * React Custom hook for getting uploaded files
 * @returns {UseQueryResult} Query result containing uploads data and other functions or properties
 */
const useUploaded = () => {

  const getUploadedFiles = async () => {
    try {
      const uploads = await axios.get(`/api/upload`)
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



export { useUploaded };
