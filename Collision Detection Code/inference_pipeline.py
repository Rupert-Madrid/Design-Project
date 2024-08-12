from functools import partial
from inference import InferencePipeline
# Import the built in render_boxes sink for visualizing results
from inference.core.interfaces.stream.sinks import render_boxes, multi_sink
from inference.core.interfaces.camera.entities import VideoFrame
# import opencv to save annotated images
import cv2
# import supervision to help visualize predictions
import supervision as sv
# Import the timedata to use for web requests
from datetime import datetime
# Import requests library to pass on to the web app
import requests
from requests.adapters import Retry, HTTPAdapter
import base64
from threading import Timer

# Initialize variables to be used
saved_frames = []
saving_frames = False
frame_count = 25
cooldown = False
start_time = None

# Create a simple box annotator to use in our custom sink
annotator = sv.BoxAnnotator()

# Create connection pool
session = requests.Session()
retries = Retry(total=5, backoff_factor=1, status_forcelist=[502, 503, 504])
adapter = HTTPAdapter(max_retries=retries)
session.mount('http://', adapter)
session.mount('https://', adapter)

def reset_cooldown():
    global cooldown
    cooldown = False

def convert_priority(predicted):
    if predicted == 0:
        return 3
    elif predicted == 1:
        return 1
    else:
        return 2

def send_to_webapp(predictions: dict, video_frame: VideoFrame):
    global saved_frames, saving_frames, cooldown, start_time

    # Get the text labels for each prediction
    labels = [f"{p['class']} ({p['confidence']:.2f})" for p in predictions["predictions"]]
    # Load our predictions into the Supervision Detections API
    detections = sv.Detections.from_roboflow(predictions)
    # Annotate the frame using Supervision annotator
    image = annotator.annotate(
        scene=video_frame.image.copy(), detections=detections, labels=labels
    )

    # Triggers when model detects something
    if detections[detections.class_id == 0] and not saving_frames and not cooldown:
        saving_frames = True
        cooldown = True
        start_time = datetime.now()
        Timer(15, reset_cooldown).start()
        saved_frames = []

        # If saving_frames == true run to collect and send frames
    if saving_frames:
        current_time = datetime.now()
        elapsed_time = (current_time - start_time).total_seconds()
        if elapsed_time <= 1 and len(saved_frames) < frame_count:
            saved_frames.append(image)

        if len(saved_frames) >= frame_count or elapsed_time > 1:
            if len(saved_frames) < frame_count:
                # If fewer than 25 frames were captured, add the last frame multiple times
                last_frame = saved_frames[-1]
                while len(saved_frames) < frame_count:
                    saved_frames.append(last_frame)
            saving_frames = False
            process_and_send_frames()

def process_and_send_frames():
    global saved_frames, saving_frames

    try:
        # Find the current date and time for logging
        now = datetime.now()
        dt_string = now.strftime("%m%d%Y%H%M%S")
        filename_prefix = f"Accident_{dt_string}"

        # Save the frames as images
        image_data_base64 = []
        for i, frame in enumerate(saved_frames):
            filename = f"{filename_prefix}_{i}.jpg"
            cv2.imwrite(filename, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 90])  # Save image at 90% quality

            # Prepare multipart form-data payload for web app
            with open(filename, "rb") as image_file:
                image_url = "https://monitor.hudyat.live/systemapi/UploadFile.ashx"
                img_payload = {
                    "module_code": "ACCIDENTS",
                    "refno": dt_string
                }
                img_files = [
                    ("files", (filename, open(filename, "rb"), "application/octet-stream"))
                ]
                headers = {}
                
                response_webapp = session.post(image_url, data=img_payload, files=img_files, headers=headers)
                print(f"Web App Response: {response_webapp.text}")
                
                # Encodes image to base64 to prepare to send to classification model
                image_file.seek(0)
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                image_data_base64.append(encoded_string)

        # Prepare JSON payload for endpoint
        payload = {
            'refno': dt_string,
            'image': image_data_base64[0]
        }

        # Make POST request to FastAPI endpoint
        fastapi_url = "http://localhost:8000/predict/"
        response_fastapi = session.post(fastapi_url, json=payload)
        predicted_class = response_fastapi.json()

        # Print response text
        print("Predicted Class:", response_fastapi.text)
        
        # Request to send data to the web app's database
        dt_string2 = now.strftime("%m/%d/%Y %H:%M:%S%p")
        priority_num = convert_priority(predicted_class)

        url = ("https://monitor.hudyat.live/mainapi"
               "/Accidents.ashx?action=SAVE"
               f"&CCTV_CODE=CCTV001"  # CCTV Code
               f"&REFNO={dt_string}"  # Reference No.
               f"&PRIORITY={priority_num}"
               "&STATUS=PENDING"  # Status
               f"&TRANDATE={dt_string2}"
               )
        
        response = session.get(url)  # Make a GET request to the URL

        # Print status code (and associated text)
        print(f"Database request returned {response.status_code} : '{response.reason}'")
        
    except Exception as e:
        print(f"Error sending frames: {str(e)}")
    finally:
        # Clear saved frames after processing
        saved_frames = []
        saving_frames = False
        

# Create a multisink to both visualize predictions and to send requests to the web app
on_prediction = partial(multi_sink, sinks=[render_boxes, send_to_webapp])

# Initialize a pipeline object
pipeline = InferencePipeline.init(
    model_id="collision-detection-2/13",  # Roboflow model to use
    video_reference=1,  # Path to video, device id (int, usually 0 for built-in webcams), or RTSP stream URL; 1 = USB webcam, 2 = OBS virtual cam if open
    # video_reference="rtsp://hudyat:hudyat2024@192.168.254.154:554/cam/realmonitor?channel=1&subtype=0", # RTSP stream
    on_prediction=on_prediction,  # Function to run after each prediction
    confidence=0.8,
    api_key="0CZWNYZ4YJ2aAtkyaOnQ"
)

pipeline.start()
pipeline.join()