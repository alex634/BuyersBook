from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image
from io import BytesIO
import configparser
import pymongo
import pathlib
import blurhash
import base64
import uuid

script_Path = pathlib.Path(__file__).parent
config = configparser.ConfigParser()
config.read(str(script_Path / "config.ini"))

db = pymongo.MongoClient(config["mongodb"]["url"])["buyersbookserver"]

print("CORS is enabled, please add authorization tokens before pushed to production.")
print("If this is not done, competitors may be able to steal private data.")

app = Flask(__name__)
CORS(app)

@app.get("/books")
def books():
    bs = list(db["books"].find({}, {"_id": 0}))
    return {"books": bs}

@app.get("/pages")
def pages():
    book_Name = request.args.get("book_name")
    
    documents = list(db["pages"].find({"book_name": book_Name}, {"_id": 0}))
    
    if len(documents) == 0:
        return "No pages associated with book title. Book may not exist.", 400
    
    return {"pages": documents}

@app.get("/image/<name>")
def image(name):
    image_Dir = script_Path / "images" / name
    
    if not image_Dir.exists():
        return "Image file does not exist.", 400
    
    return send_file(str(image_Dir))
        

@app.post("/createbook") 
def createBook():
    data = request.get_json()
    
    book_Name = data.get("book_name")
    
    db["books"].insert_one({"book_name": book_Name, "pages": 0})
    
    return f"Succesfully created book {book_Name}.", 200

def get_Next_Page_Number(book_Name):
    doc = db["books"].find_one({"book_name": book_Name})
    return doc.get("pages") + 1
    
def increment_Page_Number(book_Name):
    db["books"].update_one({"book_name": book_Name}, {"$inc": {"pages": 1}})
    
@app.post("/addpage")
def addPage():
    data = request.get_json()
    book_name = data.get("book_name")
    vendor_name = data.get("vendor_name")
    item_type = data.get("item_type")
    tags = data.get("tags")
    webp_base64 = data.get("webp_base64")
    next_Page_Number = get_Next_Page_Number(book_name)
    
    if (not isinstance(tags, list)) or data.get("tags") == None:
        return "Tags is not a list.", 400
    
    webp_Data = base64.b64decode(webp_base64)
    
    try:
        webp_Image = Image.open(BytesIO(webp_Data))
        if webp_Image.format != "WEBP":
            raise Exception("Error: Not in webp format")
    except:
        return "Image is corruped or not in webp format", 400
    
    image_Name = str(uuid.uuid4()) + ".webp"
    
    webp_Image.save(str(script_Path / "images" / image_Name), format="webp")
    
    image_Blurhash = blurhash.encode(webp_Image, x_components=4, y_components=3)
    
    page = {
        "book_name": book_name,
        "page_number": next_Page_Number,
        "vendor_name": vendor_name,
        "item_type": item_type,
        "tags": tags,
        "file_name": image_Name,
        "blurhash": image_Blurhash
    }
    
    db["pages"].insert_one(page)
    
    increment_Page_Number(book_name)
    
    return "Sucessfully added page.", 200

if __name__ == "__main__":
    app.run(host="0.0.0.0")
