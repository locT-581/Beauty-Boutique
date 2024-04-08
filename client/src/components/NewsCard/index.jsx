import React from 'react'
import ImgCardDemo from "../../img/card1.jpg"

const NewsCard = () => {
  return (
    <div className="w-[100%] max-h-80 bg-white grid grid-rows-5 grid-flow-rows drop-shadow-lg content-fit hover:scale-110 transition-transform duration-300 cursor-pointer">
        <div className="bg-cover row-span-3 flex overflow-hidden">
            <img src={ImgCardDemo} alt="" className='object-cover w-full'/>
        </div>
        <div className="row-span-2">
        <h3 className=" font-fontItalianno text-[32px] text-center">Hoa cúc</h3>
        <h3 className=" font-cabin text-[20px] text-center px-8">Hãy để shop hoa tươi tư vấn các bạn cách chọn hoa tươi mừng [...]</h3>
        </div>
    </div>
  )
}

export default NewsCard
