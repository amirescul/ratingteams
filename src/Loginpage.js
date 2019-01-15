import React, { Component } from 'react';
import './Loginpage.css';
import {firebase} from './firebase/firebase';
import App from './App';
import Login from './Login';
import Signup from "./Signup";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1
    
  },
  signupbar: {
    marginLeft:"90%",
  },
  loginbar: {
    marginLeft:"85%",
    
  },
  appbarforlogin: {
    
  }
};

class Loginpage extends Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }
  

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if (user) {
      
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
      //  localStorage.removeItem('user');
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Loginpage">
      <div className={classes.root}>
      <AppBar position="static" className={classes.appbarforlogin}>
        <Toolbar >
          <Button href="/signup" color="inherit" className={classes.signupbar}> Signup</Button>
        </Toolbar>
      </AppBar>
      </div>
        <Login history={this.props.history} />
      </div>
    );
  }
}

export default withStyles(styles)(Loginpage);

