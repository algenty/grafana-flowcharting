#!/bin/bash
find . -type f|grep -v OLD|xargs grep getPartial|cut -f2 -d"'"|while read F
do 
	ls -a $F
done
