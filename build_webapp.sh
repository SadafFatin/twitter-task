#!/bin/sh
echo "----- Building PWA "

#ionic build project
ionic build --prod


#for cpanel or ngix
#echo "----- moving .htaccess. -----"
#cp  ./.htaccess www

#echo "----- compressing contents. -----"
#zip -r dist.zip www


#scp -r dist.zip eidyict@132.148.79.243:~/public_html/nutritionprofile


#firebase deployment configuration
firebase deploy

echo "----- Deployment completed. -----"

