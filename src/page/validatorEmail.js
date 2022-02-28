import React, { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../style/Auth.css'

export const ContactUs = () => {
    
  const navigate = useNavigate();
      useEffect(() => {
          if (localStorage.getItem("user-info")) {
              navigate("/home");
          }
      }, [])

  //Création d'un code unique
  const codeVerif = () => {
    var pass = ''
    var str = 'abcdefghijklmnopqrstuvwxyz123456789'
    
    for (var i= 1; i<= 6; i++) {
      var Code = Math.floor(Math.random()
          * str.length + 1)
          pass += str.charAt(Code)
    }
    pass = "w3g74bt"
    return pass
  }
  var messageCode = codeVerif()

  //Paramètre template de l'envoie du mail
   var templateParams = {
        user_name:'Monsieur',
        user_email: 'marty.bertrand@hotmail.com',
        message: messageCode
    }


  //fonction d'envoie de mail
  
  const sendEmail = (e) => {
    e.preventDefault();
    
   
    emailjs.send('service_b19gxbp', 'template_e28ji6m', templateParams/*form.current*/, 'a_PRejCiwYD6nlluS')
      .then((result) => {
          console.log(result.text);
          console.log(templateParams.message)
      }, (error) => {
          console.log(error.text);
      });
  };


  //fonction de vérification de code

  const [code, setCode] = useState('')
  const verifCode = (e) => {
      e.preventDefault();
    if (code === templateParams.message) {
        navigate("/home")
        console.log("Validate")
    } else {
        console.log("Code non valide")
        console.log(messageCode)
        return <p>Le code n'est pas valide</p>
        
    }
  }



  //formulaire

  return (
  <>
    <form /*ref={form}*/ className="formmm" onSubmit={sendEmail}>
      <label>Appuyer sur evoyer pour recevoir un code d'identification</label>
      <input type="submit" value="Envoyer" />
    </form>
    <form className="formmm" onSubmit={verifCode}>
        <label>Saisir le code reçu par mail :</label>
        <input type="text" name="check" onChange={event => setCode(event.target.value)}/>
        <input type="submit" value="Check" />
    </form>
    </>
    
  );
}