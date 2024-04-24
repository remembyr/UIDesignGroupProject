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

fats = [
    {"name": 'Almonds', "imgURL": 'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/almonds-9e25ce7.jpg?quality=90&resize=556,505'},
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'},
    {"name": 'Salad', "imgURL": 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/12/20/0/FNK_Caesar-Salad_H_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1576855535377.jpeg'},
    {"name": 'Whole Grain Bread', "imgURL": 'https://www.tasteofhome.com/wp-content/uploads/2018/07/whole-wheat-bread.jpg'},
    {"name": 'French Fries', "imgURL": 'https://kentrollins.com/wp-content/uploads/2021/12/featured-fries-scaled.jpeg'},
]

fatsQuality = [
    {"name": 'Guacamole', "imgURL": 'https://cdn.loveandlemons.com/wp-content/uploads/2023/07/guacamole-recipe.jpg'},
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'},
    {"name": 'Fac House Salmon', "imgURL": 'https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg'},
    {"name": 'French Fries', "imgURL": 'https://kentrollins.com/wp-content/uploads/2021/12/featured-fries-scaled.jpeg'},
    {"name": 'Almonds',
     "imgURL": 'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/almonds-9e25ce7.jpg?quality=90&resize=556,505'},

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

@app.route('/check_protein_quality', methods=['GET', 'POST'])
def check_protein_quality():
    correctAnswer = sorted(['Red Lentil Dahl', 'Fac House Salmon', 'Chickpeas'])
    req = request.get_json()
    userAnswer = sorted(req['userAnswer'])

    isCorrect = correctAnswer == userAnswer

    return jsonify(isCorrect=isCorrect)


@app.route("/get_fats", methods=['GET', 'POST'])
def get_fats():
    return jsonify(fats)

@app.route("/get_fats_quality", methods=['GET', 'POST'])
def get_fats_quality():
    return jsonify(fatsQuality)

@app.route('/check_fats_source', methods=['GET', 'POST'])
def check_fats_source():
    correctAnswer = sorted(['Cheese Pizza', 'French Fries', 'Almonds'])
    req = request.get_json()
    userAnswer = sorted(req['userAnswer'])

    isCorrect = correctAnswer == userAnswer

    return jsonify(isCorrect=isCorrect)

@app.route('/check_fats_quality', methods=['GET', 'POST'])
def check_fats_quality():
    correctAnswer = sorted(['Guacamole', 'Fac House Salmon', 'Almonds'])
    req = request.get_json()
    userAnswer = sorted(req['userAnswer'])

    isCorrect = correctAnswer == userAnswer

    return jsonify(isCorrect=isCorrect)

if __name__ == "__main__":
    app.run(debug=True)