from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

user = {"completedProtein": False, "completedCarbs": False, "completedFat": False}
quizScores = {
    "1":{"food1": "", "food2": "", "protein": 0, "carbs": 0, "fat": 0},
    "2":{"food1": "", "food2": "", "protein": 0, "carbs": 0, "fat": 0},
    "3":{"food1": "", "food2": "", "protein": 0, "carbs": 0, "fat": 0},
    }

foods = [
    {"name": 'Red Lentil Dahl', "imgURL": 'https://www.thespruceeats.com/thmb/2-Xm87x5rnIk0qgrp3fs6T7ILws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-lentil-dahl-recipe-1001539-Hero_02-3f77c029c899411dac6da158c609e957.jpg'},
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'},
    {"name": 'Fac House Salmon', "imgURL": 'https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg'},
    {"name": 'Whole Wheat Pasta', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/whole-wheat-pasta-gettyimages-488392474-64359d6e6fa92.jpg'},
    {"name": 'Chickpeas', "imgURL": 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/04/chickpeas_closeup_1296x728_header-1024x575.jpg?w=1155&h=1528'},
]

protein = [
    {"name": 'Red Lentil Dahl', "imgURL": 'https://www.thespruceeats.com/thmb/2-Xm87x5rnIk0qgrp3fs6T7ILws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-lentil-dahl-recipe-1001539-Hero_02-3f77c029c899411dac6da158c609e957.jpg'},
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'},
    {"name": 'Steak', "imgURL": 'https://www.allrecipes.com/thmb/3cixVDmAtbb2hYxoFLVJ4VPQ7rA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/143809-best-steak-marinade-in-existence-ARMag-1x1-1-8105b6b8e5cb4931ba8061f0425243dd.jpg'},
    {"name": 'Whole Wheat Pasta', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/whole-wheat-pasta-gettyimages-488392474-64359d6e6fa92.jpg'},
    {"name": 'Chickpeas', "imgURL": 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/04/chickpeas_closeup_1296x728_header-1024x575.jpg?w=1155&h=1528'},
]

proteinQuality = [
    {"name": 'Red Lentil Dahl', "imgURL": 'https://www.thespruceeats.com/thmb/2-Xm87x5rnIk0qgrp3fs6T7ILws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-lentil-dahl-recipe-1001539-Hero_02-3f77c029c899411dac6da158c609e957.jpg'},
    {"name": 'Hot Dog', "imgURL": 'https://the1a.org/wp-content/uploads/sites/4/2023/06/IMG_1753-1500x1125.jpg'},
    {"name": 'Fac House Salmon', "imgURL": 'https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg'},
    {"name": 'Cold Cut Meat', "imgURL": 'https://upload.wikimedia.org/wikipedia/commons/2/28/13-08-31-wien-redaktionstreffen-EuT-by-Bi-frie-168.jpg'},
    {"name": 'Chickpeas', "imgURL": 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/04/chickpeas_closeup_1296x728_header-1024x575.jpg?w=1155&h=1528'},
]

carbs = [
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'},
    {"name": 'Fac House Salmon', "imgURL": 'https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg'},
    {"name": 'Salad', "imgURL": 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/12/20/0/FNK_Caesar-Salad_H_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1576855535377.jpeg'},
    {"name": 'Quinoa', "imgURL": 'https://images.immediate.co.uk/production/volatile/sites/30/2022/05/Quinoa-707f5e8.png?resize=768,574'},
    {"name": 'Soda', "imgURL": 'https://i.redd.it/yyr6vtruhzbb1.jpg'},
]

carbsQuality = [
    {"name": 'Cous Cous', "imgURL": 'https://emilybites.com/wp-content/uploads/2022/07/Mediterranean-Couscous-Salad-5b-500x375.jpg'},
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*'},
    {"name": 'Apples', "imgURL": 'https://www.foodandwine.com/thmb/h7XBIk5uparmVpDEyQ9oC7brCpA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/A-Feast-of-Apples-FT-2-MAG1123-980271d42b1a489bab239b1466588ca4.jpg'},
    {"name": 'French Fries', "imgURL": 'https://kentrollins.com/wp-content/uploads/2021/12/featured-fries-scaled.jpeg'},
    {"name": 'Fruity Pebbles', "imgURL": 'https://m.media-amazon.com/images/I/81O4DMIkqIL.jpg'},

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

quizFoods1 = [
    {"name": 'Guacamole',
     "imgURL": 'https://cdn.loveandlemons.com/wp-content/uploads/2023/07/guacamole-recipe.jpg',
     "protein": 1,
     "carbs": 3,
     "fats": 4},
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*',
     "protein": 12,
     "carbs": 29,
     "fats": 11
     },
    {"name": 'Fac House Salmon', "imgURL": 'https://www.onceuponachef.com/images/2018/02/pan-seared-salmon-.jpg',
     "protein": 20,
     "carbs": 0,
     "fats": 7
     },
    {"name": 'French Fries', "imgURL": 'https://kentrollins.com/wp-content/uploads/2021/12/featured-fries-scaled.jpeg',
     "protein": 2,
     "carbs": 15,
     "fats": 10
     },
    {"name": 'Almonds',
     "imgURL": 'https://images.immediate.co.uk/production/volatile/sites/30/2021/02/almonds-9e25ce7.jpg?quality=90&resize=556,505',
     "protein": 6,
     "carbs": 6,
     "fats": 14
     },
    {"name": 'Red Lentil Dahl', "imgURL": 'https://www.thespruceeats.com/thmb/2-Xm87x5rnIk0qgrp3fs6T7ILws=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/spicy-lentil-dahl-recipe-1001539-Hero_02-3f77c029c899411dac6da158c609e957.jpg',
     "protein": 14,
     "carbs": 44,
     "fats": 8
     },
    {"name": 'Steak', "imgURL": 'https://www.allrecipes.com/thmb/3cixVDmAtbb2hYxoFLVJ4VPQ7rA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/143809-best-steak-marinade-in-existence-ARMag-1x1-1-8105b6b8e5cb4931ba8061f0425243dd.jpg',
     "protein": 26,
     "carbs": 0,
     "fats": 8
     },
    {"name": 'Whole Wheat Pasta', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/whole-wheat-pasta-gettyimages-488392474-64359d6e6fa92.jpg',
     "protein": 8,
     "carbs": 39,
     "fats": 1
     },
    {"name": 'Chickpeas', "imgURL": 'https://i0.wp.com/post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/04/chickpeas_closeup_1296x728_header-1024x575.jpg?w=1155&h=1528',
     "protein": 9,
     "carbs": 27,
     "fats": 3
     },
    {"name": 'Cous Cous', "imgURL": 'https://emilybites.com/wp-content/uploads/2022/07/Mediterranean-Couscous-Salad-5b-500x375.jpg',
     "protein": 6,
     "carbs": 30,
     "fats": 0
     },
    {"name": 'Apples', "imgURL": 'https://www.foodandwine.com/thmb/h7XBIk5uparmVpDEyQ9oC7brCpA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/A-Feast-of-Apples-FT-2-MAG1123-980271d42b1a489bab239b1466588ca4.jpg',
     "protein": 1,
     "carbs": 25,
     "fats": 0
     },
    {"name": 'Fruity Pebbles', "imgURL": 'https://m.media-amazon.com/images/I/81O4DMIkqIL.jpg',
     "protein": 1,
     "carbs": 23,
     "fats": 4
     },
]

lockedFoods = {
    "1": {"name": 'Buffalo Chicken Wrap',
     "imgURL": 'https://d9hyo6bif16lx.cloudfront.net/live/img/production/detail/menu/lunch-dinner_sandwiches_crispy-buffalo-chicken-wrap.jpg',
     "protein": 20,
     "carbs": 29,
     "fats": 11},
    "2": {"name": 'Lentil Curry', "imgURL": 'https://frommybowl.com/wp-content/uploads/2019/10/Creamy_Coconut_Red_Lentil_Curry_FromMyBowl_Vegan-6.jpg',
     "protein": 9,
     "carbs": 29,
     "fats": 13
     },
    "3": {"name": 'Caesar Salad', "imgURL": 'https://www.seriouseats.com/thmb/Fi_FEyVa3_-_uzfXh6OdLrzal2M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-caesar-salad-recipe-06-40e70f549ba2489db09355abd62f79a9.jpg',
     "protein": 5,
     "carbs": 7,
     "fats": 12
     },
}

def checkNumAway(correctAnswer, userAnswer, isCorrect):
    if not isCorrect:
        correct_set = set(correctAnswer)
        user_set = set(userAnswer)

        incorrect_elements = list(correct_set.symmetric_difference(user_set))
        
        num_away = len(incorrect_elements)
    else:
       num_away = 0
    
    return num_away

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
   }
   
   user = updated_user
   return jsonify(success=True, data=updated_user)

@app.route("/get_foods", methods=['GET', 'POST'])
def get_foods():
    return jsonify(foods)

@app.route("/get_protein", methods=['GET', 'POST'])
def get_protein():
    return jsonify(protein)

@app.route("/get_protein_quality", methods=['GET', 'POST'])
def get_protein_quality():
    return jsonify(proteinQuality)

@app.route('/check_protein_source', methods=['GET', 'POST'])
def check_protein_source():
   correctAnswer = sorted(['Red Lentil Dahl', 'Steak', 'Chickpeas'])
   req = request.get_json()
   userAnswer = sorted(req['userAnswer'])
   
   isCorrect = correctAnswer == userAnswer
   num_away = checkNumAway(correctAnswer, userAnswer, isCorrect)
       
   return jsonify(isCorrect=isCorrect, numAway=num_away)

   

@app.route('/check_protein_quality', methods=['GET', 'POST'])
def check_protein_quality():
    correctAnswer = sorted(['Red Lentil Dahl', 'Fac House Salmon', 'Chickpeas'])
    req = request.get_json()
    userAnswer = sorted(req['userAnswer'])

    isCorrect = correctAnswer == userAnswer
    num_away = checkNumAway(correctAnswer, userAnswer, isCorrect)

    return jsonify(isCorrect=isCorrect, numAway=num_away)

@app.route("/get_carbs", methods=['GET', 'POST'])
def get_carbs():
    return jsonify(carbs)

@app.route("/get_carbs_quality", methods=['GET', 'POST'])
def get_carbs_quality():
    return jsonify(carbsQuality)

@app.route('/check_carbs_source', methods=['GET', 'POST'])
def check_carbs_source():
   correctAnswer = sorted(['Cheese Pizza', 'Salad', 'Quinoa', 'Soda'])
   req = request.get_json()
   userAnswer = sorted(req['userAnswer'])
   
   isCorrect = correctAnswer == userAnswer
   num_away = checkNumAway(correctAnswer, userAnswer, isCorrect)
   
   return jsonify(isCorrect=isCorrect, numAway=num_away)

@app.route('/check_carbs_quality', methods=['GET', 'POST'])
def check_carbs_quality():
    correctAnswer = sorted(['Cous Cous', 'Apples'])
    req = request.get_json()
    userAnswer = sorted(req['userAnswer'])

    isCorrect = correctAnswer == userAnswer
    num_away = checkNumAway(correctAnswer, userAnswer, isCorrect)

    return jsonify(isCorrect=isCorrect, numAway=num_away)


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
    num_away = checkNumAway(correctAnswer, userAnswer, isCorrect)

    return jsonify(isCorrect=isCorrect, numAway=num_away)

@app.route('/check_fats_quality', methods=['GET', 'POST'])
def check_fats_quality():
    correctAnswer = sorted(['Guacamole', 'Fac House Salmon', 'Almonds'])
    req = request.get_json()
    userAnswer = sorted(req['userAnswer'])

    isCorrect = correctAnswer == userAnswer
    num_away = checkNumAway(correctAnswer, userAnswer, isCorrect)

    return jsonify(isCorrect=isCorrect, numAway=num_away)

@app.route("/get_quiz1", methods=['GET', 'POST'])
def get_quiz1():
    return jsonify(quizFoods1)

@app.route('/get_locked_food', methods=['GET', 'POST'])
def get_locked_food():
    req = request.get_json()
    quizStage = req['quizStage']

    lockedFood = lockedFoods[str(quizStage)]

    return jsonify(lockedFood=lockedFood)

@app.route('/update_quiz_scores', methods=['GET', 'POST'])
def update_quiz_scores():
    req = request.get_json()
    quizStage = req['quizStage']

    quizScores[str(quizStage)]["food1"] = req["food1"]
    quizScores[str(quizStage)]["food2"] = req["food2"]
    quizScores[str(quizStage)]["protein"] = req["protein"]
    quizScores[str(quizStage)]["carbs"] = req["carbs"]
    quizScores[str(quizStage)]["fat"] = req["fat"]

    return jsonify(isSuccess=True)

@app.route('/get_quiz_scores', methods=['GET', 'POST'])
def get_quiz_scores():
    return jsonify(quizScores)

if __name__ == "__main__":
    app.run(debug=True)