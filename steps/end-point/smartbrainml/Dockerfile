#Download Python from DockerHub and use it
FROM python:3.7.4
#Set the working directory in the Docker container
WORKDIR /code
#Copy the dependencies file to the working directory
COPY requirements.txt .
RUN apt-get update ##[edited]
RUN apt-get install ffmpeg libsm6 libxext6  -y

RUN apt-get update && apt-get install -y python3-opencv
#Install the dependencies
RUN pip install -r requirements.txt
RUN pip install opencv-python
RUN pip install --upgrade tensorflow

#Copy the Flask app code to the working directory
COPY src/ .
#Run the container
EXPOSE 2000
CMD [ "python", "./app.py" ]