 ## LMS FORNTEND


 ### SETUP INSTRUCTION

1... git clone

    https://github.com/Rajusharma2003/Lms_frontend_project.git

2.. move into the directory

    cd LMS_FRONTEND  

3 .. install dependencies

    npm i

4 .. run the server

    npm run dev




### SETUP INSTRUCTION FOR TAILWIND

1 .. install tailwindcss 

npm install -D tailwindcss


2.. create tailwindcss config file 

npx tailwindcss init


3.. add file extensions to the config file 

  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],


4.. add the tailwind directives at the top of `index.css` file

    @tailwind base;
    @tailwind component;
    @tailwind utilities;



###   Adding plugins and dependencies

npm install @reduxjs/toolkit react-redux react-router-dom react-icons react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp