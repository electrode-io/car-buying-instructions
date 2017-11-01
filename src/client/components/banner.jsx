import React from "react";
import PropTypes from "prop-types";

import "../styles/skeleton.css";
import "../styles/custom.css";
import CarBuyingStyles from "../styles/car-buying.css";

class Banner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${CarBuyingStyles["anim-banner"]} ${CarBuyingStyles[this.props.className]}`}>
        <div className={CarBuyingStyles.title}>
          <h2>{this.props.title}</h2>
        </div>
        <div className={`${CarBuyingStyles["anim-1"]} ${CarBuyingStyles.slide}`} />
        <div className={`${CarBuyingStyles["anim-2"]} ${CarBuyingStyles.slide3}`} />
        <div className={`${CarBuyingStyles["anim-3"]} ${CarBuyingStyles.slide2}`} />
      </div>
    );
  }
}

Banner.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string
};

export default Banner;
