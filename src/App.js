import { FormControl, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TaskItem from "./TaskItem";


const App = () => {
  // 1.記述
  const [data, setData] = useState([{ id: "", title: "", contents: "" }]);

  // 記述登録1
  const [inputValue, setInputValue] = useState("");
  const [inputContents, setInputContents] = useState("");

  // 記述登録２
  const handleInputChange = (e) => {
    console.log(e, "event");
    //(e.target.value)にアクセスするとフォームに入力された値を取得できる
    setInputValue(e.target.value); //inputValueに値を書き込む（更新）
  };

  const handleInputchangeContents = (e) => {
    setInputContents(e.target.value);
  };


    // 記述登録3
    const addInputData = () => {
      db.collection("group").add({ title: inputValue,contents:inputContents});
      setInputValue("");
      setInputContents("");
    };





  // 2.記述
  useEffect(() => {
    const firebaseData = db.collection("group")
    .orderBy("title", "asc").onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((dbData) => ({
          id: dbData.id,
          title: dbData.data().title,
          contents: dbData.data().contents,
        }))
      );
    });
    return () => firebaseData();
  }, []); //←ここに最後一つ書きたします
  // // ここに記述,useStateで作ったdata変数をコンソールログで表示
  // console.log(data);
  return (
    <div>
      <h1>受診予約</h1>
      {/* 登録の処理 */}
      <FormControl>
        {/* inputタグ */}
        <TextField
          label="患者名"
          value={inputValue}
          onChange={handleInputChange}
        />
        <TextField
          label="来院内容"
          value={inputContents}
          onChange={handleInputchangeContents}
        />
      </FormControl>
      {/* dataっていう変数のなかに全てのデータが入っているのでmapを使って展開 */}
     {/* 登録の処理ボタン */}
     <button disabled={!inputValue || !inputContents}onClick={addInputData}>
        <AddCircleIcon/>
      </button>

      {data.map((data) => (
        
         <TaskItem id ={data.id} title={data.title} contents={data.contents} />
      ))}
    </div>
  );
};
export default App;