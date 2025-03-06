from flask import Flask, request, jsonify
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

USER_FILE = 'users.txt'
CIPHER_FILE = 'ciphers.txt'

# Функция для проверки логина и пароля
def check_credentials(username, password):
    if not os.path.exists(USER_FILE):
        return False
    with open(USER_FILE, 'r') as file:
        for line in file:
            user, pwd = line.strip().split(',')
            print(user, username, pwd, password)
            if user == username and pwd == password:
                return True
    return False

# Функция для получения шифров
def get_ciphers():
    if not os.path.exists(CIPHER_FILE):
        return []
    with open(CIPHER_FILE, 'r') as file:
        return [line.strip().split(',') for line in file]

# Функция для добавления нового шифра
def add_cipher(cipher_name, description):
    with open(CIPHER_FILE, 'a') as file:
        file.write(f"{cipher_name},{description}\n")

# Функция для удаления шифра
def delete_cipher(cipher_name):
    if not os.path.exists(CIPHER_FILE):
        return
    ciphers = get_ciphers()
    with open(CIPHER_FILE, 'w') as file:
        for cipher in ciphers:

            if cipher[0] != cipher_name:
                file.write(f"{cipher[0]},{cipher[1]}\n")

# Роут для входа
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if check_credentials(username, password):
        return jsonify({"status": "success"}), 200
    else:
        return jsonify({"status": "failure"}), 401

# Роут для получения шифров
@app.route('/ciphers', methods=['GET'])
def ciphers():
    return jsonify(get_ciphers()), 200

# Роут для добавления шифра
@app.route('/ciphers', methods=['POST'])
def add_new_cipher():
    data = request.get_json()
    cipher_name = data.get('name')
    description = 'Описания у шифра сейчас нет. Но вы можете его добавить'
    add_cipher(cipher_name, description)
    return jsonify({"status": "success"}), 201

# Роут для добавления описания
@app.route('/ciphers', methods=['PUT'])
def add_description():
    data = request.get_json()
    cipher_name = data.get('name')
    description = data.get('description')
    delete_cipher(cipher_name)
    add_cipher(cipher_name, description)
    return jsonify({"status": "success"}), 201

# Роут для удаления шифра
@app.route('/ciphers', methods=['DELETE'])
def remove_cipher():
    data = request.get_json()
    cipher_name = data.get('name')
    delete_cipher(cipher_name)
    return jsonify({"status": "deleted"}), 200

# Роут для получения описания шифра
@app.route('/cipher/<cipher_name>', methods=['GET'])
def get_cipher_description(cipher_name):
    ciphers = get_ciphers()
    for cipher in ciphers:
        if cipher[0] == cipher_name:
            return jsonify({"name": cipher[0], "description": cipher[1]}), 200
    return jsonify({"status": "not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
