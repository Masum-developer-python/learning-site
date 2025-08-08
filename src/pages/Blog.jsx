const Blog = ({ selectedColor }) => {
  return (
    <div
      className={`w-full border border-red-900 flex flex-col min-h-screen  px-4 py-8 space-y-10
    ${selectedColor.backgroundColor} ${selectedColor.textColor} 
    `}
    >
      <div>
        <img
          src="./src/assets/RAREbg.jpg"
          alt="RARe Academy Logo"
          className="mx-auto"
        />
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
