import React, { Component } from "react";

const finalColor = (number, hoverRating, rating) => {
  let color = "black";
  if (number > hoverRating && number <= rating) {
    color = "red";
  } else if (number <= hoverRating) {
    color = "blue";
  }

  return color;
};

const Star = ({
  number,
  handleRatingsChange,
  handleHoverChange,
  rating,
  hoverRating
}) => {
  const color = finalColor(number, hoverRating, rating);

  return (
    <span
      className="star"
      onClick={() => handleRatingsChange(number)}
      onMouseOver={() => handleHoverChange(number)}
      onMouseOut={() => handleHoverChange(0)}
      style={{ color }}
    >
      *
    </span>
  );
};

class RatingWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      hoverRating: 0
    };

    this.handleRatingsChange = this.handleRatingsChange.bind(this);
    this.handleHoverChange = this.handleHoverChange.bind(this);
  }

  handleRatingsChange(rating) {
    this.setState({ rating, hoverRating: 0 });
  }

  handleHoverChange(hoverRating) {
    this.setState({ hoverRating });
  }

  render() {
    const { rating, hoverRating } = this.state;
    const stars = Array(5)
      .fill()
      .map((item, index) => (
        <Star
          number={index + 1}
          handleRatingsChange={this.handleRatingsChange}
          handleHoverChange={this.handleHoverChange}
          rating={rating}
          hoverRating={hoverRating}
        />
      ));

    return (
      <div className="App">
        {stars}
        {rating === 0 ? <p>Please rate</p> : <p>{rating} / 5</p>}
      </div>
    );
  }
}

export default RatingWidget;
