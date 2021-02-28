import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";

import "./styles/app.scss";

function App() {
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/:placeId" component={Restaurant} />
    </Router>
  );
}

export default App;
