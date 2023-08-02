#!/bin/sh
echo "----- Building Andoird Project :: ionic capacitor ..."

#ionic capacitor platform rm android
rm -rf android/

#rm node_modules and install packges
rm package-lock.json
rm -rf node_modules/
npm i

#ionic capacitor platform add android@6.3.0 --nosave --no-confirm
ionic capacitor add android --no-interactive --nosave --no-confirm

npx capacitor-assets generate

status=$?
if [ $status -ne 0 ]; then
  echo "Failed to run command: ionic capacitor platform add android --nosave. Return code: " ${status}
  exit 22
fi
cordova-res android --skip-config --copy

#configure android project
npx trapeze run config.yaml --android-project android

#enable android x issues
npx jetify

#Syncing letest codes for android platform
ionic cap sync android


#building apk
ionic capacitor build android --prod
##sh ./deploy.sh

echo "----- Build and sync completed. -----"

