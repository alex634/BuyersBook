import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Select from '@mui/material/Select';
import Search from './Search.jsx';


function Pagesel({books, cursor, setCursor, pages}) {

    function changePage(event) {
        if (event.target === undefined) {
            var newPage = event;
        } else { 
            var newPage = parseInt(event.target.value);
        }

        const maxPages = books.find((book) => {
            if (book.book_name === cursor.name) {
                return true;
            }

            return false;
        }).pages;

        if (newPage < 1) {
            setCursor({name: cursor.name, page: 1});
        } else if (newPage > maxPages) {
            setCursor({name: cursor.name, page: maxPages});
        } else {
            setCursor({name: cursor.name, page: newPage});
        }
 
    }

    function changeBook(event) {
        const newBook = event.target.value;

        setCursor({name: newBook, page: 1});
    }


    return (<Box sx={{display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between'
    }}>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: "10px"}}>
        <Select label="books" value={cursor.name} onChange={changeBook}>
            {books.map((book) => {
                return (
                    <MenuItem value={book.book_name}>{book.book_name}</MenuItem>
                );
            })} 
        </Select>
        <TextField label="Page Number" 
            type="number"
            value={cursor.page}
            onChange={changePage}/>
        
        <IconButton onClick={() => {changePage(cursor.page - 1)} }>
            <ArrowBackIosNewIcon/>
        </IconButton>

        <IconButton onClick={()=>{changePage(cursor.page + 1)}}>
            <ArrowForwardIosIcon/>
        </IconButton>
        </Box>

        <Search pages={pages} setCursor={setCursor}/>
    </Box>);
}

export default Pagesel;