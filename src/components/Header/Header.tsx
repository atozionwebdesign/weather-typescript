import "./Header.css";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/helpers";
import { updateLocation } from "../../redux/actions";
import {
  Button,
  Container,
  InputGroup,
  Navbar,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import "react-select-search/style.css";

import { store } from "../../store";
/**APIs */
import { getGeoInfo } from "../../apis/getGeoInfo";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<any[]>([]);

  const getOptions = (input: string) => {
    if (input.length > 1) {
      if (!parseInt(input.charAt(0))) {
        mapOptions(input);
      } else if (input.length >= 5) {
        mapOptions(input);
      }
    }
  };

  const mapOptions = (query: any) => {
    const promise = Promise.resolve(getGeoInfo(query));
    promise.then((values: any) => {
      // console.log(values);
      const x: any = [];
      values.map((value: any) =>
        x.push({
          value: value,
          label: value.display_name,
        })
      );
      setOptions(x);
      return x;
    });
  };

  const queryLatLong = (latLon: { lat: string; lon: string }) => {
    dispatch(updateLocation(latLon));
    // console.log(store.getState());
  };

  const handleChange = (selectedOption: any) => {
    console.log(selectedOption);
    if (selectedOption) {
      const selected = {
        lat: selectedOption.value.lat,
        lon: selectedOption.value.lon,
      };
      queryLatLong(selected);
    }
  };

  return (
    <div id="headerDiv">
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
      <div className="content">
        <Row className="navbar">
          <Col style={{ textAlign: "left" }}>
            <img
              src={require("../../assets/images/rainbow.svg").default}
              alt=""
              id="navIcon"
            />{" "}
            <p
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                marginBottom: 0,
              }}
            >
              <span>
                <strong>RAINBOW FORECAST</strong>
              </span>
              <span className="p-small" style={{ display: "block" }}>
                You Can't Have A Rainbow Without A Little Rain
              </span>
            </p>
          </Col>
          {/* <Col></Col> */}
          <Col style={{ textAlign: "right" }}>
            <span style={{ color: "var(--blue)" }}>US | &#176;F </span>
            {/* <FontAwesomeIcon
              icon={faUser}
              style={{ color: "var(--blue)" }}
            /> */}
          </Col>
        </Row>
      </div>
      <Row id="headerImgDiv">
        <img
          id="headerImg"
          src={require("../../assets/images/weather.svg").default}
          alt=""
        />
      </Row>
      <Row
        className=""
        style={{
          backgroundColor: "var(--pink)",
          // borderTop:"1px solid var(--yellow)",
          // borderBottom:"1px solid var(--yellow)",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <Select
          id="querySelect"
          className="search-input"
          placeholder="Search City, State or Zip Code"
          onInputChange={getOptions}
          options={options}
          isClearable
          onChange={handleChange}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: "transparent",
              backgroundColor: "var(--light-gray)",
              boxShadow: "none",
              borderRadius: "25px",
              ":hover": {
                borderColor: "var(--blue)",
              },
            }),
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--blue)",
            }),
            singleValue: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--blue)",
            }),
            input: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--blue)",
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--blue)",
              backgroundColor: "var(--light-gray)",
              border: "1px solid var(--blue)",
              fontSize: "14px",
            }),
            menuList: (baseStyles, state) => ({
              ...baseStyles,
              "::-webkit-scrollbar": {
                width: "10px",
              },
              "::-webkit-scrollbar-track": {
                backgroundColor: "var(--light-gray)",
                borderLeft: "1px solid var(--gray)",
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "var(--gray)",
              },
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isSelected
                ? "var(--blue)"
                : "var(--light-gray)",
              "&:hover": {
                backgroundColor: "var(--blue)",
                color: "var(--light-gray)",
              },
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              color: "var(--blue)",
              ":hover": {
                color: "var(--dark-gray)",
                cursor: "pointer",
              },
            }),
          }}
        />
      </Row>
    </div>
  );
};

export default Header;
