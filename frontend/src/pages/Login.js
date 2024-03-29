import Header from "../components/Header";
import "./Login.css";

const Login = () => {

  const URL = "http://localhost:5000/api/login"

  const [donor, setDonor] = useState({
    identity:"", email:"", password:""
  });

  const navigate = useNavigate()

  let name, value
  const handleInputs = (e) => {
    name = e.target.name
    value = e.target.value
    setDonor({...donor,[name]:value });
  }

  const login = async(e) => {
    e.preventDefault()
    const {identity, email, password} = donor

    try {
      const response = await fetch(registerDonorURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({identity, email, password })
      });
      
      const responseData = await response.json();
      
      if(responseData.status == 201){
        alert(responseData.msg)
        navigate("/my-donations")
      }
      else{
        alert(responseData.msg)
      }
    } 
    catch (error) {
        console.error('Error sending data to the backend:', error);
    }
  }




  return (
    <div className="login">
      <Header />
      <div className="frame-parent1">
        <div className="logo-1-parent1">
          <img className="logo-1-icon4" alt="" src="/logo-1@2x.png" />
          <b className="log-in1">Log In</b>
        </div>
        <div className="who-are-you-parent">
          <b style={{ justifyContent:"right"}} name="identity" value = {donor.identity} onChange={handleInputs}className="who-are-you">Who are you? :</b>
          <b style={{ justifyContent:"right"}} name="email" value = {donor.email} onChange={handleInputs} className="who-are-you"> Email Id:</b>
          <b style={{ justifyContent:"right"}} name="password" value = {donor.password} onChange={handleInputs} cclassName="who-are-you">Password:</b>
        </div>
        <div className="frame-parent2">
          <select style={{border:"none"}} className="frame-child3" >
            <option value="ngo">NGO Service</option>
            <option value="hotel">Food Donor</option>
          </select>
          <input type="email" style={{border:"none"}} className="frame-child3" />
          <input type="password" style={{border:"none"}} className="frame-child3" />
        </div>
        <div className="log-in-container">
          <b className="log-in2">Log In</b>
        </div>
        <b className="dont-have-an">Don’t have an account? Signup</b>
        <div className="frame-child6" />
      </div>
    </div>
  );
};

export default Login;
