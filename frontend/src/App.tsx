import NavBar from "components/NavBar";
import Footer from "components/Footer";
import DataTable from "components/DataTable";

import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <DataTable />
      </div>
      <Footer />
    </>
  );
}

export default App;
