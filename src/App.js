import React from 'react';
import {
  withStyles
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MediaCard from "./comp/card";
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import './App.css';
import TextField from '@material-ui/core/TextField';
import database from "./firebase/firebase";
import InputBase from '@material-ui/core/InputBase';
import {
  fade
} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import {firebase} from './firebase/firebase';






const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    position: 'absolute',
    zIndex: 1,
    top: 30,
    right: 50,

  },
  content: {
    margin: "100px 0px 0px 0px",
    padding: "0px 20px"
  },
  appBar: {
    top: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paper: {
    position: 'absolute',
    width: "300px",
    height: "300px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: 'calc(50% - 150px)',
    left: 'calc(50% - 150px)',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },

  logoutbut:{
    marginLeft: "55%",
    fontSize: "15px",
    color: "white"
  },

  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },

});


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      open: false,
      isEdit: false,
      editIndex: -1,
      teams: [],
      filterTeams: [],
      name: '',
      project: '',
      user: localStorage.getItem('user')
    }
    this.logout = this.logout.bind(this)
    this.loadData = this.loadData.bind(this)
    this.showDetails = this.showDetails.bind(this);
    this.loadData();
    console.log(this.state, localStorage.getItem('user'));
  }

  logout() {
    firebase.auth().signOut();
    localStorage.setItem('auth', '');
    this.props.history.push('/loginpage')
  }
  loadData() {
    database.ref('teams').on('value', (snapshot) => {
      const teams = [];
      const userId =  localStorage.getItem('user');

      snapshot.forEach(function (item) {
        var itemVal = item.val();
        console.log(item)
        itemVal.key = item.key;
        if (itemVal.user ===  userId) {
          teams.push(itemVal);
        }
      });
      this.setState({
        teams: teams,
        filterTeams: teams
      });
    });
  }

  handleOpen = () => {
    this.setState({
      open: true,
      isEdit: false
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
      isEdit: false
    });
  };

  handleSave = () => {
    if (!this.state.isEdit) {
      var teams = this.state.teams;
      teams.push({
        name: this.state.name,
        project: this.state.project
      });

      database.ref('teams').push({
        name: this.state.name,
        project: this.state.project,
        user:  this.state.user
      }).then(() => {
        console.log('Data is saved!');
      }).catch((e) => {
        console.log('Failed.', e);
      });
      this.setState({
        open: false,
        name: '',
        project: '',
        teams: teams
      });
    } else {
      var teams = this.state.teams;
      teams[this.state.editIndex] = {
        name: this.state.name,
        project: this.state.project,
        user:  this.state.user
      };
      database.ref('teams/' + this.state.key).update({
        "name": this.state.name,
        "project": this.state.project

      });
      this.setState({
        open: false,
        name: '',
        project: '',
        teams: teams,
        editIndex: -1,
        isEdit: false
      });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  showDetails = (e, team, index) => {
    console.log('team', team, this.state)


    this.setState({
      name: team.name,
      editIndex: index,
      key: team.key,
      project: team.project,
      isEdit: true,
      open: true
    });

  };


  triggerDelete(team, index) {
    console.log(team);

    let teams = [...this.state.teams]
    teams.splice(index, 1);
    this.setState({
      teams: teams
    })


    database.ref('teams/' + team.key).remove(

    );
  }


  searchIdeas(query) {
    let filterTeams = this.state.teams.filter((team) => {
      return team.name.includes(query) || team.project.includes(query)
    });
    this.setState({
      filterTeams: filterTeams
    });
  }

  handleSearch(event) {
    this.searchIdeas(event.target.value)
  };


  componentDidMount() {
    const filterTeams = JSON.parse(localStorage.getItem('filterTeams')) || []
    this.setState({ filterTeams: filterTeams, teams: filterTeams})
  }

  render() {
    const {
      classes
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar className={styles.toolbar}>
            <Typography variant="h6" color="inherit">
              Hack to the Future
            </Typography>
            <div className={classes.root}>
              <Toolbar>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    onKeyUp={this.handleSearch.bind(this)}
                  />
                </div>
                
                <Button onClick={this.logout} className={classes.logoutbut} >Logout</Button>
                
              </Toolbar>
            </div>
            <Button variant="fab" color="secondary" aria-label="Add" onClick={this.handleOpen} className={classes.button} >
              <AddIcon />
            </Button>
          </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Grid container spacing={32}>
        {this.state.filterTeams.map((team,index) => 
        
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <MediaCard data={team}  clickFunction = {(e)=>{ this.showDetails(e,team, index)}} 
                                      deleteFunction = {(e)=>{ e.stopPropagation();e.preventDefault();this.triggerDelete(team, index); }}/>
            </Grid>
          )}
        </Grid>
      </div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}>
        <div  className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            {this.state.isEdit ? 'Editeaza Echipa' : 'Adauga Echipa'}
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Numele echipei si prezentarea idei.
          </Typography>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label="Nume Echipa"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"/>
            <TextField
              id="standard-multiline-flexible"
              label="Prezentarea idei"
              multiline
              rowsMax="4"
              value={this.state.project}
              onChange={this.handleChange('project')}
              className={classes.textField}
              margin="normal"/>
          </form>
          <Button className={classes.container} onClick={this.handleSave}>Salveaza</Button>
        </div>
      </Modal>
    </div>
    );
  }
}



export default withStyles(styles)(App);