import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

function Tags({names}) {

    return (<Box sx={{mb:2,
        display: 'flex',
        gap: 1
    }}>
    {names.map((name) => {
        return <Chip sx={{p: 2}} variant="outlined" label={name}/>;
    }
    )}    
    
    </Box>
    )
}

export default Tags;