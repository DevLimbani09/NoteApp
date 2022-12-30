import { useEffect, useState } from "react";
import produce from "immer";

const Notes = (props) =>
  props.data.map((note) => (
    <li>
      <div className="noteItems">{note.text}</div>
    </li>
  ));

function App() {
  const initialData = [{ text: "Loading Notes..." }];

  const [data, setData] = useState(initialData);

  const handleClick = () => {
    const text = document.querySelector("#noteinput").value.trim();
    if (text) {
      const nextState = produce(data, (draftState) => {
        draftState.push({ text });
      });
      document.querySelector("#noteinput").value = "";
      if (typeof window !== "undefined") {
        localStorage.setItem("data", JSON.stringify(nextState));
      }
      setData(nextState);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getData = localStorage.getItem("data");
      if (getData !== "" && getData !== null) {
        return setData(JSON.parse(getData));
      }
      return setData([]);
    }
  }, 0);

  return (
    <>
      <h1 className="header">Notes.</h1>
      <div className="inputWrapper">
        <input
          className="inputField"
          id="noteinput"
          type="text"
          placeholder="•"
        />
        <div className="btnBg">
          <button className="addButton" onClick={handleClick}>
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="noteWrapper">
        <ul>
          <Notes data={data} />
        </ul>
      </div>
    </>
  );
}

export default App;
