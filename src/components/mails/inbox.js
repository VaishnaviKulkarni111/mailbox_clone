import "./inbox.css";
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../../store/inboxSlice";
import { useNavigate } from "react-router-dom";

const Inbox = () => {
  const Email = useSelector((state) => state.auth.email);
  const emails = useSelector((state) => state.inbox.emails);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  const myEmail = Email.replace(/[.@]/g, "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(
          `https://mail-box-clone-default-rtdb.firebaseio.com//mailbox/drafts/${myEmail}.json`
        );
        if (response.status === 200) {
          const fetchedEmails = [];
          for (const key in response.data) {
            fetchedEmails.push({
              id: key,
              ...response.data[key],
            });
          }
          dispatch(inboxActions.fetchEmailsSuccess(fetchedEmails));
        }
      } catch (error) {
        console.error("Error fetching emails: ", error);
      }
    };
    const fetchEmailsPeriodically = () => {
      fetchEmails();
      const intervalId = setInterval(fetchEmails, 2000);
      return () => clearInterval(intervalId);
    };

    if (isLoggedIn) {
      fetchEmailsPeriodically();
    }
  }, [dispatch, myEmail, isLoggedIn]);

  const handleDelete = async (emailId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(
        `https://mail-box-clone-default-rtdb.firebaseio.com//mailbox/drafts/${myEmail}/${emailId}.json`
      );
      dispatch(inboxActions.deleteEmail(emailId));
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  const handleClick = (id) => {
    navigate(`/inbox/${id}`);
  };

  const addDot = (email) => {
    if (email.read) {
      return <span className="dot white"></span>;
    } else {
      return <span className="dot blue"></span>;
    }
  };

  return (
    <div className="inbox">
      <ul className="inbox-list">
        {emails.map((email) => (
          <li
            key={email.id}
            className="email-item"
            onClick={() => handleClick(email.id)}
          >
            <div className="email-header">
              <p className="sender-email">
                {isLoggedIn && addDot(email)}
                From: <strong>{email.from} </strong>
                <strong>{email.subject}</strong>
              </p>
            </div>
            <p className="email-content">{email.content}</p>

            <div className="delTime">
              <p className="email-time">{email.time}</p>
              <button
                className="deleteBtn"
                onClick={(event) => handleDelete(email.id, event)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inbox;
