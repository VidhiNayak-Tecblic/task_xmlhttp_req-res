//1)LOCAL XML CALLS :-----------FETCH()

//********************************************************** */
//trying json data to fetch and het responce

import React, { useEffect, useState } from "react";
import { xml2js } from "xml2js";

export default function User() {
  const [userData, setUserdata] = useState();
  const [xmlData, setXmlData] = useState(null);

  const funA = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUserdata(json))
      .then((json) => console.log("jsondata", userData))
      .catch((error) => console.error(error));
  };

  const funB = () => {
    fetch(`https://www.w3schools.com/xml/plant_catalog.xml`)
      .then((res) => res.text())
      .then((text) => {
        xml2js.parseString(text, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            setXmlData(result);
          }
        });
      });

    // .then((response) => response.text())
    // .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
    // .then((xmlData) => setxmlTypeddata(xmlData))
    // .then((text) => console.log("xmldata", xmlTypeddata));
  };

  useEffect(() => {
    //  funA();
    //  funB();
  }, []);

  console.log("userdata", userData);
  return (
    <div className="User_maindiv  bg-black">
      <div>
        <div className="text-white">
          <p>XMLHTTP REQUEST-RESPONSE</p>
        </div>
        <div>
          <h1 className="text-white">JSON data api</h1>
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
      </div>

      <div className="text-white">
        {/* <div>
          {xmlData ? (
            <div>
              <h2>XML Data:</h2>
              <pre>{JSON.stringify(xmlData)}</pre>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div> */}
      </div>
    </div>
  );
}
//**************************************************************************************************************

//now use xml typed data ,fetch the data then call the response
