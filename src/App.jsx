import { useState } from "react";
import "./App.css";
import { OpenAIApi } from "openai";
import { configuration } from "./config/openai";
import Spinner from "./Spinner";

function App() {
  const openai = new OpenAIApi(configuration);
  const [promptImage, setPromptImage] = useState("");
  const [promptText, setPromptText] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [page, setPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async () => {
    setIsLoading(true);
    setImage("");
    const { data } = await openai.createImage({
      prompt: promptImage,
      n: 1,
      size: "1024x1024",
    });
    setImage(data.data[0].url);
    setIsLoading(false);
    setPromptImage("");
  };
  const generateText = async () => {
    setIsLoading(true);
    setText("");
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: promptText,
      temperature: 0,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.2,
      presence_penalty: 0.0,
    });
    setText(data.choices[0].text);
    setIsLoading(false);
    setPromptText("");
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {page === "image" && (
            <div className="App">
              <button
                type="button"
                style={{ position: "absolute", left: 20, top: 20 }}
                onClick={() => setPage(null)}
              >
                &larr; Back
              </button>
              <h1>Generate An Image Using Open AI API</h1>
              <input
                type="text"
                className="app-input"
                placeholder="Type Something To Generate An Image"
                value={promptImage}
                onChange={(e) => setPromptImage(e.target.value)}
              />
              <button onClick={() => generateImage()}>Generate An Image</button>
              {image && <img src={image} alt="Loading..." />}
            </div>
          )}
          {page === "text" && (
            <div className="App">
              <button
                type="button"
                style={{ position: "absolute", left: 20, top: 20 }}
                onClick={() => setPage(null)}
              >
                &larr; Back
              </button>
              <h1>Generate Text Using Open AI API</h1>
              <input
                type="text"
                className="app-input"
                placeholder="Type Something To Generate Text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              />
              <button onClick={() => generateText()}>Generate Text</button>
              {text && <span style={{ margin: "1rem 0" }}>{text}</span>}
            </div>
          )}
        </>
      )}
      {!page && (
        <>
          <button onClick={() => setPage("image")}>Generate Image</button>
          <button onClick={() => setPage("text")} style={{ margin: "1rem" }}>
            Generate Text
          </button>
        </>
      )}
    </>
  );
}

export default App;
