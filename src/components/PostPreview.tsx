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

export class PostPreviewData {
    ID: number;
    CommunityID: string;
    Counts:  Count;
    Name: string;
    Body: string;
    Published: string;
    URL: string;

    constructor(source: any = {}, counts: Count) {
        this.CommunityID = source["community_id"]
        this.Counts = counts
        this.ID = source["id"];
        this.Name = source["name"];
        this.Body = source["body"];
        this.URL = source["url"];
        this.Published = source["published"].slice(0,10);
    }
}

export function PostPreview(props: any) {
  let p = new PostPreviewData(props.post, new Count(props.counts))
  const [post, setPost] = useState(p);

  return (
       <Card sx={{ width:"75%",margin:"1em auto", maxWidth:"50rem"}}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" variant="square" sx={{ width: "80px", height: "80px", overflowY:"hidden" }}>
              <img src={post.URL} alt=""></img>
              </Avatar>
            }
            title={post.Name}
            subheader={
             <span>
               <span style={{color: "#1976d2", fontWeight:"600", fontStyle:"italic"}} className="header-section">Fediverse</span>
               <span className="header-section">On</span>
               <span style={{color: "#1976d2", fontWeight:"400"}} className="header-section">{post.Published}</span>
             </span>
            }
          />
      <CardMedia
        component="img"
        image={post.URL}
        style={ {height: "30em"}}
        alt=""
        onError={i => i.currentTarget.setAttribute("style", "display:none")}
      />
        <CardContent style={{overflowWrap: 'break-word', width: '90%'}}>
            <ReactMarkdown>{post.Body}</ReactMarkdown>
        </CardContent>
        <CardActions>
          <span>{post.Counts.Upvotes}</span>
          <span aria-label="add to favorites" color="primary">
            <ThumbsUpIcon color="primary"/>
          </span>
          
          <span className="icon-text">{post.Counts.Upvotes}</span>
          <span aria-label="" color="primary" >
            <ThumbsDownIcon color="secondary" className="icon"/>
          </span>

          <span className="icon-text">{post.Counts.Upvotes}</span>
          <span aria-label="" color="primary"  >
            <CommentIcon sx={{color: "#555555"}} className="icon"/>
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
