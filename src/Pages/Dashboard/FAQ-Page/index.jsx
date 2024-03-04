import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQPage = () => {
  const faqData = [
    {
      question: "What is Korppi?",
      answer: "Korppi is a platform that...",
    },
    {
      question: "How to create an account?",
      answer: "To create an account, follow these steps...",
    },
    {
      question: "Is my data secure on Korppi?",
      answer: "Yes, we take data security seriously and implement...",
    },
    {
      question: "Can I reset my password?",
      answer:
        "Certainly! To reset your password, go to the login page and click on the 'Forgot Password' link...",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "If you need assistance, you can contact our customer support team by...",
    },
    {
      question: "Are there any subscription plans?",
      answer:
        "Yes, we offer different subscription plans to cater to the needs of our users. You can find more details in the 'Subscription' section of your account settings...",
    },
    // Add more FAQ items as needed
  ];

  return (
    <div className="pt-4">
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      {faqData.map((faq, index) => (
        <Accordion key={index} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}a-content`}
            id={`panel${index + 1}a-header`}
          >
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQPage;
