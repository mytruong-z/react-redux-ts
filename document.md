61. Initial-setup
1. npm install
2. Fake Server: npm i -D json-server
3. Build data: npx json-server --watch json-server/db.json --port 3001
4. Test data: curl http://localhost:3001/events
5. both: npx concurrently -k "json-server --watch json-server/db.json --port 3001" "npm start"
6. Config lại file package.json để chạy cả 2 cùng 1 lúc

****************************************************
62. Seting Up Redux
1. npm i -S redux react-redux
2. package called class names: npm i -S classnames
    npm i --save-dev @types/classnames

62. Seting Up Redux

65. Loading events part -1
 a. Redux-thunk: npm i -S redux-thunk

Pending: 66 Loading events part - 2
===========Console.log===============
1. node -e "console.log(new Date().toISOString())"

2. Format code: Shift + Alt + F