import { useState, useEffect, SetStateAction } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import {PostPreviewData, PostPreview} from "./components/PostPreview";
import {Button} from "@mui/base";
import Grid from "@mui/material/Unstable_Grid2"
import {P} from "@tauri-apps/api/event-41a9edf5";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {Divider} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export class Community {
  ID: string
  Icon: string
  Name: string
  Title: string

  constructor(source: any){
    this.ID = source['id']
    this.Icon = source['icon']
    this.Name = source['name']
    this.Title = source['title']
  }
}

function App() {
  let t: object[] = [];
  let comm: Array<Community> = [];
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(t);
  const [comms, setComms] = useState(comm);
  const [activeComm, setComm] = useState(new Community({}));
  const [instanceURL, setInstanceURL] = useState("https://lemmy.world")
  const siteMap = {"lemmy.world": "https://lemmy.world"}

  async function increment_page_and_fetch(e: any) {
    setPage(page+1) 
    get_posts(activeComm.Name)
    window.scrollTo(0,0)
  }

  async function change_instance(e: any) {
    setInstanceURL(e.target.value)
    get_posts("")
  }

  async function get_posts(community_name: string) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    let result = Object();
    result = await invoke("get_posts",
      {"baseUrl": instanceURL, "page": page.toString(),
      "communityName": community_name})
    if (community_name == "") {
      setComm(new Community({}))
    }
    let p:Array<object> = result["posts"] as Array<object>;
    setPosts(p)
  }

  async function get_communities() {
    let result = Object();
    let c:Array<Community> = []
    result = await invoke("get_communities", {"baseUrl": instanceURL})
    result["communities"].map((t: any) => 
      c.push(new Community(t["community"]))
    )
    console.log(c)
    return setComms(c)
  }

  function open_comm(c: Community) {
    get_posts(c.Name) 
    setComm(c)
  }

  useEffect(() => {
    get_communities();
  }, [])

  useEffect(() => {
    get_posts("");
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Grid container>
      <Grid xs={12}>
      <Button onClick={() => get_posts("")} value="https://lemmy.world">Lemmy.world</Button>
      <Button onClick={() => get_posts("")} value="https://lemmy.ml">Lemmy.ml</Button>
      </Grid>
      <Grid xs={12} sm={3} xl={2}>
         <List dense={true} style={{width: "100%"}}>
            <ListItem>
              <Typography variant="h5">Communities / <span color="text.secondary">{activeComm.Name}</span></Typography>
            </ListItem>
              {
                comms.map( (d:any) => <ListItemButton key={d.ID}
                  onClick={()=> open_comm(d)}
                  >
                  <ListItemIcon>
                    <Avatar src={d.Icon}>
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText>{d.Name}</ListItemText>
                </ListItemButton>)
             }
          </List> 
      </Grid>
      <Grid xs={12} sm={9} xl={10}>
        <Grid xs={12}>
        {
          posts.map((d:any, i) => <PostPreview key={d["post"]["id"]} 
              post={d["post"]} counts={d["counts"]} community={d["community"]}
              creator={d["creator"]}></PostPreview>)
        }</Grid>

      </Grid>
      <Grid xs={8}>
        <Button onClick={increment_page_and_fetch} style={{ margin: "0px auto" }}>Prevs</Button>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
}

export default App;
