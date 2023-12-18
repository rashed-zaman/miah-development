import React from 'react'
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
export default function OrderQuery() {
    return (
        <>
            <div className='container pb-120'>
                <h4 className='pb-40'>NEED HELP?</h4>
                <Grid container spacing={2} sx={{ p: { xs: 2, sm: 0 } }}>
                    <Grid item xs={12} sm={6} >
                        <Link href='https://www.youtube.com/watch?v=_55VfFNjTQk&list=PLNgIaJfFnD4_8dgcdp0oX4giWTEQJuYLO&index=3' target="_blank">

                            <div className="qtsBorder">
                                <div className='p-20'>
                                    <h4>How To Order From MIAH?</h4>
                                    <span>Delivery</span>
                                </div>
                            </div>

                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Link href='https://www.youtube.com/watch?v=_CpmHneAQGA&list=PLNgIaJfFnD4_8dgcdp0oX4giWTEQJuYLO&index=1' target="_blank">

                            <div className="qtsBorder">
                                <div className='p-20'>
                                    <h4>How to create an account in MIAH?</h4>
                                    <span>Accounts</span>
                                </div>
                            </div>

                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Link href='https://www.youtube.com/watch?v=JhvasCLJQqs&list=PLNgIaJfFnD4_8dgcdp0oX4giWTEQJuYLO&index=4' target="_blank">

                            <div className="qtsBorder">
                                <div className='p-20'>
                                    <h4>How to recover your password?</h4>
                                    <span>Accounts</span>
                                </div>
                            </div>

                        </Link>

                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Link href='https://www.youtube.com/watch?v=P5Lx4wiAsfs&list=PLNgIaJfFnD4_8dgcdp0oX4giWTEQJuYLO&index=2' target="_blank">

                            <div className="qtsBorder">
                                <div className='p-20'>
                                    <h4>How to track your order?</h4>
                                    <span>Delivery</span>
                                </div>
                            </div>

                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
