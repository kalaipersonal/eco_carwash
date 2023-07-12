import React, { Component } from "react";
import Slider from "react-slick";
import "./styles/Sliderafter.scss";
class Sliderafter extends Component {
  render() {
    const settings = {
    
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <>
        <div className="slider_after">
          <Slider {...settings}>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIG96v2V4Mcw3eMFU_O033Nzoj_wwjvCPSgw&usqp=CAU"
                alt="No Image!!"
              />
            </div>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUH3H9Ykh51zN5OfWSU8R2BgPE95bl-rgBiA&usqp=CAU"
                alt="No Image!!"
              />
            </div>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lGyx3EQCXOmIBG_Vwy1K4PvxqPt08hcqQg&usqp=CAU"
                alt="No Image!!"
              />
            </div>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6xF6ndl6y1uq3FZeoilk-Gge3WMvCbjGpcA&usqp=CAU"
                alt="No Image!!"
              />
            </div>
          </Slider>
        </div>
      </>
    );
  }
}

export default Sliderafter;
