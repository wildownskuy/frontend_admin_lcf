import { useEffect, useState } from "react";
import PageComponent from "../components/PageComponent";
import TButton from "../components/core/Tbutton";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

 
export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location,setLocation] = useState("");
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  function handleImage(e) {
    console.log(e.target.files)
    setImage(e.target.files[0])
  }
  function handleApi() {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('location', location)
    formData.append('image', image)
    axios.post('http://127.0.0.1:8000/api/posts', formData).then((res) => {
      console.log(res)
      navigate("/product");
      })
  }

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <PageComponent title="Add New Product">
<Helmet>

<meta charSet="utf-8" />

<title>Tambah Data</title>

</Helmet>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            
             
                {/*Name*/}
                <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={(event) =>
                    {
                      setTitle(event.target.value);      
                    }}
                  value={title}
                  placeholder="nama..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/*Name end*/} 
              {/*price*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="harga"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harga
                </label>
                <textarea
                  type="text"
                  name="content"
                  id="content"
                  onChange={(event) =>
                    {
                      setContent(event.target.value);      
                    }}
                  value={content}
                  placeholder="harga..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="lokasi"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lokasi
                </label>
                <textarea
                  type="text"
                  
                  name="location"
                  id="location"
                  onChange={(event) =>
                    {
                      setLocation(event.target.value);      
                    }}
                  value={location}
                  placeholder="lokasi..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/*Price end*/} 
              {/*image*/}
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="gambar"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gambar
                </label>
                
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImage}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/*Image end*/} 
            
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <TButton onClick={handleApi}>Submit</TButton>
            </div>
          </div>
      
    </PageComponent>
  );
}