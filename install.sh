#!/usr/bin/bash

sudo apt-get install npm
pkg upgrade -y
pkg update -y
pkg install nodejs -y
pkg install nodejs-Its -y
pkg install bash
pkg i bash
pkg i nodejs
sudo apt-get install nodejs
sudo apt-get install libwebp
sudo apt-get install mc
sudo apt-get install ffmpeg
sudo apt-get install wget
sudo apt-get install tesseract
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y nodejs libwebp ffmpeg wget tesseract
wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
npm install

echo "[*] Near_bot™ // Digite NPM START para iniciar ;)"
