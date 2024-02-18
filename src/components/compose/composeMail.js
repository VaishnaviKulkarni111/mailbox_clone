import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import './compose.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const ComposeMail = () =>{
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your logic to send the email
      console.log('Sending email:', { to, subject, body });
      // Reset form fields after sending
      setTo('');
      setSubject('');
      setBody('');
    };
  
return(<>
 <div className="col-md-5 p-3 border" >
 <Form onSubmit={handleSubmit}>
      
        <div className="to">To: <Form.Control
          type="email"
          placeholder="Enter recipient email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>

     
       
        <Form.Control
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <Form.Label>Body:</Form.Label>
        <Editor
        
         // editorState={editorState}
         editorClassName="editorClassName"
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
         
         // onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
        />
     
      

      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
    </div>
</>)    
}

export default ComposeMail;