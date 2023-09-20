import { signOut } from "firebase/auth";
import auth from '../firebase'
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        signOut(auth).then(() => {
          // Sign-out successful.
          navigate('/')
        }).catch((error) => {
          // An error happened.
        });
      };
    return (
        <button onClick={handleLogout} className='logout-btn'>Log out</button>
    );
  }
  export default Logout