const range = (start: number, end: number, step: number) => {
  let result: number[] = []
  for (let i = start; i < end; i += step) {
    result.push(i)
  }
  return result
}

export default range
