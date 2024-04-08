import "./../../../assets/style.css";
import ContactUsFooter from "./ContactUsFooter";
import FooterForm from "./FooterForm";
import SocialFooter from "./SocialFooter";

export default function Footer() {
  return (
    <footer>
      <SocialFooter />
      <ContactUsFooter />
      <FooterForm />
    </footer>
  );
}
