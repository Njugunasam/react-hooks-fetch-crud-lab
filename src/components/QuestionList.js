import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDelete, onUpdateCorrectIndex }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDelete}
            onUpdateCorrectIndex={onUpdateCorrectIndex}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
