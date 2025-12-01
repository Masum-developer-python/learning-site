const Blog = ({ selectedColor }) => {
  return (
    <div
      className={`w-full flex flex-col min-h-screen  px-4 py-8 space-y-10
    ${selectedColor.backgroundColor} ${selectedColor.textColor} 
    `}
    >
      <div className="w-full bg-red-100">
        <img
          src="images/RAREbg.jpg"
          alt="RARe Academy Logo"
          className="mx-auto"
        />
        {/* <img
          src="images/leflet.jpg"
          alt="RARe Academy Logo"
          className="mx-auto p-4 transform rotate-90 translate-y-28 lg:translate-y-60 lg:w-[1935px]"
        /> */}
      </div>
      {/* <div className="w-[100%] mx-auto text-9xl max-w-2xl flex flex-row">
        <div className="w-2/3 text-9xl">
          <strong>RARE</strong>
        </div>
        <div className="w-1/3 text-8xl">
          <div className="inline-block">
            <strong>
              <u>Academy</u>
            </strong>
          </div>
          <div className="w-[100%] text-lg">“From Equations to Ennovation”</div>
        </div>
      </div> */}
    </div>
  );
};

export default Blog;
