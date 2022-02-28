import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../style/Auth.css'
import axios from 'axios';
import emailjs from '@emailjs/browser';


class Login extends React.Component {

    constructor(props){
        super(props);
      
          this.state = {
            users: [],
            DataisLoaded: false
          };
      };

      // ComponentDidMount is used to
      // execute the code 
      componentDidMount() {
        fetch("http://localhost:3300/users")
          .then((res) => res.json())
          .then((json) => {
            this.setState({
              users: json,
              DataisLoaded: true
            });
        });
    };

    
    render () {


        const Test = () => {
            const [ username, setUserName ] = useState("");
            const [ password, setPassword ] = useState("");        
        
            const navigate = useNavigate();
            useEffect(() => {
                if (localStorage.getItem("user-info")) {
                    navigate("/home");
                }
            }, [])

            //creating IP state
            const [ip, setIP] = useState('');

            //creating function to load ip address from the API
            const getData = async () => {
                const res = await axios.get('https://geolocation-db.com/json/')
                /*console.log(res.data);*/
                setIP(res.data.IPv4)
            }
            
            useEffect( () => {
                //passing getData method to the lifecycle method
                getData()

            }, [])
        
            const { users } = this.state;
             var countLog = 0
             
            const handleSubmit = (e) => {
                e.preventDefault();
           

            users.map((user) => {
                if (countLog < 8) {
                    if(username === user.username) {
                        if(password === user.password){
                            if (ip === user.IpConnexion){
                                navigate("/home")
                                console.log("Connection success")
                                console.log(countLog)
                                countLog = 0
                            } else {
                                navigate("/email")
                                console.log("Connection inhabituel ! Veuillez vérifier l'authentification par mail.")
                                
                                
                            }
                        } else {
                            console.log("Password is not valid")
                            countLog = countLog + 1
                            console.log(countLog)
                        }
                    } else {
                        console.log("Username is not valid")
                        countLog = countLog + 1
                        console.log(countLog)
                    }
                } else {
                    navigate("/email")
                    countLog = 0
                }
            })
            /*axios
                .post('http://192.168.1.59:3300/users', userData)
                .then((response) => {
                    console.log(response.data);
                    navigate("/email")
                })
                .catch((error) => {
                    if (error.response) {
                      console.log(error.response);
                      console.log("server responded");
                    } else if (error.request) {
                      console.log("network error");
                    } else {
                      console.log(error);
                    }
                  });*/
        };       
        
        return (
            <form className="formmm" onSubmit={handleSubmit}>
                <h3>Authentification</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        /*value={data.username}*/
                        name="username"
                        type="text" 
                        onChange={(e) => setUserName(e.target.value)}
                        /*onChange={handleChange}*/
                        className="form-control" 
                        placeholder="Enter your Username"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        /*value={data.password}*/
                        name="password"
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        /*onChange={handleChange}*/
                        className="form-control" 
                        placeholder="Enter password" 
                    />
                </div>
                <button 
                    /*onClick={logiiin}*/
                    type="submit"
                    className="btn btn-primary btn-block">
                        Login
                </button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }
    return <Test/>
}
}

export default Login





/**const [ username, setUserName ] = useState("");
        const [ password, setPassword ] = useState(""); */



/**const logiiin = () => {
            axios.post('http://192.168.1.59:3300/users', {
                username: username,
                password: password,
            }).then((response) => {
                console.log(response);
                console.log(response.data);
               if (response.data.message) {
                console.log("erreur")
               } else {
                navigate("/email")
                console.log("Connection successfully")
               }
            })
            
        }
 */

        /*const [data, setData] = useState({
            username: "",
            password:  ""
        })*/

        /*const handleChange = (e) => {
            const value = e.target.value;
            setData({
                ...data,
                [e.target.name]: value
            });
        }*/