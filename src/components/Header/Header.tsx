import "./Header.css";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/helpers";
import { updateLocation } from "../../redux/actions";
import { Button, Container, InputGroup, Navbar, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import "react-select-search/style.css";

import { store } from "../../store";
/**APIs */
import { getGeoInfo } from "../../apis/getGeoInfo";
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
      console.log(values);
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
    console.log(store.getState());
    dispatch(updateLocation(latLon));
    console.log(store.getState());
  };

  const handleChange = (selectedOption: any) => {
    console.log(selectedOption)
    if (selectedOption) {
      const selected = {
        lat: selectedOption.value.lat,
        lon: selectedOption.value.lon,
      };
      queryLatLong(selected);
    }
  };

  return (
    <>
    <Navbar className="navBar">
      <Container>
        <Navbar.Brand href="#home">A To Zion Web Design, LLC</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Select
            id="querySelect"
            className="search-input"
            placeholder="City, State or Zip Code"
            onInputChange={getOptions}
            options={options}
            isClearable
            onChange={handleChange}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: 'transparent',
                borderRadius: '25px',
                backgroundColor: 'rgba(165, 105, 86, 1)',

              }),
              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                color: 'rgba(267, 216,154,1)'
              }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,
                color: 'rgba(267, 216,154,1)'
              }),
              input: (baseStyles, state) => ({
                ...baseStyles,
                color: 'rgba(267, 216,154,1)',
                fontWeight: 'bold'
              }),
            }}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>

  );
};

export default Header;
