import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:3000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/questions/${id}`, {
        method: "DELETE",
      });

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleCorrectIndexChange = async (id, newCorrectIndex) => {
    try {
      await fetch(`http://localhost:3000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      });

      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === id
            ? { ...question, correctIndex: newCorrectIndex }
            : question
        )
      );
    } catch (error) {
      console.error("Error updating correct index:", error);
    }
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm setQuestions={setQuestions} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDelete}
          onUpdateCorrectIndex={handleCorrectIndexChange}
        />
      )}
    </main>
  );
}

export default App;
