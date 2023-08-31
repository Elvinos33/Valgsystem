import datetime
import bcrypt
import jwt
from flask import Blueprint, request, jsonify
from models import db
from app import app
from functools import wraps
from flask_cors import cross_origin

user_blueprint = Blueprint('user_blueprint', __name__)

