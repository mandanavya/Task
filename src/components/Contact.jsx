// import React from 'react';

function Contact() {
  return (
    <section id="contact">
      <footer className="bg-gray-800 text-white py-16 mt-16">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-2">Contact Us</h3>
          <p className="text-lg">Feel free to reach out to us anytime.</p>
          <div className="mt-4">
            <p>Email: <a href="mailto:navya@gmail.com" className="text-blue-400">navya@gmail.com</a></p>
            <p>Phone: <a href="tel:+919876543121" className="text-blue-400">+91-9876543121</a></p>
          </div>
          <div className="mt-4">
            <p>&copy; 2025 Your Company Name. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Contact;
