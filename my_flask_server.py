from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'ACCESS_KEY'

@app.route('/query', methods=['POST'])
def query():
    data = request.json
    response = openai.Completion.create(
      engine="text-davinci-003",
      prompt=data['prompt'],
      max_tokens=150
    )
    return jsonify(response.choices[0].text.strip())

if __name__ == '__main__':
    app.run(debug=True)
