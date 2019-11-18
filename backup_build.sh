CUR_PWD=$(pwd)
DATE_SAVE=$(date "+%Y-%m-%d_%H%M%S")
cd src
for f in $(ls -1 *.ts)
do
  echo $f
  cp $f ../backups/${f}_${DATE_SAVE}
done