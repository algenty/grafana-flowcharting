// import MxGraph from "../src/graph_class";
document.body.innerHTML =  '<div id="MyContainer">Beer</div>';

describe("DOM", function () {
    
    test('container', () => {
        var container = document.getElementById("MyContainer");
        expect(container).toHaveLength();
    });
    
});

// describe("Rule", function () {
//     // let graph = new MxGraph();
//     var container = document.getElementById("MyContainer");
//     test('Dom element', () => {
//         expect(1).toBe(1);
//     });
// });