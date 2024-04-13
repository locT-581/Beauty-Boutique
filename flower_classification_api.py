from flask import Flask, request, jsonify
from keras.models import load_model
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# Load mô hình Keras
model = load_model('my_model.keras')
flower_names = ['daisy', 'dandelion', 'rose', 'sunflower', 'tulip']

@app.route('/predict', methods=['POST'])
def predict():
    # Nhận ảnh từ yêu cầu POST
    file = request.files['image']
    # Tiền xử lý ảnh
    image = tf.keras.utils.load_img(file, target_size=(180, 180))
    image_array = tf.keras.utils.img_to_array(image)
    image_expanded = tf.expand_dims(image_array, axis=0)

    # Dự đoán
    predictions = model.predict(image_expanded)
    result = tf.nn.softmax(predictions[0])
    predicted_class = flower_names[np.argmax(result)]
    confidence_score = np.max(result) * 100

    # Trả về kết quả dự đoán
    return jsonify({'flower_name': predicted_class, 'probability': confidence_score})

if __name__ == '__main__':
    app.run(debug=True)
