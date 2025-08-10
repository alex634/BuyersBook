import Box from '@mui/material/Box';

import Page from './Page.jsx';

import { useRef, useEffect } from 'react';



function Pages({pages, setCursor, cursor, comms}) {
    const boxDom = useRef(null);
    const pageDoms = useRef([]);

    useEffect(() => {
        if (pageDoms.current.length > 0 && boxDom.current !== null) {
            pageDoms.current[cursor.page - 1].scrollIntoView(); 
        }
    }
    ,[cursor]);

    function updateCursor() {
        const centerBox = boxDom.current.scrollLeft + (boxDom.current.offsetWidth / 2);
        for (let i = 0; i < pageDoms.current.length; i++) {
            const pageNode = pageDoms.current[i];
            const centerPage = pageNode.offsetLeft + (pageNode.offsetWidth / 2);

            if (Math.abs(centerPage - centerBox) < 20) {
                if (i + 1 === cursor.page) return;
                setCursor({name: cursor.name, page: i + 1});
                return;
            }
        }
    }

    return (<Box sx={{display: "flex", flex:1, flexDirection: "row",
        overflowX: "auto", scrollSnapType: "x mandatory", gap: "20px",
        touchAction: "pan-x" 
    }}
    className="hide-scrollbar"
    ref={boxDom}
    onScroll={updateCursor}
    >
        {pages.sort((a,b)=>{return a.page_number - b.page_number}).map((page, i) => {
            return (<Page 
                hash={page.blurhash}
                src={comms.get_Image_Url(page.file_name)}
                ref={(node)=>{pageDoms.current[i] = node;}}
            />);
        }
        )
        }
    </Box>);
}

export default Pages;