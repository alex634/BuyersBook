import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import SearchModal from './SearchModal.jsx';

import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';



function Search({pages, setCursor}) {
    const [searchModalVisible, setSearchModalVisible] = useState(false); 

    return (
        <>
        <Button variant="outlined"
        startIcon={<SearchIcon />}
        onClick={()=>setSearchModalVisible(true)}
        >
        Search
        </Button>
        
        <AnimatePresence>
        {searchModalVisible && 
        <SearchModal pages={pages}
            closeCallback={()=>setSearchModalVisible(false)}
            setCursor={setCursor}
            />
        }
        </AnimatePresence>    
        </>
    );
}

export default Search;