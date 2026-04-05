import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Lottie from "lottie-react";
import eyeAnimation from "../assets/visibility.json";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Manger = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "", id: "" });
  const [passArray, setPassArray] = useState([]);
  const [show, setShow] = useState(false);
  const lottieRef = useRef();

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPassArray(passwords);
  };

  useEffect(() => {
    getPasswords();
    lottieRef.current.setSpeed(3);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    let id = uuidv4();
    setPassArray([...passArray, { ...form, id: id }]);
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id }),
    });
    setForm({ site: "", username: "", password: "" });
    toast("Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const handleCopy = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };
  const deletePassword = async (id) => {
    setPassArray(passArray.filter((item) => item.id !== id));
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    toast("Password deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const editPassword = (id) => {
    setForm({ ...passArray.find((item) => item.id === id), id: id });
    setPassArray(passArray.filter((item) => item.id !== id));
  };
  const handleShow = () => {
    setShow(!show);

    lottieRef.current.setDirection(show ? 1 : -1);
    lottieRef.current.play();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className="md:w-1/2 md:border-2 mx-auto mb-7 mt-5 rounded-2xl borderlack p-4">
        <img src="./logo.png" width={130} alt="" className="m-auto mb-4" />
        <div className="form justify-center items-center flex flex-col">
          <div className="w-full">
            <label htmlFor="site" className="font-medium">
              Enter the website
            </label>
            <input
              type="text"
              placeholder="Enter website url"
              name="site"
              className="w-full mt-1 text-sm border-2 border-slate-400 py-0.5 px-2 rounded-xl"
              value={form.site}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 pt-3 w-full  ">
            <div className="w-full">
              <label htmlFor="username" className="font-medium">
                Enter username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                name="username"
                className="w-full mt-1 text-sm border-2 border-slate-400 py-0.5 px-2 rounded-xl"
                value={form.username}
                onChange={handleChange}
              />
            </div>
            <div className="w-full relative">
              <label htmlFor="password" className="font-medium">
                Enter password
              </label>
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                className="w-full mt-1 text-sm border-2 border-slate-400 py-0.5 px-2 rounded-xl"
                value={form.password}
                onChange={handleChange}
              />
              <Lottie
                onClick={handleShow}
                animationData={eyeAnimation}
                loop={false}
                lottieRef={lottieRef}
                autoPlay={false}
                className="w-7 absolute bottom-0 right-1"
              />
            </div>
          </div>
          <button
            className="border-2 font-medium flex items-center justify-center mt-5 p-2 px-4 rounded-3xl poi"
            onClick={handleSave}
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            <span>Save</span>
          </button>
        </div>
        <table className="table-auto w-full rounded-2xl overflow-hidden my-5">
          <thead className="bg-[#014374] text-white h-9">
            <tr>
              <th>Site</th>
              <th>Username</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#83caff57]">
            {passArray.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="p-2 border border-white">
                    <div className="flex justify-center items-center">
                      <a
                        href={`http://${item.site}`}
                        target="_blank"
                        className="underline"
                      >
                        {item.site}
                      </a>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleCopy(item.site)}
                      >
                        <lord-icon
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                        ></lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border border-white">
                    <div className="flex justify-center items-center">
                      <span>{item.username}</span>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleCopy(item.username)}
                      >
                        <lord-icon
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                        ></lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 border border-white">
                    <div className="flex justify-center items-center">
                      <span>{"*".repeat(item.password.length)}</span>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleCopy(item.password)}
                      >
                        <lord-icon
                          style={{
                            width: "25px",
                            height: "25px",
                            paddingTop: "3px",
                            paddingLeft: "3px",
                          }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                        ></lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className="justify-center py-2 border border-white text-center">
                    <span
                      className="cursor-pointer mx-1"
                      onClick={() => {
                        editPassword(item.id);
                      }}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                    <span
                      className="cursor-pointer mx-1"
                      onClick={() => {
                        deletePassword(item.id);
                      }}
                    >
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Manger;
