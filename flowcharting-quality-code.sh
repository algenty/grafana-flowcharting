#!/usr/bin/env bash

_FLOWCHARTING_SRC_PATH=${PWD}/src
_FLOWCHARTING_SRC_MASK='*.ts'
_FLOWCHARTING_SRC_FILES=$(find ${_FLOWCHARTING_SRC_PATH} -type f -name "${_FLOWCHARTING_SRC_MASK}")

test_#_connect_disconnect() {
  CONNECT_EXPR='events.connect'
  DISCONNECT_EXPR='events.disconnect'
  for FILE in ${_FLOWCHARTING_SRC_FILES}; do
    # echo $FILE
    COUNT_CONNECT=$(cat $FILE|grep $CONNECT_EXPR|wc -l)
    COUNT_DISCONNECT=$(cat $FILE|grep $DISCONNECT_EXPR|wc -l)
    if [ $COUNT_CONNECT -ne $COUNT_DISCONNECT ]; then
      echo -e "${FUNCNAME[0]} => $(basename ${FILE})     \t: \t'${CONNECT_EXPR}'=${COUNT_CONNECT}\t'${DISCONNECT_EXPR}'=${COUNT_DISCONNECT}"
    fi
  done
}

check_partials_objects() {
  _PARTIAL_PATH=${_FLOWCHARTING_SRC_PATH}/partials
  _OBJ_LIST=$(ag -o '{{.+}}'|cut -f3 -d':'|tr -d '{{' |tr -d '}}'|sort|uniq)
  for LINE in ${_OBJ_LIST}; do
    _OBJ=$(cut -f1 -d'.')
  done
}

test_#_connect_disconnect
