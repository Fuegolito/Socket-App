import "../styles/HomePage.css";
import ContactBox from "../components/ContactBox";
import Tab from "../components/Tab";

const HomePage = () => {
  return (
    <div className="main-container">
      <ContactBox />
      <Tab/>
    </div>
  );
};

export default HomePage;
