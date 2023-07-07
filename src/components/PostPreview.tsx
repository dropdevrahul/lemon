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
import './post.css'
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
        this.Published = source["published"];
    }
}

export function PostPreview(props: any) {
  let p = new PostPreviewData(props.post, new Count(props.counts))
  const [post, setPost] = useState(p);

  return (
   <Grid container>
     <Grid xs={12} >
       <Card sx={{ width:"75%",margin:"1em auto", }}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" variant="square" sx={{ width: "80px", height: "80px", overflowY:"hidden" }}>
              <img src={post.URL}></img>
              </Avatar>
            }
            title={post.Name}
            subheader={post.Published}
          />
        <CardContent style={{overflowWrap: 'break-word', width: '90%'}}>
            <ReactMarkdown>{post.Body}</ReactMarkdown>
        </CardContent>
        <CardActions>
            {post.Counts.Upvotes}
          <IconButton aria-label="add to favorites" color="primary">
            <ThumbsUpIcon />
          </IconButton>
            {post.Counts.Downvotes}
          <IconButton aria-label="add to favorites" color="secondary">
            <ThumbsDownIcon />
          </IconButton>
            {post.Counts.Comments}
          <IconButton aria-label="add to favorites">
            <CommentIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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
     </Grid>
   </Grid>
  );
}
