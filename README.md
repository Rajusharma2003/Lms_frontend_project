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


###  configure simple import sort 

1.. install

npm i eslint-plugin-simple-import-sort


2... add rule in `.eslintrc.cjs`

  =>  plugins: ['react-refresh', 'simple-import-sort'],   // add simple-import-sort

  => 'simple-import-sort/imports' : 'error',  // add simple-import-sort


3... To enable auto improt file save in vs code

  open `setting` in vs code and then search "setting" in search box and then open `setting.json`and then add the following cofings =>
       => "editor.codeActionsOnSave":{   // add this section also.
        "source.fixAll.eslint": true 
    }




