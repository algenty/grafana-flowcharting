#!/bin/bash

init() {
    ./node_modules/.bin/grunt init
}

updateShapes() {
    cp -r ./externals/drawio/src/main/webapp/shapes ./externals/drawio/src/main/webapp/stencils ./src/libs/drawio/
}

updateViewer() {
    cp ./externals/drawio/src/main/webapp/js/viewer.min.js ./src/libs/drawio/js/
}

makeJs() {
cat<<EOF > ./src/mxgraph_custom.js
const customize = () => {
    $(cat ./src/libs/Graph_custom.js)
}
let viewerCode = "$(base64 -w0 ./src/libs/drawio/js/viewer.min.js)";
function evalCode() {
    window.eval(window.atob(viewerCode));
    viewerCode = '';
}
  
  
export { customize, evalCode };
EOF
}

#init
updateViewer
updateShapes
makeJs