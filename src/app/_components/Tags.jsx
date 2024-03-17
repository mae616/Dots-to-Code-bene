'use client';
import { useState } from 'react';
import { Chip } from 'primereact/chip';
import { WithContext as ReactTags } from 'react-tag-input';
import { M_PLUS_1 } from  "next/font/google";
const mPlus1 = M_PLUS_1({
  weight: "400",
  subsets: ["latin"],

});

const KeyCodes = {
    comma: 188,
    enter: 13
  };
  
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Tags({name, readonly = false}) {

    if(readonly) {
        return (
            <div className="shrink flex items-center gap-2 flex-wrap overflow-visible">
              <Chip label="#がんばりをほめたい" className={mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"} />
              <Chip label="#Comedy" className={mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"} />
              <Chip label="#Mystery" className={mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"} />
          </div>
        );
    }

    const [tags, setTags] = useState([]);

    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
      };
    
      const handleAddition = tag => {
        setTags([...tags, tag]);
      };
    
      const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
    
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
    
        // re-render
        setTags(newTags);
      };
    
      const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
      };


    const suggestions = [{
          id: "aaaa",
          text: "がんばりを褒めたい"
        },
        {
          id: "bbbbb",
          text: "がんがん行こうぜ"
        }];

    return (
        <div className="shrink flex items-center gap-2 flex-wrap overflow-visible">
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            autocomplete
            placeholder = "タグを追加"
            classNames={{
              tag: 'selectedClass',
              tagInputField: 'tagInputFieldClass',
              remove: 'removeClass',
              suggestions: 'suggestionsClass',
              activeSuggestion: 'activeSuggestionClass',
            }}
           />
      </div>
    );
};
