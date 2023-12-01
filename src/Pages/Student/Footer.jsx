function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top py-4 nav-bg font-m">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 footer-contact text-light">
              <h3>PURSUIT SOFTWARE</h3>
              <p>
                GREATER NYC
                <br />
                100 Overlook Center,
                <br />
                2nd. Floor Princeton,
                <br />
                New Jerser 08540, USA
                <br />
              </p>
            </div>
            <div className="col-lg-4 col-md-6 footer-links text-light">
              <h4>Learn More</h4>
              <ul className="list-unstyled mb-2">
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a
                    href="https://www.pursuitsoftware.com/"
                    target="_blank"
                    className="text-decoration-none text-light"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a
                    href="https://www.pursuitsoftware.com/about-us/"
                    target="_blank"
                    className="text-decoration-none text-light"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a
                    href="https://www.pursuitsoftware.com/contact-us/"
                    target="_blank"
                    className="text-decoration-none text-light"
                  >
                    Contact Us{" "}
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>{" "}
                  <a
                    href="Student/Faq"
                    className="text-decoration-none text-light"
                  >
                    FAQ{" "}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 footer-newsletter text-light">
              <h4>Connect With Us</h4>
              <div className="social-links text-center text-md-right pt-3 pt-md-0">
                <a href="#" className="instagram">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="bx bxl-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-md-flex text-color">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright">
            &copy;2022
            <strong>
              <span> Pursuit Software</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
 
export default Footer;
