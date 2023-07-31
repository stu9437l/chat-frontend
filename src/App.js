import React, { useEffect, useState } from "react";
import Axios from "./axios";
import ChatHeader from "./component/chatHeader";
import Users from "./component/user";

const App = () => {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState();
  const [chat, setChat] = useState([]);
  const [message, setMessaege] = useState("");
  const [keypress, setKeyPress] = useState(false);

  const SearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // get id from child
  const [id, setId] = useState("");
  const getID = (data) => {
    setId(data);
  };

  // get user from id
  useEffect(() => {
    const abortController = new AbortController();
    const GetUserById = async () => {
      try {
        const response = await Axios.get(`users/${id}`, {
          signal: abortController.signal,
        });
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    GetUserById();
  }, [id]);

  const MessageChange = (e) => {
    setMessaege(e.target.value);
  };

  const HandleFocus = () => {
    setKeyPress(true);
  };
  const HandleBlur = () => {
    setKeyPress(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    chat.push(message);
    setMessaege("");
  };
  return (
    <>
      <section className="chatbox">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 border-end border-secondary border-1 p-0">
              <div className="chatbox__left">
                <h3 className="chatbox__heading">Chat</h3>
                <div className="input__wrapper">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    name="search"
                    onChange={SearchInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Search Messager"
                    value={searchInput}
                  />
                </div>
                <Users searchValue={searchInput} setId={getID} />
              </div>
            </div>
            <div className="col-9 p-0">
              {id ? (
                <div className="chatbox__right">
                  <ChatHeader
                    id={data.id}
                    name={data.name}
                    status={data.status}
                    gender={data.gender}
                    email={data.email}
                  />
                  <div className="chatbox__body">
                    {chat.map((message, index) => {
                      return (
                        <>
                          <div className="message mb-3"> {message}</div>
                        </>
                      );
                    })}
                    {keypress && (
                      <div class="chat-bubble">
                        <div class="typing">
                          <div class="dot"></div>
                          <div class="dot"></div>
                          <div class="dot"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="chatbox__footer">
                    <div className="imp-buttons">
                      <a href="" className="action-button">
                        <i className="fa-solid fa-circle-plus"></i>
                      </a>
                      <a href="" className="action-button">
                        <i className="fa-solid fa-photo-film"></i>
                      </a>
                      <a href="" className="action-button">
                        <i className="fa-solid fa-fire"></i>
                      </a>
                      <a href="" className="action-button">
                        <i className="fa-solid fa-gift"></i>
                      </a>
                    </div>
                    <div className="input__wrapper">
                      <form onSubmit={handleSubmit}>
                        <input
                          className="form-control ps-3"
                          type="text"
                          placeholder="Aa"
                          name="message"
                          onChange={MessageChange}
                          value={message}
                          onFocus={HandleFocus}
                          onBlur={HandleBlur}
                        />
                      </form>
                      <a href="" className="action-button me-0">
                        <i className="fa-solid fa-face-smile"></i>
                      </a>
                    </div>
                    <div className="imp-buttons">
                      <a href="" className="action-button me-0">
                        <i className="fa-solid fa-thumbs-up"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-100 h-100 overflow-hidden d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <img
                      style={{ width: "250px" }}
                      src="https://static.vecteezy.com/system/resources/previews/016/349/591/non_2x/ask-help-submit-question-faq-button-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
                      alt="no image"
                    />
                    <h5 className="text-center fw-bold">No Chat started </h5>
                    <p className="text-cneter">Click on user for start chat</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
