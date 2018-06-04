import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <div className="home-left">
        <h1>PCBuilder</h1>
        <h2>Planning a computer build made easy. Driven by the community.</h2>
        <div>
          <img src="https://i.imgur.com/eVNdTY3.jpg" />
        </div>
      </div>
      <div className="home-right">
        <h2>A MERN Stack app by Hugo Cowan</h2>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/hugocowan"
        >
          Github
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/hugo-cowan-188359147"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};
export default Home;
