import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
import dateFormat from "dateformat";
import Pagination from "./Pagination";

export default function Student() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2); //7 Per Page

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts`).then((res) => {
      console.log(res);
      setData(res.data.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Wait...";

    axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then((res) => {
        alert(res.data.message);
        thisClicked.closest("tr").remove();
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert(error.response.data.message);
            thisClicked.innerText = "Delete";
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(data.length / postsPerPage);

  const longEnUSFormatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading && data.length === 0) {
    return <Loading />;
  }
  var ProductDetails = "";

  ProductDetails = currentPosts.map((item, index) => {
    const newDate = dateFormat(item.updated_at, "fullDate", { locale: "id" });
    console.log(newDate);
    return (
      <tr key={index} className="flex w-full m-3">
      <td className="px-6 py-4 w-10 flex max-h-52 ">
        {index+1}
      </td>
      <td className="px-6 py-4 w-[130px] flex max-h-52 overflow-y-auto">
        {item.title}
      </td>
      <td className="px-6 py-4 w-[240px] flex max-h-52 ">
      <textarea readonly disabled className="border-none cursor-default resize-none" value={item.content}/>

      </td>
      <td className="px-6 py-4 w-[200px] flex max-h-52 ">
      <textarea readonly disabled  className="border-none cursor-default resize-none" value={item.location}/>
      </td>
      <td className="px-6  py-4 w-[130px]   flex max-h-52 overflow-y-auto">
        {dateFormat(item.updated_at, "fullDate")}
      </td>
      <td className="px-6 py-4 w-[240px] flex max-h-52 overflow-y-auto">
        <img
          src={item.image}
          alt=""
          height={60}
          width={200}
          srcset=""
        />
      </td>
      <td className="px-6 py-4 w-[95px] flex max-h-52 overflow-y-auto">
        <Link
          to={`/product/${item.id}/edit`}
          className="text-green-300 hover:text-green-700 "
        >
          Edit
        </Link>
      </td>
      <td className="px-6 py-4 w-[95px] flex max-h-52 overflow-y-auto">
        <Link
          className="text-red-500 hover:text-red-700"
          onClick={(e) => handleDelete(e, item.id)}
        >
          Delete
        </Link>
      </td>
    </tr>
    );
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />

        <title>Product</title>
      </Helmet>
      <header className="bg-white shadow">
        <div className="flex justify-between items-center mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Product
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* content */}
          <div className="flex flex-col">
            <div className="">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="text-left divide-y border-solid border-collapse  divide-gray-200  w-full">
                    <thead className="bg-purple-400 flex text-center text-white w-full">
                      <tr className="flex w-full mb-2">
                        <th className="px-6 py-4 w-10 font-bold  uppercase">
                          ID
                        </th>
                        <th className="px-6 py-4 w-[130px] font-bold  uppercase">
                          title
                        </th>
                        <th className="px-6 py-4 w-[240px] font-bold  uppercase">
                          content
                        </th>
                        <th className="px-6 py-4 w-[200px] font-bold  uppercase">
                          location
                        </th>
                        <th className="px-6 py-4 w-[130px] font-bold  uppercase">
                          Date
                        </th>
                        <th className="px-6 py-4 w-[240px] font-bold  uppercase">
                          image
                        </th>
                        <th className="px-6 py-4 w-[95px] font-bold  uppercase">
                          Edit
                        </th>
                        <th className="px-6 py-4 w-[95x] font-bold  uppercase">
                          Delete
                        </th>
                      </tr>
                    </thead>

                    <tbody className="bg-grey-light flex flex-col items-center justify-between  w-full">
                      {ProductDetails}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
          <Link to="/product/add">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 ml-2 py-2 px-5 rounded">
              Add Product
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
