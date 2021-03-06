import React from 'react';
import Message from './Message';
import Chip from "@material-ui/core/Chip/Chip";
import Avatar from "@material-ui/core/Avatar/Avatar";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import ScrollbarSize from "@material-ui/core/es/Tabs/ScrollbarSize";
import {Scrollbars} from "react-custom-scrollbars";
import loginService from '../services/loginService'
import '../css/MessageList.css'

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'

    },
    listMessages: {
        marginLeft: 40,
        marginBottom: 205,
        marginTop: 23,

    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        //console.log("messages:"+props.messages)
        this.messagesEnd = React.createRef();
    }

    componentDidUpdate() {
        // There is a new message in the state, scroll to bottom of list
        // const objDiv = document.getElementById('messageList');
        // objDiv.scrollTop = objDiv.scrollHeight;
        this.scrollToEnd();
    }

    scrollToEnd(){
        this.messagesEnd.current.scrollIntoView({behavior: "smooth"});
    };

    render() {
        const {classes} = this.props;
        // Loop through all the messages in the state and create a Message component
        const {myUserId} = loginService.getCreds();
        console.log("myUserId:"+myUserId);
        const messages = this.props.messages.map((message, i) => {
            let fromMe = message.from == myUserId;
            return (
                <Message
                    key={i}
                    userInfo={this.props.userInfo}
                    username={"Placeholder"}
                    message={message.message}
                    messageInfo={message}
                    fromMe={fromMe} />
            );
        });

        return (
            <div className='listMessages' id='messageList'>
                { messages }
                <div style={{float: "none", clear: "both", }} ref={this.messagesEnd}/>
            </div>
        );
    }
}

//export default withStyles(styles)(MessageList);

export default MessageList