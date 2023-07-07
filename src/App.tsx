import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import {PostPreviewData, PostPreview} from "./components/PostPreview";
import {Button} from "@mui/base";
import {P} from "@tauri-apps/api/event-41a9edf5";

function App() {
  let t: object[] = [];
  const [posts, setPosts] = useState(t);
  const siteMap = {"lemmy.world": "https://lemmy.world"}

  async function get_posts(e: any) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    let result = Object();
    result = await invoke("get_posts", {"baseUrl": e.target.value})
    let p:Array<object> = result["posts"] as Array<object>;
    setPosts(p)
  }

  return (
    <div>
      <Button onClick={get_posts} value="https://lemmy.world">Lemmy.world</Button>
      <Button onClick={get_posts} value="https://lemmy.ml">Lemmy.ml</Button>
      {
        posts.map((d:any, i) => <PostPreview key={i} 
          post={d["post"]} counts={d["counts"]}></PostPreview>)
      }
    </div>
  );
}

export default App;
