import React, { useState } from "react";
function NewCourse() {
    const [val, setVal] = useState("");
    const data = ["Ananya", "Neeloy", "Debraj", "Priyanka", "Bhupendra"];
    return (
        <div class="formcontainer">
            <form id="courseForm" action="#" method="POST">
                <h1>New Course</h1>
                <div class="form-group">
                    <label for="courseName">Course Name:</label>
                    <input type="text" id="courseName" name="courseName" required />
                </div>
                <div class="form-group">
                    <label htmlFor="instructor">Instructor:</label>
                    <select value={val} onChange={(e) => setVal(e.target.value)}>
                        <option value="">Select an Instructor</option>
                        {data.map((opt) => (
                            <option>{opt}</option>
                        ))}
                    </select>
                </div>
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <div class="form-group">
                    <label for="startDate">Start Date:</label>
                    <input type="date" id="startDate" name="startDate" required />
                </div>
                <div class="form-group">
                    <label for="endDate">End Date:</label>
                    <input type="date" id="endDate" name="endDate" required />
                </div>
                <div class="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
export default NewCourse;

