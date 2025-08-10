import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingScreen({notice}) {
    return (
        <Box sx={{position: "fixed", inset: 0, display: "flex",
            flexDirection: "column", justifyContent: "center", alignItems: "center"
        }}
        >
            <Typography sx={{mb:3}} variant="h2">{notice}</Typography>
            <CircularProgress/>
        </Box>
    );
}

export default LoadingScreen;