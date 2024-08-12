from fastapi import FastAPI
from fastapi.responses import JSONResponse
import onnxruntime as ort
import numpy as np
import cv2
from pydantic import BaseModel
import base64

app = FastAPI()

# Initialize ONNX runtime session and model
providers = ['CUDAExecutionProvider', 'CPUExecutionProvider']
onnx_model_path = "class_model_final_1.onnx"

ort_session = ort.InferenceSession(onnx_model_path, providers=providers)

class ImagePayload(BaseModel):
    refno: str
    image: str

@app.post("/predict/")
async def predict_batch(payload: ImagePayload):
    try:
        # Decode Base64 to image bytes
        image_bytes = base64.b64decode(payload.image)
        # Convert image bytes to numpy array
        np_array = np.frombuffer(image_bytes, np.uint8)
        # Decode image
        image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
        # Preprocess the image as required
        processed_image = preprocess_image(image)
            
        batched_image = processed_image[np.newaxis, ...]  # Add batch dimension
        
        # Run inference
        input_name = ort_session.get_inputs()[0].name
        result = ort_session.run(None, {input_name: batched_image.astype(np.float32)})
        print(result) 

        #Get highest class predicted
        max_index = int(np.argmax(result))

        return JSONResponse(content=max_index)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

def preprocess_image(image):
    resized_image = cv2.resize(image, (224, 224))
    normalized_image = resized_image / 255.0
    return normalized_image

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
