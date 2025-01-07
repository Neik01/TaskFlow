#!/bin/bash
sudo apt-get update -y
sudo apt-get install -y docker.io
sudo usermod -aG docker $USER
sudo docker pull ntkitn/taskflow-backend
sudo docker run -p 8080:8080 -d ntkitn/taskflow-backend