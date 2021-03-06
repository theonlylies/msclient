import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import ListItem from "@material-ui/core/ListItem/ListItem";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {connect} from "react-redux";
import {tryLogin} from "../store/actions/loginActions";
import {setCurrentChat} from "../store/actions/chatActions";
import Badge from "@material-ui/core/Badge/Badge";

const styles = theme => ({
    fixWidth: {
        backgroundColor: '#17212b',
        width: '100% !important',
        margin: '0px !important',
        paddingLeft: 2,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottom: '1px solid #1f2c39',
    },
    white: {
        [theme.breakpoints.up('xs')]: {
            color: "white",
        },
    },
    selected: {
        backgroundColor: "rgba(255, 255, 255, 0.18)"
    },
    inverted: {
        filter: 'invert(100%)',
    },
    margin: {
        top: '39px!important',
        right: '17px!important',
    },
    fixPadding: {
        marginRight: 6,
        marginTop: 10,
        padding: 0,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 9,
    },
    contentPadding: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 9,
    },
});

class Dialog extends React.Component {

    getRandomColor = (letter) => {
        let col = this.colorMap[letter];
        if (col) return col;
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    colorMap = {
        "Р":"#2ab49b",
        "А":"#d15c17",
        "И":"#9e72cf"

    };

    handleDialogClick = () => {
        this.props.setCurrentChat(this.props.dialog.id, this.props.dialog);
    };

    formatDate = (timestamp) => {
        const now = new Date(Date.now());
        let date = new Date(timestamp);
        const today = now.toDateString() == date.toDateString();
        const  mins = date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
        if (today) {
            return date.getHours() + ":" + mins;
        } else {
            return date.getHours() + ":" +mins + " " + date.getDay() + "/" + date.getMonth() + "/" + (date.getFullYear() - 2000);
        }
    };

    render() {
        const {classes, dialog} = this.props;
        const selected = this.props.dialog.id === this.props.currentChat.userId;
        return (
            <ListItem selected={selected} onClick={this.handleDialogClick} disableGutters={true} button
                      style={{padding: 'unset'}}>
                <Grid container className={`${classes.fixWidth} ${selected ? classes.selected : ""}`} wrap="nowrap"
                      spacing={16}>
                    <Grid item md={16} style={{paddingRight: 1}}>
                        <Avatar style={{width: 50, height: 50, backgroundColor: `${this.getRandomColor(dialog.first_name[0])}`}}>
                            {dialog.first_name[0].toUpperCase()+dialog.last_name[0].toUpperCase()}
                        </Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth style={{paddingTop: 14}}>
                        <Typography variant="body2" color="inherit"
                                    className={classes.white}
                                    noWrap>{dialog.first_name + " " + dialog.last_name}</Typography>
                        <Typography variant="caption" color="inherit"
                                    className={classes.white}
                                    noWrap>{this.props.lastMsg ? this.props.lastMsg.message : "Нет сообщений"}</Typography>
                    </Grid>
                    <Grid item className={classes.fixPadding} style={{paddingLeft: 1, paddingTop: 15}}>
                        <Typography
                            variant="caption"
                            className={classes.white}
                            color="inherit">{this.props.lastMsg ? this.formatDate(this.props.lastMsg.timestamp_post.timestamp) : ""}</Typography>
                    </Grid>
                    {
                        this.props.unread ?
                            (
                                <div className={classes.margin}>
                                    <Badge color="primary" badgeContent={this.props.unread} className={classes.margin}>
                                    </Badge>
                                </div>
                            )
                            :
                            (
                                ""
                            )
                    }

                </Grid>
            </ListItem>

        );
    }
}


function mapStateToProps(state) {
    return {
        currentChat: state.currentChat
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentChat: (chatId, user) => {
        dispatch(setCurrentChat(chatId, user));
    }
});

const styledComponent = withStyles(styles, {withTheme: true})(Dialog);

export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);