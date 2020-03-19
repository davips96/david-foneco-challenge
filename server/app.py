from flask import Flask
from flask_socketio import SocketIO, emit
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


db = yaml.load(open('db.yaml'), Loader=yaml.FullLoader)
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)


@socketio.on('connect')
def connect_handler():
    print('new user connected')
    cur = mysql.connection.cursor()
    cur.execute("SELECT username, email, postdate, msg FROM foneco.comments")
    comments = []
    for comment in cur.fetchall():
        comments.append(
            {
                'username': comment[0],
                'email': comment[1],
                'postdate': comment[2],
                'msg': comment[3]
            }
        )
    cur.close()
    emit('display all comments', comments)


@socketio.on('post comment')
def post_comment(value):
    comment = value
    print('new comment posted: ' + comment['msg'])
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO foneco.comments(username, email, postdate, msg) VALUES (%s, %s, %s, %s)",
                (comment['username'], comment['email'], comment['postdate'], comment['msg']))
    mysql.connection.commit()
    cur.close()
    emit('display comment', comment, broadcast=True)


if __name__ == '__main__':
    print('server online')
    socketio.run(app, host="0.0.0.0", port=5000)
