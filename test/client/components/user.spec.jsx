import React from "react";
import ReactDOM from "react-dom";
import User from "client/components/user";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "client/reducers";

describe("User", () => {
  let component;
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it("has expected content with deep render", () => {
    const initialState = {
      cars: [
        {
          vin_number: "1N4BU31DXVC105673",
          vehicle_type: "Sedan",
          vehicle_make: "Mercedes Benz",
          vehicle_model: "C300",
          vehicle_year: "2015",
          vehicle_color: "Grey",
          list_price: "29,866",
          actual_price: "28,985",
          mileage: "2,2000",
          img_name: "2015-mercedes-benz.jpg",
          status: true,
          createdAt: "2017-09-11 22:08:42",
          updatedAt: "2017-09-11 22:08:42",
          vehicle_location: "Pleasanton"
        }
      ]
    };

    const store = createStore(rootReducer, initialState);

    component = ReactDOM.render(
      <Provider store={store}>
        <User />
      </Provider>,
      container
    );

    expect(component).to.not.be.false;
  });
});
