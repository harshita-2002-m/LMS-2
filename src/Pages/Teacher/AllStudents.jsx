function AllStudents() {
    return (
      <div className="formcontainer videoQuizContainer">
        <form id="contentForm" action="#" method="POST">
          <h1>Content</h1>
          <div className="form-group">
            <label htmlFor="fk_syllabus">Syllabus:</label>
            <select name="fk_syllabus"></select>
          </div>
          <div className="form-group">
            <label htmlFor="contentTitle">Content Title:</label>
            <input type="text" id="contentTitle" size="65" name="contentTitle" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" size="65" name="description" required />
          </div>
          <div className="form-group">
            <label htmlFor="fk_instructor">Instructor:</label>
            <select name="fk_instructor"></select>
          </div>
          <div className="form-group">
            <label htmlFor="uploadDate">Upload Date:</label>
            <input type="date" id="uploadDate" size="65" name="uploadDate" required />
          </div>
          <div className="form-group">
            <label htmlFor="content_url">Content Url:</label>
            <input type="text" id="content_url" size="65" name="content_url" required />
          </div>
          <div className="form-group">
            <label htmlFor="video">Video:</label><br />
            <input type="file" id="video" name="video" required />
          </div>
          <div className="form-group">
            {/* Change type to "submit" */}
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
 
  export default AllStudents;
