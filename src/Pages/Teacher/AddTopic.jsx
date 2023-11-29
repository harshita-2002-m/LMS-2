import React, { useState } from "react";

function AddTopic() {
  const [val, setVal] = useState("");

  return (
    <div class="formcontainer videoQuizContainer">
      <form id="courseForm" action="#" method="POST">
        <h1>New Topic</h1>

        <div class="form-group">
          <label for="courseName">Topic Name</label>

          <input
            type="text"
            id="courseName"
            size="65"
            name="courseName"
            required
          />
        </div>

        <div class="form-group">
          <label for="endDate">Topic Description</label>

          <input type="text" id="endDate" name="endDate" required />
        </div>

        <div class="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddTopic;
