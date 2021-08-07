var colorGrid;

async function getColor() {
  await fetch("https://api.studio.thegraph.com/query/5042/onepixel-firstrunprod/v1.0.0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
        pixels(first: 1000) {
          id
          color
        }
      }
      
            `,
      variables: {
        now: new Date().toISOString(),
      },
    }),
  })
    .then((e) => e.json())
    .then((e) => {
      console.log(e);

      let data = e.data;

      colorGrid = data.pixels;
      colorGrid = colorGrid.map(function (currentObject) {
          return {
              color: currentObject.color,
              id: parseInt(currentObject.id)
          };
      });
      colorGrid = colorGrid.slice().sort((a, b) => a.id - b.id);
      
      //console.log("pixels==> ", pixels);
      return colorGrid;
    });

  setInterval(getColor, 15000); //calls itself every
}

//.then((e) => console.log(e.data.json()));
// let colorGrid = {};

// let hexTokenIds = colors.data.pixels;

// for (let i = 0; i < hexTokenIds; i++) {
//   let hexString = hexTokenIds[i].id;

//   console.log('hex string, (please work),', hexString);
// }

// const pixels = colors.json().data.pixels;

// let idArray = [];

// for (let i = 0; i < pixels.length; i++) {
//   pixelId = pixels[i]["id"];
//   idArray.push(pixelId);
// }

// console.log("id array-->", idArray);

// pixel.then((e) => {
//   console.log("full json -->", e.json());
// });

// console.log("pixel.data object -->", pixel.json().data);
