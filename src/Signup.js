import React, { Component } from 'react';
import {firebase} from './firebase/firebase';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Loginpage from "./Loginpage";
import {Link} from "react-router"


const styles = theme => ({
  card: {
    width: "600px",
    height : "700px"
    
  },
 
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  
  container: {
    display: 'block',
    flexWrap: 'wrap',
    
  },
  
  margin:{
    margin: theme.spacing.unit, 
  },

  theform:{
    marginTop: "2%",
    marginLeft: "2%"

    
  },
  title:{
    fontSize : '1.5em',
    marginBlockStart: "0.3em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontWeight: 'bold',
   
  },

  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover"
  },
  button1: {
    float: "right"
  },
  pass:{
    paddingRight : "46px"
  },
  uss:{
    paddingRight: "20px"
  }
});


class Signup extends Component {
  
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  

  signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{console.log(u);
      this.props.history.push('/')
    })
    .catch((error) => {
        alert(error);

      })
    
      

    }

  render() {
    const {
      classes
    } = this.props;
    return (
      
      
      <div className="col-md-6" >
      
      <form className={classes.theform}>
      

      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
        <Card className={classes.card}>
          
            <CardContent>
              
              <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                Signup Page
              </Typography>
              
              <Typography component="p" className={classes.textFields}>
                <form className={classes.container} noValidate autoComplete="off">

                <div class="form-group">
                  
                 
                  <TextField
                    value={this.state.email}
                    onChange={this.handleChange}
                    type="Email"
                    id="exampleInputEmail1"
                    label="Email"
                    name="email"
                    margin="normal"
                    style= {{width: "100%"}}
                  />
                
                </div>
                
                <div class="form-group">
                  
                  <TextField
                    value={this.state.password}
                    onChange={this.handleChange}
                    type="password"
                    id="exampleInputPassword1"
                    style={{ marginTop: "10px", width : "100%"}}
                    label="Password"
                    margin="normal"
                    name="password"
                    
                  />
                </div>

               
                </form>
              </Typography>
            </CardContent>
          
          <CardActions className={classes.button1}>
            
            <Button
              variant="contained" 
              size="small" 
              color="primary"           
              onClick={this.signup}
              className={classes.margin}
              style={{ marginLeft: "10px" }}
            > Submit
            </Button>
            
          </CardActions>
        </Card>
        </Grid>
      </Grid>
      
      </form>
    
    </div>
    
    );
    
  }
}


export default withStyles(styles)(Signup);