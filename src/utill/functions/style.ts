export const containerDiv = (item : string, auth : string) => {
    if(item === 'admin') {
      return 'justify-center'
    } else if(item === auth) {
      return 'justify-end'
    } else return 'justify-start'
  }
