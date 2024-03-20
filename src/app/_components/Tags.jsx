"use client";
import { Chip } from "primereact/chip";
import { WithContext as ReactTags } from "react-tag-input";
import { mPlus1 } from "@/app/_config/themeFontConfig";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function Tags({
  readonly = false,
  tags,
  suggestions,
  handleAddition,
  handleDelete,
  handleInputBlur,
  max = 3,
}) {
  if (readonly) {
    return (
      <div className="shrink flex items-center gap-2 flex-wrap overflow-visible">
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => {
            return (
              <Chip
                key={index}
                label={`${tag}`}
                className={
                  mPlus1.className + " text-sm whitespace-nowrap bg-pink-200"
                }
              />
            );
          })}
      </div>
    );
  }

  return (
    <div className="shrink flex items-center gap-2 flex-wrap overflow-visible">
      <ReactTags
        tags={tags}
        maxLength={15}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={() => {}}
        handleTagClick={() => {}}
        handleInputChange={(str, e) => {
          if (str.length > 0 && str[0] != "#") {
            e.target.value = "#" + str;
          }
        }}
        handleInputBlur={handleInputBlur}
        inputFieldPosition="bottom"
        autocomplete
        placeholder="タグを追加"
        classNames={{
          tag: "selectedClass",
          tagInputField: "tagInputFieldClass",
          remove: "removeClass",
          suggestions: "suggestionsClass",
          activeSuggestion: "activeSuggestionClass",
        }}
      />
    </div>
  );
}
