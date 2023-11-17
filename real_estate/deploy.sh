echo "Switching to branch  master"
git checkout master

echo "building app"
npm run build

echo "deploying files to server"
scp -r dist/* iiitd@192.168.2.250:/var/www/192.168.2.250

echo "done"
