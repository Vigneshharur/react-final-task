export default function FooterForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="message-form">
      <h3>
        Fill out the form below and our expert will get in touch for free
        consulting!
      </h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Number" />
        <input type="text" placeholder="Email" />
        <textarea id="note" type="textarea" placeholder="Notes" />
        <button type="submit">SEND NOW</button>
      </form>
    </div>
  );
}
