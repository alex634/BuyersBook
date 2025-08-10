# BuyersBook

https://github.com/user-attachments/assets/b43e55d4-5636-44b8-bc9f-95ac03088739

## Intention

This intends to provide salespeople with a way to show product to buyers. This is not meant to be general purpose product software. This was built with a specific company in mind.

## How to use

All product are organized into "pages" within "books". Pages are numbered, books have a string representing its name. For each page, there are tags associated with it. These allow the pages to be searched. In general, while this is software is usable on a desktop, this was designed with tablets in mind.

## How to run

### Frontend

The frontend uses ReactJS and Javascript. To run the frontend, go into the BuyersBook directory and run `npm install`. After this, you may run `npm run dev` to launch the page. Keep in mind, the backend must be launched first. Make sure the backend is being pointed to correctly in App.jsx: `const [comms, setComms] = useState(new Communication("http://localhost:5000"));`

### Backend

The backend was created with Flask and Mongodb. The backend is located in the BuyersBookServer directory. The first thing you'll need to do is install the mongodb server, start it, and point config.ini to the url. Next, you'll need to install the following Python packages: **Flask**, **flask-cors**, **pillow**, **pymongo**, and **bluhash**. Once these are installed, you may run `main.py` to start the backend. If needed, change the port in the code.

If you need to add pages to the database use bbscli.py. This should not require any special packages. It requires that any passed image is formatted in webp.

## Notes

This is not a finished project. Websites are not supposed to be deployed using `npm run dev` and Flask is meant to be used with a web server such as Apache. In addition, there are bugs I am aware of and haven't fixed. This may or may not be finished later depending on whether this looks like a workable/good solution for the company I made it for.
