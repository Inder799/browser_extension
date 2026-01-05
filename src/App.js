import "./App.css";
import { images } from "./db/images";
import { useBrowser } from "./context/browser-context";
import { Home, Task } from "./pages/index.js";
import { useEffect } from "react";

const index = Math.floor(Math.random() * images.length);
const bgImage = images[index].image;

function App() {
  const { name, browserDispatch } = useBrowser();

  useEffect(() => {
    const userName = localStorage.getItem("name");
    browserDispatch({
      type: "NAME",
      payload: userName,
    });
  }, []);
  return (
    <div className="app" style={{ backgroundImage: `url("${bgImage}")` }}>
      {/* if name ? <Task/> : <Home /> */}
      {name ? <Task /> : <Home />}
    </div>
  );
}

export default App;
