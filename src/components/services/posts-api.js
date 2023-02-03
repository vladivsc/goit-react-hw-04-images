import axios from "axios";

const instance = axios.create({
  baseURL: "https://pixabay.com/api",
  
  params: {
      image_type: 'photo',
      orientation: 'horizontal', 
      key : '32021376-a2c338f161985bdac1a580f15',
      per_page: 12,
  }
})

export const fetchImages = async(q, page = 1)=> {
  const {data} = await instance.get("/", {
      params: {
          q,
          page
      }
  });
  return data;  
}