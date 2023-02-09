import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import {Badge} from "@mui/material";

export default function Owner(props) {
    return (
        <ListItem key={props.id}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon/>
                </Avatar>
            </ListItemAvatar>
            <p>{"NAME: " + props.name + " "} </p>
            <p>{"Address: " + props.st + " "} </p>
            <p>{props.state + " "} </p>
            <p>{props.zipcode + " "} </p>

            <Badge style={{"padding": "10%"}} color="secondary" overlap="circular" badgeContent=" " variant="dot">
                {props.status}
            </Badge>
        </ListItem>

    );
}