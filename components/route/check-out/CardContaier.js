import React from 'react';
import { Card, CardHeader } from "@mui/material";

export default function CardContaier({title, children}) {
  return (
    <Card variant="text" py={5}>
      <h4 className="ps-checkout__heading mb-0 mt-1 pl-3">{title}</h4>
      {/* <CardHeader
        sx={{ background: "#000", color: "#fff", padding: '5px 10px' }}
        subheader={title}
      /> */}
        { children}
    </Card>
  );
}
