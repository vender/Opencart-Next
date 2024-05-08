import Rating from '@mui/material/Rating';
import Image from "next/image";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FaPhotoVideo } from "react-icons/fa";
import { useState } from 'react';

interface Review {
    "review_id": string;
    "author": string;
    "rating": string;
    "text": string;
    "upload_name": string;
    "filename": string;
    "file_type": string;
    "date_added": string;
    "code": string;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  width: 600,
  // height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #666',
  boxShadow: 24,
  p: 2,
};

function ReviewItem({review}:any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
      <div key={review.review_id} className='mb-3 pt-3'>
          <div className='flex justify-between'>
            <h4 className="text-gray-900 font-semibold">{review.author}</h4>
            {review?.filename && <Button onClick={handleOpen} className='w-6 h-10'><FaPhotoVideo className='w-full h-full'/></Button>}
          </div>
          <Rating name="read-only" value={Number(review.rating)} size="small" readOnly />
          <div className='italic'>{review.text}</div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
              <Box sx={style}>
                <div className='flex justify-center'>
                  {review.file_type?.split('/')[0] == 'image' ? 
                    <Image src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/system/storage/upload/${review.filename}`} alt={review.upload_name} width={500} height={500} /> :
                    <video width={400} height={300} controls autoPlay>
                      <source src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/system/storage/upload/${review.filename}`} type={review.file_type} />
                    </video>
                  }
                </div>
              </Box>
          </Modal>
      </div>
  )

}

export default function Reviewlist({prodReviews}:any) {

  return (
    <div className="divide-y divide-dashed divide-neutral-300">
      {prodReviews.map((review:Review) => {
          return <ReviewItem key={review.review_id} review={review} />
      })}
    </div>
  )
}
