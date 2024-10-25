import { Box, IconButton, Typography } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useBuyItem from '../../hooks/useBuyItem';

const styles = {

    checkIcon: {
        width: 600,
        height: 600,
    },

};

const CompletePayment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loading, buy } = useBuyItem();

    /*useEffect(() => {
        buyItem();
    }, []);*/

    const buyItem = async () => {
        const queryParams = new URLSearchParams(location.search);
        const session_id = queryParams.get('session_id');
        const order_id = queryParams.get('order_id');

        console.log({ session_id, order_id });
        await buy({ order_id, session_id });
    }

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
                }} />
            </Box>
            <IconButton iconStyle={styles.checkIcon}>
                <CheckCircleIcon sx={{
                    fontSize: "4rem",
                    color: "#00ff6e",
                    margin: 5
                }} />
            </IconButton>
            <Box m={1}>
                <Box display="flex" flexDirection="column">
                    <Typography style={{ fontSize: "4rem", fontFamily: "Montserrat" }}>
                        Payment Successful
                    </Typography>
                    <Typography>
                        Your order has been completed.
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="row" justifyContent="space-between" marginTop={5}>
                    <Typography display="flex" flexDirection="row" onClick={() => navigate("/home")} sx={{
                        textDecorationLine: "underline",
                        fontSize: "14px",
                        "&:hover": {
                            cursor: "pointer",
                            color: "#005eff"
                        },
                    }} variant='h6'>
                        Return back to home
                        <Box>
                            <ArrowOutwardIcon />
                        </Box>
                    </Typography>
                    <Typography display="flex" flexDirection="row" onClick={() => navigate("/marketplace")} sx={{
                        fontSize: "14px",
                        textDecorationLine: "underline",
                        "&:hover": {
                            cursor: "pointer",

                            color: "#005eff"
                        },
                    }} variant='h6'
                    >
                        Return back to marketplace
                        <Box>
                            <ArrowOutwardIcon />
                        </Box>
                    </Typography>
                </Box>

                <button onClick={buyItem} disabled={loading}>Confirm</button>
            </Box>
        </Box>
    )
}

export default CompletePayment
