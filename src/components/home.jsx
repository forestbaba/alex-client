import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import Search from '../components/Search';
import Saved from '../components/Saved';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
export default class Home extends React.Component {

    constructor() {
        super()

        this.state = {
            saved: false,
            search: true,
            openSnack: false,
            snackMessage: '',
            severity: ''
        }
    }

    search = () => {
        this.setState({
            saved: false,
            search: true
        })
    }
    save = () => {
        this.setState({
            saved: true,
            search: false
        })
    }

    showSnack = (msg, snackSeverity) => {
        this.setState({
            openSnack: true,
            snackMessage: msg ? msg : 'Message not available',
            severity: snackSeverity ? snackSeverity : 'info'
        })
    }

    hideSnack = () => {
        this.setState({ openSnack: false })
    }

    render() {
        return (
            <>
                <Snackbar open={this.state.openSnack} autoHideDuration={4000} onClose={this.hideSnack}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={this.hideSnack} severity={this.state.severity}>
                        {this.state.snackMessage}
                    </Alert>
                </Snackbar>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">

                        </IconButton>
                        <Typography  variant="h6">
                            Google Books
                    </Typography>
                        <Button
                            color="inherit"
                            onClick={this.search}
                            style={{ marginLeft: '50px' }}
                            variant={this.state.search ? 'outlined' : ''}
                        >
                            Search
                        </Button>
                        <Button
                            color="inherit"
                            onClick={this.save}
                            style={{ marginLeft: '20px' }}
                            variant={this.state.saved ? 'outlined' : ''}
                        >
                            Saved
                        </Button>
                    </Toolbar>
                </AppBar>

                <Card style={{ textAlign: 'center' }}>
                    <h1>The Google Book Search by Brandon J Sellam</h1> 
                    <h5>Search books and save them.</h5>
                </Card>

                <div style={{ padding: '20px' }}>
                    {this.state.search === true ?
                        <Search snack={this.showSnack} /> : null}
                    {this.state.saved === true ?
                        <Saved snack={this.showSnack} />

                        : null}
                </div>
            </>
        )
    }
}
