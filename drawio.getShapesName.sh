#!/bin/bash
find ./src/libs/drawio/stencils -name "*.xml"|while read XML
do
	(xmllint --xpath '//shapes/@name' $XML|tr -d '"'|sed -e "s/name=//g";echo)|while read SHAPES
	do
		(xmllint --xpath "//shapes[@name=\"$SHAPES\"]/shape/@name" $XML|tr -d '"'|sed -e "s/name=/\n/g"|tr " " "_"|sed -e "s/_$//g";echo)|while read SHAPE
		do
			echo $SHAPES.$SHAPE|tr '[:upper:]' '[:lower:]'
		done
	done
done
