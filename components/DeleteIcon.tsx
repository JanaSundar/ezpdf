import * as React from 'react';

function Delete(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 6l-.38 6.13c-.36-.09-.74-.13-1.12-.13-2.76 0-5 2.24-5 5 0 2.67 2.09 4.85 4.72 4.98-.05.02-.1.02-.16.02H6.44c-.53 0-.97-.41-1-.94L4.5 6h13z"
        fill="#F56565"
      />
      <path d="M4.5 6h13" stroke="#fff" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.5 3a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1h-5a1 1 0 01-1-1V3z" fill="#F56565" />
      <path fillRule="evenodd" clipRule="evenodd" d="M18.5 6h-15c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5h15c.28 0 .5.22.5.5v2c0 .28-.22.5-.5.5z" fill="#F56565" />
      <path d="M16 22a5 5 0 100-10 5 5 0 000 10z" fill="#F56565" />
      <path d="M16 22a5 5 0 100-10 5 5 0 000 10z" stroke="#fff" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.88 14.88l4.24 4.24M18.12 14.88l-4.24 4.24" stroke="#fff" strokeMiterlimit={10} strokeLinejoin="round" />
    </svg>
  );
}

export default Delete;
