from flask import Flask

app = Flask(__name__)

#User API Route
@app.route("/user")
def user():
    return {"user": {"completedProtein": "False", "completedCarbs": "False", "completedFat": "False", "quizScore":"0"}}

if __name__ == "__main__":
    app.run(debug=True)