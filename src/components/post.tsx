import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography';
import './post.css'
import { red } from '@mui/material/colors';

export class PostC {
    ID: string;
    Name: string;
    Body: string;

    constructor(source: any = {}) {
        this.ID = source["id"];
        this.Name = source["name"];
        this.Body = source["body"];
    }
}

export function Post(props: any) {
  const [post, setPost] = useState(new PostC(props.post));

  return (
   <Card sx={{ width:"80%",margin:"1em auto", }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={post.Name}
        subheader="September 14, 2016"
      />
      <CardContent style={{overflowWrap: 'break-word', width: '90%'}}>
          <ReactMarkdown>{post.Body}</ReactMarkdown>
      </CardContent>
      {/*
      <CardActions disableSpacing>
        <--IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton-->
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
        */}
    </Card>
  );
}
