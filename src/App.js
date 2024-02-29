import UpiVerification from "./pages";
import Login from "./views/login";
import ClientDetails from "./clientDetails";
import Test from "./test";
import Admin from "./views/admin";
import Logo from "./asset/hdfcLogo.jpg"
function App() {
  return (
    <>
    <div className="position-fixed w-100">
      <div className="d-flex justify-content-center">
      <img className="" src={Logo}/>
      </div>
    </div>
      <Admin/>
    </>
  );
}

export default App;
