import React from 'react';
import Search from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Axios from 'axios';

const LOCAL_URL = "https://baseline-cors.herokuapp.com/https://alex-serve.herokuapp.com"
// const LOCAL_URL = "http://localhost:5000"

export default class SearchComp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            items: []

        };
        this.search = this.search.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }


    handleKeyPress(event) {
        if (event.key === 'Enter')
            this.search();

    }

    search() {
        let query = this.state.query;
        const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=" + query;
        fetch(BASE_URL, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                let { items } = json;
                this.setState({
                    items: items
                })

            })
        console.log("clicked on search  button", this.state.query);
    }
    handleChange(event) {
        this.setState({
            query: event.target.value
        })
    }

    view = (link) => {
        window.open(link)
    }


    saveBook = (title, author, desc, img, link) => {
        let obj = {
            title: title,
            authors: author,
            description: desc,
            image: img.thumbnail,
            link: link
        }

        console.log(obj)
        Axios.post(`${LOCAL_URL}/api/books`, obj).then(
            res => {
                console.log(res)
                this.props.snack('Book saved successfully', 'success')
            },
            err => {
                console.log(err)
            }
        )
    }
    render() {
        return (
            <>
                <FormControl variant="outlined" style={{ marginTop: '30px', width: '100%' }}>
                    <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                    <OutlinedInput
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={this.search}
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>

                <div>
                    {this.state.items ?
                        this.state.items.map((item, i) => {
                            let { title, imageLinks, infoLink, authors, description } = item.volumeInfo
                            return (
                                <Card style={{ margin: '15px 0' }}>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid item xs={8}>
                                                <h3>{title}</h3>
                                                {authors ? <p>
                                                    Written By &ens;
                                                    {authors.map(name => {
                                                        return (
                                                            <span>{name},&ens;</span>
                                                        )
                                                    })}
                                                </p> : null}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="outlined"
                                                    style={{ float: 'right' }}
                                                    onClick={() => { this.view(infoLink) }}
                                                    color="secondary">
                                                    View
                                        </Button>
                                                <Button variant="outlined"
                                                    style={{ float: 'right', marginRight: '20px' }}
                                                    onClick={() => { this.saveBook(title, authors, description, imageLinks, infoLink) }}
                                                    color="secondary">
                                                    Save
                                        </Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <img
                                                    src={imageLinks !== undefined ? imageLinks.thumbnail : ''}
                                                    alt="book"
                                                    className="bookImage"
                                                />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <p style={{ marginTop: '0' }}>{description}</p>
                                            </Grid>

                                        </Grid>
                                    </CardContent>
                                </Card>

                            );
                        })
                        : null
                    }</div>
            </>
        )
    }
}
