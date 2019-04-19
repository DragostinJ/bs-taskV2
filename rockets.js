async function getRockets() {
  try {
    const response = await axios.get("https://api.spacexdata.com/v3/rockets");
    this.data = response.data;
    let x = response.data;
    main(1);
  } catch (error) {
    console.error(error);
  }
}

function main(fuelIndicator) {
  let x = this.data;
  let margin = 0;

  for (let id1 in x) {
    margin += 140;
    postObj = x[id1];
    let name = postObj.rocket_id;
    let fuel =
      postObj.second_stage.fuel_amount_tons +
      postObj.first_stage.fuel_amount_tons;

    createRocket(name, margin, fuel * fuelIndicator);
  }
}

function createRocket(idRocket, margin, timeToFly) {
  let startNode = document.getElementById(idRocket);
  if (startNode) {
    startNode.remove();

    onFire();
  } else {
    onFire();
  }

  function onFire() {
    let style = `margin-left: ${margin + 50}px;
    width: 100px;
     position: absolute;
     animation: example ${timeToFly}s forwards`; //
    let style1 = `  width: 100px;
    height: 40px;
    background-color: #4caf50;
    padding-left: ${margin};
    color: white;`;
    var node = document.createElement("div");
    node.setAttribute("class", "rocket");
    node.setAttribute("id", idRocket);
    node.setAttribute("style", style);

    let prorgressBar = document.createElement("div");
    prorgressBar.setAttribute("class", "progress");
    prorgressBar.setAttribute("id", `${idRocket}Progress`);
    prorgressBar.setAttribute("style", style1);

    document.body.appendChild(node);

    node.appendChild(document.createElement("div"));
    node.appendChild(document.createElement("div"));
    node.appendChild(document.createElement("div"));
    node.appendChild(prorgressBar);

    rocketParts(idRocket, timeToFly);
  }
}

function rocketParts(idRocket, timeToFly) {
  let elem = document.getElementById(`${idRocket}Progress`);
  let width = 100;
  let id = setInterval(frame, timeToFly * 20);

  let rocket = document.getElementById(idRocket);
  let progress = document.getElementById(`${idRocket}Progress`);

  let successMsg = document.createElement("div");
  successMsg.setAttribute("class", "successMsg");

  let text = document.createTextNode("success");

  let x = document.getElementById(idRocket).children;


  function frame() {
    if (width <= 1) {
      clearInterval(id);
    } else {
      elem.style.width = width + "%";
      width--;
    }
  }


  x[0].style.content = "url(assets/rocket_top.png)";
  x[1].style.content = "url(assets/rocket_bottom.png)";
  x[2].style.margin = "0 0 0 10px";
  x[2].style.content = "url(assets/thrust.png)";

  x[2].animate(
    [
      // keyframes
      { opacity: "1" },
      { opacity: "0" },
      { opacity: "1" },
      { opacity: "0" }
    ],
    {
      // timing options
      duration: 100,
      iterations: Infinity
    }
  );
 
  setTimeout(function(idRocket) {
    if (rocket) {
      rocket.removeChild(x[1]);
    } else console.log("hi");
  }, (timeToFly * 1000) / 2);
  setTimeout(function(idRocket) {
    if (rocket) {
      x[0].animate(
        [
          // keyframes
          { opacity: "1" },
          { opacity: "0.8" },
          { opacity: "0.4" },
          { opacity: "0" }
        ],
        {
          // timing options
          duration: 1000
        }
      );
      setTimeout(() => {
        rocket.removeChild(x[1]);
        rocket.removeChild(x[0]);
        progress.remove();

        successMsg.appendChild(text);
        rocket.appendChild(successMsg);

        setTimeout(() => {
          rocket.remove();
        }, 5000);
      }, 1000);
    } else console.log("hi from the second function");
  }, timeToFly * 2000);
}
