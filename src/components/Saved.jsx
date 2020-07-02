import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Axios from 'axios';

// const LOCAL_URL = "http://localhost:5000"
const LOCAL_URL = "https://baseline-cors.herokuapp.com/https://alex-serve.herokuapp.com"
export default class SaveComp extends React.Component {

    constructor() {
        super()
        this.state = {
            query: '',
            items: []

        };
    }

    componentDidMount() {
        this.getBooks()
    }


    getBooks() {

        Axios.get(`${LOCAL_URL}/api/books`).then(
            res => {
                console.log(res.data)
                this.setState({ items: res.data })
            },
            err => {
                console.log(err)
            }
        )
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
            },
            err => {
                console.log(err)
            }
        )
    }

    delete = (id) => {

        Axios.delete(`${LOCAL_URL}/api/books/${id}`).then(
            res => {
                console.log(res.data)
                this.props.snack('Book Deleted','error')
                this.getBooks()
            },
            err => {
                console.log(err)
            }
        )
    }

    render() {
        return (
            <>
                <div>
                    {this.state.items ?
                        this.state.items.map((item, i) => {
                            let { title, image, link, authors, description, _id } = item
                            return (
                                <Card style={{ margin: '15px 0' }}>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid item xs={8}>
                                                <h3>{title}</h3>
                                                {authors ? <p>
                                                    Written By &ensp;
                                                    {authors.map(name => {
                                                        return (
                                                            <span>{name},&ensp;</span>
                                                        )
                                                    })}
                                                </p> : null}
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button variant="outlined" style={{ float: 'right' }} onClick={() => { this.view(link) }}>
                                                    View
                                        </Button>
                                                <Button variant="outlined"
                                                    style={{ float: 'right', marginRight: '20px' }}
                                                    onClick={() => { this.delete(_id) }}>
                                                    Delete
                                        </Button>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <img
                                                    src={image !== undefined ? image : ''}
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