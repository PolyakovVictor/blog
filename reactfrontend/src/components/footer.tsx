import '../style/footer.css';
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer: React.FC = () => {

  return (
    <footer className="text-body-secondary py-5">
        <div className="container">
            <p className="float-end mb-1">
            <a href="https://getbootstrap.com/docs/5.3/examples/album/#">Back to top</a>
            </p>
            <p className="mb-1">
              Your source for diverse, engaging content. Explore articles on lifestyle, travel, tech, and more. Stay informed, inspired, and join our community.
            </p>
            <p className="mb-0">
              New to Bootstrap? <a href="https://getbootstrap.com/">Visit the homepage</a> or read our <a href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">getting started guide</a>.
            </p>
        </div>
    </footer>
  );
};

export default Footer;