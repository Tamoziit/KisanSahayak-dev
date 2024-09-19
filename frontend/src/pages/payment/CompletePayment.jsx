import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const styles = {

    checkIcon: {
      width: 600,
      height: 600,
    },
  
  };

const CompletePayment = () => {
    const navigate = useNavigate();
    const totalPrice = useSelector((state) => state.productPrice);
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box width="100%" display="flex" flexDirection="row" bgcolor="#004cff" p={1}>
                <Typography sx={{
                    marginLeft: "47%",
                    fontSize: "18px",
                    marginRight: "0.5%",
                    color: "white"
                }}>
                    $ {totalPrice}
                </Typography>
                <CheckCircleIcon sx={{
                    color: "white"
                }}/>
            </Box>
                <IconButton iconStyle = {styles.checkIcon}>
                    <CheckCircleIcon sx={{
                        fontSize: "4rem",
                        color: "#00ff6e",
                        margin: 5
                        }}/>
                </IconButton>
            <Box m={1}>
                <Box display="flex" flexDirection="column">
                    <Typography style={{fontSize: "3rem"}}>
                        Payment Successful
                    </Typography>
                    <Typography> 
                        Your order has been completed.
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={5}>
                    <Typography display="flex" flexDirection="row" onClick={() => navigate("/")} sx={{
                        textDecorationLine: "underline",
                        fontSize: "14px",
                        "&:hover": {
                            cursor: "pointer",
                            color: "#005eff"
                            },
                    }} variant='h6'>
                        Return back to home
                        <Box>
                            <ArrowOutwardIcon/>
                        </Box>
                    </Typography>
                    <Typography display="flex" flexDirection="row" sx={{
                        fontSize: "14px",
                        textDecorationLine: "underline",
                        "&:hover": {
                            cursor: "pointer",
                            
                            color: "#005eff"
                            },
                    }} variant='h6'>
                        Return back to marketplace
                        <Box>
                            <ArrowOutwardIcon/>
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CompletePayment
