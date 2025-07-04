function Home() {
  return (
    <div className="body-container">
      <div className="form-group">
        <label htmlFor="secretCode">Enter Secret Code</label>
        <input type="text" id="secretCode" placeholder="e.g., 1234-ABCD" />
      </div>

      <div className="form-group">
        <label htmlFor="textMessage">Enter the Text Message Here</label>
        <textarea id="textMessage" placeholder="Type your message..."></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="fileUpload">Upload File</label>
        <input type="file" id="fileUpload" />
      </div>

      <div className="form-submit">
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}

export default Home;
