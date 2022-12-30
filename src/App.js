import { useEffect, useState } from "react";
import produce from "immer";

function App() {
  const Notes = (props) =>
    props.data.map((note, index) => (
      <li>
        <div className="noteItems">
          {note.text}{" "}
          <button className="removebtn" onClick={() => handleRemove(index)}>
            <i className="fa fa-minus"></i>
          </button>
        </div>
      </li>
    ));

  const initialData = [{ text: "Loading Notes..." }];

  const [data, setData] = useState(initialData);

  const handleAdd = () => {
    const text = document.querySelector("#noteinput").value.trim();
    // console.log(text)
    if (text) {
      const nextState = produce(data, (draftState) => {
        draftState.push({ text });
      });
      document.querySelector("#noteinput").value = "";
      if (typeof window !== "undefined") {
        localStorage.setItem("data", JSON.stringify(nextState));
      }
      // console.log(nextState)
      setData(nextState);
    }
  };

  // const handleRemove = (index) => {
  //   // console.log(index);
  //   const removed = data.splice(index, 1);
  //   if (typeof window != 'undefined') {
  //     localStorage.setItem('data', JSON.stringify(data));
  //   }
  //   console.log(data);
  //   setData(data);
  // }

  const handleRemove = (index) => {
    const nextState = produce(data, (draftState) => {
      draftState.splice(index, 1);
    });
    document.querySelector("#noteinput").value = "";
    if (typeof window !== "undefined") {
      localStorage.setItem("data", JSON.stringify(nextState));
    }
    // console.log(nextState)
    setData(nextState);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getData = localStorage.getItem("data");
      if (getData !== "" && getData !== null) {
        return setData(JSON.parse(getData));
      }
      return setData([]);
    }
  }, []);

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
          <button className="addButton" onClick={handleAdd}>
            <i className="fa fa-plus"></i>
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
