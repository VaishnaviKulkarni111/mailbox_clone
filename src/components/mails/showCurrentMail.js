
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { inboxActions } from "../../store/inboxSlice";
import { useNavigate } from "react-router-dom";
import './fullSentMail.css'

const ShowFullMail = () => {
  const Email = useSelector((state) => state.auth.email);
  const { id } = useParams();
  console.log(id)
  const [email, setEmail] = useState(null);
  const myEmail = Email.replace(/[.@]/g, "");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        await axios.patch(
          `https://mail-box-clone-default-rtdb.firebaseio.com//mailbox/drafts/${myEmail}/${id}.json`,
          { read: true }
        );
        const response = await axios.get(
          `https://mail-box-clone-default-rtdb.firebaseio.com//mailbox/drafts/${myEmail}/${id}.json`
        );
        if (response.status === 200) {
          setEmail(response.data);
        
          dispatch(inboxActions.markAsRead(id));
        } else {
          console.error("Failed to fetch email data:", response);
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, [dispatch, id, myEmail]);

  if (!email) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="main">
      <h3 className="Sender">From: {email.from}</h3>
      <h2 className="subject">{email.subject}</h2>
      <p className="content">{email.content}</p>
      <button className="backBtn" onClick={() => navigate("/inbox")}>
        Back
      </button>
    </div>
  );
};

export default ShowFullMail;
