import { memo } from 'react';
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="border-2 border-gray-200 
  shadow-md focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none
  px-3 py-3 text-md rounded-md
  h-14 mb-3 ml-1 "
    />
  );
};
export default memo(Input);
