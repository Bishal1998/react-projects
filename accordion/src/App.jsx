import { useState } from "react";
import { dataItems } from "./data";

const App = () => {
  const [selected, setSelected] = useState("section1");

  const handleSelected = (id) => {
    setSelected(selected === id ? null : id);
  };
  return (
    <div>
      {dataItems.map((item) => (
        <div key={item.id}>
          <div onClick={() => handleSelected(item.id)}>{item.title}</div>
          {selected === item.id && <div>{item.content}</div>}
        </div>
      ))}
    </div>
  );
};

export default App;
