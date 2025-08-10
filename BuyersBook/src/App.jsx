import Tags from './Components/Tags.jsx';
import Pagesel from './Components/Pagesel.jsx';
import Pages from './Components/Pages.jsx';
import LoadingScreen from './Components/LoadingScreen.jsx';

import Box from '@mui/material/Box';

import Communication from './Helpers/Communication.js';

import { useState, useEffect } from 'react';

import './Global.css';

function App() {
  const [comms, setComms] = useState(new Communication("http://localhost:5000"));

  const [cursor, setCursor] = useState(null);
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    comms.get_All_Books().then((bs)=>{
      setBooks(bs);
      setCursor({name: bs[0].book_name, page: 1});
    }).catch(()=>{return;});

    comms.get_All_Pages_All_Books().then((pgs)=> {
      setPages(pgs);
    }
    ).catch(()=>{return;});
  },[]);

  function decrement_Page() {
    console.log("Decrement");
    if (cursor.page <= 1) return;

    setCursor({name: cursor.name, page: cursor.page - 1});
  }

  function increment_Page() {
    console.log("Increment");
    const page_Count = books.find((book) => {return cursor.name === book.book_name;}).pages;

    if (cursor.page >= page_Count) return;

    setCursor({name: cursor.name, page: cursor.page + 1});
  }

  if (books.length == 0 || pages.length == 0) {
    return (<LoadingScreen notice={"Book data is being retrieved"}/>);
  } 

  const currentPage = pages.find((page) => {
      return page.page_number === cursor.page && page.book_name === cursor.name;
  });

  const currentPages = pages.filter((page)=> {
    return page.book_name === cursor.name;
  }
  );

  return (<Box sx={{display: "flex", position: "fixed",
    top: 0, bottom: 0, left: 0, right: 0,
    flexDirection: "column", minHeight: 0,
    userSelect: "none"}}>
    <Box sx={{p: 2, display: "flex", flex: 1, flexDirection: "column", minHeight: 0}}>
      <Tags names={[currentPage.vendor_name, currentPage.item_type, ...currentPage.tags]}/> 
      <Pages pages={currentPages} setCursor={setCursor} cursor={cursor} comms={comms}/>
      <Pagesel pages={pages} books={books} cursor={cursor} setCursor={setCursor}/>
    </Box>
  </Box>)
}

export default App
