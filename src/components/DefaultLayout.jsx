import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, Outlet } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

//import hook useHitory from react router dom
import { useNavigate} from 'react-router-dom';

//import axios
import axios from 'axios';



const navigation = [
  { name: 'Dashboard', to: '/'},
  { name: 'Product', to:'/product'}
]
const userNavigation = [
  
  { name: 'Sign out' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
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
  const logoutHandler = async () => {

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
    <>
      
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({isActive}) => classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                     

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <button
                                    onClick={logoutHandler}
                                    className={classNames(
                                      active ? 'bg-gray-100 text-left w-full' : '',
                                      'block px-4 py-2 text-left text-sm w-full text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={({isActive})=>classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                   
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        onClick={logoutHandler}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
<Outlet/>
      </div>
    </>
  )
}
