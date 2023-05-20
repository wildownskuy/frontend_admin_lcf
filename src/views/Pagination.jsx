import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
import dateFormat from 'dateformat';
import format from "date-fns/format";
import formatDate from 'intl-dateformat'
import ReactPaginate from "react-paginate";


export default function Pagination() {


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [pageCount, setpageCount] = useState(0);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/posts?page=1`).then((res) => {
      console.log(res);
      setData(res.data.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios.delete(`http://localhost:8000/api/posts/${id}`)
    .then(res => {
      alert(res.data.message)
      thisClicked.closest("tr").remove();
      
    })
    .catch(function(error){

      if(error.response){

        if(error.response.status === 404){
          alert(error.response.data.message);
          thisClicked.innerText = "Delete";
        }
        if(error.response.status === 500){
          alert(error.response.data)
        }

      } 

    });
  }
  const longEnUSFormatter = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const fetchComments = (currentPage) => {
    axios.get(`http://127.0.0.1:8000/api/posts?page=${currentPage}`).then((res) => {
      console.log(res);
      setData(res.data.data);
      setLoading(false);
    });
  };

  const handlePageClick = async (data) => {
    console.log(data.current_page);

    let currentPage = res.data.current_page + 1;

    const commentsFormServer = fetchComments(currentPage);

    setData(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };
  
  if (loading) {
    return (
      <Loading />
    );
  }

  var ProductDetails = "";

  ProductDetails = data.data.map((item, index) => {
    const newDate = dateFormat(item.updated_at, "fullDate", { locale: 'id' })
 console.log(newDate);
    return (
      <tr key={index}>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {item.id}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {item.title}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {item.content}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {item.location}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          <img src={item.image} alt="" srcset="" />
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {dateFormat(item.updated_at, "fullDate")}
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <Link to={`/product/${item.id}/edit`} className="text-green-300 hover:text-green-700">Edit</Link>
        </td>
        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <button className="text-red-500 hover:text-red-700"  onClick={(e) => handleDelete(e, item.id)}>
            Delete
          </button>
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
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Product
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* content */}
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-hidden border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                      <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Nama
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Harga
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                        Lokasi
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Gambar
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          Tanggal Diupdate
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Edit
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ProductDetails}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
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
