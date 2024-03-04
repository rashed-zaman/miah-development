import { Card } from "@mui/material"


export default function StyleFilterCard({ handleStyle, style, data }) {
    const { icon, category, slug, id } = data

    const sx = { 
            textAlign: 'center', 
            background: style.find(item => item == id) ? '#f4f4f4' : '#ffffff'
        }

    return (
        <Card sx={sx} variant="outlined" onClick={() => handleStyle(id)}>
            <img src={`https://images.miah.shop/banner/${icon}`} width='50%' alt="" className='mt-2' />
            <p className='my-1'>
                {category}
            </p>
        </Card>
    )
}
