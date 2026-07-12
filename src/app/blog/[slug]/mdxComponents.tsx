export const SuccessIcon = () => {
  return (
    <svg
      className="inline-block size-4.5 mb-0.5"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="#4CAF50"
    >
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill="#4CAF50"
        d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </svg>
  );
};

export const DuplicateIcon = () => {
  return (
    <svg
      className="inline-block size-4.5 mb-0.5"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="#FF9800"
    >
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill="#FF9800"
        d="M14 16h2v-3h3v-2h-3V8h-2v3h-3v2h3zm-8 4.5q-2.725-.95-4.362-3.287T0 12t1.638-5.212T6 3.5v2.2q-1.85.875-2.925 2.575T2 12t1.075 3.725T6 18.3zm9 .5q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T6 12t.713-3.512t1.925-2.85t2.85-1.925T15 3t3.513.713t2.85 1.924t1.925 2.85T24 12t-.712 3.513t-1.925 2.85t-2.85 1.925T15 21"
      />
    </svg>
  );
};

export const FailIcon = () => {
  return (
    <svg
      className="inline-block size-4.5 mb-0.5"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="#F44336"
    >
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path
        fill="#F44336"
        d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z"
      />
    </svg>
  );
};

export const MDX_COMPONENTS = { SuccessIcon, DuplicateIcon, FailIcon };
