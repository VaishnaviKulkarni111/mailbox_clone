import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
 import "./sentbox.css";

import { fetchSentEmailsSuccess, deleteSentEmail } from "../../store/sentSlice";

const SentEmail = () => {
  const Email = useSelector((state) => state.auth.email);
  const emails = useSelector((state) => state.sent.emails); // Update to use sent state ... array
  const myEmail = Email.replace(/[.@]/g, "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSentEmails = async () => {
      try {
        const response = await axios.get(
          `https://mail-box-clone-default-rtdb.firebaseio.com//mailbox/sent/${myEmail}.json`
        );
        if (response.status === 200) {
          const fetchedEmails = [];
          for (const key in response.data) {
            console.log('res data', response.data)
            fetchedEmails.push({
              id: key,
              ...response.data[key],
            });
          }
          dispatch(fetchSentEmailsSuccess(fetchedEmails)); 
        }
      } catch (error) {
        console.error("Error fetching emails: ", error);
      }
    };

    fetchSentEmails();
  }, []);

  const handleDelete = async (emailId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(
        `https://mail-box-clone-default-rtdb.firebaseio.com//mailbox/sent/${myEmail}.json`
      );
      dispatch(deleteSentEmail(emailId)); // Update to use deleteSentEmail from sentSlice
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const handleClick = (id) => {
    navigate(`/sentemails/${id}`);
  };

  return (
    <div className="main">
      <ul className="email-list">
        {emails.map((email) => (
          <li
            key={email.id}
            className="email-item"
            onClick={() => handleClick(email.id)}
          >
            <div className="email-header">
              <p className="sender-email">
                To: <strong>{email.to}</strong>
              </p>
              <p className="email-subject">
                <strong>{email.subject}</strong>
              </p>
            </div>
            <p className="email-content">{email.content}</p>

            <div className="delTime">
              <button
                className="delEmailBtn"
                onClick={(event) => handleDelete(email.id, event)}
              >
                Delete
              </button>

              <p className="email-time">{email.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentEmail;