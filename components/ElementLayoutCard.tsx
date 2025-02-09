import { Layout, Element } from '@/types/types';
import React from 'react';

const ElementLayoutCard = ({
  item,

}: {
  item: Layout | Element;

}) => {
  return (
    <div

      className="flex items-center justify-center flex-col border border-dashed rounded-xl p-3 group hover:shadow-gray-700 hover:shadow-md hover:border-primary-100 cursor-pointer"
    >
      {
        <item.icon className="p-2 h-9 w-9 group-hover:bg-purple-100 rounded-full group-hover:text-primary-100 bg-slate-700" />
      }
      <h2 className="text-sm">{item.label}</h2>
    </div>
  );
};

export default ElementLayoutCard;
