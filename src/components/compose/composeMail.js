import { useRef, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import './compose.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from "react-redux";
import axios from "axios";

const ComposeMail = () =>{
    const emailRef = useRef();
    const subjectRef = useRef();
    const editorRef = useRef();
    const SendersMail = useSelector((state) => state.auth.email);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
   
    const handleSubmit = async (e) => {
      e.preventDefault();
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const enteredEmail = emailRef.current.value;
      const enteredSubject = subjectRef.current.value;
     const emailBody =  rawContentState.blocks.map(block => block.text).join('\n');
      const recEmail = enteredEmail.replace(/[.@]/g, "");
  
      const senderEmail = SendersMail.replace(/[.@]/g, "");
  
    
      const currentDate = new Date();
      const sentDate = currentDate.toDateString();
      const sentTime = currentDate.toLocaleTimeString();
     
    
      // Add your logic to send the email
      console.log('Sending email:', {  body: emailBody, enteredEmail });
      try {
        await axios.post(
          `https://mail-box-clone-default-rtdb.firebaseio.com//mailbox/drafts/${recEmail}.json`,
          {
            to: enteredEmail,
            subject: enteredSubject,
            content: emailBody,
            from: SendersMail,
            date: sentDate,
            time: sentTime,
            
          }
        );
  
        await axios.post(
          `https://mail-box-clone-default-rtdb.firebaseio.com//mailbox/sent/${senderEmail}.json`,
          {
            to: enteredEmail,
            subject: enteredSubject,
            content: emailBody,
            from: SendersMail,
            date: sentDate,
            time: sentTime,
            read:true,
          }
        );
  
        emailRef.current.value = "";
        subjectRef.current.value = "";
        
      } catch (error) {
        console.error("Error in sending the mail", error);
      }
     
      setEditorState(EditorState.createEmpty());
    };
  
return(<>
<div className="form">
 <div className="col-md-5 p-3 border" >
 <Form onSubmit={handleSubmit}>
      
        <div className="to">To: <Form.Control
          type="email"
          placeholder="Enter recipient email"
          ref={emailRef}
          required
        />
      </div>

     
       
        <Form.Control
          type="text"
          placeholder="Enter subject"
          ref={subjectRef}
          required
        />
        <Form.Label>Body:</Form.Label>
        <Editor
        
          editorState={editorState}
         editorClassName="editorClassName"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
         ref={editorRef}
          onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
        />
     
      

      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
    </div>
    </div>
</>)    
}

export default ComposeMail;