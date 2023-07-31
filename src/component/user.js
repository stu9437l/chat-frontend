import React, { useEffect, useState } from "react";
import Axios from "../axios";

const Users = ({ searchValue, setId }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("");

  //Fetch data without side effect
  useEffect(() => {
    const abortController = new AbortController();
    const GetUserData = async () => {
      try {
        const response = await Axios.get("/users", {
          signal: abortController.signal,
        });
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };
    GetUserData();
  }, []);

  // to sort data

  const sortedData = user.sort(function (a, b) {
    return a.id - b.id;
  });

  // to filter data

  const searchedData = sortedData.filter((f) =>
    f.name.toLowerCase().includes(searchValue)
  );

  return (
    <ul className="userList">
      {searchedData.length > 1 ? (
        searchedData.map((user, index) => {
          return (
            <>
              {loading ? (
                <p>Loading ........</p>
              ) : (
                <li key={index}>
                  <div
                    className={`user ${user.status === "active" && "online"} ${
                      active === index && "active"
                    }`}
                    onClick={(e) => {
                      setId(user.id);
                      setActive(index);
                    }}
                  >
                    <div className="user__image">
                      <img
                        src={`https://avatars.dicebear.com/api/open-peeps/${user.gender}-${user.name}.svg`}
                        alt={user.name}
                        className="img--fluid"
                      />
                    </div>
                    <div className="user__information">
                      <h5 className="user__name">{user.name}</h5>
                      <p className="user__latest-message">
                        {" "}
                        {user.id % 2 === 0
                          ? `Incomming: ${user.id}`
                          : `Outgoing: ${user.id}`}
                      </p>
                    </div>
                  </div>
                </li>
              )}
            </>
          );
        })
      ) : (
        <p className="text-danter">No User Found</p>
      )}
    </ul>
  );
};

export default Users;
