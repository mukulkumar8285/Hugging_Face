import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useCallback } from "react";
import { useState } from "react";
function App() {
  const [inputValue, setInputValue] = useState("");
  const [OutPutValue, setOutputValue] = useState("");
  const API_KEY = "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";
  const ImageData = useCallback(() => {
    try {
      axios.post(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        inputValue,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,

/**************************************************************************
 headers is used to  pass the api key in header of request .
 Authorization : Bearer ${API_KEY}  this format is given by hugging face team for passing the api key .
 * ********************************************************************* */
          },
          responseType: "blob",

/***************************************************************************
Blob Is Used To Change A data  type From String to Binary Data In JavaScript
In This Case We Are Using It To Get The Image File Instead Of Text So That
We Can Display The Image On Our WebPage
****************************************************************************/
        }
      )
      .then((response)=>{

      
      console.log(response.data);
      const imageUrl = URL.createObjectURL(response.data);
      setOutputValue(imageUrl);
      console.log(imageUrl)
    })
     .catch ((error)=> {
      console.log("error", error);
    });
  }catch(error){
    console.log("error", error);
  } },[inputValue, API_KEY]);
  return (
    <div className="App">
      <input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <button onClick={ImageData}>Search</button>
      <div>
        {OutPutValue && <img src={OutPutValue} alt="Generated Images" />}
      </div>
    </div>
  );
}

export default App;
