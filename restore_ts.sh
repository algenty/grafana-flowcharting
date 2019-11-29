find ./src -name '*.ts' -empty |while read file
do
  echo "$file is empty"
  base=$(basename $file)
  backup=$(ls -1t ./backups/${base}*|head -1)
  set -x
  cp $backup $file
  set +x
done