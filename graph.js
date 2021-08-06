async function getColor(){
    let colors = await fetch('https://api.studio.thegraph.com/query/5042/onepixel/v1.0.4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      console.log(colors.json())
      return colors
}
