import tensorflow as tf

keras_model = tf.keras.models.load_model('bin/garbage_classifier_mobilenetv2.keras')

converter = tf.lite.TFLiteConverter.from_keras_model(keras_model) 
tflite_model = converter.convert()

with open('converted_model.tflite', 'wb') as f:     
  f.write(tflite_model)