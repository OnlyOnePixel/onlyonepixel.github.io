var colorGrid;

async function getColors() {
  await getColor();
  await getLast24Colors();
  colorGrid = colorGrid.slice().sort((a, b) => a.id - b.id);
}

async function getColor() {
  await fetch("https://api.studio.thegraph.com/query/5042/onepixel-full/v1.0.0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
        pixels(first: 512) {
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
      let data = e.data;
      colorGrid = data.pixels;
      colorGrid = colorGrid.map(function (currentObject) {
          return {
              color: currentObject.color,
              id: parseInt(currentObject.id)
          };
      });      
      return colorGrid;
    });
}

async function getLast24Colors() {
  await fetch("https://api.studio.thegraph.com/query/5042/onepixel-full/v1.0.0", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
        pixels(skip: 512, first: 512) {
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
      let data = e.data;
      let pixels = data.pixels;
      pixels = pixels.map(function (currentObject) {
          return {
              color: currentObject.color,
              id: parseInt(currentObject.id)
          };
      });
      colorGrid = colorGrid.concat(pixels)
      return colorGrid;
    });
}