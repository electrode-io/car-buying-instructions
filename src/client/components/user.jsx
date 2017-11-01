import React from "react";
import PropTypes from "prop-types";
import { browserHistory } from "react-router";
import { connect } from "react-redux";

import Car from "./car";
import Banner from "./banner";

import "../styles/skeleton.css";
import "../styles/custom.css";
import CarBuyingStyles from "../styles/car-buying.css";

/*
 * Demostrates a simple pure functional component
 */
class UserView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Banner className={"user-banner"} title={"User View"} />
        <button
          className={`${CarBuyingStyles.history}`}
          onClick={() => {
            browserHistory.push("/history");
          }}
        >
          History
        </button>
        <div className={`${CarBuyingStyles.userView} ${CarBuyingStyles["flex-container"]}`}>
          {/* Cars List Section */}
          <div className={`${CarBuyingStyles["cars-list"]} ${CarBuyingStyles["flex-item"]}`}>
            {this.props &&
              this.props.cars &&
              this.props.cars.map(v => <Car key={v.vin_number} data={v} />)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cars: state.cars
  };
};

UserView.propTypes = {
  cars: PropTypes.array
};

export default connect(mapStateToProps)(UserView);
