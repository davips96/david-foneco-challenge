FROM python:3.7
WORKDIR /server
COPY requirements.txt /server
RUN pip install -r requirements.txt
COPY . /server
EXPOSE 5000
CMD python -u app.py