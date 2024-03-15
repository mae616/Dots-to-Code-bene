import { Rating } from 'primereact/rating';

export default function RatingButton({ratingValue = 0}) {
  return (
    <Rating value={ratingValue} stars={5} cancel={false}
      onIcon={<i className="pi pi-star-fill text-yellow-400 h-[10px]" />}
      offIcon={<i className="pi pi-star text-yellow-400 h-[10px]" />}
      className='mt-1'
    />
  );
};

