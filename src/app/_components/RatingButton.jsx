"use client";
import { Rating } from "primereact/rating";

export default function RatingButton({
  readOnly = false,
  ratingValue = 0,
  onChange,
}) {
  if (readOnly) {
    return (
      <Rating
        value={ratingValue}
        stars={5}
        cancel={false}
        onIcon={<i className="pi pi-star-fill text-yellow-400 h-[10px]" />}
        offIcon={<i className="pi pi-star text-yellow-400 h-[10px]" />}
        className="mt-1"
        readOnly
      />
    );
  }
  return (
    <Rating
      value={ratingValue}
      onChange={onChange}
      stars={5}
      cancel={false}
      onIcon={<i className="pi pi-star-fill text-yellow-400 h-[10px]" />}
      offIcon={<i className="pi pi-star text-yellow-400 h-[10px]" />}
      className="mt-1"
    />
  );
}
