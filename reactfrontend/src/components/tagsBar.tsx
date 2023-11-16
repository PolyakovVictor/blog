import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../style/tagsBar.css';
import { ITagItem } from '../models';

interface TagsBarProps {
  tags: ITagItem[];
}

const TagsBar: React.FC<TagsBarProps> = ({ tags }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 5,
    arrows: true,
  };

  return (
    <div className='py-3 mb-4'>
      <div className='pl-10 pr-10'>
        <Slider {...settings}>
          {tags.map((tag, index) => (
            <div key={index} className='p-2'>
              <span className="badge d-flex p-2 align-items-center text-bg-secondary rounded-pill justify-content-center fs-5">
                <span className='px-1'>
                  {tag.name}
                </span>
              </span>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TagsBar;
