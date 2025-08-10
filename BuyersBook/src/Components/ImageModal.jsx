import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

function ImageModal({src, closeCallback}) {

    return (<>
        <Box sx={{position: "fixed", 
        inset: 0,
        bgcolor: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"}}>
            <TransformWrapper>
                <TransformComponent 
                wrapperStyle={{
                    width: "100%",
                    height: "100%"
                }}
                contentStyle={{display: "flex", flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }}
                >
                    <img
                        style={{
                            minWidth: 0,
                            flex: 1,
                            objectFit: "contain"
                        }}
                        src={src}
                    />
                </TransformComponent>
            </TransformWrapper>
        </Box>

        <Box sx={{position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0)",
        zIndex: 2000,
        pointerEvents: "none"
        }}>
            <Button sx={{left: 15, top: 15, p: 2, pointerEvents: "auto"}}
                variant="contained"
                startIcon={<CloseIcon/>}
                onClick={() => closeCallback()}
                >

            Close
            </Button>
        
        </Box>
    </>);
}

export default ImageModal;