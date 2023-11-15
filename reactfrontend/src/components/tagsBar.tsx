import React from 'react';
import '../style/tagsBar.css';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ITagItem } from '../models';

interface TagsBarProps {
  tags: ITagItem[];
}

const TagsBar: React.FC<TagsBarProps> = ({ tags }) => {
  return (
        <div className='d-flex gap-2 justify-content-center py-5 mb-4'>
          {tags.map((tag) => (
            <span className="badge d-flex p-2 align-items-center text-bg-primary rounded-pill">
                <span className='px-1'>
                  {tag.name}
                </span>
              </span>
          ))}
        </div>
  );
};

export default TagsBar;