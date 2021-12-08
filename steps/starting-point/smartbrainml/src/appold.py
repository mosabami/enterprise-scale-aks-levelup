# ignore this file
from flask import Flask, jsonify, request
import cv2
import requests
import os
from mtcnn.mtcnn import MTCNN
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)

# get permitted origins. first attempt to get the client url from environment variable
try:
    origin = os.environ['CLIENT_URL']
except(KeyError):
    # origin = "http://localhost:*"
    origin='*'
CORS(app, support_credentials=True,origins=[origin])

# @cross_origin(supports_credentials=True)
@app.route('/worker/ml', methods=['GET', 'POST'])
def get_detected(filename = 'image_name.jpg'):
    url = request.args.get('url')
    img_data = requests.get(url).content
    with open(filename, 'wb') as handler:
        handler.write(img_data)
    img = cv2.imread(filename)
    width = 500
    height = int(img.shape[0]/img.shape[1] * 500) 
    dim = (width, height)
    pixels = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
    detector = MTCNN()
    # detect faces in the image
    faces = detector.detect_faces(pixels)
    # for face in faces:
    #     print(face)
    # print(faces) 
    results = []
    for face in faces:
        # print(face)
        faces_coordinates = face["box"]
        # for (x, y, w, h) in faces_coordinates:
        x = faces_coordinates[0]
        y = faces_coordinates[1]
        w = faces_coordinates[2]
        h = faces_coordinates[3]
        results.append({"leftCol":x,"topRow":y,"rightCol":width-(x+w),"bottomRow":height-(y+h)})
        cv2.rectangle(pixels, (x, y), (x+w, y+h), (255, 0, 0), 2)
        # print(x+w,y+h)
    # cv2.imwrite("image_name2.jpg",pixels)
    # print(height)
    os.remove(filename) 
    return jsonify(results)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2000)