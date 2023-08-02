#!/bin/sh
echo "----- Building Andoird app :: ionic capacitor ..."

ionic build --prod
##sh ./deploy.sh

#enable android x issues
npx jetify

#Syncing letest codes for android platform
ionic cap sync android 


#building apk
ionic capacitor copy android && cd android && ./gradlew assembleDebug && cd ..


echo "----- Build and sync completed. -----"

