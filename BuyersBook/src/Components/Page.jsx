import Card from '@mui/material/Card';
import { Blurhash } from "react-blurhash";
import { useState, forwardRef} from 'react';

import ImageModal from './ImageModal.jsx';
import {motion, AnimatePresence} from 'framer-motion';

const MCard = motion(Card);
const Page =  forwardRef(({hash, src}, ref) => {
    const [loaded, setLoaded] = useState(false); 
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <AnimatePresence>
        <MCard sx={{display: "flex", flexDirection: "column", mb: 2, width: "100%", flexShrink: 0,
            scrollSnapAlign: "center"
        }}
        initial={{opacity:0}}
        onTap={()=>{setModalVisible(true)}}
        whileInView={{opacity: 1}}
        exit={{opacity: 0}}
        ref={ref}
        >


            {!loaded && <Blurhash
                style={{flex: 1, minHeight: 0, width: "100%"}}
                hash={hash}
                width={400}
                height={300}
                punch={1}
                draggable={false}
            />}

            <img style={{display: loaded ? 'block': 'none',
                flex: 1, minHeight: 0, pointerEvents: "none",
                objectFit: "cover"
            }}
                draggable={false}
                src={src}
                objectFit={"fill"}
                onLoad={()=>setLoaded(true)}
            />
        </MCard>
        {modalVisible && <ImageModal src={src} closeCallback={()=>{setModalVisible(false);}}/>}

        </AnimatePresence>

    );

});

export default Page;