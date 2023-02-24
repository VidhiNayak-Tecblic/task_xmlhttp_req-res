//1)LOCAL XML CALLS :-----------FETCH()

//********************************************************** */
//trying json data to fetch and het responce

import React, { useEffect, useState } from "react";

import axios from "axios";
import { parseString, Builder } from "xml2js";

export default function User() {
  const [userData, setUserdata] = useState();
  const [postData, setPostdata] = useState({});
  const [patchData, setPatchdata] = useState("");

  //making state of Array for get perticular value(like name,id) from parsed json data
  const [parsedDataArray, setParseddataarray] = useState([]);

  const GetFakeJson = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUserdata(json))
      .then((json) => console.log("jsondata", userData))
      .catch((error) => console.error(error));
  };

  const XmlToJson = async () => {
    const res = await axios.get("http://127.0.0.1:8000/student");
    console.log("XML_Typed_res ----> ", res.data);

    // parsing xml data
    parseString(res.data, function (err, results) {
      // parsing to json
      let data = JSON.stringify(results);
      console.log("JSON_typed_res---->", JSON.parse(data));

      //take stringify json data into variable ->set finaldata into blank object state
      const FinalData = JSON.parse(data);
      //make variable ,assigned the value that we get from data
      const jsonDataArray = FinalData.root["list-item"];
      setParseddataarray(jsonDataArray);
      console.log("jsonDataArray", jsonDataArray);
    });
  };

  const JsonToXml = async (postData) => {
    // const builder = new xml2js.Builder(); creates a new instance of the Builder class provided by the xml2js library.
    // The Builder class is responsible for generating XML documents from JavaScript objects. It has various options
    //  to control the output format, such as setting the root element name, specifying the encoding, defining namespaces, and more.
    // Once you create a Builder instance, you can use its buildObject() method to convert a JavaScript object to an XML string.
    //  The buildObject() method takes a single argument, which is the JavaScript object that you want to convert.
    //inshort use Builder() to convert json data into xml
    console.log("afterClickdata", postData, typeof postData);
    const builder = new Builder();

    const xmlStr = builder.buildObject(postData);

    console.log("xmldata convert==========>", xmlStr);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/student",
        xmlStr,
        {
          headers: {
            "Content-Type": "application/xml",
            Accept: "*/*",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }


  
    try {
      const response = await axios.patch(
        "http://127.0.0.1:8000/student/"+{xmlStr},
        xmlStr,
        {
          headers: {
            "Content-Type": "application/xml",
            Accept: "*/*",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }

  };

  const handlePatch = (data) => {
    console.log("datapatch===>", data.id);
    axios.patch("http://127.0.0.1:8000/student/{}", data, {
      headers: {
        "Content-Type": "application/xml",
        Accept: "*/*",
      },
    });
  };

  const handleChange = (event) => {
    setPostdata({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangePatch = (event) => {
    console.log("patchstate======>", patchData);
    setPatchdata({
      ...patchData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    GetFakeJson();
    XmlToJson();
  }, []);

  console.log("Beforeclickdata===>", postData);

  return (
    <div className="User_maindiv  bg-black ">
      <div className=" ">
        <div className="text-white">
          <p className="text-2xl text-center mb-7">XMLHTTP REQUEST-RESPONSE</p>
        </div>

        <div className="flex justify-around">
          <div className="w-80">
            <h1 className="text-white bg-gray-400 h-12">JSON Data:</h1>
            <p className="text-white"> JSON typed api data showed</p>
            {userData &&
              userData.map((user) => (
                <div className="mt-12">
                  <div
                    className="cardDiv bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
                    key={user.id}
                  >
                    <pre className="">
                      NAME:- {user.name}
                      <br />
                      USERNAME:-{user.username}
                      <br />
                      PHONE:-{user.phone}
                      <br />
                      EMAIL:-{user.email}
                      <br />
                    </pre>
                  </div>
                </div>
              ))}
          </div>

          <div className="">
            <div className="  w-80 ">
              <div>
                <h2 className="text-white bg-gray-400 h-12">XML Data:</h2>
                <p className="text-white">
                  XML Typed data converted to JSON and data showed
                </p>
                {parsedDataArray.map((item) => (
                  <div className="text-center mt-7  bg-gradient-to-r from-green-100 to-yellow-100 w-64 ">
                    <hr />
                    <table>
                      <tr>
                        <td>
                          ID :
                          <input
                            value={item.id}
                            className="bg-gradient-to-r "
                            onChange={handleChangePatch}
                            onClick={() => handlePatch(item)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          STID :
                          <input
                            value={item.stid}
                            className="bg-gradient-to-r"
                            onChange={handleChangePatch}
                            onClick={() => handlePatch(item)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Name :
                          <input
                            value={item.name}
                            className="bg-gradient-to-r"
                            onChange={handleChangePatch}
                            onClick={() => handlePatch(item)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Course:
                          <input
                            value={item.course}
                            className="bg-gradient-to-r"
                            onChange={handleChangePatch}
                            onClick={() => handlePatch(item)}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid place-items-center mt-10 border-spacing-16 border-cyan-900 border rounded-full bg-[#2424836e]">
        <h1 className="text-white mt-7 mb-5 text-3xl">Form</h1>

        <div className="flex flex-col">
          <label className="text-cyan-300"> ID:</label>
          <input
            type="text"
            name="id"
            value={postData.id}
            onChange={handleChange}
            className="mt-7 w-64"
          />
          <br />
          <label className="text-cyan-300"> STID:</label>
          <input
            type="text"
            name="stid"
            value={postData.stid}
            onChange={handleChange}
            className="mt-7 w-64"
          />
          <br />
          <label className="text-cyan-300"> NAME:</label>
          <input
            type="text"
            name="name"
            value={postData.name}
            onChange={handleChange}
            className="mt-7 w-64"
          />
          <br />
          <label className="text-cyan-300"> COURSE:</label>
          <input
            type="text"
            name="course"
            value={postData.course}
            onChange={handleChange}
            className="mt-7 w-64"
          />
          <br />
          <button
            type="button"
            className="bg-green-300 mt-7 w-64 mb-5"
            onClick={() => JsonToXml(postData)}
          >
            POST DATA
          </button>
        </div>
      </div>
    </div>
  );
}
//**************************************************************************************************************

//now use xml typed data ,fetch the data then call the response
//react
