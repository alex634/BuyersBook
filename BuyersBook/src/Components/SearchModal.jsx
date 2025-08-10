import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';

import { useState, useEffect } from 'react';

import { motion } from "framer-motion";

const MBox = motion(Box);
const MCard = motion(Card);

function SearchModal({pages, closeCallback, setCursor}) {
    const [filteredPages, setFilteredPages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const filtered = pages.filter((page) => {
            const lowercaseQuery = searchQuery.toLowerCase();

            if (lowercaseQuery === "") return false;

            if (page.vendor_name.toLowerCase().includes(lowercaseQuery)) return true;
            if (page.item_type.includes(lowercaseQuery)) return true;

            for (const tag of page.tags) {
                if (tag.toLowerCase().includes(lowercaseQuery)) return true;``
            }
            
            return false;
        }
        );

        setFilteredPages(filtered);
    }
    , [searchQuery]);


    return (
        <MBox initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        sx={{position: "fixed", inset: 0, zIndex: 1000, bgcolor: "rgba(240,240,240,.8)",
            p: 4, backdropFilter: "blur(10px)", display: "flex", flexDirection: "column"
        }}>
            <Box sx={{mb:2}}>
            <Button
            startIcon={<CloseIcon/>}
            variant="outlined"
            onClick={()=>closeCallback()}
            >
            Close
            </Button>
            </Box>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
                mb: 4
            }}>
                <TextField sx={{width: "60%"}}
                placeholder="Search"
                value={searchQuery}
                onChange={(event)=> {
                    setSearchQuery(event.target.value);
                }}
                />
            </Box>
            
            <Box sx={{flex: 1, overflowY: "auto", p: 3, touchAction: "pan-y",
            }} className="hide-scrollbar">
            {
                filteredPages.map((page) => {
                    return (<MCard
                        onClick={()=>{
                            setCursor({name: page.book_name, page: page.page_number});
                            closeCallback();
                        }}
                        elevation={1}
                        initial={{opacity: 0, scale: .85}}
                        transition={{type: "spring", duration: .65}}
                        whileInView={{opacity: 1, scale: 1}}
                        sx={{mt: 2}} >
                        <CardHeader
                            title={`${page.book_name}`}
                            subheader={`page: ${page.page_number}`}
                        />
                        <CardContent>
                            {page.tags.map((tag) => {
                                return (<Chip sx={{mr: 1}}
                                    variant="outlined"
                                    onClick={(event)=>{
                                        setSearchQuery(tag);
                                        event.stopPropagation();
                                    }}
                                    label={tag}/>);
                            })}
                        </CardContent>
                    </MCard>);
                }
                )
            }
            </Box>

        </MBox>);
}

export default SearchModal;