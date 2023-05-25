import { Helmet } from "react-helmet";
import PageComponent from "../components/PageComponent";
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useNavigate} from 'react-router-dom';

//import axios
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  //token
  const token = localStorage.getItem("token");

  //function "fetchData"
  const fetchData = async () => {

      //set axios header dengan type Authorization + Bearer token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      //fetch user from Rest API
      await axios.get('http://localhost:8000/api/user')
      .then((response) => {

          //set response user to state
          setUser(response.data);
      })
  }

  //hook useEffect
  useEffect(() => {

      //check token empty
      if(!token) {

          //redirect login page
          navigate('/login');
      }
      
      //call function "fetchData"
      fetchData();
  }, []);

  //function logout
  const logoutHanlder = async () => {

      //set axios header dengan type Authorization + Bearer token
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      //fetch Rest API
      await axios.post('http://localhost:8000/api/logout')
      .then(() => {

          //remove token from localStorage
          localStorage.removeItem("token");

          //redirect halaman login
          navigate('/login');
      });
  };

  return (
    <PageComponent title="Dashboard">
      <Helmet>
        <meta charSet="utf-8" />

        <title>Dashboard</title>
      </Helmet>
      
       
    </PageComponent>
  );
}
