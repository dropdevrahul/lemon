import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbsUpIcon from '@mui/icons-material/ThumbUp';
import ThumbsDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography';
import './PostPreview.css'
import { red } from '@mui/material/colors';
import {ThumbDown, ThumbUp} from "@mui/icons-material";
import {Divider} from "@mui/material";

export class Count {
  ID: number;
  Comments: number;
  Upvotes: number;
  Downvotes: number;
  Score: number;

  constructor(source: any = {}) {
      this.Comments = source["comments"]
      this.ID = source["id"];
      this.Upvotes = source["upvotes"];
      this.Downvotes = source["downvotes"];
      this.Score = source["score"]
  }
}

export class Creator {
  ID: number;
  Avatar: string;
  Name: string

  constructor(source: any = {}) {
      this.ID = source["id"]
      this.Avatar = source["avatar"]
      this.Name = source["name"]
  }
}

export class Community {
  ID: number;
  Name: string;
  Banner: string;
  Icon: string;


  constructor(source: any = {}) {
      this.ID = source["id"]
      this.Name = source["name"];
      this.Icon = source["icon"];
      this.Banner = source["banner"];
  }
}

export class PostPreviewData {
    ID: number;
    Counts:  Count;
    Name: string;
    Body: string;
    Creator: Creator;
    Published: string;
    URL: string;
    Community: Community;

    constructor(source: any = {}, counts: Count, community: Community, creator: Creator) {
        this.Community = community
        this.Counts = counts
        this.ID = source["id"];
        this.Name = source["name"];
        this.Body = source["body"];
        this.URL = source["url"];
        this.Creator = creator;
        this.Published = source["published"].slice(0,10);
    }
}

export function PostPreview(props: any) {
  let p = new PostPreviewData(props.post, new Count(props.counts),
    new Community(props.community), new Creator(props.creator))
  const [post, setPost] = useState(p);

  return (
       <Card sx={{ width:"100%",margin:"1em auto", maxWidth:"60rem" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" variant="square" sx={{ width: "80px", height: "80px", overflowY:"hidden"}}
                src={post.URL}>
              </Avatar>
            }
            title={post.Name}
            subheader={
             <span>
               <span className="icon">
                <Avatar aria-label="recipe" variant="circular" className="icon"
                  sx={{ width: "20px", height: "20px", overflowY:"hidden", margin: "0px" }}
                  src={post.Creator.Avatar}
                  >
                </Avatar>
               </span>
               <span style={{color: "#1976d2", fontWeight:"600", fontStyle:"italic"}}
                 className="icon header-section">
                 {post.Creator.Name}
               </span>
               <span className="header-section">to</span>
               <span className="icon">
                <Avatar aria-label="recipe" variant="circular" className="icon"
                  sx={{ width: "20px", height: "20px", overflowY:"hidden", margin: "0px" }}
                  src={post.Community.Icon}
                  >
                </Avatar>
               </span>
               <span style={{color: "#1976d2", fontWeight:"600", fontStyle:"italic"}}
                 className="icon header-section">
                 {post.Community.Name}
               </span>
               <span className="header-section">on</span>
               <span style={{color: "#1976d2", fontWeight:"400"}} className="header-section">{post.Published}</span>
             </span>
            }
          />
        <CardMedia
          component="img"
          src={post.URL?post.URL:""}
          className="card-media"
          style={{height: "30em"}}
          alt=""
          onError={i => i.currentTarget.setAttribute("style", "display:none")}
        />
        <CardContent className={!post.Body?"hidden":"show"}
          style={{overflowWrap: 'break-word', width:'90%', paddingTop:"0px", paddingBottom:"0px"}}>
          <ReactMarkdown className="post-preview-body">{post.Body}</ReactMarkdown>
        </CardContent>
        <CardActions>
          <span>{post.Counts.Upvotes}</span>
          <span aria-label="add to favorites" color="primary">
            <ThumbsUpIcon color="primary"/>
          </span>
          
          <span className="icon-text">{post.Counts.Downvotes}</span>
          <span aria-label="" color="primary" >
            <ThumbsDownIcon color="secondary" className="icon"/>
          </span>

          <span className="icon-text">{post.Counts.Comments}</span>
          <span aria-label="" color="primary"  >
            <CommentIcon sx={{color: "#efefef"}} className="icon"/>
          </span>
          { /*
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
          */}
          </CardActions>
        </Card>
  );
}
