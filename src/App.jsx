import "./App.css";
import YouTubeForm from "./components/YouTubeForm";
import YoutubeFormWithYUP from "./components/YoutubeFormWithYUP";
import YoutubeFormWithMUI from "./components/YoutubeFormWithMUI";

function App() {
  return (
    <>
      <YouTubeForm />
      ///////////////////
      <YoutubeFormWithYUP />
      ////////////////////
      <YoutubeFormWithMUI />
    </>
  );
}

export default App;
