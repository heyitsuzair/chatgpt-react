import { useState } from "react";
import "./App.css";
import { OpenAIApi } from "openai";
import { configuration } from "./config/openai";
import Spinner from "./Spinner";

function App() {
  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    setIsLoading(true);
    setImage("");
    const { data } = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    setImage(data.data[0].url);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="App">
          <h1>Generate An Image Using Open AI API</h1>
          <input
            type="text"
            className="app-input"
            placeholder="Type Something To Generate An Image"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button onClick={() => generateImage()}>Generate An Image</button>
          {image && <img src={image} alt="Loading..." />}
        </div>
      )}
    </>
  );
}

export default App;
