import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/Tbutton";
import axios from "axios";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "autoprefixer";
import { Helmet } from "react-helmet";

 
export default function UpdateStudent() {
 
  const navigate = useNavigate();
     
  const {id}=   useParams();
   
  const[message, setMessage]= useState('');

  const [inputs, setInputs] = useState([]);
  const [fileimage, setPhoto]= useState('');
   
  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  }
   
  const uploadProduct= async()=>{
      const formData= new FormData();
      formData.append('_method', 'PATCH');
      formData.append('title', inputs.title);
      formData.append('content',inputs.content);
      formData.append('location',inputs.location);
      formData.append('image', fileimage);
      const response= await axios.post("http://127.0.0.1:8000/api/posts/"+id, formData, {
          headers:{'Content-Type':"multipart/form-data"},
      } );
      setMessage(response.data.message); //"message": "Product successfully updated.."
      console.log(response)
      setTimeout(()=>{
          navigate('/product');
      }, 2000);
  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    await uploadProduct();

 }
  
  useEffect(() => {
      getproduct();
  }, []);
 
  function getproduct() {
      axios.get('http://127.0.0.1:8000/api/posts/'+id).then(function(response) {
          console.log(response);
          setInputs(response.data.data);
      });
  }

  return (
    <PageComponent title="Edit Student">
       <Helmet>

<meta charSet="utf-8" />

<title>{inputs.title}</title>

</Helmet>
            <form action="#" method="POST" onSubmit={handleSubmit} >
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            
             
              {/*Name*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={inputs.title}
                  name="title" onChange={ handleChange}
                  placeholder="name..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/*Name end*/} 
              {/*course*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                
                <textarea
                  type="text"
                  value={inputs.content}
                  name="content" onChange={ handleChange}
                  placeholder="Description..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
               
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Lokasi"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                
                <textarea
                  type="text"
                  value={inputs.location}
                  name="location" onChange={ handleChange}
                  placeholder="Location..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
               
              </div>
              {/*Course end*/} 
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image
                </label>
                <img src={inputs.image} alt="" width={300} />
                <input
                  type="file"
                  onChange={(e)=>setPhoto(e.target.files[0])}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
               
              </div>
              {/*Course end*/}
             
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </form>
      
    </PageComponent>
  );
}