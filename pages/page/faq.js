import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import commonService from "../../service/menu/commonService";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export default function Faq() {
  // state
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [faqs, setfaqs] = useState([]);

  // side effects

  useEffect(() => {
    commonService
      .getData("faq")
      .then((res) => {
        setfaqs(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container pt-5 mb-5 pb-5">
      <div className="pl-3">
        <Typography variant="h4" component="h1">
          FREQUENTLY ASKED QUESTIONS
        </Typography>
      </div>
      <hr />
      {faqs &&
        faqs.map((faq) => {
          return (
            <Accordion
              key={faq.id}
              expanded={expanded === "panel" + faq.id}
              onChange={handleChange("panel" + faq.id)}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id={"panel-header" + faq.id}
              >
                <Typography variant="h5" gutterBottom>
                  {faq.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div dangerouslySetInnerHTML={{ __html: faq.body }} />
              </AccordionDetails>
            </Accordion>
          );
        })}
      <div style={{ height: "500px" }}></div>
    </div>
  );
}
