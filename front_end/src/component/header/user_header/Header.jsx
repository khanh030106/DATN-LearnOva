import {useAuth} from "../../../hook/UseAuth.jsx";
import LoggedInHeader from "./LoggedInHeader.jsx";
import UnloggedInHeader from "./UnloggedInHeader.jsx";


const Header = () => {
  const {isAuthenticated, loading} = useAuth();
  if(loading){
      return null;
  }
  return (
      <>
            {isAuthenticated ? <LoggedInHeader /> : <UnloggedInHeader />}
      </>
  );
}

export default Header;