import argparse
import requests
import base64

def createbook_Handler(args):
    try:
        r = requests.post(args.endpoint + "/createbook", json={"book_name": args.name})
    except:
        print("An error occurred. Server is likely inaccessible or endpoint is not correct.")
        return
    
     
    if (r.status_code >= 300 or r.status_code < 200):
        print("An error occurred. Wrong http status code.")
        return

    print("Book created successfully") 
    


def addpage_Handler(args):
    try:
        image_File = open(args.image, "rb")
        image_Bytes = image_File.read()
        image_File.close()
    except:
        print("File couldn't be read or an IO error ocurred.")
        return
    
    image_Base64 = base64.b64encode(image_Bytes).decode("ascii")
    
    post_Json = {
        "book_name": args.book,
        "vendor_name": args.vendor,
        "item_type": args.itemtype,
        "tags": args.tags.split(","),
        "webp_base64": image_Base64
    }
    
    try:
         r = requests.post(args.endpoint + "/addpage", json=post_Json)
    except:
        print("An error occurred. Server is likely inaccessible or endpoint is not correct.")
        return
    
    
     
    if (r.status_code >= 300 or r.status_code < 200):
        print("An error occurred. Wrong http status code.")
        return

    print("Page added succesfully") 
    

def listbooks_Handler(args):
    try:
        r = requests.get(args.endpoint + "/books")
    except:
        print("An error occurred. Server is likely inaccessible or endpoint is not correct.")
        return
    
    if (r.status_code >= 300 or r.status_code < 200):
        print("An error occurred. Wrong http status code.")
        return
    
    data = r.json()
    
    books = data.get("books")
    
    for book in books:
        print(f'{book.get("book_name")} (pages: {book.get("pages")}),', end="")
    
    print("")
    
def get_Args():
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(required=True)
    
    createbook_Parser = subparsers.add_parser("createbook")
    createbook_Parser.set_defaults(func=createbook_Handler)
    createbook_Parser.add_argument("name",  type=str)
    createbook_Parser.add_argument("--endpoint", type=str,required=True)

    addpage_Parser = subparsers.add_parser("addpage")
    addpage_Parser.set_defaults(func=addpage_Handler)
    addpage_Parser.add_argument("--book", type=str, required=True)
    addpage_Parser.add_argument("--vendor", type=str, required=True)
    addpage_Parser.add_argument("--itemtype", type=str, required=True)
    addpage_Parser.add_argument("--tags", type=str)
    addpage_Parser.add_argument("--image", type=str, required=True)
    addpage_Parser.add_argument("--endpoint", type=str,required=True)

    listbooks_Parser = subparsers.add_parser("listbook")
    listbooks_Parser.set_defaults(func=listbooks_Handler)
    listbooks_Parser.add_argument("--endpoint", type=str, required=True) 
    
    return parser.parse_args()

def main():
    args = get_Args()
    args.func(args)
    
main()
