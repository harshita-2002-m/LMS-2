import React, { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://danville.pythonanywhere.com/api";

const Faq = () => {
  const [faqs, setFAQs] = useState([]);

  useEffect(() => {
    // Fetch FAQs from the backend API endpoint
    axios
      .get(baseUrl + "/faq/")
      .then((response) => {
        console.log(response.data);
        setFAQs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }, []);

  const [expandedId, setExpandedId] = useState(null);

  const toggleAnswer = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="faq-section">
      <div className="faq-heading">
        <h2>Frequently Asked Questions (FAQs)</h2>
      </div>

      <div className="faq-cards">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`faq-card ${expandedId === faq.id ? "expanded" : ""}`}
          >
            <div className="question" onClick={() => toggleAnswer(faq.id)}>
              <strong>{faq.questions}</strong>
            </div>
            {expandedId === faq.id && (
              <div className="answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Faq;
