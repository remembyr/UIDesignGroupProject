from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

user = {"completedProtein": False, "completedCarbs": False, "completedFat": False, "quizScore":0}

foods = [
    {"name": 'Red Lentil Dahl', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/whole-wheat-pasta-gettyimages-488392474-64359d6e6fa92.jpg'},
    {"name": 'Cheese Pizza', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/whole-wheat-pasta-gettyimages-488392474-64359d6e6fa92.jpg'},
    {"name": 'Fac House Salmon', "imgURL": 'https://hips.hearstapps.com/hmg-prod/images/whole-wheat-pasta-gettyimages-488392474-64359d6e6fa92.jpg'},
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

if __name__ == "__main__":
    app.run(debug=True)