import "./Footer.css";
import { Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <div id="footerDiv">
      <Row style={{ height: "10px" }}>
        <Col style={{ backgroundColor: "var(--green)" }}></Col>
        <Col style={{ backgroundColor: "var(--yellow)" }}></Col>
        <Col style={{ backgroundColor: "var(--pink)" }}></Col>
        <Col style={{ backgroundColor: "var(--blue)" }}></Col>
        <Col style={{ backgroundColor: "var(--green)" }}></Col>
        <Col style={{ backgroundColor: "var(--yellow)" }}></Col>
        <Col style={{ backgroundColor: "var(--pink)" }}></Col>
        <Col style={{ backgroundColor: "var(--blue)" }}></Col>
        <Col style={{ backgroundColor: "var(--green)" }}></Col>
        <Col style={{ backgroundColor: "var(--yellow)" }}></Col>
        <Col style={{ backgroundColor: "var(--pink)" }}></Col>
        <Col style={{ backgroundColor: "var(--blue)" }}></Col>
      </Row>
      <Row id="footerContent">
        <Col style={{ textAlign: "left", }}>
          <a href="http://www.atozionwebdesign.com" style={{}}>
            <img
              src={require("../../assets/icons/general/logo50.png")}
              alt=""
              id="logo50"
            />

            <p style={{ margin: 0, display:'inline-block' }}>A To Zion Web Design, LLC</p>
          </a>
        </Col>
        <Col style={{ textAlign: "right"}}>
        <p className="p-small" style={{margin: "auto 0 0 0"}} >2024 A To Zion Web Design, LLC | All Rights Reserved</p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
