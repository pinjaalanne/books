import useAxios from '../services/useAxios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import {
    Rating,
    Chip,
    Typography
} from '@mui/material';


function Book() {
    const params = useParams()
    let id = params.id;
    const booksUrl = 'http://localhost:3000';
    const { data, get } = useAxios(booksUrl);

    // TODO: Replace axios with useAxios hook

    useEffect(() => {
        if (data.length === 0) {
            getBooks();
        }
    }, []);

    function getBooks() {
        get(`books/${id}`)
    }

    return (
        <div>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                {data.name}
            </Typography>
            <img src={data.img}></img>
            <Typography variant="subtitle1" gutterBottom>
                {data.author}
            </Typography>
            {data.genres.map((genre, i) => (
                <Chip
                    key={i}
                    label={genre}
                    variant="outlined"
                    size="small"
                />
            ))}
            <p>{data.genres}</p>
            <Rating
                name="read-only"
                value={data.stars}
                readOnly
                size="small"
            />
        </div>);
}

export default Book;