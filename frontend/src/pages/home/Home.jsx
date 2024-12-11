import Welcome from "../../components/Welcome";
import NavbarHome from "../../components/navbars/Navbar-home";
import Statistics from "../../components/Statistics";
import Functionality from "../../components/Functionality";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import "./Home.css"

const Home = () => {
  return (
    <div className="home">   
      <NavbarHome/>
      <Welcome/>
      <Statistics />
      <Functionality />
      <Contact/>
      <Footer />
    </div>
  );
}

export default Home;
