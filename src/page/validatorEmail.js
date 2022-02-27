import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom'

export const ContactUs = () => {
    
    const navigate = useNavigate();
        useEffect(() => {
            if (localStorage.getItem("user-info")) {
                navigate("/home");
            }
        }, [])
  /*const form = useRef();*/
  /*var randomstring = require("randomstring");
  const codeVerif = () => {
    let code = randomstring({
        charset: 'alphabetic',
        length: 6,
    })
    return code

  };*/
   var templateParams = {
        user_name:'jojo',
        user_email: 'marty.bertrand@hotmail.com',
        message: 'huitr'   
    }
  const sendEmail = (e) => {
    e.preventDefault();
    
   
    emailjs.send('service_b19gxbp', 'template_e28ji6m', templateParams/*form.current*/, 'a_PRejCiwYD6nlluS')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const [code, setCode] = useState('')
  const verifCode = (e) => {
      e.preventDefault();
    if (code === templateParams.message) {
        navigate("/home")
    } else {
        return <p>Le code n'est pas valide</p>
    }
  }

  return (
  <>
    <form /*ref={form}*/ onSubmit={sendEmail}>
      <label>Appuyer sur evoyer pour recevoir un code d'identification</label>
      <input type="submit" value="Envoyer" />
    </form>
    <form onSubmit={verifCode}>
        <label>Saisir le code reçu par mail :</label>
        <input type="text" name="check" onChange={event => setCode(event.target.value)}/>
        <input type="submit" value="Check" />
    </form>
    </>
    
  );
}