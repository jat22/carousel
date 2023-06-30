import React from "react";
import { render, fireEvent, getByAltText, getByTestId } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders successfully", function() {
  render(<Carousel />);
})

it("matches snapshot", function(){
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move back in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the last image to show, not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("removes arrows", function(){
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  expect(leftArrow).toHaveClass("Carousel-hide");
  expect(rightArrow).not.toHaveClass("Carousel-hide");

  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass("Carousel-hide");
  expect(rightArrow).not.toHaveClass("Carousel-hide");

  fireEvent.click(rightArrow);

  expect(leftArrow).not.toHaveClass("Carousel-hide");
  expect(rightArrow).toHaveClass("Carousel-hide");
})