'use client';

import { memo, useCallback, useRef, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Star } from 'lucide-react';

function VideoTestimonialSlider({ data }: any) {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePlay = useCallback((index: number) => {
    setActiveVideo(index);
    swiperRef.current?.autoplay?.stop();
  }, []);

  const handlePause = useCallback(() => {
    setActiveVideo(null);
    swiperRef.current?.autoplay?.start();
  }, []);

  return (
    <Swiper
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      modules={[Navigation, Pagination, Autoplay]}
      navigation={false}
      pagination={{ clickable: true }}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      spaceBetween={30}
      slidesPerView={1} // default (mobile)
      breakpoints={{
        768: {
          slidesPerView: 2, // md and up
        },
      }}
    >
      <div className="flex flex-col md:flex-row items-center  overflow-hidden bg-primary-light">
        {data?.map((testimonial: any, i: number) => (
          <SwiperSlide key={i}>
            {/* <div className="w-full md:w-1/2 flex justify-center">
              <video controls poster={testimonial?.thumbnail?.url} className={`w-full md:w-auto h-64 md:h-96 object-cover transition-transform duration-300 ${activeVideo === i ? 'scale-110 z-50 relative' : ''}`} onPlay={() => handlePlay(i)} onPause={handlePause}>
                <source src={testimonial?.video?.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div> */}

            <div className="w-full  p-6 flex flex-col justify-center">
              <div className="bg-primary-light relative z-40 text-gray-900 p-10 rounded-xl rounded-bl-none shadow-md">
                <div className="flex gap-2 justify-center w-full py-4">
                  <img src="/svgs/star.svg" />
                  <img src="/svgs/star.svg" />
                  <img src="/svgs/star.svg" />
                  <img src="/svgs/star.svg" />
                  <img src="/svgs/star.svg" />
                </div>
                <p className="mb-3 text-xl italic">"{testimonial?.text}"</p>
                <p className="font-bold text-black text-lg">{testimonial?.name}</p>
                <p className="text-lg text-primary-900">{testimonial?.designation}</p>
                <div className="absolute top-24 -left-2 z-10 w-4 h-4 bg-primary-light rotate-45 -translate-y-2" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
}

export default memo(VideoTestimonialSlider);
