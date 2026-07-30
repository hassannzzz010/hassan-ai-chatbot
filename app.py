from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

chat_history = []

# API key Render Environment Variable se aayegi
genai.configure(api_key="YOUR_GEMINI_KEY")

model = genai.GenerativeModel("gemini-flash-lite-latest")

system_prompt = """
You are Hassan AI.

Rules:
- Reply in Roman Urdu.
- Be friendly and helpful.
- Keep answers concise unless the user asks for detail.
- Your creator is Hassan.
- Your name is Hassan AI.
"""

@app.route("/")
def home():
    return "Hassan AI Backend Working!"

@app.route("/chat", methods=["POST"])
def chat():
    try:
        global chat_history

        data = request.json
        user_message = data.get("message", "")

        chat_history.append(f"User: {user_message}")

        full_prompt = (
            system_prompt
            + "\n"
            + "\n".join(chat_history[-10:])
        )

        response = model.generate_content(full_prompt)

        ai_reply = response.text

        chat_history.append(f"Hassan AI: {ai_reply}")

        return jsonify({
            "reply": ai_reply
        })

    except Exception as e:
        print("ERROR:", e)

        return jsonify({
            "reply": f"Error: {str(e)}"
        }), 500

@app.route("/new-chat", methods=["POST"])
def new_chat():
    global chat_history
    chat_history.clear()

    return jsonify({
        "message": "Chat cleared"
    })

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )