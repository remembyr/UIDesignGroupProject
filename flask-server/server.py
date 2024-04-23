from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

user = {"completedProtein": False, "completedCarbs": False, "completedFat": False, "quizScore":0}

foods = [
    {"name": 'Red Lentil Dahl', "imgURL": 'https://www.thespruceeats.com/thmb/2-Xm87x5rnIk0qgrp3fs6T7ILws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-lentil-dahl-recipe-1001539-Hero_02-3f77c029c899411dac6da158c609e957.jpg'},
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'},
    {"name": 'Fac House Salmon', "imgURL": 'https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg'},
    {"name": 'Whole Wheat Pasta', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/whole-wheat-pasta-gettyimages-488392474-64359d6e6fa92.jpg'},
    {"name": 'Chickpeas', "imgURL": 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/04/chickpeas_closeup_1296x728_header-1024x575.jpg?w=1155&h=1528'},
]

#User API Route
@app.route("/get_user", methods=['GET', 'POST'])
def get_user():
    return jsonify(user)

@app.route('/update_user', methods=['GET', 'POST'])
def update_user():
   global user
   checkpoint = request.get_json()
   updated_user = {
	    "completedProtein": checkpoint['completedProtein'],
    	"completedCarbs": checkpoint['completedCarbs'],
        "completedFat": checkpoint['completedFat'],
        "quizScore": checkpoint['quizScore'],
   }
   
   user = updated_user
   return jsonify(success=True, data=updated_user)

@app.route("/get_foods", methods=['GET', 'POST'])
def get_foods():
    return jsonify(foods)

@app.route('/check_protein_source', methods=['GET', 'POST'])
def check_protein_source():
   correctAnswer = sorted(['Red Lentil Dahl', 'Fac House Salmon', 'Chickpeas'])
   req = request.get_json()
   userAnswer = sorted(req['userAnswer'])
   
   isCorrect = correctAnswer == userAnswer
   
   return jsonify(isCorrect=isCorrect)

if __name__ == "__main__":
    app.run(debug=True)