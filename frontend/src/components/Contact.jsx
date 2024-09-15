const Contact = () => {
  return (
    <div className="contact-page-wrapper" id="contact-id">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <form action="">
        <div className="contact-form-container">
          <input type="text" placeholder="yourmail@gmail.com" />
          <input type="text" placeholder="write your question here" />
          <button className="secondary-button-contact">Submit</button>
        </div>
      </form>
      
    </div>
  );
};

export default Contact;